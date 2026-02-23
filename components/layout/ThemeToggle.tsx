"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import Button from "@/components/ui/Button";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme !== "system") root.classList.add(theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = localStorage.getItem("zee-theme") as Theme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  function cycle() {
    const next: Theme = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    setTheme(next);
    applyTheme(next);
    if (next === "system") localStorage.removeItem("zee-theme");
    else localStorage.setItem("zee-theme", next);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={cycle}
      aria-label={`Switch theme (current: ${theme})`}
    >
      {theme === "dark" ? (
        <Moon size={15} />
      ) : theme === "light" ? (
        <Sun size={15} />
      ) : (
        <Monitor size={15} />
      )}
    </Button>
  );
}
