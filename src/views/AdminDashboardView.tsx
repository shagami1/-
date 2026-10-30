import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Database,
  CreditCard,
  Video,
  Layers,
  Users,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Plus,
  Eye,
  Settings,
  HelpCircle
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    courses,
    erpSyncLogs,
    triggerErpSync,
    integrations,
    updateIntegrationSettings,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'erp' | 'payments' | 'video'>('overview');
  const [isSyncing, setIsSyncing] = useState(false);

  // Local settings copy
  const [paymentConfig, setPaymentConfig] = useState(integrations.payment);
  const [videoConfig, setVideoConfig] = useState(integrations.video);

  const handleSyncClick = () => {
    setIsSyncing(true);
    triggerErpSync();
    setTimeout(() => {
      setIsSyncing(false);
      addToast('اكتملت مزامنة بيانات طلاب مركز سمارت تك المنصورة بنجاح!', 'success');
    }, 1200);
  };

  const handleSavePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateIntegrationSettings('payment', paymentConfig);
    addToast('تم حفظ إعدادات بوابات الدفع (Paymob / Fawry) بنجاح!', 'success');
  };

  const handleSaveVideoSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateIntegrationSettings('video', videoConfig);
    addToast('تم حفظ إعدادات بث الفيديو المشفر (Bunny / Cloudflare Stream) بنجاح!', 'success');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-red-600/30 text-red-400">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                لوحة الإدارة والتحكم الفني
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">
              إدارة منصة «احترف ببساطة مع دكتورة شيماء»
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              متابعة المحتوى، طلاب مركز SmartTech، بوابات الدفع، والتكامل التقني
            </p>
          </div>

          <button
            onClick={handleSyncClick}
            disabled={isSyncing}
            className="px-4 py-2.5 bg-[#C62828] hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'جارِ المزامنة مع ERP...' : 'مزامنة فورية مع قاعدة طلاب المركز'}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
          {[
            { id: 'overview', label: 'المؤشرات العامة', icon: TrendingUp },
            { id: 'courses', label: `إدارة الدورات (${courses.length})`, icon: Layers },
            { id: 'erp', label: 'تكامل SmartTech ERP', icon: Database },
            { id: 'payments', label: 'بوابات الدفع (Paymob / Fawry)', icon: CreditCard },
            { id: 'video', label: 'حماية واستضافة الفيديو', icon: Video }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 mb-1">إجمالي الطلاب المسجلين</div>
                <div className="text-2xl font-black text-slate-900 font-mono">1,840 طالب</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">+142 هذا الشهر</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 mb-1">تمارين إكسيل المنجزة في المختبر</div>
                <div className="text-2xl font-black text-emerald-600 font-mono">14,250 تمرين</div>
                <div className="text-[11px] text-slate-400 mt-1">تصحيح فوري 100% بدون أخطاء</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 mb-1">الشهادات المعتمدة الصادرة</div>
                <div className="text-2xl font-black text-[#C62828] font-mono">680 شهادة</div>
                <div className="text-[11px] text-slate-400 mt-1">معتمدة برمز QR وفحص رقمي</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 mb-1">عقود الشركات النشطة</div>
                <div className="text-2xl font-black text-slate-900 font-mono">12 شركة</div>
                <div className="text-[11px] text-slate-400 mt-1">320 مقعداً قيد الاستخدام</div>
              </div>
            </div>

            {/* Recent ERP Sync Log Snapshot */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">
                  آخر عمليات المزامنة واستيراد الطلاب من نظام المركز
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  SmartTech ERP v2.4 API
                </span>
              </div>

              <div className="space-y-2">
                {erpSyncLogs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div>
                        <span className="font-bold text-slate-900">{log.studentName}</span>
                        <span className="text-slate-400 mx-2">·</span>
                        <span className="text-slate-600">{log.courseEnrolled}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
                      <span>كود الطالب: {log.studentCode}</span>
                      <span>{log.syncedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Courses Management */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">قائمة الدورات المنشورة</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  إدارة المحتوى، التسعير بالجنيه المصري، وربط التمارين التفاعلية
                </p>
              </div>

              <button
                onClick={() => addToast('شاشة إنشاء دورة تدريبية جديدة جاهزة للإضافة', 'info')}
                className="px-4 py-2 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة دورة تدريبية</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">الدورة والمسار</th>
                    <th className="p-4">المستوى</th>
                    <th className="p-4">الدروس والوحدات</th>
                    <th className="p-4">السعر</th>
                    <th className="p-4">التقييم والطلاب</th>
                    <th className="p-4">مختبر إكسيل</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((c) => {
                    const totalLessons = c.modules.reduce((sum, m) => sum + m.lessons.length, 0);
                    return (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition">
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{c.title}</div>
                          <div className="text-[11px] text-red-600">{c.careerPathTitle}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                            {c.level}
                          </span>
                        </td>
                        <td className="p-4 font-mono">
                          {c.modules.length} وحدات / {totalLessons} درس
                        </td>
                        <td className="p-4 font-bold text-slate-900 font-mono">
                          {c.priceEgp} ج.م
                        </td>
                        <td className="p-4 text-slate-600">
                          ⭐ {c.rating} ({c.studentsCount} طالب)
                        </td>
                        <td className="p-4">
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                            مفعل تلقائياً
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            منشورة
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ERP Integration */}
        {activeTab === 'erp' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-5 h-5 text-red-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    الربط مع نظام SmartTech ERP الداخلي للفرع
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  استيراد وتزامن بيانات متدربي قاعات مركز سمارت تك بالمنصورة ومنحهم صلاحيات الوصول المباشر
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>DEMO INTEGRATION ACTIVE</span>
                </span>

                <button
                  onClick={handleSyncClick}
                  disabled={isSyncing}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>مزامنة الدفعة الآن</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between">
                <span>نقطة نهاية الـ API: <code className="ltr-text text-slate-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-300">https://erp.smarttech-eg.com/api/v2/students/sync</code></span>
                <span className="text-emerald-700 font-bold">الحالة: متصل بنجاح</span>
              </div>
              <div>مقر التدريب المربوط: <b>SmartTech Training Center - Mansoura Branch</b></div>
              <div>رقم الاتصال المربوط بالمركز: <b className="ltr-text font-mono">01227811948</b></div>
            </div>

            {/* Sync History Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                سجل الطلاب المستوردين مؤخراً من قاعدة بيانات المركز
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">كود الطالب</th>
                      <th className="p-3">اسم المتدرب</th>
                      <th className="p-3">الرقم القومي / المعرف</th>
                      <th className="p-3">الدورة المسجلة</th>
                      <th className="p-3">تاريخ ووقت المزامنة</th>
                      <th className="p-3">حالة الاستيراد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {erpSyncLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/70">
                        <td className="p-3 font-mono font-bold text-slate-900">{log.studentCode}</td>
                        <td className="p-3 font-bold text-slate-800">{log.studentName}</td>
                        <td className="p-3 font-mono text-slate-500">{log.nationalId}</td>
                        <td className="p-3 text-slate-700">{log.courseEnrolled}</td>
                        <td className="p-3 font-mono text-slate-500 text-[11px]">{log.syncedAt}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            تمت بنجاح ✓
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Payments Configuration */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-red-600" />
                  <span>إعدادات بوابات الدفع الإلكتروني (Paymob & Fawry)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  دعم بطاقات ميزة، فيزا، ماستركارد، ومحافظ فودافون كاش ومنافذ فوري
                </p>
              </div>

              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono font-bold">
                SANDBOX / DEMO MODE
              </span>
            </div>

            <form onSubmit={handleSavePaymentSettings} className="space-y-6">
              {/* Paymob Section */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900">
                    بوابة Paymob (البطاقات البنكية + محافظ المحمول الإلكترونية)
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentConfig.paymobEnabled}
                      onChange={(e) =>
                        setPaymentConfig({ ...paymentConfig, paymobEnabled: e.target.checked })
                      }
                      className="rounded text-[#C62828] focus:ring-red-500"
                    />
                    <span>تفعيل بوابة Paymob</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Paymob API Key (Public Token)
                    </label>
                    <input
                      type="text"
                      value={paymentConfig.paymobApiKey}
                      onChange={(e) =>
                        setPaymentConfig({ ...paymentConfig, paymobApiKey: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono ltr-text focus:outline-none focus:border-red-600 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Integration Frame ID
                    </label>
                    <input
                      type="text"
                      value={paymentConfig.paymobIframeId}
                      onChange={(e) =>
                        setPaymentConfig({ ...paymentConfig, paymobIframeId: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono ltr-text focus:outline-none focus:border-red-600 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Fawry Section */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900">
                    بوابة فوري (Fawry Pay - الدفع عبر المنافذ والأكشاك)
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentConfig.fawryEnabled}
                      onChange={(e) =>
                        setPaymentConfig({ ...paymentConfig, fawryEnabled: e.target.checked })
                      }
                      className="rounded text-[#C62828] focus:ring-red-500"
                    />
                    <span>تفعيل الدفع عبر فوري</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fawry Merchant Code
                    </label>
                    <input
                      type="text"
                      value={paymentConfig.fawryMerchantCode}
                      onChange={(e) =>
                        setPaymentConfig({ ...paymentConfig, fawryMerchantCode: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono ltr-text focus:outline-none focus:border-red-600 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fawry Security Key
                    </label>
                    <input
                      type="password"
                      value={paymentConfig.fawrySecurityKey}
                      onChange={(e) =>
                        setPaymentConfig({ ...paymentConfig, fawrySecurityKey: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono ltr-text focus:outline-none focus:border-red-600 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  حفظ إعدادات بوابات الدفع
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: Video Security & DRM */}
        {activeTab === 'video' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-red-600" />
                <span>حماية وبث محاضرات الفيديو (Bunny.net Stream / Cloudflare)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                تأمين الملكية الفكرية لشروحات دكتورة شيماء ومنع التحميل غير المصرح به
              </p>
            </div>

            <form onSubmit={handleSaveVideoSettings} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  مزود البث المعتمد (Video Provider)
                </label>
                <select
                  value={videoConfig.provider}
                  onChange={(e) => setVideoConfig({ ...videoConfig, provider: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 bg-white"
                >
                  <option value="bunny_stream">Bunny.net Stream (تشفير HLS فائق السرعة)</option>
                  <option value="cloudflare_stream">Cloudflare Stream (حماية متقدمة)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Video Pull Zone / Library ID
                </label>
                <input
                  type="text"
                  value={videoConfig.libraryId}
                  onChange={(e) => setVideoConfig({ ...videoConfig, libraryId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono ltr-text focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                ✓ خاصية العلامة المائية الديناميكية (Dynamic Watermark) برقم هاتف الطالب مفعلة افتراضياً لمنع تصوير الشاشة.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  حفظ إعدادات البث والحماية
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
