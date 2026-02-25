"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { TRANSLATIONS, groupByLanguage, getDefaultTranslation } from "@/lib/translations";

interface TranslationSwitcherProps {
  currentTranslation?: string;
  locale?: string;
}

const grouped = groupByLanguage(TRANSLATIONS);

export default function TranslationSwitcher({
  currentTranslation,
  locale = "en",
}: TranslationSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAr = locale === "ar";

  const active = currentTranslation ?? getDefaultTranslation(locale);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("translation", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative inline-block" dir={isAr ? "rtl" : "ltr"}>
      <label className="sr-only">
        {isAr ? "اختر الترجمة" : "Select translation"}
      </label>
      <div className="relative">
        <select
          value={active}
          onChange={handleChange}
          className="appearance-none rounded-lg border border-(--color-border) bg-(--color-surface) py-1.5 pl-3 pr-8 text-sm font-medium text-(--color-foreground) transition-colors hover:border-(--color-primary) focus:border-(--color-primary) focus:outline-none"
        >
          {Array.from(grouped.entries()).map(([languageName, items]) => (
            <optgroup key={languageName} label={languageName}>
              {items.map((t) => (
                <option key={t.identifier} value={t.identifier}>
                  {t.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--color-muted)"
        />
      </div>
    </div>
  );
}
