import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookMarked } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ShareActions from "@/components/verse/ShareActions";
import TranslationSwitcher from "@/components/verse/TranslationSwitcher";
import TafsirSourceSwitcher from "@/components/verse/TafsirSourceSwitcher";
import TransliterationToggle from "@/components/verse/TransliterationToggle";
import ShareFab from "@/components/verse/ShareFab";
import { getAyah } from "@/lib/quran";
import { getTafsir } from "@/lib/tafsir";
import { getDefaultTranslation, getTranslationDirection, TRANSLATIONS } from "@/lib/translations";
import { buildAlternates, SITE_URL } from "@/lib/alternates";
import { t, isRtl } from "@/lib/ui";

const VALID_TAFSIR_SOURCES = ["ibn-kathir", "al-tabari"];

interface VersePageProps {
  params: Promise<{ locale: string; surah: string; verse: string }>;
  searchParams: Promise<{ translation?: string; tafsir?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: VersePageProps): Promise<Metadata> {
  const { locale, surah, verse } = await params;
  const { translation = getDefaultTranslation(locale) } = await searchParams;

  try {
    const ayah = await getAyah(Number(surah), Number(verse), translation);
    const surahName = ayah.arabic.surah?.englishName ?? `Surah ${surah}`;
    const rtl = isRtl(locale);

    return {
      title: rtl
        ? `${surahName} — ${t(locale, "verseLabel")} ${verse}`
        : `${surahName} — ${t(locale, "verseLabel")} ${verse}`,
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
  const { translation = getDefaultTranslation(locale), tafsir: tafsirSource = "ibn-kathir" } = await searchParams;
  const rtl = isRtl(locale);
  const translationDir = getTranslationDirection(translation);

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

  const activeSource = VALID_TAFSIR_SOURCES.includes(tafsirSource) ? tafsirSource : "ibn-kathir";
  const tafsirData = await getTafsir(surahNum, verseNum, activeSource);

  const surahName = ayah.arabic.surah?.englishName ?? `Surah ${surahNum}`;
  const surahArabicName = ayah.arabic.surah?.name ?? "";
  const verseRef = `${surahNum}:${verseNum}`;
  const currentUrl = `${SITE_URL}/${locale}/quran/${surahNum}/${verseNum}`;
  const shareText = `${ayah.arabic.text}\n\n"${ayah.translation.text}"`;

  const translationLabel =
    TRANSLATIONS.find((tr) => tr.identifier === translation)?.name ?? translation;

  const verseDetails = [
    { label: t(locale, "surahLabel"), value: surahNum },
    { label: t(locale, "verseLabel"), value: verseNum },
    { label: t(locale, "juz"), value: ayah.arabic.juz },
    { label: t(locale, "page"), value: ayah.arabic.page },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6" dir={rtl ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        className="mb-3"
        items={[
          { label: t(locale, "home"), href: `/${locale}/` },
          { label: t(locale, "quran"), href: `/${locale}/quran` },
          { label: surahName, href: `/${locale}/quran/${surahNum}` },
          { label: `${t(locale, "verseLabel")} ${verseNum}` },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--color-foreground) md:text-3xl">
          {rtl ? surahArabicName : surahName}
          <span className="ml-2 text-(--color-muted)">({verseRef})</span>
        </h1>
        <p className="mt-1 text-sm text-(--color-muted)">
          {ayah.arabic.surah?.revelationType === "Meccan"
            ? t(locale, "meccan")
            : t(locale, "medinan")}
          {" — "}
          {ayah.arabic.surah?.numberOfAyahs} {t(locale, "verses")}
        </p>
      </div>

      {/* Arabic verse */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-6 shadow-sm">
        <p
          lang="ar"
          dir="rtl"
          className="arabic-text text-right text-2xl leading-[2.5] text-(--color-foreground) md:text-3xl"
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
          {t(locale, "translation")}
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
          dir={translationDir}
        >
          &ldquo;{ayah.translation.text}&rdquo;
        </p>
        <p className="mt-3 text-xs text-(--color-muted)">
          — {translationLabel}
        </p>
        {ayah.transliteration?.text && (
          <TransliterationToggle
            text={ayah.transliteration.text}
            isAr={rtl}
          />
        )}
      </div>

      {/* Tafsir section */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-(--color-foreground)">
            <BookMarked size={16} className="text-(--color-primary)" />
            {t(locale, "tafsir")}
          </h2>
          <Suspense fallback={null}>
            <TafsirSourceSwitcher currentSource={activeSource} locale={locale} />
          </Suspense>
        </div>
        <hr className="mb-4 border-(--color-border)" />

        {tafsirData ? (
          <div>
            <div className="relative">
              <div className="h-64 overflow-y-auto">
                {tafsirData.text_english ? (
                  <p className="text-sm leading-relaxed text-(--color-foreground)" dir="ltr">
                    {tafsirData.text_english}
                  </p>
                ) : tafsirData.text_arabic ? (
                  <p
                    className="arabic-text text-right text-lg leading-relaxed text-(--color-foreground)"
                    dir="rtl"
                    lang="ar"
                  >
                    {tafsirData.text_arabic}
                  </p>
                ) : null}
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-(--color-surface) to-transparent" />
            </div>
            <p className="mt-4 text-xs text-(--color-muted)">
              — {tafsirData.source_name}
            </p>
          </div>
        ) : (
          <p className="text-sm text-(--color-muted)">
            {t(locale, "tafsirUnavailable")}
          </p>
        )}
      </div>

      {/* Verse details */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {verseDetails.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-(--color-border) bg-(--color-surface) p-3 text-center"
          >
            <p className="text-xs text-(--color-muted)">{item.label}</p>
            <p className="mt-1 text-lg font-bold text-(--color-primary)">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Share actions — desktop card */}
      <div className="hidden rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 md:block">
        <h2 className="mb-4 text-sm font-semibold text-(--color-foreground)">
          {t(locale, "shareVerse")}
        </h2>
        <ShareActions
          text={shareText}
          url={currentUrl}
          locale={locale}
          ogUrl={`/${locale}/quran/${surahNum}/${verseNum}/og-image`}
          downloadFilename={`quran-${surahNum}-${verseNum}.png`}
        />
      </div>

      {/* Share FAB — mobile only */}
      <ShareFab
        text={shareText}
        url={currentUrl}
        locale={locale}
        ogUrl={`/${locale}/quran/${surahNum}/${verseNum}/og-image`}
        downloadFilename={`quran-${surahNum}-${verseNum}.png`}
      />

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        {verseNum > 1 && (
          <a
            href={`/${locale}/quran/${surahNum}/${verseNum - 1}`}
            className="flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            {rtl ? "→" : "←"} {t(locale, "previous")}
          </a>
        )}
        <div className="flex-1" />
        {verseNum < (ayah.arabic.surah?.numberOfAyahs ?? 0) && (
          <a
            href={`/${locale}/quran/${surahNum}/${verseNum + 1}`}
            className="flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            {t(locale, "next")} {rtl ? "←" : "→"}
          </a>
        )}
      </div>
    </div>
  );
}
