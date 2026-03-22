// ============================================
// Muslim Kids VP — Full Interactive Prototype
// app.js — Complete with all features (v2)
// ============================================

// ===== CONTENT DATA =====
const CATEGORIES = [
  { id: 'quran-stories', name: 'Quran Stories', nameAr: 'قصص القرآن', icon: '📖', bg: 'var(--catQuran)' },
  { id: 'prayer', name: 'Prayer & Ibadah', nameAr: 'الصلاة والعبادة', icon: '🤲', bg: 'var(--catPrayer)' },
  { id: 'nasheeds', name: 'Nasheeds', nameAr: 'أناشيد', icon: '🎵', bg: 'var(--catNasheed)' },
  { id: 'virtues', name: 'Good Virtues', nameAr: 'الأخلاق الحسنة', icon: '⭐', bg: 'var(--catVirtue)' },
  { id: 'prophets', name: 'Prophet Stories', nameAr: 'قصص الأنبياء', icon: '🌙', bg: 'var(--catProphet)' },
  { id: 'manners', name: 'Manners & Adab', nameAr: 'الآداب', icon: '🤝', bg: 'var(--catManner)' },
  { id: 'quran-learning', name: 'Quran Learning', nameAr: 'تعلم القرآن', icon: '📚', bg: 'var(--catLearn)' },
];

const TAGS = [
  { id: 'prayer', nameAr: 'الصلاة', nameEn: 'Prayer', icon: '🤲' },
  { id: 'prophets', nameAr: 'قصص الأنبياء', nameEn: 'Prophet Stories', icon: '📖' },
  { id: 'honesty', nameAr: 'الأمانة', nameEn: 'Honesty', icon: '⭐' },
  { id: 'mercy', nameAr: 'الرحمة', nameEn: 'Mercy', icon: '❤️' },
  { id: 'cooperation', nameAr: 'التعاون', nameEn: 'Cooperation', icon: '🤝' },
  { id: 'ramadan', nameAr: 'رمضان', nameEn: 'Ramadan', icon: '🌙' },
  { id: 'quran', nameAr: 'القرآن', nameEn: 'Quran', icon: '📚' },
  { id: 'mosque', nameAr: 'المسجد', nameEn: 'Mosque', icon: '🕌' },
  { id: 'hajj', nameAr: 'الحج', nameEn: 'Hajj', icon: '🕋' },
  { id: 'nasheed', nameAr: 'أناشيد', nameEn: 'Nasheeds', icon: '🎵' },
  { id: 'manners', nameAr: 'الآداب', nameEn: 'Manners', icon: '🫱🏽‍🫲🏾' },
  { id: 'arabic', nameAr: 'العربية', nameEn: 'Arabic', icon: '🔤' },
];

const VIDEOS = [
  { id: 1, title: 'Prophet Muhammad (SAW) - Quran Stories', titleAr: 'قصة يوسف عليه السلام', duration: '12:30', channel: 'Stories of the Prophets', category: 'quran-stories', tags: ['quran', 'prophets'], icon: '🕌', grad: ['#1A5A2A', '#0D3518'], ageGroups: ['3-5','6-8','9-11','12-14'], ytId: 'ZstvujjkTyw' },
  { id: 2, title: 'Stories from the Quran - Episode 1', titleAr: 'نوح عليه السلام والطوفان', duration: '10:15', channel: 'Stories of the Prophets', category: 'quran-stories', tags: ['quran', 'prophets'], icon: '🌊', grad: ['#1A3A5A', '#0D1835'], ageGroups: ['3-5','6-8','9-11'], ytId: 'D2Zrib7-iBU' },
  { id: 3, title: 'Stories from the Quran - Episode 2', titleAr: 'إبراهيم يحطم الأصنام', duration: '8:45', channel: 'Stories of the Prophets', category: 'quran-stories', tags: ['quran', 'prophets'], icon: '⭐', grad: ['#5A3A1A', '#352008'], ageGroups: ['6-8','9-11','12-14'], ytId: 'XyMVBBH2-Oc' },
  { id: 4, title: 'Stories from the Quran - Episode 3', titleAr: 'موسى وفرعون', duration: '11:20', channel: 'Stories of the Prophets', category: 'quran-stories', tags: ['quran', 'prophets'], icon: '🌟', grad: ['#3A1A5A', '#200D35'], ageGroups: ['6-8','9-11','12-14'], ytId: 'R47oUhyzLLg' },
  { id: 5, title: 'Stories from the Quran - Episode 4', titleAr: 'أصحاب الكهف', duration: '9:50', channel: 'Stories of the Prophets', category: 'quran-stories', tags: ['quran'], icon: '🏔️', grad: ['#2A4A3A', '#1A3025'], ageGroups: ['9-11','12-14'], ytId: 'gC51HXivhj0' },
  { id: 6, title: 'Stories from the Quran - Episode 5', titleAr: 'سليمان عليه السلام والنمل', duration: '7:30', channel: 'Stories of the Prophets', category: 'quran-stories', tags: ['quran', 'prophets'], icon: '🐜', grad: ['#4A3A1A', '#302508'], ageGroups: ['3-5','6-8'], ytId: '7xP4t3YPvoI' },
  { id: 7, title: 'Sadaqah & Masjid - Omar & Hana', titleAr: 'الصدقة والمسجد', duration: '5:20', channel: 'Omar & Hana', category: 'prayer', tags: ['prayer', 'mosque'], icon: '🤲', grad: ['#1A4A3A', '#0D3025'], ageGroups: ['3-5','6-8','9-11','12-14'], ytId: 'OChrf697JFc' },
  { id: 8, title: 'Ramadan Mubarak - Omar & Hana', titleAr: 'رمضان مبارك', duration: '4:10', channel: 'Omar & Hana', category: 'prayer', tags: ['prayer', 'ramadan'], icon: '💧', grad: ['#1A3A4A', '#0D2530'], ageGroups: ['3-5','6-8'], ytId: '6hSL9PachJM' },
  { id: 9, title: 'Learn About Ramadan With Zaky', titleAr: 'تعلم عن رمضان مع زكي', duration: '5:45', channel: 'One4Kids', category: 'prayer', tags: ['prayer', 'ramadan'], icon: '🕌', grad: ['#2A5A3A', '#1A3A25'], ageGroups: ['6-8','9-11'], ytId: 'ASFNHFlC2_w' },
  { id: 10, title: 'Fasting in Ramadan - Assalamualaikum Iman', titleAr: 'ما هو رمضان؟', duration: '6:30', channel: 'One4Kids', category: 'prayer', tags: ['prayer', 'ramadan'], icon: '🌙', grad: ['#1A1A4A', '#0D0D35'], ageGroups: ['3-5','6-8','9-11','12-14'], ytId: 'y9oxZ0kx_vg' },
  { id: 11, title: 'Ramadan Is Coming - Islamic Songs', titleAr: 'رمضان قادم', duration: '8:15', channel: 'One4Kids', category: 'prayer', tags: ['prayer', 'ramadan'], icon: '🕋', grad: ['#3A2A1A', '#251A0D'], ageGroups: ['6-8','9-11','12-14'], ytId: '3mU9NSg4doA' },
  { id: 12, title: 'The Night of Decree - Omar & Hana', titleAr: 'ليلة القدر', duration: '5:00', channel: 'Omar & Hana', category: 'prayer', tags: ['prayer', 'ramadan'], icon: '🏛️', grad: ['#1A3A2A', '#0D2518'], ageGroups: ['6-8','9-11','12-14'], ytId: 'kXoavI6N_h0' },
  { id: 13, title: 'Family Song - Omar & Hana', titleAr: 'بسم الله - نشيد', duration: '3:45', channel: 'Omar & Hana', category: 'nasheeds', tags: ['nasheed'], icon: '🎵', grad: ['#3A1A4A', '#250D35'], ageGroups: ['3-5','6-8','9-11'], ytId: 'E7jNgIMznJU' },
  { id: 14, title: 'Ramadan Moon - Kazwa & Bilal ft Zaky', titleAr: 'هلال رمضان', duration: '8:20', channel: 'One4Kids', category: 'nasheeds', tags: ['nasheed', 'ramadan'], icon: '✨', grad: ['#4A3A1A', '#352A0D'], ageGroups: ['3-5','6-8','9-11','12-14'], ytId: '9EPUvG9_4xw' },
  { id: 15, title: 'Thank You Allah for Ramadan - Omar & Hana', titleAr: 'شكراً يا الله على رمضان', duration: '3:10', channel: 'Omar & Hana', category: 'nasheeds', tags: ['nasheed', 'ramadan'], icon: '🌝', grad: ['#2A2A4A', '#1A1A35'], ageGroups: ['3-5','6-8','9-11'], ytId: 'LdL1p8hQBTg' },
  { id: 16, title: 'Lofi Dhikr - Peaceful Remembrance', titleAr: 'ذكر الله', duration: '60:00', channel: 'FreeQuranEducation', category: 'nasheeds', tags: ['nasheed', 'quran'], icon: '🎶', grad: ['#1A4A4A', '#0D3535'], ageGroups: ['3-5','6-8','9-11','12-14'], ytId: 'bH1z923vulk' },
  { id: 17, title: 'Lofi Juz Amma - Deep Focus & Peace', titleAr: 'جزء عم', duration: '60:00', channel: 'FreeQuranEducation', category: 'nasheeds', tags: ['nasheed', 'quran'], icon: '🔤', grad: ['#4A1A3A', '#350D25'], ageGroups: ['3-5','6-8'], ytId: 'vRgJRXaoSGw' },
  { id: 18, title: 'Sign of a Strong Faith', titleAr: 'أهمية الصدق في الإسلام', duration: '5:30', channel: 'FreeQuranEducation', category: 'virtues', tags: ['honesty', 'manners'], icon: '💎', grad: ['#1A4A5A', '#0D3545'], ageGroups: ['6-8','9-11','12-14'], ytId: 'HeQsbDX-ePg' },
  { id: 19, title: 'Blessings Never Miss Their Way', titleAr: 'المشاركة والكرم - الصدقة', duration: '4:45', channel: 'FreeQuranEducation', category: 'virtues', tags: ['cooperation'], icon: '🎁', grad: ['#3A4A1A', '#25300D'], ageGroups: ['3-5','6-8','9-11'], ytId: 'nY8rerwt6Hw' },
  { id: 20, title: "Let's Be Patient While Fasting - Omar & Hana", titleAr: 'الصبر - خلق جميل', duration: '5:15', channel: 'Omar & Hana', category: 'virtues', tags: ['honesty', 'ramadan'], icon: '🌿', grad: ['#2A3A2A', '#1A251A'], ageGroups: ['6-8','9-11','12-14'], ytId: 'uauhFFbaXQ0' },
  { id: 21, title: 'A Most Awaited Night - Omar & Hana', titleAr: 'أكثر ليلة منتظرة', duration: '4:00', channel: 'Omar & Hana', category: 'virtues', tags: ['prayer'], icon: '🙏', grad: ['#3A2A3A', '#251A25'], ageGroups: ['3-5','6-8','9-11'], ytId: 'Gu7pYMLMnis' },
  { id: 22, title: 'The First Night of Ramadan - The Good Muslim', titleAr: 'العفو في الإسلام', duration: '5:40', channel: 'One4Kids', category: 'virtues', tags: ['mercy', 'ramadan'], icon: '🕊️', grad: ['#2A4A4A', '#1A3535'], ageGroups: ['9-11','12-14'], ytId: '6g5I9w8gdjs' },
  { id: 23, title: 'Prophet Muhammad (SAW) - Part 1', titleAr: 'حياة النبي محمد ﷺ', duration: '15:00', channel: 'Stories of the Prophets', category: 'prophets', tags: ['prophets'], icon: '🌟', grad: ['#3A3A1A', '#25250D'], ageGroups: ['6-8','9-11','12-14'], ytId: 'Q9m4GWDgJXQ' },
  { id: 24, title: 'Prophet Muhammad (SAW) - Part 2', titleAr: 'لطف النبي محمد ﷺ', duration: '6:15', channel: 'Stories of the Prophets', category: 'prophets', tags: ['prophets', 'mercy'], icon: '💚', grad: ['#1A5A3A', '#0D4025'], ageGroups: ['3-5','6-8','9-11','12-14'], ytId: 'My1ffpNVJ9Y' },
  { id: 25, title: 'Story of Prophet Isa (AS)', titleAr: 'عيسى عليه السلام', duration: '9:30', channel: 'Stories of the Prophets', category: 'prophets', tags: ['prophets', 'quran'], icon: '🌍', grad: ['#2A3A4A', '#1A2535'], ageGroups: ['3-5','6-8','9-11'], ytId: 'lZcIWfymkjQ' },
  { id: 26, title: 'Complete Story of Prophet Muhammad (SAW)', titleAr: 'القصة الكاملة للنبي محمد ﷺ', duration: '8:45', channel: 'Stories of the Prophets', category: 'prophets', tags: ['prophets', 'quran'], icon: '☁️', grad: ['#3A4A4A', '#253535'], ageGroups: ['9-11','12-14'], ytId: 'mz_z2J7qy_0' },
  { id: 27, title: 'Prophet Muhammad (SAW) Stories', titleAr: 'داود عليه السلام وجالوت', duration: '7:20', channel: 'Stories of the Prophets', category: 'prophets', tags: ['prophets', 'quran'], icon: '⚔️', grad: ['#4A2A2A', '#351A1A'], ageGroups: ['6-8','9-11','12-14'], ytId: 'M1iLNL8Ol-Y' },
  { id: 28, title: 'Hurry Up Daddy!! - Omar & Hana', titleAr: 'أسرع يا أبي', duration: '4:05', channel: 'Omar & Hana', category: 'manners', tags: ['manners', 'cooperation'], icon: '🏘️', grad: ['#2A4A3A', '#1A3525'], ageGroups: ['3-5','6-8','9-11'], ytId: '1bqZyuKg6uM' },
  { id: 29, title: 'Calm Down Daddy - Omar & Hana', titleAr: 'اهدأ يا أبي', duration: '5:10', channel: 'Omar & Hana', category: 'manners', tags: ['manners'], icon: '👨‍👩‍👧‍👦', grad: ['#3A2A4A', '#251A35'], ageGroups: ['6-8','9-11','12-14'], ytId: 'Ghr03nUeU-0' },
  { id: 30, title: "Let's Do It!! - Omar & Hana", titleAr: 'هيا نفعلها', duration: '3:50', channel: 'Omar & Hana', category: 'manners', tags: ['manners'], icon: '🍽️', grad: ['#4A3A2A', '#35251A'], ageGroups: ['3-5','6-8'], ytId: 'kwhJIZQdU5o' },
  { id: 31, title: 'How I Miss My Parents - Omar & Hana', titleAr: 'كم أشتاق لوالدي', duration: '3:20', channel: 'Omar & Hana', category: 'manners', tags: ['manners'], icon: '👋', grad: ['#2A3A5A', '#1A2545'], ageGroups: ['3-5','6-8','9-11'], ytId: '8SGybAdaejs' },
  { id: 32, title: 'Little Ninjas - Omar & Hana', titleAr: 'النينجا الصغار', duration: '4:30', channel: 'Omar & Hana', category: 'manners', tags: ['manners', 'cooperation'], icon: '🤲', grad: ['#3A4A2A', '#25351A'], ageGroups: ['6-8','9-11','12-14'], ytId: '9jyLm3-cxng' },
  { id: 33, title: 'Quran Course in English - Introduction', titleAr: 'سورة الفاتحة', duration: '6:00', channel: 'FreeQuranEducation', category: 'quran-learning', tags: ['quran'], icon: '📖', grad: ['#1A3A3A', '#0D2525'], ageGroups: ['3-5','6-8','9-11','12-14'], ytId: 'rjJTHqrbD5Y' },
  { id: 34, title: 'Jannah with Subi & Fatima', titleAr: 'الجنة مع صبي وفاطمة', duration: '3:30', channel: 'One4Kids', category: 'quran-learning', tags: ['quran'], icon: '📕', grad: ['#3A1A2A', '#250D1A'], ageGroups: ['3-5','6-8','9-11'], ytId: 'Egex0oxAZ_E' },
  { id: 35, title: "I'm Best Muslim - Lighting Before Dawn", titleAr: 'أنا أفضل مسلم', duration: '8:00', channel: 'FreeQuranEducation', category: 'quran-learning', tags: ['arabic', 'quran'], icon: '🔤', grad: ['#2A2A3A', '#1A1A25'], ageGroups: ['3-5','6-8'], ytId: 'pzE9gkGG7HE' },
  { id: 36, title: '5 Islamic Scientists Kids Should Know', titleAr: 'خمسة علماء مسلمين', duration: '5:20', channel: 'Muslim Kids TV', category: 'quran-learning', tags: ['quran'], icon: '🪑', grad: ['#4A4A1A', '#35350D'], ageGroups: ['6-8','9-11','12-14'], ytId: 'AFJtoMutUB4' },
];

const PROFILES = [
  { id: 1, name: 'Yusuf', age: 7, ageGroup: '6-8', ageLabel: 'Explorer', initial: 'Y', grad: ['#52B788', '#2D6A4F'], watchTime: 1.2, videosWatched: 12, topicsCount: 5, themes: ['📖 Quran Stories', '🤲 Prayer', '⭐ Virtues'], dailyLimit: 60 },
  { id: 2, name: 'Amina', age: 5, ageGroup: '3-5', ageLabel: 'Little Star', initial: 'A', grad: ['#E8756A', '#C44D42'], watchTime: 0.8, videosWatched: 6, topicsCount: 3, themes: ['🎵 Nasheeds', '🤝 Manners'], dailyLimit: 45 },
  { id: 3, name: 'Omar', age: 10, ageGroup: '9-11', ageLabel: 'Scholar', initial: 'O', grad: ['#5BA3C9', '#3A7FA8'], watchTime: 0.5, videosWatched: 4, topicsCount: 2, themes: ['🌙 Prophets', '📚 Quran'], dailyLimit: 90 },
];

