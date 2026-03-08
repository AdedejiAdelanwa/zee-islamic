import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import HadithGradeBadge from "@/components/ui/HadithGradeBadge";
import Pagination from "@/components/ui/Pagination";
import { listHadiths, HADITH_COLLECTIONS } from "@/lib/hadith";
import { truncate } from "@/lib/utils";
import { buildAlternates } from "@/lib/alternates";

const PAGE_LIMIT = 20;

interface CollectionPageProps {
  params: Promise<{ locale: string; collection: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { locale, collection } = await params;
  const isAr = locale === "ar";

  const meta = HADITH_COLLECTIONS.find((c) => c.slug === collection);
  const name = meta?.name ?? collection;

  return {
    title: isAr ? `${name} — ZEE` : `${name} — ZEE`,
    description: isAr
      ? `تصفّح أحاديث ${name}`
      : `Browse all hadiths from ${name} by ${meta?.author ?? ""}`,
    alternates: buildAlternates(locale, `hadith/${collection}`),
  };
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { locale, collection } = await params;
  const { page: pageParam } = await searchParams;
  const isAr = locale === "ar";

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const data = await listHadiths(collection, page, PAGE_LIMIT);
  if (!data) notFound();

  const collectionMeta = HADITH_COLLECTIONS.find((c) => c.slug === collection);

  function buildHref(p: number) {
    return `/${locale}/hadith/${collection}?page=${p}`;
  }

  // Build chapter dividers — track last seen chapter to insert headers
  const rows: Array<{ type: "chapter"; name: string } | { type: "hadith"; index: number }> = [];
  let lastChapter: string | null = null;
  data.hadiths.forEach((h, i) => {
    if (h.chapter_name && h.chapter_name !== lastChapter) {
      rows.push({ type: "chapter", name: h.chapter_name });
      lastChapter = h.chapter_name;
    }
    rows.push({ type: "hadith", index: i });
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6" dir={isAr ? "rtl" : "ltr"}>
      <Breadcrumb
        locale={locale}
        className="mb-6"
        items={[
          { label: isAr ? "الرئيسية" : "Home", href: `/${locale}/` },
          { label: isAr ? "الحديث النبوي" : "Hadith", href: `/${locale}/hadith` },
          { label: data.collection.name_english },
        ]}
      />

      {/* Collection header */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-(--color-foreground) md:text-2xl">
              {data.collection.name_english}
            </h1>
            <p className="mt-0.5 text-sm text-(--color-muted)">{data.collection.author_english}</p>
          </div>
          <HadithGradeBadge grade={data.collection.default_grade ?? "Unknown"} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {data.total.toLocaleString()} {isAr ? "حديث" : "hadiths"}
          </span>
          {collectionMeta && (
            <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
              {collectionMeta.grade}
            </span>
          )}
        </div>
      </div>

      {/* Hadith list */}
      <div className="space-y-1">
        {rows.map((row, i) => {
          if (row.type === "chapter") {
            return (
              <div
                key={`chapter-${i}`}
                className="px-1 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-(--color-primary)"
              >
                {row.name}
              </div>
            );
          }

          const h = data.hadiths[row.index];
          return (
            <Link
              key={h.hadith_number}
              href={`/${locale}/hadith/${collection}/${h.hadith_number}`}
              className="group flex gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 transition-all hover:border-(--color-semantic-green) hover:shadow-sm"
            >
              {/* Number */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-xs font-bold text-white">
                {h.hadith_number}
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                {h.narrator && (
                  <p className="mb-1 text-xs font-medium text-(--color-primary)">
                    {h.narrator}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-(--color-foreground)">
                  {truncate(h.text_english, 180)}
                </p>
              </div>

              {/* Grade */}
              {h.grade && (
                <div className="shrink-0">
                  <HadithGradeBadge grade={h.grade} />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={data.page}
        totalPages={data.total_pages}
        buildHref={buildHref}
        isAr={isAr}
      />
    </div>
  );
}
