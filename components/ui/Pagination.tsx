import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
  isAr?: boolean;
}

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("…");
  pages.push(total);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  buildHref,
  isAr = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = pageNumbers(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label={isAr ? "تنقل بين الصفحات" : "Pagination"}
      dir={isAr ? "rtl" : "ltr"}
      className="mt-8 flex items-center justify-center gap-1"
    >
      {/* Previous */}
      {hasPrev ? (
        <a
          href={buildHref(currentPage - 1)}
          aria-label={isAr ? "السابق" : "Previous"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) text-(--color-foreground) transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
        >
          {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </a>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-(--color-muted) opacity-40">
          {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-(--color-muted)"
          >
            …
          </span>
        ) : (
          <a
            key={p}
            href={buildHref(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
              p === currentPage
                ? "bg-(--color-primary) text-white"
                : "border border-(--color-border) text-(--color-foreground) hover:border-(--color-primary) hover:text-(--color-primary)",
            )}
          >
            {p}
          </a>
        ),
      )}

      {/* Next */}
      {hasNext ? (
        <a
          href={buildHref(currentPage + 1)}
          aria-label={isAr ? "التالي" : "Next"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) text-(--color-foreground) transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
        >
          {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </a>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-(--color-muted) opacity-40">
          {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </nav>
  );
}