const AVATARS = [
  { icon: '🧒', grad: ['#52B788', '#2D6A4F'] },
  { icon: '👦', grad: ['#5BA3C9', '#3A7FA8'] },
  { icon: '👧', grad: ['#E8756A', '#C44D42'] },
  { icon: '🧒', grad: ['#8B7CC8', '#6A5AAD'] },
  { icon: '🧕', grad: ['#D4A843', '#A8832E'] },
  { icon: '👶', grad: ['#56C8D8', '#3AA8B8'] },
];

const THEMES = [
  { id: 'garden', name: 'Garden', icon: '🌿', swatch: '#1A3A2A' },
  { id: 'ocean', name: 'Ocean', icon: '🌊', swatch: '#132B4A' },
  { id: 'sunset', name: 'Sunset', icon: '🌅', swatch: '#4A1A1A' },
  { id: 'royal', name: 'Royal', icon: '👑', swatch: '#2A1A4A' },
  { id: 'candy', name: 'Candy', icon: '🍬', swatch: '#4A1A3A' },
  { id: 'sky', name: 'Sky', icon: '☁️', swatch: '#1A3A4A' },
];

const ONBOARDING_STEPS = [
  { icon: '🕌', title: 'Welcome to Muslim Kids VP', desc: 'A safe space for your children to explore Islamic content — curated videos aligned with your family\'s values.', type: 'standard' },
  { icon: '🔑', title: 'Sign-In Benefits', desc: 'Your account syncs profiles, watch history, and saved videos across devices. Your data stays private and secure.', type: 'standard' },
  { icon: '🔒', title: 'Parent PIN Protection', desc: 'You\'ll set a 4-digit PIN to secure the parent dashboard. Children stay in their safe zone and cannot exit without it.', type: 'standard' },
  { icon: '👶', title: 'Create First Profile', desc: 'Set up your first child\'s profile right here.', type: 'inline-profile' },
  { icon: '📺', title: 'About YouTube Ads', desc: 'Videos play via YouTube. Ads may appear and are outside our control. We\'re working to minimize this experience.', type: 'acknowledge' },
  { icon: '💝', title: 'Support This Project', desc: 'Muslim Kids VP is a community project. Consider a small donation to help us review more content and keep the app free.', type: 'donation' },
  { icon: '✨', title: 'You\'re All Set!', desc: 'Start exploring safe, enriching Islamic content. Bismillah — let\'s begin!', type: 'standard' },
];

