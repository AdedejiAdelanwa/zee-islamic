"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TAB_CONFIG = [
  { labelEn: "Search",    labelAr: "بحث",        icon: Search,   path: "search",    match: "/search" },
  { labelEn: "Topics",    labelAr: "مواضيع",     icon: BookOpen, path: "",          match: null },
  { labelEn: "Bookmarks", labelAr: "المحفوظات",  icon: Bookmark, path: "bookmarks", match: "/bookmarks" },
  { labelEn: "Profile",   labelAr: "الملف",      icon: User,     path: "profile",   match: "/profile" },
] as const;

interface BottomTabNavProps {
  locale: string;
}

export default function BottomTabNav({ locale }: BottomTabNavProps) {
  const pathname = usePathname();
  const isAr = locale === "ar";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-(--color-border) bg-(--color-surface) md:hidden">
      <div className="grid h-16 grid-cols-4">
        {TAB_CONFIG.map((tab) => {
          const href = `/${locale}/${tab.path}`;
          const label = isAr ? tab.labelAr : tab.labelEn;
          const isActive = tab.match ? pathname.includes(tab.match) : pathname === `/${locale}/` || pathname === `/${locale}`;
          const Icon = tab.icon;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                isActive
                  ? "text-(--color-primary)"
                  : "text-(--color-muted) hover:text-(--color-foreground)"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
