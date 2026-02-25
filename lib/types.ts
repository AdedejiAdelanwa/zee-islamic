// Locale types
export type Locale = "en" | "ar";

// Quran types
export interface Ayah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  };
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
}

export interface AyahWithTranslation {
  arabic: Ayah;
  translation: Ayah;
  transliteration?: Ayah;
  surahNumber: number;
  verseNumber: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

// Hadith types
export type HadithGrade = "Sahih" | "Hasan" | "Da'if" | "Mawdu" | "Unknown";

export interface Hadith {
  id: number;
  hadithNumber: string;
  englishNarrator: string;
  hadithEnglish: string;
  hadithUrdu?: string;
  hadithArabic?: string;
  urduNarrator?: string;
  headingEnglish?: string;
  headingUrdu?: string;
  headingArabic?: string;
  bookSlug: string;
  chapterId: string;
  book?: {
    bookName: string;
    writerName: string;
    slug: string;
    hadithCount: number;
    chapterCount: number;
    bookDash?: string;
  };
  chapter?: {
    id: number;
    chapterNumber: string;
    chapterEnglish: string;
    chapterUrdu?: string;
    chapterArabic?: string;
    bookSlug: string;
  };
  grades: HadithGradeData[];
  volume?: string;
}

export interface HadithGradeData {
  grade: string;
  graded_by?: string;
}

// Search types
export interface SearchFilters {
  type: "all" | "quran" | "hadith" | "tafsir";
  grade?: HadithGrade[];
  translation?: string;
}

export interface SearchResult {
  quranResults: AyahWithTranslation[];
  hadithResults: Hadith[];
  total: number;
}

// Translation types — data lives in lib/translations.ts
export type { Translation } from "./translations";
export { TRANSLATIONS, getDefaultTranslation, getTranslationDirection, groupByLanguage } from "./translations";

// API response types
export interface AlQuranApiResponse<T> {
  code: number;
  status: string;
  data: T;
}
