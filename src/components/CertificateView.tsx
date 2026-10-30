import React from 'react';
import { Award, CheckCircle, Printer, Download, Share2, ShieldCheck, X } from 'lucide-react';
import { Certificate } from '../types';
import { BRAND_ASSETS, INSTRUCTOR_PROFILE } from '../data/mockData';

interface CertificateViewProps {
  certificate: Certificate;
  onClose?: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ certificate, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto my-6 print:m-0 print:border-none print:shadow-none">
      {/* Top Action Toolbar (hidden during print) */}
      <div className="no-print bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm">شهادة تخرج إلكترونية معتمدة وموثقة برقم ترخيص دولي</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الشهادة الرسمية</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Certificate Frame */}
      <div className="p-8 md:p-12 bg-linear-to-b from-amber-50/30 via-white to-amber-50/20 relative">
        {/* Decorative Ornate Borders */}
        <div className="border-4 border-amber-800/40 p-4 md:p-6 rounded-xl relative">
          <div className="border border-amber-800/20 p-6 md:p-8 rounded-lg relative bg-white/80 backdrop-blur-xs">
            
            {/* Header: SmartTech Logo and Accreditations */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-amber-800/20">
              <div className="text-center md:text-right">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-xs">
                    ST
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">SmartTech Training Center</h2>
                    <p className="text-xs text-red-700 font-semibold">سمارتك للتدريب المتطور والاعتمادات الدولية</p>
                  </div>
                </div>
              </div>

              {/* Accreditations Badges */}
              <div className="flex items-center gap-3 text-xs text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50">
                <span className="font-semibold text-slate-800">Certiport</span>
                <span>•</span>
                <span className="font-semibold text-slate-800">Microsoft Specialist</span>
                <span>•</span>
                <span className="font-semibold text-slate-800">ICDL</span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-8">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">
                CERTIFICATE OF COMPLETION & MASTERY
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                شهادة إتمام واجتياز دورة تدريبية
              </h1>
              <p className="text-sm text-slate-500">
                يشهد مركز سمارتك للتدريب المتطور بأن الطالب/المتدرب:
              </p>
            </div>

            {/* Recipient Name */}
            <div className="text-center my-6">
              <div className="inline-block border-b-2 border-red-600 pb-2 px-8">
                <span className="text-2xl md:text-3xl font-extrabold text-red-700">
                  {certificate.userName}
                </span>
              </div>
            </div>

            {/* Course & Achievement Text */}
            <div className="text-center max-w-2xl mx-auto my-6 text-slate-700 text-sm leading-relaxed">
              <p>
                قد اجتاز بنجاح كافة المتطلبات الأكاديمية والتطبيقات العملية والمشاريع المعتمدة في برنامج:
              </p>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-2 mb-1">
                « {certificate.courseTitle} »
              </h3>
              <p className="text-xs text-slate-500">
                المسار التخصصي: {certificate.trackTitle}
              </p>
              <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-900">
                <Award className="w-4 h-4 text-amber-600" />
                <span>التقدير العام: {certificate.grade}</span>
                <span>•</span>
                <span>تاريخ التخرج: {certificate.issueDate}</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8 mt-6 border-t border-amber-800/20 text-center">
              {/* QR Verification */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-900 p-1.5 rounded-lg text-white flex items-center justify-center font-mono text-[9px] text-center shadow-xs">
                  <div className="border border-white/40 w-full h-full p-1 flex flex-col justify-center items-center">
                    <span>QR VERIFIED</span>
                    <span className="text-[7px] text-red-400 mt-0.5">{certificate.certificateCode}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 font-mono">{certificate.certificateCode}</span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 mt-0.5">
                  <CheckCircle className="w-3 h-3" /> تم التحقق إلكترونياً
                </span>
              </div>

              {/* Official Stamp */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-red-700/60 p-1 flex items-center justify-center text-red-800 text-[9px] font-bold text-center leading-tight rotate-[-8deg] bg-red-50/50 shadow-inner">
                  مركز سمارتك<br />
                  SMARTTECH<br />
                  خاتم الاعتماد الدولي
                </div>
                <span className="text-[11px] text-slate-600 mt-1 font-semibold">الختم الرسمي للمركز</span>
              </div>

              {/* Instructor Signature */}
              <div className="flex flex-col items-center">
                <div className="h-14 flex items-end justify-center">
                  <span className="font-serif italic text-lg font-bold text-slate-800 border-b border-slate-400 pb-1 px-4">
                    د. شيماء العجمي
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 mt-1">{INSTRUCTOR_PROFILE.name}</span>
                <span className="text-[10px] text-slate-500">{INSTRUCTOR_PROFILE.title}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
