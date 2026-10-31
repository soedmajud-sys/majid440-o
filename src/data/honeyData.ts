import { HoneyProduct, CustomerReview } from '../types/honey';

export const HONEY_PRODUCTS: HoneyProduct[] = [
  {
    id: 'sidr-baladi',
    name: 'عسل السدر الجبلي البلدي الفاخر',
    tagline: 'سيد الأعسال السعودية من قمم جبال عسير والطائف',
    category: 'جبلي',
    region: 'مرتفعات عسير وجبال الطائف، السعودية',
    floralSource: 'أزهار أشجار السدر البرية (Ziziphus spina-christi)',
    colorName: 'عنبري ذهبي داكن برّاق',
    colorHex: '#B46E1B',
    texture: 'كثيف، مخملي القوام وبطيء التبلور',
    tasteNotes: 'نكهة كراميل مع عطر زهر السدر الجبلي النفاذ وحلاوة متوازنة غير حارقة',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 390, originalPrice: 440, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 215, originalPrice: 240, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 120, originalPrice: 135, inStock: true }
    ],
    labSpecs: {
      sucrose: '1.4% (المعيار السعودي SASO أقل من 5%)',
      diastase: '15.8 وحدة (إنزيمات حية فائقة)',
      moisture: '15.9% (رطوبة مثالية تمنع التخمر)',
      hmf: '6.2 ملغ/كغ (طازج جداً لم يتعرض لحرارة)',
      purity: '100% طبيعي خام غير مبستر'
    },
    healthBenefits: [
      'تقوية الجهاز المناعي ومقاومة نزلات البرد الفيروسية',
      'تعزيز طاقة ونشاط الجسم ومكافحة الإجهاد اليومي',
      'تسريع التئام الجروح والتقرحات بفضل خواصه المطهرة',
      'دعم صحة الكبد وتنشيط الدورة الدموية'
    ],
    bestFor: ['المناعة', 'الطاقة', 'كبار السن', 'هدايا فاخرة'],
    usageInstructions: 'ملعقة طعام صباحاً على الريق مذابة في نصف كوب ماء فاتر، وملعقة أخرى قبل النوم.',
    harvestSeason: 'موسم السدر الخريفي (أكتوبر - نوفمبر)',
    badge: 'الأكثر طلباً',
    image: '/src/assets/images/product_sidr_honey_jar_1793479796584.jpg',
    rating: 4.96,
    reviewsCount: 148,
    labCertificateNumber: 'SASO-CERT-2026-SA0981'
  },
  {
    id: 'talh-hail',
    name: 'عسل الطلح الحائلي البري الصافي',
    tagline: 'من أودية حائل والقصيم - العسل الأمثل للصدر والسكر',
    category: 'شوكي وصحراوي',
    region: 'أودية حائل وصحراء النفود والقصيم، السعودية',
    floralSource: 'أزهار شجر الطلح النجدي والشوكيات الصحراوية (Acacia gerrardii)',
    colorName: 'عنبري مائل للسواد والأحمر القاني',
    colorHex: '#6E3211',
    texture: 'ثقيل لزج عالي الكثافة مع لزوجة ملحوظة',
    tasteNotes: 'طعم قوي حاد مع لدغة خفيفة بالحلق تميز عسل الطلح الأصلي وحلاوة خفيفة',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 340, originalPrice: 380, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 185, originalPrice: 210, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 105, inStock: true }
    ],
    labSpecs: {
      sucrose: '0.9% (نسبة فركتوز عالية جداً مناسبة لحميات السكر)',
      diastase: '14.1 وحدة إنزيمية',
      moisture: '16.1%',
      hmf: '5.8 ملغ/كغ',
      purity: '100% طبيعي بري صحراوي'
    },
    healthBenefits: [
      'تطهير الشعب الهوائية وتخفيف السعال المزمن والبلغم',
      'يعد الخيار الأول لمرضى السكري باعتدال لارتفاع سكر الفواكه (الفركتوز)',
      'تخفيف التهابات القولون والمعدة وحرقة المريء',
      'غني جداً بالمعادن كالحديد والزنك والكالسيوم'
    ],
    bestFor: ['الصدر', 'السكر', 'المعدة', 'كبار السن'],
    usageInstructions: 'ملعقة متوسطة مع ماء دافئ وعصرة ليمون صباحاً لمشاكل الصدر والتنفس.',
    harvestSeason: 'موسم القيظ والصيف (يونيو - يوليو)',
    badge: 'صديق الصدر والسكر',
    image: '/src/assets/images/hero_honey_boutique_1793479795301.jpg',
    rating: 4.93,
    reviewsCount: 112,
    labCertificateNumber: 'SASO-CERT-2026-HL4120'
  },
  {
    id: 'samar-janub',
    name: 'عسل السمر البلدي الجنوبي (الشوكة)',
    tagline: 'عسل تهامة عالي الحديد ومضادات الأكسدة',
    category: 'شوكي وصحراوي',
    region: 'سهول تهامة ومنحدرات جبال جازان وعسير، السعودية',
    floralSource: 'أشجار السمر البرية (Acacia tortilis)',
    colorName: 'أسود داكن مائل للاحمرار كالعقيق',
    colorHex: '#3D1B07',
    texture: 'متوسط اللزوجة، سلس وسهل الامتصاص',
    tasteNotes: 'نكهة مدخنة عطرية غنية جداً، طعم أصيل يشهد لرحيق شوك السمر الأصيل',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 310, originalPrice: 350, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 170, originalPrice: 195, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 95, inStock: true }
    ],
    labSpecs: {
      sucrose: '1.1%',
      diastase: '16.5 وحدة إنزيمية',
      moisture: '16.8%',
      hmf: '7.0 ملغ/كغ',
      purity: '100% نقي مفحوص ومعتمد'
    },
    healthBenefits: [
      'مكافحة فقر الدم والأنيميا لاحتوائه على أعلى نسب الحديد الطبيعي',
      'تقوية جدار المعدة والمساعدة في علاج جرثومة المعدة وقرحة الاثني عشر',
      'تنشيط وظائف الكبد وطرد السموم الحيوية',
      'مضاد أكسدة قوي يحمي خلايا الجسم'
    ],
    bestFor: ['المعدة', 'فقر الدم', 'المناعة', 'الرياضيين'],
    usageInstructions: 'ملعقة قبل الوجبات بنصف ساعة يومياً، أو مع حليب دافئ في الصباح.',
    harvestSeason: 'موسم الصيف (مايو - يونيو)',
    badge: 'الأعلى بالحديد',
    image: '/src/assets/images/product_sidr_honey_jar_1793479796584.jpg',
    rating: 4.89,
    reviewsCount: 94,
    labCertificateNumber: 'SASO-CERT-2026-SM8834'
  },
  {
    id: 'majra-abyad',
    name: 'عسل المجرى الأبيض الثلجي النادر',
    tagline: 'درة الأعسال السعودية النادرة وقوامه قشدي زبدي كالثلج',
    category: 'نادر',
    region: 'أعالي قمم جبال فيفاء ورجال ألمع (فوق 2500 متر)، عسير',
    floralSource: 'شجيرات زهرة المجرى الجبلية البيضاء النادرة',
    colorName: 'أبيض ثلجي عاجي متبلور طبيعياً',
    colorHex: '#EAE5D8',
    texture: 'قشدي ناعم جداً يشبه الزبدة المدهونة، تبلور طبيعي فاخر',
    tasteNotes: 'نكهة زهرية أرستقراطية خفيفة، تذوب في الفم بنعومة متناهية وحلاوة حريرية',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 490, originalPrice: 550, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 265, originalPrice: 295, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 145, inStock: true }
    ],
    labSpecs: {
      sucrose: '0.8%',
      diastase: '17.2 وحدة إنزيمية نادرة',
      moisture: '15.2% (جفاف ونقاء فائق)',
      hmf: '3.9 ملغ/كغ (نقاء جبلي غير مسبوق)',
      purity: '100% طبيعي خام غير مفلتر حرارياً'
    },
    healthBenefits: [
      'مقوي عام فوري للرياضيين والباحثين عن طاقة سريعة بدون إرهاق البنكرياس',
      'مهدئ عصبي ممتاز يساعد على النوم العميق والاسترخاء',
      'ترميم أنسجة الحلق والأوتار الصوتية لمن يستخدمون أصواتهم بكثرة',
      'مغذي فائق للبشرة ومقاومة علامات التقدم بالسن'
    ],
    bestFor: ['الطاقة', 'الرياضيين', 'هدايا فاخرة', 'الأطفال'],
    usageInstructions: 'ملعقة صغيرة تترك لتذوب تحت اللسان صباحاً، أو تؤكل دهناً مع التوست الصحي.',
    harvestSeason: 'موسم ربيعي نادر ومحدود جداً (أبريل فقط)',
    badge: 'نادر ومحدود الكمية',
    image: '/src/assets/images/hero_honey_boutique_1793479795301.jpg',
    rating: 4.98,
    reviewsCount: 67,
    labCertificateNumber: 'SASO-CERT-2026-MJ0105'
  },
  {
    id: 'qatad-baladi',
    name: 'عسل القتاد البري الصافي',
    tagline: 'عسل الحجاز الشوكي الخفيف اللطيف على المعدة',
    category: 'شوكي وصحراوي',
    region: 'مرتفعات المدينة المنورة وجبال الحجاز الغربية، السعودية',
    floralSource: 'شوك القتاد البري الحجازي (Astragalus)',
    colorName: 'عنبري فاتح شفاف ذهبي',
    colorHex: '#D69E3D',
    texture: 'متوسط السيولة خفيف الانسياب',
    tasteNotes: 'نكهة رقيقة لطيفة جداً لا تحرق الحلق، مناسب للأطفال ومن لا يحبون الطعم اللاذع',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 280, originalPrice: 320, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 155, originalPrice: 175, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 85, inStock: true }
    ],
    labSpecs: {
      sucrose: '1.2%',
      diastase: '13.9 وحدة',
      moisture: '16.5%',
      hmf: '6.5 ملغ/كغ',
      purity: '100% طبيعي خام'
    },
    healthBenefits: [
      'أخف أنواع العسل على الإطلاق لمرضى قرحة المعدة والارتجاع المريئي',
      'مثالي للأطفال لسهولة تقبل طعمه وقوامه الخفيف',
      'تنشيط الجهاز البولي وتطهير المسالك',
      'تخفيف التوتر وتحسين المزاج'
    ],
    bestFor: ['المعدة', 'الأطفال', 'المناعة'],
    usageInstructions: 'ملعقة في الصباح وملعقة في المساء مع كوب ماء معتدل الحرارة.',
    harvestSeason: 'أواخر الربيع وبداية الصيف',
    badge: 'الألطف على المعدة',
    image: '/src/assets/images/product_sidr_honey_jar_1793479796584.jpg',
    rating: 4.88,
    reviewsCount: 81,
    labCertificateNumber: 'SASO-CERT-2026-QT5512'
  },
  {
    id: 'dhahyan-sarawat',
    name: 'عسل الضهيان الجبلي الشوكي',
    tagline: 'من غابات الباحة وجبال السروات الشاهقة',
    category: 'جبلي',
    region: 'غابات رغدان ومرتفعات منطقة الباحة، السعودية',
    floralSource: 'أشجار الضهيان الجبلية الشوكية (Acacia asak)',
    colorName: 'أصفر كهرماني برّاق',
    colorHex: '#C58F28',
    texture: 'متماسك وله قوام ناعم سريع الذوبان',
    tasteNotes: 'رائحة زكية فواحة تملأ الغرفة عند فتح البرطمان، حلاوة ممتازة خفيفة',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 295, originalPrice: 330, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 165, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 90, inStock: true }
    ],
    labSpecs: {
      sucrose: '1.3%',
      diastase: '14.8 وحدة',
      moisture: '16.3%',
      hmf: '5.9 ملغ/كغ',
      purity: '100% جبلي بلدي أصيل'
    },
    healthBenefits: [
      'تخفيف آلام المفاصل والروماتيزم لاحتوائه على مركبات مضادة للالتهاب',
      'تعزيز مناعة الصغار والكبار ضد تقلبات الطقس الموسمية',
      'تحسين كفاءة التنفس وتنقية الرئتين',
      'مصدر ممتاز لمضادات الأكسدة الفينولية'
    ],
    bestFor: ['المناعة', 'كبار السن', 'الصدر'],
    usageInstructions: 'ملعقة كبيرة يومياً على الريق، مفيدة جداً عند تناولها مع 7 حبات من حبة البركة.',
    harvestSeason: 'موسم الصيف الجبلي',
    badge: 'عطر جبلي فواح',
    image: '/src/assets/images/hero_honey_boutique_1793479795301.jpg',
    rating: 4.87,
    reviewsCount: 53,
    labCertificateNumber: 'SASO-CERT-2026-DH3219'
  },
  {
    id: 'habba-sawda',
    name: 'عسل حبة البركة الطبيعي الأصلي',
    tagline: 'رحيق أزهار الحبة السوداء - درع المناعة النبوي',
    category: 'زهور وأعشاب',
    region: 'مزارع أزهار حبة البركة المعتمدة بالمملكة',
    floralSource: 'أزهار نبات الحبة السوداء (Nigella sativa)',
    colorName: 'بني داكن عسلي مشرق',
    colorHex: '#522E15',
    texture: 'لزج غني الملمس',
    tasteNotes: 'نكهة خاصة خفيفة من زيت الحبة السوداء العطري مع حلاوة زهرية دافئة',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 250, originalPrice: 290, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 140, originalPrice: 160, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 80, inStock: true }
    ],
    labSpecs: {
      sucrose: '1.0%',
      diastase: '15.1 وحدة',
      moisture: '16.7%',
      hmf: '6.8 ملغ/كغ',
      purity: '100% طبيعي خام غير مخلوط'
    },
    healthBenefits: [
      'درع مناعي وقائي شامل ضد الفيروسات والعدوى البكتيرية',
      'تخفيف أعراض الحساسية والربو الموسمي بفضل الثيموكينون الطبيعي',
      'مفيد جداً لصحة البروستاتا والجهاز البولي',
      'تحفيز نمو خلايا الدم البيضاء وتعزيز صحة القلب'
    ],
    bestFor: ['المناعة', 'الصدر', 'كبار السن', 'الرياضيين'],
    usageInstructions: 'ملعقة صباحاً ومساءً، أو ملعقة مذابة في كوب حليب نوق أو حليب لوز دافئ.',
    harvestSeason: 'موسم الربيع المتأخر',
    badge: 'درع المناعة',
    image: '/src/assets/images/product_sidr_honey_jar_1793479796584.jpg',
    rating: 4.91,
    reviewsCount: 76,
    labCertificateNumber: 'SASO-CERT-2026-HB7741'
  },
  {
    id: 'kina-spring',
    name: 'عسل الكينا والزهور البرية الشمالية',
    tagline: 'مستخلص من أشجار الكينا وربيع شمال المملكة',
    category: 'زهور وأعشاب',
    region: 'مناطق الجوف وتبوك والشمال، السعودية',
    floralSource: 'أشجار الكينا (Eucalyptus) وأزهار النفل والخزامى البرية',
    colorName: 'ذهبي عنبري فاتح دافئ',
    colorHex: '#C98C2C',
    texture: 'سائل مخملي خفيف وسلس',
    tasteNotes: 'نكهة منتعشة تشبه المنثول الخفيف والأوكالبتوس تفتح المجاري التنفسية بلطف',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 210, originalPrice: 245, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 120, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 70, inStock: true }
    ],
    labSpecs: {
      sucrose: '1.5%',
      diastase: '13.5 وحدة',
      moisture: '17.1%',
      hmf: '6.9 ملغ/كغ',
      purity: '100% طبيعي بري'
    },
    healthBenefits: [
      'فتح الجيوب الأنفية وتخفيف احتقان الحلق والصوت المخنوق',
      'طارد طبيعي للبلغم ومهدئ لنوبات الكحة الليلية',
      'عسل يومي عائلي ممتاز للتحلية الصحية للشاي والمشروبات',
      'غني بالفيتامينات المنشطة للجسم'
    ],
    bestFor: ['الصدر', 'الأطفال', 'المناعة'],
    usageInstructions: 'ملعقة مع شاي الزنجبيل أو النعناع الدافئ عند الشعور باحتقان الحلق أو الكحة.',
    harvestSeason: 'موسم الربيع الشمالي (مارس - أبريل)',
    badge: 'لإنعاش التنفس',
    image: '/src/assets/images/hero_honey_boutique_1793479795301.jpg',
    rating: 4.85,
    reviewsCount: 62,
    labCertificateNumber: 'SASO-CERT-2026-KN2390'
  },
  {
    id: 'sidr-peshawari',
    name: 'عسل السدر البشاوري الملكي (درجة أولى)',
    tagline: 'سدر صافي من جبال ووديان وادي السوات بشهادة فحص كاملة',
    category: 'جبلي',
    region: 'وديان بشاور الجبلية الوعرة، مستورد درجة أولى',
    floralSource: 'أشجار السدر الجبلي المعمرة البرية',
    colorName: 'عنبري ذهبي مائل للاحمرار',
    colorHex: '#9E5B1A',
    texture: 'كثيف متبلور جزئياً لزوجة عالية',
    tasteNotes: 'نكهة سدر عميقة، طعم تقليدي مميز يفضله محبو السدر بتكلفة اقتصادية منافسة',
    sizes: [
      { weight: '1 كجم (1000 جم)', weightGrams: 1000, price: 195, originalPrice: 230, inStock: true },
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 110, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 65, inStock: true }
    ],
    labSpecs: {
      sucrose: '1.7%',
      diastase: '12.8 وحدة',
      moisture: '17.3%',
      hmf: '8.4 ملغ/كغ',
      purity: '100% سدر طبيعي مفحوص SASO'
    },
    healthBenefits: [
      'طاقة بدنية وجنسية طبيعية للرجال والنساء',
      'دعم الجهاز الهضمي والوقاية من حموضة المعدة',
      'خيار اقتصادي ممتاز للاستهلاك اليومي العائلي المستمر'
    ],
    bestFor: ['الطاقة', 'المناعة', 'كبار السن'],
    usageInstructions: 'ملعقتان يومياً مع الفطور والعشاء.',
    harvestSeason: 'موسم السدر الخريفي',
    badge: 'أفضل قيمة مقابل السعر',
    image: '/src/assets/images/product_sidr_honey_jar_1793479796584.jpg',
    rating: 4.82,
    reviewsCount: 119,
    labCertificateNumber: 'SASO-CERT-2026-SP1904'
  },
  {
    id: 'manuka-umf20',
    name: 'عسل المانوكا النيوزيلندي الخام UMF 20+ / MGO 850+',
    tagline: 'أقوى تركيز علاجي ومضاد للبكتيريا الشديدة معتمد من منظمة UMFHA',
    category: 'علاجي معتمد',
    region: 'غابات المانوكا البرية المحمية، نيوزيلندا',
    floralSource: 'شجيرات المانوكا البرية (Leptospermum scoparium)',
    colorName: 'كراميل داكن غير شفاف',
    colorHex: '#7C4A1E',
    texture: 'كريمي ثقيل جداً غير مصفى',
    tasteNotes: 'طعم ترابي طبيعي مع نكهة عشبية طبية مميزة وحلاوة عميقة معقدة',
    sizes: [
      { weight: 'نصف كجم (500 جم)', weightGrams: 500, price: 480, originalPrice: 540, inStock: true },
      { weight: 'ربع كجم (250 جم)', weightGrams: 250, price: 270, inStock: true }
    ],
    labSpecs: {
      sucrose: '0.6%',
      diastase: '18.4 وحدة',
      moisture: '16.0%',
      hmf: '11.2 ملغ/كغ',
      purity: 'شهادة UMF™ 20+ رسمية موثقة'
    },
    healthBenefits: [
      'أقوى مضاد طبيعي لجرثومة المعدة (Helicobacter pylori) والتهاب المعدة المزمن',
      'تسكين فوري لالتهاب الحلق الشديد والتقرحات الفموية المستعصية',
      'مكافحة بكتيريا الجلد المقاومة للمضادات الحيوية',
      'دعم ترميم القناة الهضمية ومتلازمة القولون العصبي'
    ],
    bestFor: ['المعدة', 'المناعة', 'الصدر'],
    usageInstructions: 'ملعقة صغيرة مباشرة بالفم بدون ماء صباحاً على معدة فارغة قبل الأكل بساعة.',
    harvestSeason: 'موسم الصيف النيوزيلندي',
    badge: 'تركيز علاجي فائق',
    image: '/src/assets/images/product_sidr_honey_jar_1793479796584.jpg',
    rating: 4.97,
    reviewsCount: 88,
    labCertificateNumber: 'UMFHA-CERT-2026-NZ850'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'أبو فهد العتيبي',
    customerTitle: 'متقاعد وإمام مسجد سابق',
    customerAge: 56,
    city: 'الرياض (حي الملقا)',
    customerSpecs: 'عمره 56 سنة، متقاعد، يعاني منذ 4 سنوات من حساسية الصدر، البلغم الصباحي، وبداية ارتفاع في السكر التراكمي.',
    customerGoal: 'البحث عن عسل نقي للصدر والسعال لا يرفع السكر بدرجة حادة ويكون بديلاً طبيعياً للبخاخات الكيميائية.',
    honeyPurchased: 'عسل الطلح الحائلي البري (1 كجم) + عسل السدر البلدي (نصف كجم)',
    honeyId: 'talh-hail',
    avatar: '/src/assets/images/customer_abu_fahad_1793479796852.jpg',
    rating: 5,
    date: 'قبل 4 أيام',
    comment: 'أشهد بالله أمام الله أن هذا العسل من أصدق ما تذوقت في حياتي. عسل الطلح الحائلي الذي أرسلته الأخت حنان فيه لدغة الطلح الأصلية التي نعرفها من أيام أجدادنا. أتناوله كل فجر مع نصف كوب ماء دافئ، الكحة التي كانت تقطع نومي اختفت تماماً بعد 10 أيام، وفحص السكر عندي ممتاز وثابت بفضل الله.',
    healthImpact: 'انحسار نوبات السعال بنسبة 90%، تنفس هادئ وعميق طوال الليل، وتحسن مؤشرات النشاط اليومي.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    customerName: 'د. سارة آل الشيخ',
    customerTitle: 'استشارية تغذية علاجية وباحثة إكلينيكية',
    customerAge: 38,
    city: 'جدة (حي الروضة)',
    customerSpecs: 'طبيبة وأم لطفلين (5 و 8 سنوات)، دقيقة جداً في مواصفات الأغذية الطبيعية وتفحص شهادات المختبر والسكروز قبل الشراء.',
    customerGoal: 'عسل أصلي غير مبستر لعلاج حموضة المعدة لزوجها، وبديل صحي للسكر ومقوي لمناعة أطفالها في المدرسة.',
    honeyPurchased: 'عسل المجرى الأبيض النادر (500 جم) + عسل حبة البركة (1 كجم)',
    honeyId: 'majra-abyad',
    avatar: '/src/assets/images/customer_dr_sara_1793479797811.jpg',
    rating: 5,
    date: 'قبل أسبوع',
    comment: 'بصفتي أخصائية تغذية، قمت بأخذ عينة من عسل المجرى الأبيض وعسل حبة البركة إلى أحد المختبرات الخاصة المعتمدة للتأكد شخصياً من نسبة HMF ونشاط إنزيم الدياستيز والسكروز. النتائج جاءت مطابقة تماماً لما نشرته حنان، وهو عسل نيء خام (Raw Honey) غير متعرض لأي تسخين تجاري مدمر للإنزيمات. أطفالي يحبون قوام المجرى الأبيض الكريمي مع الفطور.',
    healthImpact: 'رفع مناعة طفليها وانقطاع نزلات البرد المدرسية المتكررة، مع راحة تامة من حموضة المعدة.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    customerName: 'فيصل الشمري',
    customerTitle: 'مدرب لياقة بدنية وبطل كروس فيت',
    customerAge: 31,
    city: 'الرياض (حي الصحافة)',
    customerSpecs: 'رياضي محترف 31 سنة، يتدرب مرتين يومياً، يبحث عن طاقة نظيفة بدون كافيين صناعي أو سكريات مكررة تهبط الإنسولين.',
    customerGoal: 'مصدر طاقة سريع قبل التمارين الصباحية، وتسريع استشفاء الألياف العضلية وتخفيف التهابات المفاصل بعد رفع الأوزان.',
    honeyPurchased: 'عسل السدر الجبلي البلدي (1 كجم) + عسل السمر البلدي عالي الحديد',
    honeyId: 'sidr-baladi',
    avatar: '/src/assets/images/customer_faisal_athlete_1793479820641.jpg',
    rating: 5,
    date: 'قبل أسبوعين',
    comment: 'العسل البلدي من متجر حنان صار عنصراً أساسياً في تحضيري الرياضي اليومي. آخذ ملعقة عسل سدر قبل التمرين الصباحي مع ماء ورشة ملح هيمالايا، تعطيني باور طبيعي مستقر لساعتين بدون دروب. وعسل السمر الأسود الغني بالحديد حسن عندي الاستشفاء العضلي وتلاشى التعب المجهد بعد الجلسات القوية.',
    healthImpact: 'تحسن ملحوظ في قوة التحمل العضلي وسرعة الاستشفاء، وارتفاع مستوى مخزون الحديد في الدم.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    customerName: 'أم عبد العزيز الحارثي',
    customerTitle: 'معلمة تربوية وأم لثلاثة أبناء',
    customerAge: 46,
    city: 'مكة المكرمة (العزيزية)',
    customerSpecs: 'سيدة 46 سنة، كانت تعاني من جرثومة المعدة والتهاب الاثني عشر مع صعوبة في هضم الأطعمة ونقص في الشهية.',
    customerGoal: 'القضاء على جرثومة المعدة بأسلوب علاجي طبيعي معتمد ودعم الجهاز الهضمي.',
    honeyPurchased: 'عسل المانوكا UMF 20+ (500 جم) + عسل القتاد البري الصافي',
    honeyId: 'manuka-umf20',
    avatar: '/src/assets/images/customer_dr_sara_1793479797811.jpg',
    rating: 5,
    date: 'قبل 18 يوماً',
    comment: 'والله الذي لا إله إلا هو لقد كانت آلام المعدة تنغص علي يومي ودوامي في المدرسة. نصحتني حنان بتناول ملعقة صغيرة من المانوكا UMF 20+ صباحاً على الريق بدون ماء وعسل القتاد مساءً. خلال 3 أسابيع أجريت فحص النفخ لجرثومة المعدة والنتيجة سلبية بفضل الله! التغليف والتوصيل كان مبرداً وفاخراً.',
    healthImpact: 'شفاء تام من أعراض جرثومة المعدة، عودة الشهية الطبيعية، واختفاء الانتفاخات وحرقة الصدر.',
    verifiedPurchase: true
  },
  {
    id: 'rev-5',
    customerName: 'المهندس خالد القحطاني',
    customerTitle: 'مهندس مشاريع صناعية',
    customerAge: 43,
    city: 'الدمام (حي الشاطئ)',
    customerSpecs: 'مهندس 43 سنة، يعمل ساعات طويلة تحت ضغط ذهني عالي، يبحث عن هدايا فاخرة للأعياد وتغذية صحية لمنزله.',
    customerGoal: 'الحصول على بكج الأعسال السعودية الأصيلة الموثقة لتقديمها كإهداء فاخر للوالدين ولضيوفه.',
    honeyPurchased: 'بكج الثلاثي الملكي (سدر بلدي + مجرى أبيض + سمر تهامة)',
    honeyId: 'sidr-baladi',
    avatar: '/src/assets/images/customer_abu_fahad_1793479796852.jpg',
    rating: 5,
    date: 'قبل شهر',
    comment: 'البكج وصلني في بوكس خشبي فاخر عليه شعار المتجر ومعه ملاعق خشبية خاصة وشهادات الفحص من هيئة الغذاء والدواء. أهديت الوالد والوالدة سدر وسمر، وسعدوا به كثيراً وقال الوالد: "هذا ريحة عسل الجبال التي افتقدناها منذ سنين". أسعار حنان هي الأسعار الحقيقية العادلة بدون المبالغات الجنونية التي نراها بالمحلات.',
    healthImpact: 'رضا تام وراحة بال، ثبات وجودة العسل في كل شحنة تطلبها العائلة.',
    verifiedPurchase: true
  }
];

export const SAUDI_CITIES = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الظهران',
  'أبها',
  'خميس مشيط',
  'الطائف',
  'حائل',
  'بريدة',
  'عنيزة',
  'تبوك',
  'جازان',
  'نجران',
  'الباحة',
  'ينبع',
  'الجبيل',
  'حفر الباطن',
  'الهفوف / الأحساء'
];
