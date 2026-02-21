import Link from "next/link";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import type { Locale } from "@/lib/types";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--color-border) bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href={`/${locale}/`}
          className="flex items-center gap-2 text-xl font-bold text-(--color-primary)"
        >
          <span className="text-2xl">☪</span>
          <span>ZEE</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href={`/${locale}/`}
            className="text-(--color-foreground) transition-colors hover:text-(--color-primary)"
          >
            {locale === "en" ? "Home" : "الرئيسية"}
          </Link>
          <Link
            href={`/${locale}/search`}
            className="text-(--color-foreground) transition-colors hover:text-(--color-primary)"
          >
            {locale === "en" ? "Search" : "بحث"}
          </Link>
        </nav>

        {/* Language switcher — right side */}
        <LocaleSwitcher locale={locale} />
      </div>
    </header>
  );
}
