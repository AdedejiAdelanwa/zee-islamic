"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ZEE Global Error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "1rem",
          textAlign: "center",
          background: "#FAFAF8",
          color: "#1A1A2E",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Something went wrong
        </h1>
        <p style={{ color: "#5A6475", marginBottom: "1.5rem", maxWidth: "28rem" }}>
          ZEE encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#C8953A",
            color: "#fff",
            border: "none",
            borderRadius: "0.75rem",
            padding: "0.625rem 1.5rem",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
