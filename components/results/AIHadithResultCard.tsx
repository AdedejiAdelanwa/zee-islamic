import Link from "next/link";
import { ScrollText, ExternalLink } from "lucide-react";
import HadithGradeBadge from "@/components/ui/HadithGradeBadge";
import { truncate } from "@/lib/utils";

interface HadithSearchResult {
  id: string;
  book_slug: string;
  book_name: string;
  hadith_number: string | number;
  narrator?: string | null;
  english: string;
  arabic?: string;
  grade?: string | null;
  url: string;
}

interface AIHadithResultCardProps {
  result: HadithSearchResult;
  locale?: string;
}

export default function AIHadithResultCard({
  result,
  locale = "en",
}: AIHadithResultCardProps) {
  const isAr = locale === "ar";
  const grade = result.grade ?? "Unknown";
  const href = result.url || `/${locale}/hadith/${result.book_slug}/${result.hadith_number}`;

  return (
    <article className="group rounded-2xl border border-(--color-border) border-l-[3px] border-l-(--color-semantic-green) bg-(--color-surface) p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Source + grade */}
      <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-(--color-primary)">
          <ScrollText size={13} />
          <span>{isAr ? "حديث" : "Hadith"}</span>
        </div>
        <HadithGradeBadge grade={grade} />
      </div>

      {/* Arabic text */}
      {result.arabic && (
        <p
          lang="ar"
          dir="rtl"
          className="arabic-text mb-3 text-right text-xl leading-loose text-(--color-foreground)"
        >
          {truncate(result.arabic, 300)}
        </p>
      )}

      {/* English text */}
      <p
        className="mb-4 text-sm leading-relaxed text-(--color-muted)"
        dir={isAr ? "rtl" : "ltr"}
      >
        {truncate(result.english, 400)}
      </p>

      {/* Narrator */}
      {result.narrator && (
        <p className="mb-3 text-xs italic text-(--color-muted)">
          {result.narrator}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-(--color-foreground)">
          {result.book_name} #{result.hadith_number}
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
