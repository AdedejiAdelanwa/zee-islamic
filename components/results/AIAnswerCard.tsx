import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { AIAnswerCard as AIAnswerCardType } from "@/lib/ai-search";

interface AIAnswerCardProps {
  card: AIAnswerCardType;
  locale?: string;
}

export default function AIAnswerCard({
  card,
  locale = "en",
}: AIAnswerCardProps) {
  const isAr = locale === "ar";

  return (
    <div className="mb-6 rounded-2xl border border-(--color-primary)/20 bg-gradient-to-br from-(--color-primary)/5 to-(--color-accent)/5 p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-(--color-primary)">
          <Sparkles size={13} className="text-white" />
        </div>
      </div>

      {/* Answer text */}
      <p
        className="mb-4 text-sm leading-relaxed text-(--color-foreground)"
        dir={isAr ? "rtl" : "ltr"}
      >
        {card.answer}
      </p>

      {/* Sources */}
      {card.sources.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-xs text-(--color-muted)">
            {isAr ? "المصادر:" : "Sources:"}
          </span>
          <div className="flex flex-wrap gap-2">
            {card.sources.map((source) => (
              <Link
                key={source.label}
                href={source.url}
                className="rounded-full border border-(--color-primary)/20 bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-primary) transition-colors hover:border-(--color-primary) hover:bg-(--color-primary) hover:text-white"
              >
                {source.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-3 text-[10px] text-(--color-muted)">
        {isAr
          ? "هذه الإجابة مستندة إلى النتائج أدناه فقط. يُرجى الرجوع إلى العلماء للتحقق."
          : "This answer is grounded in the results below only. Always verify with a scholar."}
      </p>
    </div>
  );
}
