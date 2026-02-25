import type { Metadata } from "next";
import { Suspense } from "react";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import SearchSidebar from "@/components/search/SearchSidebar";
import Pagination from "@/components/ui/Pagination";
import EmailCapture from "@/components/ui/EmailCapture";
import QuranResultCard from "@/components/results/QuranResultCard";
import HadithResultCard from "@/components/results/HadithResultCard";
import TafsirResultCard from "@/components/results/TafsirResultCard";
import { searchQuran } from "@/lib/quran";
import { searchHadiths } from "@/lib/hadith";
import { searchTafsir } from "@/lib/tafsir";
import type { TafsirResult } from "@/lib/tafsir";
import { getDefaultTranslation } from "@/lib/translations";
import type { Locale } from "@/lib/types";

const PAGE_SIZE = 10;

export const metadata: Metadata = {
  robots: { index: false },
};

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    type?: string;
    grade?: string | string[];
    collection?: string | string[];
    page?: string;
    translation?: string;
  }>;
}

async function SearchResults({
  query,
  locale,
  type,
  page,
  translation,
  collections,
  buildHref,
}: {
  query: string;
  locale: string;
  type: string;
  page: number;
  translation: string;
  collections: string[];
  buildHref: (page: number) => string;
}) {
  const isAr = locale === "ar";

  let allQuran: Awaited<ReturnType<typeof searchQuran>> = [];
  let allHadith: Awaited<ReturnType<typeof searchHadiths>> = [];
  let allTafsir: TafsirResult[] = [];
  let fetchFailed = false;

  try {
    [allQuran, allHadith, allTafsir] = await Promise.all([
      type === "hadith" || type === "tafsir" ? Promise.resolve([]) : searchQuran(query, translation),
      type === "quran" || type === "tafsir" ? Promise.resolve([]) : searchHadiths(query, collections.length ? collections : undefined),
      type === "quran" || type === "hadith" ? Promise.resolve([]) : searchTafsir(query),
    ]);
  } catch {
    fetchFailed = true;
  }

  if (fetchFailed) {
    return (
      <div className="py-16 text-center">
        <div className="mb-3 text-4xl">⚠</div>
        <h2 className="mb-2 text-lg font-semibold text-(--color-foreground)">
          {isAr ? "تعذّر تحميل النتائج" : "Could not load results"}
        </h2>
        <p className="text-sm text-(--color-muted)">
          {isAr
            ? "تحقق من اتصالك بالإنترنت وحاول مرة أخرى."
            : "Check your connection and try again."}
        </p>
      </div>
    );
  }

  // Merge into a tagged list, Quran first, then Hadith, then Tafsir
  type Tagged =
    | { kind: "quran"; item: (typeof allQuran)[number] }
    | { kind: "hadith"; item: (typeof allHadith)[number] }
    | { kind: "tafsir"; item: TafsirResult };

  const all: Tagged[] = [
    ...allQuran.map((item) => ({ kind: "quran" as const, item })),
    ...allHadith.map((item) => ({ kind: "hadith" as const, item })),
    ...allTafsir.map((item) => ({ kind: "tafsir" as const, item })),
  ];

  const totalResults = all.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageItems = all.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageQuran = pageItems.filter((r) => r.kind === "quran").map((r) => r.item as (typeof allQuran)[number]);
  const pageHadith = pageItems.filter((r) => r.kind === "hadith").map((r) => r.item as (typeof allHadith)[number]);
  const pageTafsir = pageItems.filter((r) => r.kind === "tafsir").map((r) => r.item as TafsirResult);

  if (totalResults === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-3 text-4xl">🔍</div>
        <h2 className="mb-2 text-lg font-semibold text-(--color-foreground)">
          {isAr ? "لا توجد نتائج" : "No results found"}
        </h2>
        <p className="text-sm text-(--color-muted)">
          {isAr
            ? `لم نجد نتائج لـ "${query}"`
            : `We couldn't find results for "${query}"`}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Query summary + result count */}
      {(() => {
        const filterLabels: Record<string, { en: string; ar: string }> = {
          all: { en: "All", ar: "الكل" },
          quran: { en: "Quran", ar: "القرآن" },
          hadith: { en: "Hadith", ar: "الحديث" },
          tafsir: { en: "Tafsir", ar: "التفسير" },
        };
        const label = filterLabels[type] ?? filterLabels.all;
        return (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs text-(--color-muted)">
              {isAr
                ? `${totalResults} نتيجة — الصفحة ${safePage} من ${totalPages}`
                : `${totalResults} results — page ${safePage} of ${totalPages}`}
            </p>
            <p className="text-sm font-medium text-(--color-foreground)">
              {isAr
                ? `نتائج "${query}" في ${label.ar}`
                : `Results of "${query}" in ${label.en}`}
            </p>
          </div>
        );
      })()}

      <div className="space-y-8">
        {/* Quran results */}
        {pageQuran.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-(--color-foreground)">
              📖 {isAr ? "آيات قرآنية" : "Quranic Verses"}
              <span className="rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-muted)">
                {allQuran.length}
              </span>
            </h2>
            <div className="space-y-4">
              {pageQuran.map((result) => (
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

        {/* Hadith results */}
        {pageHadith.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-(--color-foreground)">
              📜 {isAr ? "أحاديث" : "Hadiths"}
              <span className="rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-muted)">
                {allHadith.length}
              </span>
            </h2>
            <div className="space-y-4">
              {pageHadith.map((result) => (
                <HadithResultCard
                  key={result.id}
                  result={result}
                  locale={locale}
                  query={query}
                />
              ))}
            </div>
          </section>
        )}

        {/* Tafsir results */}
        {pageTafsir.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-(--color-foreground)">
              📚 {isAr ? "تفسير" : "Tafsir"}
              <span className="rounded-full bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-muted)">
                {allTafsir.length}
              </span>
            </h2>
            <div className="space-y-4">
              {pageTafsir.map((result) => (
                <TafsirResultCard
                  key={`${result.surahNumber}-${result.verseNumber}-${result.source}`}
                  result={result}
                  locale={locale}
                  query={query}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        buildHref={buildHref}
        isAr={isAr}
      />
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm"
        >
          <div className="mb-3 h-3 w-20 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-6 w-full animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { locale } = await params;
  const { q: query = "", type = "all", page: pageParam = "1", translation: translationParam, collection: collectionParam } = await searchParams;
  const isAr = locale === "ar";
  const translation = translationParam ?? getDefaultTranslation(locale);
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const collections = collectionParam ? (Array.isArray(collectionParam) ? collectionParam : [collectionParam]) : [];

  function buildHref(p: number) {
    const sp = new URLSearchParams();
    if (query) sp.set("q", query);
    if (type !== "all") sp.set("type", type);
    if (translationParam) sp.set("translation", translationParam);
    collections.forEach((c) => sp.append("collection", c));
    if (p > 1) sp.set("page", String(p));
    return `/${locale}/search?${sp.toString()}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6" dir={isAr ? "rtl" : "ltr"}>
      {/* Search bar — full width */}
      <div className="mb-5">
        <SearchBar locale={locale as Locale} initialQuery={query} />
      </div>

      {/* Filter bar */}
      <div className="mb-6">
        <FilterBar locale={locale} />
      </div>

      {/* Main layout: results + sidebar */}
      <div className="flex items-start gap-6">
        {/* Results column */}
        <div className="min-w-0 flex-1">
          {query ? (
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} locale={locale} type={type} page={page} translation={translation} collections={collections} buildHref={buildHref} />
            </Suspense>
          ) : (
            <div className="py-16 text-center">
              <div className="mb-3 text-4xl">☪</div>
              <p className="text-(--color-muted)">
                {isAr
                  ? "أدخل كلمة للبحث في القرآن والحديث والتفسير"
                  : "Enter a term to search Quran, Hadith and Tafsir"}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar — desktop only */}
        <SearchSidebar query={query} locale={locale} />
      </div>

      {/* Email capture */}
      <EmailCapture locale={locale} />
    </div>
  );
}
