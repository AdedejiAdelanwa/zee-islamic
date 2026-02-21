import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { HadithGrade } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gradeColor(grade: string): string {
  const normalized = grade.toLowerCase();
  if (normalized.includes("sahih")) return "grade-sahih";
  if (normalized.includes("hasan")) return "grade-hasan";
  if (normalized.includes("da'if") || normalized.includes("daif") || normalized.includes("weak")) return "grade-daif";
  return "grade-daif";
}

export function gradeLabel(grade: string): HadithGrade {
  const normalized = grade.toLowerCase();
  if (normalized.includes("sahih")) return "Sahih";
  if (normalized.includes("hasan")) return "Hasan";
  if (normalized.includes("da'if") || normalized.includes("daif") || normalized.includes("weak")) return "Da'if";
  return "Unknown";
}

export function whatsappShareUrl(text: string, url: string): string {
  const message = encodeURIComponent(`${text}\n\n${url}`);
  return `https://wa.me/?text=${message}`;
}

export function twitterShareUrl(text: string, url: string): string {
  const tweet = encodeURIComponent(`${text}\n\n${url}`);
  return `https://twitter.com/intent/tweet?text=${tweet}`;
}

export function formatVerseRef(surah: number, verse: number): string {
  return `${surah}:${verse}`;
}

export function getSurahName(surahNumber: number): string {
  return `Surah ${surahNumber}`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
