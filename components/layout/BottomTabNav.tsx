"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomTabNavProps {
  locale: string;
}

export default function BottomTabNav({ locale }: BottomTabNavProps) {
  const pathname = usePathname();

  const tabs = [
    {
      href: `/${locale}/search`,
      label: locale === "ar" ? "بحث" : "Search",
      icon: Search,
      match: "/search",
    },
    {
      href: `/${locale}/`,
      label: locale === "ar" ? "مواضيع" : "Topics",
      icon: BookOpen,
      match: null,
    },
    {
      href: `/${locale}/bookmarks`,
      label: locale === "ar" ? "المحفوظات" : "Bookmarks",
      icon: Bookmark,
      match: "/bookmarks",
    },
    {
      href: `/${locale}/profile`,
      label: locale === "ar" ? "الملف" : "Profile",
      icon: User,
      match: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-(--color-border) bg-white md:hidden">
      <div className="grid h-16 grid-cols-4">
        {tabs.map((tab) => {
          const isActive = tab.match ? pathname.includes(tab.match) : pathname === `/${locale}/` || pathname === `/${locale}`;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                isActive
                  ? "text-(--color-primary)"
                  : "text-(--color-muted) hover:text-(--color-foreground)"
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
