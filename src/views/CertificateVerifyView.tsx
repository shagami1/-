import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Search, Award, CheckCircle2, AlertCircle, Printer, ArrowRight } from 'lucide-react';
import { CertificateView } from '../components/CertificateView';
import { Certificate } from '../types';

export const CertificateVerifyView: React.FC = () => {
  const { certificates, setCurrentView } = useApp();
  const [searchCode, setSearchCode] = useState('ST-EXCEL-2026-0891');
  const [matchedCert, setMatchedCert] = useState<Certificate | null>(certificates[0] || null);
  const [hasSearched, setHasSearched] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchCode.trim().toUpperCase();
    const found = certificates.find((c) => c.certificateCode.toUpperCase() === clean);
    setMatchedCert(found || null);
    setHasSearched(true);
  };

  const handleQuickCode = (code: string) => {
    setSearchCode(code);
    const found = certificates.find((c) => c.certificateCode.toUpperCase() === code.toUpperCase());
    setMatchedCert(found || null);
    setHasSearched(true);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100 text-[#C62828] text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>نظام التحقق الرسمي من صحة الشهادات الصادرة</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            التحقق من الشهادات والاعتمادات الدولية
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            تأكد من مصداقية أي شهادة صادرة من مركز سمارت تك (SmartTech Training Center) أو منصة دكتورة شيماء العجمي عبر كود التحقق الرقمي المشفر.
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="أدخل كود الشهادة مثل ST-EXCEL-2026-0891..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono ltr-text focus:outline-none focus:border-red-600"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#C62828] hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-sm whitespace-nowrap"
            >
              التحقق الآن
            </button>
          </form>

          {/* Quick Demo Codes */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>أكواد تجريبية سريعة:</span>
            {certificates.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleQuickCode(c.certificateCode)}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] transition ltr-text"
              >
                {c.certificateCode}
              </button>
            ))}
          </div>
        </div>

        {/* Search Result */}
        {hasSearched && matchedCert && (
          <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    شهادة أصلية ومعتمدة رسمياً ✓
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {matchedCert.studentName}
                  </h3>
                </div>
              </div>

              <div className="text-left font-mono text-xs text-slate-500">
                <div className="font-bold text-slate-900">{matchedCert.certificateCode}</div>
                <div>تاريخ الإصدار: {matchedCert.issueDate}</div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-slate-500 mb-1">اسم البرنامج التدريبي</div>
                <div className="font-bold text-slate-900 text-sm">{matchedCert.courseTitle}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-slate-500 mb-1">جهة الاعتماد الأكاديمي</div>
                <div className="font-bold text-slate-900 text-sm">
                  SmartTech & Certiport Authorized Testing Center
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-slate-500 mb-1">الدرجة والتقدير النهائي</div>
                <div className="font-bold text-emerald-700 text-sm font-mono">
                  {matchedCert.grade}% · ممتاز مع مرتبة الشرف
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setShowCertificateModal(true)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>معاينة الشهادة الرسمية الكاملة للطباعة والتنزيل</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>طباعة هذا التقرير</span>
              </button>
            </div>
          </div>
        )}

        {hasSearched && !matchedCert && (
          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center shadow-xs">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">لم يتم العثور على شهادة بهذا الكود</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              يرجى التأكد من كتابة الكود بشكل دقيق شاملاً الحروف والأرقام والفواصل كما هو مطبوع على الشهادة.
            </p>
          </div>
        )}

      </div>

      {/* Certificate Lightbox / Print Modal */}
      {showCertificateModal && matchedCert && (
        <CertificateView
          certificate={matchedCert}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
};
