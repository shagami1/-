import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_PATHS } from '../data/mockData';
import { Search, Filter, BookOpen, Clock, Award, Star, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Course } from '../types';

export const CoursesCatalogView: React.FC = () => {
  const { courses, setSelectedCourseId, setCurrentView, enrollCourse, enrollments, user } = useApp();
  const [selectedPath, setSelectedPath] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesPath = selectedPath === 'all' || course.careerPathId === selectedPath;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description || course.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPath && matchesLevel && matchesSearch;
  });

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.courseId === courseId);
  };

  const handleOpenCourse = (course: Course) => {
    setSelectedCourseId(course.id);
    setCurrentView('course-detail');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="mb-10 text-center sm:text-right">
          <span className="text-xs font-bold text-[#C62828] bg-red-50 px-3 py-1 rounded inline-block mb-3">
            دليل الدورات والبرامج المتكاملة
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            اختر دورتك التدريبية وابدأ رحلة الاحتراف
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-2xl">
            محتوى تعليمي عملي مبني على متطلبات سوق العمل الحقيقي مع تطبيقات إكسيل تفاعلية واختبارات معتمدة.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث باسم الدورة أو المهارة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-4 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-600">المستوى:</span>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-red-600 bg-white"
            >
              <option value="all">كل المستويات</option>
              <option value="beginner">مبتدئ</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">متقدم</option>
            </select>
          </div>
        </div>

        {/* Career Path Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedPath('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              selectedPath === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            جميع المسارات ({courses.length})
          </button>
          {CAREER_PATHS.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                selectedPath === path.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {path.title}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const enrolled = isEnrolled(course.id);
            const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Course Image */}
                <div
                  className="relative aspect-16/9 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => handleOpenCourse(course)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded">
                    {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </div>
                  {course.isFeatured && (
                    <div className="absolute top-3 left-3 bg-[#C62828] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      مميز
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-red-600">
                        {course.careerPathTitle}
                      </span>
                      <div className="flex items-center gap-1 text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{course.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => handleOpenCourse(course)}
                      className="font-bold text-slate-900 text-base leading-snug group-hover:text-red-700 transition cursor-pointer mb-2"
                    >
                      {course.title}
                    </h3>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>

                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.durationHours} ساعة</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{totalLessons} درس</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-700 font-bold">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>+{course.xpReward} XP</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-black text-slate-900">
                          {course.priceEgp}{' '}
                          <span className="text-xs font-normal text-slate-500">ج.م</span>
                        </div>
                        {course.originalPriceEgp && (
                          <div className="text-[11px] text-slate-400 line-through">
                            {course.originalPriceEgp} ج.م
                          </div>
                        )}
                      </div>

                      {enrolled ? (
                        <button
                          onClick={() => handleOpenCourse(course)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>متابعة التعلم</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenCourse(course)}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition"
                          >
                            التفاصيل
                          </button>
                          <button
                            onClick={() => enrollCourse(course.id)}
                            className="px-4 py-2 bg-[#C62828] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                          >
                            تسجيل فوري
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">لا توجد دورات مطابقة للبحث</h3>
            <p className="text-xs text-slate-500 mt-1">جرب تغيير كلمات البحث أو تصفية المسارات</p>
          </div>
        )}

      </div>
    </div>
  );
};
