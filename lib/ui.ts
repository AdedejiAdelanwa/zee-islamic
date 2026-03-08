/**
 * UI string localisation for the Zee Islamic frontend.
 *
 * Covers all locales that have Quran translations ingested.
 * Any key missing from a locale falls back to English.
 */

type UIStrings = {
  home: string;
  quran: string;
  quranFull: string;
  quranSubtitle: string;
  surahs: string;
  juz: string;
  juzCount: string;
  meccan: string;
  medinan: string;
  chapters: string;
  verses: string;
  verseLabel: string;
  surahLabel: string;
  page: string;
  view: string;
  previousSurah: string;
  nextSurah: string;
  previous: string;
  next: string;
  translation: string;
  selectTranslation: string;
  tafsir: string;
  selectTafsir: string;
  tafsirUnavailable: string;
  shareVerse: string;
  readArrow: string;
};

const en: UIStrings = {
  home: "Home",
  quran: "Quran",
  quranFull: "The Holy Quran",
  quranSubtitle: "The word of Allah revealed to Prophet Muhammad ﷺ",
  surahs: "114 Surahs",
  juz: "Juz",
  juzCount: "30 Juz",
  meccan: "Meccan",
  medinan: "Medinan",
  chapters: "Chapters",
  verses: "verses",
  verseLabel: "Verse",
  surahLabel: "Surah",
  page: "Page",
  view: "View →",
  previousSurah: "Previous Surah",
  nextSurah: "Next Surah",
  previous: "Previous",
  next: "Next",
  translation: "Translation",
  selectTranslation: "Select translation",
  tafsir: "Tafsir",
  selectTafsir: "Select tafsir source",
  tafsirUnavailable: "Tafsir not yet available for this verse.",
  shareVerse: "Share this verse",
  readArrow: "Read →",
};

const ar: UIStrings = {
  home: "الرئيسية",
  quran: "القرآن",
  quranFull: "القرآن الكريم",
  quranSubtitle: "كلام الله المنزّل على سيدنا محمد ﷺ",
  surahs: "١١٤ سورة",
  juz: "الجزء",
  juzCount: "٣٠ جزءًا",
  meccan: "مكية",
  medinan: "مدنية",
  chapters: "السور",
  verses: "آية",
  verseLabel: "الآية",
  surahLabel: "السورة",
  page: "الصفحة",
  view: "← عرض",
  previousSurah: "السورة السابقة",
  nextSurah: "السورة التالية",
  previous: "الآية السابقة",
  next: "الآية التالية",
  translation: "الترجمة",
  selectTranslation: "اختر الترجمة",
  tafsir: "التفسير",
  selectTafsir: "اختر التفسير",
  tafsirUnavailable: "التفسير غير متاح لهذه الآية حالياً.",
  shareVerse: "مشاركة الآية",
  readArrow: "اقرأ ←",
};

const ur: UIStrings = {
  home: "ہوم",
  quran: "قرآن",
  quranFull: "قرآن مجید",
  quranSubtitle: "اللہ کا کلام جو نبی محمد ﷺ پر نازل ہوا",
  surahs: "١١٤ سورتیں",
  juz: "پارہ",
  juzCount: "٣٠ پارے",
  meccan: "مکی",
  medinan: "مدنی",
  chapters: "سورتیں",
  verses: "آیات",
  verseLabel: "آیت",
  surahLabel: "سورۃ",
  page: "صفحہ",
  view: "← دیکھیں",
  previousSurah: "پچھلی سورت",
  nextSurah: "اگلی سورت",
  previous: "پچھلی آیت",
  next: "اگلی آیت",
  translation: "ترجمہ",
  selectTranslation: "ترجمہ منتخب کریں",
  tafsir: "تفسیر",
  selectTafsir: "تفسیر منتخب کریں",
  tafsirUnavailable: "اس آیت کی تفسیر ابھی دستیاب نہیں۔",
  shareVerse: "آیت شیئر کریں",
  readArrow: "پڑھیں ←",
};

const fa: UIStrings = {
  home: "خانه",
  quran: "قرآن",
  quranFull: "قرآن کریم",
  quranSubtitle: "کلام خدا که بر پیامبر محمد ﷺ نازل شد",
  surahs: "١١٤ سوره",
  juz: "جزء",
  juzCount: "٣٠ جزء",
  meccan: "مکی",
  medinan: "مدنی",
  chapters: "سوره‌ها",
  verses: "آیه",
  verseLabel: "آیه",
  surahLabel: "سوره",
  page: "صفحه",
  view: "← مشاهده",
  previousSurah: "سوره قبلی",
  nextSurah: "سوره بعدی",
  previous: "آیه قبلی",
  next: "آیه بعدی",
  translation: "ترجمه",
  selectTranslation: "انتخاب ترجمه",
  tafsir: "تفسیر",
  selectTafsir: "انتخاب تفسیر",
  tafsirUnavailable: "تفسیر برای این آیه در دسترس نیست.",
  shareVerse: "اشتراک‌گذاری آیه",
  readArrow: "بخوانید ←",
};

