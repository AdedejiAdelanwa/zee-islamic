"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { t, isRtl } from "@/lib/ui";

const SOURCES = [
  { key: "ibn-kathir", label: "Ibn Kathir" },
  { key: "al-tabari", label: "Al-Tabari" },
];

interface TafsirSourceSwitcherProps {
  currentSource?: string;
  locale?: string;
}

export default function TafsirSourceSwitcher({
  currentSource = "ibn-kathir",
  locale = "en",
}: TafsirSourceSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rtl = isRtl(locale);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tafsir", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative inline-block" dir={rtl ? "rtl" : "ltr"}>
      <label className="sr-only">
        {t(locale, "selectTafsir")}
      </label>
      <div className="relative">
        <select
          value={currentSource}
          onChange={handleChange}
          className="appearance-none rounded-lg border border-(--color-border) bg-(--color-surface) py-1.5 pl-3 pr-8 text-sm font-medium text-(--color-foreground) transition-colors hover:border-(--color-primary) focus:border-(--color-primary) focus:outline-none"
        >
          {SOURCES.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
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
