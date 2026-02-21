import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ShareActions from "@/components/verse/ShareActions";
import TranslationSwitcher from "@/components/verse/TranslationSwitcher";
import TransliterationToggle from "@/components/verse/TransliterationToggle";
import { getAyah } from "@/lib/quran";
import { TRANSLATIONS } from "@/lib/types";
import { buildAlternates } from "@/lib/alternates";

interface VersePageProps {
  params: Promise<{ locale: string; surah: string; verse: string }>;
  searchParams: Promise<{ translation?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: VersePageProps): Promise<Metadata> {
  const { locale, surah, verse } = await params;
  const { translation = "en.sahih" } = await searchParams;

  try {
    const ayah = await getAyah(Number(surah), Number(verse), translation);
    const surahName = ayah.arabic.surah?.englishName ?? `Surah ${surah}`;
    const isAr = locale === "ar";

    return {
      title: isAr
        ? `${surahName} — الآية ${verse}`
        : `${surahName} — Verse ${verse}`,
      description: ayah.translation.text?.slice(0, 160),
      alternates: buildAlternates(locale, `quran/${surah}/${verse}`),
      openGraph: {
        title: `${surahName} ${surah}:${verse}`,
        description: ayah.translation.text?.slice(0, 200),
        images: [
          {
            url: `/${locale}/quran/${surah}/${verse}/og-image`,
            width: 1200,
            height: 630,
            alt: `Quran ${surah}:${verse}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  } catch {
    return {
      title: `Quran ${surah}:${verse}`,
    };
  }
}

export default async function VersePage({
  params,
  searchParams,
}: VersePageProps) {
  const { locale, surah, verse } = await params;
  const { translation = "en.sahih" } = await searchParams;
  const isAr = locale === "ar";

  const surahNum = Number(surah);
  const verseNum = Number(verse);

  if (isNaN(surahNum) || isNaN(verseNum) || surahNum < 1 || surahNum > 114) {
    notFound();
  }

  let ayah;
  try {
    ayah = await getAyah(surahNum, verseNum, translation);
  } catch {
    notFound();
  }

  const surahName = ayah.arabic.surah?.englishName ?? `Surah ${surahNum}`;
  const surahArabicName = ayah.arabic.surah?.name ?? "";
  const verseRef = `${surahNum}:${verseNum}`;
  const currentUrl = `https://zee.yourdomain.com/${locale}/quran/${surahNum}/${verseNum}`;
  const shareText = `${ayah.arabic.text}\n\n"${ayah.translation.text}"`;

  const translationLabel =
    TRANSLATIONS.find((t) => t.identifier === translation)?.name ?? translation;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        className="mb-6"
        items={[
          { label: isAr ? "الرئيسية" : "Home", href: `/${locale}/` },
          {
            label: isAr ? "القرآن" : "Quran",
            href: `/${locale}/search?type=quran`,
          },
          { label: surahName },
          { label: isAr ? `الآية ${verseNum}` : `Verse ${verseNum}` },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--color-foreground) md:text-3xl">
          {isAr ? surahArabicName : surahName}
          <span className="ml-2 text-(--color-muted)">({verseRef})</span>
        </h1>
        <p className="mt-1 text-sm text-(--color-muted)">
          {isAr
            ? `${ayah.arabic.surah?.revelationType === "Meccan" ? "مكية" : "مدنية"} — ${ayah.arabic.surah?.numberOfAyahs} آية`
            : `${ayah.arabic.surah?.revelationType} — ${ayah.arabic.surah?.numberOfAyahs} verses`}
        </p>
      </div>

      {/* Arabic verse */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-white p-6 shadow-sm">
        <p
          lang="ar"
          dir="rtl"
          className="arabic-text text-right text-3xl leading-[2.5] text-(--color-foreground) md:text-4xl"
        >
          {ayah.arabic.text}
        </p>
        <p className="mt-3 text-center text-xs text-(--color-muted)">
          {surahArabicName} — {verseRef}
        </p>
      </div>

      {/* Translation switcher */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-(--color-foreground)">
          {isAr ? "الترجمة" : "Translation"}
        </h2>
        <Suspense fallback={null}>
          <TranslationSwitcher
            currentTranslation={translation}
            locale={locale}
          />
        </Suspense>
      </div>

      {/* Translation text */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <p
          className="text-base leading-relaxed text-(--color-foreground)"
          dir={isAr ? "rtl" : "ltr"}
        >
          &ldquo;{ayah.translation.text}&rdquo;
        </p>
        <p className="mt-3 text-xs text-(--color-muted)">
          — {translationLabel}
        </p>
        {ayah.transliteration?.text && (
          <TransliterationToggle
            text={ayah.transliteration.text}
            isAr={isAr}
          />
        )}
      </div>

      {/* Verse details */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: isAr ? "السورة" : "Surah",
            value: surahNum,
          },
          {
            label: isAr ? "الآية" : "Verse",
            value: verseNum,
          },
          {
            label: isAr ? "الجزء" : "Juz",
            value: ayah.arabic.juz,
          },
          {
            label: isAr ? "الصفحة" : "Page",
            value: ayah.arabic.page,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-(--color-border) bg-white p-3 text-center"
          >
            <p className="text-xs text-(--color-muted)">{item.label}</p>
            <p className="mt-1 text-lg font-bold text-(--color-primary)">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Share actions */}
      <div className="rounded-2xl border border-(--color-border) bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-(--color-foreground)">
          {isAr ? "مشاركة الآية" : "Share this verse"}
        </h2>
        <ShareActions text={shareText} url={currentUrl} locale={locale} />
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        {verseNum > 1 && (
          <a
            href={`/${locale}/quran/${surahNum}/${verseNum - 1}`}
            className="flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            {isAr ? "→" : "←"} {isAr ? "الآية السابقة" : "Previous"}
          </a>
        )}
        <div className="flex-1" />
        {verseNum < (ayah.arabic.surah?.numberOfAyahs ?? 0) && (
          <a
            href={`/${locale}/quran/${surahNum}/${verseNum + 1}`}
            className="flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            {isAr ? "الآية التالية" : "Next"} {isAr ? "←" : "→"}
          </a>
        )}
      </div>
    </div>
  );
}
