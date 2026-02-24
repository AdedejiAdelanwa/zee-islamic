import type { Metadata } from "next";
import { Suspense } from "react";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import SearchSidebar from "@/components/search/SearchSidebar";
import Pagination from "@/components/ui/Pagination";
import EmailCapture from "@/components/ui/EmailCapture";
import QuranResultCard from "@/components/results/QuranResultCard";
import HadithResultCard from "@/components/results/HadithResultCard";
import { searchQuran } from "@/lib/quran";
import { searchHadiths } from "@/lib/hadith";
import { ZeeApiError } from "@/lib/api";
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
    page?: string;
  }>;
}

function resolveError(
  error: unknown,
  isAr: boolean
): { message: string; hint: string; code?: number } {
  if (error instanceof ZeeApiError) {
    const { status, path } = error;
    if (status === 0)
      return {
        code: undefined,
        message: isAr ? "تعذّر الاتصال بالخادم" : "Could not connect to server",
        hint: isAr ? `تحقق من اتصالك بالإنترنت.` : `Network error — ${path}`,
      };
    if (status === 404)
      return {
        code: 404,
        message: isAr ? "لم يُعثر على هذا المحتوى" : "Content not found",
        hint: isAr ? path : path,
      };
    if (status === 429)
      return {
        code: 429,
        message: isAr ? "طلبات كثيرة جداً" : "Too many requests",
        hint: isAr ? "انتظر لحظة وأعد المحاولة." : "Wait a moment and try again.",
      };
    if (status >= 500)
      return {
        code: status,
        message:
          status === 503
            ? isAr
              ? "الخدمة غير متاحة مؤقتاً"
              : "Service temporarily unavailable"
            : isAr
              ? "خطأ في الخادم"
              : "Server error",
        hint: isAr ? path : path,
      };
    return {
      code: status,
      message: isAr ? "خطأ غير متوقع" : "Unexpected error",
      hint: path,
    };
  }
  return {
    message: isAr ? "خطأ في الاتصال" : "Connection error",
    hint: isAr ? "تحقق من اتصالك وحاول مرة أخرى." : "Check your connection and try again.",
  };
}

function SectionFetchError({
  source,
  error,
  isAr,
}: {
  source: string;
  error: unknown;
  isAr: boolean;
}) {
  const { message, hint, code } = resolveError(error, isAr);
  return (
    <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
      <p className="flex items-center gap-2 text-sm font-medium text-(--color-foreground)">
        ⚠ {isAr ? `تعذّر تحميل نتائج ${source}` : `Could not load ${source} results`}
        {code !== undefined && (
          <span className="rounded bg-(--color-border) px-1.5 py-0.5 font-mono text-xs text-(--color-muted)">
            {code}
          </span>
        )}
      </p>
      <p className="mt-1 text-xs text-(--color-muted)">{message}</p>
      <p className="mt-0.5 font-mono text-xs text-(--color-muted) opacity-60">{hint}</p>
    </div>
  );
}

async function SearchResults({
  query,
  locale,
  type,
  page,
  buildHref,
}: {
  query: string;
  locale: string;
  type: string;
  page: number;
  buildHref: (page: number) => string;
}) {
  const isAr = locale === "ar";

  const [quranResult, hadithResult] = await Promise.allSettled([
    type === "hadith" ? Promise.resolve([]) : searchQuran(query),
    type === "quran" ? Promise.resolve([]) : searchHadiths(query),
  ]);

  const allQuran = quranResult.status === "fulfilled" ? quranResult.value : [];
  const allHadith = hadithResult.status === "fulfilled" ? hadithResult.value : [];
  const quranFailed = quranResult.status === "rejected" && type !== "hadith";
  const hadithFailed = hadithResult.status === "rejected" && type !== "quran";

  if (quranFailed && hadithFailed) {
    const qErr = resolveError(quranResult.reason, isAr);
    const hErr = resolveError(hadithResult.reason, isAr);
    return (
      <div className="py-16 text-center">
        <div className="mb-3 text-4xl">⚠</div>
        <h2 className="mb-2 text-lg font-semibold text-(--color-foreground)">
          {isAr ? "تعذّر تحميل النتائج" : "Could not load results"}
        </h2>
        <div className="mx-auto mt-3 max-w-sm space-y-1 text-left font-mono text-xs text-(--color-muted)">
          <p>
            Quran{qErr.code !== undefined ? ` [${qErr.code}]` : ""}: {qErr.message}
          </p>
          <p>
            Hadith{hErr.code !== undefined ? ` [${hErr.code}]` : ""}: {hErr.message}
          </p>
        </div>
      </div>
    );
  }

  // Merge into a tagged list, Quran first
  type Tagged =
    | { kind: "quran"; item: (typeof allQuran)[number] }
    | { kind: "hadith"; item: (typeof allHadith)[number] };

  const all: Tagged[] = [
    ...allQuran.map((item) => ({ kind: "quran" as const, item })),
    ...allHadith.map((item) => ({ kind: "hadith" as const, item })),
  ];

  const totalResults = all.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageItems = all.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageQuran = pageItems.filter((r) => r.kind === "quran").map((r) => r.item as (typeof allQuran)[number]);
  const pageHadith = pageItems.filter((r) => r.kind === "hadith").map((r) => r.item as (typeof allHadith)[number]);

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
      {/* Result count */}
      <p className="mb-5 text-sm text-(--color-muted)">
        {isAr
          ? `${totalResults} نتيجة — الصفحة ${safePage} من ${totalPages}`
          : `${totalResults} results — page ${safePage} of ${totalPages}`}
      </p>

      <div className="space-y-8">
        {/* Quran results */}
        {quranFailed ? (
          <SectionFetchError source={isAr ? "القرآن" : "Quran"} error={quranResult.reason} isAr={isAr} />
        ) : pageQuran.length > 0 && (
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
        {hadithFailed ? (
          <SectionFetchError source={isAr ? "الحديث" : "Hadith"} error={hadithResult.reason} isAr={isAr} />
        ) : pageHadith.length > 0 && (
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
  const { q: query = "", type = "all", page: pageParam = "1" } = await searchParams;
  const isAr = locale === "ar";
  const page = Math.max(1, parseInt(pageParam, 10) || 1);

  function buildHref(p: number) {
    const sp = new URLSearchParams();
    if (query) sp.set("q", query);
    if (type !== "all") sp.set("type", type);
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
              <SearchResults query={query} locale={locale} type={type} page={page} buildHref={buildHref} />
            </Suspense>
          ) : (
            <div className="py-16 text-center">
              <div className="mb-3 text-4xl">☪</div>
              <p className="text-(--color-muted)">
                {isAr
                  ? "أدخل كلمة للبحث في القرآن والحديث"
                  : "Enter a term to search Quran and Hadith"}
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
