import React from 'react';
import { Clock, BookOpen, Sparkles, Check, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COURSES } from '../../data/mockData';

export const FeaturedCoursesSection: React.FC = () => {
  const { setCurrentView, setSelectedCourseId, enrollInCourse, enrollments } = useApp();

  const handleViewCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-detail');
  };

  const handleEnrollNow = (courseId: string) => {
    enrollInCourse(courseId);
    setSelectedCourseId(courseId);
    setCurrentView('student-learn');
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-red-600 tracking-wider uppercase block mb-1">
              الدورات الأكثر طلباً في سوق العمل
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              دورات تدريبية عملية بإشراف دكتورة شيماء
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('courses')}
            className="text-xs md:text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group self-start md:self-auto cursor-pointer"
          >
            <span>استعراض كافة الدورات ({COURSES.length})</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.slice(0, 3).map((course) => {
            const isEnrolled = enrollments.some(e => e.courseId === course.id);

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Image Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {course.isPopular && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-md">
                      الأعلى تقييماً
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.durationHours} ساعة تدريبية</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>المستوى: {course.level}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {course.lessonsCount} درس تطبيقي
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-slate-900 font-mono">
                          {course.price}
                        </span>
                        <span className="text-xs font-bold text-slate-500">ج.م</span>
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through font-mono">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        شهادة معتمدة مشمولة
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewCourse(course.id)}
                        className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        التفاصيل
                      </button>

                      {isEnrolled ? (
                        <button
                          onClick={() => {
                            setSelectedCourseId(course.id);
                            setCurrentView('student-learn');
                          }}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>متابعة التعلم</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnrollNow(course.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                        >
                          سجل الآن
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
