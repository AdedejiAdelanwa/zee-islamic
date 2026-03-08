"use client";

import { useState } from "react";
import { Share2, X, Copy, Check, Twitter, MessageCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappShareUrl, twitterShareUrl } from "@/lib/utils";

interface ShareFabProps {
  text: string;
  url: string;
  locale?: string;
  ogUrl?: string;
  downloadFilename?: string;
}

export default function ShareFab({
  text,
  url,
  locale = "en",
  ogUrl,
  downloadFilename = "zee-sharecard.png",
}: ShareFabProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAr = locale === "ar";

  const waUrl = whatsappShareUrl(text, url);
  const twUrl = twitterShareUrl(text, url);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
    } catch {
      const el = document.createElement("textarea");
      el.value = `${text}\n\n${url}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setOpen(false);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownload() {
    const res = await fetch(ogUrl!);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = downloadFilename;
    a.click();
    URL.revokeObjectURL(a.href);
    setOpen(false);
  }

  const optionClass =
    "flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium shadow-md transition-opacity active:opacity-70";

  return (
    <>
      {/* Backdrop — closes menu on outside tap */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* FAB container — fixed above bottom nav */}
      <div
        className={cn(
          "fixed bottom-20 z-50 flex flex-col gap-2 md:hidden",
          isAr ? "left-4 items-start" : "right-4 items-end",
        )}
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Share options — shown above FAB when open */}
        {open && (
          <>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={cn(optionClass, "bg-[#25D366] text-white")}
            >
              <MessageCircle size={16} />
              {isAr ? "واتساب" : "WhatsApp"}
            </a>

            <button
              onClick={handleCopy}
              className={cn(
                optionClass,
                "border border-(--color-border) bg-(--color-surface) text-(--color-foreground)",
              )}
            >
              {copied ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} />
              )}
              {isAr
                ? copied ? "تم النسخ!" : "نسخ"
                : copied ? "Copied!" : "Copy link"}
            </button>

            <a
              href={twUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={cn(
                optionClass,
                "border border-(--color-border) bg-(--color-surface) text-(--color-foreground)",
              )}
            >
              <Twitter size={16} />
              {isAr ? "تويتر" : "X / Twitter"}
            </a>

            {/* Download — only when ogUrl is provided */}
            {ogUrl && (
              <button
                onClick={handleDownload}
                className={cn(
                  optionClass,
                  "border border-(--color-border) bg-(--color-surface) text-(--color-foreground)",
                )}
              >
                <Download size={16} />
                {isAr ? "حفظ الصورة" : "Save image"}
              </button>
            )}
          </>
        )}

        {/* The FAB itself */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={isAr ? "مشاركة" : "Share"}
          aria-expanded={open}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all active:scale-95",
            open
              ? "bg-(--color-foreground) text-(--color-background) rotate-90"
              : "bg-(--color-primary) text-white",
          )}
        >
          {open ? <X size={22} /> : <Share2 size={22} />}
        </button>
      </div>
    </>
  );
}
