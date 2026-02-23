import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import HadithGradeBadge from "@/components/ui/HadithGradeBadge";
import ShareActions from "@/components/verse/ShareActions";
import { getHadith, HADITH_COLLECTIONS } from "@/lib/hadith";
import { truncate } from "@/lib/utils";
import { buildAlternates } from "@/lib/alternates";

interface HadithPageProps {
  params: Promise<{ locale: string; collection: string; number: string }>;
}

export async function generateMetadata({
  params,
}: HadithPageProps): Promise<Metadata> {
  const { locale, collection, number } = await params;
  const isAr = locale === "ar";

  const hadith = await getHadith(collection, number);
  if (!hadith) return { title: `Hadith ${collection} #${number}` };

  const collectionName =
    HADITH_COLLECTIONS.find((c) => c.slug === collection)?.name ?? collection;

  return {
    title: isAr
      ? `حديث ${collectionName} #${number}`
      : `${collectionName} — Hadith #${number}`,
    description: truncate(hadith.hadithEnglish, 160),
    alternates: buildAlternates(locale, `hadith/${collection}/${number}`),
  };
}

export default async function HadithPage({ params }: HadithPageProps) {
  const { locale, collection, number } = await params;
  const isAr = locale === "ar";

  const hadith = await getHadith(collection, number);
  if (!hadith) notFound();

  const collectionInfo = HADITH_COLLECTIONS.find((c) => c.slug === collection);
  const collectionName = collectionInfo?.name ?? collection;
  const grade = hadith.grades?.[0]?.grade ?? collectionInfo?.grade ?? "Unknown";
  const currentUrl = `https://zee.yourdomain.com/${locale}/hadith/${collection}/${number}`;
  const shareText = hadith.hadithEnglish?.slice(0, 300) ?? "";

  return (
    <div className="mx-auto max-w-3xl px-4 py-6" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        className="mb-6"
        items={[
          { label: isAr ? "الرئيسية" : "Home", href: `/${locale}/` },
          {
            label: isAr ? "الحديث" : "Hadith",
            href: `/${locale}/search?type=hadith`,
          },
          { label: collectionName },
          { label: `#${number}` },
        ]}
      />

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-(--color-foreground) md:text-2xl">
            {collectionName}
            <span className="ml-2 text-(--color-muted)">#{number}</span>
          </h1>
          {hadith.chapter?.chapterEnglish && (
            <p className="mt-1 text-sm text-(--color-muted)">
              {hadith.chapter.chapterEnglish}
            </p>
          )}
        </div>
        <HadithGradeBadge grade={grade} />
      </div>

      {/* Arabic text */}
      {hadith.hadithArabic && (
        <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
          <p
            lang="ar"
            dir="rtl"
            className="arabic-text text-right text-2xl leading-loose text-(--color-foreground)"
          >
            {hadith.hadithArabic}
          </p>
        </div>
      )}

      {/* English text */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <p className="text-base leading-relaxed text-(--color-foreground)">
          {hadith.hadithEnglish}
        </p>
        {hadith.englishNarrator && (
          <p className="mt-3 text-sm italic text-(--color-muted)">
            — {hadith.englishNarrator}
          </p>
        )}
      </div>

      {/* Grade info */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <h2 className="mb-3 text-sm font-semibold text-(--color-foreground)">
          {isAr ? "درجة الحديث" : "Hadith Grade"}
        </h2>
        <div className="flex items-center gap-3">
          <HadithGradeBadge grade={grade} />
          {hadith.grades?.[0]?.graded_by && (
            <span className="text-sm text-(--color-muted)">
              {isAr ? "مصدر التصنيف:" : "Graded by:"}{" "}
              {hadith.grades[0].graded_by}
            </span>
          )}
        </div>
      </div>

      {/* Share */}
      <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <h2 className="mb-4 text-sm font-semibold text-(--color-foreground)">
          {isAr ? "مشاركة الحديث" : "Share this Hadith"}
        </h2>
        <ShareActions text={shareText} url={currentUrl} locale={locale} />
      </div>
    </div>
  );
}
