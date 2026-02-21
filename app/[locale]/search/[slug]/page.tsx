import type { Metadata } from "next";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import QuranResultCard from "@/components/results/QuranResultCard";
import HadithResultCard from "@/components/results/HadithResultCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { searchQuran } from "@/lib/quran";
import { searchHadiths } from "@/lib/hadith";
import type { Locale } from "@/lib/types";
import { buildAlternates } from "@/lib/alternates";

interface SlugSearchPageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

function slugToQuery(slug: string): string {
  return slug.replace(/-/g, " ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const query = slugToQuery(slug);
  const isAr = locale === "ar";

  return {
    title: isAr
      ? `نتائج بحث: ${query}`
      : `Search results for: ${query}`,
    description: isAr
      ? `آيات قرآنية وأحاديث نبوية تتعلق بـ "${query}"`
      : `Quran verses and hadith related to "${query}"`,
    robots: { index: true },
    alternates: buildAlternates(locale, `search/${slug}`),
  };
}

export default async function SlugSearchPage({
  params,
  searchParams,
}: SlugSearchPageProps) {
  const { locale, slug } = await params;
  const { type = "all" } = await searchParams;
  const query = slugToQuery(slug);
  const isAr = locale === "ar";

  const [quranResults, hadithResults] = await Promise.all([
    type === "hadith" ? Promise.resolve([]) : searchQuran(query),
    type === "quran" ? Promise.resolve([]) : searchHadiths(query),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        className="mb-4"
        items={[
          { label: isAr ? "الرئيسية" : "Home", href: `/${locale}/` },
          { label: isAr ? "بحث" : "Search", href: `/${locale}/search` },
          { label: query },
        ]}
      />

      {/* Search bar */}
      <div className="mb-5">
        <SearchBar locale={locale as Locale} initialQuery={query} />
      </div>

      {/* Filter bar */}
      <div className="mb-6">
        <FilterBar locale={locale} />
      </div>

      {/* Results */}
      <div className="space-y-8">
        {quranResults.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
              📖 {isAr ? "آيات قرآنية" : "Quranic Verses"}
              <span className="rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs text-(--color-muted)">
                {quranResults.length}
              </span>
            </h2>
            <div className="space-y-4">
              {quranResults.map((result) => (
                <QuranResultCard
                  key={`${result.surahNumber}-${result.verseNumber}`}
                  result={result}
                  locale={locale}
                  query={query}
                />
              ))}
            </div>
          </section>
        )}

        {hadithResults.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
              📜 {isAr ? "أحاديث" : "Hadiths"}
              <span className="rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs text-(--color-muted)">
                {hadithResults.length}
              </span>
            </h2>
            <div className="space-y-4">
              {hadithResults.map((result) => (
                <HadithResultCard
                  key={result.id}
                  result={result}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        {quranResults.length === 0 && hadithResults.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-3 text-4xl">🔍</div>
            <h2 className="mb-2 text-lg font-semibold">
              {isAr ? "لا توجد نتائج" : "No results found"}
            </h2>
            <p className="text-sm text-(--color-muted)">
              {isAr ? `لا نتائج لـ "${query}"` : `No results for "${query}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
