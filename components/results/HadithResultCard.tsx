import Link from "next/link";
import { ScrollText, ExternalLink } from "lucide-react";
import type { Hadith } from "@/lib/types";
import HadithGradeBadge from "@/components/ui/HadithGradeBadge";
import { truncate } from "@/lib/utils";

interface HadithResultCardProps {
  result: Hadith;
  locale?: string;
}

export default function HadithResultCard({
  result,
  locale = "en",
}: HadithResultCardProps) {
  const isAr = locale === "ar";
  const collectionName = result.book?.bookName ?? result.bookSlug;
  const grade = result.grades?.[0]?.grade ?? "Unknown";
  const href = `/${locale}/hadith/${result.bookSlug}/${result.hadithNumber}`;

  return (
    <article className="group rounded-2xl border border-(--color-border) bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Source + grade */}
      <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-(--color-primary)">
          <ScrollText size={13} />
          <span>{isAr ? "حديث" : "Hadith"}</span>
        </div>
        <HadithGradeBadge grade={grade} />
      </div>

      {/* Arabic text */}
      {result.hadithArabic && (
        <p
          lang="ar"
          dir="rtl"
          className="arabic-text mb-3 text-right text-xl leading-loose text-(--color-foreground)"
        >
          {truncate(result.hadithArabic, 300)}
        </p>
      )}

      {/* English text */}
      <p
        className="mb-4 text-sm leading-relaxed text-(--color-muted)"
        dir={isAr ? "rtl" : "ltr"}
      >
        {truncate(result.hadithEnglish, 400)}
      </p>

      {/* Narrator */}
      {result.englishNarrator && (
        <p className="mb-3 text-xs italic text-(--color-muted)">
          {result.englishNarrator}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-(--color-foreground)">
          {collectionName} #{result.hadithNumber}
        </span>
        <Link
          href={href}
          className="flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1 text-xs font-medium transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
        >
          <ExternalLink size={12} />
          {isAr ? "عرض الحديث" : "View Hadith"}
        </Link>
      </div>
    </article>
  );
}
