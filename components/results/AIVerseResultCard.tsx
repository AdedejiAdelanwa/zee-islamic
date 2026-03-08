import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";

interface VerseSearchResult {
  surah_number: number;
  verse_number: number;
  surah_name_english: string;
  surah_name_arabic: string;
  arabic: string;
  translation: string;
  juz: number;
  url: string;
}

interface AIVerseResultCardProps {
  result: VerseSearchResult;
  locale?: string;
}

export default function AIVerseResultCard({
  result,
  locale = "en",
}: AIVerseResultCardProps) {
  const isAr = locale === "ar";
  const verseRef = `${result.surah_number}:${result.verse_number}`;
  const href = result.url || `/${locale}/quran/${result.surah_number}/${result.verse_number}`;

  return (
    <article className="group rounded-2xl border border-(--color-border) border-l-[3px] border-l-(--color-primary) bg-(--color-surface) p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Source label */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-(--color-primary)">
          <BookOpen size={13} />
          <span>{isAr ? "القرآن الكريم" : "Quran"}</span>
        </div>
        <span className="text-xs text-(--color-muted)">
          {isAr ? `الآية ${verseRef}` : `Verse ${verseRef}`}
        </span>
      </div>

      {/* Arabic text */}
      {result.arabic && (
        <p
          lang="ar"
          dir="rtl"
          className="arabic-text mb-3 text-right text-2xl leading-loose text-(--color-foreground)"
        >
          {result.arabic}
        </p>
      )}

      {/* Surah reference */}
      {result.surah_name_arabic && (
        <p className="mb-2 text-xs text-(--color-muted)" dir="rtl" lang="ar">
          — {result.surah_name_arabic}
        </p>
      )}

      {/* Translation */}
      {result.translation && (
        <p
          className="mb-4 text-sm leading-relaxed text-(--color-muted)"
          dir={isAr ? "rtl" : "ltr"}
          lang={isAr ? "ar" : "en"}
        >
          {result.translation}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-(--color-foreground)">
          {result.surah_name_english} ({verseRef})
        </span>
        <Link
          href={href}
          className="flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1 text-xs font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
        >
          <ExternalLink size={12} />
          {isAr ? "عرض الآية" : "View Verse"}
        </Link>
      </div>
    </article>
  );
}
