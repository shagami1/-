import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  BookOpen,
  Clock,
  Award,
  Star,
  CheckCircle2,
  Play,
  FileSpreadsheet,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Lock,
  Tag,
  Coins
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    setCurrentView,
    enrollCourse,
    enrollments,
    setSelectedLessonId,
    user
  } = useApp();

  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('mod-1');
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState<boolean>(false);

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const isEnrolled = enrollments.some((e) => e.courseId === course.id);

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  // Discount calculation
  // 100 points = 10 EGP
  const priceEgp = course.priceEgp || course.price || 450;
  const pointsAvailable = user.loyaltyPoints || user.rewardPoints || 0;
  const maxDiscountEgp = Math.min(priceEgp, Math.floor(pointsAvailable / 10));
  const finalPrice = useLoyaltyPoints ? Math.max(0, priceEgp - maxDiscountEgp) : priceEgp;

  const handleStartLesson = (lessonId: string) => {
    if (!isEnrolled) {
      enrollCourse(course.id);
    }
    setSelectedLessonId(lessonId);
    setCurrentView('lesson-player');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button
            onClick={() => setCurrentView('courses')}
            className="hover:text-red-700 flex items-center gap-1 font-semibold"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لدليل الدورات</span>
          </button>
          <span>/</span>
          <span className="text-slate-700">{course.careerPathTitle}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content (Curriculum & Details) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-red-100 text-[#C62828] text-xs font-bold">
                  {course.careerPathTitle}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                  المستوى: {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mr-auto">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.studentsCount} متدرب)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                {course.title}
              </h1>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Course Instructor Snippet */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={course.instructor?.avatar || '/assets/aistudio/IMG_7351_f456e96d.jpg'}
                  alt={course.instructor?.name || 'دكتورة شيماء العجمي'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                />
                <div>
                  <div className="text-xs text-slate-500">تقديم وإشراف</div>
                  <div className="text-sm font-bold text-slate-900">{course.instructor?.name || 'دكتورة شيماء العجمي'}</div>
                  <div className="text-xs text-slate-600">{course.instructor?.title || 'استشاري ومدرب معتمد'}</div>
                </div>
              </div>
            </div>

            {/* What you will learn */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>ماذا ستكتسب وتتقن في هذه الدورة؟</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(course.whatYouWillLearn || course.outcomes || []).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">المنهج الدراسي ومحتوى الوحدات</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.modules.length} وحدات تدريبية · {totalLessons} درس عملي وتمرين تفاعلي
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.modules.map((module, mIdx) => {
                  const isExpanded = expandedModuleId === module.id;
                  return (
                    <div
                      key={module.id}
                      className="border border-slate-200 rounded-xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 text-right transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                            {mIdx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{module.title}</div>
                            <div className="text-[11px] text-slate-500">{module.description}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            {module.lessons.length} دروس
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isExpanded ? 'rotate-180 text-red-600' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              onClick={() => handleStartLesson(lesson.id)}
                              className="p-3.5 hover:bg-red-50/40 transition flex items-center justify-between cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.type === 'spreadsheet' ? (
                                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                ) : lesson.type === 'quiz' ? (
                                  <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                ) : (
                                  <Play className="w-4 h-4 text-red-600 flex-shrink-0" />
                                )}

                                <div>
                                  <div className="text-xs font-semibold text-slate-800 group-hover:text-red-700 transition">
                                    {lesson.title}
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                    <span>{lesson.durationMinutes} دقيقة</span>
                                    <span>·</span>
                                    <span className="text-emerald-700 font-semibold">+{lesson.xpReward} XP</span>
                                    {lesson.type === 'spreadsheet' && (
                                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded">
                                        تطبيق تفاعلي
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <button className="text-xs text-[#C62828] font-bold group-hover:underline">
                                {isEnrolled ? 'تشغيل الدرس ←' : 'معاينة ←'}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3">المتطلبات السابقة</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {course.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar (Enrollment & Pricing Box) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg p-6">
              
              {/* Preview Image Frame */}
              <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-6 border border-slate-200">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleStartLesson(course.modules[0]?.lessons[0]?.id || '')}
                  className="absolute inset-0 bg-slate-900/40 hover:bg-slate-900/60 transition flex items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C62828] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </button>
              </div>

              {/* Price Details */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    {finalPrice}
                  </span>
                  <span className="text-sm font-semibold text-slate-600">جنيه مصري</span>
                  {course.originalPriceEgp && (
                    <span className="text-xs text-slate-400 line-through mr-2">
                      {course.originalPriceEgp} ج.م
                    </span>
                  )}
                </div>

                {course.originalPriceEgp && (
                  <div className="text-xs text-emerald-600 font-bold mt-1">
                    خصم خاص لفترة محدودة · وفر {course.originalPriceEgp - priceEgp} ج.م
                  </div>
                )}
              </div>

              {/* Loyalty Points Redemption Box */}
              {(user.loyaltyPoints || user.rewardPoints || 0) > 0 && !isEnrolled && (
                <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-amber-900 flex items-center gap-1">
                      <Coins className="w-4 h-4 text-amber-600" />
                      رصيد نقاط الولاء: {user.loyaltyPoints || user.rewardPoints} نقطة
                    </span>
                    <span className="text-[11px] text-amber-700">خصم يصل لـ {maxDiscountEgp} ج.م</span>
                  </div>

                  <label className="flex items-center gap-2 text-slate-800 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useLoyaltyPoints}
                      onChange={(e) => setUseLoyaltyPoints(e.target.checked)}
                      className="rounded border-amber-400 text-[#C62828] focus:ring-red-500"
                    />
                    <span>استبدال النقاط والحصول على الخصم المالي</span>
                  </label>
                </div>
              )}

              {/* Enrollment CTA */}
              {isEnrolled ? (
                <button
                  onClick={() => handleStartLesson(course.modules[0]?.lessons[0]?.id || '')}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>أنت مسجل بالفعل · دخول للمشاهدة الآن</span>
                </button>
              ) : (
                <button
                  onClick={() => enrollCourse(course.id)}
                  className="w-full py-3.5 bg-[#C62828] hover:bg-red-700 text-white rounded-xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  <span>تأكيد التسجيل وبدء الدورة</span>
                </button>
              )}

              {/* Course Features List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    مدة المحتوى
                  </span>
                  <span className="font-semibold text-slate-800">{course.durationHours} ساعة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    إجمالي الدروس
                  </span>
                  <span className="font-semibold text-slate-800">{totalLessons} درس</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                    المختبرات التفاعلية
                  </span>
                  <span className="font-semibold text-emerald-600">نعم، متضمنة مجاناً</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-slate-400" />
                    شهادة إتمام معتمدة
                  </span>
                  <span className="font-semibold text-slate-800">برمز QR رسمي</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    صلاحية الوصول
                  </span>
                  <span className="font-semibold text-slate-800">مدى الحياة</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
