import React from 'react';
import { Laptop, FileSpreadsheet, BarChart3, Database, BrainCircuit, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAREER_PATHS } from '../../data/mockData';

export const LearningJourneySection: React.FC = () => {
  const { setCurrentView, setSelectedPathId } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    Laptop: <Laptop className="w-5 h-5" />,
    FileSpreadsheet: <FileSpreadsheet className="w-5 h-5" />,
    BarChart3: <BarChart3 className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  };

  const handleOpenPath = (pathId: string) => {
    setSelectedPathId(pathId);
    setCurrentView('path-detail');
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-red-600 tracking-wider uppercase block">
            رحلة التعلم المتدرجة من البداية للاحتراف
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            خريطة طريق عملية تبني مهاراتك خطوة بخطوة
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            لا داعي للحيرة أو التشتت؛ صممنا لك مساراً تراكمياً مدروساً ينطلق من المهارات المكتبية الأساسية ويتدرج بك حتى أحدث أدوات تحليل البيانات والذكاء الاصطناعي.
          </p>
        </div>

        {/* 5-Step Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {CAREER_PATHS.map((path, index) => {
            const stepNum = index + 1;
            return (
              <div
                key={path.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-all hover:border-red-300 relative group"
              >
                {/* Step Number Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold text-sm border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {iconMap[path.iconName] || <Laptop className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    المرحلة 0{stepNum}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                    {path.title.split('(')[0]}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    المستوى: {path.level} • {path.estimatedDuration}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {path.description}
                  </p>
                </div>

                {/* Path CTA */}
                <button
                  onClick={() => handleOpenPath(path.id)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-auto"
                >
                  <span>استكشف المسار</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Journey Footer Note */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-right">
            <h4 className="text-sm font-bold text-slate-900">هل تحتاج مساعدة في تحديد مستواك المناسب؟</h4>
            <p className="text-xs text-slate-500">فريق مستشاري التدريب بمركز سمارتك متاح لمراجعة خلفيتك وتوجيهك للمسار الأنسب لأهدافك المهنية.</p>
          </div>
          <button
            onClick={() => setCurrentView('courses')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
          >
            تصفح جميع الدورات الفردية
          </button>
        </div>

      </div>
    </section>
  );
};
