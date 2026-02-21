import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface TrendingSearchesProps {
  locale: string;
}

const TRENDING_EN = [
  "patience",
  "forgiveness",
  "prayer",
  "mercy of Allah",
  "Day of Judgment",
  "Paradise",
  "seeking knowledge",
  "gratitude",
];

const TRENDING_AR = [
  "الصبر",
  "الصلاة",
  "الرحمة",
  "يوم القيامة",
  "الجنة",
  "طلب العلم",
  "الشكر",
  "التوبة",
];

export default function TrendingSearches({ locale }: TrendingSearchesProps) {
  const isAr = locale === "ar";
  const terms = isAr ? TRENDING_AR : TRENDING_EN;
  const label = isAr ? "الأكثر بحثاً" : "Trending";

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-(--color-muted)">
        <TrendingUp size={15} />
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <Link
            key={term}
            href={`/${locale}/search?q=${encodeURIComponent(term)}`}
            className="rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-1.5 text-sm text-(--color-foreground) transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
            lang={isAr ? "ar" : "en"}
            dir={isAr ? "rtl" : "ltr"}
          >
            {term}
          </Link>
        ))}
      </div>
    </div>
  );
}
