import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Sparkles, CheckCircle2, RefreshCw, ExternalLink, Calculator } from 'lucide-react';
import { evaluateFormula } from '../../services/excelEngine';

export const ExcelLabPreviewSection: React.FC = () => {
  const { openExcelLab } = useApp();

  // Mini interactive state for the homepage teaser
  const [data, setData] = useState<Record<string, string>>({
    A1: 'القسم', B1: 'المبيعات (ج.م)', C1: 'الهدف (ج.م)',
    A2: 'القاهرة', B2: '85000', C2: '80000',
    A3: 'الإسكندرية', B3: '62000', C3: '60000',
    A4: 'طنطا', B4: '45000', C4: '50000',
    A5: 'المنصورة', B5: '71000', C5: '65000',
    A6: 'الإجمالي', B6: '=SUM(B2:B5)', C6: '=SUM(C2:C5)'
  });

  const [activeCell, setActiveCell] = useState<string>('B6');
  const [formulaInput, setFormulaInput] = useState<string>('=SUM(B2:B5)');
  const [feedback, setFeedback] = useState<string | null>('صيغة صحيحة! جرب تعديل قيم المبيعات أو كتابة =AVERAGE(B2:B5)');

  const getComputedValue = (cellRef: string): string => {
    const raw = data[cellRef] || '';
    if (raw.startsWith('=')) {
      return String(evaluateFormula(raw, data));
    }
    return raw;
  };

  const handleApplyFormula = (f: string) => {
    setFormulaInput(f);
    setData(prev => ({ ...prev, [activeCell]: f }));
    setFeedback(`تم تطبيق الصيغة ${f} على الخلية ${activeCell} بنجاح!`);
  };

  const handleCellSelect = (cellRef: string) => {
    setActiveCell(cellRef);
    setFormulaInput(data[cellRef] || '');
  };

  const handleCellChange = (val: string) => {
    setData(prev => ({ ...prev, [activeCell]: val }));
    setFormulaInput(val);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>مختبر إكسيل التفاعلي المباشر (Excel Live Lab)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            لا تكتفِ بالمشاهدة.. طبق بنفسك داخل المتصفح
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            محرك إكسيل تفاعلي حقيقي مدمج في المنصة. جرب كتابة المعادلات، التحقق الفوري، والحصول على نقاط XP وتقييم لحظي لأخطاء الصياغة مثل <span className="ltr-text text-amber-300 font-mono">SUM, VLOOKUP, IF</span>.
          </p>
        </div>

        {/* Live Mini Spreadsheet Preview */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Top Bar of the Mini Sheet */}
          <div className="bg-slate-850 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-slate-400 font-mono mr-2">ورقة_عمل_مبيعات_الفروع.xlsx</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openExcelLab('ex-1')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C62828] hover:bg-red-700 text-white rounded text-xs font-bold transition shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>فتح المختبر الكامل (شاشة كاملة)</span>
              </button>
            </div>
          </div>

          {/* Formula Bar */}
          <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-700 flex items-center gap-3">
            <div className="w-14 text-center py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono font-bold text-amber-400 ltr-text">
              {activeCell}
            </div>
            <div className="text-slate-400 font-serif italic text-sm select-none">
              <span className="font-mono text-emerald-400 font-bold">fx</span>
            </div>
            <input
              type="text"
              value={formulaInput}
              onChange={(e) => handleCellChange(e.target.value)}
              placeholder="اكتب معادلة مثل =SUM(B2:B5) أو قيمة..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 ltr-text text-left"
            />
          </div>

          {/* Interactive Quick Formulas */}
          <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-750 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">صيغ سريعة للتجربة:</span>
            <button
              onClick={() => handleApplyFormula('=SUM(B2:B5)')}
              className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 font-mono text-[11px] ltr-text transition"
            >
              =SUM(B2:B5)
            </button>
            <button
              onClick={() => handleApplyFormula('=AVERAGE(B2:B5)')}
              className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 font-mono text-[11px] ltr-text transition"
            >
              =AVERAGE(B2:B5)
            </button>
            <button
              onClick={() => handleApplyFormula('=MAX(B2:B5)')}
              className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 font-mono text-[11px] ltr-text transition"
            >
              =MAX(B2:B5)
            </button>
            <button
              onClick={() => handleApplyFormula('=IF(B2>=C2,"محقق","غير محقق")')}
              className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 font-mono text-[11px] ltr-text transition"
            >
              =IF(B2&gt;=C2,...)
            </button>
          </div>

          {/* Table Grid */}
          <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse text-xs select-none">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400 font-mono">
                  <th className="w-10 border border-slate-700 p-2 text-center">#</th>
                  <th className="border border-slate-700 p-2 text-center ltr-text">A</th>
                  <th className="border border-slate-700 p-2 text-center ltr-text">B</th>
                  <th className="border border-slate-700 p-2 text-center ltr-text">C</th>
                </tr>
              </thead>
              <tbody>
                {['1', '2', '3', '4', '5', '6'].map((row) => (
                  <tr key={row} className="hover:bg-slate-750/30">
                    <td className="border border-slate-700 bg-slate-900/40 text-slate-500 font-mono text-center p-2 font-semibold">
                      {row}
                    </td>
                    {['A', 'B', 'C'].map((col) => {
                      const ref = `${col}${row}`;
                      const isSelected = activeCell === ref;
                      const isHeader = row === '1';
                      const isTotal = row === '6';
                      const val = getComputedValue(ref);

                      return (
                        <td
                          key={ref}
                          onClick={() => handleCellSelect(ref)}
                          className={`border border-slate-700 p-2 transition cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-emerald-500 bg-emerald-500/10'
                              : 'bg-slate-800/40'
                          } ${isHeader ? 'font-bold text-slate-300 text-center bg-slate-750/50' : ''} ${
                            isTotal ? 'font-bold text-amber-300 bg-slate-900/50' : 'text-slate-200'
                          }`}
                        >
                          <div className={`w-full ${col === 'A' ? 'text-right' : 'ltr-text text-center font-mono'}`}>
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Feedback & Bottom Callout */}
          <div className="bg-slate-900 px-4 py-3 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{feedback}</span>
            </div>
            <button
              onClick={() => openExcelLab('ex-1')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 flex items-center gap-1"
            >
              <span>انتقل لتجربة 14 تمرين إكسيل تفاعلي مع تصحيح تلقائي</span>
              <span className="ltr-text">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
