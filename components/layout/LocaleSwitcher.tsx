"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { value: "en", nativeLabel: "EN" },
  { value: "ar", nativeLabel: "AR" },
];

interface LocaleSwitcherProps {
  locale: string;
}

export default function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-(--color-border) bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-(--color-surface) hover:text-(--color-primary)"
      >
        <Globe size={15} />
        <span>{current.nativeLabel}</span>
        <ChevronDown
          size={13}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute top-full z-50 mt-1.5 w-36 overflow-hidden rounded-xl border border-(--color-border) bg-white shadow-lg",
            locale === "ar" ? "left-0" : "right-0",
          )}
        >
          {LOCALES.map((l) => (
            <a
              key={l.value}
              href={`/${l.value}/`}
              role="option"
              aria-selected={l.value === locale}
              lang={l.value}
              dir="ltr"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-(--color-surface)",
                l.value === locale
                  ? "font-semibold text-(--color-primary)"
                  : "text-(--color-foreground)",
              )}
            >
              <span>{l.nativeLabel}</span>
              {l.value === locale && <Check size={13} />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
