import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  Course,
  Enrollment,
  Certificate,
  CorporateEmployee,
  CorporateContract,
  IntegrationSettings,
  ExcelExercise
} from '../types';
import {
  COURSES,
  SAMPLE_CERTIFICATE,
  CORPORATE_CONTRACTS,
  CORPORATE_EMPLOYEES,
  INITIAL_INTEGRATION_SETTINGS,
  BADGES,
  SAMPLE_ERP_SYNCS,
  BRAND_ASSETS,
  INSTRUCTOR_PROFILE
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  selectedPathId: string;
  setSelectedPathId: (id: string) => void;
  selectedLessonId: string;
  setSelectedLessonId: (id: string) => void;

  // Active Excel Lab
  activeExcelExercise: ExcelExercise | null;
  activeExcelLabExerciseId: string | null;
  openExcelLab: (exercise?: ExcelExercise | any) => void;
  closeExcelLab: () => void;

  // Verification Search
  verifiedCertificate: Certificate | null;
  verifyCertificateCode: (code: string) => Certificate | null;

  // User & Gamification
  user: UserProfile;
  enrollments: Enrollment[];
  certificates: Certificate[];
  xpLedger: { id: string; amount: number; reason: string; timestamp: string }[];
  rewardLedger: { id: string; points: number; description: string; timestamp: string }[];
  badges: typeof BADGES;

  // Actions
  enrollInCourse: (courseId: string, usePoints?: boolean) => boolean;
  enrollCourse: (courseId: string, usePoints?: boolean) => boolean;
  completeLesson: (courseId: string, lessonId: string) => void;
  awardXP: (amount: number, reason: string) => void;
  redeemPointsForDiscount: (points: number) => number; // returns EGP discount

  // Corporate Management
  employees: CorporateEmployee[];
  contracts: CorporateContract[];
  corporateContract: any;
  addEmployee: (emp: Omit<CorporateEmployee, 'id' | 'completedCoursesCount' | 'overallProgressPercent' | 'lastActive'>) => void;
  addCorporateEmployee: (emp: any) => void;
  removeCorporateEmployee: (empId: string) => void;
  requestAdditionalSeats: (contractId: string, extraSeats: number) => void;
  assignCourseToEmployee: (employeeId: string, courseId: string) => void;

  // Admin Management
  coursesList: Course[];
  courses: Course[];
  updateCourse: (course: Course) => void;
  integrationSettings: IntegrationSettings;
  integrations: any;
  updateIntegrationSettings: (settingsOrType: any, optionalVal?: any) => void;
  triggerERPSync: () => void;
  triggerErpSync: () => void;
  erpSyncLogs: any[];

  // Toasts
  toasts: ToastMessage[];
  addToast: (arg1: any, arg2?: any, arg3?: any) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-excel-core');
  const [selectedPathId, setSelectedPathId] = useState<string>('path-excel-pro');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-1-1');

  // Excel Lab Modal
  const [activeExcelExercise, setActiveExcelExercise] = useState<ExcelExercise | null>(null);

  // User State
  const [user, setUser] = useState<UserProfile>({
    id: 'usr-student-01',
    name: 'أحمد محمود السعيد',
    email: 'ahmed.mahmoud@gmail.com',
    phone: '01099887766',
    role: 'student',
    joinedDate: '15 يناير 2026',
    xp: 450,
    rewardPoints: 320,
    unlockedBadgeIds: ['badge-first-lesson', 'badge-excel-novice']
  });

  // Enrollments
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: 'enr-01',
      userId: 'usr-student-01',
      courseId: 'course-excel-core',
      enrolledAt: '2026-02-01',
      progressPercent: 40,
      completedLessonIds: ['les-1-1'],
      lastAccessedLessonId: 'les-1-2'
    }
  ]);

  // Certificates
  const [certificates, setCertificates] = useState<Certificate[]>([SAMPLE_CERTIFICATE]);
  const [verifiedCertificate, setVerifiedCertificate] = useState<Certificate | null>(SAMPLE_CERTIFICATE);

  // Gamification Ledgers
  const [xpLedger, setXpLedger] = useState<{ id: string; amount: number; reason: string; timestamp: string }[]>([
    { id: 'xp-1', amount: 50, reason: 'إتمام الدرس الأول في أساسيات إكسل', timestamp: 'منذ ساعتين' },
    { id: 'xp-2', amount: 100, reason: 'إتقان تمرين جمع الفروع في معمل إكسل', timestamp: 'منذ يوم' },
    { id: 'xp-3', amount: 300, reason: 'تسجيل الدخول والانتظام اليومي', timestamp: 'منذ 3 أيام' }
  ]);

  const [rewardLedger, setRewardLedger] = useState<{ id: string; points: number; description: string; timestamp: string }[]>([
    { id: 'rew-1', points: 150, description: 'مكافأة التسجيل المبكر والنشاط', timestamp: '2026-02-01' },
    { id: 'rew-2', points: 170, description: 'مكافأة التفوق في تمارين إكسل', timestamp: '2026-02-10' }
  ]);

  // Corporate
  const [employees, setEmployees] = useState<CorporateEmployee[]>(CORPORATE_EMPLOYEES);
  const [contracts, setContracts] = useState<CorporateContract[]>(CORPORATE_CONTRACTS);

  // Admin / Catalog
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES);
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>(INITIAL_INTEGRATION_SETTINGS);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (arg1: any, arg2?: any, arg3?: any) => {
    let type: 'success' | 'info' | 'warning' | 'error' = 'info';
    let title = '';
    let message = '';

    if (arg3 !== undefined) {
      type = arg1;
      title = arg2;
      message = arg3;
    } else if (arg2 !== undefined) {
      message = arg1;
      type = (arg2 === 'success' || arg2 === 'error' || arg2 === 'warning' || arg2 === 'info') ? arg2 : 'info';
      title = type === 'success' ? 'نجاح' : type === 'error' ? 'تنبيه' : 'إشعار';
    } else {
      message = arg1;
      title = 'إشعار';
    }

    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync role changes
  useEffect(() => {
    setUser(prev => ({ ...prev, role: currentRole }));
  }, [currentRole]);

  const openExcelLab = (exerciseOrId?: any) => {
    if (typeof exerciseOrId === 'string') {
      const found = COURSES.flatMap(c => c.modules).flatMap(m => m.lessons).find(l => l.exercise?.id === exerciseOrId)?.exercise;
      setActiveExcelExercise(found || COURSES[0].modules[0].lessons[0].exercise || null);
    } else if (exerciseOrId) {
      setActiveExcelExercise(exerciseOrId);
    } else {
      // Default interactive sandbox exercise
      const defaultEx = COURSES[0].modules[0].lessons[0].exercise;
      setActiveExcelExercise(defaultEx || null);
    }
  };

  const closeExcelLab = () => {
    setActiveExcelExercise(null);
  };

  const awardXP = (amount: number, reason: string) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      // Check for badge unlocks
      const newBadges = [...prev.unlockedBadgeIds];
      if (newXP >= 300 && !newBadges.includes('badge-formula-master')) {
        newBadges.push('badge-formula-master');
        addToast('success', 'وسام جديد!', 'مبروك! حصلت على وسام "فارس الصيغ والمعادلات".');
      }
      return {
        ...prev,
        xp: newXP,
        rewardPoints: prev.rewardPoints + Math.floor(amount / 2),
        unlockedBadgeIds: newBadges
      };
    });

    setXpLedger(prev => [
      { id: `xp-${Date.now()}`, amount, reason, timestamp: 'الآن' },
      ...prev
    ]);

    setRewardLedger(prev => [
      { id: `rew-${Date.now()}`, points: Math.floor(amount / 2), description: `مكافأة: ${reason}`, timestamp: 'الآن' },
      ...prev
    ]);

    addToast('success', `+${amount} نقطة خبرة XP`, reason);
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setEnrollments(prev => {
      return prev.map(enr => {
        if (enr.courseId === courseId) {
          const completed = enr.completedLessonIds.includes(lessonId)
            ? enr.completedLessonIds
            : [...enr.completedLessonIds, lessonId];
          
          const course = coursesList.find(c => c.id === courseId);
          const totalLessons = course ? course.lessonsCount : 10;
          const progressPercent = Math.min(100, Math.round((completed.length / totalLessons) * 100));

          // If reached 100% and no certificate, issue one!
          if (progressPercent === 100 && !enr.certificateId) {
            const certCode = `ST-2026-${courseId.toUpperCase().slice(0, 6)}-${Math.floor(1000 + Math.random() * 9000)}`;
            const newCert: Certificate = {
              id: `cert-${Date.now()}`,
              certificateCode: certCode,
              userId: user.id,
              userName: user.name,
              courseId,
              courseTitle: course?.title || 'دورة تدريبية معتمدة',
              trackTitle: 'مركز سمارتك للتدريب المتطور',
              issueDate: '24 أكتوبر 2026',
              grade: 'ممتاز',
              instructorName: 'د. شيماء العجمي',
              centerName: 'SmartTech Training Center',
              verificationUrl: `https://smarttech.edu.eg/verify/${certCode}`
            };
            setCertificates(cPrev => [...cPrev, newCert]);
            awardXP(250, `إتمام دورة ${course?.title || ''} بالكامل`);
            addToast('success', 'تهانينا! تم إصدار شهادتك', `يمكنك الآن استعراض وتحميل شهادة إتمام دورة: ${course?.title}`);
            return {
              ...enr,
              completedLessonIds: completed,
              progressPercent: 100,
              certificateId: newCert.id,
              completedAt: new Date().toISOString()
            };
          }

          return {
            ...enr,
            completedLessonIds: completed,
            progressPercent
          };
        }
        return enr;
      });
    });

    awardXP(50, 'إكمال الدرس بنجاح');
  };

  const enrollInCourse = (courseId: string, usePoints = false): boolean => {
    const existing = enrollments.find(e => e.courseId === courseId);
    if (existing) {
      addToast('info', 'مسجل بالفعل', 'أنت مسجل بالفعل في هذه الدورة التدريبية.');
      return true;
    }

    if (usePoints && user.rewardPoints >= 200) {
      setUser(prev => ({ ...prev, rewardPoints: prev.rewardPoints - 200 }));
      setRewardLedger(prev => [
        { id: `rew-deduct-${Date.now()}`, points: -200, description: 'خصم نقاط ولاء عند التسجيل في الدورة', timestamp: 'الآن' },
        ...prev
      ]);
    }

    const newEnr: Enrollment = {
      id: `enr-${Date.now()}`,
      userId: user.id,
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      progressPercent: 0,
      completedLessonIds: []
    };

    setEnrollments(prev => [...prev, newEnr]);
    awardXP(100, 'التسجيل في دورة تدريبية جديدة');
    addToast('success', 'تم التسجيل بنجاح!', 'تم تفعيل الدورة التدريبية في لوحة تعلمك.');
    return true;
  };

  const redeemPointsForDiscount = (points: number): number => {
    // Conversion: 100 points = 25 EGP discount
    if (user.rewardPoints < points) return 0;
    const discount = Math.floor((points / 100) * 25);
    return discount;
  };

  const verifyCertificateCode = (code: string): Certificate | null => {
    const clean = code.trim().toUpperCase();
    const found = certificates.find(c => c.certificateCode.toUpperCase() === clean);
    if (found) {
      setVerifiedCertificate(found);
      return found;
    }
    // Check if matches sample
    if (clean === SAMPLE_CERTIFICATE.certificateCode.toUpperCase()) {
      setVerifiedCertificate(SAMPLE_CERTIFICATE);
      return SAMPLE_CERTIFICATE;
    }
    setVerifiedCertificate(null);
    return null;
  };

  // Corporate Actions
  const addEmployee = (empData: Omit<CorporateEmployee, 'id' | 'completedCoursesCount' | 'overallProgressPercent' | 'lastActive'>) => {
    const newEmp: CorporateEmployee = {
      ...empData,
      id: `emp-${Date.now()}`,
      completedCoursesCount: 0,
      overallProgressPercent: 0,
      lastActive: 'الآن'
    };
    setEmployees(prev => [newEmp, ...prev]);
    // update used seats
    setContracts(prev => prev.map(c => {
      if (c.organizationId === empData.organizationId) {
        return { ...c, usedSeats: c.usedSeats + 1 };
      }
      return c;
    }));
    addToast('success', 'تمت إضافة الموظف', `تم إرسال دعوة التفعيل إلى ${empData.email}`);
  };

  const requestAdditionalSeats = (contractId: string, extraSeats: number) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        return { ...c, seatLimit: c.seatLimit + extraSeats };
      }
      return c;
    }));
    addToast('success', 'تم توسيع السعة التعاقدية', `تمت إضافة ${extraSeats} مقعد تدريبي بنجاح لحساب شركتكم.`);
  };

  const assignCourseToEmployee = (employeeId: string, courseId: string) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === employeeId) {
        const currentIds = emp.assignedCourseIds || [];
        const assigned = currentIds.includes(courseId)
          ? currentIds
          : [...currentIds, courseId];
        return { ...emp, assignedCourseIds: assigned };
      }
      return emp;
    }));
    addToast('success', 'تم تعيين الدورة', 'تم تعيين المسار التدريبي للموظف وإرسال إشعار لمنصة تعلمه.');
  };

  // Admin Actions
  const updateCourse = (updated: Course) => {
    setCoursesList(prev => prev.map(c => c.id === updated.id ? updated : c));
    addToast('success', 'تم حفظ التعديلات', `تم تحديث بيانات دورة: ${updated.title}`);
  };

  const updateIntegrationSettings = (settingsOrType: any, optionalVal?: any) => {
    if (optionalVal !== undefined && typeof settingsOrType === 'string') {
      setIntegrationSettings(prev => ({
        ...prev,
        [settingsOrType]: optionalVal
      }));
    } else {
      setIntegrationSettings(settingsOrType);
    }
    addToast('success', 'تم حفظ الإعدادات', 'تم تحديث تكوينات بوابات الربط بنجاح.');
  };

  const triggerERPSync = () => {
    setIntegrationSettings(prev => ({
      ...prev,
      erp: { ...prev.erp, lastSyncTimestamp: 'اليوم، ' + new Date().toLocaleTimeString('ar-EG') }
    }));
    addToast('info', 'بدء المزامنة مع ERP سمارتك', 'جاري فحص سجلات الطلاب وتحديث الاشتراكات (وضع المحاكاة نشط).');
  };

  const addCorporateEmployee = (newEmp: any) => {
    const fullEmp: CorporateEmployee = {
      id: newEmp.id || `emp-${Date.now()}`,
      organizationId: 'org-delta-01',
      name: newEmp.name,
      email: newEmp.email,
      department: newEmp.department || 'إدارة المالية والحسابات',
      jobTitle: newEmp.jobTitle || 'أخصائي تحليل بيانات',
      status: 'active',
      assignedCourseIds: [newEmp.courseId || newEmp.assignedCourseId || 'course-excel-core'],
      assignedCourseId: newEmp.courseId || newEmp.assignedCourseId || 'course-excel-core',
      assignedCourseTitle: newEmp.assignedCourseTitle || 'احترف إكسيل من الصفر حتى VBA',
      completedCoursesCount: 0,
      overallProgressPercent: newEmp.progressPercentage || 0,
      progressPercentage: newEmp.progressPercentage || 0,
      lastActive: 'اليوم',
      lastActiveAt: 'اليوم',
      enrolledAt: new Date().toISOString().split('T')[0]
    };
    setEmployees(prev => [fullEmp, ...prev]);
  };

  const removeCorporateEmployee = (empId: string) => {
    setEmployees(prev => prev.filter(e => e.id !== empId));
    addToast('success', 'تم حذف الموظف', 'تم تحرير المقعد التدريبي بنجاح.');
  };

  // Enriched courses with UI properties
  const enrichedCourses: Course[] = coursesList.map(c => ({
    ...c,
    careerPathId: c.trackId,
    careerPathTitle:
      c.trackId === 'path-excel-pro'
        ? 'محترف إكسل (Excel Professional)'
        : c.trackId === 'path-data-analytics'
        ? 'تحليل ذكاء الأعمال (BI & Analytics)'
        : c.trackId === 'path-sql-python'
        ? 'قواعد البيانات والبرمجة (SQL & Python)'
        : c.trackId === 'path-data-science'
        ? 'علم البيانات والذكاء الاصطناعي'
        : 'الموظف الرقمي الشامل',
    priceEgp: c.price,
    originalPriceEgp: c.originalPrice,
    rating: 4.9,
    studentsCount: 1420,
    whatYouWillLearn: c.outcomes,
    description: c.shortDescription,
    isFeatured: true,
    instructor: {
      name: INSTRUCTOR_PROFILE.name,
      title: INSTRUCTOR_PROFILE.title,
      avatar: BRAND_ASSETS.instructorHero
    },
    xpReward: 150
  }));

  const enrichedUser: UserProfile = {
    ...user,
    loyaltyPoints: user.rewardPoints,
    level: Math.floor(user.xp / 200) + 1,
    badges: user.unlockedBadgeIds,
    avatar: user.avatar || BRAND_ASSETS.instructorHero
  };

  const enrichedCertificates = certificates.map(cert => ({
    ...cert,
    studentName: cert.userName
  }));

  const enrichedEnrollments = enrollments.map(enr => ({
    ...enr,
    progressPercentage: enr.progressPercent
  }));

  const corporateContract = {
    id: 'corp-delta-01',
    companyName: contracts[0]?.organizationName || 'مجموعة الدلتا للاستثمار والخدمات المصرفية',
    contractNumber: contracts[0]?.contractNumber || 'ST-CORP-2026',
    hrContactName: 'أ. طارق عبد المجيد',
    hrContactEmail: 'hr@delta-invest.eg',
    totalSeats: contracts[0]?.seatLimit || 25,
    occupiedSeats: employees.length,
    renewalDate: '31 ديسمبر 2026',
    employees: employees.map(e => ({
      ...e,
      progressPercentage: e.overallProgressPercent || 0,
      assignedCourseTitle: e.assignedCourseTitle || 'احترف إكسيل من الصفر حتى VBA'
    }))
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentView,
        setCurrentView,
        selectedCourseId,
        setSelectedCourseId,
        selectedPathId,
        setSelectedPathId,
        selectedLessonId,
        setSelectedLessonId,

        activeExcelExercise,
        activeExcelLabExerciseId: activeExcelExercise?.id || null,
        openExcelLab,
        closeExcelLab,

        verifiedCertificate,
        verifyCertificateCode,

        user: enrichedUser,
        enrollments: enrichedEnrollments,
        certificates: enrichedCertificates,
        xpLedger,
        rewardLedger,
        badges: BADGES,

        enrollInCourse,
        enrollCourse: enrollInCourse,
        completeLesson,
        awardXP,
        redeemPointsForDiscount,

        employees,
        contracts,
        corporateContract,
        addEmployee,
        addCorporateEmployee,
        removeCorporateEmployee,
        requestAdditionalSeats,
        assignCourseToEmployee,

        coursesList: enrichedCourses,
        courses: enrichedCourses,
        updateCourse,
        integrationSettings,
        integrations: {
          payment: {
            paymobEnabled: true,
            paymobApiKey: 'pk_live_demo_paymob_smarttech_9918',
            paymobIframeId: 'iframe_748192',
            fawryEnabled: true,
            fawryMerchantCode: 'FAWRY-SMARTTECH-EG',
            fawrySecurityKey: '********'
          },
          video: {
            provider: 'bunny_stream',
            libraryId: 'bunny-lib-smarttech-8821'
          }
        },
        updateIntegrationSettings,
        triggerERPSync,
        triggerErpSync: triggerERPSync,
        erpSyncLogs: SAMPLE_ERP_SYNCS.map(s => ({
          id: s.externalStudentId,
          studentCode: s.externalStudentId,
          studentName: s.fullName,
          nationalId: s.nationalId || '29605120108842',
          courseEnrolled: s.sourceCourseCode,
          syncedAt: s.lastSyncAttempt
        })),

        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
