import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  FileSpreadsheet,
  HelpCircle,
  Download,
  CheckCircle2,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Lock,
  Layers,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { ExcelLabView } from '../components/ExcelLabView';

export const LessonPlayerView: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    setCurrentView,
    completeLesson,
    enrollments,
    openExcelLab,
    addToast
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'excel' | 'quiz' | 'downloads'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const enrollment = enrollments.find((e) => e.courseId === course.id);

  // Flatten lessons to find current, next, previous
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === selectedLessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const nextLesson = allLessons[currentLessonIndex + 1];
  const prevLesson = allLessons[currentLessonIndex - 1];

  const isCompleted = enrollment?.completedLessonIds.includes(currentLesson.id);

  const handleToggleComplete = () => {
    if (!isCompleted) {
      completeLesson(course.id, currentLesson.id);
    }
  };

  const handleNextLesson = () => {
    if (!isCompleted) {
      completeLesson(course.id, currentLesson.id);
    }
    if (nextLesson) {
      setSelectedLessonId(nextLesson.id);
      setActiveTab(nextLesson.type === 'spreadsheet' ? 'excel' : nextLesson.type === 'quiz' ? 'quiz' : 'overview');
      setQuizSubmitted(false);
      setSelectedAnswers({});
    } else {
      addToast('أحسنت! لقد أتممت جميع دروس هذه الدورة التدريبية بنجاح!', 'success');
      setCurrentView('student-dashboard');
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      setSelectedLessonId(prevLesson.id);
      setActiveTab(prevLesson.type === 'spreadsheet' ? 'excel' : prevLesson.type === 'quiz' ? 'quiz' : 'overview');
      setQuizSubmitted(false);
      setSelectedAnswers({});
    }
  };

  const handleQuizAnswer = (qId: string, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!currentLesson.quiz) return;
    let score = 0;
    currentLesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score === currentLesson.quiz.length) {
      completeLesson(course.id, currentLesson.id);
      addToast(`درجة ممتازة! حققت ${score} من ${currentLesson.quiz.length}، وتم منحك نقاط XP!`, 'success');
    } else {
      addToast(`حققت ${score} من ${currentLesson.quiz.length}. يمكنك مراجعة الإجابات وإعادة المحاولة`, 'info');
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      
      {/* Top LMS Header Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('course-detail')}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1.5 font-semibold"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline">تفاصيل الدورة</span>
          </button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 truncate max-w-xs sm:max-w-md hidden md:inline">
              {course.title}
            </span>
            <span className="text-slate-600 hidden md:inline">›</span>
            <span className="font-bold text-white truncate max-w-xs">
              {currentLesson.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>مكتمل</span>
            </span>
          ) : (
            <button
              onClick={handleToggleComplete}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold transition flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>تحديد كمكتمل</span>
            </button>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold transition"
            title="تبديل قائمة الدروس"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Grid: Player + Content & Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column (Video/Player & Lesson Content) */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Video Player Container */}
          <div className="relative aspect-16/9 max-h-[60vh] bg-black flex items-center justify-center overflow-hidden group">
            {/* Background Thumbnail or Video placeholder */}
            <img
              src={course.thumbnail}
              alt={currentLesson.title}
              className="w-full h-full object-cover opacity-60"
            />

            {/* Video Watermark & Cloudflare/Bunny Security Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>بث فيديو مشفر · SmartTech DRM Safe</span>
            </div>

            {/* Dynamic Watermark to protect instructor content */}
            <div className="absolute bottom-16 right-6 text-white/20 select-none font-mono text-[10px] pointer-events-none">
              SMARTTECH-STU-01227811948
            </div>

            {/* Center Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute z-10 w-16 h-16 rounded-full bg-[#C62828] hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition transform group-hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* Bottom Player Controls */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 flex flex-col gap-2">
              {/* Progress Scrub Bar */}
              <div className="w-full bg-slate-700/60 h-1 rounded-full cursor-pointer overflow-hidden">
                <div className="bg-[#C62828] h-full w-[45%]" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="hover:text-white">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-4 h-4" />
                    <span className="font-mono text-[11px]">04:25 / {currentLesson.durationMinutes}:00</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    {[1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-1.5 py-0.5 rounded ${
                          playbackSpeed === spd
                            ? 'bg-red-600 text-white font-bold'
                            : 'hover:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                  <button className="hover:text-white">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar for Lesson Player */}
          <div className="bg-slate-900 border-b border-slate-800 px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                  activeTab === 'overview'
                    ? 'bg-slate-800 text-white border-b-2 border-red-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                شرح وملاحظات الدرس
              </button>

              {currentLesson.type === 'spreadsheet' && (
                <button
                  onClick={() => setActiveTab('excel')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'excel'
                      ? 'bg-emerald-950/80 text-emerald-400 border-b-2 border-emerald-500'
                      : 'text-emerald-400 hover:bg-slate-800'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>المختبر التفاعلي</span>
                </button>
              )}

              {currentLesson.quiz && currentLesson.quiz.length > 0 && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'quiz'
                      ? 'bg-amber-950/80 text-amber-400 border-b-2 border-amber-500'
                      : 'text-amber-400 hover:bg-slate-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>اختبار الفهم ({currentLesson.quiz.length})</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('downloads')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'downloads'
                    ? 'bg-slate-800 text-white border-b-2 border-red-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>ملفات العمل المرفقة</span>
              </button>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevLesson}
                disabled={!prevLesson}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-xs text-slate-300 font-bold transition flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4" />
                <span className="hidden sm:inline">السابق</span>
              </button>
              <button
                onClick={handleNextLesson}
                className="px-4 py-1.5 rounded bg-[#C62828] hover:bg-red-700 text-xs text-white font-bold transition flex items-center gap-1 shadow-xs"
              >
                <span>{nextLesson ? 'الدرس التالي' : 'إنهاء الدورة'}</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Tab Content Area */}
          <div className="p-6 bg-slate-900 flex-1">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{currentLesson.title}</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {currentLesson.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
                  <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                    نقاط التركيز في هذا الدرس
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                      <span>فهم بناء الصيغة الرياضية والمنطقية وأسلوب تثبيت الخلايا بالرمز ($).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                      <span>تجنب رسائل الخطأ الشائعة مثل #N/A و#VALUE! وفهم أسبابها وطرق معالجتها فورياً.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                      <span>تطبيق معادلات حقيقية من واقع تقارير الشركات المصرية وحسابات التكاليف والمبيعات.</span>
                    </li>
                  </ul>
                </div>

                {currentLesson.type === 'spreadsheet' && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">يحتوي هذا الدرس على تمرين إكسيل تفاعلي</h4>
                        <p className="text-xs text-slate-400">انقر لتطبيق الدالة بنفسك والحصول على نقاط XP فورية</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('excel')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-xs"
                    >
                      فتح التمرين التفاعلي
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Excel Interactive Lab Tab */}
            {activeTab === 'excel' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>مختبر التطبيق العملي التفاعلي (Live Formula Engine)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      اكتب الصيغة المطلوبة في شريط المعادلات وتحقق من الحل للحصول على شارة النجاح.
                    </p>
                  </div>

                  <button
                    onClick={() => openExcelLab(currentLesson.exerciseId || 'ex-1')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>وضع الشاشة الكاملة</span>
                  </button>
                </div>

                <div className="h-[480px] rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                  <ExcelLabView initialExerciseId={currentLesson.exerciseId || 'ex-1'} />
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && currentLesson.quiz && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    اختبار الفهم القصير
                  </h3>
                  <p className="text-xs text-slate-400">
                    أجب عن الأسئلة التالية لتأكيد فهمك وتحصيل نقاط XP الدورة.
                  </p>
                </div>

                <div className="space-y-4">
                  {currentLesson.quiz.map((q, qIdx) => {
                    const answered = selectedAnswers[q.id] !== undefined;
                    const isCorrect = selectedAnswers[q.id] === q.correctAnswerIndex;

                    return (
                      <div
                        key={q.id}
                        className="p-5 rounded-xl bg-slate-800 border border-slate-700 space-y-3"
                      >
                        <div className="font-bold text-sm text-white flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-xs flex items-center justify-center font-mono mt-0.5 flex-shrink-0">
                            {qIdx + 1}
                          </span>
                          <span>{q.question}</span>
                        </div>

                        <div className="space-y-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedAnswers[q.id] === optIdx;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleQuizAnswer(q.id, optIdx)}
                                className={`w-full text-right p-3 rounded-lg text-xs transition border flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-red-950/40 border-red-500 text-white font-bold'
                                    : 'bg-slate-900 border-slate-750 text-slate-300 hover:bg-slate-850'
                                } ${
                                  quizSubmitted && optIdx === q.correctAnswerIndex
                                    ? '!bg-emerald-950/60 !border-emerald-500 !text-emerald-300 font-bold'
                                    : ''
                                }`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && optIdx === q.correctAnswerIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/30 text-emerald-300' : 'bg-red-950/30 text-red-300'}`}>
                            <b>التفسير:</b> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  {quizScore !== null ? (
                    <div className="text-xs font-bold text-emerald-400">
                      النتيجة: {quizScore} من {currentLesson.quiz.length} إجابات صحيحة
                    </div>
                  ) : <div />}

                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < currentLesson.quiz.length}
                    className="px-6 py-2.5 bg-[#C62828] hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-[#C62828] text-white rounded-lg text-xs font-bold transition shadow-sm"
                  >
                    {quizSubmitted ? 'إعادة المحاولة' : 'تسليم الإجابات والتقييم'}
                  </button>
                </div>
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="max-w-2xl space-y-4">
                <h3 className="text-base font-bold text-white mb-1">
                  الملفات وقوالب إكسيل الجاهزة
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  حمل الملفات لفتحها على برنامج Excel على جهازك ومقارنة الحلول.
                </p>

                <div className="space-y-3">
                  {[
                    { name: 'ورقة_عمل_تطبيقية_محلولة.xlsx', size: '1.4 MB', type: 'Excel Spreadsheet' },
                    { name: 'ملخص_الدوال_والصيغ_السريعة_SmartTech.pdf', size: '840 KB', type: 'PDF Reference' },
                    { name: 'بيانات_المبيعات_الفعلية_RawData.csv', size: '3.2 MB', type: 'CSV Dataset' }
                  ].map((file, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-xs">
                          XLS
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{file.name}</div>
                          <div className="text-[11px] text-slate-400">{file.size} · {file.type}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => addToast(`بدأ تحميل ملف: ${file.name}`, 'info')}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>تحميل</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Course Curriculum Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                محتوى ومسار الدورة
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>نسبة الإنجاز:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {enrollment?.progressPercentage || 0}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${enrollment?.progressPercentage || 0}%` }}
                />
              </div>
            </div>

            <div className="divide-y divide-slate-800/80">
              {course.modules.map((module, mIdx) => (
                <div key={module.id} className="p-3">
                  <div className="text-xs font-bold text-slate-400 mb-2">
                    الوحدة {mIdx + 1}: {module.title}
                  </div>

                  <div className="space-y-1">
                    {module.lessons.map((lesson) => {
                      const isCurrent = lesson.id === currentLesson.id;
                      const isDone = enrollment?.completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setSelectedLessonId(lesson.id);
                            setActiveTab(
                              lesson.type === 'spreadsheet' ? 'excel' : lesson.type === 'quiz' ? 'quiz' : 'overview'
                            );
                          }}
                          className={`w-full text-right p-2.5 rounded-lg text-xs transition flex items-center justify-between ${
                            isCurrent
                              ? 'bg-red-600 text-white font-bold'
                              : isDone
                              ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-600 flex-shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>

                          <span className="text-[10px] font-mono opacity-80 mr-2 flex-shrink-0">
                            {lesson.durationMinutes} د
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

      </div>
    </div>
  );
};
