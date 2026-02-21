"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { TRANSLATIONS } from "@/lib/types";

interface TranslationSwitcherProps {
  currentTranslation?: string;
  locale?: string;
}

export default function TranslationSwitcher({
  currentTranslation = "en.sahih",
  locale = "en",
}: TranslationSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAr = locale === "ar";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("translation", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  const current = TRANSLATIONS.find((t) => t.identifier === currentTranslation);

  return (
    <div className="relative inline-block" dir={isAr ? "rtl" : "ltr"}>
      <label className="sr-only">
        {isAr ? "اختر الترجمة" : "Select translation"}
      </label>
      <div className="flex items-center gap-1 text-sm text-(--color-muted)">
        <span className="hidden md:inline">
          {isAr ? "الترجمة:" : "Translation:"}
        </span>
        <div className="relative">
          <select
            value={currentTranslation}
            onChange={handleChange}
            className="appearance-none rounded-lg border border-(--color-border) bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-(--color-foreground) transition-colors hover:border-(--color-primary) focus:border-(--color-primary) focus:outline-none"
          >
            {TRANSLATIONS.map((t) => (
              <option key={t.id} value={t.identifier}>
                {t.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--color-muted)"
          />
        </div>
      </div>
      {current && (
        <p className="mt-0.5 text-xs text-(--color-muted)">
          {current.name}
        </p>
      )}
    </div>
  );
}
