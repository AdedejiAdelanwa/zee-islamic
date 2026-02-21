"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TransliterationToggleProps {
  text: string;
  isAr?: boolean;
}

export default function TransliterationToggle({
  text,
  isAr = false,
}: TransliterationToggleProps) {
  // Default: expanded on mobile, collapsed on desktop
  // We start collapsed and let the CSS/JS handle the mobile-open state
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    setOpen(mq.matches); // expanded on mobile, collapsed on desktop

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setOpen(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="mt-3 border-t border-(--color-border) pt-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wide text-(--color-muted) transition-colors hover:text-(--color-foreground)"
        aria-expanded={open}
      >
        <span>{isAr ? "النطق" : "Transliteration"}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {open && (
        <p className="mt-2 text-sm leading-relaxed tracking-wide text-(--color-foreground) italic">
          {text}
        </p>
      )}
    </div>
  );
}
