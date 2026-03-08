import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/alternates";
import { SURAH_LIST } from "@/lib/surah-list";
import { HADITH_COLLECTIONS } from "@/lib/hadith";

const LOCALES = ["en", "ar"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}/`,
      changeFrequency: "daily",
      priority: 1.0,
    });
  }

  // Quran index
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}/quran`,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // All 114 surah pages (× 2 locales = 228 entries)
  for (const surah of SURAH_LIST) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}/quran/${surah.number}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Hadith index
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}/hadith`,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // All hadith collection pages (× 2 locales)
  for (const col of HADITH_COLLECTIONS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}/hadith/${col.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
