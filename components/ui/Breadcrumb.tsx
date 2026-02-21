import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale?: string;
  className?: string;
}

export default function Breadcrumb({ items, locale = "en", className }: BreadcrumbProps) {
  const isAr = locale === "ar";

  return (
    <nav
      aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}
      className={cn("flex items-center flex-wrap gap-1 text-sm text-(--color-muted)", className)}
      dir={isAr ? "rtl" : "ltr"}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.href ?? item.label} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight
                size={14}
                className={cn(isAr && "rotate-180")}
                aria-hidden
              />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-(--color-primary) hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(isLast && "font-medium text-(--color-foreground)")}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
