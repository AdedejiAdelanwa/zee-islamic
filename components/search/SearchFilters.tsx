"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import FilterDrawer from "./FilterDrawer";

type Source = "all" | "quran" | "hadith" | "tafsir";

const SOURCES: { value: Source; labelEn: string; labelAr: string }[] = [
  { value: "all", labelEn: "All Islam", labelAr: "الإسلام كله" },
  { value: "quran", labelEn: "Quran", labelAr: "القرآن" },
  { value: "hadith", labelEn: "Hadith", labelAr: "الحديث" },
  { value: "tafsir", labelEn: "Tafsir", labelAr: "التفسير" },
];

const HADITH_COLLECTIONS = [
  { value: "bukhari", labelEn: "Sahih Bukhari", labelAr: "صحيح البخاري" },
  { value: "muslim", labelEn: "Sahih Muslim", labelAr: "صحيح مسلم" },
  { value: "abu-dawud", labelEn: "Abu Dawud", labelAr: "أبو داود" },
  { value: "tirmidhi", labelEn: "Tirmidhi", labelAr: "الترمذي" },
  { value: "ibn-majah", labelEn: "Ibn Majah", labelAr: "ابن ماجه" },
  { value: "nasai", labelEn: "Nasa'i", labelAr: "النسائي" },
  { value: "muwatta", labelEn: "Muwatta", labelAr: "الموطأ" },
];

const TAFSIR_SOURCES = [
  { value: "ibn-kathir", labelEn: "Ibn Kathir", labelAr: "ابن كثير" },
  { value: "tabari", labelEn: "Al-Tabari", labelAr: "الطبري" },
];

interface SearchFiltersProps {
  locale?: string;
}

export default function SearchFilters({ locale = "en" }: SearchFiltersProps) {
  const isAr = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const source = (searchParams.get("type") as Source) ?? "all";
  const [hadithCollections, setHadithCollections] = useState<string[]>([]);
  const [tafsirSources, setTafsirSources] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const showHadith = source === "all" || source === "hadith";
  const showTafsir = source === "all" || source === "tafsir";
  const totalSelected = hadithCollections.length + tafsirSources.length;

  function handleSourceChange(val: Source) {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all") {
      params.delete("type");
    } else {
      params.set("type", val);
    }
    router.replace(`${pathname}?${params.toString()}`);

    if (val === "quran") {
      setHadithCollections([]);
      setTafsirSources([]);
    } else if (val === "hadith") {
      setTafsirSources([]);
    } else if (val === "tafsir") {
      setHadithCollections([]);
    }
  }

  function toggleCollection(val: string) {
    setHadithCollections((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
    );
  }

  function toggleTafsir(val: string) {
    setTafsirSources((prev) =>
      prev.includes(val) ? prev.filter((t) => t !== val) : [...prev, val],
    );
  }

  const hadithCheckboxList = (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {HADITH_COLLECTIONS.map((col) => (
        <label
          key={col.value}
          className="flex cursor-pointer items-center gap-1.5 text-sm text-(--color-foreground)"
        >
          <input
            type="checkbox"
            checked={hadithCollections.includes(col.value)}
            onChange={() => toggleCollection(col.value)}
            className="h-3.5 w-3.5 accent-(--color-primary)"
          />
          {isAr ? col.labelAr : col.labelEn}
        </label>
      ))}
    </div>
  );

  const tafsirCheckboxList = (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {TAFSIR_SOURCES.map((t) => (
        <label
          key={t.value}
          className="flex cursor-pointer items-center gap-1.5 text-sm text-(--color-foreground)"
        >
          <input
            type="checkbox"
            checked={tafsirSources.includes(t.value)}
            onChange={() => toggleTafsir(t.value)}
            className="h-3.5 w-3.5 accent-(--color-primary)"
          />
          {isAr ? t.labelAr : t.labelEn}
        </label>
      ))}
    </div>
  );

  return (
    <div
      className="mt-5 flex w-full max-w-2xl flex-col items-center gap-3"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Radio row */}
      <div
        role="radiogroup"
        aria-label={isAr ? "البحث في" : "Search in"}
        className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-center"
      >
        <span className="text-sm font-medium text-(--color-muted)">
          {isAr ? "البحث في:" : "Search in:"}
        </span>
        <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:flex-row">
          {SOURCES.map((s) => (
            <Button
              key={s.value}
              type="button"
              role="radio"
              aria-checked={source === s.value}
              variant={source === s.value ? "primary" : "outline"}
              size="md"
              onClick={() => handleSourceChange(s.value)}
            >
              {isAr ? s.labelAr : s.labelEn}
            </Button>
          ))}
        </div>
      </div>

      {/* Desktop: inline checkboxes */}
      {showHadith && (
        <div className="hidden w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3 md:block">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            {isAr ? "مجموعات الحديث" : "Hadith Collections"}
          </p>
          {hadithCheckboxList}
        </div>
      )}

      {showTafsir && (
        <div className="hidden w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3 md:block">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            {isAr ? "مصادر التفسير" : "Tafsir Sources"}
          </p>
          {tafsirCheckboxList}
        </div>
      )}

      {/* Mobile: accordion trigger */}
      {(showHadith || showTafsir) && (
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => setDrawerOpen(true)}
          className="md:hidden"
        >
          {isAr ? "المجموعات" : "Hadith Collections"}
          {totalSelected > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-(--color-primary) text-[10px] text-white">
              {totalSelected}
            </span>
          )}
          <span className="font-bold text-(--color-primary)">+</span>
          <ChevronDown size={13} className="text-(--color-muted)" />
        </Button>
      )}

      {/* Mobile bottom-sheet drawer */}
      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        locale={locale}
      >
        <div className="space-y-6">
          {showHadith && (
            <div>
              <p className="mb-3 text-sm font-semibold text-(--color-foreground)">
                {isAr ? "مجموعات الحديث" : "Hadith Collections"}
              </p>
              <div className="flex flex-col gap-3">
                {HADITH_COLLECTIONS.map((col) => (
                  <label
                    key={col.value}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-(--color-foreground)"
                  >
                    <input
                      type="checkbox"
                      checked={hadithCollections.includes(col.value)}
                      onChange={() => toggleCollection(col.value)}
                      className="h-4 w-4 accent-(--color-primary)"
                    />
                    {isAr ? col.labelAr : col.labelEn}
                  </label>
                ))}
              </div>
            </div>
          )}

          {showHadith && showTafsir && (
            <hr className="border-(--color-border)" />
          )}

          {showTafsir && (
            <div>
              <p className="mb-3 text-sm font-semibold text-(--color-foreground)">
                {isAr ? "مصادر التفسير" : "Tafsir Sources"}
              </p>
              <div className="flex flex-col gap-3">
                {TAFSIR_SOURCES.map((t) => (
                  <label
                    key={t.value}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-(--color-foreground)"
                  >
                    <input
                      type="checkbox"
                      checked={tafsirSources.includes(t.value)}
                      onChange={() => toggleTafsir(t.value)}
                      className="h-4 w-4 accent-(--color-primary)"
                    />
                    {isAr ? t.labelAr : t.labelEn}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </FilterDrawer>
    </div>
  );
}
