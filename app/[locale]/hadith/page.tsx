import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import HadithGradeBadge from "@/components/ui/HadithGradeBadge";
import { getCollections } from "@/lib/hadith";
import { buildAlternates } from "@/lib/alternates";

interface HadithHomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HadithHomeProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الحديث النبوي — ZEE" : "Hadith Collections — ZEE",
    description: isAr
      ? "تصفّح أحاديث النبي ﷺ من أصح الكتب الستة"
      : "Browse authentic Hadith from the major collections of the Prophet ﷺ",
    alternates: buildAlternates(locale, "hadith"),
  };
}

export default async function HadithHomePage({ params }: HadithHomeProps) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const collections = await getCollections();

  const totalHadiths = collections.reduce((sum, c) => sum + (c.hadith_count ?? 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6" dir={isAr ? "rtl" : "ltr"}>
      <Breadcrumb
        locale={locale}
        className="mb-3"
        items={[
          { label: isAr ? "الرئيسية" : "Home", href: `/${locale}/` },
          { label: isAr ? "الحديث النبوي" : "Hadith" },
        ]}
      />

      {/* Page header */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) px-6 py-4 text-center shadow-sm">
        <h1 className="text-xl font-bold text-(--color-foreground)">
          {isAr ? "الحديث النبوي" : "Hadith Collections"}
        </h1>
        <p className="mt-0.5 text-sm text-(--color-muted)">
          {isAr
            ? "أقوال وأفعال وتقريرات النبي محمد ﷺ"
            : "The sayings, actions, and approvals of Prophet Muhammad ﷺ"}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {isAr ? `${collections.length} مجموعات` : `${collections.length} Collections`}
          </span>
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {isAr
              ? `${totalHadiths.toLocaleString()} حديث`
              : `${totalHadiths.toLocaleString()} Hadiths`}
          </span>
        </div>
      </div>

      {/* Collection cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/${locale}/hadith/${col.slug}`}
            className="group flex flex-col rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm transition-all hover:border-(--color-semantic-green) hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <HadithGradeBadge grade={col.default_grade ?? "Unknown"} />
              {col.hadith_count != null && (
                <span className="rounded-full border border-(--color-border) bg-(--color-background) px-2 py-0.5 text-xs text-(--color-muted)">
                  {col.hadith_count.toLocaleString()}{" "}
                  {isAr ? "حديث" : "hadiths"}
                </span>
              )}
            </div>

            <h2 className="text-base font-bold text-(--color-foreground) group-hover:text-(--color-semantic-green)">
              {col.name_english}
            </h2>
            <p className="mt-0.5 text-sm text-(--color-muted)">{col.author_english}</p>

            <div className="mt-auto flex items-center justify-between border-t border-(--color-border) pt-3 text-xs text-(--color-muted)" style={{ marginTop: "1rem" }}>
              <span className="font-medium text-(--color-semantic-green) opacity-0 transition-opacity group-hover:opacity-100">
                {isAr ? "تصفّح ←" : "Browse →"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
