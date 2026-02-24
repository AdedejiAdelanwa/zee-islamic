import type { Hadith } from "./types";
import { fetchZee } from "./api";

// Maps ZEE hadith response to the Hadith shape the frontend expects
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
    id: 0, // not used in frontend display
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

export async function searchHadiths(query: string): Promise<Hadith[]> {
  const params = new URLSearchParams({ q: query, type: "hadith" });
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

export async function getHadith(
  collection: string,
  hadithNumber: string
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
  } catch (error) {
    console.error("Get hadith error:", error);
    return null;
  }
}

export const HADITH_COLLECTIONS = [
  { slug: "bukhari", name: "Sahih al-Bukhari", grade: "Sahih" },
  { slug: "muslim", name: "Sahih Muslim", grade: "Sahih" },
  { slug: "abu-dawud", name: "Sunan Abu Dawud", grade: "Hasan" },
  { slug: "tirmidhi", name: "Jami at-Tirmidhi", grade: "Hasan" },
  { slug: "nasai", name: "Sunan an-Nasa'i", grade: "Hasan" },
  { slug: "ibn-e-majah", name: "Sunan Ibn Majah", grade: "Hasan" },
];
