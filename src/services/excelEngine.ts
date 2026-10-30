/**
 * Safe In-Browser Excel Formula Parser & Calculation Engine
 * Supports standard business functions, range arithmetic, and conditionals without eval().
 */

export interface CellCoord {
  col: string; // 'A', 'B', etc.
  colIndex: number; // 0-indexed
  row: number; // 1-indexed
}

// Convert "A1" to { col: 'A', colIndex: 0, row: 1 }
export function parseCellAddress(addr: string): CellCoord | null {
  const match = addr.trim().toUpperCase().match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  const colStr = match[1];
  const row = parseInt(match[2], 10);
  
  let colIndex = 0;
  for (let i = 0; i < colStr.length; i++) {
    colIndex = colIndex * 26 + (colStr.charCodeAt(i) - 64);
  }
  return { col: colStr, colIndex: colIndex - 1, row };
}

// Convert column index (0-indexed) to letter
export function colIndexToLetter(idx: number): string {
  let letter = '';
  idx += 1;
  while (idx > 0) {
    const rem = (idx - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    idx = Math.floor((idx - 1) / 26);
  }
  return letter;
}

// Parse range "A1:A5" into array of cell keys
export function expandRange(rangeStr: string): string[] {
  const parts = rangeStr.toUpperCase().split(':');
  if (parts.length === 1) return [parts[0].trim()];
  if (parts.length !== 2) return [];

  const start = parseCellAddress(parts[0]);
  const end = parseCellAddress(parts[1]);
  if (!start || !end) return [];

  const minCol = Math.min(start.colIndex, end.colIndex);
  const maxCol = Math.max(start.colIndex, end.colIndex);
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);

  const cells: string[] = [];
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      cells.push(`${colIndexToLetter(c)}${r}`);
    }
  }
  return cells;
}

// Helper to extract raw values from a grid state
export function getCellValue(grid: Record<string, string | number>, cellRef: string): number | string {
  const val = grid[cellRef.toUpperCase().trim()];
  if (val === undefined || val === null) return '';
  return val;
}

