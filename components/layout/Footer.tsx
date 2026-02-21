import Link from "next/link";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import type { Locale } from "@/lib/types";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const isAr = locale === "ar";

  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface) pb-20 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={`/${locale}/`}
              className="text-xl font-bold text-(--color-primary)"
            >
              ☪ ZEE
            </Link>
            <p className="mt-2 text-sm text-(--color-muted)">
              {isAr
                ? "محرك بحث إسلامي شامل للقرآن والحديث"
                : "Your Islamic knowledge search engine."}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-(--color-foreground)">
              {isAr ? "استكشف" : "Explore"}
            </h3>
            <ul className="space-y-2 text-sm text-(--color-muted)">
              <li>
                <Link
                  href={`/${locale}/search?type=quran`}
                  className="hover:text-(--color-primary)"
                >
                  {isAr ? "القرآن الكريم" : "Quran"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/search?type=hadith`}
                  className="hover:text-(--color-primary)"
                >
                  {isAr ? "الحديث الشريف" : "Hadith"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-(--color-foreground)">
              {isAr ? "معلومات" : "Info"}
            </h3>
            <ul className="space-y-2 text-sm text-(--color-muted)">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-(--color-primary)"
                >
                  {isAr ? "عن المشروع" : "About"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-(--color-border) pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-(--color-muted)">
              <p>
                {isAr
                  ? "© ٢٠٢٦ ZEE — جميع الحقوق محفوظة"
                  : "© 2026 ZEE. All rights reserved."}
              </p>
              <p className="mt-1">
                {isAr
                  ? "بيانات القرآن من alquran.cloud • بيانات الحديث من Sunnah.com"
                  : "Quran data from alquran.cloud • Hadith data from Sunnah.com"}
              </p>
            </div>
            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}
