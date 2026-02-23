import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZEE — Islamic Search Engine",
    short_name: "ZEE",
    description: "Search the Quran, Hadith, and Islamic knowledge in seconds.",
    start_url: "/en/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#0B5563",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["education", "religion"],
    lang: "en",
    dir: "ltr",
  };
}
