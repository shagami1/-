import React from 'react';
import { PhoneCall, ShieldCheck, Mail, MapPin, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                ST
              </div>
              <div>
                <span className="text-lg font-black text-white block">احترف ببساطة</span>
                <span className="text-xs text-red-400 font-bold block">مع دكتورة شيماء</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              المنصة التعليمية الرسمية لمركز سمارتك للتدريب المتطور. ننقل خبرات 15 عاماً في برامج إكسل المتقدمة، تحليل البيانات، والمهارات الرقمية مباشرة إلى شاشتك بأسلوب عملي مبسط.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-red-500" />
                <span className="font-mono">هاتف الاستفسار والواتساب: 01227811948</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>مركز اختبارات معتمد Certiport & Microsoft</span>
              </div>
            </div>
          </div>

          {/* Col 2: Learning Tracks */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-slate-800 pb-2">
              المسارات التعليمية المعتمدة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('paths')} className="hover:text-white transition-colors">
                  مسار الموظف الرقمي الشامل
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('paths')} className="hover:text-white transition-colors">
                  مسار محترف إكسل (Excel Professional)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('paths')} className="hover:text-white transition-colors">
                  مسار تحليل ذكاء الأعمال (Power BI & DAX)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('paths')} className="hover:text-white transition-colors">
                  مسار قواعد البيانات والبرمجة (SQL & Python)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('paths')} className="hover:text-white transition-colors">
                  مسار علم البيانات والذكاء الاصطناعي
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Portals */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-slate-800 pb-2">
              الخدمات والبوابات
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('corporate-training')} className="hover:text-white transition-colors">
                  تدريب الشركات وخطط المؤسسات B2B
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('student-success')} className="hover:text-white transition-colors">
                  معرض إنجازات الطلاب وحفلات التخرج
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('verify')} className="hover:text-white transition-colors">
                  التحقق من صحة الشهادات المعتمدة
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors">
                  عن مركز سمارتك ودكتورة شيماء
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
                  الأسئلة الشائعة والدعم الفني
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Accreditations */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-slate-800 pb-2">
              الاعتمادات والتراخيص
            </h4>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>اعتمادات دولية ومحلية موثقة</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                شهادات المنصة مؤهلة لاختبارات مايكروسوفت الدولية MOS واختبارات أدوبي الدولية والشبكة الأهلية للتعليم NEN.
              </p>
              <div className="pt-2 border-t border-slate-700 text-[11px] text-slate-400">
                <span>كود التحقق والترخيص الضريبي مسجل رسمياً.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} احترف ببساطة مع دكتورة شيماء • مركز سمارتك للتدريب المتطور (SmartTech Center).
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('privacy')} className="hover:text-slate-400 transition-colors">سياسة الخصوصية</button>
            <span>•</span>
            <button onClick={() => setCurrentView('terms')} className="hover:text-slate-400 transition-colors">الشروط والأحكام</button>
            <span>•</span>
            <button onClick={() => setCurrentView('refund-policy')} className="hover:text-slate-400 transition-colors">سياسة الاسترجاع</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
