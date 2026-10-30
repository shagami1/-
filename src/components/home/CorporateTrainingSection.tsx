import React, { useState } from 'react';
import { Building2, Users, FileSpreadsheet, ShieldCheck, ArrowLeft, CheckCircle2, Send, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateTrainingSection: React.FC = () => {
  const { addToast, setCurrentRole, setCurrentView } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    seatsNeeded: '25',
    track: 'excel-pro',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) {
      addToast('يرجى استكمال البيانات الإلزامية لطلب العرض', 'error');
      return;
    }

    addToast('تم استلام طلب التعاقد للشركات بنجاح! سيتواصل فريق التدريب معكم خلال 24 ساعة.', 'success');
    setShowModal(false);
  };

  const handleOpenHRDemo = () => {
    setCurrentRole('corporate_hr');
    setCurrentView('corporate');
    addToast('تم الانتقال إلى لوحة تحكم مسؤولي الموارد البشرية والشركات (HR Dashboard)', 'info');
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Subtle grid background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>حلول الشركات والمؤسسات (SmartTech Corporate SaaS)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              طور كفاءة فريق عملك في تحليل البيانات وإتقان إكسيل
            </h2>

            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              نوفر للشركات والمصارف والمؤسسات الحكومية والخاصة خطط تدريب تعاقدية مخصصة تشمل لوحة تحكم لإدارة مقاعد الموظفين، تقارير حضور وإنجاز دورية، ومختبرات عمل تفاعلية تلائم طبيعة عملكم.
            </p>

            {/* Feature Checklist */}
            <div className="mt-6 space-y-3">
              {[
                'لوحة تحكم كاملة للموارد البشرية (HR SaaS) لمتابعة تقدم كل موظف واختباراته.',
                'إمكانية إدارة وتوزيع المقاعد (Seats Allocation) وإعادة تعيينها.',
                'مشاريع وتطبيقات واقعية من ملفات العمل الخاصة بشركتكم (Custom Case Studies).',
                'شهادات معتمدة لكل موظف مع كود تحقق مشفر وفحص فوري للمهارة.',
                'عقود سنوية ونصف سنوية ميسرة مع فواتير ضريبية رسمية من مركز سمارت تك.'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-sm font-bold transition shadow-lg inline-flex items-center gap-2"
              >
                <span>طلب عرض أسعار مخصص لمؤسستك</span>
                <Send className="w-4 h-4" />
              </button>

              <button
                onClick={handleOpenHRDemo}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-sm font-semibold transition inline-flex items-center gap-2"
              >
                <span>معاينة لوحة تحكم الشركات (HR Demo)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Corporate Card Preview */}
          <div className="lg:col-span-6">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <span className="text-xs text-slate-400">عقد تدريبي نشط تجريبي</span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    مجموعة الدلتا للاستثمار والخدمات المصرفية
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  Active Contract #ST-CORP-2026
                </span>
              </div>

              {/* Seats Metric Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>المقاعد المشغولة: <b className="text-white">18 من 25 مقعد</b></span>
                  <span className="text-emerald-400 font-mono font-bold">72% نسبة الإنجاز العام</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 to-emerald-500 h-full w-[72%]" />
                </div>
              </div>

              {/* Sample Employees mini list */}
              <div className="mt-6 space-y-2">
                <div className="text-xs font-bold text-slate-400 mb-1">
                  عينة من موظفي الفريق المسجلين:
                </div>
                {[
                  { name: 'م. أحمد الشربيني', dept: 'إدارة المالية', course: 'احترف إكسيل من الصفر حتى VBA', progress: 85 },
                  { name: 'سارة عبد الرحمن', dept: 'الموارد البشرية', course: 'تحليل البيانات وإعداد التقارير', progress: 60 },
                  { name: 'كريم الباز', dept: 'المشتريات', course: 'احترف إكسيل من الصفر حتى VBA', progress: 100 }
                ].map((emp, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-750 text-xs">
                    <div>
                      <div className="font-semibold text-white">{emp.name}</div>
                      <div className="text-[11px] text-slate-400">{emp.dept} · {emp.course}</div>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{emp.progress}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <span>تجديد العقد: 31 ديسمبر 2026</span>
                <button
                  onClick={handleOpenHRDemo}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  الدخول لإدارة الموظفين ←
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal for Requesting Proposal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              طلب عرض أسعار لتدريب الشركات والمؤسسات
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              سيتواصل معكم مستشار التدريب بمركز SmartTech لتصميم الخطة الملائمة لفريق عملكم.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم الشركة / المؤسسة *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شركة النيل للخدمات اللوجستية"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    اسم المسؤول *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهاتف / واتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 ltr-text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  البريد الإلكتروني للعمل *
                </label>
                <input
                  type="email"
                  required
                  placeholder="hr@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 ltr-text"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    عدد المقاعد المتوقع
                  </label>
                  <select
                    value={formData.seatsNeeded}
                    onChange={(e) => setFormData({ ...formData, seatsNeeded: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 bg-white"
                  >
                    <option value="10">10 مقاعد (فريق صغير)</option>
                    <option value="25">25 مقعد (خطة قياسية)</option>
                    <option value="50">50 مقعد (مؤسسة متوسطة)</option>
                    <option value="100+">أكثر من 100 مقعد (خطة مخصصة)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    المسار التدريبي المطلوب
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 bg-white"
                  >
                    <option value="excel-pro">احترف إكسيل المتقدم</option>
                    <option value="data-analysis">تحليل البيانات وإعداد التقارير</option>
                    <option value="digital-employee">الموظف الرقمي المتكامل</option>
                    <option value="custom">مزيج من المسارات السابقة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ملاحظات أو متطلبات إضافية
                </label>
                <textarea
                  rows={2}
                  placeholder="أذكر هنا أي برامج خاصة أو مواعيد مفضلة للتدريب..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  إرسال الطلب الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
