import {
  CareerPath,
  Course,
  Certificate,
  Badge,
  CorporateContract,
  CorporateEmployee,
  ERPStudentSync,
  IntegrationSettings
} from '../types';

export const BRAND_ASSETS = {
  instructorHero: '/assets/aistudio/IMG_7351_f456e96d.jpg',
  instructorFull: '/assets/aistudio/IMG_7355_e4d86075.jpg',
  instructorFloral: '/assets/aistudio/IMG_7352_f5c97967.jpg',
  centerBanner: '/assets/aistudio/507969552_1133338408840702_2352352951463986138_n_31c3f353.jpg',
  graduationMain: '/assets/aistudio/486411051_1066762998831577_1593271358001561193_n_8b48cc45.jpg',
  graduationSecondary: '/assets/aistudio/508710926_1133338272174049_6364647709713332207_n_e4325ed3.jpg',
  certPython: '/assets/aistudio/507869423_1133338172174059_8814530029949084288_n_f9081bce.jpg',
  certAdobe: '/assets/aistudio/507861957_1133338248840718_7586737275453393193_n_00c21119.jpg',
  certKids: '/assets/aistudio/507748658_1133338292174047_64313610964866830_n_234da75b.jpg',
  labClassroom: '/assets/aistudio/484815185_9391856467602007_8810742352411664420_n_b044141b.jpg',
  traineesGroup: '/assets/aistudio/484809532_9391855087602145_7686767102119376524_n_22d0a726.jpg',
  computerLabRow: '/assets/aistudio/482243189_9391856477602006_4569325487333496204_n__1__a6330bcb.jpg',
  classroomCohort: '/assets/aistudio/484986321_9391854770935510_7355062500600626122_n__1__59c19ea9.jpg',
};

