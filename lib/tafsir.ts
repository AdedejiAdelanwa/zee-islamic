import { fetchZee } from "./api";

export interface TafsirData {
  verse: { surah: number; verse: number };
  source: string;
  source_name: string;
  text_english: string;
  text_arabic: string | null;
}

export interface TafsirResult {
  surahNumber: number;
  verseNumber: number;
  source: string;
  sourceName: string;
  text: string;
  url: string;
}

export async function getTafsir(
  surah: number,
  verse: number,
  source = "ibn-kathir"
): Promise<TafsirData | null> {
  try {
    return await fetchZee<TafsirData>(
      `/api/tafsir/${surah}/${verse}?source=${source}`,
      86400
    );
  } catch {
    return null;
  }
}

export async function searchTafsir(query: string): Promise<TafsirResult[]> {
  const params = new URLSearchParams({ q: query, type: "tafsir" });
  const data = await fetchZee<{
    results: {
      tafsir: Array<{
        surah_number: number;
        verse_number: number;
        source: string;
        source_name: string;
        text: string;
        url: string;
      }>;
    };
  }>(`/api/search?${params.toString()}`, 300);

  return data.results.tafsir.map((t) => ({
    surahNumber: t.surah_number,
    verseNumber: t.verse_number,
    source: t.source,
    sourceName: t.source_name,
    text: t.text,
    url: t.url,
  }));
}
