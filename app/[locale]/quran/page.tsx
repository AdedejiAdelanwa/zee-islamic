import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SURAH_LIST } from "@/lib/surah-list";
import { buildAlternates } from "@/lib/alternates";
import { t, isRtl } from "@/lib/ui";

interface QuranPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: QuranPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${t(locale, "quranFull")} — ZEE`,
    description: t(locale, "quranSubtitle"),
    alternates: buildAlternates(locale, "quran"),
  };
}

export default async function QuranPage({ params }: QuranPageProps) {
  const { locale } = await params;
  const rtl = isRtl(locale);

  const meccanCount = SURAH_LIST.filter((s) => s.revelationType === "Meccan").length;
  const medinanCount = SURAH_LIST.length - meccanCount;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6" dir={rtl ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        className="mb-3"
        items={[
          { label: t(locale, "home"), href: `/${locale}/` },
          { label: t(locale, "quranFull") },
        ]}
      />

      {/* Page header */}
      <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) px-6 py-4 text-center shadow-sm">
        <p className="arabic-text mb-1 text-4xl text-(--color-foreground)">القرآن الكريم</p>
        <h1 className="text-xl font-bold text-(--color-foreground)">
          {t(locale, "quranFull")}
        </h1>
        <p className="mt-0.5 text-sm text-(--color-muted)">
          {t(locale, "quranSubtitle")}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {t(locale, "surahs")}
          </span>
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {t(locale, "juzCount")}
          </span>
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {meccanCount} {t(locale, "meccan")}
          </span>
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-muted)">
            {medinanCount} {t(locale, "medinan")}
          </span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Sidebar — desktop only, sticky */}
        <aside className="hidden w-48 shrink-0 self-start sticky top-20 lg:block">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            {t(locale, "chapters")}
          </p>
          <div className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-xl border border-(--color-border) bg-(--color-surface)">
            {SURAH_LIST.map((s) => (
              <a
                key={s.number}
                href={`#surah-${s.number}`}
                className="flex items-center gap-2 border-b border-(--color-border) px-3 py-2 text-sm transition-colors last:border-0 hover:bg-(--color-accent-light) hover:text-(--color-primary)"
              >
                <span className="w-6 shrink-0 text-center font-mono text-xs font-semibold text-(--color-primary)">
                  {s.number}
                </span>
                <span className="truncate text-xs text-(--color-muted)">
                  {rtl ? s.arabic : s.english}
                </span>
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Mobile: horizontal surah strip */}
          <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2 lg:hidden">
            {SURAH_LIST.map((s) => (
              <a
                key={s.number}
                href={`#surah-${s.number}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-xs font-semibold text-(--color-muted) transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                {s.number}
              </a>
            ))}
          </div>

          {/* Surah cards grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SURAH_LIST.map((s) => {
              const revelationLabel =
                s.revelationType === "Meccan" ? t(locale, "meccan") : t(locale, "medinan");

              return (
                <Link
                  key={s.number}
                  id={`surah-${s.number}`}
                  href={`/${locale}/quran/${s.number}`}
                  className="scroll-mt-24 group flex flex-col rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 shadow-sm transition-all hover:border-(--color-primary) hover:shadow-md"
                >
                  {/* Card header */}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-xs font-bold text-white">
                      {s.number}
                    </span>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <span className="rounded-full border border-(--color-border) bg-(--color-background) px-2 py-0.5 text-xs text-(--color-muted)">
                        {revelationLabel}
                      </span>
                      <span className="rounded-full border border-(--color-border) bg-(--color-background) px-2 py-0.5 text-xs text-(--color-muted)">
                        {s.verses} {t(locale, "verses")}
                      </span>
                    </div>
                  </div>

                  {/* Arabic name */}
                  <p className="arabic-text mb-1 text-right text-2xl text-(--color-foreground) group-hover:text-(--color-primary)">
                    {s.arabic}
                  </p>

                  {/* English name + translation */}
                  <div className="mt-auto pt-2">
                    <p className="text-sm font-semibold text-(--color-foreground)">
                      {s.english}
                    </p>
                    <p className="text-xs text-(--color-muted)">{s.translation}</p>
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between border-t border-(--color-border) pt-3 text-xs text-(--color-muted)">
                    <span>{t(locale, "juz")} {s.juz}</span>
                    <span className="font-medium text-(--color-primary) opacity-0 transition-opacity group-hover:opacity-100">
                      {t(locale, "readArrow")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