const fr: Partial<UIStrings> = {
  home: "Accueil",
  quran: "Coran",
  quranFull: "Le Saint Coran",
  quranSubtitle: "La parole d'Allah révélée au Prophète Muhammad ﷺ",
  surahs: "114 Sourates",
  meccan: "Mecquoise",
  medinan: "Médinoise",
  chapters: "Chapitres",
  verses: "versets",
  verseLabel: "Verset",
  surahLabel: "Sourate",
  previousSurah: "Sourate précédente",
  nextSurah: "Sourate suivante",
  previous: "Précédent",
  next: "Suivant",
  translation: "Traduction",
  selectTranslation: "Choisir la traduction",
  tafsir: "Tafsir",
  selectTafsir: "Choisir le tafsir",
  tafsirUnavailable: "Tafsir non disponible pour ce verset.",
  shareVerse: "Partager ce verset",
  readArrow: "Lire →",
};

const de: Partial<UIStrings> = {
  home: "Startseite",
  quran: "Koran",
  quranFull: "Der Heilige Koran",
  quranSubtitle: "Das Wort Allahs, offenbart dem Propheten Muhammad ﷺ",
  surahs: "114 Suren",
  meccan: "Mekkanisch",
  medinan: "Medinensisch",
  chapters: "Kapitel",
  verses: "Verse",
  verseLabel: "Vers",
  surahLabel: "Sure",
  previousSurah: "Vorherige Sure",
  nextSurah: "Nächste Sure",
  previous: "Vorheriger",
  next: "Nächster",
  translation: "Übersetzung",
  selectTranslation: "Übersetzung wählen",
  tafsir: "Tafsir",
  selectTafsir: "Tafsir-Quelle wählen",
  tafsirUnavailable: "Tafsir für diesen Vers noch nicht verfügbar.",
  shareVerse: "Vers teilen",
  readArrow: "Lesen →",
};

const tr: Partial<UIStrings> = {
  home: "Ana Sayfa",
  quran: "Kuran",
  quranFull: "Yüce Kuran",
  quranSubtitle: "Hz. Muhammed ﷺ'e vahyedilen Allah'ın kelamı",
  surahs: "114 Sure",
  meccan: "Mekki",
  medinan: "Medeni",
  chapters: "Sureler",
  verses: "ayet",
  verseLabel: "Ayet",
  surahLabel: "Sure",
  previousSurah: "Önceki Sure",
  nextSurah: "Sonraki Sure",
  previous: "Önceki",
  next: "Sonraki",
  translation: "Tercüme",
  selectTranslation: "Tercüme seç",
  tafsir: "Tefsir",
  selectTafsir: "Tefsir kaynağı seç",
  tafsirUnavailable: "Bu ayet için tefsir henüz mevcut değil.",
  shareVerse: "Bu ayeti paylaş",
  readArrow: "Oku →",
};

const id: Partial<UIStrings> = {
  home: "Beranda",
  quran: "Al-Quran",
  quranFull: "Al-Quran Al-Karim",
  quranSubtitle: "Firman Allah yang diturunkan kepada Nabi Muhammad ﷺ",
  surahs: "114 Surah",
  meccan: "Makkiyah",
  medinan: "Madaniyah",
  chapters: "Surah",
  verses: "ayat",
  verseLabel: "Ayat",
  surahLabel: "Surah",
  previousSurah: "Surah Sebelumnya",
  nextSurah: "Surah Berikutnya",
  previous: "Sebelumnya",
  next: "Berikutnya",
  translation: "Terjemahan",
  selectTranslation: "Pilih terjemahan",
  tafsir: "Tafsir",
  selectTafsir: "Pilih sumber tafsir",
  tafsirUnavailable: "Tafsir belum tersedia untuk ayat ini.",
  shareVerse: "Bagikan ayat ini",
  readArrow: "Baca →",
};

const ru: Partial<UIStrings> = {
  home: "Главная",
  quran: "Коран",
  quranFull: "Священный Коран",
  quranSubtitle: "Слово Аллаха, ниспосланное Пророку Мухаммаду ﷺ",
  surahs: "114 Сур",
  meccan: "Мекканская",
  medinan: "Мединская",
  chapters: "Суры",
  verses: "аятов",
  verseLabel: "Аят",
  surahLabel: "Сура",
  previousSurah: "Предыдущая Сура",
  nextSurah: "Следующая Сура",
  previous: "Предыдущий",
  next: "Следующий",
  translation: "Перевод",
  selectTranslation: "Выбрать перевод",
  tafsir: "Тафсир",
  selectTafsir: "Выбрать тафсир",
  tafsirUnavailable: "Тафсир для этого аята пока недоступен.",
  shareVerse: "Поделиться аятом",
  readArrow: "Читать →",
};

