import type { Hadith } from "./types";
import { fetchZee } from "./api";

export const HADITH_COLLECTIONS = [
  { slug: "bukhari",  name: "Sahih al-Bukhari", author: "Imam al-Bukhari", grade: "Sahih" },
  { slug: "muslim",   name: "Sahih Muslim",      author: "Imam Muslim",    grade: "Sahih" },
  { slug: "abudawud", name: "Sunan Abu Dawud",   author: "Abu Dawud",      grade: "Hasan" },
  { slug: "ibnmajah", name: "Sunan Ibn Majah",   author: "Ibn Majah",      grade: "Hasan" },
  { slug: "tirmidhi", name: "Jami at-Tirmidhi",  author: "At-Tirmidhi",    grade: "Hasan" },
] as const;

export type HadithCollectionSlug = (typeof HADITH_COLLECTIONS)[number]["slug"];

// ── Types returned by the API ────────────────────────────────────────────────

export interface CollectionInfo {
  slug: string;
  name_english: string;
  author_english: string;
  hadith_count: number | null;
  default_grade: string | null;
}

export interface HadithListItem {
  hadith_number: string;
  narrator: string | null;
  text_english: string;
  chapter_name: string | null;
  grade: string | null;
}

export interface HadithListPage {
  collection: CollectionInfo;
  hadiths: HadithListItem[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

// ── Mapper ───────────────────────────────────────────────────────────────────

function mapHadith(raw: {
  id: string;
  hadith_number: string;
  collection: {
    slug: string;
    name_english: string;
    author_english: string;
    hadith_count: number | null;
    default_grade: string | null;
  };
  chapter: { number: string; name_english: string | null; name_arabic: string | null } | null;
  narrator: string | null;
  arabic: string | null;
  english: string;
  grades: Array<{ grade: string; graded_by: string | null }>;
}): Hadith {
  return {
    id: 0,
    hadithNumber: raw.hadith_number,
    englishNarrator: raw.narrator ?? "",
    hadithEnglish: raw.english,
    hadithArabic: raw.arabic ?? undefined,
    bookSlug: raw.collection.slug,
    chapterId: raw.chapter?.number ?? "",
    book: {
      bookName: raw.collection.name_english,
      writerName: raw.collection.author_english,
      slug: raw.collection.slug,
      hadithCount: raw.collection.hadith_count ?? 0,
      chapterCount: 0,
    },
    chapter: raw.chapter
      ? {
          id: 0,
          chapterNumber: raw.chapter.number,
          chapterEnglish: raw.chapter.name_english ?? "",
          chapterArabic: raw.chapter.name_arabic ?? undefined,
          bookSlug: raw.collection.slug,
        }
      : undefined,
    grades: raw.grades.map((g) => ({ grade: g.grade, graded_by: g.graded_by ?? undefined })),
  };
}

// ── API functions ────────────────────────────────────────────────────────────

export async function getCollections(): Promise<CollectionInfo[]> {
  const data = await fetchZee<{ collections: CollectionInfo[] }>(
    "/api/hadith/collections",
    86400,
  );
  const validSlugs = new Set(HADITH_COLLECTIONS.map((c) => c.slug));
  return data.collections.filter((c) => validSlugs.has(c.slug as (typeof HADITH_COLLECTIONS)[number]["slug"]));
}

export async function listHadiths(
  collection: string,
  page = 1,
  limit = 20,
): Promise<HadithListPage | null> {
  try {
    return await fetchZee<HadithListPage>(
      `/api/hadith/${collection}?page=${page}&limit=${limit}`,
      300,
    );
  } catch {
    return null;
  }
}

export async function getHadith(
  collection: string,
  hadithNumber: string,
): Promise<Hadith | null> {
  try {
    const raw = await fetchZee<{
      id: string;
      hadith_number: string;
      collection: {
        slug: string;
        name_english: string;
        author_english: string;
        hadith_count: number | null;
        default_grade: string | null;
      };
      chapter: { number: string; name_english: string | null; name_arabic: string | null } | null;
      narrator: string | null;
      arabic: string | null;
      english: string;
      grades: Array<{ grade: string; graded_by: string | null }>;
    }>(`/api/hadith/${collection}/${hadithNumber}`, 86400);

    return mapHadith(raw);
  } catch {
    return null;
  }
}

export async function searchHadiths(query: string, collections?: string[]): Promise<Hadith[]> {
  const params = new URLSearchParams({ q: query, type: "hadith" });
  collections?.forEach((c) => params.append("collection", c));
  const data = await fetchZee<{
    results: {
      hadiths: Array<{
        id: string;
        hadith_number: string;
        book_slug: string;
        book_name: string;
        narrator: string | null;
        english: string;
        grade: string | null;
      }>;
    };
  }>(`/api/search?${params.toString()}`, 300);

  return data.results.hadiths.map((h) => ({
    id: 0,
    hadithNumber: h.hadith_number,
    englishNarrator: h.narrator ?? "",
    hadithEnglish: h.english,
    bookSlug: h.book_slug,
    chapterId: "",
    book: {
      bookName: h.book_name,
      writerName: "",
      slug: h.book_slug,
      hadithCount: 0,
      chapterCount: 0,
    },
    grades: h.grade ? [{ grade: h.grade }] : [],
  }));
}
