import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Users,
  UserPlus,
  Trash2,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { CorporateEmployee } from '../types';

export const CorporateDashboardView: React.FC = () => {
  const { corporateContract, addCorporateEmployee, removeCorporateEmployee, courses, addToast } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSeatRequestModal, setShowSeatRequestModal] = useState(false);

  // Form states for adding employee
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'إدارة المالية والحسابات',
    jobTitle: 'أخصائي تحليل بيانات',
    courseId: courses[0]?.id || 'c-1',
  });

  const [requestedSeats, setRequestedSeats] = useState(10);

  const employees: CorporateEmployee[] = corporateContract.employees || [];
  const occupiedSeats = corporateContract.occupiedSeats;
  const totalSeats = corporateContract.totalSeats;
  const availableSeats = totalSeats - occupiedSeats;

  const filteredEmployees = employees.filter((emp: CorporateEmployee) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast('يرجى ملء كافة الحقول الإلزامية للموظف', 'error');
      return;
    }

    if (availableSeats <= 0) {
      addToast('لا توجد مقاعد شاغرة! يرجى ترقية الخطة أو طلب مقاعد إضافية.', 'error');
      return;
    }

    const assignedCourse = courses.find((c) => c.id === formData.courseId);

    const newEmp: CorporateEmployee = {
      id: `emp-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      department: formData.department,
      jobTitle: formData.jobTitle,
      assignedCourseId: formData.courseId,
      assignedCourseTitle: assignedCourse ? assignedCourse.title : 'دورة مخصصة',
      progressPercentage: 0,
      status: 'active',
      enrolledAt: new Date().toISOString().split('T')[0],
      lastActiveAt: 'اليوم',
    };

    addCorporateEmployee(newEmp);
    addToast(`تم إضافة الموظف ${formData.name} بنجاح وإرسال بيانات الدخول لبريده!`, 'success');
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      department: 'إدارة المالية والحسابات',
      jobTitle: 'أخصائي تحليل بيانات',
      courseId: courses[0]?.id || 'c-1',
    });
  };

  const handleSeatRequest = () => {
    addToast(`تم رفع طلب إضافة ${requestedSeats} مقعداً جديداً بنجاح! سيتواصل معكم فريق SmartTech لتفعيلها.`, 'success');
    setShowSeatRequestModal(false);
  };

  const handleExportCSV = () => {
    const header = 'الاسم,البريد,القسم,المسمى الوظيفي,الدورة المسندة,نسبة الإنجاز,الحالة\n';
    const rows = employees
      .map(
        (e: CorporateEmployee) =>
          `"${e.name}","${e.email}","${e.department}","${e.jobTitle}","${e.assignedCourseTitle || ''}",${e.progressPercentage || e.overallProgressPercent || 0}%,"${e.status}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `تقرير_إنجاز_موظفي_${corporateContract.companyName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('تم تصدير تقرير إنجاز الموظفين بنجاح بصيغة CSV', 'success');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Contract Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-lg bg-red-600/30 text-red-400">
                <Building2 className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {corporateContract.contractNumber} · نشط
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {corporateContract.companyName}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              خطة التدريب المؤسسي المعتمدة · جهة الاتصال: {corporateContract.hrContactName} ({corporateContract.hrContactEmail})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSeatRequestModal(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>طلب مقاعد إضافية</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>تصدير التقرير الدوري (CSV)</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">إجمالي المقاعد المتعاقد عليها</div>
            <div className="text-2xl font-black text-slate-900 font-mono">{totalSeats} مقعد</div>
            <div className="text-[11px] text-slate-400 mt-1">ينتهي في: {corporateContract.renewalDate}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">المقاعد المشغولة حالياً</div>
            <div className="text-2xl font-black text-red-600 font-mono">{occupiedSeats} مقعد</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">متبقي {availableSeats} مقعد شاغر</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">متوسط نسبة إنجاز الفريق</div>
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {Math.round(employees.reduce((acc: number, e: CorporateEmployee) => acc + (e.progressPercentage || e.overallProgressPercent || 0), 0) / (employees.length || 1))}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">معدل التزام وتفاعل مرتفع</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">الشهادات الدولية الصادرة</div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {employees.filter((e: CorporateEmployee) => (e.progressPercentage || e.overallProgressPercent || 0) === 100).length} شهادة
            </div>
            <div className="text-[11px] text-slate-400 mt-1">معتمدة من SmartTech وCertiport</div>
          </div>
        </div>

        {/* Employees Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          
          {/* Table Header Action Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">سجل موظفي الشركة المسجلين بالبرنامج</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                يمكنك إضافة موظفين جدد، وتتبع مؤشرات حضورهم واختباراتهم العملية
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="بحث باسم الموظف أو البريد..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Add Employee Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>إضافة موظف جديد ({availableSeats} متبقي)</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">الموظف</th>
                  <th className="p-4">القسم والمسمى</th>
                  <th className="p-4">الدورة التدريبية المسندة</th>
                  <th className="p-4">نسبة الإنجاز</th>
                  <th className="p-4">آخر نشاط</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((emp: CorporateEmployee) => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{emp.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{emp.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-800">{emp.department}</div>
                      <div className="text-[11px] text-slate-500">{emp.jobTitle}</div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">
                      {emp.assignedCourseTitle}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              emp.progressPercentage === 100 ? 'bg-emerald-500' : 'bg-red-600'
                            }`}
                            style={{ width: `${emp.progressPercentage}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-700">
                          {emp.progressPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-[11px]">
                      {emp.lastActiveAt}
                    </td>
                    <td className="p-4">
                      {emp.progressPercentage === 100 ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          أتم الدورة ✓
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                          قيد التعلم
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من رغبتك في حذف ${emp.name} واسترداد المقعد؟`)) {
                            removeCorporateEmployee(emp.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                        title="حذف الموظف واسترداد المقعد"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12 p-4 text-slate-500 text-xs">
              لا يوجد موظفون مطابقون لشروط البحث الحالية.
            </div>
          )}

        </div>

      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-900 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              إضافة موظف جديد للمسار التدريبي
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              سيتم استهلاك مقعد تدريبي من رصيد الشركة ({availableSeats} مقاعد متاحة).
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الموظف *</label>
                <input
                  type="text"
                  required
                  placeholder="الاسم الثلاثي"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني المؤسسي *</label>
                <input
                  type="email"
                  required
                  placeholder="employee@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 ltr-text"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القسم</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 bg-white"
                  >
                    <option value="إدارة المالية والحسابات">إدارة المالية والحسابات</option>
                    <option value="الموارد البشرية (HR)">الموارد البشرية (HR)</option>
                    <option value="المبيعات والتسويق">المبيعات والتسويق</option>
                    <option value="سلاسل الإمداد والمشتريات">سلاسل الإمداد والمشتريات</option>
                    <option value="تكنولوجيا المعلومات (IT)">تكنولوجيا المعلومات (IT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المسمى الوظيفي</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الدورة التدريبية المسندة</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.careerPathTitle})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  تأكيد الإضافة وتفعيل المقعد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Seat Request Modal */}
      {showSeatRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-slate-900 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              طلب مقاعد تدريبية إضافية
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              يمكنك زيادة رصيد المقاعد الخاصة بشركتك بسعر الخصم المؤسسي المتفق عليه في العقد.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عدد المقاعد الإضافية:</label>
                <select
                  value={requestedSeats}
                  onChange={(e) => setRequestedSeats(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 bg-white"
                >
                  <option value={5}>+5 مقاعد</option>
                  <option value={10}>+10 مقاعد (خصم 15%)</option>
                  <option value={20}>+20 مقعداً (خصم 25%)</option>
                  <option value={50}>+50 مقعداً (خطة مخصصة)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div>الجهة: <b>{corporateContract.companyName}</b></div>
                <div>رقم العقد: <b>{corporateContract.contractNumber}</b></div>
                <div>المقاعد بعد الترقية: <b>{totalSeats + requestedSeats} مقعد</b></div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSeatRequestModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSeatRequest}
                  className="px-5 py-2 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  إرسال الطلب للإدارة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
