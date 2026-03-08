"use client";

import { useState } from "react";
import { Copy, Check, Twitter, MessageCircle, Download } from "lucide-react";
import { whatsappShareUrl, twitterShareUrl } from "@/lib/utils";

interface ShareActionsProps {
  text: string;
  url: string;
  locale?: string;
  ogUrl?: string;
  downloadFilename?: string;
}

export default function ShareActions({
  text,
  url,
  locale = "en",
  ogUrl,
  downloadFilename = "zee-sharecard.png",
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const isAr = locale === "ar";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = `${text}\n\n${url}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleDownload() {
    const res = await fetch(ogUrl!);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = downloadFilename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const waUrl = whatsappShareUrl(text, url);
  const twUrl = twitterShareUrl(text, url);

  const labels = {
    whatsapp: isAr ? "واتساب" : "WhatsApp",
    copy: isAr ? (copied ? "تم النسخ!" : "نسخ") : copied ? "Copied!" : "Copy",
    twitter: isAr ? "تويتر" : "X / Twitter",
    download: isAr ? "حفظ الصورة" : "Save image",
  };

  return (
    <div className="flex flex-wrap items-center gap-2" dir={isAr ? "rtl" : "ltr"}>
      {/* WhatsApp — primary */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <MessageCircle size={16} />
        {labels.whatsapp}
      </a>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-foreground) transition-colors hover:bg-(--color-surface)"
      >
        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
        {labels.copy}
      </button>

      {/* Twitter/X */}
      <a
        href={twUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-foreground) transition-colors hover:bg-(--color-surface)"
      >
        <Twitter size={16} />
        {labels.twitter}
      </a>

      {/* Download — only when ogUrl is provided */}
      {ogUrl && (
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-foreground) transition-colors hover:bg-(--color-surface)"
        >
          <Download size={16} />
          {labels.download}
        </button>
      )}
    </div>
  );
}
