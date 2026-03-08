import { fetchZee } from "./api";

export interface SourceRef {
  label: string;
  url: string;
}

export interface AIAnswerCard {
  answer: string;
  sources: SourceRef[];
  model: string;
  confidence: "high" | "medium" | "low";
}

export interface VerseSearchResult {
  surah_number: number;
  verse_number: number;
  surah_name_english: string;
  surah_name_arabic: string;
  arabic: string;
  translation: string;
  juz: number;
  url: string;
}

export interface HadithSearchResult {
  id: string;
  book_slug: string;
  book_name: string;
  hadith_number: string | number;
  narrator?: string | null;
  english: string;
  arabic?: string;
  grade?: string | null;
  url: string;
}

export interface AISearchHit {
  content_type: "verse" | "hadith";
  rrf_score: number;
  semantic_rank: number | null;
  keyword_rank: number | null;
  result: VerseSearchResult | HadithSearchResult;
}

export interface AISearchResponse {
  answer_card: AIAnswerCard | null;
  hits: AISearchHit[];
  total: number;
  query: string;
  cached: boolean;
}

export async function searchAI(
  query: string,
  locale = "en",
  type: "all" | "quran" | "hadith" = "all"
): Promise<AISearchResponse | null> {
  try {
    const params = new URLSearchParams({ q: query, locale, type });
    return await fetchZee<AISearchResponse>(
      `/api/ai-search?${params.toString()}`,
      600 // 10 min — matches backend TTL
    );
  } catch {
    return null;
  }
}