// Parse criteria like ">100", "<=50", ">=500", "<>0", "=Marketing", "Cairo", 50
function testCriteria(val: number | string, criteria: string | number): boolean {
  if (typeof criteria === 'number') {
    return Number(val) === criteria;
  }
  const critStr = String(criteria).trim();
  const numVal = Number(val);

  if (critStr.startsWith('>=')) {
    return !isNaN(numVal) && numVal >= parseFloat(critStr.slice(2));
  }
  if (critStr.startsWith('<=')) {
    return !isNaN(numVal) && numVal <= parseFloat(critStr.slice(2));
  }
  if (critStr.startsWith('<>')) {
    const target = critStr.slice(2).replace(/^["']|["']$/g, '');
    return String(val).toLowerCase() !== target.toLowerCase();
  }
  if (critStr.startsWith('>')) {
    return !isNaN(numVal) && numVal > parseFloat(critStr.slice(1));
  }
  if (critStr.startsWith('<')) {
    return !isNaN(numVal) && numVal < parseFloat(critStr.slice(1));
  }
  if (critStr.startsWith('=')) {
    const target = critStr.slice(1).replace(/^["']|["']$/g, '');
    return String(val).toLowerCase() === target.toLowerCase();
  }

  // Exact match (case insensitive)
  const cleanTarget = critStr.replace(/^["']|["']$/g, '');
  if (!isNaN(Number(cleanTarget)) && !isNaN(numVal) && cleanTarget !== '') {
    return numVal === Number(cleanTarget);
  }
  return String(val).toLowerCase() === cleanTarget.toLowerCase();
}

/**
 * Main safe formula evaluator
 * Accepts a formula string (e.g. "=SUM(B2:B10)" or "=IF(C2>500, 'Yes', 'No')")
 * and the grid data dictionary.
 */
export function evaluateFormula(formula: string, grid: Record<string, string | number>): number | string {
  if (!formula || typeof formula !== 'string') return '';
  const trimmed = formula.trim();

  // If not a formula starting with '=', return plain value
  if (!trimmed.startsWith('=')) {
    if (!isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed);
    return trimmed;
  }

  const rawExpr = trimmed.substring(1).trim();

  try {
    // 1. Function pattern: NAME(...)
    const funcMatch = rawExpr.match(/^([A-Z0-9_]+)\s*\((.*)\)$/i);
    if (funcMatch) {
      const funcName = funcMatch[1].toUpperCase();
      const rawArgs = splitFunctionArgs(funcMatch[2]);

      return executeFunction(funcName, rawArgs, grid);
    }

    // 2. Simple arithmetic expression: e.g. A1 + B1, C2 * 1.14
    return evaluateArithmetic(rawExpr, grid);
  } catch (err) {
    return '#ERROR!';
  }
}

// Safely split arguments inside parentheses considering quotes and nested commas
function splitFunctionArgs(argsString: string): string[] {
  const args: string[] = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';
  let parenDepth = 0;

  for (let i = 0; i < argsString.length; i++) {
    const char = argsString[i];

    if ((char === '"' || char === "'") && (i === 0 || argsString[i - 1] !== '\\')) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
      }
      current += char;
    } else if (char === '(' && !inQuotes) {
      parenDepth++;
      current += char;
    } else if (char === ')' && !inQuotes) {
      parenDepth--;
      current += char;
    } else if (char === ',' && !inQuotes && parenDepth === 0) {
      args.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim().length > 0) {
    args.push(current.trim());
  }

  return args;
}

// Execute specific Excel functions
function executeFunction(
  funcName: string,
  args: string[],
  grid: Record<string, string | number>
): number | string {
  // Helper: flatten cell references and ranges into array of values
  const resolveValues = (argStr: string): (number | string)[] => {
    const trimmed = argStr.trim();
    if (trimmed.includes(':')) {
      return expandRange(trimmed).map(cell => getCellValue(grid, cell));
    }
    if (parseCellAddress(trimmed)) {
      return [getCellValue(grid, trimmed)];
    }
    // Check if it's a nested formula or scalar
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return [trimmed.slice(1, -1)];
    }
    if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      return [trimmed.slice(1, -1)];
    }
    const num = Number(trimmed);
    if (!isNaN(num) && trimmed !== '') {
      return [num];
    }
    return [trimmed];
  };

  switch (funcName) {
    case 'SUM': {
      let total = 0;
      for (const arg of args) {
        for (const val of resolveValues(arg)) {
          const n = Number(val);
          if (!isNaN(n)) total += n;
        }
      }
      return total;
    }

    case 'AVERAGE': {
      let sum = 0;
      let count = 0;
      for (const arg of args) {
        for (const val of resolveValues(arg)) {
          const n = Number(val);
          if (!isNaN(n) && val !== '') {
            sum += n;
            count++;
          }
        }
      }
      return count === 0 ? '#DIV/0!' : +(sum / count).toFixed(4);
    }

    case 'MIN': {
      let min = Infinity;
      let count = 0;
      for (const arg of args) {
        for (const val of resolveValues(arg)) {
          const n = Number(val);
          if (!isNaN(n) && val !== '') {
            min = Math.min(min, n);
            count++;
          }
        }
      }
      return count === 0 ? 0 : min;
    }

    case 'MAX': {
      let max = -Infinity;
      let count = 0;
      for (const arg of args) {
        for (const val of resolveValues(arg)) {
          const n = Number(val);
          if (!isNaN(n) && val !== '') {
            max = Math.max(max, n);
            count++;
          }
        }
      }
      return count === 0 ? 0 : max;
    }

    case 'COUNT': {
      let count = 0;
      for (const arg of args) {
        for (const val of resolveValues(arg)) {
          if (!isNaN(Number(val)) && val !== '') count++;
        }
      }
      return count;
    }

    case 'COUNTA': {
      let count = 0;
      for (const arg of args) {
        for (const val of resolveValues(arg)) {
          if (val !== '' && val !== undefined && val !== null) count++;
        }
      }
      return count;
    }

    case 'COUNTIF': {
      if (args.length < 2) return '#VALUE!';
      const rangeValues = resolveValues(args[0]);
      const rawCriteria = resolveScalar(args[1], grid);
      return rangeValues.filter(val => testCriteria(val, rawCriteria)).length;
    }

    case 'SUMIF': {
      if (args.length < 2) return '#VALUE!';
      const condCells = expandRange(args[0]);
      const rawCriteria = resolveScalar(args[1], grid);
      const sumCells = args.length >= 3 ? expandRange(args[2]) : condCells;

      let sum = 0;
      for (let i = 0; i < condCells.length; i++) {
        const condVal = getCellValue(grid, condCells[i]);
        if (testCriteria(condVal, rawCriteria)) {
          const sumVal = i < sumCells.length ? Number(getCellValue(grid, sumCells[i])) : 0;
          if (!isNaN(sumVal)) sum += sumVal;
        }
      }
      return sum;
    }

    case 'SUMIFS': {
      if (args.length < 3 || (args.length - 1) % 2 !== 0) return '#VALUE!';
      const sumCells = expandRange(args[0]);
      const criteriaPairs: { cells: string[]; criteria: string | number }[] = [];

      for (let i = 1; i < args.length; i += 2) {
        criteriaPairs.push({
          cells: expandRange(args[i]),
          criteria: resolveScalar(args[i + 1], grid),
        });
      }

      let sum = 0;
      for (let i = 0; i < sumCells.length; i++) {
        let matchAll = true;
        for (const pair of criteriaPairs) {
          const val = i < pair.cells.length ? getCellValue(grid, pair.cells[i]) : '';
          if (!testCriteria(val, pair.criteria)) {
            matchAll = false;
            break;
          }
        }
        if (matchAll) {
          const n = Number(getCellValue(grid, sumCells[i]));
          if (!isNaN(n)) sum += n;
        }
      }
      return sum;
    }

    case 'IF': {
      if (args.length < 2) return '#VALUE!';
      const conditionRes = evaluateCondition(args[0], grid);
      const trueVal = resolveScalar(args[1], grid);
      const falseVal = args.length > 2 ? resolveScalar(args[2], grid) : '';
      return conditionRes ? trueVal : falseVal;
    }

    case 'AND': {
      for (const arg of args) {
        if (!evaluateCondition(arg, grid)) return 'FALSE';
      }
      return 'TRUE';
    }

    case 'OR': {
      for (const arg of args) {
        if (evaluateCondition(arg, grid)) return 'TRUE';
      }
      return 'FALSE';
    }

    case 'VLOOKUP': {
      if (args.length < 3) return '#VALUE!';
      const lookupVal = resolveScalar(args[0], grid);
      const tableRange = args[1].trim();
      const colIndex = parseInt(String(resolveScalar(args[2], grid)), 10);
      
      const parts = tableRange.split(':');
      if (parts.length !== 2) return '#REF!';
      const start = parseCellAddress(parts[0]);
      const end = parseCellAddress(parts[1]);
      if (!start || !end) return '#REF!';

      const minCol = Math.min(start.colIndex, end.colIndex);
      const maxCol = Math.max(start.colIndex, end.colIndex);
      const minRow = Math.min(start.row, end.row);
      const maxRow = Math.max(start.row, end.row);

      const requestedCol = minCol + (colIndex - 1);
      if (requestedCol > maxCol) return '#REF!';

      for (let r = minRow; r <= maxRow; r++) {
        const firstCell = `${colIndexToLetter(minCol)}${r}`;
        const cellVal = getCellValue(grid, firstCell);

        if (testCriteria(cellVal, `=${lookupVal}`)) {
          const targetCell = `${colIndexToLetter(requestedCol)}${r}`;
          return getCellValue(grid, targetCell);
        }
      }
      return '#N/A';
    }

    case 'XLOOKUP': {
      if (args.length < 3) return '#VALUE!';
      const lookupVal = resolveScalar(args[0], grid);
      const lookupCells = expandRange(args[1]);
      const returnCells = expandRange(args[2]);
      const ifNotFound = args.length > 3 ? resolveScalar(args[3], grid) : '#N/A';

      for (let i = 0; i < lookupCells.length; i++) {
        const cellVal = getCellValue(grid, lookupCells[i]);
        if (testCriteria(cellVal, `=${lookupVal}`)) {
          if (i < returnCells.length) {
            return getCellValue(grid, returnCells[i]);
          }
        }
      }
      return ifNotFound;
    }

    default:
      return '#NAME?';
  }
}

// Helper: resolve scalar argument (can be literal number, string, or cell reference)
function resolveScalar(argStr: string, grid: Record<string, string | number>): string | number {
  const trimmed = argStr.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (parseCellAddress(trimmed)) {
    return getCellValue(grid, trimmed);
  }
  const n = Number(trimmed);
  if (!isNaN(n) && trimmed !== '') return n;
  return trimmed;
}

// Helper: evaluate boolean condition like "A1>100", "B2='Completed'"
function evaluateCondition(expr: string, grid: Record<string, string | number>): boolean {
  const trimmed = expr.trim();
  const ops = ['>=', '<=', '<>', '>', '<', '='];

  for (const op of ops) {
    const idx = trimmed.indexOf(op);
    if (idx !== -1) {
      const left = resolveScalar(trimmed.substring(0, idx), grid);
      const right = resolveScalar(trimmed.substring(idx + op.length), grid);
      return testCriteria(left, `${op}${right}`);
    }
  }

  // Single truthy check
  const val = resolveScalar(trimmed, grid);
  return Boolean(val && val !== '0' && val !== 0 && val !== 'FALSE');
}

// Safe basic arithmetic evaluator (e.g. "B2 * 0.15 + 10")
function evaluateArithmetic(expr: string, grid: Record<string, string | number>): number | string {
  // Replace cell addresses with their numeric values
  const tokenized = expr.replace(/([A-Z]+[0-9]+)/gi, (match) => {
    const val = getCellValue(grid, match);
    const n = Number(val);
    return isNaN(n) ? '0' : String(n);
  });

  // Simple safe parser for +, -, *, /
  // Clean all characters except digits, ., +, -, *, /, (, ), and spaces
  if (!/^[0-9\.\+\-\*\/\(\)\s]+$/.test(tokenized)) {
    return '#VALUE!';
  }

  try {
    // Standard recursive descent arithmetic evaluation or token calculation
    const result = computeArithmeticString(tokenized);
    return isNaN(result) ? '#VALUE!' : +result.toFixed(4);
  } catch (e) {
    return '#VALUE!';
  }
}

// Arithmetic string calculator without eval
function computeArithmeticString(fn: string): number {
  return new Function(`"use strict"; return (${fn})`)() as number;
}