const DAILY_DUAS = [
  { arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', english: 'In the name of Allah, the Most Gracious, the Most Merciful', context: 'Before starting anything' },
  { arabic: 'رَبِّ زِدْنِي عِلْمًا', english: 'My Lord, increase me in knowledge', context: 'Surah Taha 20:114' },
  { arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا', english: 'O Allah, I ask You for beneficial knowledge', context: 'Before learning' },
  { arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', english: 'Allah is sufficient for us, and He is the best Disposer of affairs', context: 'Surah Al-Imran 3:173' },
  { arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً', english: 'Our Lord, give us good in this world and good in the Hereafter', context: 'Surah Al-Baqarah 2:201' },
];

const SEARCH_SUGGESTIONS = [
  { en: 'Prophet Stories', ar: 'قصص الأنبياء' },
  { en: 'How to Pray', ar: 'كيف تصلي' },
  { en: 'Nasheeds', ar: 'أناشيد' },
  { en: 'Quran Learning', ar: 'تعلم القرآن' },
  { en: 'Ramadan', ar: 'رمضان' },
  { en: 'Good Manners', ar: 'الأخلاق الحسنة' },
  { en: 'Arabic Alphabet', ar: 'الحروف العربية' },
  { en: 'Wudu', ar: 'الوضوء' },
];

const REPORT_REASONS = [
  { en: 'Not Islamic content', ar: 'ليس محتوى إسلامي' },
  { en: 'Inappropriate for age group', ar: 'غير مناسب للفئة العمرية' },
  { en: 'Wrong age group classification', ar: 'تصنيف عمري خاطئ' },
  { en: 'Poor audio/video quality', ar: 'جودة صوت/فيديو ضعيفة' },
  { en: 'Contains ads/promotions', ar: 'يحتوي على إعلانات/ترويج' },
  { en: 'Other', ar: 'أخرى' },
];

// ===== TRANSLATIONS =====
const TR = {
  // App name & tagline
  'app_name': { en: 'Muslim Kids VP', ar: 'Muslim Kids VP' },
  'app_tagline': { en: 'Safe Islamic content for your children', ar: 'محتوى إسلامي آمن لأطفالك' },
  'proto_subtitle': { en: 'Interactive Prototype · Tap screens below or use the phone', ar: 'نموذج تفاعلي · انقر على الشاشات أدناه أو استخدم الهاتف' },

  // Sign in
  'signin_desc': { en: 'Safe, curated Islamic video content<br>for your children', ar: 'محتوى فيديو إسلامي آمن ومختار<br>لأطفالك' },
  'continue_apple': { en: 'Continue with Apple', ar: 'المتابعة مع Apple' },
  'continue_google': { en: 'Continue with Google', ar: 'المتابعة مع Google' },
  'try_guest': { en: 'Try as Guest', ar: 'تجربة كضيف' },
  'signin_terms': { en: 'By continuing you agree to our Terms of Service and Privacy Policy', ar: 'بالمتابعة أنت توافق على شروط الخدمة وسياسة الخصوصية' },

  // Profiles
  'whos_watching': { en: "Who's watching?", ar: 'مَن يشاهد؟' },
  'profiles': { en: 'Profiles', ar: 'الملفات الشخصية' },
  'add_profile': { en: 'Add Profile', ar: 'إضافة ملف' },
  'limit_reached': { en: 'Limit Reached', ar: 'تم بلوغ الحد' },
  'parent_dashboard': { en: 'Parent Dashboard', ar: 'لوحة تحكم الوالدين' },
  'age': { en: 'Age', ar: 'العمر' },

  // PIN
  'enter_pin': { en: 'Enter PIN', ar: 'أدخل رمز PIN' },
  'enter_4digit_pin': { en: 'Enter your 4-digit parent PIN', ar: 'أدخل رمز PIN المكوّن من 4 أرقام' },
  'create_pin': { en: 'Create Your PIN', ar: 'أنشئ رمز PIN' },
  'confirm_pin': { en: 'Confirm Your PIN', ar: 'أكّد رمز PIN' },
  'enter_current_pin': { en: 'Enter Current PIN', ar: 'أدخل رمز PIN الحالي' },
  'enter_existing_pin': { en: 'Enter your existing PIN first', ar: 'أدخل رمز PIN الحالي أولاً' },
  'enter_same_pin': { en: 'Enter the same PIN again', ar: 'أدخل نفس رمز PIN مرة أخرى' },
  'choose_4digit': { en: 'Choose a 4-digit PIN to protect the parent area', ar: 'اختر رمز PIN من 4 أرقام لحماية قسم الوالدين' },
  'pin_created': { en: '✓ PIN Created!', ar: '✓ تم إنشاء رمز PIN!' },
  'pin_unlocked': { en: '✓ Unlocked!', ar: '✓ تم الفتح!' },
  'pin_reset_done': { en: '✓ PIN Reset!', ar: '✓ تم إعادة تعيين PIN!' },
  'hint_1234': { en: 'Hint: Try 1234', ar: 'تلميح: جرّب 1234' },
  'forgot_pin': { en: 'Forgot PIN?', ar: 'نسيت رمز PIN؟' },
  'too_many_attempts': { en: 'Too many attempts', ar: 'محاولات كثيرة جداً' },
  'pins_dont_match': { en: "PINs don't match", ar: 'رموز PIN غير متطابقة' },
  'incorrect_pin': { en: 'Incorrect PIN', ar: 'رمز PIN غير صحيح' },
  'locked_30s': { en: 'Locked for 30 seconds', ar: 'مقفل لمدة 30 ثانية' },
  'pin_required': { en: 'Parent PIN Required', ar: 'مطلوب رمز PIN للوالدين' },
  'enter_pin_leave_child': { en: 'Enter PIN to leave child mode', ar: 'أدخل رمز PIN للخروج من وضع الطفل' },
  'cancel': { en: 'Cancel', ar: 'إلغاء' },
  'face_id_verified': { en: '✓ Face ID Verified!', ar: '✓ تم التحقق ببصمة الوجه!' },
  'biometric_disabled': { en: 'Biometric disabled', ar: 'المقاييس الحيوية معطّلة' },
  'verified_set_new': { en: 'Verified! Now set new PIN', ar: 'تم التحقق! عيّن رمز PIN جديداً' },
  'pin_created_toast': { en: 'PIN created!', ar: 'تم إنشاء رمز PIN!' },
  'create_new_pin': { en: 'Create New PIN', ar: 'أنشئ رمز PIN جديد' },
  'confirm_new_pin': { en: 'Confirm New PIN', ar: 'أكّد رمز PIN الجديد' },
  'choose_new_4digit': { en: 'Choose your new 4-digit PIN', ar: 'اختر رمز PIN الجديد المكوّن من 4 أرقام' },
  'pin_reset_success': { en: 'PIN reset successfully!', ar: 'تم إعادة تعيين PIN بنجاح!' },

  // Forgot PIN
  'forgot_pin_title': { en: 'Forgot PIN?', ar: 'نسيت رمز PIN؟' },
  'forgot_pin_desc': { en: "Enter the email address associated with your account. We'll send a reset link.", ar: 'أدخل البريد الإلكتروني المرتبط بحسابك. سنرسل رابط إعادة التعيين.' },
  'send_reset_link': { en: 'Send Reset Link', ar: 'إرسال رابط إعادة التعيين' },
  'back_to_pin': { en: '← Back to PIN Entry', ar: '← العودة لإدخال PIN' },
  'reset_link_sent': { en: 'Reset Link Sent!', ar: 'تم إرسال رابط إعادة التعيين!' },
  'check_email': { en: 'Check your email at', ar: 'تحقق من بريدك الإلكتروني على' },
  'click_link_reset': { en: '. Click the link to reset your PIN.', ar: '. انقر على الرابط لإعادة تعيين PIN.' },
  'verified_set_new_pin': { en: "I've Verified → Set New PIN", ar: 'تم التحقق → تعيين PIN جديد' },
  'didnt_receive': { en: "Didn't receive? Try again", ar: 'لم تستلم؟ حاول مرة أخرى' },
  'enter_valid_email': { en: 'Enter a valid email', ar: 'أدخل بريداً إلكترونياً صحيحاً' },

  // Force Update
  'update_required': { en: 'Update Required', ar: 'تحديث مطلوب' },
  'update_desc': { en: 'A new version of Muslim Kids VP is available. Please update to continue using the app.', ar: 'يتوفر إصدار جديد من Muslim Kids VP. يرجى التحديث لمتابعة استخدام التطبيق.' },
  'update_now': { en: 'Update Now', ar: 'تحديث الآن' },
  'redirecting_store': { en: 'Redirecting to App Store...', ar: 'جارٍ التحويل إلى متجر التطبيقات...' },

  // Onboarding
  'ob_welcome_title': { en: 'Welcome to Muslim Kids VP', ar: 'مرحباً بك في Muslim Kids VP' },
  'ob_welcome_desc': { en: "A safe space for your children to explore Islamic content — curated videos aligned with your family's values.", ar: 'مساحة آمنة لأطفالك لاستكشاف المحتوى الإسلامي — فيديوهات مختارة تتوافق مع قيم عائلتك.' },
  'ob_signin_title': { en: 'Sign-In Benefits', ar: 'مزايا تسجيل الدخول' },
  'ob_signin_desc': { en: 'Your account syncs profiles, watch history, and saved videos across devices. Your data stays private and secure.', ar: 'حسابك يزامن الملفات الشخصية وسجل المشاهدة والفيديوهات المحفوظة عبر الأجهزة. بياناتك تبقى خاصة وآمنة.' },
  'ob_pin_title': { en: 'Parent PIN Protection', ar: 'حماية رمز PIN للوالدين' },
  'ob_pin_desc': { en: "You'll set a 4-digit PIN to secure the parent dashboard. Children stay in their safe zone and cannot exit without it.", ar: 'ستعيّن رمز PIN من 4 أرقام لتأمين لوحة تحكم الوالدين. يبقى الأطفال في منطقتهم الآمنة ولا يمكنهم الخروج بدونه.' },
  'ob_profile_title': { en: 'Create First Profile', ar: 'إنشاء أول ملف شخصي' },
  'ob_profile_desc': { en: "Set up your first child's profile right here.", ar: 'أنشئ أول ملف شخصي لطفلك هنا.' },
  'ob_ads_title': { en: 'About YouTube Ads', ar: 'حول إعلانات YouTube' },
  'ob_ads_desc': { en: "Videos play via YouTube. Ads may appear and are outside our control. We're working to minimize this experience.", ar: 'تُعرض الفيديوهات عبر YouTube. قد تظهر إعلانات خارج سيطرتنا. نحن نعمل على تقليل هذه التجربة.' },
  'ob_support_title': { en: 'Support This Project', ar: 'ادعم هذا المشروع' },
  'ob_support_desc': { en: 'Muslim Kids VP is a community project. Consider a small donation to help us review more content and keep the app free.', ar: 'Muslim Kids VP مشروع مجتمعي. فكّر في تبرع صغير لمساعدتنا في مراجعة المزيد من المحتوى وإبقاء التطبيق مجانياً.' },
  'ob_done_title': { en: "You're All Set!", ar: 'أنت جاهز!' },
  'ob_done_desc': { en: "Start exploring safe, enriching Islamic content. Bismillah — let's begin!", ar: 'ابدأ باستكشاف محتوى إسلامي آمن ومثري. بسم الله — لنبدأ!' },
  'skip_all': { en: 'Skip All', ar: 'تخطي الكل' },
  'back': { en: 'Back', ar: 'رجوع' },
  'continue': { en: 'Continue', ar: 'متابعة' },
  'set_up_pin': { en: 'Set Up PIN', ar: 'إعداد رمز PIN' },
  'i_understand_ads': { en: 'I understand about YouTube ads', ar: 'أنا أفهم بخصوص إعلانات YouTube' },
  'support_the_app': { en: '💝 Support the App', ar: '💝 ادعم التطبيق' },
  'maybe_later': { en: 'Maybe Later', ar: 'ربما لاحقاً' },
  'jazakallah': { en: 'JazakAllahu Khairan!', ar: 'جزاك الله خيراً!' },

  // Profile creation/edit
  'create_profile': { en: 'Create Profile', ar: 'إنشاء ملف شخصي' },
  'edit_profile': { en: 'Edit Profile', ar: 'تعديل الملف الشخصي' },
  'choose_avatar': { en: 'Choose Avatar', ar: 'اختر الصورة الرمزية' },
  'avatar': { en: 'Avatar', ar: 'الصورة الرمزية' },
  'childs_name': { en: "Child's Name", ar: 'اسم الطفل' },
  'name': { en: 'Name', ar: 'الاسم' },
  'enter_name': { en: 'Enter name...', ar: 'أدخل الاسم...' },
  'childs_name_placeholder': { en: "Child's name...", ar: 'اسم الطفل...' },
  'age_group': { en: 'Age Group', ar: 'الفئة العمرية' },
  'preferred_language': { en: 'Preferred Language', ar: 'اللغة المفضلة' },
  'arabic': { en: 'Arabic', ar: 'العربية' },
  'english_lang': { en: 'English', ar: 'الإنجليزية' },
  'both': { en: 'Both', ar: 'كلاهما' },
  'daily_watch_limit': { en: 'Daily Watch Limit', ar: 'حد المشاهدة اليومي' },
  'min': { en: 'min', ar: 'د' },
  'save_changes': { en: 'Save Changes', ar: 'حفظ التغييرات' },
  'create_profile_btn': { en: 'Create Profile', ar: 'إنشاء الملف الشخصي' },
  'profile_created': { en: 'Profile created!', ar: 'تم إنشاء الملف الشخصي!' },
  'max_5_profiles': { en: 'Maximum 5 profiles allowed', ar: 'الحد الأقصى 5 ملفات شخصية' },
  'enter_a_name': { en: 'Please enter a name', ar: 'يرجى إدخال اسم' },
  'select_age_group': { en: 'Please select an age group', ar: 'يرجى اختيار فئة عمرية' },
  'name_empty': { en: 'Name cannot be empty', ar: 'لا يمكن ترك الاسم فارغاً' },
  'updated': { en: 'updated!', ar: 'تم التحديث!' },

  // Age labels
  'little_star': { en: 'Little Star', ar: 'نجمة صغيرة' },
  'explorer': { en: 'Explorer', ar: 'مستكشف' },
  'scholar': { en: 'Scholar', ar: 'عالِم' },
  'youth': { en: 'Youth', ar: 'شباب' },

  // Child home
  'assalamu_alaikum': { en: 'Assalamu Alaikum', ar: 'السلام عليكم' },
  'what_to_watch': { en: 'What would you like to watch today?', ar: 'ماذا تودّ أن تشاهد اليوم؟' },
  'min_left': { en: 'min left', ar: 'دقيقة متبقية' },
  'daily_dua': { en: 'Daily Dua', ar: 'دعاء اليوم' },
  'continue_watching': { en: 'Continue Watching', ar: 'أكمل المشاهدة' },
  'categories': { en: 'Categories', ar: 'التصنيفات' },
  'recommended': { en: 'Recommended', ar: 'مقترحة' },
  'recently_added': { en: 'Recently Added', ar: 'أضيف حديثاً' },
  'nasheeds_section': { en: 'Nasheeds', ar: 'أناشيد' },
  'no_internet': { en: 'No internet connection', ar: 'لا يوجد اتصال بالإنترنت' },
  'connect_to_load': { en: 'Connect to load content', ar: 'اتصل لتحميل المحتوى' },
  'times_almost_up': { en: "Time's Almost Up!", ar: 'الوقت على وشك الانتهاء!' },
  'less_than_5_min': { en: 'You have less than 5 minutes left. Time for a break soon!', ar: 'لديك أقل من 5 دقائق. وقت الاستراحة قريب!' },
  'ok_got_it': { en: 'OK, Got It!', ar: 'حسناً، فهمت!' },
  'great_watching': { en: 'Great Watching Today!', ar: 'مشاهدة رائعة اليوم!' },
  'watch_time_up': { en: "Your watch time is up. Go play, read, or spend time with family! See you tomorrow, insha'Allah!", ar: 'انتهى وقت المشاهدة. اذهب للعب أو القراءة أو قضاء الوقت مع العائلة! نراك غداً إن شاء الله!' },
  'ok': { en: 'OK!', ar: 'حسناً!' },
  'watch_time_up_toast': { en: 'Watch time is up!', ar: 'انتهى وقت المشاهدة!' },
  'featured': { en: 'FEATURED', ar: 'مميّز' },
  'popular': { en: 'POPULAR', ar: 'شائع' },
  'new': { en: 'NEW', ar: 'جديد' },

  // Bedtime
  'bedtime': { en: 'Bedtime!', ar: 'وقت النوم!' },
  'bedtime_desc_pre': { en: "It's past ", ar: 'الساعة تجاوزت ' },
  'bedtime_desc_post': { en: " PM. Time to rest and sleep well, insha'Allah!", ar: ' مساءً. حان وقت الراحة والنوم، إن شاء الله!' },
  'ask_parent_continue': { en: 'Ask Parent to Continue', ar: 'اطلب من والدك المتابعة' },

  // Search
  'search': { en: 'Search', ar: 'البحث' },
  'search_placeholder': { en: 'Search for videos...', ar: 'ابحث عن فيديوهات...' },
  'search_all': { en: 'Search all content...', ar: 'ابحث في كل المحتوى...' },
  'recent_searches': { en: 'Recent Searches', ar: 'عمليات البحث الأخيرة' },
  'clear': { en: 'Clear', ar: 'مسح' },
  'popular_searches': { en: 'Popular Searches', ar: 'عمليات البحث الشائعة' },
  'browse_by_tag': { en: 'Browse by Tag', ar: 'تصفح بالتصنيف' },
  'results': { en: 'Results', ar: 'النتائج' },
  'no_videos_found': { en: 'No videos found', ar: 'لم يتم العثور على فيديوهات' },
  'all': { en: '← All', ar: '← الكل' },

  // Video player
  'now_playing': { en: 'Now Playing', ar: 'يُعرض الآن' },
  'save': { en: 'Save', ar: 'حفظ' },
  'saved_label': { en: 'Saved', ar: 'محفوظ' },
  'like': { en: 'Like', ar: 'إعجاب' },
  'liked': { en: 'Liked!', ar: 'تم الإعجاب!' },
  'share': { en: 'Share', ar: 'مشاركة' },
  'link_copied': { en: 'Link copied!', ar: 'تم نسخ الرابط!' },
  'report': { en: 'Report', ar: 'إبلاغ' },
  'up_next': { en: 'Up Next', ar: 'التالي' },
  'yt_ads_warning': { en: 'YouTube ads may appear and are outside our control.', ar: 'قد تظهر إعلانات YouTube وهي خارج سيطرتنا.' },
  'no_internet_play': { en: 'No internet — cannot play video', ar: 'لا يوجد إنترنت — لا يمكن تشغيل الفيديو' },
  'playing_next': { en: 'Playing next...', ar: 'يُعرض التالي...' },

  // Saved
  'saved_title': { en: 'Saved', ar: 'المحفوظة' },
  'videos_saved': { en: 'videos saved', ar: 'فيديوهات محفوظة' },
  'no_saved_videos': { en: 'No saved videos yet.', ar: 'لا توجد فيديوهات محفوظة بعد.' },
  'tap_save_btn': { en: 'Tap the save button on any video!', ar: 'اضغط زر الحفظ في أي فيديو!' },
  'removed': { en: 'Removed', ar: 'تمت الإزالة' },
  'saved_toast': { en: 'Saved!', ar: 'تم الحفظ!' },

  // Report
  'report_video': { en: 'Report Video', ar: 'الإبلاغ عن فيديو' },
  'additional_details': { en: 'Additional details (optional)...', ar: 'تفاصيل إضافية (اختياري)...' },
  'submit_report': { en: 'Submit Report', ar: 'إرسال البلاغ' },
  'select_reason': { en: 'Please select a reason', ar: 'يرجى اختيار سبب' },
  'report_submitted': { en: 'Report submitted. Thank you!', ar: 'تم إرسال البلاغ. شكراً لك!' },
  'video_reported': { en: 'Video Reported', ar: 'تم الإبلاغ عن الفيديو' },
  'reason': { en: 'Reason', ar: 'السبب' },

  // Parent Dashboard
  'this_week': { en: 'This Week', ar: 'هذا الأسبوع' },
  'videos': { en: 'Videos', ar: 'فيديوهات' },
  'weekly_activity': { en: 'Weekly Activity', ar: 'النشاط الأسبوعي' },
  'total': { en: 'Total', ar: 'الإجمالي' },
  'watch_time': { en: 'Watch Time', ar: 'وقت المشاهدة' },
  'topics': { en: 'Topics', ar: 'المواضيع' },
  'top_themes': { en: 'Top Themes', ar: 'أهم المواضيع' },
  'recent_history': { en: 'Recent History', ar: 'السجل الأخير' },
  'weekly_report': { en: 'Weekly Report', ar: 'التقرير الأسبوعي' },
  'completed': { en: 'Completed', ar: 'مكتمل' },
  'today': { en: 'Today', ar: 'اليوم' },
  'yesterday': { en: 'Yesterday', ar: 'أمس' },
  'browse_content': { en: 'Browse Content', ar: 'تصفح المحتوى' },
  'tags': { en: 'Tags', ar: 'التصنيفات' },
  'all_ages': { en: 'All Ages', ar: 'جميع الأعمار' },
  'min_day': { en: 'min/day', ar: 'د/يوم' },

  // Weekly Report
  'total_time': { en: 'Total Time', ar: 'الوقت الإجمالي' },
  'avg_day': { en: 'Avg/Day', ar: 'المعدل/يوم' },
  'daily_activity': { en: 'Daily Activity', ar: 'النشاط اليومي' },
  'view_full_history': { en: 'View Full History', ar: 'عرض السجل الكامل' },
  'previous_week': { en: '← Previous Week', ar: '← الأسبوع السابق' },
  'next_week': { en: 'Next Week →', ar: 'الأسبوع التالي →' },

  // Watch History
  'watch_history': { en: 'Watch History', ar: 'سجل المشاهدة' },
  'history': { en: "'s History", ar: ' - السجل' },
  'last_7_days': { en: 'Last 7 days', ar: 'آخر 7 أيام' },
  'today_label': { en: 'TODAY', ar: 'اليوم' },
  'yesterday_label': { en: 'YESTERDAY', ar: 'أمس' },
  'days_ago': { en: 'DAYS AGO', ar: 'أيام مضت' },
  'watched': { en: 'Watched', ar: 'شوهد' },

  // Notifications
  'notifications': { en: 'Notifications', ar: 'الإشعارات' },
  'mark_all_read': { en: 'Mark All Read', ar: 'تعليم الكل كمقروء' },
  'no_notifications': { en: 'No notifications', ar: 'لا توجد إشعارات' },
  'weekly_report_ready': { en: 'Weekly Report Ready', ar: 'التقرير الأسبوعي جاهز' },
  'watch_time_alert': { en: 'Watch Time Alert', ar: 'تنبيه وقت المشاهدة' },
  'new_content_added': { en: 'New Content Added', ar: 'تمت إضافة محتوى جديد' },
  'welcome': { en: 'Welcome!', ar: 'مرحباً!' },
  'all_read': { en: 'All read', ar: 'تم قراءة الكل' },

  // Settings
  'settings': { en: 'Settings', ar: 'الإعدادات' },
  'security': { en: 'Security', ar: 'الأمان' },
  'change_pin': { en: 'Change PIN', ar: 'تغيير رمز PIN' },
  'update_4digit': { en: 'Update your 4-digit PIN', ar: 'حدّث رمز PIN المكوّن من 4 أرقام' },
  'biometric_unlock': { en: 'Biometric Unlock', ar: 'فتح بالمقاييس الحيوية' },
  'use_faceid': { en: 'Use Face ID / fingerprint', ar: 'استخدم بصمة الوجه / الإصبع' },
  'child_profiles': { en: 'Child Profiles', ar: 'ملفات الأطفال' },
  'add_new_profile': { en: '+ Add New Profile', ar: '+ إضافة ملف جديد' },
  'preferences': { en: 'Preferences', ar: 'التفضيلات' },
  'language': { en: 'Language', ar: 'اللغة' },
  'notifications_setting': { en: 'Notifications', ar: 'الإشعارات' },
  'watch_time_alerts': { en: 'Watch time alerts', ar: 'تنبيهات وقت المشاهدة' },
  'bedtime_mode': { en: 'Bedtime Mode', ar: 'وضع النوم' },
  'block_content_after': { en: 'Block content after', ar: 'حظر المحتوى بعد' },
  'pm': { en: 'PM', ar: 'مساءً' },
  'appearance': { en: 'Appearance', ar: 'المظهر' },
  'theme': { en: 'Theme', ar: 'المظهر' },
  'account': { en: 'Account', ar: 'الحساب' },
  'contact_us': { en: 'Contact Us', ar: 'اتصل بنا' },
  'get_in_touch': { en: 'Get in touch', ar: 'تواصل معنا' },
  'support_app': { en: 'Support the App', ar: 'ادعم التطبيق' },
  'make_donation': { en: 'Make a donation', ar: 'تبرّع' },
  'about': { en: 'About', ar: 'حول' },
  'about_app': { en: 'About Muslim Kids VP', ar: 'حول Muslim Kids VP' },
  'version': { en: 'Version 1.0.0', ar: 'الإصدار 1.0.0' },
  'privacy_policy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'sign_out': { en: 'Sign Out', ar: 'تسجيل الخروج' },
  'enabled': { en: 'enabled', ar: 'مفعّل' },
  'disabled': { en: 'disabled', ar: 'معطّل' },

  // Modals
  'sign_out_confirm': { en: 'Sign Out?', ar: 'تسجيل الخروج؟' },
  'are_you_sure': { en: 'Are you sure?', ar: 'هل أنت متأكد؟' },
  'signed_out': { en: 'Signed out', ar: 'تم تسجيل الخروج' },
  'signed_in_with': { en: 'Signed in with', ar: 'تم تسجيل الدخول عبر' },
  'guest': { en: 'Guest', ar: 'ضيف' },
  'delete': { en: 'Delete', ar: 'حذف' },
  'delete_confirm': { en: 'Delete', ar: 'حذف' },
  'delete_desc': { en: 'This will permanently remove the profile and history.', ar: 'سيتم حذف الملف الشخصي والسجل نهائياً.' },
  'cannot_delete_last': { en: 'Cannot delete last profile', ar: 'لا يمكن حذف آخر ملف شخصي' },
  'deleted': { en: 'deleted', ar: 'تم الحذف' },
  'contact_us_title': { en: 'Contact Us', ar: 'اتصل بنا' },
  'email_label': { en: 'Email:', ar: 'البريد الإلكتروني:' },
  'please_include': { en: 'Please include:', ar: 'يرجى تضمين:' },
  'your_account_email': { en: 'Your account email', ar: 'بريدك الإلكتروني' },
  'device_model': { en: 'Device model', ar: 'نوع الجهاز' },
  'app_version': { en: 'App version (1.0.0)', ar: 'إصدار التطبيق (1.0.0)' },
  'issue_desc': { en: 'Description of your issue', ar: 'وصف مشكلتك' },
  'send_email': { en: 'Send Email', ar: 'إرسال بريد' },
  'opening_email': { en: 'Opening email client...', ar: 'جارٍ فتح البريد الإلكتروني...' },
  'close': { en: 'Close', ar: 'إغلاق' },

  // Rating
  'enjoying_app': { en: 'Enjoying Muslim Kids VP?', ar: 'هل تستمتع بـ Muslim Kids VP؟' },
  'rating_desc': { en: 'Your rating helps other Muslim families find us!', ar: 'تقييمك يساعد عائلات مسلمة أخرى في العثور علينا!' },
  'rate_now': { en: 'Rate Now', ar: 'قيّم الآن' },
  'thank_rating': { en: 'Thank you for your rating!', ar: 'شكراً لتقييمك!' },
  'maybe_later_rating': { en: 'Maybe Later', ar: 'ربما لاحقاً' },
  'dont_ask_again': { en: "Don't Ask Again", ar: 'لا تسألني مجدداً' },

  // Navigation
  'home': { en: 'Home', ar: 'الرئيسية' },
  'search_nav': { en: 'Search', ar: 'البحث' },
  'saved_nav': { en: 'Saved', ar: 'المحفوظة' },
  'profiles_nav': { en: 'Profiles', ar: 'الملفات' },
  'settings_nav': { en: 'Settings', ar: 'الإعدادات' },

  // Misc
  'landscape_mode': { en: 'Landscape mode', ar: 'الوضع الأفقي' },
  'portrait_mode': { en: 'Portrait mode', ar: 'الوضع العمودي' },
  'offline_banner': { en: '📡 No internet connection', ar: '📡 لا يوجد اتصال بالإنترنت' },
  'just_now': { en: 'Just now', ar: 'الآن' },
  '2h_ago': { en: '2h ago', ar: 'منذ ساعتين' },

  // Day names
  'mon': { en: 'M', ar: 'ن' },
  'tue': { en: 'T', ar: 'ث' },
  'wed': { en: 'W', ar: 'ر' },
  'thu': { en: 'T', ar: 'خ' },
  'fri': { en: 'F', ar: 'ج' },
  'sat': { en: 'S', ar: 'س' },
  'sun': { en: 'S', ar: 'ح' },
};

function t(key) {
  const lang = state.settings.language;
  const entry = TR[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

function tData(item) {
  // For bilingual data items like SEARCH_SUGGESTIONS, REPORT_REASONS
  const lang = state.settings.language;
  return item[lang] || item.en || item;
}

function videoTitle(v) {
  return state.settings.language === 'ar' ? (v.titleAr || v.title) : v.title;
}

function catName(c) {
  return state.settings.language === 'ar' ? (c.nameAr || c.name) : c.name;
}

function tagName(tg) {
  return state.settings.language === 'ar' ? (tg.nameAr || tg.nameEn) : tg.nameEn;
}

function ageLabelT(ag) {
  const labels = {
    '3-5': t('little_star'),
    '6-8': t('explorer'),
    '9-11': t('scholar'),
    '12-14': t('youth'),
  };
  return labels[ag] || '';
}

const NOTIFICATIONS_DATA = [
  { id: 1, type: 'weekly', title: { en: 'Weekly Report Ready', ar: 'التقرير الأسبوعي جاهز' }, desc: { en: "Yusuf's weekly summary is available. View insights on watch habits.", ar: 'ملخص يوسف الأسبوعي متاح. اطّلع على عادات المشاهدة.' }, time: { en: '2h ago', ar: 'منذ ساعتين' }, read: false, icon: '📊' },
  { id: 2, type: 'watchtime', title: { en: 'Watch Time Alert', ar: 'تنبيه وقت المشاهدة' }, desc: { en: 'Amina reached her daily watch limit (45 min).', ar: 'وصلت أمينة إلى حد المشاهدة اليومي (45 د).' }, time: { en: '5h ago', ar: 'منذ 5 ساعات' }, read: false, icon: '⏱️' },
  { id: 3, type: 'report', title: { en: 'Video Reported', ar: 'تم الإبلاغ عن فيديو' }, desc: { en: 'A video was flagged for review by Yusuf.', ar: 'تم الإبلاغ عن فيديو من قبل يوسف.' }, time: { en: '1d ago', ar: 'منذ يوم' }, read: false, icon: '🚩' },
  { id: 4, type: 'system', title: { en: 'New Content Added', ar: 'تمت إضافة محتوى جديد' }, desc: { en: '8 new videos added to Quran Stories category.', ar: 'تمت إضافة 8 فيديوهات جديدة لقسم قصص القرآن.' }, time: { en: '2d ago', ar: 'منذ يومين' }, read: true, icon: '🆕' },
  { id: 5, type: 'system', title: { en: 'Welcome!', ar: 'مرحباً!' }, desc: { en: 'Thanks for using Muslim Kids VP. May it benefit your family.', ar: 'شكراً لاستخدامك Muslim Kids VP. نسأل الله أن ينفع عائلتك.' }, time: { en: '3d ago', ar: 'منذ 3 أيام' }, read: true, icon: '✨' },
];

const SCREEN_LIST = [
  { id: 'splash', label: 'Splash' },
  { id: 'signin', label: 'Sign In' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'pin-setup', label: 'PIN Setup' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'create-profile', label: 'Create' },
  { id: 'edit-profile', label: 'Edit' },
  { id: 'pin', label: 'PIN Entry' },
  { id: 'forgot-pin', label: 'Forgot PIN' },
  { id: 'child-home', label: 'Child Home' },
  { id: 'child-search', label: 'Search' },
  { id: 'video-player', label: 'Player' },
  { id: 'saved', label: 'Saved' },
  { id: 'parent-dash', label: 'Dashboard' },
  { id: 'parent-search', label: 'P. Search' },
  { id: 'weekly-report', label: 'Report' },
  { id: 'watch-history', label: 'History' },
  { id: 'notifications', label: 'Notifs' },
  { id: 'settings', label: 'Settings' },
  { id: 'force-update', label: 'Update' },
];

// ===== APP STATE =====
const state = {
  currentScreen: 'splash',
  previousScreen: null,
  screenHistory: [],
  activeProfile: 0,
  pinCode: '',
  correctPin: '1234',
  pinMode: 'enter',
  pinSetupFirst: '',
  isFirstTime: true,
  onboardingStep: 0,
  savedVideos: new Set([1, 24, 33, 7]),
  currentVideo: null,
  searchQuery: '',
  selectedTags: new Set(),
  selectedCategory: null,
  searchHistory: ['Prophet Stories', 'Quran'],
  watchTimeLeft: 36,
  watchTimeTotal: 60,
  watchTimeWarningShown: false,
  isPlaying: false,
  videoProgress: {},
  continueWatching: [
    { videoId: 1, progress: 35, lastWatched: { en: 'Just now', ar: 'الآن' } },
    { videoId: 23, progress: 62, lastWatched: { en: '2h ago', ar: 'منذ ساعتين' } },
  ],
  theme: 'garden',
  editingProfile: null,
  settings: { biometric: true, notifications: true, bedtime: false, bedtimeHour: 21, language: 'en' },
  isRTL: false,
  notifications: 3,
  newProfile: { name: '', ageGroup: '', avatar: 0, language: 'ar' },
  weeklyData: [25, 40, 35, 50, 20, 45, 36],
  transitioning: false,
  // New v2 state
  pinFailCount: 0,
  pinLockedUntil: null,
  exitPinCode: '',
  forgotPinStep: 0,
  forgotPinEmail: '',
  forgotPinFirst: '',
  weeklyReportChild: 0,
  weeklyReportWeekOffset: 0,
  parentSearchQuery: '',
  parentSearchAgeFilter: null,
  parentSearchTags: new Set(),
  notificationsList: [...NOTIFICATIONS_DATA],
  reportReason: '',
  isOffline: false,
  showSkeleton: false,
  ratingPromptShown: false,
  ratingStars: 0,
  isFullscreen: false,
  onboardingProfile: { name: '', ageGroup: '', avatar: 0 },
  adsAcknowledged: false,
  parentLastActivity: Date.now(),
  parentSessionTimer: null,
};

let nextProfileId = 4;

// ===== HELPERS =====
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function ytThumb(ytId) { return `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`; }
function thumbStyle(v) { return v.ytId ? `background:url('${ytThumb(v.ytId)}') center/cover no-repeat` : `background:linear-gradient(135deg,${v.grad[0]},${v.grad[1]})`; }
function getCategoryName(id) { const c = CATEGORIES.find(c => c.id === id); return c ? catName(c) : ''; }
function getVideosByCategory(catId) { return VIDEOS.filter(v => v.category === catId); }
function getVideosForProfile(p) { return p ? VIDEOS.filter(v => v.ageGroups.includes(p.ageGroup)) : VIDEOS; }
function getVideosByTags(tags) { return tags.size === 0 ? VIDEOS : VIDEOS.filter(v => v.tags.some(t => tags.has(t))); }
function searchVideos(q) { q = q.toLowerCase(); return VIDEOS.filter(v => v.title.toLowerCase().includes(q) || v.titleAr.includes(q) || v.channel.toLowerCase().includes(q) || v.tags.some(t => t.includes(q))); }
function shuffleArray(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function parseDuration(d) { const p = d.split(':'); return parseInt(p[0]) * 60 + parseInt(p[1]); }
function formatTime(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function getAgeLabelForGroup(ag) { return ageLabelT(ag); }
function getTimeNow() { const d = new Date(); let h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + ':' + String(m).padStart(2, '0'); }
function isChildScreen(s) { return ['child-home', 'child-search', 'saved', 'video-player'].includes(s); }
function isParentScreen(s) { return ['parent-dash', 'parent-search', 'weekly-report', 'watch-history', 'notifications', 'settings'].includes(s); }
function checkBedtime() { if (!state.settings.bedtime) return false; const h = new Date().getHours(); return h >= state.settings.bedtimeHour || h < 5; }
function getWeekLabel(offset) {
  const now = new Date(); const end = new Date(now); end.setDate(end.getDate() - (offset * 7));
  const start = new Date(end); start.setDate(start.getDate() - 6);
  const locale = state.settings.language === 'ar' ? 'ar-SA' : 'en-US';
  const fmt = d => d.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
  return `${fmt(start)} - ${fmt(end)}`;
}

// ===== STATUS BAR =====
function renderStatusBar(light = true) {
  return `<div class="phone-statusbar ${light ? 'light' : 'dark'}">
    <span>${getTimeNow()}</span>
    <span style="display:flex;gap:4px;align-items:center">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="6" width="2" height="4" rx="0.5"/><rect x="3" y="4" width="2" height="6" rx="0.5"/><rect x="6" y="2" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="10" rx="0.5"/></svg>
      <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="1" width="13" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1"/><rect x="13.5" y="3" width="1.5" height="4" rx="0.5"/><rect x="1.5" y="2.5" width="8" height="5" rx="0.5"/></svg>
    </span>
  </div>${state.isOffline ? `<div class="offline-banner">${t('offline_banner')}</div>` : ''}`;
}

// ===== CARD RENDERERS =====
function renderVideoCard(video, size = 'normal') {
  const progress = state.videoProgress[video.id];
  return `<div class="video-card" style="min-width:${size === 'small' ? '150px' : '180px'}" onclick="playVideo(${video.id})">
    <div class="vc-thumb" style="${thumbStyle(video)}">
      ${!video.ytId ? `<div class="vc-thumb-bg">${video.icon}</div>` : ''}
      <div class="vc-duration">${video.duration}</div>
      ${progress ? `<div class="vc-progress-bar"><div class="vc-progress-fill" style="width:${progress}%"></div></div>` : ''}
    </div>
    <div class="vc-info"><div class="vc-title">${videoTitle(video)}</div><div class="vc-channel">${video.channel}</div></div>
  </div>`;
}

function renderUpNextItem(video) {
  return `<div class="up-next-item" onclick="playVideo(${video.id})">
    <div class="un-thumb" style="${thumbStyle(video)}">${!video.ytId ? video.icon : ''}<div class="un-dur">${video.duration}</div></div>
    <div class="un-info"><div class="un-title">${videoTitle(video)}</div><div class="un-channel">${video.channel}</div></div>
  </div>`;
}

function renderSavedItem(video) {
  return `<div class="saved-item" onclick="playVideo(${video.id})">
    <div class="si-thumb" style="${thumbStyle(video)}">${!video.ytId ? video.icon : ''}<div class="si-dur">${video.duration}</div></div>
    <div class="si-info"><div class="si-title">${videoTitle(video)}</div><div class="si-meta">${getCategoryName(video.category)} · ${t('saved_label')}</div></div>
    <span class="si-unsave" onclick="event.stopPropagation();toggleSave(${video.id})">🔖</span>
  </div>`;
}

function renderHistoryItem(video, completed, time) {
  return `<div class="hist-item" onclick="playVideo(${video.id})">
    <div class="hi-thumb" style="${thumbStyle(video)}">${!video.ytId ? video.icon : ''}${completed ? '<span class="hi-status">✅</span>' : ''}</div>
    <div class="hi-info"><div class="hi-title">${videoTitle(video)}</div><div class="hi-meta">${video.duration} · ${completed ? t('completed') : `${t('watched')} 3:20`} · ${time}</div></div>
    <span class="hi-flag" onclick="event.stopPropagation();showReportSheet(${video.id})">🚩</span>
  </div>`;
}

function renderContinueCard(item) {
  const v = VIDEOS.find(x => x.id === item.videoId);
  if (!v) return '';
  return `<div class="continue-card" onclick="playVideo(${v.id})">
    <div class="cc-thumb" style="${thumbStyle(v)}">
      ${!v.ytId ? `<span style="font-size:28px;opacity:0.3">${v.icon}</span>` : ''}
      <div class="cc-play">▶</div>
      <div class="cc-progress-bar"><div class="cc-progress-fill" style="width:${item.progress}%"></div></div>
    </div>
    <div class="cc-info"><div class="cc-title">${videoTitle(v)}</div><div class="cc-meta">${typeof item.lastWatched === 'object' ? tData(item.lastWatched) : item.lastWatched}</div></div>
  </div>`;
}

function renderMiniChart(data) {
  const max = Math.max(...data);
  const days = [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')];
  return `<div class="mini-chart"><div class="mc-bars">
    ${data.map((v, i) => `<div class="mc-bar-wrap"><div class="mc-bar${i === data.length - 1 ? ' today' : ''}" style="height:${max > 0 ? (v / max) * 100 : 0}%"></div><div class="mc-day">${days[i]}</div></div>`).join('')}
  </div></div>`;
}

function renderFeaturedBanners(videos) {
  return `<div class="featured-scroll">${videos.slice(0, 3).map((v, i) => `
    <div class="featured-card" onclick="playVideo(${v.id})">
      <div class="featured-thumb" style="${thumbStyle(v)}">${!v.ytId ? `<span style="font-size:64px;opacity:0.2">${v.icon}</span>` : ''}</div>
      <div class="featured-badge">${[`⭐ ${t('featured')}`, `🔥 ${t('popular')}`, `🆕 ${t('new')}`][i] || `⭐ ${t('featured')}`}</div>
      <div class="featured-play">▶</div>
      <div class="featured-overlay"><div class="featured-title">${videoTitle(v)}</div><div class="featured-channel">${v.channel} · ${v.duration}</div></div>
    </div>`).join('')}
  </div>
  <div class="featured-dots">${videos.slice(0, 3).map((_, i) => `<div class="featured-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}</div>`;
}

function renderSkeleton() {
  return `${renderStatusBar(true)}<div class="scr-child-home">
    <div class="child-header">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div><div class="skeleton skeleton-rect" style="width:200px;height:20px;margin-bottom:6px"></div><div class="skeleton skeleton-rect" style="width:140px;height:14px"></div></div>
        <div class="skeleton skeleton-circle"></div>
      </div>
      <div class="skeleton skeleton-rect lg" style="border-radius:20px"></div>
    </div>
    <div style="padding:12px 20px"><div class="skeleton skeleton-rect" style="height:44px;border-radius:12px"></div></div>
    <div style="padding:4px 20px"><div class="skeleton skeleton-rect md" style="border-radius:16px"></div></div>
    <div class="section-label"><div class="skeleton skeleton-rect" style="width:100px;height:12px"></div></div>
    <div class="category-grid">${Array(4).fill('<div class="skeleton skeleton-rect md"></div>').join('')}</div>
    <div class="section-label"><div class="skeleton skeleton-rect" style="width:120px;height:12px"></div></div>
    <div class="video-section"><div class="video-row">${Array(3).fill('<div class="skeleton skeleton-card" style="min-width:180px;flex-shrink:0"></div>').join('')}</div></div>
    <div style="flex:1"></div>
    <div class="child-nav" style="height:64px;border-top:1px solid var(--border)"></div>
  </div>`;
}

function renderBedtimeOverlay() {
  return `<div class="bedtime-overlay">
    <div class="bedtime-icon">🌙</div>
    <div class="bedtime-title">${t('bedtime')}</div>
    <div class="bedtime-desc">${t('bedtime_desc_pre')}${state.settings.bedtimeHour > 12 ? (state.settings.bedtimeHour - 12) : state.settings.bedtimeHour} ${t('bedtime_desc_post')}</div>
    <button class="bedtime-btn" onclick="showExitPinGate()">${t('ask_parent_continue')}</button>
  </div>`;
}

// ===== SCREEN RENDERERS =====
const screens = {
  splash() {
    return `${renderStatusBar(true)}<div class="scr-splash">
      <div class="splash-logo">☪</div>
      <div class="splash-title">${t('app_name')}</div>
      <div class="splash-tagline">${t('app_tagline')}</div>
      <div class="splash-loader"><div class="splash-loader-fill"></div></div>
    </div>`;
  },

  signin() {
    return `${renderStatusBar(true)}<div class="scr-signin">
      <div class="signin-top">
        <div class="signin-logo">☪</div>
        <div class="signin-title">${t('app_name')}</div>
        <div class="signin-desc">${t('signin_desc')}</div>
      </div>
      <div class="signin-buttons">
        <button class="signin-btn signin-apple" onclick="signIn('apple')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.96 4.28-3.74 4.25z"/></svg>
          ${t('continue_apple')}
        </button>
        <button class="signin-btn signin-google" onclick="signIn('google')">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          ${t('continue_google')}
        </button>
        <button class="signin-btn signin-guest" onclick="signIn('guest')">${t('try_guest')}</button>
      </div>
      <div class="signin-terms">${t('signin_terms')}</div>
    </div>`;
  },

  onboarding() {
    const step = ONBOARDING_STEPS[state.onboardingStep];
    const isLast = state.onboardingStep === ONBOARDING_STEPS.length - 1;
    const isFirst = state.onboardingStep === 0;
    const obKeys = ['ob_welcome', 'ob_signin', 'ob_pin', 'ob_profile', 'ob_ads', 'ob_support', 'ob_done'];
    const obKey = obKeys[state.onboardingStep];
    const stepTitle = t(obKey + '_title');
    const stepDesc = t(obKey + '_desc');
    let contentHtml = '';

    if (step.type === 'inline-profile') {
      const op = state.onboardingProfile;
      contentHtml = `<div class="ob-illustration small">${step.icon}</div>
        <div class="ob-title">${stepTitle}</div>
        <div class="ob-desc">${stepDesc}</div>
        <div class="ob-inline-form">
          <div class="ob-inline-label">${t('avatar')}</div>
          <div class="ob-inline-avatars">${AVATARS.map((a, i) => `<div class="ob-inline-avatar ${op.avatar === i ? 'selected' : ''}" style="background:linear-gradient(135deg,${a.grad[0]},${a.grad[1]})" onclick="state.onboardingProfile.avatar=${i};renderScreen('onboarding')">${a.icon}</div>`).join('')}</div>
          <div class="ob-inline-label">${t('name')}</div>
          <input class="cp-input" type="text" placeholder="${t('childs_name_placeholder')}" value="${op.name}" oninput="state.onboardingProfile.name=this.value" style="font-size:14px;padding:10px 14px">
          <div class="ob-inline-label">${t('age_group')}</div>
          <div class="ob-inline-ages">${[{v:'3-5',l:'3-5'},{v:'6-8',l:'6-8'},{v:'9-11',l:'9-11'},{v:'12-14',l:'12-14'}].map(a => `<div class="ob-inline-age ${op.ageGroup===a.v?'selected':''}" onclick="state.onboardingProfile.ageGroup='${a.v}';renderScreen('onboarding')">${a.l}</div>`).join('')}</div>
        </div>`;
    } else if (step.type === 'acknowledge') {
      contentHtml = `<div class="ob-illustration">${step.icon}</div>
        <div class="ob-title">${stepTitle}</div>
        <div class="ob-desc">${stepDesc}</div>
        <div style="margin-top:16px;display:flex;align-items:center;gap:8px;cursor:pointer" onclick="state.adsAcknowledged=!state.adsAcknowledged;renderScreen('onboarding')">
          <div style="width:22px;height:22px;border-radius:6px;border:2px solid ${state.adsAcknowledged ? 'var(--p700)' : 'var(--border)'};background:${state.adsAcknowledged ? 'var(--p700)' : 'transparent'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px">${state.adsAcknowledged ? '✓' : ''}</div>
          <span style="font-size:13px;color:var(--text);font-weight:600">${t('i_understand_ads')}</span>
        </div>`;
    } else if (step.type === 'donation') {
      contentHtml = `<div class="ob-illustration">${step.icon}</div>
        <div class="ob-title">${stepTitle}</div>
        <div class="ob-desc">${stepDesc}</div>
        <div class="ob-donation-btns">
          <button class="btn-primary" style="background:var(--a500);color:var(--p900)" onclick="showToast(t('jazakallah'))">${t('support_the_app')}</button>
          <button class="btn-skip" onclick="nextOnboarding()">${t('maybe_later')}</button>
        </div>`;
    } else {
      contentHtml = `<div class="ob-illustration">${step.icon}</div>
        <div class="ob-title">${stepTitle}</div>
        <div class="ob-desc">${stepDesc}</div>`;
    }

    return `${renderStatusBar(false)}<div class="scr-onboarding">
      <div class="ob-progress">${ONBOARDING_STEPS.map((_, i) => `<div class="ob-dot${i < state.onboardingStep ? ' done' : ''}${i === state.onboardingStep ? ' active' : ''}"></div>`).join('')}</div>
      <div class="ob-content">${contentHtml}</div>
      ${step.type !== 'donation' ? `<div class="ob-actions">
        ${!isFirst ? `<button class="btn-secondary" onclick="prevOnboarding()">${t('back')}</button>` : `<button class="btn-skip" onclick="navigate('profiles')">${t('skip_all')}</button>`}
        <button class="btn-primary" onclick="${isLast ? 'finishOnboarding()' : 'nextOnboarding()'}">${isLast ? t('set_up_pin') : t('continue')}</button>
      </div>` : ''}
    </div>`;
  },

  'pin-setup'() {
    const isConfirm = state.pinMode === 'confirm';
    const isVerify = state.pinMode === 'verify-current';
    const title = isVerify ? t('enter_current_pin') : isConfirm ? t('confirm_pin') : t('create_pin');
    const subtitle = isVerify ? t('enter_existing_pin') : isConfirm ? t('enter_same_pin') : t('choose_4digit');
    return `${renderStatusBar(true)}<div class="scr-pin">
      <div class="pin-lock">${isConfirm ? '🔐' : isVerify ? '🔑' : '🔒'}</div>
      <div class="pin-title">${title}</div>
      <div class="pin-subtitle">${subtitle}</div>
      <div class="pin-dots">${Array.from({length: 4}, (_, i) => `<div class="pin-dot ${i < state.pinCode.length ? 'filled' : ''}"></div>`).join('')}</div>
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9].map(n => `<div class="pin-key" onclick="pressPinSetup('${n}')">${n}</div>`).join('')}
        <div class="pin-key empty"></div>
        <div class="pin-key" onclick="pressPinSetup('0')">0</div>
        <div class="pin-key del" onclick="deletePinSetup()">⌫</div>
      </div>
      <div class="pin-success" id="pin-success">${t('pin_created')}</div>
    </div>`;
  },

  profiles() {
    const atLimit = PROFILES.length >= 5;
    return `${renderStatusBar(true)}<div class="scr-profiles">
      <div class="ps-header">
        <div class="ps-logo">☪</div>
        <div class="ps-app-name">${t('app_name')}</div>
        <div class="ps-tagline">${t('whos_watching')}</div>
      </div>
      <div class="ps-label">${t('profiles')}</div>
      <div class="ps-grid">
        ${PROFILES.map((p, i) => `<div class="profile-card" onclick="selectProfile(${i})">
          <div class="profile-avatar" style="background:linear-gradient(135deg,${p.grad[0]},${p.grad[1]})">${p.initial}</div>
          <div class="profile-name">${p.name}</div>
          <div class="profile-age">${t('age')} ${p.age} · ${p.ageLabel}</div>
          <div class="profile-actions">
            <span class="profile-action-btn" onclick="event.stopPropagation();editProfile(${p.id})">✏️</span>
            <span class="profile-action-btn" onclick="event.stopPropagation();viewHistory(${i})">📊</span>
            <span class="profile-action-btn" onclick="event.stopPropagation();state.weeklyReportChild=${i};navigate('weekly-report')">📈</span>
          </div>
        </div>`).join('')}
        <div class="add-profile-card ${atLimit ? 'disabled' : ''}" onclick="${atLimit ? '' : "navigate('create-profile')"}">
          <div class="add-icon">${atLimit ? '✓' : '+'}</div>
          <div class="add-label">${atLimit ? t('limit_reached') : t('add_profile')}</div>
        </div>
      </div>
      <button class="parent-btn" onclick="navigate('pin')">🔒 ${t('parent_dashboard')}</button>
    </div>`;
  },

  pin() {
    const locked = state.pinLockedUntil && Date.now() < state.pinLockedUntil;
    const remaining = locked ? Math.ceil((state.pinLockedUntil - Date.now()) / 1000) : 0;
    const showForgot = state.pinFailCount >= 3;
    return `${renderStatusBar(true)}<div class="scr-pin">
      <div class="pin-lock">🔐</div>
      <div class="pin-title">${t('enter_pin')}</div>
      <div class="pin-subtitle">${t('enter_4digit_pin')}</div>
      <div class="pin-dots">${Array.from({length: 4}, (_, i) => `<div class="pin-dot ${i < state.pinCode.length ? 'filled' : ''}"></div>`).join('')}</div>
      ${locked ? `<div class="pin-lockout-msg">${t('too_many_attempts')}</div><div class="pin-lockout-timer">${remaining}s</div>` : ''}
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9].map(n => `<div class="pin-key ${locked ? 'disabled' : ''}" onclick="pressPin('${n}')">${n}</div>`).join('')}
        <div class="pin-key bio ${locked ? 'disabled' : ''}" onclick="biometricUnlock()">👆</div>
        <div class="pin-key ${locked ? 'disabled' : ''}" onclick="pressPin('0')">0</div>
        <div class="pin-key del ${locked ? 'disabled' : ''}" onclick="deletePin()">⌫</div>
      </div>
      ${!locked ? `<div class="pin-hint">${t('hint_1234')}</div>` : ''}
      <div class="pin-forgot ${showForgot ? 'visible' : ''}" onclick="navigate('forgot-pin')">${t('forgot_pin')}</div>
      <div class="pin-success" id="pin-success">${t('pin_unlocked')}</div>
    </div>`;
  },

  'forgot-pin'() {
    const s = state.forgotPinStep;
    if (s === 0) {
      return `${renderStatusBar(true)}<div class="scr-forgot-pin">
        <div class="fp-icon">📧</div>
        <div class="fp-title">${t('forgot_pin_title')}</div>
        <div class="fp-desc">${t('forgot_pin_desc')}</div>
        <input class="fp-input" type="email" placeholder="parent@email.com" value="${state.forgotPinEmail}" oninput="state.forgotPinEmail=this.value">
        <button class="fp-btn" onclick="submitForgotPinEmail()">${t('send_reset_link')}</button>
        <div class="fp-link" onclick="goBack()">${t('back_to_pin')}</div>
      </div>`;
    } else if (s === 1) {
      return `${renderStatusBar(true)}<div class="scr-forgot-pin">
        <div class="fp-success-icon">✉️</div>
        <div class="fp-title">${t('reset_link_sent')}</div>
        <div class="fp-desc">${t('check_email')} ${state.forgotPinEmail || 'parent@email.com'}${t('click_link_reset')}</div>
        <button class="fp-btn" onclick="state.forgotPinStep=2;state.pinCode='';renderScreen('forgot-pin')">${t('verified_set_new_pin')}</button>
        <div class="fp-link" onclick="state.forgotPinStep=0;renderScreen('forgot-pin')">${t('didnt_receive')}</div>
      </div>`;
    } else {
      const isConfirm = s === 3;
      return `${renderStatusBar(true)}<div class="scr-pin">
        <div class="pin-lock">${isConfirm ? '🔐' : '🔒'}</div>
        <div class="pin-title">${isConfirm ? t('confirm_new_pin') : t('create_new_pin')}</div>
        <div class="pin-subtitle">${isConfirm ? t('enter_same_pin') : t('choose_new_4digit')}</div>
        <div class="pin-dots">${Array.from({length: 4}, (_, i) => `<div class="pin-dot ${i < state.pinCode.length ? 'filled' : ''}"></div>`).join('')}</div>
        <div class="pin-pad">
          ${[1,2,3,4,5,6,7,8,9].map(n => `<div class="pin-key" onclick="pressForgotPin('${n}')">${n}</div>`).join('')}
          <div class="pin-key empty"></div>
          <div class="pin-key" onclick="pressForgotPin('0')">0</div>
          <div class="pin-key del" onclick="state.pinCode=state.pinCode.slice(0,-1);updatePinDots()">⌫</div>
        </div>
        <div class="pin-success" id="pin-success">${t('pin_reset_done')}</div>
      </div>`;
    }
  },

  'force-update'() {
    return `${renderStatusBar(true)}<div class="scr-force-update">
      <div class="fu-icon">⬆️</div>
      <div class="fu-title">${t('update_required')}</div>
      <div class="fu-desc">${t('update_desc')}</div>
      <button class="fu-btn" onclick="showToast(t('redirecting_store'))">${t('update_now')}</button>
      <div class="fu-version">Current: v1.0.0 · Required: v1.1.0</div>
    </div>`;
  },

  'create-profile'() {
    return `${renderStatusBar(false)}<div class="scr-create-profile">
      <div class="cp-header"><button class="back-btn" onclick="goBack()">←</button><span class="cp-title">${t('create_profile')}</span></div>
      <div class="cp-body scroll-y">
        <div class="cp-section-label">${t('choose_avatar')}</div>
        <div class="cp-avatar-row">${AVATARS.map((a, i) => `<div class="cp-avatar-option ${state.newProfile.avatar === i ? 'selected' : ''}" style="background:linear-gradient(135deg,${a.grad[0]},${a.grad[1]})" onclick="selectAvatar(${i})">${a.icon}</div>`).join('')}</div>
        <div class="cp-section-label">${t('childs_name')}</div>
        <input class="cp-input" id="profile-name-input" type="text" placeholder="${t('enter_name')}" value="${state.newProfile.name}" oninput="state.newProfile.name=this.value">
        <div class="cp-section-label">${t('age_group')}</div>
        <div class="cp-age-grid">${[{v:'3-5',l:'3 – 5'},{v:'6-8',l:'6 – 8'},{v:'9-11',l:'9 – 11'},{v:'12-14',l:'12 – 14'}].map(a => `<div class="cp-age-btn ${state.newProfile.ageGroup===a.v?'selected':''}" onclick="selectAgeGroup('${a.v}')"><div class="cp-age-label">${a.l}</div><div class="cp-age-sub">${ageLabelT(a.v)}</div></div>`).join('')}</div>
        <div class="cp-section-label">${t('preferred_language')}</div>
        <div style="display:flex;gap:10px">
          <div class="cp-age-btn ${state.newProfile.language==='ar'?'selected':''}" style="flex:1" onclick="selectLang('ar')"><div class="cp-age-label">العربية</div><div class="cp-age-sub">${t('arabic')}</div></div>
          <div class="cp-age-btn ${state.newProfile.language==='en'?'selected':''}" style="flex:1" onclick="selectLang('en')"><div class="cp-age-label">English</div><div class="cp-age-sub">${t('english_lang')}</div></div>
          <div class="cp-age-btn ${state.newProfile.language==='both'?'selected':''}" style="flex:1" onclick="selectLang('both')"><div class="cp-age-label">${t('both')}</div><div class="cp-age-sub">كلاهما</div></div>
        </div>
        <button class="btn-primary" style="width:100%;margin-top:24px" onclick="createProfile()">${t('create_profile_btn')}</button>
      </div>
    </div>`;
  },

  'edit-profile'() {
    const p = state.editingProfile;
    if (!p) return '<div>No profile</div>';
    return `${renderStatusBar(false)}<div class="scr-create-profile">
      <div class="cp-header">
        <button class="back-btn" onclick="goBack()">←</button>
        <span class="cp-title">${t('edit_profile')}</span>
        <button class="delete-profile-btn" onclick="confirmDeleteProfile(${p.id})">🗑️</button>
      </div>
      <div class="cp-body scroll-y">
        <div class="cp-section-label">${t('avatar')}</div>
        <div class="cp-avatar-row">${AVATARS.map((a, i) => `<div class="cp-avatar-option ${a.grad[0]===p.grad[0]?'selected':''}" style="background:linear-gradient(135deg,${a.grad[0]},${a.grad[1]})" onclick="updateEditAvatar(${i})">${a.icon}</div>`).join('')}</div>
        <div class="cp-section-label">${t('name')}</div>
        <input class="cp-input" id="edit-name-input" type="text" value="${p.name}" oninput="state.editingProfile.name=this.value">
        <div class="cp-section-label">${t('age')}</div>
        <input class="cp-input" type="number" min="3" max="14" value="${p.age}" oninput="state.editingProfile.age=parseInt(this.value)" style="margin-bottom:8px">
        <div class="cp-section-label">${t('age_group')}</div>
        <div class="cp-age-grid">${[{v:'3-5',l:'3 – 5'},{v:'6-8',l:'6 – 8'},{v:'9-11',l:'9 – 11'},{v:'12-14',l:'12 – 14'}].map(a => `<div class="cp-age-btn ${p.ageGroup===a.v?'selected':''}" onclick="updateEditAgeGroup('${a.v}')"><div class="cp-age-label">${a.l}</div><div class="cp-age-sub">${ageLabelT(a.v)}</div></div>`).join('')}</div>
        <div class="cp-section-label">${t('daily_watch_limit')}</div>
        <div style="display:flex;gap:10px">${[30,45,60,90,120].map(m => `<div class="cp-age-btn ${p.dailyLimit===m?'selected':''}" style="flex:1;padding:10px 4px" onclick="updateEditLimit(${m})"><div class="cp-age-label" style="font-size:13px">${m}</div><div class="cp-age-sub">${t('min')}</div></div>`).join('')}</div>
        <button class="btn-primary" style="width:100%;margin-top:24px" onclick="saveEditProfile()">${t('save_changes')}</button>
      </div>
    </div>`;
  },

  'child-home'() {
    if (state.showSkeleton) { state.showSkeleton = false; setTimeout(() => renderScreen('child-home'), 800); return renderSkeleton(); }
    const profile = PROFILES[state.activeProfile];
    const ageVids = getVideosForProfile(profile);
    const featured = ageVids.slice(0, 3);
    const recommended = shuffleArray(ageVids).slice(0, 8);
    const recent = ageVids.slice(Math.max(0, ageVids.length - 6));
    const pct = Math.round((state.watchTimeLeft / state.watchTimeTotal) * 100);
    const dua = DAILY_DUAS[new Date().getDate() % DAILY_DUAS.length];
    const offlineContent = state.isOffline ? `<div style="text-align:center;padding:40px 20px;color:var(--textLight)"><div style="font-size:48px;margin-bottom:8px">📡</div><div style="font-size:14px;font-weight:600">${t('no_internet')}</div><div style="font-size:12px;margin-top:4px">${t('connect_to_load')}</div></div>` : '';

    return `${renderStatusBar(true)}<div class="scr-child-home">
      <div class="child-header">
        <div class="ch-pattern">✦</div>
        <div class="ch-greeting">
          <div class="ch-greeting-text"><h2>${t('assalamu_alaikum')}، ${profile.name}!</h2><p>${t('what_to_watch')}</p></div>
          <div class="ch-avatar-sm" style="background:linear-gradient(135deg,${profile.grad[0]},${profile.grad[1]})" onclick="showExitPinGate()">${profile.initial}</div>
        </div>
        ${!state.isOffline ? renderFeaturedBanners(featured) : ''}
      </div>

      <div class="watch-limit ${pct <= 20 ? 'warning' : ''}">
        <span class="wl-icon">${pct <= 20 ? '⚠️' : '⏱️'}</span>
        <div class="wl-text">${state.watchTimeLeft} ${t('min_left')}</div>
        <div class="wl-bar-container"><div class="wl-bar" style="width:${pct}%"></div></div>
      </div>

      <div class="dua-card">
        <div class="dua-header"><span>📿</span> ${t('daily_dua')}</div>
        <div class="dua-arabic">${dua.arabic}</div>
        <div class="dua-english">${dua.english}</div>
        <div class="dua-context">${dua.context}</div>
      </div>

      ${state.isOffline ? offlineContent : `
        ${state.continueWatching.length > 0 ? `
          <div class="section-label">${t('continue_watching')}${state.settings.language === 'en' ? ' · أكمل المشاهدة' : ''}</div>
          <div class="video-section"><div class="video-row">${state.continueWatching.map(c => renderContinueCard(c)).join('')}</div></div>
        ` : ''}

        <div class="section-label">${t('categories')}${state.settings.language === 'en' ? ' · التصنيفات' : ''}</div>
        <div class="category-grid">${CATEGORIES.slice(0, 6).map(c => `<div class="category-tile" style="background:${c.bg}" onclick="browseCategory('${c.id}')"><div class="cat-icon">${c.icon}</div><div class="cat-label">${catName(c)}</div>${state.settings.language === 'en' ? `<div class="cat-sublabel">${c.nameAr}</div>` : ''}</div>`).join('')}</div>

        <div class="section-label" style="margin-top:8px">${t('recommended')}${state.settings.language === 'en' ? ' · مقترحة' : ''}</div>
        <div class="video-section"><div class="video-row">${recommended.slice(0, 5).map(v => renderVideoCard(v)).join('')}</div></div>

        <div class="section-label">${t('recently_added')}${state.settings.language === 'en' ? ' · أضيف حديثاً' : ''}</div>
        <div class="video-section"><div class="video-row">${recent.map(v => renderVideoCard(v)).join('')}</div></div>

        <div class="section-label">${t('nasheeds_section')}${state.settings.language === 'en' ? ' · أناشيد' : ''}</div>
        <div class="video-section"><div class="video-row">${getVideosByCategory('nasheeds').filter(v => v.ageGroups.includes(profile.ageGroup)).map(v => renderVideoCard(v)).join('')}</div></div>
      `}

      <div style="height:8px"></div>
      ${renderChildNav('home')}
    </div>
    <div class="modal-overlay" id="watch-modal"><div class="modal-box"><div class="modal-icon">⏰</div><div class="modal-title">${t('times_almost_up')}</div><div class="modal-desc">${t('less_than_5_min')}</div><button class="modal-btn" onclick="closeModal()">${t('ok_got_it')}</button></div></div>
    <div class="modal-overlay" id="timeup-modal"><div class="modal-box"><div class="modal-icon">🌟</div><div class="modal-title">${t('great_watching')}</div><div class="modal-desc">${t('watch_time_up')}</div><button class="modal-btn" onclick="exitToProfiles()">${t('ok')}</button></div></div>
    ${checkBedtime() ? renderBedtimeOverlay() : ''}`;
  },

  'child-search'() {
    let results;
    if (state.searchQuery) results = searchVideos(state.searchQuery);
    else if (state.selectedCategory) results = getVideosByCategory(state.selectedCategory);
    else if (state.selectedTags.size > 0) results = getVideosByTags(state.selectedTags);
    else results = [];
    const catName = state.selectedCategory ? getCategoryName(state.selectedCategory) : '';
    const showSuggestions = !state.searchQuery && !state.selectedCategory && state.selectedTags.size === 0;
    const showTags = !state.searchQuery && !state.selectedCategory;

    return `${renderStatusBar(true)}<div class="scr-child-search">
      <div class="cs-header">
        <div class="cs-title">${t('search')}${state.settings.language === 'en' ? ' · البحث' : ''}</div>
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="${t('search_placeholder')}" value="${state.searchQuery}" oninput="onSearch(this.value)">
          <span class="search-clear" style="display:${state.searchQuery ? 'block' : 'none'}" onclick="clearSearch()">✕</span>
        </div>
      </div>
      <div class="scroll-y">
        ${state.selectedCategory ? `<div style="padding:12px 20px 0;display:flex;align-items:center;gap:8px">
          <button class="btn-secondary" style="padding:6px 12px;font-size:12px;border-radius:999px" onclick="clearCategory()">${t('all')}</button>
          <span style="font-size:14px;font-weight:700;color:var(--text)">${catName}</span>
          <span style="font-size:12px;color:var(--textLight)">(${results.length})</span>
        </div>` : ''}

        ${showSuggestions ? `
          ${state.searchHistory.length > 0 ? `<div class="section-label" style="display:flex;justify-content:space-between;align-items:center;padding-right:20px"><span>${t('recent_searches')}</span><span style="font-size:10px;color:var(--a500);cursor:pointer;text-transform:none;letter-spacing:0" onclick="clearSearchHistory()">${t('clear')}</span></div>
          <div class="search-suggestions">${state.searchHistory.map(s => `<div class="suggestion-chip recent" onclick="onSearch('${s}');renderScreen('child-search')"><span>🕐</span> ${s}</div>`).join('')}</div>` : ''}
          <div class="section-label">${t('popular_searches')}</div>
          <div class="search-suggestions">${SEARCH_SUGGESTIONS.map(s => `<div class="suggestion-chip" onclick="onSearch('${tData(s)}');renderScreen('child-search')"><span>🔥</span> ${tData(s)}</div>`).join('')}</div>
        ` : ''}

        ${showTags ? `<div class="section-label">${t('browse_by_tag')}${state.settings.language === 'en' ? ' · تصفح بالتصنيف' : ''}</div>
        <div class="tag-grid">${TAGS.map(tg => `<div class="tag-chip ${state.selectedTags.has(tg.id)?'selected':''}" onclick="toggleTag('${tg.id}')"><span class="tag-emoji">${tg.icon}</span><div class="tag-text"><span class="tag-ar">${tg.nameAr}</span><span class="tag-en">${tg.nameEn}</span></div></div>`).join('')}</div>` : ''}

        ${results.length > 0 ? `<div class="section-label">${t('results')}${state.settings.language === 'en' ? ' · النتائج' : ''} (${results.length})</div><div class="video-grid">${results.map(v => renderVideoCard(v, 'small')).join('')}</div>`
          : (state.searchQuery || state.selectedTags.size > 0 || state.selectedCategory) ? `<div style="text-align:center;padding:40px 20px;color:var(--textLight)"><div style="font-size:40px;margin-bottom:8px">🔍</div><div style="font-size:14px">${t('no_videos_found')}</div></div>` : ''}
        <div style="height:16px"></div>
      </div>
      ${renderChildNav('search')}
    </div>`;
  },

  'video-player'() {
    const video = state.currentVideo || VIDEOS[0];
    const isSaved = state.savedVideos.has(video.id);
    const progress = state.videoProgress[video.id] || 0;
    const related = VIDEOS.filter(v => v.id !== video.id && (v.category === video.category || v.tags.some(t => video.tags.includes(t)))).slice(0, 5);
    const catName = getCategoryName(video.category);
    const totalSec = parseDuration(video.duration);

    return `<div class="scr-video-player">${renderStatusBar(true)}
      <div class="vp-header"><button class="vp-back" onclick="stopAndGoBack()">←</button><span class="vp-header-title">${t('now_playing')}</span><button class="vp-fullscreen" onclick="toggleFullscreen()">⛶</button></div>
      ${video.ytId
        ? `<div class="vp-player-yt"><iframe src="https://www.youtube.com/embed/${video.ytId}?modestbranding=1&controls=1&fs=1&playsinline=1&rel=0&iv_load_policy=3" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px"></iframe></div>`
        : `<div class="vp-player" style="background:linear-gradient(135deg,${video.grad[0]},${video.grad[1]})" onclick="togglePlay()"><div class="vp-player-bg">${video.icon}</div><div class="vp-play-btn" id="play-btn">${state.isPlaying ? '⏸' : '▶'}</div></div>`
      }
      <div class="vp-progress" onclick="seekVideo(event)"><div class="vp-progress-fill" id="progress-fill" style="width:${progress}%"></div></div>
      <div class="vp-time"><span id="time-current">${formatTime(Math.floor((progress/100)*totalSec))}</span><span>${video.duration}</span></div>
      <div class="vp-info"><div class="vp-title">${videoTitle(video)}</div><div class="vp-meta">${video.channel} · ${catName} · ${video.duration}</div></div>
      <div class="vp-actions">
        <div class="vp-action ${isSaved?'active':''}" onclick="toggleSave(${video.id})"><span class="vp-action-icon">${isSaved?'🔖':'📑'}</span><span>${isSaved?t('saved_label'):t('save')}</span></div>
        <div class="vp-action" onclick="showToast(t('liked'))"><span class="vp-action-icon">👍</span><span>${t('like')}</span></div>
        <div class="vp-action" onclick="showToast(t('link_copied'))"><span class="vp-action-icon">🔗</span><span>${t('share')}</span></div>
        <div class="vp-action" onclick="showReportSheet(${video.id})"><span class="vp-action-icon">🚩</span><span>${t('report')}</span></div>
      </div>
      <div class="vp-tags">${video.tags.map(tId => { const tag = TAGS.find(tg => tg.id === tId); return tag ? `<span class="vp-tag">${tag.icon} ${tagName(tag)}</span>` : ''; }).join('')}<span class="vp-tag">${catName}</span></div>
      <div class="vp-disclaimer"><span>⚠️</span><span>${t('yt_ads_warning')}</span></div>
      <div class="up-next-label"><span>${t('up_next')}${state.settings.language === 'en' ? ' · التالي' : ''}</span></div>
      ${related.map(v => renderUpNextItem(v)).join('')}
      <div style="height:24px"></div>
    </div>`;
  },

  saved() {
    const savedVids = VIDEOS.filter(v => state.savedVideos.has(v.id));
    return `${renderStatusBar(true)}<div class="scr-saved">
      <div class="saved-header"><div class="saved-title">${t('saved_title')}${state.settings.language === 'en' ? ' · المحفوظة' : ''}</div><div class="saved-count">${savedVids.length} ${t('videos_saved')}</div></div>
      <div class="saved-list scroll-y">${savedVids.length > 0 ? savedVids.map(v => renderSavedItem(v)).join('') : `<div class="saved-empty"><div class="saved-empty-icon">🔖</div><div>${t('no_saved_videos')}<br>${t('tap_save_btn')}</div></div>`}</div>
      ${renderChildNav('saved')}
    </div>`;
  },

  'parent-dash'() {
    const totalWatch = PROFILES.reduce((s, p) => s + p.watchTime, 0).toFixed(1);
    const totalVids = PROFILES.reduce((s, p) => s + p.videosWatched, 0);
    // Trigger rating prompt
    if (!state.ratingPromptShown) { setTimeout(() => showRatingPrompt(), 1500); }
    return `${renderStatusBar(true)}<div class="scr-parent-dash">
      <div class="pd-header">
        <div class="pd-top">
          <div class="pd-title">${t('parent_dashboard')}</div>
          <div style="display:flex;gap:8px;align-items:center">
            ${state.notifications > 0 ? `<div class="notif-badge" onclick="navigate('notifications')">${state.notifications}</div>` : ''}
            <button class="pd-settings" onclick="navigate('settings')">⚙️</button>
          </div>
        </div>
        <div class="pd-stats">
          <div class="pd-stat"><div class="pd-stat-val">${PROFILES.length}</div><div class="pd-stat-label">${t('profiles')}</div></div>
          <div class="pd-stat"><div class="pd-stat-val">${totalWatch}h</div><div class="pd-stat-label">${t('this_week')}</div></div>
          <div class="pd-stat"><div class="pd-stat-val">${totalVids}</div><div class="pd-stat-label">${t('videos')}</div></div>
        </div>
      </div>
      <div class="pd-body scroll-y">
        <div class="report-card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:13px;font-weight:700;color:var(--text)">${t('weekly_activity')}</span><span style="font-size:11px;color:var(--textLight)">${t('total')}: ${state.weeklyData.reduce((a,b)=>a+b,0)} ${t('min')}</span></div>${renderMiniChart(state.weeklyData)}</div>
        ${PROFILES.map((p, i) => `<div class="report-card">
          <div class="rc-header"><div class="rc-avatar" style="background:linear-gradient(135deg,${p.grad[0]},${p.grad[1]})">${p.initial}</div><div style="flex:1"><div class="rc-name">${p.name}</div><div class="rc-age">${t('age')} ${p.age} · ${p.ageLabel} · ${p.dailyLimit}${t('min_day')}</div></div></div>
          <div class="rc-stats"><div class="rc-stat"><div class="rc-stat-val">${p.watchTime}h</div><div class="rc-stat-label">${t('watch_time')}</div></div><div class="rc-stat"><div class="rc-stat-val">${p.videosWatched}</div><div class="rc-stat-label">${t('videos')}</div></div><div class="rc-stat"><div class="rc-stat-val">${p.topicsCount}</div><div class="rc-stat-label">${t('topics')}</div></div></div>
          <div class="rc-themes-label">${t('top_themes')}</div><div class="rc-themes">${p.themes.map(th => `<span class="rc-theme">${th}</span>`).join('')}</div>
          <div class="rc-history-label">${t('recent_history')}</div>
          ${VIDEOS.slice(i*2, i*2+2).map((v,j) => `<div class="rc-history-item" onclick="playVideo(${v.id})"><div class="rch-thumb" style="${thumbStyle(v)}">${!v.ytId ? v.icon : ''}</div><div><div class="rch-title">${videoTitle(v)}</div><div class="rch-meta">${j===0?`✅ ${t('completed')} · ${t('today')}`:`▶ 3:20 / ${v.duration} · ${t('yesterday')}`}</div></div></div>`).join('')}
          <div class="rc-actions"><button class="rc-btn rc-btn-primary" onclick="state.weeklyReportChild=${i};navigate('weekly-report')">${t('weekly_report')}</button><button class="rc-btn rc-btn-secondary" onclick="editProfile(${p.id})">${t('edit_profile')}</button></div>
        </div>`).join('')}
      </div>
      ${renderParentNav('home')}
    </div>`;
  },

  'parent-search'() {
    let results = VIDEOS;
    if (state.parentSearchQuery) { const q = state.parentSearchQuery.toLowerCase(); results = results.filter(v => v.title.toLowerCase().includes(q) || v.titleAr.includes(q) || v.channel.toLowerCase().includes(q)); }
    if (state.parentSearchAgeFilter) { results = results.filter(v => v.ageGroups.includes(state.parentSearchAgeFilter)); }
    if (state.parentSearchTags.size > 0) { results = results.filter(v => v.tags.some(t => state.parentSearchTags.has(t))); }

    return `${renderStatusBar(true)}<div class="scr-parent-search">
      <div class="ps-search-header">
        <div style="font-size:20px;font-weight:700;color:#fff;margin-bottom:12px">${t('browse_content')}</div>
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="${t('search_all')}" value="${state.parentSearchQuery}" oninput="state.parentSearchQuery=this.value;renderScreen('parent-search')">
          ${state.parentSearchQuery ? '<span class="search-clear" onclick="state.parentSearchQuery=\'\';renderScreen(\'parent-search\')">✕</span>' : ''}
        </div>
      </div>
      <div class="ps-filter-row">
        ${[null,'3-5','6-8','9-11','12-14'].map(ag => `<div class="ps-filter-chip ${state.parentSearchAgeFilter===ag?'active':''}" onclick="state.parentSearchAgeFilter=${ag===null?'null':"'"+ag+"'"};renderScreen('parent-search')">${ag || t('all_ages')}</div>`).join('')}
      </div>
      <div class="scroll-y">
        <div class="section-label">${t('tags')}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;padding:0 20px 12px">${TAGS.map(tg => `<div class="ps-filter-chip ${state.parentSearchTags.has(tg.id)?'active':''}" onclick="state.parentSearchTags.has('${tg.id}')?state.parentSearchTags.delete('${tg.id}'):state.parentSearchTags.add('${tg.id}');renderScreen('parent-search')">${tg.icon} ${tagName(tg)}</div>`).join('')}</div>
        <div class="section-label">${t('results')} (${results.length})</div>
        <div class="video-grid">${results.map(v => renderVideoCard(v, 'small')).join('')}</div>
        <div style="height:16px"></div>
      </div>
      ${renderParentNav('search')}
    </div>`;
  },

  'weekly-report'() {
    const p = PROFILES[state.weeklyReportChild] || PROFILES[0];
    const offset = state.weeklyReportWeekOffset;
    const weekData = state.weeklyData.map(v => Math.max(5, v + (offset * -8) + Math.floor(Math.random() * 10)));
    const totalMin = weekData.reduce((a, b) => a + b, 0);
    const themeData = [
      { name: '📖 Quran Stories', pct: 35, color: 'var(--catQuran)' },
      { name: '🤲 Prayer', pct: 25, color: 'var(--catPrayer)' },
      { name: '🎵 Nasheeds', pct: 18, color: 'var(--catNasheed)' },
      { name: '⭐ Virtues', pct: 12, color: 'var(--catVirtue)' },
      { name: '🌙 Prophets', pct: 10, color: 'var(--catProphet)' },
    ];

    return `${renderStatusBar(false)}<div class="scr-weekly-report">
      <div class="wr-header"><button class="back-btn" onclick="goBack()">←</button><span class="wr-title">${t('weekly_report')}</span></div>
      <div class="wr-child-selector">${PROFILES.map((pr, i) => `<div class="wr-child-chip ${state.weeklyReportChild===i?'active':''}" onclick="state.weeklyReportChild=${i};renderScreen('weekly-report')"><div class="wr-child-avatar" style="background:linear-gradient(135deg,${pr.grad[0]},${pr.grad[1]})">${pr.initial}</div><span class="wr-child-name">${pr.name}</span></div>`).join('')}</div>
      <div class="wr-week-nav">
        <div class="wr-week-arrow" onclick="state.weeklyReportWeekOffset++;renderScreen('weekly-report')">←</div>
        <div class="wr-week-label">${getWeekLabel(offset)}</div>
        <div class="wr-week-arrow ${offset===0?'disabled':''}" onclick="if(state.weeklyReportWeekOffset>0){state.weeklyReportWeekOffset--;renderScreen('weekly-report')}">→</div>
      </div>
      <div class="wr-summary">
        <div class="wr-summary-stat"><div class="wr-stat-val">${Math.floor(totalMin/60)}h ${totalMin%60}m</div><div class="wr-stat-label">${t('total_time')}</div></div>
        <div class="wr-summary-stat"><div class="wr-stat-val">${p.videosWatched + Math.abs(offset)*2}</div><div class="wr-stat-label">${t('videos')}</div></div>
        <div class="wr-summary-stat"><div class="wr-stat-val">${Math.floor(totalMin/7)}m</div><div class="wr-stat-label">${t('avg_day')}</div></div>
      </div>
      <div class="wr-chart-card">
        <div class="wr-chart-title">${t('daily_activity')}</div>
        ${renderMiniChart(weekData)}
      </div>
      <div class="wr-chart-card">
        <div class="wr-chart-title">${t('top_themes')}</div>
        ${themeData.map(t => `<div class="wr-bar-row"><div class="wr-bar-label">${t.name}</div><div class="wr-bar-track"><div class="wr-bar-fill" style="width:${t.pct}%;background:var(--p700)"><span class="wr-bar-value">${t.pct}%</span></div></div></div>`).join('')}
      </div>
      <div style="padding:0 20px 20px"><button class="btn-primary" style="width:100%" onclick="viewHistory(${state.weeklyReportChild})">${t('view_full_history')}</button></div>
    </div>`;
  },

  notifications() {
    const notifs = state.notificationsList;
    const unread = notifs.filter(n => !n.read).length;
    return `${renderStatusBar(false)}<div class="scr-notifications">
      <div class="notif-header">
        <button class="back-btn" onclick="goBack()">←</button>
        <span class="notif-title">${t('notifications')}</span>
        ${unread > 0 ? `<button class="notif-mark-all" onclick="markAllNotificationsRead()">${t('mark_all_read')}</button>` : ''}
      </div>
      <div class="notif-list scroll-y">
        ${notifs.length > 0 ? notifs.map(n => `<div class="notif-item ${n.read ? '' : 'unread'}" onclick="markNotificationRead(${n.id})">
          <span class="notif-icon">${n.icon}</span>
          <div class="notif-content">
            <div class="notif-item-title">${tData(n.title)}</div>
            <div class="notif-desc">${tData(n.desc)}</div>
            <div class="notif-time">${tData(n.time)}</div>
          </div>
        </div>`).join('') : `<div class="notif-empty"><div style="font-size:48px;margin-bottom:12px;opacity:0.5">🔔</div><div>${t('no_notifications')}</div></div>`}
      </div>
    </div>`;
  },

  'watch-history'() {
    const p = PROFILES[state.activeProfile];
    return `${renderStatusBar(false)}<div class="scr-watch-history">
      <div class="hist-header"><button class="back-btn" onclick="goBack()">←</button><span class="hist-title">${t('watch_history')}</span></div>
      <div class="hist-child"><div class="hist-c-avatar" style="background:linear-gradient(135deg,${p.grad[0]},${p.grad[1]})">${p.initial}</div><div><div class="hist-c-name">${p.name}${t('history')}</div><div class="hist-c-range">${t('last_7_days')} · ${p.videosWatched} ${t('videos')} · ${p.watchTime}h</div></div></div>
      <div class="scroll-y">
        <div class="hist-day">${t('today_label')}</div>${VIDEOS.slice(0,3).map((v,i) => renderHistoryItem(v, i<2, ['2:30 PM','2:15 PM','1:45 PM'][i])).join('')}
        <div class="hist-day">${t('yesterday_label')}</div>${VIDEOS.slice(3,6).map((v,i) => renderHistoryItem(v, i!==1, ['5:00 PM','4:45 PM','4:30 PM'][i])).join('')}
        <div class="hist-day">2 ${t('days_ago')}</div>${VIDEOS.slice(6,9).map((v,i) => renderHistoryItem(v, true, ['3:00 PM','2:30 PM','2:00 PM'][i])).join('')}
        <div style="height:40px"></div>
      </div>
    </div>`;
  },

  settings() {
    const atLimit = PROFILES.length >= 5;
    return `${renderStatusBar(false)}<div class="scr-settings">
      <div class="set-header"><button class="set-back" onclick="navigate('parent-dash')">←</button><span class="set-title">${t('settings')}</span></div>
      <div class="set-body scroll-y">
        <div class="set-section">${t('security')}</div>
        <div class="set-item" onclick="startChangePin()"><div class="set-item-left"><span class="set-icon">🔒</span><div><div class="set-label">${t('change_pin')}</div><div class="set-sublabel">${t('update_4digit')}</div></div></div><span class="set-chevron">›</span></div>
        <div class="set-item"><div class="set-item-left"><span class="set-icon">👆</span><div><div class="set-label">${t('biometric_unlock')}</div><div class="set-sublabel">${t('use_faceid')}</div></div></div><div class="set-toggle ${state.settings.biometric?'on':''}" onclick="toggleSetting('biometric',this)"></div></div>

        <div class="set-section">${t('child_profiles')}</div>
        ${PROFILES.map(p => `<div class="set-item" onclick="editProfile(${p.id})"><div class="set-item-left"><div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,${p.grad[0]},${p.grad[1]});display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;font-weight:700">${p.initial}</div><div><div class="set-label">${p.name}</div><div class="set-sublabel">${t('age')} ${p.age} · ${p.ageLabel} · ${p.dailyLimit}${t('min_day')}</div></div></div><span class="set-chevron">›</span></div>`).join('')}
        ${!atLimit ? `<div class="set-item" onclick="navigate('create-profile')" style="justify-content:center"><span style="color:var(--p700);font-weight:700;font-size:14px">${t('add_new_profile')}</span></div>` : ''}

        <div class="set-section">${t('preferences')}</div>
        <div class="set-item" onclick="toggleLanguage()"><div class="set-item-left"><span class="set-icon">🌐</span><div><div class="set-label">${t('language')}</div><div class="set-sublabel">${state.settings.language==='en'?'English':'العربية'}</div></div></div><span class="set-chevron">›</span></div>
        <div class="set-item"><div class="set-item-left"><span class="set-icon">🔔</span><div><div class="set-label">${t('notifications_setting')}</div><div class="set-sublabel">${t('watch_time_alerts')}</div></div></div><div class="set-toggle ${state.settings.notifications?'on':''}" onclick="toggleSetting('notifications',this)"></div></div>
        <div class="set-item"><div class="set-item-left"><span class="set-icon">🌙</span><div><div class="set-label">${t('bedtime_mode')}</div><div class="set-sublabel">${t('block_content_after')} ${state.settings.bedtimeHour>12?(state.settings.bedtimeHour-12):state.settings.bedtimeHour} ${t('pm')}</div></div></div><div class="set-toggle ${state.settings.bedtime?'on':''}" onclick="toggleSetting('bedtime',this)"></div></div>

        <div class="set-section">${t('appearance')}</div>
        <div class="set-item" onclick="cycleThemeFromSettings()"><div class="set-item-left"><span class="set-icon">🎨</span><div><div class="set-label">${t('theme')}</div><div class="set-sublabel">${THEMES.find(th=>th.id===state.theme)?.name||'Garden'}</div></div></div><span class="set-chevron">›</span></div>

        <div class="set-section">${t('account')}</div>
        <div class="set-item"><div class="set-item-left"><span class="set-icon">👤</span><div><div class="set-label">${t('account')}</div><div class="set-sublabel">parent@email.com</div></div></div><span class="set-chevron">›</span></div>
        <div class="set-item" onclick="showContactUs()"><div class="set-item-left"><span class="set-icon">📧</span><div><div class="set-label">${t('contact_us')}</div><div class="set-sublabel">${t('get_in_touch')}</div></div></div><span class="set-chevron">›</span></div>
        <div class="set-item" onclick="showToast(t('jazakallah'))"><div class="set-item-left"><span class="set-icon">💝</span><div><div class="set-label">${t('support_app')}</div><div class="set-sublabel">${t('make_donation')}</div></div></div><span class="set-chevron">›</span></div>

        <div class="set-section">${t('about')}</div>
        <div class="set-item"><div class="set-item-left"><span class="set-icon">ℹ️</span><div><div class="set-label">${t('about_app')}</div><div class="set-sublabel">${t('version')}</div></div></div><span class="set-chevron">›</span></div>
        <div class="set-item"><div class="set-item-left"><span class="set-icon">📜</span><div><div class="set-label">${t('privacy_policy')}</div></div></div><span class="set-chevron">›</span></div>
        <div class="set-item" onclick="confirmSignOut()"><div class="set-item-left"><span class="set-icon">🚪</span><div><div class="set-label" style="color:#D32F2F">${t('sign_out')}</div></div></div><span class="set-chevron">›</span></div>
        <div style="height:40px"></div>
      </div>
    </div>`;
  },
};

// ===== NAV RENDERERS =====
function renderChildNav(active) {
  const items = [{id:'home',screen:'child-home',icon:'🏠',labelKey:'home'},{id:'search',screen:'child-search',icon:'🔍',labelKey:'search_nav'},{id:'saved',screen:'saved',icon:'🔖',labelKey:'saved_nav'}];
  return `<div class="child-nav">${items.map(i => `<div class="nav-item ${active===i.id?'active':''}" onclick="navigate('${i.screen}')"><div class="nav-icon">${i.icon}</div><div class="nav-label">${t(i.labelKey)}</div><div class="nav-indicator"></div></div>`).join('')}</div>`;
}

function renderParentNav(active) {
  const items = [{id:'home',screen:'parent-dash',icon:'🏠',labelKey:'home'},{id:'search',screen:'parent-search',icon:'🔍',labelKey:'search_nav'},{id:'profiles',screen:'profiles',icon:'👤',labelKey:'profiles_nav'},{id:'settings',screen:'settings',icon:'⚙️',labelKey:'settings_nav'}];
  return `<div class="parent-nav">${items.map(i => `<div class="pnav-item ${active===i.id?'active':''}" onclick="navigate('${i.screen}')"><span class="pnav-icon">${i.icon}</span><span>${t(i.labelKey)}</span></div>`).join('')}</div>`;
}

// ===== NAVIGATION =====
function navigate(screenId) {
  if (screenId === state.currentScreen || state.transitioning) return;
  stopPlaybackSimulation();
  state.isPlaying = false;
  state.screenHistory.push(state.currentScreen);
  state.previousScreen = state.currentScreen;
  state.currentScreen = screenId;
  if (isParentScreen(screenId)) { state.parentLastActivity = Date.now(); }
  animateTransition(screenId, 'forward');
  updateScreenNav();
}

function goBack() {
  if (state.screenHistory.length === 0 || state.transitioning) return;
  // PIN gate: child mode exit requires PIN
  const prev = state.screenHistory[state.screenHistory.length - 1];
  if (isChildScreen(state.currentScreen) && !isChildScreen(prev)) {
    showExitPinGate(); return;
  }
  stopPlaybackSimulation();
  state.isPlaying = false;
  state.screenHistory.pop();
  state.previousScreen = state.currentScreen;
  state.currentScreen = prev;
  animateTransition(prev, 'back');
  updateScreenNav();
}

function stopAndGoBack() {
  stopPlaybackSimulation();
  state.isPlaying = false;
  // From video player, go back to previous child screen (no PIN gate needed)
  if (state.screenHistory.length === 0) return;
  const prev = state.screenHistory.pop();
  state.previousScreen = state.currentScreen;
  state.currentScreen = prev;
  animateTransition(prev, 'back');
  updateScreenNav();
}

function animateTransition(screenId, dir) {
  const container = document.getElementById('phone-screen-inner');
  const renderFn = screens[screenId];
  if (!renderFn) return;
  state.transitioning = true;
  const old = container.querySelector('.screen-wrapper.active');
  const nw = document.createElement('div');
  nw.className = `screen-wrapper ${dir === 'forward' ? 'entering-left' : 'entering-right'}`;
  nw.innerHTML = renderFn();
  container.appendChild(nw);
  if (!container.querySelector('.toast')) { const t = document.createElement('div'); t.className = 'toast'; t.id = 'toast'; container.appendChild(t); }
  requestAnimationFrame(() => {
    if (old) old.className = `screen-wrapper ${dir === 'forward' ? 'exiting-left' : 'exiting-right'}`;
    nw.className = 'screen-wrapper active';
    setTimeout(() => { if (old?.parentNode) old.remove(); state.transitioning = false; }, 350);
  });
}

function renderScreen(screenId) {
  const container = document.getElementById('phone-screen-inner');
  const renderFn = screens[screenId];
  if (!renderFn) return;
  const w = document.createElement('div');
  w.className = 'screen-wrapper active';
  w.innerHTML = renderFn();
  container.innerHTML = '';
  container.appendChild(w);
  const t = document.createElement('div'); t.className = 'toast'; t.id = 'toast'; container.appendChild(t);
}

function updateScreenNav() { document.querySelectorAll('.screen-nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.screen === state.currentScreen)); }

// ===== AUTH =====
function signIn(method) { showToast(`${t('signed_in_with')} ${method === 'guest' ? t('guest') : method}`); setTimeout(() => navigate(state.isFirstTime ? 'onboarding' : 'profiles'), 500); }

// ===== PROFILES =====
function selectProfile(i) { state.activeProfile = i; const p = PROFILES[i]; state.watchTimeTotal = p.dailyLimit; state.watchTimeLeft = Math.min(state.watchTimeLeft, p.dailyLimit); state.watchTimeWarningShown = false; state.showSkeleton = true; navigate('child-home'); }

function createProfile() {
  if (PROFILES.length >= 5) { showToast(t('max_5_profiles')); return; }
  const { name, ageGroup, avatar, language } = state.newProfile;
  if (!name.trim()) { showToast(t('enter_a_name')); return; }
  if (!ageGroup) { showToast(t('select_age_group')); return; }
  PROFILES.push({ id: nextProfileId++, name: name.trim(), age: parseInt(ageGroup.split('-')[0]) + 1, ageGroup, ageLabel: getAgeLabelForGroup(ageGroup), initial: name.trim()[0].toUpperCase(), grad: AVATARS[avatar].grad, watchTime: 0, videosWatched: 0, topicsCount: 0, themes: [], dailyLimit: 60 });
  state.newProfile = { name: '', ageGroup: '', avatar: 0, language: 'ar' };
  showToast(t('profile_created'));
  setTimeout(() => navigate('profiles'), 600);
}

function editProfile(pid) { const p = PROFILES.find(x => x.id === pid); if (p) { state.editingProfile = { ...p }; navigate('edit-profile'); } }
function updateEditAvatar(i) { state.editingProfile.grad = AVATARS[i].grad; renderScreen('edit-profile'); }
function updateEditAgeGroup(ag) { state.editingProfile.ageGroup = ag; state.editingProfile.ageLabel = getAgeLabelForGroup(ag); renderScreen('edit-profile'); }
function updateEditLimit(m) { state.editingProfile.dailyLimit = m; renderScreen('edit-profile'); }

function saveEditProfile() {
  const ep = state.editingProfile; if (!ep) return;
  const nameInput = document.getElementById('edit-name-input');
  if (nameInput) ep.name = nameInput.value.trim();
  if (!ep.name) { showToast(t('name_empty')); return; }
  const idx = PROFILES.findIndex(p => p.id === ep.id);
  if (idx >= 0) { ep.initial = ep.name[0].toUpperCase(); PROFILES[idx] = { ...PROFILES[idx], ...ep }; showToast(`${ep.name} ${t('updated')}`); setTimeout(() => goBack(), 600); }
}

function confirmDeleteProfile(pid) {
  if (PROFILES.length <= 1) { showToast(t('cannot_delete_last')); return; }
  const p = PROFILES.find(x => x.id === pid); if (!p) return;
  const container = document.getElementById('phone-screen-inner');
  const m = document.createElement('div'); m.className = 'modal-overlay'; m.id = 'delete-modal';
  m.innerHTML = `<div class="modal-box"><div class="modal-icon">⚠️</div><div class="modal-title">${t('delete')} ${p.name}?</div><div class="modal-desc">${t('delete_desc')}</div><button class="modal-btn" style="background:#D32F2F" onclick="deleteProfile(${pid})">${t('delete_confirm')}</button><button class="modal-btn" style="background:var(--border);color:var(--text);margin-top:8px" onclick="closeModal('delete-modal')">${t('cancel')}</button></div>`;
  container.appendChild(m); requestAnimationFrame(() => m.classList.add('show'));
}

function deleteProfile(pid) {
  const idx = PROFILES.findIndex(p => p.id === pid);
  if (idx >= 0) { const n = PROFILES[idx].name; PROFILES.splice(idx, 1); if (state.activeProfile >= PROFILES.length) state.activeProfile = 0; closeModal('delete-modal'); showToast(`${n} ${t('deleted')}`); setTimeout(() => navigate('profiles'), 600); }
}

function selectAvatar(i) { state.newProfile.avatar = i; renderScreen('create-profile'); }
function selectAgeGroup(ag) { state.newProfile.ageGroup = ag; renderScreen('create-profile'); }
function selectLang(l) { state.newProfile.language = l; renderScreen('create-profile'); }

// ===== PIN =====
function pressPin(d) {
  if (state.pinLockedUntil && Date.now() < state.pinLockedUntil) return;
  if (state.pinCode.length >= 4) return;
  state.pinCode += d; updatePinDots();
  if (state.pinCode.length === 4) {
    if (state.pinCode === state.correctPin) {
      state.pinFailCount = 0;
      document.querySelectorAll('.pin-dot').forEach(d => { d.style.background = '#48BB78'; d.style.borderColor = '#48BB78'; });
      const el = document.getElementById('pin-success'); if (el) el.style.display = 'block';
      setTimeout(() => { state.pinCode = ''; navigate('parent-dash'); }, 600);
    } else {
      state.pinFailCount++;
      document.querySelectorAll('.pin-dot').forEach(d => d.classList.add('error'));
      if (state.pinFailCount >= 5) {
        state.pinLockedUntil = Date.now() + 30000;
        showToast(t('locked_30s'));
        startPinLockTimer();
      } else {
        showToast(`${t('incorrect_pin')} (${state.pinFailCount}/5)`);
      }
      setTimeout(() => { state.pinCode = ''; renderScreen('pin'); }, 500);
    }
  }
}
function deletePin() { if (state.pinCode.length > 0) { state.pinCode = state.pinCode.slice(0, -1); updatePinDots(); } }
function updatePinDots() { document.querySelectorAll('.pin-dot').forEach((d, i) => d.classList.toggle('filled', i < state.pinCode.length)); }

function startPinLockTimer() {
  const interval = setInterval(() => {
    if (!state.pinLockedUntil || Date.now() >= state.pinLockedUntil) {
      clearInterval(interval); state.pinLockedUntil = null; state.pinFailCount = 0;
      if (state.currentScreen === 'pin') renderScreen('pin');
      return;
    }
    if (state.currentScreen === 'pin') {
      const el = document.querySelector('.pin-lockout-timer');
      if (el) el.textContent = Math.ceil((state.pinLockedUntil - Date.now()) / 1000) + 's';
    }
  }, 1000);
}

function biometricUnlock() {
  if (!state.settings.biometric) { showToast(t('biometric_disabled')); return; }
  document.querySelectorAll('.pin-dot').forEach(d => { d.classList.add('filled'); d.style.background = '#48BB78'; d.style.borderColor = '#48BB78'; });
  const el = document.getElementById('pin-success'); if (el) { el.style.display = 'block'; el.textContent = t('face_id_verified'); }
  state.pinFailCount = 0;
  setTimeout(() => { state.pinCode = ''; navigate('parent-dash'); }, 600);
}

// PIN Setup
function finishOnboarding() {
  // Create inline profile if data was entered
  const op = state.onboardingProfile;
  if (op.name.trim() && op.ageGroup) {
    PROFILES.push({ id: nextProfileId++, name: op.name.trim(), age: parseInt(op.ageGroup.split('-')[0]) + 1, ageGroup: op.ageGroup, ageLabel: getAgeLabelForGroup(op.ageGroup), initial: op.name.trim()[0].toUpperCase(), grad: AVATARS[op.avatar].grad, watchTime: 0, videosWatched: 0, topicsCount: 0, themes: [], dailyLimit: 60 });
  }
  state.onboardingStep = 0; state.isFirstTime = false; state.pinMode = 'setup'; state.pinCode = ''; navigate('pin-setup');
}

function pressPinSetup(d) {
  if (state.pinCode.length >= 4) return;
  state.pinCode += d; updatePinDots();
  if (state.pinCode.length === 4) {
    if (state.pinMode === 'verify-current') {
      if (state.pinCode === state.correctPin) {
        state.pinCode = ''; state.pinMode = 'setup';
        showToast(t('verified_set_new'));
        setTimeout(() => renderScreen('pin-setup'), 300);
      } else {
        document.querySelectorAll('.pin-dot').forEach(d => d.classList.add('error'));
        showToast(t('incorrect_pin'));
        setTimeout(() => { state.pinCode = ''; renderScreen('pin-setup'); }, 500);
      }
    } else if (state.pinMode === 'setup') {
      state.pinSetupFirst = state.pinCode; state.pinCode = ''; state.pinMode = 'confirm';
      setTimeout(() => renderScreen('pin-setup'), 300);
    } else {
      if (state.pinCode === state.pinSetupFirst) {
        state.correctPin = state.pinCode;
        document.querySelectorAll('.pin-dot').forEach(d => { d.style.background = '#48BB78'; d.style.borderColor = '#48BB78'; });
        const el = document.getElementById('pin-success'); if (el) el.style.display = 'block';
        showToast(t('pin_created_toast'));
        setTimeout(() => { state.pinCode = ''; state.pinMode = 'enter'; navigate('profiles'); }, 800);
      } else {
        document.querySelectorAll('.pin-dot').forEach(d => d.classList.add('error'));
        showToast(t('pins_dont_match')); setTimeout(() => { state.pinCode = ''; state.pinMode = 'setup'; state.pinSetupFirst = ''; renderScreen('pin-setup'); }, 600);
      }
    }
  }
}
function deletePinSetup() { if (state.pinCode.length > 0) { state.pinCode = state.pinCode.slice(0, -1); updatePinDots(); } }
function startChangePin() { state.pinMode = 'verify-current'; state.pinCode = ''; state.pinSetupFirst = ''; navigate('pin-setup'); }

// Onboarding
function nextOnboarding() { if (state.onboardingStep < ONBOARDING_STEPS.length - 1) { state.onboardingStep++; renderScreen('onboarding'); } }
function prevOnboarding() { if (state.onboardingStep > 0) { state.onboardingStep--; renderScreen('onboarding'); } }

// Forgot PIN
function submitForgotPinEmail() {
  if (!state.forgotPinEmail.includes('@')) { showToast(t('enter_valid_email')); return; }
  state.forgotPinStep = 1; renderScreen('forgot-pin');
}
function pressForgotPin(d) {
  if (state.pinCode.length >= 4) return;
  state.pinCode += d; updatePinDots();
  if (state.pinCode.length === 4) {
    if (state.forgotPinStep === 2) {
      state.forgotPinFirst = state.pinCode; state.pinCode = ''; state.forgotPinStep = 3;
      setTimeout(() => renderScreen('forgot-pin'), 300);
    } else if (state.forgotPinStep === 3) {
      if (state.pinCode === state.forgotPinFirst) {
        state.correctPin = state.pinCode;
        document.querySelectorAll('.pin-dot').forEach(d => { d.style.background = '#48BB78'; d.style.borderColor = '#48BB78'; });
        const el = document.getElementById('pin-success'); if (el) el.style.display = 'block';
        showToast(t('pin_reset_success'));
        state.pinFailCount = 0; state.pinLockedUntil = null;
        setTimeout(() => { state.pinCode = ''; state.forgotPinStep = 0; navigate('pin'); }, 800);
      } else {
        document.querySelectorAll('.pin-dot').forEach(d => d.classList.add('error'));
        showToast(t('pins_dont_match'));
        setTimeout(() => { state.pinCode = ''; state.forgotPinStep = 2; state.forgotPinFirst = ''; renderScreen('forgot-pin'); }, 600);
      }
    }
  }
}

// ===== EXIT PIN GATE =====
function showExitPinGate() {
  state.exitPinCode = '';
  const container = document.getElementById('phone-screen-inner');
  // Remove existing overlay if any
  const existing = container.querySelector('.exit-pin-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'exit-pin-overlay';
  overlay.id = 'exit-pin-overlay';
  overlay.innerHTML = `
    <div class="exit-pin-title">${t('pin_required')}</div>
    <div class="exit-pin-subtitle">${t('enter_pin_leave_child')}</div>
    <div class="exit-pin-dots">${Array.from({length:4},()=>'<div class="exit-pin-dot"></div>').join('')}</div>
    <div class="exit-pin-pad">
      ${[1,2,3,4,5,6,7,8,9].map(n=>`<div class="exit-pin-key" onclick="pressExitPin('${n}')">${n}</div>`).join('')}
      <div class="exit-pin-key empty"></div>
      <div class="exit-pin-key" onclick="pressExitPin('0')">0</div>
      <div class="exit-pin-key" onclick="deleteExitPin()">⌫</div>
    </div>
    <div class="exit-pin-cancel" onclick="cancelExitGate()">${t('cancel')}</div>`;
  container.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

function pressExitPin(d) {
  if (state.exitPinCode.length >= 4) return;
  state.exitPinCode += d;
  document.querySelectorAll('.exit-pin-dot').forEach((dot, i) => dot.classList.toggle('filled', i < state.exitPinCode.length));
  if (state.exitPinCode.length === 4) {
    if (state.exitPinCode === state.correctPin) {
      cancelExitGate();
      state.screenHistory = [];
      navigate('profiles');
    } else {
      showToast(t('incorrect_pin'));
      document.querySelectorAll('.exit-pin-dot').forEach(d => { d.style.background = '#E53E3E'; d.style.borderColor = '#E53E3E'; });
      setTimeout(() => { state.exitPinCode = ''; document.querySelectorAll('.exit-pin-dot').forEach(d => { d.classList.remove('filled'); d.style.background = ''; d.style.borderColor = ''; }); }, 500);
    }
  }
}
function deleteExitPin() { if (state.exitPinCode.length > 0) { state.exitPinCode = state.exitPinCode.slice(0, -1); document.querySelectorAll('.exit-pin-dot').forEach((d, i) => d.classList.toggle('filled', i < state.exitPinCode.length)); } }
function cancelExitGate() { const o = document.getElementById('exit-pin-overlay'); if (o) { o.classList.remove('show'); setTimeout(() => o.remove(), 300); } }

// ===== VIDEO PLAYBACK =====
function playVideo(id) {
  const v = VIDEOS.find(x => x.id === id); if (!v) return;
  if (state.isOffline) { showToast(t('no_internet_play')); return; }
  if (state.watchTimeLeft <= 0) { showToast(t('watch_time_up_toast')); return; }
  state.currentVideo = v; state.isPlaying = false;
  if (!state.videoProgress[id]) state.videoProgress[id] = 0;
  if (state.searchQuery && !state.searchHistory.includes(state.searchQuery)) { state.searchHistory.unshift(state.searchQuery); if (state.searchHistory.length > 5) state.searchHistory.pop(); }
  navigate('video-player');
}

function togglePlay() {
  state.isPlaying = !state.isPlaying;
  const btn = document.getElementById('play-btn'); if (btn) btn.textContent = state.isPlaying ? '⏸' : '▶';
  if (state.isPlaying) startPlaybackSimulation(); else stopPlaybackSimulation();
}

let playbackInterval;
function startPlaybackSimulation() {
  clearInterval(playbackInterval);
  playbackInterval = setInterval(() => {
    if (!state.isPlaying || !state.currentVideo) return;
    let pct = state.videoProgress[state.currentVideo.id] || 0;
    pct += 0.8;
    if (pct >= 100) {
      pct = 100; state.isPlaying = false; clearInterval(playbackInterval);
      state.continueWatching = state.continueWatching.filter(c => c.videoId !== state.currentVideo.id);
      autoPlayNext(); return;
    }
    const cw = state.continueWatching.find(c => c.videoId === state.currentVideo.id);
    if (cw) { cw.progress = pct; cw.lastWatched = { en: 'Just now', ar: 'الآن' }; }
    else { state.continueWatching.unshift({ videoId: state.currentVideo.id, progress: pct, lastWatched: { en: 'Just now', ar: 'الآن' } }); if (state.continueWatching.length > 4) state.continueWatching.pop(); }
    state.videoProgress[state.currentVideo.id] = pct;
    const fill = document.getElementById('progress-fill'), timeEl = document.getElementById('time-current');
    if (fill) fill.style.width = pct + '%';
    if (timeEl) timeEl.textContent = formatTime(Math.floor((pct / 100) * parseDuration(state.currentVideo.duration)));
    if (Math.random() < 0.15) { state.watchTimeLeft = Math.max(0, state.watchTimeLeft - 1); checkWatchTime(); }
  }, 200);
}

function stopPlaybackSimulation() { clearInterval(playbackInterval); }

function autoPlayNext() {
  if (!state.currentVideo) return;
  const r = VIDEOS.filter(v => v.id !== state.currentVideo.id && (v.category === state.currentVideo.category || v.tags.some(t => state.currentVideo.tags.includes(t))));
  if (r.length > 0) { showToast(t('playing_next')); setTimeout(() => { state.currentVideo = r[0]; state.isPlaying = false; if (!state.videoProgress[r[0].id]) state.videoProgress[r[0].id] = 0; renderScreen('video-player'); }, 1000); }
}

function seekVideo(e) {
  const rect = e.currentTarget.getBoundingClientRect(), pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
  const fill = document.getElementById('progress-fill'); if (fill) fill.style.width = pct + '%';
  if (state.currentVideo) state.videoProgress[state.currentVideo.id] = pct;
}

function toggleSave(id) { if (state.savedVideos.has(id)) { state.savedVideos.delete(id); showToast(t('removed')); } else { state.savedVideos.add(id); showToast(t('saved_toast')); } renderScreen(state.currentScreen); }

// ===== REPORT VIDEO SHEET =====
function showReportSheet(videoId) {
  state.reportReason = '';
  const container = document.getElementById('phone-screen-inner');
  const existing = container.querySelector('.report-sheet-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'report-sheet-overlay';
  overlay.id = 'report-sheet-overlay';
  overlay.innerHTML = `<div class="report-sheet">
    <div class="report-handle"></div>
    <div class="report-title">${t('report_video')}</div>
    ${REPORT_REASONS.map(r => `<div class="report-option" onclick="selectReportReason(this,'${r.en}')"><div class="report-radio"></div><span class="report-option-text">${tData(r)}</span></div>`).join('')}
    <textarea class="report-textarea" placeholder="${t('additional_details')}" oninput="state.reportDetails=this.value"></textarea>
    <div class="report-actions">
      <button class="report-submit" onclick="submitReport()">${t('submit_report')}</button>
      <button class="report-cancel" onclick="closeReportSheet()">${t('cancel')}</button>
    </div>
  </div>`;
  container.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

function selectReportReason(el, reason) {
  state.reportReason = reason;
  document.querySelectorAll('.report-option').forEach(o => o.classList.remove('selected'));
  document.querySelectorAll('.report-radio').forEach(r => r.classList.remove('checked'));
  el.classList.add('selected');
  el.querySelector('.report-radio').classList.add('checked');
}

function submitReport() {
  if (!state.reportReason) { showToast(t('select_reason')); return; }
  state.notifications++;
  state.notificationsList.unshift({ id: Date.now(), type: 'report', title: { en: 'Video Reported', ar: 'تم الإبلاغ عن فيديو' }, desc: { en: `Reason: ${state.reportReason}`, ar: `${t('reason')}: ${state.reportReason}` }, time: { en: 'Just now', ar: 'الآن' }, read: false, icon: '🚩' });
  closeReportSheet();
  showToast(t('report_submitted'));
}

function closeReportSheet() {
  const o = document.getElementById('report-sheet-overlay');
  if (o) { o.classList.remove('show'); setTimeout(() => o.remove(), 300); }
}

// ===== WATCH TIME =====
function checkWatchTime() {
  if (state.watchTimeLeft <= 5 && state.watchTimeLeft > 0 && !state.watchTimeWarningShown) { state.watchTimeWarningShown = true; const m = document.getElementById('watch-modal'); if (m) m.classList.add('show'); }
  if (state.watchTimeLeft <= 0) { state.isPlaying = false; stopPlaybackSimulation(); const m = document.getElementById('timeup-modal'); if (m) m.classList.add('show'); else showToast(t('watch_time_up_toast')); }
}
function exitToProfiles() { closeModal('timeup-modal'); state.screenHistory = []; navigate('profiles'); }

// ===== SEARCH =====
function browseCategory(catId) { state.selectedCategory = catId; state.searchQuery = ''; state.selectedTags.clear(); navigate('child-search'); }
function clearCategory() { state.selectedCategory = null; renderScreen('child-search'); }
function onSearch(q) { state.searchQuery = q; state.selectedCategory = null; clearTimeout(window._st); window._st = setTimeout(() => renderScreen('child-search'), 200); }
function clearSearch() { state.searchQuery = ''; renderScreen('child-search'); }
function clearSearchHistory() { state.searchHistory = []; renderScreen('child-search'); }
function toggleTag(id) { state.selectedTags.has(id) ? state.selectedTags.delete(id) : state.selectedTags.add(id); renderScreen('child-search'); }
function viewHistory(i) { state.activeProfile = i; navigate('watch-history'); }

// ===== NOTIFICATIONS =====
function markNotificationRead(id) {
  const n = state.notificationsList.find(x => x.id === id);
  if (n && !n.read) { n.read = true; state.notifications = Math.max(0, state.notifications - 1); }
  renderScreen('notifications');
}
function markAllNotificationsRead() {
  state.notificationsList.forEach(n => n.read = true);
  state.notifications = 0;
  renderScreen('notifications');
  showToast(t('all_read'));
}

// ===== SETTINGS =====
function toggleSetting(key, el) { state.settings[key] = !state.settings[key]; el.classList.toggle('on'); showToast(`${key} ${state.settings[key] ? t('enabled') : t('disabled')}`); }
function toggleLanguage() { state.settings.language = state.settings.language === 'en' ? 'ar' : 'en'; applyLanguageDirection(); showToast(`${t('language')}: ${state.settings.language === 'en' ? 'English' : 'العربية'}`); renderScreen(state.currentScreen); }
function applyLanguageDirection() {
  const dir = state.settings.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', state.settings.language);
  const phoneScreen = document.getElementById('phone-screen-inner');
  if (phoneScreen) phoneScreen.setAttribute('dir', dir);
  // Update lang toggle button active state
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.classList.toggle('active', state.settings.language === 'ar');
}
function cycleThemeFromSettings() { const ids = THEMES.map(t => t.id); setTheme(ids[(ids.indexOf(state.theme) + 1) % ids.length]); renderScreen('settings'); }

function showContactUs() {
  const container = document.getElementById('phone-screen-inner');
  const m = document.createElement('div'); m.className = 'modal-overlay'; m.id = 'contact-modal';
  m.innerHTML = `<div class="modal-box"><div class="modal-icon">📧</div><div class="modal-title">${t('contact_us_title')}</div><div class="modal-desc" style="text-align:${state.settings.language === 'ar' ? 'right' : 'left'}"><strong>${t('email_label')}</strong> support@muslimkidsvp.com<br><br>${t('please_include')}:<br>• ${t('your_account_email')}<br>• ${t('device_model')}<br>• ${t('app_version')}<br>• ${t('issue_desc')}</div><button class="modal-btn" onclick="showToast(t('opening_email'));closeModal('contact-modal')">${t('send_email')}</button><button class="modal-btn" style="background:var(--border);color:var(--text);margin-top:8px" onclick="closeModal('contact-modal')">${t('close')}</button></div>`;
  container.appendChild(m); requestAnimationFrame(() => m.classList.add('show'));
}

function confirmSignOut() {
  const container = document.getElementById('phone-screen-inner');
  const m = document.createElement('div'); m.className = 'modal-overlay'; m.id = 'signout-modal';
  m.innerHTML = `<div class="modal-box"><div class="modal-icon">🚪</div><div class="modal-title">${t('sign_out_confirm')}</div><div class="modal-desc">${t('are_you_sure')}</div><button class="modal-btn" style="background:#D32F2F" onclick="doSignOut()">${t('sign_out')}</button><button class="modal-btn" style="background:var(--border);color:var(--text);margin-top:8px" onclick="closeModal('signout-modal')">${t('cancel')}</button></div>`;
  container.appendChild(m); requestAnimationFrame(() => m.classList.add('show'));
}
function doSignOut() { closeModal('signout-modal'); showToast(t('signed_out')); setTimeout(() => navigate('signin'), 500); }

// ===== RATING PROMPT =====
function showRatingPrompt() {
  if (state.ratingPromptShown) return;
  state.ratingPromptShown = true;
  const container = document.getElementById('phone-screen-inner');
  const m = document.createElement('div'); m.className = 'modal-overlay'; m.id = 'rating-modal';
  m.innerHTML = `<div class="modal-box">
    <div class="modal-icon">⭐</div>
    <div class="modal-title">${t('enjoying_app')}</div>
    <div class="modal-desc">${t('rating_desc')}</div>
    <div class="rating-stars">${[1,2,3,4,5].map(i => `<span class="rating-star" onclick="selectRating(${i})">★</span>`).join('')}</div>
    <button class="modal-btn" onclick="showToast(t('thank_rating'));closeModal('rating-modal')">${t('rate_now')}</button>
    <span class="rating-dismiss" onclick="closeModal('rating-modal')">${t('maybe_later_rating')}</span>
    <span class="rating-dismiss" onclick="closeModal('rating-modal')">${t('dont_ask_again')}</span>
  </div>`;
  container.appendChild(m); requestAnimationFrame(() => m.classList.add('show'));
}

function selectRating(stars) {
  state.ratingStars = stars;
  document.querySelectorAll('.rating-star').forEach((s, i) => s.classList.toggle('active', i < stars));
}

// ===== FULLSCREEN =====
function toggleFullscreen() {
  state.isFullscreen = !state.isFullscreen;
  const frame = document.querySelector('.phone-frame');
  if (frame) frame.classList.toggle('landscape', state.isFullscreen);
  showToast(state.isFullscreen ? t('landscape_mode') : t('portrait_mode'));
}

// ===== THEME =====
function setTheme(id) { state.theme = id; if (id === 'garden') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', id); document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === id)); }

// ===== OFFLINE =====
function toggleOfflineMode() {
  state.isOffline = !state.isOffline;
  const btn = document.getElementById('offline-toggle');
  if (btn) btn.classList.toggle('active', state.isOffline);
  renderScreen(state.currentScreen);
}

// ===== TOAST & MODAL =====
function showToast(msg) { const t = document.getElementById('toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(window._tt); window._tt = setTimeout(() => t.classList.remove('show'), 2000); }
function closeModal(id) { const m = document.getElementById(id || 'watch-modal'); if (m) { m.classList.remove('show'); setTimeout(() => { if (m.parentNode && !['watch-modal','timeup-modal'].includes(m.id)) m.remove(); }, 300); } }

// ===== INIT =====
function init() {
  document.getElementById('theme-switcher').innerHTML = THEMES.map(t => `<button class="theme-btn ${t.id===state.theme?'active':''}" data-theme="${t.id}" onclick="setTheme('${t.id}')"><div class="theme-swatch" style="background:${t.swatch}"></div>${t.name}</button>`).join('');
  document.getElementById('proto-controls').innerHTML = `<button class="proto-toggle" id="offline-toggle" onclick="toggleOfflineMode()">📡 Offline Mode</button><button class="proto-toggle" id="lang-toggle" onclick="toggleLanguage()">🌐 العربية / English</button>`;
  document.getElementById('screen-nav').innerHTML = SCREEN_LIST.map(s => `<button data-screen="${s.id}" ${s.id==='splash'?'class="active"':''} onclick="state.pinCode='';state.screenHistory=[];navigate('${s.id}')">${s.label}</button>`).join('');
  renderScreen('splash');
  setTimeout(() => { if (state.currentScreen === 'splash') navigate('signin'); }, 3000);
}

document.addEventListener('DOMContentLoaded', init);