const es: Partial<UIStrings> = {
  home: "Inicio",
  quran: "Corán",
  quranFull: "El Sagrado Corán",
  quranSubtitle: "La palabra de Alá revelada al Profeta Mujámmad ﷺ",
  surahs: "114 Suras",
  meccan: "Mequí",
  medinan: "Medinés",
  chapters: "Capítulos",
  verses: "versículos",
  verseLabel: "Versículo",
  surahLabel: "Sura",
  previousSurah: "Sura anterior",
  nextSurah: "Sura siguiente",
  previous: "Anterior",
  next: "Siguiente",
  translation: "Traducción",
  selectTranslation: "Seleccionar traducción",
  tafsir: "Tafsir",
  selectTafsir: "Seleccionar fuente de tafsir",
  tafsirUnavailable: "El tafsir aún no está disponible para este versículo.",
  shareVerse: "Compartir este versículo",
  readArrow: "Leer →",
};

const bn: Partial<UIStrings> = {
  home: "হোম",
  quran: "কুরআন",
  quranFull: "পবিত্র কুরআন",
  quranSubtitle: "আল্লাহর বাণী যা নবী মুহাম্মদ ﷺ-এর উপর নাযিল হয়েছে",
  surahs: "১১৪টি সূরা",
  meccan: "মক্কী",
  medinan: "মাদানী",
  chapters: "সূরাসমূহ",
  verses: "আয়াত",
  verseLabel: "আয়াত",
  surahLabel: "সূরা",
  previousSurah: "পূর্ববর্তী সূরা",
  nextSurah: "পরবর্তী সূরা",
  previous: "পূর্ববর্তী",
  next: "পরবর্তী",
  translation: "অনুবাদ",
  selectTranslation: "অনুবাদ বেছে নিন",
  tafsir: "তাফসীর",
  selectTafsir: "তাফসীর উৎস বেছে নিন",
  tafsirUnavailable: "এই আয়াতের তাফসীর এখনও পাওয়া যাচ্ছে না।",
  shareVerse: "এই আয়াত শেয়ার করুন",
  readArrow: "পড়ুন →",
};

const ms: Partial<UIStrings> = {
  home: "Laman Utama",
  quran: "Al-Quran",
  quranFull: "Al-Quran Al-Karim",
  quranSubtitle: "Firman Allah yang diturunkan kepada Nabi Muhammad ﷺ",
  surahs: "114 Surah",
  meccan: "Makkiyyah",
  medinan: "Madaniyyah",
  chapters: "Surah",
  verses: "ayat",
  verseLabel: "Ayat",
  surahLabel: "Surah",
  previousSurah: "Surah Sebelum",
  nextSurah: "Surah Berikut",
  previous: "Sebelum",
  next: "Berikut",
  translation: "Terjemahan",
  selectTranslation: "Pilih terjemahan",
  tafsir: "Tafsir",
  selectTafsir: "Pilih sumber tafsir",
  tafsirUnavailable: "Tafsir belum tersedia untuk ayat ini.",
  shareVerse: "Kongsi ayat ini",
  readArrow: "Baca →",
};

const zh: Partial<UIStrings> = {
  home: "首页",
  quran: "古兰经",
  quranFull: "神圣的古兰经",
  quranSubtitle: "安拉降示给先知穆罕默德ﷺ的启示",
  surahs: "114章",
  meccan: "麦加章",
  medinan: "麦地那章",
  chapters: "章节",
  verses: "节",
  verseLabel: "节",
  surahLabel: "章",
  previousSurah: "上一章",
  nextSurah: "下一章",
  previous: "上一节",
  next: "下一节",
  translation: "译文",
  selectTranslation: "选择译本",
  tafsir: "解经",
  selectTafsir: "选择解经来源",
  tafsirUnavailable: "该节经文暂无解经。",
  shareVerse: "分享经文",
  readArrow: "阅读 →",
};

const bs: Partial<UIStrings> = {
  home: "Početna",
  quran: "Kur'an",
  quranFull: "Sveti Kur'an",
  meccan: "Mekanski",
  medinan: "Medinski",
  verseLabel: "Ajet",
  surahLabel: "Sura",
  previousSurah: "Prethodna Sura",
  nextSurah: "Sljedeća Sura",
  previous: "Prethodni",
  next: "Sljedeći",
  translation: "Prijevod",
  tafsir: "Tefsir",
};

