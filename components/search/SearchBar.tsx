"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  locale?: string;
  initialQuery?: string;
  className?: string;
  autoFocus?: boolean;
}

const SUGGESTIONS_EN = [
  "patience in hardship",
  "forgiveness from Allah",
  "importance of prayer",
  "mercy of Allah",
  "seeking knowledge",
  "gratitude",
  "Day of Judgment",
  "Paradise",
];

const SUGGESTIONS_AR = [
  "الصبر على البلاء",
  "المغفرة من الله",
  "أهمية الصلاة",
  "رحمة الله",
  "طلب العلم",
  "الشكر",
  "يوم القيامة",
  "الجنة",
];

export default function SearchBar({
  locale = "en",
  initialQuery = "",
  className,
  autoFocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAr = locale === "ar";
  const allSuggestions = isAr ? SUGGESTIONS_AR : SUGGESTIONS_EN;

  function filterSuggestions(value: string) {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = allSuggestions.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase()),
    );
    setSuggestions(filtered.slice(0, 5));
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setActiveSuggestion(-1);
      filterSuggestions(value);
      setShowSuggestions(true);
    },
    [allSuggestions], // eslint-disable-line react-hooks/exhaustive-deps
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
  }

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/${locale}/search?q=${encodeURIComponent(suggestion)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestion]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  function handleClear() {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!inputRef.current?.closest("form")?.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative w-full", className)}
      role="search"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="relative flex items-center">
        {/* Search icon */}
        <Search
          size={20}
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-(--color-muted)",
            isAr ? "right-4" : "left-4",
          )}
        />

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder={
            isAr ? "ابحث في القرآن والحديث..." : "what does islam say about..."
          }
          lang={isAr ? "ar" : "en"}
          dir={isAr ? "rtl" : "ltr"}
          autoComplete="off"
          spellCheck={false}
          className={cn(
            "w-full rounded-full border border-(--color-border) bg-white py-3.5 text-base shadow-sm transition-all",
            "placeholder:text-(--color-muted)",
            "focus:border-(--color-primary) focus:outline-none focus:ring-2 focus:ring-primary/20",
            isAr ? "pr-12 pl-24" : "pl-12 pr-24",
          )}
        />

        {/* Clear + Submit */}
        <div
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center gap-1",
            isAr ? "left-2" : "right-2",
          )}
        >
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full p-1.5 text-(--color-muted) transition-colors hover:bg-(--color-surface) hover:text-(--color-foreground)"
              aria-label={isAr ? "مسح" : "Clear"}
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            aria-label={isAr ? "بحث" : "Search"}
          >
            {isAr ? "بحث" : "Go"}
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-(--color-border) bg-white shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              role="option"
              aria-selected={index === activeSuggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-4 py-3 text-sm transition-colors",
                index === activeSuggestion
                  ? "bg-(--color-surface) text-(--color-primary)"
                  : "hover:bg-(--color-surface)",
              )}
            >
              <Search size={14} className="shrink-0 text-(--color-muted)" />
              <span lang={isAr ? "ar" : "en"} dir={isAr ? "rtl" : "ltr"}>
                {suggestion}
              </span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
