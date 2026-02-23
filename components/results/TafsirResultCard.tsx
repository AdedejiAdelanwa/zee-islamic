import { BookMarked } from "lucide-react";

interface TafsirResultCardProps {
  surah: number;
  verse: number;
  excerpt: string;
  source?: string;
  locale?: string;
}

export default function TafsirResultCard({
  surah,
  verse,
  excerpt,
  source = "Ibn Kathir",
  locale = "en",
}: TafsirResultCardProps) {
  const isAr = locale === "ar";

  return (
    <article className="group rounded-2xl border border-(--color-border) border-l-[3px] border-l-(--color-accent) bg-(--color-surface) p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Source label */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-(--color-primary)">
          <BookMarked size={13} />
          <span>{isAr ? "تفسير" : "Tafsir"}</span>
        </div>
        <span className="text-xs text-(--color-muted)">
          {surah}:{verse}
        </span>
      </div>

      {/* Excerpt */}
      <p
        className="mb-4 text-sm leading-relaxed text-(--color-foreground)"
        dir={isAr ? "rtl" : "ltr"}
      >
        {excerpt}
      </p>

      {/* Source */}
      <p className="text-xs text-(--color-muted)">
        {isAr ? "المصدر:" : "Source:"} {source}
      </p>
    </article>
  );
}
