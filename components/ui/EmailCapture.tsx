"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

interface EmailCaptureProps {
  locale?: string;
}

export default function EmailCapture({ locale = "en" }: EmailCaptureProps) {
  const isAr = locale === "ar";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire up to mailing list provider
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="mt-10 rounded-2xl border border-(--color-border) bg-(--color-surface) px-6 py-7"
    >
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-start">
        {/* Label */}
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-white">
            <Mail size={16} />
          </span>
          <p className="text-sm font-semibold text-(--color-foreground)">
            {isAr
              ? "احصل على رؤى إسلامية أسبوعية"
              : "Get weekly Islamic insights"}
          </p>
        </div>

        {/* Form */}
        {status === "success" ? (
          <p className="text-sm font-medium text-(--color-primary)">
            {isAr ? "شكراً! سنكون بتواصل قريباً ✓" : "You're subscribed! ✓"}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm gap-2 md:w-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAr ? "بريدك الإلكتروني" : "Enter email"}
              dir={isAr ? "rtl" : "ltr"}
              className="min-w-0 flex-1 rounded-full border border-(--color-border) bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-(--color-primary) focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
            <button
              type="submit"
              className="rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {isAr ? "اشترك" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
