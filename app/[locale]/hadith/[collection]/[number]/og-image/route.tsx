import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getHadith, HADITH_COLLECTIONS } from "@/lib/hadith";

export const runtime = "edge";

/** Strip every character outside printable ASCII so satori never tries to download a non-Latin font */
function ascii(str: string): string {
  return str.replace(/[^\x20-\x7E]/g, "").trim();
}

function gradeColor(grade: string): string {
  const g = grade.toLowerCase();
  if (g.includes("sahih")) return "#16a34a";
  if (g.includes("hasan")) return "#ca8a04";
  if (g.includes("da") || g.includes("weak")) return "#dc2626";
  return "#6b7280";
}

function fallback() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0B5563",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#C9A227",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        ZEE | zee.app
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string; collection: string; number: string }> }
) {
  const { collection, number } = await params;

  let hadithText = "";
  let collectionName =
    ascii(HADITH_COLLECTIONS.find((c) => c.slug === collection)?.name ?? collection);
  let ref = collectionName + " - Hadith #" + number;
  let grade = "";

  try {
    const hadith = await getHadith(collection, number);
    if (hadith) {
      hadithText = ascii(hadith.hadithEnglish?.slice(0, 280) ?? "");
      collectionName = ascii(hadith.book?.bookName ?? collectionName);
      ref = collectionName + " - Hadith #" + number;
      grade = ascii(hadith.grades?.[0]?.grade ?? "");
    }
  } catch {
    // Use defaults
  }

  const badgeColor = grade ? gradeColor(grade) : "";

  try {
    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            width: "1200px",
            height: "630px",
            background: "#0B5563",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "72px 80px 72px 96px",
            fontFamily: "sans-serif",
            overflow: "hidden",
          }}
        >
          {/* Gold left accent stripe */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "6px",
              height: "630px",
              background: "#C9A227",
            }}
          />

          {/* Decorative background circle */}
          <div
            style={{
              position: "absolute",
              right: "-80px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              border: "2px solid rgba(201,162,39,0.12)",
              background: "rgba(201,162,39,0.04)",
            }}
          />

          {/* Grade badge - top right */}
          {grade && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "48px",
                background: badgeColor,
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "999px",
                padding: "6px 20px",
                letterSpacing: "0.04em",
                textTransform: "capitalize",
              }}
            >
              {grade}
            </div>
          )}

          {/* Collection name */}
          <div
            style={{
              color: "#C9A227",
              fontSize: "17px",
              fontWeight: "bold",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            {collectionName}
          </div>

          {/* Hadith text */}
          {hadithText && (
            <div
              style={{
                color: "rgba(255,255,255,0.92)",
                fontSize: hadithText.length > 180 ? "22px" : "26px",
                lineHeight: "1.65",
                textAlign: "left",
                maxWidth: "960px",
                marginBottom: "36px",
              }}
            >
              {"\"" + hadithText + (hadithText.length >= 280 ? "..." : "") + "\""}
            </div>
          )}

          {/* Reference pill */}
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "16px",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "999px",
              padding: "6px 22px",
            }}
          >
            {ref}
          </div>

          {/* Bottom-right ZEE lockup */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              right: "48px",
              color: "#C9A227",
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            ZEE | zee.app
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch {
    return fallback();
  }
}
