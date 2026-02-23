import { cn } from "@/lib/utils";

interface HadithGradeBadgeProps {
  grade: string;
  className?: string;
}

function getGradeStyles(grade: string): { label: string; className: string } {
  const normalized = grade.toLowerCase();
  if (normalized.includes("sahih")) {
    return {
      label: "Sahih",
      className: "bg-[#2D7A5F]/10 text-[#2D7A5F] border-[#2D7A5F]/25",
    };
  }
  if (normalized.includes("hasan")) {
    return {
      label: "Hasan",
      className: "bg-orange-100 text-orange-700 border-orange-200",
    };
  }
  if (
    normalized.includes("da'if") ||
    normalized.includes("daif") ||
    normalized.includes("weak")
  ) {
    return {
      label: "Da'if",
      className: "bg-[#C0392B]/10 text-[#C0392B] border-[#C0392B]/25",
    };
  }
  return {
    label: grade || "Unknown",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  };
}

export default function HadithGradeBadge({ grade, className }: HadithGradeBadgeProps) {
  const { label, className: gradeClassName } = getGradeStyles(grade);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        gradeClassName,
        className
      )}
    >
      {label}
    </span>
  );
}
