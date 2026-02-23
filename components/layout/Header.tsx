import Link from "next/link";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import ThemeToggle from "@/components/layout/ThemeToggle";
import type { Locale } from "@/lib/types";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--color-border) bg-(--color-surface)/95 backdrop-blur supports-backdrop-filter:bg-(--color-surface)/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href={`/${locale}/`}
          className="flex items-center gap-2 text-xl font-bold text-(--color-primary)"
        >
          <span className="text-2xl">☪</span>
          <span>ZEE</span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
