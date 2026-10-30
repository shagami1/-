import React from 'react';
import { ArrowLeft, Sparkles, FileSpreadsheet, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRAND_ASSETS, INSTRUCTOR_PROFILE } from '../../data/mockData';

export const HeroSection: React.FC = () => {
  const { setCurrentView, openExcelLab } = useApp();

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 pb-16 md:pt-14 md:pb-20">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C62828_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column (Arabic RTL First): Content & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-xs text-red-700 font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
              <span>المنصة الرسمية لمركز سمارتك للتدريب المتطور • SmartTech Center</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.25] tracking-tight text-balance">
              احترف ببساطة <br />
              <span className="text-red-600">مع دكتورة شيماء</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-pretty font-normal">
              ابدأ من مهارات الكمبيوتر الأساسية، وطور قدراتك في <strong className="text-slate-900 font-semibold">Excel المتقدم وتحليل البيانات</strong>، وطبّق عمليًا خطوة بخطوة داخل معملنا التفاعلي حتى تنجز مشروعات حقيقية تعكس مهاراتك وتؤهلك لسوق العمل.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('paths')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm md:text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>اكتشف المسارات التعليمية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => openExcelLab()}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm md:text-base flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>جرّب معمل إكسل التفاعلي</span>
              </button>
            </div>

            {/* Key Value Trust Points */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تطبيق فوري بالمتصفح دون برامج</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>شهادات معتمدة برقم تحقق دولي</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>مسارات موجهة لاحتياجات الشركات</span>
              </div>
            </div>

          </div>

          {/* Left Column: Authentic Instructor Portrait (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Decorative Glow/Border */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-red-600/20 via-amber-500/10 to-transparent rounded-3xl filter blur-xl opacity-60" />

              {/* Main Authentic Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-2xl bg-white">
                <img
                  src={BRAND_ASSETS.instructorHero}
                  alt="دكتورة شيماء العجمي - مؤسس ومدير مركز سمارتك للتدريب"
                  className="w-full h-auto object-cover object-top aspect-[3/4]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Instructor Credential Badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-white">{INSTRUCTOR_PROFILE.name}</h3>
                      <p className="text-xs text-red-300 font-medium">{INSTRUCTOR_PROFILE.title}</p>
                    </div>
                    <div className="bg-red-600/90 px-2.5 py-1 rounded text-[11px] font-bold text-white shadow-xs">
                      15+ عاماً خبرة
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-300 flex items-center gap-1.5 border-t border-slate-700/60 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>المدير التنفيذي لمركز سمارتك • Certiport Center</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
