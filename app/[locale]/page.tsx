import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import SearchFilters from "@/components/search/SearchFilters";
import TrendingSearches from "@/components/ui/TrendingSearches";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "ZEE — محرك البحث الإسلامي" : "ZEE — Islamic Search Engine",
    description: isAr
      ? "ابحث في القرآن الكريم والحديث النبوي"
      : "Search the Quran, Hadith, and Islamic knowledge.",
  };
}

const INFO_CATEGORIES = [
  {
    emoji: "📖",
    titleEn: "Quran",
    titleAr: "القرآن الكريم",
    descEn: "Search 6,236 verses with translations and tafsir.",
    descAr: "ابحث في ٦٢٣٦ آية مع التفسير والترجمة.",
    path: "quran",
  },
  {
    emoji: "📜",
    titleEn: "Hadith",
    titleAr: "الحديث الشريف",
    descEn:
      "Access authentic hadith from major collections with grade information.",
    descAr: "تصفح الأحاديث الصحيحة من المجموعات الكبرى مع تصنيف الدرجة.",
    path: "hadith",
  },
  {
    emoji: "🔍",
    titleEn: "Smart Search",
    titleAr: "بحث ذكي",
    descEn:
      "Search in English or Arabic across all Islamic texts simultaneously.",
    descAr: "ابحث بالعربية أو الإنجليزية في جميع النصوص الإسلامية.",
    path: null,
  },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div
      className="flex min-h-[calc(100vh-56px-var(--spacing-16))] flex-col"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        {/* Logo + tagline */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-5xl font-extrabold tracking-tight text-(--color-primary) md:text-7xl">
            ZEE
          </div>
          <p className="text-base text-(--color-muted) md:text-lg">
            {isAr
              ? "ابحث في القرآن والحديث والمعرفة الإسلامية"
              : "Search the Quran, Hadith & Islamic Knowledge"}
          </p>
          {!isAr && (
            <p
              lang="ar"
              dir="rtl"
              className="arabic-text mt-1 text-center text-sm text-(--color-muted)"
            >
              ابحث في القرآن والسنة والمعرفة الإسلامية
            </p>
          )}
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl">
          <SearchBar locale={locale as Locale} autoFocus />
        </div>

        {/* Quick filters */}
        <SearchFilters locale={locale} />
      </section>

      {/* Trending searches */}
      <section className="mx-auto w-full max-w-2xl px-4 pb-8">
        <TrendingSearches locale={locale} />
      </section>

      {/* Features — 3 columns on desktop */}
      <section className="bg-(--color-surface) px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold text-(--color-foreground)">
            {isAr
              ? "كل ما تحتاجه في مكان واحد"
              : "Everything you need, in one place"}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {INFO_CATEGORIES.map((feature) => {
              const cardClass =
                "rounded-2xl border border-(--color-border) bg-(--color-surface) p-6 text-center shadow-sm" +
                (feature.path ? " transition-colors hover:border-(--color-primary)" : "");
              const inner = (
                <>
                  <div className="mb-3 text-3xl">{feature.emoji}</div>
                  <h3 className="mb-2 font-semibold text-(--color-foreground)">
                    {isAr ? feature.titleAr : feature.titleEn}
                  </h3>
                  <p
                    className="text-sm text-(--color-muted)"
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    {isAr ? feature.descAr : feature.descEn}
                  </p>
                </>
              );
              return feature.path ? (
                <Link
                  key={feature.titleEn}
                  href={`/${locale}/${feature.path}`}
                  className={cardClass}
                >
                  {inner}
                </Link>
              ) : (
                <div key={feature.titleEn} className={cardClass}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
