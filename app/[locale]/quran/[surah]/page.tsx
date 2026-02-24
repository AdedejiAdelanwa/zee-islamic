import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TranslationSwitcher from "@/components/verse/TranslationSwitcher";
import { getSurah } from "@/lib/quran";
import { TRANSLATIONS } from "@/lib/types";
import { buildAlternates } from "@/lib/alternates";

interface SurahPageProps {
  params: Promise<{ locale: string; surah: string }>;
  searchParams: Promise<{ translation?: string }>;
}

const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

export async function generateMetadata({
  params,
  searchParams,
}: SurahPageProps): Promise<Metadata> {
  try {
    const { locale, surah } = await params;
    const { translation = "en.sahih" } = await searchParams;
    const surahNum = Number(surah);
    if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) return { title: "Quran — ZEE" };

    const { arabic } = await getSurah(surahNum, translation);
    const isAr = locale === "ar";

    return {
      title: isAr
        ? `سورة ${arabic.name} — القرآن الكريم`
        : `${arabic.englishName} — Quran | ZEE`,
      description: isAr
        ? `اقرأ سورة ${arabic.name} كاملةً — ${arabic.numberOfAyahs} آية`
        : `Read ${arabic.englishName} (${arabic.englishNameTranslation}) — ${arabic.numberOfAyahs} verses`,
      alternates: buildAlternates(locale, `quran/${surah}`),
    };
  } catch {
    return { title: "Quran — ZEE" };
  }
}

export default async function SurahPage({ params, searchParams }: SurahPageProps) {
  const { locale, surah } = await params;
  const { translation = "en.sahih" } = await searchParams;
  const isAr = locale === "ar";

  const surahNum = Number(surah);
  if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) notFound();

  let surahData: Awaited<ReturnType<typeof getSurah>>;
  try {
    surahData = await getSurah(surahNum, translation);
  } catch {
    notFound();
  }

  const { arabic, translation: translationSurah } = surahData;
  const translationLabel =
    TRANSLATIONS.find((t) => t.identifier === translation)?.name ?? translation;

  // Bismillah is shown for all surahs except Al-Fatiha (1, has it as verse 1)
  // and At-Tawbah (9, revealed without it)
  const showBismillah = surahNum !== 1 && surahNum !== 9;

  const revelationLabel = isAr
    ? arabic.revelationType === "Meccan"
      ? "مكية"
      : "مدنية"
    : arabic.revelationType;

  const verseItems = arabic.ayahs.map((ayah, i) => ({
    number: ayah.numberInSurah,
    arabic: ayah.text,
    translation: translationSurah.ayahs[i]?.text ?? "",
    juz: ayah.juz,
    page: ayah.page,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        className="mb-3"
        items={[
          { label: isAr ? "الرئيسية" : "Home", href: `/${locale}/` },
          {
            label: isAr ? "القرآن" : "Quran",
            href: `/${locale}/quran`,
          },
          { label: isAr ? arabic.name : arabic.englishName },
        ]}
      />

      {/* Surah header */}
      <div className="mb-8 rounded-2xl border border-(--color-border) bg-(--color-surface) px-6 py-4 text-center shadow-sm">
        <p className="arabic-text mb-1 text-4xl text-(--color-foreground)">
          {arabic.name}
        </p>
        <h1 className="text-xl font-bold text-(--color-foreground)">
          {arabic.englishName}
        </h1>
        <p className="mt-0.5 text-sm text-(--color-muted)">
          {arabic.englishNameTranslation}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {revelationLabel}
          </span>
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {arabic.numberOfAyahs} {isAr ? "آية" : "verses"}
          </span>
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {isAr ? `السورة ${surahNum}` : `Surah ${surahNum}`}
          </span>
        </div>
      </div>

      {/* Bismillah + TranslationSwitcher row */}
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Suspense fallback={null}>
          <TranslationSwitcher currentTranslation={translation} locale={locale} />
        </Suspense>
        {showBismillah && (
          <p className="arabic-text w-full !text-center text-2xl text-(--color-muted) sm:w-auto sm:!text-right">
            {BISMILLAH}
          </p>
        )}
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Sidebar — desktop only, sticky */}
        <aside className="hidden w-48 shrink-0 self-start sticky top-20 lg:block">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            {isAr ? "الآيات" : "Verses"}
          </p>
          <div className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-xl border border-(--color-border) bg-(--color-surface)">
            {verseItems.map((v) => (
              <a
                key={v.number}
                href={`#verse-${v.number}`}
                className="flex items-center gap-2 border-b border-(--color-border) px-3 py-2 text-sm transition-colors last:border-0 hover:bg-(--color-accent-light) hover:text-(--color-primary)"
              >
                <span className="w-6 shrink-0 text-center font-mono text-xs font-semibold text-(--color-primary)">
                  {v.number}
                </span>
                <span className="truncate text-xs text-(--color-muted)">
                  {isAr ? `آية ${v.number}` : `Verse ${v.number}`}
                </span>
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Mobile: horizontal verse number strip */}
          <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2 lg:hidden">
            {verseItems.map((v) => (
              <a
                key={v.number}
                href={`#verse-${v.number}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-xs font-semibold text-(--color-muted) transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                {v.number}
              </a>
            ))}
          </div>

          {/* Verse cards */}
          <div className="space-y-4">
            {verseItems.map((v) => (
              <div
                key={v.number}
                id={`verse-${v.number}`}
                className="scroll-mt-24 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm transition-colors target:border-(--color-primary) target:ring-2 target:ring-(--color-primary)/20"
              >
                {/* Verse header row */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-(--color-primary) text-xs font-bold text-white">
                    {v.number}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-(--color-muted)">
                    <span>{isAr ? `الجزء ${v.juz}` : `Juz ${v.juz}`}</span>
                    <span>{isAr ? `الصفحة ${v.page}` : `Page ${v.page}`}</span>
                    <Link
                      href={`/${locale}/quran/${surahNum}/${v.number}?translation=${translation}`}
                      className="font-medium text-(--color-primary) hover:underline"
                    >
                      {isAr ? "← عرض" : "View →"}
                    </Link>
                  </div>
                </div>

                {/* Arabic text */}
                <p
                  lang="ar"
                  dir="rtl"
                  className="arabic-text mb-4 text-right text-2xl leading-[2.2] text-(--color-foreground)"
                >
                  {v.arabic}
                </p>

                {/* Translation */}
                <p
                  className="text-sm leading-relaxed text-(--color-muted)"
                  dir="ltr"
                  lang="en"
                >
                  {v.translation}
                </p>
              </div>
            ))}
          </div>

          {/* Chapter navigation */}
          <div className="mt-8 flex items-center justify-between">
            {surahNum > 1 ? (
              <Link
                href={`/${locale}/quran/${surahNum - 1}`}
                className="flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                {isAr ? "→" : "←"}{" "}
                {isAr ? "السورة السابقة" : "Previous Surah"}
              </Link>
            ) : (
              <div />
            )}
            {surahNum < 114 ? (
              <Link
                href={`/${locale}/quran/${surahNum + 1}`}
                className="flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                {isAr ? "السورة التالية" : "Next Surah"}{" "}
                {isAr ? "←" : "→"}
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
