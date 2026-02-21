import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import type { AyahWithTranslation } from "@/lib/types";

interface QuranResultCardProps {
  result: AyahWithTranslation;
  locale?: string;
  query?: string;
}

function highlightQuery(text: string, query: string): string {
  if (!query) return text;
  return text; // Returning plain text for server component; highlighting done client-side if needed
}

export default function QuranResultCard({
  result,
  locale = "en",
  query,
}: QuranResultCardProps) {
  const isAr = locale === "ar";
  const { arabic, translation, surahNumber, verseNumber } = result;

  const surahName = arabic.surah?.englishName ?? `Surah ${surahNumber}`;
  const surahArabicName = arabic.surah?.name ?? "";
  const verseRef = `${surahNumber}:${verseNumber}`;
  const href = `/${locale}/quran/${surahNumber}/${verseNumber}`;

  return (
    <article className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
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
      <p
        lang="ar"
        dir="rtl"
        className="arabic-text mb-3 text-right text-2xl leading-loose text-(--color-foreground)"
      >
        {arabic.text}
      </p>

      {/* Surah reference */}
      <p className="mb-2 text-xs text-(--color-muted)" dir="rtl" lang="ar">
        — {surahArabicName}
      </p>

      {/* Translation */}
      {translation && (
        <p
          className="mb-4 text-sm leading-relaxed text-(--color-muted)"
          dir={isAr ? "rtl" : "ltr"}
          lang={isAr ? "ar" : "en"}
        >
          {translation.text}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-(--color-foreground)">
          {surahName} ({verseRef})
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
