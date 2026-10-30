import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  BookOpen,
  Sparkles,
  Coins,
  CheckCircle2,
  Clock,
  Play,
  FileSpreadsheet,
  Download,
  Share2,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BADGES_LIST } from '../data/mockData';

export const StudentDashboardView: React.FC = () => {
  const {
    user,
    courses,
    enrollments,
    certificates,
    setSelectedCourseId,
    setSelectedLessonId,
    setCurrentView,
    openExcelLab,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'badges' | 'points'>('courses');

  // Enrolled courses details
  const myCourses = enrollments.map((enr) => {
    const course = courses.find((c) => c.id === enr.courseId);
    return {
      enrollment: enr,
      course
    };
  }).filter((item) => item.course !== undefined);

  const handleResumeCourse = (courseId: string) => {
    const enr = enrollments.find((e) => e.courseId === courseId);
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    // Find first uncompleted lesson
    const allLessons = course.modules.flatMap((m) => m.lessons);
    const nextLesson = allLessons.find((l) => !enr?.completedLessonIds.includes(l.id)) || allLessons[0];

    setSelectedCourseId(courseId);
    setSelectedLessonId(nextLesson.id);
    setCurrentView('lesson-player');
  };

  const handleViewCertificate = (code: string) => {
    // Open verification view or modal for this certificate
    setCurrentView('verify-certificate');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Welcome Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-red-500 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">{user.name}</h1>
                  <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold">
                    المستوى {user.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  طالب بمركز SmartTech · مسار محترف إكسيل وتحليل البيانات
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center">
                <div className="text-xs text-slate-400">نقاط الخبرة XP</div>
                <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                  {user.xp}
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center">
                <div className="text-xs text-slate-400">نقاط الولاء</div>
                <div className="text-lg font-black text-amber-400 font-mono mt-0.5">
                  {user.loyaltyPoints}
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center">
                <div className="text-xs text-slate-400">الدورات المسجلة</div>
                <div className="text-lg font-black text-white font-mono mt-0.5">
                  {enrollments.length}
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center">
                <div className="text-xs text-slate-400">الشهادات المكتسبة</div>
                <div className="text-lg font-black text-[#C62828] font-mono mt-0.5">
                  {certificates.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
          {[
            { id: 'courses', label: `دوراتي التعليمية (${myCourses.length})`, icon: BookOpen },
            { id: 'certificates', label: `الشهادات المعتمدة (${certificates.length})`, icon: Award },
            { id: 'badges', label: 'الشارات والإنجازات', icon: Sparkles },
            { id: 'points', label: 'رصيد ومكافآت الولاء', icon: Coins }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#C62828] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCourses.map(({ course, enrollment }) => {
                if (!course) return null;
                const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
                const isFinished = enrollment.progressPercentage === 100;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-16/9 bg-slate-100">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {course.careerPathTitle}
                        </div>
                        {isFinished && (
                          <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>مكتمل بنجاح</span>
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-slate-900 text-base mb-2">
                          {course.title}
                        </h3>

                        {/* Progress Bar */}
                        <div className="space-y-1.5 mb-4">
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>نسبة الإنجاز:</span>
                            <span className="font-bold text-slate-900 font-mono">
                              {enrollment.progressPercentage}% ({enrollment.completedLessonIds.length} من {totalLessons} درس)
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isFinished ? 'bg-emerald-500' : 'bg-[#C62828]'
                              }`}
                              style={{ width: `${enrollment.progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <button
                        onClick={() => openExcelLab('ex-1')}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>فتح تمارين الإكسيل</span>
                      </button>

                      <button
                        onClick={() => handleResumeCourse(course.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          isFinished
                            ? 'bg-slate-900 hover:bg-slate-800 text-white'
                            : 'bg-[#C62828] hover:bg-red-700 text-white shadow-xs'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isFinished ? 'مراجعة المحتوى' : 'متابعة الدورة'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {myCourses.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">لم تسجل في أي دورة بعد</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">استكشف دليل الدورات وابدأ مسارك المهني الآن</p>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="px-5 py-2.5 bg-[#C62828] text-white rounded-lg text-xs font-bold"
                >
                  تصفح الدورات المتاحة
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Accredited Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>شهادة موثقة ورسمية</span>
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {cert.certificateCode}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      {cert.courseTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      مُنحت إلى: <b className="text-slate-800">{cert.studentName}</b> · تاريخ الإصدار: {cert.issueDate}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                      <div>جهة الاعتماد: <b>SmartTech Training Center & Certiport</b></div>
                      <div>الدرجة المحققة: <b>{cert.grade}% (ممتاز مع مرتبة الشرف)</b></div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleViewCertificate(cert.certificateCode)}
                      className="px-4 py-2 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>عرض وطباعة الشهادة</span>
                    </button>

                    <button
                      onClick={() => addToast('تم نسخ رابط التحقق من الشهادة للحافظة!', 'success')}
                      className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition"
                      title="مشاركة رابط التحقق"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {certificates.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">لا توجد شهادات بعد</h3>
                <p className="text-xs text-slate-500 mt-1">أكمل جميع دروس الدورة التدريبية لتحصل فورياً على شهادتك المعتمدة</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Badges & Gamification */}
        {activeTab === 'badges' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-1">شارات الإنجاز والتميز</h3>
            <p className="text-xs text-slate-500 mb-6">
              اجمع الشارات بإكمال التطبيقات العملية وحل معادلات إكسيل المعقدة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {BADGES_LIST.map((badge) => {
                const userBadges = user.badges || user.unlockedBadgeIds || [];
                const isEarned = userBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border text-center transition ${
                      isEarned
                        ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="font-bold text-xs text-slate-900 mb-1">{badge.title}</div>
                    <div className="text-[11px] text-slate-500 leading-relaxed">{badge.description}</div>
                    <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] font-bold">
                      {isEarned ? (
                        <span className="text-emerald-700">✓ تم الفوز بالشارة</span>
                      ) : (
                        <span className="text-slate-400">قفل الإنجاز</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Loyalty Points & Rewards */}
        {activeTab === 'points' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">برنامج مكافآت ونقاط الولاء</h3>
                <p className="text-xs text-slate-500">حول تفوقك التعليمي إلى خصومات مالية حقيقية</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-800">رصيدك الحالي:</span>
                <div className="text-2xl font-black text-amber-900 font-mono mt-0.5">
                  {user.loyaltyPoints || user.rewardPoints || 0} نقطة
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-800">القيمة المالية المعادلة:</span>
                <div className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
                  {Math.floor((user.loyaltyPoints || user.rewardPoints || 0) / 10)} ج.م خصم
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              <h4 className="font-bold text-slate-900 text-xs">قواعد تحصيل النقاط:</h4>
              <p>• تحصل على 100 نقطة ولاء عند إتمام أي دورة تدريبية كاملة.</p>
              <p>• تحصل على 20 نقطة ولاء إضافية عند إتمام 5 تمارين إكسيل بنتيجة 100%.</p>
              <p>• يمكنك تفعيل الخصم مباشرة عند شراء أي دورة جديدة من صفحة الدورة بنقرة واحدة.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
