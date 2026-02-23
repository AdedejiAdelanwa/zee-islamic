import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getAyah } from "@/lib/quran";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string; surah: string; verse: string }> }
) {
  const { locale, surah, verse } = await params;

  let arabicText = "";
  let translationText = "";
  let surahName = `Surah ${surah}`;
  let verseRef = `${surah}:${verse}`;

  try {
    const ayah = await getAyah(Number(surah), Number(verse));
    arabicText = ayah.arabic.text;
    translationText = ayah.translation.text?.slice(0, 200) ?? "";
    surahName = ayah.arabic.surah?.englishName ?? surahName;
    verseRef = `${ayah.surahNumber}:${ayah.verseNumber}`;
  } catch {
    // Use defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0B5563",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "18px",
            marginBottom: "32px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          ☪ ZEE — Islamic Search
        </div>

        {/* Arabic text */}
        {arabicText && (
          <div
            style={{
              color: "#ffffff",
              fontSize: "42px",
              lineHeight: "1.8",
              textAlign: "center",
              marginBottom: "28px",
              direction: "rtl",
            }}
          >
            {arabicText.slice(0, 100)}
            {arabicText.length > 100 ? "…" : ""}
          </div>
        )}

        {/* Translation */}
        {translationText && (
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "22px",
              lineHeight: "1.6",
              textAlign: "center",
              maxWidth: "900px",
              marginBottom: "32px",
            }}
          >
            &ldquo;{translationText}{translationText.length >= 200 ? "…" : ""}&rdquo;
          </div>
        )}

        {/* Verse reference */}
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "18px",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "999px",
            padding: "6px 20px",
          }}
        >
          {surahName} — {verseRef}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
