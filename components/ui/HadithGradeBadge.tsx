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
      className: "bg-green-100 text-green-800 border-green-200",
    };
  }
  if (normalized.includes("hasan")) {
    return {
      label: "Hasan",
      className: "bg-orange-100 text-orange-800 border-orange-200",
    };
  }
  if (
    normalized.includes("da'if") ||
    normalized.includes("daif") ||
    normalized.includes("weak")
  ) {
    return {
      label: "Da'if",
      className: "bg-red-100 text-red-800 border-red-200",
    };
  }
  return {
    label: grade || "Unknown",
    className: "bg-gray-100 text-gray-700 border-gray-200",
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
