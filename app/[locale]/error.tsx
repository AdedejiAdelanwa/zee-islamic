"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const isAr = params?.locale === "ar";

  useEffect(() => {
    console.error("[ZEE Error]", error);
  }, [error]);

  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mb-5 text-5xl">⚠</div>
      <h1 className="mb-2 text-xl font-bold text-(--color-foreground)">
        {isAr ? "حدث خطأ ما" : "Something went wrong"}
      </h1>
      <p className="mb-6 max-w-sm text-sm text-(--color-muted)">
        {isAr
          ? "تعذّر تحميل هذا المحتوى. قد تكون مشكلة مؤقتة."
          : "We couldn't load this content. This may be a temporary issue."}
      </p>
      <Button variant="accent" onClick={reset}>
        {isAr ? "حاول مرة أخرى" : "Try again"}
      </Button>
    </div>
  );
}
