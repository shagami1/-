import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'هل الشهادات الصادرة من المنصة معتمدة ورسمية؟',
      a: 'نعم، مركز سمارت تك (SmartTech Training Center) هو مركز تدريب واختبارات دولي معتمد من Certiport وMicrosoft. عند إتمام المسار واجتياز التقييمات، تحصل على شهادة معتمدة مزودة برمز استجابة سريعة (QR Code) وكود تحقق مشفر يمكن لأي جهة عمل التحقق من أصالته فورياً عبر صفحة التحقق بالمنصة.'
    },
    {
      q: 'كيف يعمل مختبر إكسيل التفاعلي المباشر (Excel Lab)؟',
      a: 'المختبر يعمل بالكامل داخل متصفحك دون الحاجة لتثبيت أي برامج! يتضمن محرك حسابات حقيقي يدعم أكثر من 20 دالة شائعة (مثل SUM, AVERAGE, IF, VLOOKUP, COUNTIF, SUMIFS وغيرها). بمجرد كتابة المعادلة، يتحقق المحرك فوراً من النتيجة والصياغة ويمنحك نقاط خبرة XP وتوجيهات تصحيحية فورية.'
    },
    {
      q: 'ما هو نظام مكافآت ونقاط الولاء (Loyalty Points & XP)؟',
      a: 'لكل درس تشاهده أو تمرين إكسيل تنجزه أو كويز تجتازه، تحصل على نقاط خبرة (XP) وشارات إنجاز ترفع مستواك في المنصة. بالإضافة لذلك، تجمع نقاط ولاء مالية (كل 100 نقطة تعادل 10 جنيهات خصم مباشر) يمكنك تطبيقها فورياً عند شراء دورات أو مسارات جديدة.'
    },
    {
      q: 'هل توفر المنصة خطط اشتراك مخصصة للشركات والمؤسسات (B2B)؟',
      a: 'بالتأكيد. نوفر عقوداً سنوية ونصف سنوية للشركات مع لوحة تحكم خاصة بمسؤولي الموارد البشرية (HR Dashboard) لتوزيع المقاعد ومتابعة تقدم الموظفين، وتقارير تفصيلية جاهزة للتصدير، مع فواتير ضريبية رسمية مسجلة.'
    },
    {
      q: 'كيف يمكنني التواصل لحضور التدريب أو الاختبار الدولي بمقر المركز؟',
      a: 'يمكنكم زيارة مقر SmartTech Training Center بمدينة المنصورة، أو التواصل مباشرة عبر الهاتف والواتساب على الرقم الرسمي الموحد: 01227811948 لتحديد مواعيد الاختبارات الدولية أو جلسات التدريب الحضوري.'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C62828]" />
            <span>إجابات واضحة لاستفساراتكم</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            الأسئلة الشائعة حول المنصة والشهادات
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            كل ما تود معرفته عن نظام التعلم، الدفع، الاعتمادات، ومختبر إكسيل.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-slate-900 hover:text-[#C62828] transition select-none text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 mr-2 ${
                      isOpen ? 'rotate-180 text-[#C62828]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-red-50 border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C62828] text-white flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                لديك استفسار خاص أو ترغب في استشارة تعليمية؟
              </h4>
              <p className="text-xs text-slate-600">
                فريق خدمة العملاء جاهز للرد على مدار اليوم.
              </p>
            </div>
          </div>

          <a
            href="tel:01227811948"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs"
          >
            <span className="ltr-text font-mono">01227811948</span>
            <span>اتصل الآن</span>
          </a>
        </div>

      </div>
    </section>
  );
};
