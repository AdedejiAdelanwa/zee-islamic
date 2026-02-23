"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
  children: React.ReactNode;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  locale = "en",
  children,
}: FilterDrawerProps) {
  const isAr = locale === "ar";
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Trap scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? "خيارات التصفية" : "Filter options"}
        dir={isAr ? "rtl" : "ltr"}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-(--color-surface) shadow-xl transition-transform duration-300",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-(--color-border)" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--color-border) px-4 py-3">
          <h2 className="text-base font-semibold">
            {isAr ? "تصفية النتائج" : "Filter Results"}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={isAr ? "إغلاق" : "Close"}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 pb-8">
          {children}
        </div>
      </div>
    </>
  );
}
