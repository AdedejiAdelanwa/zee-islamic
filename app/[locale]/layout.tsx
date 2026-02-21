import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomTabNav from "@/components/layout/BottomTabNav";
import { buildAlternates } from "@/lib/alternates";
import type { Locale } from "@/lib/types";

const SUPPORTED_LOCALES: Locale[] = ["en", "ar"];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: {
      default: isAr ? "ZEE — محرك البحث الإسلامي" : "ZEE — Islamic Search Engine",
      template: isAr ? "%s | ZEE" : "%s | ZEE",
    },
    description: isAr
      ? "ابحث في القرآن الكريم والحديث النبوي والمعرفة الإسلامية في ثوانٍ"
      : "Search the Quran, Hadith, and Islamic knowledge in seconds.",
    alternates: buildAlternates(locale),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header locale={typedLocale} />
        <main className="flex-1">{children}</main>
        <Footer locale={typedLocale} />
      </div>
      <BottomTabNav locale={typedLocale} />
    </>
  );
}
