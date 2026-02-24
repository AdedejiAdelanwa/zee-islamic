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

const ALL_COLLECTIONS = HADITH_COLLECTIONS.map((c) => c.value);
const ALL_TAFSIR = TAFSIR_SOURCES.map((t) => t.value);

interface SearchFiltersProps {
  locale?: string;
}

export default function SearchFilters({ locale = "en" }: SearchFiltersProps) {
  const isAr = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const source = (searchParams.get("type") as Source) ?? "all";
  const showHadith = source === "all" || source === "hadith";
  const showTafsir = source === "all" || source === "tafsir";

  // No URL params = implicit "all selected"; explicit params = user's selection
  const rawCollections = searchParams.getAll("collection");
  const rawTafsir = searchParams.getAll("tafsir");
  const effectiveCollections = showHadith
    ? rawCollections.length === 0 ? ALL_COLLECTIONS : rawCollections
    : [];
  const effectiveTafsir = showTafsir
    ? rawTafsir.length === 0 ? ALL_TAFSIR : rawTafsir
    : [];

  const deselectedCount =
    (showHadith ? ALL_COLLECTIONS.length - effectiveCollections.length : 0) +
    (showTafsir ? ALL_TAFSIR.length - effectiveTafsir.length : 0);

  function handleSourceChange(val: Source) {
    const params = new URLSearchParams(searchParams.toString());
    // Clear sub-filters — switching source resets to implicit "all selected"
    params.delete("collection");
    params.delete("tafsir");
    if (val === "all") {
      params.delete("type");
    } else {
      params.set("type", val);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  function toggleCollection(val: string) {
    const next = effectiveCollections.includes(val)
      ? effectiveCollections.filter((c) => c !== val)
      : [...effectiveCollections, val];

    const params = new URLSearchParams(searchParams.toString());
    params.delete("collection");
    // All selected → remove params (implicit); partial → write explicit list
    if (next.length < ALL_COLLECTIONS.length) {
      next.forEach((c) => params.append("collection", c));
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  function toggleTafsir(val: string) {
    const next = effectiveTafsir.includes(val)
      ? effectiveTafsir.filter((t) => t !== val)
      : [...effectiveTafsir, val];

    const params = new URLSearchParams(searchParams.toString());
    params.delete("tafsir");
    if (next.length < ALL_TAFSIR.length) {
      next.forEach((t) => params.append("tafsir", t));
    }
    router.replace(`${pathname}?${params.toString()}`);
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
            checked={effectiveCollections.includes(col.value)}
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
            checked={effectiveTafsir.includes(t.value)}
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

      {/* Mobile: drawer trigger */}
      {(showHadith || showTafsir) && (
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => setDrawerOpen(true)}
          className="md:hidden"
        >
          {isAr ? "المجموعات" : "Collections"}
          {deselectedCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-(--color-primary) text-[10px] text-white">
              -{deselectedCount}
            </span>
          )}
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
                      checked={effectiveCollections.includes(col.value)}
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
                      checked={effectiveTafsir.includes(t.value)}
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
