import React from 'react';
import { INSTRUCTOR_PROFILE } from '../../data/mockData';
import { Award, GraduationCap, CheckCircle2, BookOpen, Users, Star, Sparkles } from 'lucide-react';

export const InstructorBioSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-250 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Presentation Column */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
            {/* Primary Portrait Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl group">
              <img
                src={INSTRUCTOR_PROFILE.photoFull}
                alt="دكتورة شيماء العجمي - مظهر كامل"
                className="w-full h-96 sm:h-[420px] object-cover object-top group-hover:scale-102 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-xs font-semibold px-2.5 py-1 bg-red-600/90 text-white rounded-md inline-block mb-2">
                  مؤسس SmartTech Training Center
                </span>
                <h3 className="text-2xl font-black text-white">
                  {INSTRUCTOR_PROFILE.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  {INSTRUCTOR_PROFILE.title}
                </p>
              </div>
            </div>

            {/* In-classroom / Lab Candid Snippet */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-250 flex items-center gap-4">
              <img
                src={INSTRUCTOR_PROFILE.photoPortrait}
                alt="دكتورة شيماء في قاعة المحاضرات"
                className="w-16 h-16 rounded-lg object-cover border border-slate-300 flex-shrink-0"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  شغف التعليم وتطبيق أحدث منهجيات التعلم
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  أكثر من 15 عاماً في تدريب القيادات وموظفي البنوك والشركات والطلاب على أحدث أدوات تحليل البيانات.
                </p>
              </div>
            </div>
          </div>

          {/* Credentials & Methodology Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-50 text-[#C62828] text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>نبذة عن المدربة والمنهجية</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              لماذا شعارنا <span className="text-[#C62828]">«احترف ببساطة»</span>؟
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {INSTRUCTOR_PROFILE.bio}
            </p>

            {/* Philosophy Highlight Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    فلسفة التدريس الخاصة
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    «لا نعتمد على الحفظ النظري للمعادلات، بل نبدأ دائماً بمشكلة عمل واقعية: كيف تحسب عمولة مبيعات، كيف تكشف أخطاء مطابقة الحسابات، كيف تبني لوحة مؤشرات فورية لإدارة شركتك. عندما تفهم المنطق، يصبح الكود والمعادلة في غاية السهولة».
                  </p>
                </div>
              </div>
            </div>

            {/* Credentials Grid */}
            <div className="mt-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                الشهادات والاعتمادات الرسمية
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INSTRUCTOR_PROFILE.credentials.map((cred, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-white hover:border-red-200 transition"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C62828] mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">
                      {cred}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metric Numbers */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center sm:text-right">
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">15,000+</div>
                <div className="text-xs text-slate-500 mt-0.5">متدرب ومتدربة</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">15+</div>
                <div className="text-xs text-slate-500 mt-0.5">سنوات خبرة تعليمية</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-650 font-mono">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">تطبيق عملي خطوة بخطوة</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
