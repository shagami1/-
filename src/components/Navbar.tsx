import React, { useState } from 'react';
import {
  Menu,
  X,
  FileSpreadsheet,
  Award,
  Sparkles,
  User,
  Building2,
  ShieldCheck,
  ChevronDown,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentView,
    setCurrentView,
    user,
    openExcelLab
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    guest: { label: 'زائر / عام', icon: <User className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-700' },
    student: { label: 'طالب متدرب', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />, color: 'bg-red-50 text-red-700 border-red-200' },
    corporate_hr: { label: 'مسؤول موارد بشرية (HR)', icon: <Building2 className="w-3.5 h-3.5 text-blue-600" />, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    admin: { label: 'مدير المنصة (Admin)', icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />, color: 'bg-purple-50 text-purple-700 border-purple-200' }
  };

  const navLinks = [
    { label: 'الرئيسية', view: 'home' },
    { label: 'المسارات', view: 'paths' },
    { label: 'الدورات', view: 'courses' },
    { label: 'معمل إكسل', action: () => openExcelLab() },
    { label: 'إنجازات الطلاب', view: 'student-success' },
    { label: 'تدريب الشركات', view: 'corporate-training' },
    { label: 'عن دكتورة شيماء', view: 'about' },
  ];

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);

    // Route dynamically based on chosen preview role
    if (role === 'student') setCurrentView('student-dashboard');
    else if (role === 'corporate_hr') setCurrentView('company-dashboard');
    else if (role === 'admin') setCurrentView('admin-dashboard');
    else setCurrentView('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Utility Announcement & Role Switcher Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-400">مركز سمارتك للتدريب المتطور</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a href="tel:01227811948" className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-red-500" />
              <span className="font-mono">01227811948</span>
            </a>
          </div>

          {/* Role Preview Switcher (Interactive for Evaluation) */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-[11px] text-slate-400">معاينة الواجهة كـ:</span>
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-colors border border-slate-700"
              >
                {roleLabels[currentRole].icon}
                <span className="font-medium">{roleLabels[currentRole].label}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute left-0 mt-1 w-52 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                    تبديل دور المستخدم النشط:
                  </div>
                  {(Object.keys(roleLabels) as UserRole[]).map((rKey) => (
                    <button
                      key={rKey}
                      onClick={() => handleRoleChange(rKey)}
                      className={`w-full text-right px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentRole === rKey ? 'bg-red-50 text-red-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {roleLabels[rKey].icon}
                        <span>{roleLabels[rKey].label}</span>
                      </div>
                      {currentRole === rKey && <span className="text-red-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Points & XP Indicator for student */}
            {currentRole === 'student' && (
              <div className="hidden lg:flex items-center gap-3 mr-2 px-2.5 py-0.5 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-amber-400 font-bold font-mono text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {user.xp} XP
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {user.rewardPoints} نقطة ولاء
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main One-Row Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 text-right cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-red-700 transition-colors shrink-0">
              ST
            </div>
            <div className="leading-tight">
              <span className="text-base md:text-lg font-black text-slate-900 tracking-tight block">
                احترف ببساطة
              </span>
              <span className="text-[11px] text-red-600 font-bold block">
                مع دكتورة شيماء
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          {navLinks.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (item.action) item.action();
                else if (item.view) setCurrentView(item.view);
              }}
              className={`hover:text-red-600 transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentView === item.view ? 'text-red-600 font-bold border-b-2 border-red-600' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentRole === 'student' ? (
            <button
              onClick={() => setCurrentView('student-dashboard')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs md:text-sm font-semibold transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>لوحة تعلمي</span>
            </button>
          ) : currentRole === 'corporate_hr' ? (
            <button
              onClick={() => setCurrentView('company-dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs md:text-sm font-semibold transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>لوحة الشركات HR</span>
            </button>
          ) : currentRole === 'admin' ? (
            <button
              onClick={() => setCurrentView('admin-dashboard')}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs md:text-sm font-semibold transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>إدارة المنصة</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('courses')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs md:text-sm font-semibold transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              <span>ابدأ التعلم الآن</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (item.action) item.action();
                else if (item.view) setCurrentView(item.view);
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 text-sm font-medium text-slate-800 hover:text-red-600 border-b border-slate-100 last:border-none"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                openExcelLab();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>معمل إكسل التفاعلي Live</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