const it: Partial<UIStrings> = {
  home: "Home",
  quran: "Corano",
  quranFull: "Il Sacro Corano",
  meccan: "Meccano",
  medinan: "Medinese",
  verseLabel: "Versetto",
  surahLabel: "Sura",
  previousSurah: "Sura precedente",
  nextSurah: "Sura successiva",
  previous: "Precedente",
  next: "Successivo",
  translation: "Traduzione",
  tafsir: "Tafsir",
};

const pt: Partial<UIStrings> = {
  home: "Início",
  quran: "Alcorão",
  quranFull: "O Sagrado Alcorão",
  meccan: "Mequense",
  medinan: "Medinense",
  verseLabel: "Versículo",
  surahLabel: "Sura",
  previousSurah: "Sura anterior",
  nextSurah: "Próxima Sura",
  previous: "Anterior",
  next: "Próximo",
  translation: "Tradução",
  tafsir: "Tafsir",
};

const sv: Partial<UIStrings> = {
  home: "Hem",
  quran: "Koranen",
  quranFull: "Den Heliga Koranen",
  meccan: "Meckansk",
  medinan: "Medinsk",
  verseLabel: "Vers",
  surahLabel: "Sura",
  previousSurah: "Föregående Sura",
  nextSurah: "Nästa Sura",
  previous: "Föregående",
  next: "Nästa",
  translation: "Översättning",
  tafsir: "Tafsir",
};

const nl: Partial<UIStrings> = {
  home: "Thuis",
  quran: "Koran",
  quranFull: "De Heilige Koran",
  meccan: "Mekkaans",
  medinan: "Medinees",
  verseLabel: "Vers",
  surahLabel: "Soera",
  previousSurah: "Vorige Soera",
  nextSurah: "Volgende Soera",
  previous: "Vorige",
  next: "Volgende",
  translation: "Vertaling",
  tafsir: "Tafsir",
};

const ja: Partial<UIStrings> = {
  home: "ホーム",
  quran: "クルアーン",
  quranFull: "聖クルアーン",
  meccan: "マッカ章",
  medinan: "マディーナ章",
  verseLabel: "節",
  surahLabel: "章",
  previousSurah: "前の章",
  nextSurah: "次の章",
  previous: "前へ",
  next: "次へ",
  translation: "翻訳",
  tafsir: "タフスィール",
};

const ko: Partial<UIStrings> = {
  home: "홈",
  quran: "꾸란",
  quranFull: "성 꾸란",
  meccan: "메카 계시",
  medinan: "메디나 계시",
  verseLabel: "절",
  surahLabel: "장",
  previousSurah: "이전 장",
  nextSurah: "다음 장",
  previous: "이전",
  next: "다음",
  translation: "번역",
  tafsir: "타프시르",
};

const ha: Partial<UIStrings> = {
  home: "Gida",
  quran: "Alƙur'ani",
  quranFull: "Alƙur'anin Mai Tsarki",
  meccan: "Makka",
  medinan: "Madina",
  verseLabel: "Aya",
  surahLabel: "Sura",
  previousSurah: "Sura Ta Baya",
  nextSurah: "Sura Mai Zuwa",
  previous: "Na Baya",
  next: "Mai Zuwa",
  translation: "Fassara",
  tafsir: "Tafsiri",
};

const sw: Partial<UIStrings> = {
  home: "Nyumbani",
  quran: "Quran",
  quranFull: "Quran Tukufu",
  meccan: "Makkiyya",
  medinan: "Madaniyya",
  verseLabel: "Aya",
  surahLabel: "Sura",
  previousSurah: "Sura Iliyopita",
  nextSurah: "Sura Inayofuata",
  previous: "Iliyopita",
  next: "Inayofuata",
  translation: "Tafsiri",
  tafsir: "Tafsiri",
};

const LOCALE_STRINGS: Record<string, Partial<UIStrings>> = {
  en,
  ar,
  ur,
  fa,
  fr,
  de,
  tr,
  id,
  ru,
  es,
  bn,
  ms,
  zh,
  bs,
  it,
  pt,
  sv,
  nl,
  ja,
  ko,
  ha,
  sw,
};

/** Get a UI string for the given locale, falling back to English. */
export function t(locale: string, key: keyof UIStrings): string {
  return (LOCALE_STRINGS[locale]?.[key] ?? en[key]) as string;
}

/** RTL locales */
export const RTL_LOCALES = new Set(["ar", "ur", "fa"]);

/** Whether the locale uses right-to-left layout. */
export function isRtl(locale: string): boolean {
  return RTL_LOCALES.has(locale);
}
