"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import FilterDrawer from "./FilterDrawer";

interface FilterBarProps {
  locale?: string;
}

const TYPES = [
  { value: "all", labelEn: "All", labelAr: "الكل" },
  { value: "quran", labelEn: "Quran", labelAr: "القرآن" },
  { value: "hadith", labelEn: "Hadith", labelAr: "الحديث" },
  { value: "tafsir", labelEn: "Tafsir", labelAr: "التفسير" },
];

const GRADES = [
  { value: "Sahih", labelEn: "Sahih", labelAr: "صحيح" },
  { value: "Hasan", labelEn: "Hasan", labelAr: "حسن" },
  { value: "Daif", labelEn: "Da'if", labelAr: "ضعيف" },
];

export default function FilterBar({ locale = "en" }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAr = locale === "ar";

  const currentType = searchParams.get("type") ?? "all";
  const currentGrades = searchParams.getAll("grade");

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleGrade(grade: string) {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll("grade");
    if (existing.includes(grade)) {
      params.delete("grade");
      existing.filter((g) => g !== grade).forEach((g) => params.append("grade", g));
    } else {
      params.append("grade", grade);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Type filter */}
      <div>
        <p className="mb-3 text-sm font-semibold text-(--color-foreground)">
          {isAr ? "نوع المحتوى" : "Content Type"}
        </p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setParam("type", type.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                currentType === type.value
                  ? "bg-(--color-primary) text-white"
                  : "border border-(--color-border) bg-white text-black hover:border-(--color-primary) hover:text-(--color-primary)"
              )}
            >
              {isAr ? type.labelAr : type.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Grade filter (shown when Hadith selected) */}
      {(currentType === "all" || currentType === "hadith") && (
        <div>
          <p className="mb-3 text-sm font-semibold text-(--color-foreground)">
            {isAr ? "درجة الحديث" : "Hadith Grade"}
          </p>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((grade) => (
              <button
                key={grade.value}
                onClick={() => toggleGrade(grade.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  currentGrades.includes(grade.value)
                    ? "bg-(--color-primary) text-white"
                    : "border border-(--color-border) bg-white text-black hover:border-(--color-primary) hover:text-(--color-primary)"
                )}
              >
                {isAr ? grade.labelAr : grade.labelEn}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Desktop: inline */}
      <div className="hidden items-center gap-3 md:flex">
        <span className="text-sm font-medium text-(--color-muted)">
          {isAr ? "تصفية:" : "Filter:"}
        </span>
        {TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setParam("type", type.value)}
            className={cn(
              "rounded-full px-3 py-1 text-sm transition-colors",
              currentType === type.value
                ? "bg-(--color-primary) text-white"
                : "border border-(--color-border) bg-white text-black hover:border-(--color-primary) hover:text-(--color-primary)"
            )}
          >
            {isAr ? type.labelAr : type.labelEn}
          </button>
        ))}
      </div>

      {/* Mobile: button + drawer */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-(--color-surface) md:hidden"
      >
        <SlidersHorizontal size={16} />
        {isAr ? "تصفية" : "Filters"}
        {(currentType !== "all" || currentGrades.length > 0) && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-(--color-primary) text-[10px] text-white">
            {(currentType !== "all" ? 1 : 0) + currentGrades.length}
          </span>
        )}
      </button>

      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        locale={locale}
      >
        {filterContent}
      </FilterDrawer>
    </div>
  );
}
