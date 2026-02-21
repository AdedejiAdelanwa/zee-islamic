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

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://zee.yourdomain.com";

export function buildAlternates(locale: string, path = "") {
  const segment = path ? `/${path}` : "";
  const enUrl = `${BASE_URL}/en${segment}`;
  const arUrl = `${BASE_URL}/ar${segment}`;
  const canonical = locale === "ar" ? arUrl : enUrl;

  return {
    canonical,
    languages: {
      en: enUrl,
      ar: arUrl,
      "x-default": enUrl,
    },
  };
}
