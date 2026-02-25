import Link from "next/link";
import { BookMarked, ExternalLink } from "lucide-react";
import type { TafsirResult } from "@/lib/tafsir";
import Highlight from "@/components/ui/Highlight";

interface TafsirResultCardProps {
  result: TafsirResult;
  locale?: string;
  query?: string;
}

export default function TafsirResultCard({
  result,
  locale = "en",
  query = "",
}: TafsirResultCardProps) {
  const isAr = locale === "ar";
  const verseRef = `${result.surahNumber}:${result.verseNumber}`;
  const href = `/${locale}/quran/${result.surahNumber}/${result.verseNumber}?tafsir=${result.source}`;

  return (
    <article className="group rounded-2xl border border-(--color-border) border-l-[3px] border-l-(--color-accent) bg-(--color-surface) p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Source label + verse ref */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-(--color-primary)">
          <BookMarked size={13} />
          <span>{isAr ? "تفسير" : "Tafsir"}</span>
        </div>
        <span className="text-xs text-(--color-muted)">{verseRef}</span>
      </div>

      {/* Excerpt */}
      <div className="relative mb-4">
        <div className="h-36 overflow-y-auto">
          <p
            className="text-sm leading-relaxed text-(--color-foreground)"
            dir={isAr ? "rtl" : "ltr"}
          >
            <Highlight text={result.text} query={query} />
          </p>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-(--color-surface) to-transparent" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-(--color-muted)">
          {isAr ? "المصدر:" : "Source:"} {result.sourceName}
        </span>
        <Link
          href={href}
          className="flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1 text-xs font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
        >
          <ExternalLink size={12} />
          {isAr ? "عرض التفسير" : "View Tafsir"}
        </Link>
      </div>
    </article>
  );
}
