import type { Ayah, AyahWithTranslation, Surah, AlQuranApiResponse } from "./types";

const BASE_URL = process.env.QURAN_API_BASE ?? "https://api.alquran.cloud/v1";
const DEFAULT_TRANSLATION = "en.sahih";

async function fetchQuran<T>(path: string, revalidate = 86400): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Quran API error: ${res.status} ${res.statusText}`);
  }

  const json: AlQuranApiResponse<T> = await res.json();
  return json.data;
}

export async function getAyah(
  surah: number,
  verse: number,
  translation = DEFAULT_TRANSLATION
): Promise<AyahWithTranslation> {
  const [arabicData, translationData, transliterationData] = await Promise.all([
    fetchQuran<Ayah>(`/ayah/${surah}:${verse}`),
    fetchQuran<Ayah>(`/ayah/${surah}:${verse}/${translation}`),
    fetchQuran<Ayah>(`/ayah/${surah}:${verse}/en.transliteration`).catch(() => null),
  ]);

  return {
    arabic: arabicData,
    translation: translationData,
    transliteration: transliterationData ?? undefined,
    surahNumber: surah,
    verseNumber: verse,
  };
}

export async function getSurah(
  surahNumber: number,
  translation = DEFAULT_TRANSLATION
): Promise<{ arabic: Surah; translation: Surah }> {
  const [arabicData, translationData] = await Promise.all([
    fetchQuran<Surah>(`/surah/${surahNumber}`),
    fetchQuran<Surah>(`/surah/${surahNumber}/${translation}`),
  ]);

  return {
    arabic: arabicData,
    translation: translationData,
  };
}

export async function searchQuran(
  query: string,
  translation = DEFAULT_TRANSLATION
): Promise<AyahWithTranslation[]> {
  const encodedQuery = encodeURIComponent(query);

  const data = await fetchQuran<{ count: number; matches: Ayah[] }>(
    `/search/${encodedQuery}/all/${translation}`,
    300
  );

  if (!data.matches || data.matches.length === 0) {
    return [];
  }

  // Get Arabic versions for matched verses
  const results = await Promise.all(
    data.matches.slice(0, 20).map(async (match) => {
      const surahNum = match.surah.number;
      const verseNum = match.numberInSurah;

      try {
        const arabicVerse = await fetchQuran<Ayah>(
          `/ayah/${surahNum}:${verseNum}`,
          86400
        );
        return {
          arabic: arabicVerse,
          translation: match,
          surahNumber: surahNum,
          verseNumber: verseNum,
        } as AyahWithTranslation;
      } catch {
        return null;
      }
    })
  );

  return results.filter((r): r is AyahWithTranslation => r !== null);
}

export async function getAvailableTranslations(): Promise<
  Array<{ identifier: string; language: string; name: string; englishName: string }>
> {
  return fetchQuran<Array<{ identifier: string; language: string; name: string; englishName: string }>>(
    "/edition/type/translation",
    86400
  );
}
