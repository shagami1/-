export type UserRole = 'guest' | 'student' | 'corporate_hr' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  nationalId?: string;
  organizationId?: string;
  department?: string;
  joinedDate: string;
  xp: number;
  rewardPoints: number;
  unlockedBadgeIds: string[];
  loyaltyPoints?: number;
  level?: number;
  badges?: string[];
}

export interface CareerPath {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم' | 'شامل';
  estimatedDuration: string;
  coursesCount: number;
  badgeName: string;
  color: string;
  iconName: string;
  courseIds: string[];
}

export interface LessonAttachment {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType: 'xlsx' | 'pdf' | 'pbix' | 'py' | 'sql';
  downloadUrl: string;
}

export interface ExcelExercise {
  id: string;
  title: string;
  instructions: string;
  starterData: Record<string, string | number>;
  targetCell: string;
  expectedFormulaKeywords?: string[];
  expectedResult: string | number;
  hints: string[];
  xpReward: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  question?: string;
  correctAnswerIndex?: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  durationMinutes: number;
  videoUrl: string; // Embed or streaming url
  isFreePreview?: boolean;
  order: number;
  attachments?: LessonAttachment[];
  exercise?: ExcelExercise;
  exerciseId?: string;
  type?: 'video' | 'spreadsheet' | 'quiz';
  quiz?: QuizQuestion[];
  xpReward?: number;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
  description?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  trackId: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم' | string;
  durationHours: number;
  lessonsCount: number;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  isNew?: boolean;
  thumbnail: string;
  outcomes: string[];
  prerequisites: string[];
  modules: CourseModule[];
  careerPathId?: string;
  careerPathTitle?: string;
  rating?: number;
  studentsCount?: number;
  whatYouWillLearn?: string[];
  priceEgp?: number;
  originalPriceEgp?: number;
  isFeatured?: boolean;
  instructor?: { name: string; title: string; avatar: string };
  xpReward?: number;
  description?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  progressPercentage?: number;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  completedAt?: string;
  certificateId?: string;
}

export interface Certificate {
  id: string;
  certificateCode: string; // e.g. ST-2026-EXCEL-8942
  userId: string;
  userName: string;
  studentName?: string;
  courseId: string;
  courseTitle: string;
  trackTitle: string;
  issueDate: string;
  grade: 'ممتاز' | 'جيد جداً' | 'ناجح' | string | number;
  instructorName: string;
  centerName: string;
  verificationUrl: string;
}

export interface XPLedgerEntry {
  id: string;
  userId: string;
  amount: number;
  action: string;
  category: 'lesson' | 'exercise' | 'quiz' | 'course_completion' | 'daily_streak';
  timestamp: string;
}

export interface RewardLedgerEntry {
  id: string;
  userId: string;
  points: number; // positive = earned, negative = spent
  description: string;
  timestamp: string;
  relatedOrderId?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredXP: number;
  category: 'excel' | 'analytics' | 'general' | 'streak';
}

export interface CorporateEmployee {
  id: string;
  organizationId?: string;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  status: 'active' | 'pending' | 'suspended';
  assignedCourseIds?: string[];
  assignedCourseId?: string;
  assignedCourseTitle?: string;
  completedCoursesCount?: number;
  overallProgressPercent?: number;
  progressPercentage?: number;
  enrolledAt?: string;
  lastActive?: string;
  lastActiveAt?: string;
}

export interface CorporateContract {
  id: string;
  organizationId: string;
  contractNumber: string;
  organizationName: string;
  planName: 'باقة الشركات الأساسية' | 'باقة المؤسسات المتقدمة' | 'باقة التحول الرقمي الشامل';
  billingCycle: 'شهري' | 'سنوي';
  startDate: string;
  endDate: string;
  seatLimit: number;
  usedSeats: number;
  monthlyAmount: number;
  status: 'active' | 'pending_approval' | 'pending_payment' | 'expired';
  includedTrackIds: string[];
}

export interface ERPStudentSync {
  externalStudentId: string;
  nationalId?: string;
  fullName: string;
  phone: string;
  email: string;
  sourceCourseCode: string;
  syncStatus: 'synced' | 'pending' | 'duplicate_detected' | 'failed';
  lastSyncAttempt: string;
  notes?: string;
}

export interface IntegrationSettings {
  erp: {
    enabled: boolean;
    baseUrl: string;
    authType: 'bearer_token' | 'api_key';
    apiKeyConfigured: boolean;
    autoSyncSchedule: 'manual' | 'hourly' | 'daily';
    lastSyncTimestamp?: string;
  };
  payments: {
    provider: 'paymob' | 'fawry' | 'demo_mode';
    isLive: boolean;
    merchantIdConfigured: boolean;
    webhookSecretConfigured: boolean;
    testModeLabel: string;
  };
  video: {
    provider: 'bunny_stream' | 'cloudflare_stream' | 'demo_cdn';
    libraryIdConfigured: boolean;
    tokenAuthEnabled: boolean;
    watermarkingEnabled: boolean;
  };
}