export const INSTRUCTOR_PROFILE = {
  name: 'دكتورة شيماء العجمي',
  title: 'استشاري ومدرب معتمد في تكنولوجيا المعلومات وتحليل البيانات',
  organization: 'مركز سمارتك للتدريب المتطور (SmartTech Training Center)',
  experienceYears: 15,
  phone: '01227811948',
  bio: 'مؤسس ومدير مركز سمارتك للتدريب المتطور، ومدربة معتمدة دولياً في برامج مايكروسوفت المكتبية وإكسل المتقدم وتحليل البيانات. درّبت آلاف الطلاب والمهنيين وموظفي الشركات في مصر والوطن العربي على مدار أكثر من 15 عاماً وفق شعار: "التعلم الحقيقي يبدأ بالتطبيق العملي خطوة بخطوة وببساطة مطلقة".',
  photoFull: BRAND_ASSETS.instructorFull,
  photoPortrait: BRAND_ASSETS.instructorHero,
  credentials: [
    'مركز اختبارات دولي معتمد Certiport Authorized Testing Center',
    'اعتماد مايكروسوفت Microsoft Office Specialist Master',
    'اعتماد أدوبي الدولي Adobe Certified Professional',
    'اعتماد الرخصة الدولية لقيادة الحاسوب ICDL Accredited Test Centre',
    'اعتماد الشبكة الأهلية للتعليم NEN والمجلس الوطني للتدريب والتعليم'
  ]
};

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'path-digital-employee',
    slug: 'digital-employee',
    title: 'الموظف الرقمي الشامل (Digital Employee)',
    subtitle: 'الانطلاقة الأساسية لكل موظف وباحث عن عمل في بيئة الأعمال الحديثة',
    description: 'تأهيل متكامل يبدأ من أساسيات نظام ويندوز، الطباعة السريعة باللمس، مايكروسوفت وورد، أساسيات إكسل، عروض بوربوينت الاحترافية، وتطبيقات Google Workspace وأدوات الذكاء الاصطناعي لزيادة الإنتاجية المكتبية.',
    level: 'مبتدئ',
    estimatedDuration: '30 ساعة تدريبية',
    coursesCount: 3,
    badgeName: 'وسام الموظف الرقمي',
    color: 'from-blue-600 to-indigo-700',
    iconName: 'Laptop',
    courseIds: ['course-de-101', 'course-de-102']
  },
  {
    id: 'path-excel-pro',
    slug: 'excel-professional',
    title: 'محترف إكسل (Excel Professional)',
    subtitle: 'من المعادلات البسيطة إلى أدوات الذكاء والنمذجة المالية والأتمتة',
    description: 'المسار الأكثر طلباً: يشمل 3 مستويات تبدأ بصيغ إكسل الأساسية، الحسابات المنطقية، دوال البحث والربط الحديثة (XLOOKUP & VLOOKUP)، جداول البيانات والجداول المحورية (PivotTables)، وتجهيز تقارير ديناميكية.',
    level: 'شامل',
    estimatedDuration: '45 ساعة تدريبية',
    coursesCount: 3,
    badgeName: 'خبير إكسل المعتمد',
    color: 'from-emerald-600 to-teal-700',
    iconName: 'FileSpreadsheet',
    courseIds: ['course-excel-core', 'course-excel-advanced']
  },
  {
    id: 'path-data-analytics',
    slug: 'data-analysis',
    title: 'تحليل ذكاء الأعمال (Data Analysis & BI)',
    subtitle: 'تحويل البيانات الخام إلى لوحات تحكم وقرارات استراتيجية مدروسة',
    description: 'تنظيف وتحويل البيانات عبر Power Query، تصميم النماذج العلائقية، صياغة دوال DAX، وبناء لوحات مؤشرات الأداء التفاعلية في Power BI لقطاعات المبيعات، الموارد البشرية، والمالية.',
    level: 'متوسط',
    estimatedDuration: '40 ساعة تدريبية',
    coursesCount: 2,
    badgeName: 'محلل بيانات معتمد',
    color: 'from-amber-600 to-orange-700',
    iconName: 'BarChart3',
    courseIds: ['course-power-bi']
  },
  {
    id: 'path-sql-python',
    slug: 'sql-and-python',
    title: 'قواعد البيانات والبرمجة (SQL & Python)',
    subtitle: 'الأساس المتين للتعامل مع البيانات الضخمة والأتمتة المتقدمة',
    description: 'إتقان استعلامات قواعد البيانات العلائقية SQL (الدمج Joins، التجميع Aggregation، الدوال التحليلية Window Functions)، وبرمجة بايثون ومكتبات Pandas & NumPy لمعالجة البيانات الضخمة.',
    level: 'متقدم',
    estimatedDuration: '50 ساعة تدريبية',
    coursesCount: 2,
    badgeName: 'مهندس استعلامات وبيانات',
    color: 'from-purple-600 to-indigo-800',
    iconName: 'Database',
    courseIds: ['course-sql-core']
  },
  {
    id: 'path-data-science',
    slug: 'data-science',
    title: 'علم البيانات والذكاء الاصطناعي (Data Science)',
    subtitle: 'بناء النماذج التنبؤية والتطبيق العملي لتقنيات تعلم الآلة',
    description: 'المسار المتقدم الذي يدمج الإحصاء والاحتمالات، استكشاف الأنماط، هندسة الخصائص، وتدريب نماذج تعلم الآلة Machine Learning لحل مشكلات وتحديات الأعمال المعقدة.',
    level: 'متقدم',
    estimatedDuration: '60 ساعة تدريبية',
    coursesCount: 2,
    badgeName: 'عالم بيانات تطبيقي',
    color: 'from-red-600 to-rose-800',
    iconName: 'BrainCircuit',
    courseIds: ['course-ds-core']
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-excel-core',
    slug: 'excel-core-mastery',
    title: 'إكسل ببساطة: من الأساسيات إلى المعادلات المتقدمة',
    shortDescription: 'الدورة التدريبية الأشهر مع دكتورة شيماء لإتقان إكسل عملياً وتطبيق المعادلات المالية والإدارية.',
    fullDescription: 'تعلم إكسل بأسلوب تطبيقي مباشر يزيل التعقيد. تبدأ من واجهة البرنامج والمراجع، وتصل إلى احتراف دوال SUM, AVERAGE, IF المركبة، دوال البحث الحديثة XLOOKUP وVLOOKUP، ومعالجة النصوص والأخطاء، وتصميم كشوف رواتب وتقارير أرباح متكاملة.',
    trackId: 'path-excel-pro',
    level: 'شامل',
    durationHours: 18,
    lessonsCount: 12,
    price: 450,
    originalPrice: 850,
    isPopular: true,
    thumbnail: BRAND_ASSETS.labClassroom,
    outcomes: [
      'فهم منطق المراجع النسبية والمطلقة ($A$1) وتجنب الأخطاء الشائعة',
      'إتقان الدوال الشرطية مثل IF و COUNTIF و SUMIFS لحساب الأهداف والعمولات',
      'استخدام دوال البحث XLOOKUP و VLOOKUP لربط كشوف الحسابات والموظفين',
      'استخدام الجداول الديناميكية والتنسيق الشرطي لكشف القيم المتطرفة',
      'حل تمارين معمل إكسل التفاعلي داخل المنصة دون الحاجة لتثبيت برامج'
    ],
    prerequisites: ['معرفة عامة بالتعامل مع جهاز الكمبيوتر'],
    modules: [
      {
        id: 'mod-1',
        courseId: 'course-excel-core',
        title: 'الوحدة الأولى: البنية الأساسية والمراجع الحسابية',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            courseId: 'course-excel-core',
            moduleId: 'mod-1',
            title: 'المقدمة: تشريح ورقة العمل وفلسفة الخلايا',
            description: 'جولة تعريفية بالخلايا، شريط الصيغ، وأنواع البيانات الرقمية والنصية.',
            durationMinutes: 12,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: true,
            order: 1,
            attachments: [
              {
                id: 'att-1',
                title: 'ملف التدريب العملي - الدرس الأول',
                fileName: 'SmartTech_Excel_L1_Starter.xlsx',
                fileSize: '1.2 MB',
                fileType: 'xlsx',
                downloadUrl: '#'
              }
            ],
            exercise: {
              id: 'ex-1-1',
              title: 'تمرين: جمع مبيعات الفروع الأساسية',
              instructions: 'اكتب في الخلية B5 صيغة الجمع =SUM(B2:B4) لحساب إجمالي المبيعات لشهر يناير.',
              starterData: {
                'A1': 'الفرع',
                'B1': 'مبيعات يناير',
                'A2': 'فرع القاهرة',
                'B2': 15000,
                'A3': 'فرع الإسكندرية',
                'B3': 22500,
                'A4': 'فرع المنصورة',
                'B4': 18200,
                'A5': 'الإجمالي'
              },
              targetCell: 'B5',
              expectedFormulaKeywords: ['SUM'],
              expectedResult: 55700,
              hints: [
                'تأكد من بدء المعادلة بعلامة يساوي (=)',
                'استخدم دالة الجمع بالشكل: =SUM(B2:B4)'
              ],
              xpReward: 50
            },
            quiz: [
              {
                id: 'q-1',
                prompt: 'ما العلامة التي يجب أن تبدأ بها أي صيغة حسابية في إكسل ليتم احتسابها؟',
                options: ['علامة النقطتين :', 'علامة يساوي =', 'علامة الاستفهام ؟', 'علامة الجمع +'],
                correctIndex: 1,
                explanation: 'يبدأ إكسل بالتعرف على المدخل كصيغة حسابية فقط عند وضع علامة يساوي (=) في البداية.'
              }
            ]
          },
          {
            id: 'les-1-2',
            courseId: 'course-excel-core',
            moduleId: 'mod-1',
            title: 'المراجع المطلقة والنسبية والتثبيت بعلامة الدولار ($)',
            description: 'كيفية تثبيت الخلايا عند سحب المعادلات لحساب نسبة الضريبة أو العمولة.',
            durationMinutes: 18,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: true,
            order: 2,
            exercise: {
              id: 'ex-1-2',
              title: 'تمرين: حساب ضريبة القيمة المضافة 14%',
              instructions: 'في الخلية C2، اضرب قيمة المنتج في الخلية B2 بنسبة الضريبة في الخلية F1 مع تثبيتها: =B2*$F$1',
              starterData: {
                'A1': 'المنتج',
                'B1': 'السعر الأساسي',
                'C1': 'قيمة الضريبة',
                'F1': 0.14,
                'A2': 'حاسوب محمول',
                'B2': 25000
              },
              targetCell: 'C2',
              expectedFormulaKeywords: ['B2', 'F1'],
              expectedResult: 3500,
              hints: [
                'الصيغة المطلوبة هي ضرب السعر الأساسي في نسبة الضريبة: =B2*F1 أو =B2*$F$1',
                'تذكر وضع علامة الضرب * بين الخليتين'
              ],
              xpReward: 60
            }
          }
        ]
      },
      {
        id: 'mod-2',
        courseId: 'course-excel-core',
        title: 'الوحدة الثانية: الدوال المنطقية والشرطية (IF & SUMIFS)',
        order: 2,
        lessons: [
          {
            id: 'les-2-1',
            courseId: 'course-excel-core',
            moduleId: 'mod-2',
            title: 'دالة IF الشرطية وتحديد نتائج تقييم الأداء',
            description: 'استخدام دالة IF لتحديد الناجحين أو استحقاق مكافأة المبيعات تلقائياً.',
            durationMinutes: 22,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1,
            exercise: {
              id: 'ex-2-1',
              title: 'تمرين: تقييم استحقاق الحافز',
              instructions: 'في الخلية C2، إذا كانت مبيعات الموظف في B2 أكبر من 10000 امنحه "مستحق"، وإلا "غير مستحق": =IF(B2>10000, "مستحق", "غير مستحق")',
              starterData: {
                'A1': 'الموظف',
                'B1': 'المبيعات المحققة',
                'C1': 'حالة الحافز',
                'A2': 'أحمد إبراهيم',
                'B2': 14500
              },
              targetCell: 'C2',
              expectedFormulaKeywords: ['IF'],
              expectedResult: 'مستحق',
              hints: [
                'استخدم صيغة IF: =IF(B2>10000, "مستحق", "غير مستحق")',
                'احرص على إحاطة النصوص العربية بعلامتي تنصيص ""'
              ],
              xpReward: 80
            }
          },
          {
            id: 'les-2-2',
            courseId: 'course-excel-core',
            moduleId: 'mod-2',
            title: 'دوال الجمع الشرطي المتعدد SUMIFS لحساب مبيعات المناطق',
            description: 'تصفية وحساب إجمالي الأرقام وفق شروط متزامنة مثل اسم المندوب والشهر.',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 2,
            exercise: {
              id: 'ex-2-2',
              title: 'تمرين: جمع مبيعات قسم الإلكترونيات فقط',
              instructions: 'استخدم دالة SUMIF لحساب مجموع مبيعات قسم "إلكترونيات" في النطاق C2:C4 بناءً على نوع القسم في B2:B4: =SUMIF(B2:B4, "إلكترونيات", C2:C4)',
              starterData: {
                'A1': 'رقم الطلب',
                'B1': 'القسم',
                'C1': 'المبلغ',
                'A2': 'ORD-101',
                'B2': 'إلكترونيات',
                'C2': 3000,
                'A3': 'ORD-102',
                'B3': 'أثاث',
                'C3': 4500,
                'A4': 'ORD-103',
                'B4': 'إلكترونيات',
                'C4': 5000,
                'B5': 'إجمالي الإلكترونيات'
              },
              targetCell: 'C5',
              expectedFormulaKeywords: ['SUMIF'],
              expectedResult: 8000,
              hints: [
                'الصيغة: =SUMIF(B2:B4, "إلكترونيات", C2:C4)',
                'تأكد من وضع الشرط بين علامتي اقتباس مزدوجتين'
              ],
              xpReward: 100
            }
          }
        ]
      },
      {
        id: 'mod-3',
        courseId: 'course-excel-core',
        title: 'الوحدة الثالثة: دوال البحث والربط الحديثة (XLOOKUP & VLOOKUP)',
        order: 3,
        lessons: [
          {
            id: 'les-3-1',
            courseId: 'course-excel-core',
            moduleId: 'mod-3',
            title: 'وداعاً لأخطاء VLOOKUP: دالة XLOOKUP الشاملة والمرنة',
            description: 'كيفية البحث يساراً ويميناً وتفادي أخطاء #N/A وتحديد قيم افتراضية.',
            durationMinutes: 28,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1,
            exercise: {
              id: 'ex-3-1',
              title: 'تمرين: جلب المسمى الوظيفي بواسطة كود الموظف',
              instructions: 'في الخلية E2، استخدم دالة XLOOKUP للبحث عن الكود في D2 داخل عمود الأكواد A2:A4 وإرجاع المسمى الوظيفي من C2:C4: =XLOOKUP(D2, A2:A4, C2:C4)',
              starterData: {
                'A1': 'كود الموظف',
                'B1': 'الاسم',
                'C1': 'الوظيفة',
                'A2': 'EMP-1',
                'B2': 'محمد علي',
                'C2': 'محلل بيانات',
                'A3': 'EMP-2',
                'B3': 'سارة كريم',
                'C3': 'مدير مالي',
                'A4': 'EMP-3',
                'B4': 'عمر خالد',
                'C4': 'مهندس برمجيات',
                'D1': 'كود البحث',
                'D2': 'EMP-2',
                'E1': 'الوظيفة المسترجعة'
              },
              targetCell: 'E2',
              expectedFormulaKeywords: ['XLOOKUP'],
              expectedResult: 'مدير مالي',
              hints: [
                'الصيغة: =XLOOKUP(D2, A2:A4, C2:C4)',
                'الوسيط الأول هو الخلية المراد البحث عنها، الثاني عمود البحث، الثالث عمود النتيجة'
              ],
              xpReward: 120
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-excel-advanced',
    slug: 'excel-advanced-analytics',
    title: 'إكسل المتقدم: الجداول المحورية ولوحات القيادة (Dashboards)',
    shortDescription: 'احترف تلخيص آلاف السجلات وبناء تقارير ديناميكية وتصميم لوحات تحكم تنفيذية احترافية.',
    fullDescription: 'دورة المستوى الاحترافي المتقدم لنقل قدراتك إلى مستوى كبار المحللين. تشمل بناء الـ PivotTables، الحقول المحسوبة Calculated Fields، مقسمات البيانات Slicers، مخططات التوزيع التفاعلية، وتصميم لوحات تحكم مالية تسهم في اتخاذ قرارات الأعمال.',
    trackId: 'path-excel-pro',
    level: 'متقدم',
    durationHours: 15,
    lessonsCount: 10,
    price: 520,
    originalPrice: 950,
    thumbnail: BRAND_ASSETS.traineesGroup,
    outcomes: [
      'إنشاء وتحديث الجداول المحورية PivotTables بدون أخطاء تحديث البيانات',
      'إضافة مقسمات بيانات Slicers والجداول الزمنية Timeline المترابطة',
      'حساب النسب المئوية ومعدلات النمو السنوي والشهرية عبر الجداول المحورية',
      'تصميم لوحة قيادة Dashboard احترافية بالكامل قابلة للتصدير والطباعة'
    ],
    prerequisites: ['إتقان أساسيات إكسل والمعادلات المنطقية'],
    modules: [
      {
        id: 'mod-adv-1',
        courseId: 'course-excel-advanced',
        title: 'الوحدة الأولى: هندسة الجداول المحورية والمخططات',
        order: 1,
        lessons: [
          {
            id: 'les-adv-1',
            courseId: 'course-excel-advanced',
            moduleId: 'mod-adv-1',
            title: 'هيكلة مصادر البيانات الخام وتحويلها لجدول PivotTable',
            description: 'قواعد تنظيم الجداول وقواعد الأعمدة لتوليد تقارير سريعة بدقة.',
            durationMinutes: 20,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'course-power-bi',
    slug: 'power-bi-masterclass',
    title: 'تحليل ذكاء الأعمال باستخدام Power BI و DAX',
    shortDescription: 'تعلم استيراد البيانات من مصادر متعددة، بنائها في نماذج علائقية وتصميم تقارير بيزنس تفاعلية مبهرة.',
    fullDescription: 'المنهج العملي الشامل لتحويل ملفات إكسل وقواعد البيانات إلى داشبوردات ذكية تعمل تلقائياً. يغطي برنامج Power Query لتنظيف البيانات، علاقات النماذج Star Schema، دوال التحليل المتقدمة DAX مثل CALCULATE و TOTALYTD، ونشر التقارير التفاعلية ومشاركتها مع الإدارات.',
    trackId: 'path-data-analytics',
    level: 'متوسط',
    durationHours: 24,
    lessonsCount: 14,
    price: 650,
    originalPrice: 1200,
    isPopular: true,
    thumbnail: BRAND_ASSETS.computerLabRow,
    outcomes: [
      'استيراد ودمج البيانات من Excel و SQL و CSV في بيئة Power Query',
      'معالجة البيانات المكررة والأخطاء وبناء الأعمدة المحسوبة',
      'كتابة صيغ DAX القياسية لإنشاء مقاييس ومؤشرات قياس الأداء (Measures)',
      'تصميم لوحات مؤشرات تفاعلية تناسب متطلبات الإدارة العليا'
    ],
    prerequisites: ['معرفة جيدة ببرنامج إكسل ومفاهيم الجداول'],
    modules: [
      {
        id: 'mod-pbi-1',
        courseId: 'course-power-bi',
        title: 'الوحدة الأولى: الاستيراد والتحويل بواسطة Power Query',
        order: 1,
        lessons: [
          {
            id: 'les-pbi-1',
            courseId: 'course-power-bi',
            moduleId: 'mod-pbi-1',
            title: 'الربط بمصادر البيانات المتعددة وتنظيف الشوائب',
            description: 'خطوات التحويل وتعديل أنواع الحقول وحذف الصفوف الفارغة.',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'course-sql-core',
    slug: 'sql-database-fundamentals',
    title: 'قواعد البيانات العلائقية واحتراف لغة SQL',
    shortDescription: 'اكتب استعلامات قوية لاستخراج البيانات، دمج الجداول، وحساب المؤشرات التحليلية من قواعد البيانات الكبرى.',
    fullDescription: 'تعلم لغة الاستعلام القياسية SQL من الصفر خطوة بخطوة. يشمل أوامر SELECT, WHERE, GROUP BY, HAVING، عمليات الربط المتنوعة (INNER, LEFT, RIGHT JOIN)، الدوال التحليلية Window Functions، والتعامل مع قواعد البيانات PostgreSQL و SQL Server.',
    trackId: 'path-sql-python',
    level: 'مبتدئ',
    durationHours: 20,
    lessonsCount: 12,
    price: 490,
    originalPrice: 900,
    thumbnail: BRAND_ASSETS.classroomCohort,
    outcomes: [
      'تصميم جداول قواعد البيانات وفهم المفاتيح الأساسية والخارجية (Primary & Foreign Keys)',
      'كتابة استعلامات معقدة لربط بيانات الفواتير والعملاء والمنتجات',
      'تطبيق دوال التجميع والترتيب والتقسيم التحليلي للمجموعات',
      'تحسين أداء الاستعلامات واستخراج تقارير سريعة لدعم اتخاذ القرار'
    ],
    prerequisites: ['رغبة في تعلم إدارة وتحليل البيانات'],
    modules: [
      {
        id: 'mod-sql-1',
        courseId: 'course-sql-core',
        title: 'الوحدة الأولى: لغة الاستعلام وأوامر التصفية والتجميع',
        order: 1,
        lessons: [
          {
            id: 'les-sql-1',
            courseId: 'course-sql-core',
            moduleId: 'mod-sql-1',
            title: 'استعلام SELECT واسترجاع الحقول مع شروط WHERE',
            description: 'أسس بناء الاستعلام وتطبيق المعاملات المنطقية.',
            durationMinutes: 18,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'course-de-101',
    slug: 'digital-workplace-essentials',
    title: 'أساسيات الموظف الرقمي والإنتاجية المكتبية',
    shortDescription: 'الدبلومة الأساسية لإتقان أدوات المكتب الحديثة، ويندوز، وورد، والطباعة السريعة وفق المعايير الدولية.',
    fullDescription: 'تأهيل وظيفي شامل معتمد من مركز سمارتك يغطي نظام ويندوز، إدارة الملفات السحابية على Google Drive وOneDrive، تنسيق الكتب والخطابات الرسمية على Word، والطباعة العربية السريعة بدون النظر إلى لوحة المفاتيح.',
    trackId: 'path-digital-employee',
    level: 'مبتدئ',
    durationHours: 16,
    lessonsCount: 10,
    price: 380,
    originalPrice: 700,
    thumbnail: BRAND_ASSETS.certKids,
    outcomes: [
      'التحكم الكامل في نظام التشغيل وإدارة المجلدات والنسخ الاحتياطي',
      'صياغة وتنسيق المراسلات والتقارير الإدارية بجودة طباعة ممتازة في Word',
      'زيادة سرعة الطباعة باللمس لأكثر من 40 كلمة في الدقيقة',
      'استخدام تطبيقات المستندات التعاونية والمشاركة الفورية عبر السحابة'
    ],
    prerequisites: ['لا توجد متطلبات مسبقة - مناسب للمبتدئين تماماً'],
    modules: [
      {
        id: 'mod-de-1',
        courseId: 'course-de-101',
        title: 'الوحدة الأولى: كفاءة إدارة الملفات والأنظمة المكتبية',
        order: 1,
        lessons: [
          {
            id: 'les-de-1',
            courseId: 'course-de-101',
            moduleId: 'mod-de-1',
            title: 'إدارة مساحة العمل الرقمية واختصارات لوحة المفاتيح السريعة',
            description: 'توفير ساعات العمل الأسبوعية عبر اختصارات عملية.',
            durationMinutes: 15,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            order: 1
          }
        ]
      }
    ]
  }
];

export const GALLERY_PHOTOS = [
  {
    id: 'photo-1',
    title: 'حفل التخرج السنوي وتوزيع شهادات الاعتماد الدولي',
    category: 'ceremony',
    categoryLabel: 'حفلات التخرج',
    image: BRAND_ASSETS.graduationMain,
    description: 'دكتورة شيماء العجمي وسط كوكبة من خريجي برامج مركز سمارتك للتدريب المتطور الحاصلين على الشهادات المعتمدة في القاعة الكبرى.',
    date: 'سبتمبر 2024'
  },
  {
    id: 'photo-2',
    title: 'تسليم شهادة البرمجة والتطوير بلغة Python و C++',
    category: 'certificate',
    categoryLabel: 'تسليم الشهادات',
    image: BRAND_ASSETS.certPython,
    description: 'تكريم أحد الطلاب المتميزين بعد إتمام دورة البرمجة والتطبيق العملي وحصوله على شهادة معتمدة من مركز سمارتك.',
    date: 'نوفمبر 2023'
  },
  {
    id: 'photo-3',
    title: 'اعتماد أدوبي الدولي Adobe Certified Professional',
    category: 'certificate',
    categoryLabel: 'شهادات دولية',
    image: BRAND_ASSETS.certAdobe,
    description: 'تسليم شهادة الاعتماد الدولي من شركة Adobe في التصميم الإبداعي لأحد خريجي المركز المتفوقين.',
    date: 'أكتوبر 2023'
  },
  {
    id: 'photo-4',
    title: 'برنامج العباقرة الصغار Smart Kids والحساب الذهني',
    category: 'kids',
    categoryLabel: 'أكاديمية الأطفال',
    image: BRAND_ASSETS.certKids,
    description: 'ابتسامة الفرح والتفوق لأحد أبطال دبلومة Smart Kids لتنمية المهارات التقنية والحسابية بعد اجتيازه الاختبارات بتقدير ممتاز.',
    date: 'أغسطس 2023'
  },
  {
    id: 'photo-5',
    title: 'التدريب التفاعلي العملي داخل معمل حواسيب سمارتك',
    category: 'lab',
    categoryLabel: 'معامل التدريب',
    image: BRAND_ASSETS.labClassroom,
    description: 'أجواء الحماس والتدريب التطبيقي خطوة بخطوة داخل معمل الحواسيب المجهز بمركز سمارتك للتدريب المتطور.',
    date: 'مارس 2024'
  },
  {
    id: 'photo-6',
    title: 'الدفعة المهنية لتدريب الكوادر وموظفي الشركات',
    category: 'corporate',
    categoryLabel: 'تدريب الشركات',
    image: BRAND_ASSETS.traineesGroup,
    description: 'صورة تذكارية لمتدربي البرامج المتقدمة في إكسل وإدارة الأعمال مع دكتورة شيماء وفريق عمل مركز سمارتك.',
    date: 'مايو 2024'
  },
  {
    id: 'photo-7',
    title: 'بنر الاعتمادات الدولية لمركز سمارتك للتدريب المتطور',
    category: 'center',
    categoryLabel: 'عن المركز',
    image: BRAND_ASSETS.centerBanner,
    description: 'دكتورة شيماء بجوار بنر المركز الرسمي: مركز معتمد من Certiport, Microsoft, Adobe, ICDL, MOS (هاتف: 01227811948).',
    date: 'المركز الرسمي'
  },
  {
    id: 'photo-8',
    title: 'تكريم المتفوقين في الحفل الختامي لمسارات الصيف',
    category: 'ceremony',
    categoryLabel: 'حفلات التخرج',
    image: BRAND_ASSETS.graduationSecondary,
    description: 'لحظات الفخر لطلاب المركز وأولياء الأمور مع استلام الشهادات الموثقة رسمياً.',
    date: 'سبتمبر 2023'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-first-lesson',
    title: 'الخطوة الأولى',
    description: 'أتممت أول درس تدريبي بنجاح وبدأت رحلتك الرقمية.',
    icon: 'Sparkles',
    requiredXP: 10,
    category: 'general'
  },
  {
    id: 'badge-excel-novice',
    title: 'مبتدئ إكسل النشط',
    description: 'حللت أول تمرين في معمل إكسل التفاعلي بنجاح.',
    icon: 'FileSpreadsheet',
    requiredXP: 100,
    category: 'excel'
  },
  {
    id: 'badge-formula-master',
    title: 'فارس الصيغ والمعادلات',
    description: 'أتقنت دوال البحث والشرط (XLOOKUP & SUMIFS) في المعمل.',
    icon: 'Calculator',
    requiredXP: 300,
    category: 'excel'
  },
  {
    id: 'badge-quiz-champion',
    title: 'بطل الاختبارات المعرفية',
    description: 'حققت نسبة 100% في 3 اختبارات متتالية.',
    icon: 'Award',
    requiredXP: 500,
    category: 'general'
  },
  {
    id: 'badge-certified-pro',
    title: 'محترف معتمد من سمارتك',
    description: 'أتممت مساراً تدريبياً كاملاً وحصلت على الشهادة الرسمية.',
    icon: 'GraduationCap',
    requiredXP: 1000,
    category: 'analytics'
  }
];

export const SAMPLE_CERTIFICATE: Certificate = {
  id: 'cert-sample-01',
  certificateCode: 'ST-2026-EXCEL-9812',
  userId: 'usr-student-01',
  userName: 'أحمد محمود السعيد',
  courseId: 'course-excel-core',
  courseTitle: 'إكسل ببساطة: من الأساسيات إلى المعادلات المتقدمة',
  trackTitle: 'مسار محترف إكسل (Excel Professional)',
  issueDate: '24 أكتوبر 2026',
  grade: 'ممتاز',
  instructorName: 'د. شيماء العجمي',
  centerName: 'SmartTech Training Center',
  verificationUrl: 'https://smarttech.edu.eg/verify/ST-2026-EXCEL-9812'
};

export const CORPORATE_CONTRACTS: CorporateContract[] = [
  {
    id: 'cont-01',
    organizationId: 'org-tech-solutions',
    organizationName: 'شركة النيل للحلول الرقمية وتكنولوجيا المعلومات',
    contractNumber: 'ST-CORP-2026-08',
    planName: 'باقة المؤسسات المتقدمة',
    billingCycle: 'سنوي',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    seatLimit: 50,
    usedSeats: 38,
    monthlyAmount: 18500,
    status: 'active',
    includedTrackIds: ['path-digital-employee', 'path-excel-pro', 'path-data-analytics']
  },
  {
    id: 'cont-02',
    organizationId: 'org-delta-invest',
    organizationName: 'مجموعة الدلتا للاستثمار والخدمات اللوجستية',
    contractNumber: 'ST-CORP-2026-14',
    planName: 'باقة التحول الرقمي الشامل',
    billingCycle: 'شهري',
    startDate: '2026-06-01',
    endDate: '2027-05-31',
    seatLimit: 100,
    usedSeats: 82,
    monthlyAmount: 32000,
    status: 'active',
    includedTrackIds: ['path-digital-employee', 'path-excel-pro', 'path-data-analytics', 'path-sql-python']
  }
];

export const CORPORATE_EMPLOYEES: CorporateEmployee[] = [
  {
    id: 'emp-1',
    organizationId: 'org-tech-solutions',
    name: 'محمود عبد الرحمن',
    email: 'm.abdelrahman@niletech.eg',
    department: 'المحاسبة والمالية',
    jobTitle: 'رئيس حسابات أول',
    status: 'active',
    assignedCourseIds: ['course-excel-core', 'course-excel-advanced'],
    completedCoursesCount: 1,
    overallProgressPercent: 85,
    lastActive: 'منذ ساعتين'
  },
  {
    id: 'emp-2',
    organizationId: 'org-tech-solutions',
    name: 'مروة الشاذلي',
    email: 'marwa.shazly@niletech.eg',
    department: 'الموارد البشرية (HR)',
    jobTitle: 'أخصائي شؤون العاملين',
    status: 'active',
    assignedCourseIds: ['course-excel-core', 'course-de-101'],
    completedCoursesCount: 2,
    overallProgressPercent: 100,
    lastActive: 'اليوم، 10:15 ص'
  },
  {
    id: 'emp-3',
    organizationId: 'org-tech-solutions',
    name: 'كريم حسن الألفي',
    email: 'k.alfy@niletech.eg',
    department: 'تخطيط العمليات والمبيعات',
    jobTitle: 'محلل مبيعات إقليمي',
    status: 'active',
    assignedCourseIds: ['course-excel-advanced', 'course-power-bi'],
    completedCoursesCount: 1,
    overallProgressPercent: 62,
    lastActive: 'أمس، 04:30 م'
  },
  {
    id: 'emp-4',
    organizationId: 'org-tech-solutions',
    name: 'رانيا مدحت مصطفى',
    email: 'rania.m@niletech.eg',
    department: 'خدمة العملاء والعمليات',
    jobTitle: 'مشرف جودة الخدمة',
    status: 'active',
    assignedCourseIds: ['course-de-101'],
    completedCoursesCount: 0,
    overallProgressPercent: 30,
    lastActive: 'منذ 3 أيام'
  }
];

export const SAMPLE_ERP_SYNCS: ERPStudentSync[] = [
  {
    externalStudentId: 'ERP-ST-8841',
    nationalId: '29510150102458',
    fullName: 'يوسف مصطفى البدري',
    phone: '01019882314',
    email: 'youssef.badry@gmail.com',
    sourceCourseCode: 'MOS-EXCEL-ADV',
    syncStatus: 'synced',
    lastSyncAttempt: '2026-10-24 09:12:00',
    notes: 'تمت مطابقة السجل وتفعيل حق الوصول لدورة إكسل المتقدم بنجاح.'
  },
  {
    externalStudentId: 'ERP-ST-8842',
    nationalId: '29804221405892',
    fullName: 'هدى عصام الجوهري',
    phone: '01287654321',
    email: 'hoda.gohary@hotmail.com',
    sourceCourseCode: 'DATA-BI-FOUNDATION',
    syncStatus: 'synced',
    lastSyncAttempt: '2026-10-24 09:12:00',
    notes: 'طالبة مسجلة في مركز سمارتك - تم استيراد الحساب تلقائياً.'
  },
  {
    externalStudentId: 'ERP-ST-8843',
    nationalId: '29912080104112',
    fullName: 'طارق صلاح الدين',
    phone: '01155443322',
    email: 'tarek.salah@yahoo.com',
    sourceCourseCode: 'PYTHON-CORE',
    syncStatus: 'pending',
    lastSyncAttempt: '2026-10-24 09:12:00',
    notes: 'بانتظار تأكيد سداد الرسوم في النظام المحاسبي بالمركز.'
  }
];

export const INITIAL_INTEGRATION_SETTINGS: IntegrationSettings = {
  erp: {
    enabled: true,
    baseUrl: 'https://erp.smarttech-center.eg/api/v1',
    authType: 'api_key',
    apiKeyConfigured: true,
    autoSyncSchedule: 'daily',
    lastSyncTimestamp: '2026-10-24 09:12'
  },
  payments: {
    provider: 'demo_mode',
    isLive: false,
    merchantIdConfigured: true,
    webhookSecretConfigured: true,
    testModeLabel: 'بوابة الدفع التجريبية - Paymob / Fawry Sandbox Active'
  },
  video: {
    provider: 'demo_cdn',
    libraryIdConfigured: true,
    tokenAuthEnabled: true,
    watermarkingEnabled: true
  }
};

export const BADGES_LIST = BADGES;

export const REAL_PHOTO_GALLERY = GALLERY_PHOTOS.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  categoryLabel: p.categoryLabel,
  src: p.image,
  image: p.image,
  caption: p.description,
  description: p.description,
  date: p.date,
  location: 'المنصورة · SmartTech Center'
}));

export type RealPhotoItem = typeof REAL_PHOTO_GALLERY[0];

