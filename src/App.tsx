import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CoursesCatalogView } from './views/CoursesCatalogView';
import { CourseDetailView } from './views/CourseDetailView';
import { LessonPlayerView } from './views/LessonPlayerView';
import { StudentDashboardView } from './views/StudentDashboardView';
import { CorporateDashboardView } from './views/CorporateDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { CertificateVerifyView } from './views/CertificateVerifyView';
import { AboutView } from './views/AboutView';
import { ExcelLabView } from './components/ExcelLabView';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    activeExcelLabExerciseId,
    closeExcelLab,
    toasts,
    removeToast
  } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'courses':
        return <CoursesCatalogView />;
      case 'course-detail':
        return <CourseDetailView />;
      case 'lesson-player':
        return <LessonPlayerView />;
      case 'student-dashboard':
        return <StudentDashboardView />;
      case 'corporate':
        return <CorporateDashboardView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'verify-certificate':
        return <CertificateVerifyView />;
      case 'about':
        return <AboutView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Container */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer (only show on standard pages, not in full distraction-free player) */}
      {currentView !== 'lesson-player' && <Footer />}

      {/* Global Excel Lab Fullscreen / Modal Launcher */}
      {activeExcelLabExerciseId && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
          <div className="relative w-full max-w-6xl h-[92vh] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-white font-bold mr-2">
                  مختبر إكسيل التفاعلي الكامل · SmartTech Excel Live Lab
                </span>
              </div>

              <button
                onClick={closeExcelLab}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
              >
                <span>إغلاق المختبر</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <ExcelLabView initialExerciseId={activeExcelLabExerciseId} />
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification Container */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-md pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border text-xs font-semibold flex items-start gap-3 animate-in slide-in-from-bottom-5 transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                : toast.type === 'error'
                ? 'bg-red-900 text-red-100 border-red-700'
                : 'bg-slate-900 text-slate-100 border-slate-700'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />}

            <div className="flex-1 leading-relaxed">{toast.message}</div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
