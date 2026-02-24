import type { Ayah, AyahWithTranslation, Surah } from "./types";
import { fetchZee } from "./api";

const DEFAULT_TRANSLATION = "en.sahih";

// Maps ZEE surah + verse data into the Ayah shape the frontend expects
function buildAyah(
  text: string,
  surahData: {
    number: number;
    name_arabic: string;
    name_english: string;
    name_english_translation: string | null;
    ayah_count: number;
    revelation_type: string;
  },
  verseNumber: number,
  juz: number,
  page: number
): Ayah {
  return {
    number: verseNumber,
    text,
    surah: {
      number: surahData.number,
      name: surahData.name_arabic,
      englishName: surahData.name_english,
      englishNameTranslation: surahData.name_english_translation ?? "",
      numberOfAyahs: surahData.ayah_count,
      revelationType: surahData.revelation_type,
    },
    numberInSurah: verseNumber,
    juz,
    manzil: 0,
    page,
    ruku: 0,
    hizbQuarter: 0,
    sajda: false,
  };
}

export async function getAyah(
  surah: number,
  verse: number,
  translation = DEFAULT_TRANSLATION
): Promise<AyahWithTranslation> {
  const data = await fetchZee<{
    surah: {
      number: number;
      name_arabic: string;
      name_english: string;
      name_english_translation: string | null;
      ayah_count: number;
      revelation_type: string;
    };
    verse: {
      number: number;
      number_in_surah: number;
      arabic: string;
      translation: string;
      transliteration: string | null;
      juz: number;
      page: number;
    };
  }>(`/api/quran/${surah}/${verse}?translation=${translation}&transliteration=true`);

  const arabicAyah = buildAyah(
    data.verse.arabic,
    data.surah,
    data.verse.number_in_surah,
    data.verse.juz,
    data.verse.page
  );

  const translationAyah = buildAyah(
    data.verse.translation,
    data.surah,
    data.verse.number_in_surah,
    data.verse.juz,
    data.verse.page
  );

  const transliterationAyah = data.verse.transliteration
    ? buildAyah(
        data.verse.transliteration,
        data.surah,
        data.verse.number_in_surah,
        data.verse.juz,
        data.verse.page
      )
    : undefined;

  return {
    arabic: arabicAyah,
    translation: translationAyah,
    transliteration: transliterationAyah,
    surahNumber: surah,
    verseNumber: verse,
  };
}

export async function getSurah(
  surahNumber: number,
  translation = DEFAULT_TRANSLATION
): Promise<{ arabic: Surah; translation: Surah }> {
  const data = await fetchZee<{
    surah: {
      number: number;
      name_arabic: string;
      name_english: string;
      name_english_translation: string | null;
      ayah_count: number;
      revelation_type: string;
    };
    verses: Array<{
      number: number;
      arabic: string;
      translation: string;
      juz: number;
      page: number;
    }>;
  }>(`/api/quran/${surahNumber}?translation=${translation}`);

  const surahMeta = {
    number: data.surah.number,
    name: data.surah.name_arabic,
    englishName: data.surah.name_english,
    englishNameTranslation: data.surah.name_english_translation ?? "",
    numberOfAyahs: data.surah.ayah_count,
    revelationType: data.surah.revelation_type,
  };

  const arabicSurah: Surah = {
    ...surahMeta,
    ayahs: data.verses.map((v) =>
      buildAyah(v.arabic, data.surah, v.number, v.juz, v.page)
    ),
  };

  const translationSurah: Surah = {
    ...surahMeta,
    ayahs: data.verses.map((v) =>
      buildAyah(v.translation, data.surah, v.number, v.juz, v.page)
    ),
  };

  return { arabic: arabicSurah, translation: translationSurah };
}

export async function searchQuran(
  query: string,
  translation = DEFAULT_TRANSLATION
): Promise<AyahWithTranslation[]> {
  const params = new URLSearchParams({
    q: query,
    type: "quran",
    translation,
  });

  const data = await fetchZee<{
    results: {
      verses: Array<{
        surah_number: number;
        verse_number: number;
        surah_name_english: string;
        surah_name_arabic: string;
        arabic: string;
        translation: string;
        juz: number;
      }>;
    };
  }>(`/api/search?${params.toString()}`, 300);

  return data.results.verses.map((v) => {
    const surahData = {
      number: v.surah_number,
      name_arabic: v.surah_name_arabic,
      name_english: v.surah_name_english,
      name_english_translation: null,
      ayah_count: 0,
      revelation_type: "",
    };

    return {
      arabic: buildAyah(v.arabic, surahData, v.verse_number, v.juz, 0),
      translation: buildAyah(v.translation, surahData, v.verse_number, v.juz, 0),
      surahNumber: v.surah_number,
      verseNumber: v.verse_number,
    };
  });
}

export async function getAvailableTranslations(): Promise<
  Array<{ identifier: string; language: string; name: string; englishName: string }>
> {
  const data = await fetchZee<{
    translations: Array<{
      identifier: string;
      name: string;
      author: string | null;
      language: string;
    }>;
  }>("/api/quran/translations");

  return data.translations.map((t) => ({
    identifier: t.identifier,
    language: t.language,
    name: t.name,
    englishName: t.name,
  }));
}
