import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Maximize2,
  TableProperties
} from 'lucide-react';
import { ExcelExercise } from '../types';
import { evaluateFormula, colIndexToLetter } from '../services/excelEngine';
import { useApp } from '../context/AppContext';

interface ExcelLabViewProps {
  exercise?: ExcelExercise | null;
  initialExerciseId?: string;
  onClose?: () => void;
  isEmbedded?: boolean;
}

const DEFAULT_COLS = 8; // A to H
const DEFAULT_ROWS = 12; // 1 to 12

export const ExcelLabView: React.FC<ExcelLabViewProps> = ({
  exercise,
  initialExerciseId,
  onClose,
  isEmbedded = false
}) => {
  const { awardXP } = useApp();

  // Grid raw data storage: { "A1": "الفرع", "B2": 15000, "B5": "=SUM(B2:B4)" }
  const [gridData, setGridData] = useState<Record<string, string | number>>({});
  const [selectedCell, setSelectedCell] = useState<string>('A1');
  const [formulaInput, setFormulaInput] = useState<string>('');
  const [verificationState, setVerificationState] = useState<'idle' | 'success' | 'failed'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [showFormulaHelper, setShowFormulaHelper] = useState<boolean>(false);

  // Initialize or reset when exercise changes
  useEffect(() => {
    if (exercise) {
      setGridData({ ...exercise.starterData });
      setSelectedCell(exercise.targetCell || 'B2');
      setFormulaInput(String(exercise.starterData[exercise.targetCell] || ''));
      setVerificationState('idle');
      setFeedbackMessage('');
      setHintIndex(0);
    } else {
      // Blank playground with sample sales table
      const samplePlayground: Record<string, string | number> = {
        'A1': 'الشهر',
        'B1': 'المبيعات',
        'C1': 'المصروفات',
        'D1': 'صافي الربح',
        'A2': 'يناير',
        'B2': 45000,
        'C2': 32000,
        'D2': '=B2-C2',
        'A3': 'فبراير',
        'B3': 58000,
        'C3': 39000,
        'D3': '=B3-C3',
        'A4': 'مارس',
        'B4': 62000,
        'C4': 41000,
        'D4': '=B4-C4',
        'A5': 'المجموع',
        'B5': '=SUM(B2:B4)',
        'C5': '=SUM(C2:C4)',
        'D5': '=SUM(D2:D4)'
      };
      setGridData(samplePlayground);
      setSelectedCell('B5');
      setFormulaInput(String(samplePlayground['B5'] || ''));
    }
  }, [exercise]);

  // When selected cell changes, sync formula input
  const handleSelectCell = (cellId: string) => {
    setSelectedCell(cellId);
    const rawVal = gridData[cellId];
    setFormulaInput(rawVal !== undefined ? String(rawVal) : '');
  };

  // Change formula or value in active cell
  const handleFormulaChange = (newVal: string) => {
    setFormulaInput(newVal);
    setGridData(prev => ({
      ...prev,
      [selectedCell]: newVal
    }));
    if (verificationState !== 'idle') {
      setVerificationState('idle');
    }
  };

  // Insert formula shortcut into input
  const handleInsertFunction = (funcName: string) => {
    const snippet = `=${funcName}(`;
    setFormulaInput(snippet);
    setGridData(prev => ({ ...prev, [selectedCell]: snippet }));
  };

  // Reset exercise to starter state
  const handleReset = () => {
    if (exercise) {
      setGridData({ ...exercise.starterData });
      setSelectedCell(exercise.targetCell);
      setFormulaInput(String(exercise.starterData[exercise.targetCell] || ''));
      setVerificationState('idle');
      setFeedbackMessage('تمت استعادة البيانات الأصلية للتمرين.');
    }
  };

  // Evaluate single cell for display
  const getRenderedCellValue = (cellId: string): string | number => {
    const rawVal = gridData[cellId];
    if (rawVal === undefined || rawVal === null) return '';
    if (typeof rawVal === 'string' && rawVal.startsWith('=')) {
      return evaluateFormula(rawVal, gridData);
    }
    return rawVal;
  };

  // Verification Logic
  const handleVerifyAnswer = () => {
    if (!exercise) {
      setVerificationState('success');
      setFeedbackMessage('المعادلة تعمل بنجاح في وضع التجربة الحرة!');
      return;
    }

    const targetVal = gridData[exercise.targetCell];
    if (!targetVal) {
      setVerificationState('failed');
      setFeedbackMessage(`الخلية المستهدفة ${exercise.targetCell} لا تزال فارغة! اكتب المعادلة المطلوبة.`);
      return;
    }

    const computedResult = evaluateFormula(String(targetVal), gridData);
    const targetString = String(targetVal).toUpperCase();

    // Check required formula keywords (e.g. SUM, IF, XLOOKUP)
    if (exercise.expectedFormulaKeywords && exercise.expectedFormulaKeywords.length > 0) {
      const missingKw = exercise.expectedFormulaKeywords.find(kw => !targetString.includes(kw.toUpperCase()));
      if (missingKw) {
        setVerificationState('failed');
        setFeedbackMessage(`حلك ممتاز ولكن يجب استخدام الدالة ${missingKw} كما هو مطلوب في نص التمرين.`);
        return;
      }
    }

    // Compare values
    const isNumberMatch = typeof exercise.expectedResult === 'number' && Number(computedResult) === exercise.expectedResult;
    const isStringMatch = String(computedResult).trim().toLowerCase() === String(exercise.expectedResult).trim().toLowerCase();

    if (isNumberMatch || isStringMatch) {
      setVerificationState('success');
      setFeedbackMessage(`إجابة صحيحة ومتقنة! النتيجة المحسوبة هي: ${computedResult}`);
      awardXP(exercise.xpReward, `إتقان ${exercise.title}`);
    } else {
      setVerificationState('failed');
      setFeedbackMessage(`النتيجة المحسوبة (${computedResult}) تختلف عن النتيجة المتوقعة (${exercise.expectedResult}). راجع الخلايا المحددة في الصيغة.`);
    }
  };

  return (
    <div className={`flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${isEmbedded ? 'w-full' : 'max-w-6xl mx-auto my-4'}`}>
      {/* Exercise Brief & Header */}
      <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-red-600/90 rounded-lg shrink-0 mt-0.5">
            <FileSpreadsheet className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                معمل إكسل التفاعلي Live
              </span>
              {exercise && (
                <span className="text-xs text-amber-300 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5" /> +{exercise.xpReward} XP
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              {exercise ? exercise.title : 'مصنف إكسل التعليمي - التدريب الحر والمفتوح'}
            </h3>
            {exercise && (
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {exercise.instructions}
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {exercise && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              title="إعادة تعيين إلى الحالة الأولية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين</span>
            </button>
          )}

          <button
            onClick={() => setShowFormulaHelper(!showFormulaHelper)}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>دليل الدوال</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              إغلاق
            </button>
          )}
        </div>
      </div>

      {/* Formula Helper Drawer */}
      {showFormulaHelper && (
        <div className="bg-slate-800/90 text-slate-200 px-5 py-3 border-b border-slate-700 text-xs flex flex-wrap items-center gap-2">
          <span className="font-semibold text-white ml-2">دوال سريعة:</span>
          {['SUM', 'AVERAGE', 'MIN', 'MAX', 'COUNT', 'IF', 'COUNTIF', 'SUMIF', 'SUMIFS', 'XLOOKUP', 'VLOOKUP'].map(fn => (
            <button
              key={fn}
              onClick={() => handleInsertFunction(fn)}
              className="px-2.5 py-1 bg-slate-700 hover:bg-red-600 text-white font-mono rounded transition-colors"
            >
              ={fn}()
            </button>
          ))}
        </div>
      )}

      {/* Formula Bar */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-3">
        {/* Active Cell Reference Coordinate */}
        <div className="w-16 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono text-center font-bold text-slate-800 text-xs ltr-text shrink-0 shadow-inner">
          {selectedCell}
        </div>

        {/* fx symbol */}
        <div className="text-slate-400 font-mono font-bold italic text-sm select-none shrink-0 px-1">
          fx
        </div>

        {/* Live Input Field */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={formulaInput}
            onChange={(e) => handleFormulaChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleVerifyAnswer();
            }}
            placeholder="اكتب القيمة أو المعادلة هنا... مثال: =SUM(B2:B4) أو =IF(B2>100, 1, 0)"
            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ltr-text shadow-inner"
          />
        </div>

        {/* Verification Button */}
        <button
          onClick={handleVerifyAnswer}
          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>تحقق من الحل</span>
        </button>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto bg-white p-3 ltr-text">
        <div className="inline-block min-w-full border border-slate-300 rounded overflow-hidden shadow-xs">
          <table className="border-collapse table-fixed w-full text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 select-none">
                {/* Corner Cell */}
                <th className="w-12 h-7 border-b border-r border-slate-300 text-center font-semibold text-[11px] bg-slate-200">
                  #
                </th>
                {Array.from({ length: DEFAULT_COLS }).map((_, cIdx) => {
                  const colLetter = colIndexToLetter(cIdx);
                  return (
                    <th
                      key={colLetter}
                      className="w-28 h-7 border-b border-r border-slate-300 text-center font-mono font-semibold text-slate-700 text-[11px]"
                    >
                      {colLetter}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: DEFAULT_ROWS }).map((_, rIdx) => {
                const rowNum = rIdx + 1;
                return (
                  <tr key={rowNum} className="hover:bg-slate-50/50">
                    {/* Row Header */}
                    <td className="w-12 h-8 border-b border-r border-slate-300 bg-slate-100 text-slate-500 font-mono text-center font-semibold text-[11px] select-none">
                      {rowNum}
                    </td>

                    {/* Data Cells */}
                    {Array.from({ length: DEFAULT_COLS }).map((_, cIdx) => {
                      const cellId = `${colIndexToLetter(cIdx)}${rowNum}`;
                      const isSelected = selectedCell === cellId;
                      const isTarget = exercise?.targetCell === cellId;
                      const renderedVal = getRenderedCellValue(cellId);
                      const isFormula = typeof gridData[cellId] === 'string' && String(gridData[cellId]).startsWith('=');

                      return (
                        <td
                          key={cellId}
                          onClick={() => handleSelectCell(cellId)}
                          className={`w-28 h-8 px-2 border-b border-r border-slate-200 font-sans cursor-pointer truncate transition-all ${
                            isSelected
                              ? 'bg-blue-50/80 ring-2 ring-red-600 ring-inset font-medium text-slate-900 z-10'
                              : isTarget
                              ? 'bg-amber-50/80 border-dashed border-amber-400 font-medium'
                              : 'bg-white hover:bg-slate-50'
                          } ${typeof renderedVal === 'number' ? 'text-right font-mono' : 'text-left'}`}
                          title={`${cellId}: ${gridData[cellId] ?? ''}`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="truncate">
                              {renderedVal !== undefined ? String(renderedVal) : ''}
                            </span>
                            {isTarget && !renderedVal && (
                              <span className="text-[10px] text-amber-600 bg-amber-100 px-1 rounded font-sans">
                                هدف
                              </span>
                            )}
                            {isFormula && !isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" title="صيغة حسابية" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback & Result Bar */}
      {verificationState !== 'idle' && (
        <div
          className={`px-5 py-3 border-t flex items-center justify-between text-xs transition-all ${
            verificationState === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {verificationState === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span className="font-medium text-sm">{feedbackMessage}</span>
          </div>

          {verificationState === 'failed' && exercise?.hints && exercise.hints.length > 0 && (
            <button
              onClick={() => {
                const nextHint = (hintIndex + 1) % exercise.hints.length;
                setHintIndex(nextHint);
                setFeedbackMessage(`تلميح: ${exercise.hints[nextHint]}`);
              }}
              className="text-xs text-red-700 hover:text-red-900 font-semibold underline underline-offset-4"
            >
              إظهار تلميح ({hintIndex + 1}/{exercise.hints.length})
            </button>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-4">
          <span>الخلية النشطة: <strong className="font-mono text-slate-800">{selectedCell}</strong></span>
          <span>القيمة الأصلية: <strong className="font-mono text-slate-800">{gridData[selectedCell] ?? '(فارغ)'}</strong></span>
          {exercise && <span>الهدف: الخلية <strong className="font-mono text-red-700">{exercise.targetCell}</strong></span>}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>محرك حساب إكسل التفاعلي © SmartTech Center</span>
        </div>
      </div>
    </div>
  );
};
