import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-3 text-7xl font-bold text-(--color-primary) opacity-20">
        404
      </div>
      <h1 className="mb-2 text-xl font-semibold text-(--color-foreground)">
        Page not found
      </h1>
      <p className="mb-1 text-sm text-(--color-muted)">
        الصفحة غير موجودة
      </p>
      <p className="mb-8 text-sm text-(--color-muted)">
        The content you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/en" className={buttonVariants({ variant: "accent" })}>
        Back to Home
      </Link>
    </div>
  );
}
