import type { Hadith } from "./types";

const BASE_URL = "https://api.sunnah.com/v1/";
const API_KEY = process.env.HADITH_API_KEY;

interface HadithApiResponse {
  status: number;
  hadiths?: {
    current_page: number;
    data: Hadith[];
    total: number;
    per_page: number;
  };
  hadith?: Hadith;
}

async function fetchHadith<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate = 3600,
): Promise<T> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY ?? "",
    ...params,
  });

  const url = `${BASE_URL}${path}?${searchParams.toString()}`;

  const res = await fetch(url, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Hadith API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function searchHadiths(query: string): Promise<Hadith[]> {
  try {
    const data = await fetchHadith<HadithApiResponse>(
      "/hadiths",
      {
        hadithEnglish: query,
        limit: "20",
      },
      300,
    );

    return data.hadiths?.data ?? [];
  } catch (error) {
    console.error("Hadith search error:", error);
    return [];
  }
}

export async function getHadith(
  collection: string,
  hadithNumber: string,
): Promise<Hadith | null> {
  try {
    const data = await fetchHadith<HadithApiResponse>(
      `/${collection}/hadiths`,
      { hadithNumber },
      3600,
    );

    return data.hadiths?.data?.[0] ?? null;
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
