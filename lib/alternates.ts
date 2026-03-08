/**
 * Builds the `alternates` metadata object for hreflang support.
 *
 * Usage in generateMetadata:
 *   alternates: buildAlternates(locale, `quran/${surah}/${verse}`)
 *
 * Outputs:
 *   <link rel="canonical" href="https://zee.app/en/quran/1/1" />
 *   <link rel="alternate" hreflang="en" href="https://zee.app/en/quran/1/1" />
 *   <link rel="alternate" hreflang="ar" href="https://zee.app/ar/quran/1/1" />
 *   <link rel="alternate" hreflang="x-default" href="https://zee.app/en/quran/1/1" />
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://zee.app";

const BASE_URL = SITE_URL;

const ALL_LOCALES = [
  "en", "ar", "ur", "fa", "fr", "de", "tr", "id", "ru", "es",
  "bn", "ms", "zh", "bs", "it", "pt", "sv", "nl", "ja", "ko", "ha", "sw",
];

export function buildAlternates(locale: string, path = "") {
  const segment = path ? `/${path}` : "";
  const languages: Record<string, string> = {};
  for (const loc of ALL_LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}${segment}`;
  }
  languages["x-default"] = `${BASE_URL}/en${segment}`;
  const canonical = languages[locale] ?? languages["en"];
  return { canonical, languages };
}
