export interface Translation {
  id: string;
  identifier: string;
  name: string;         // Native name (e.g. "مودودی")
  englishName: string;  // English name (e.g. "Maududi")
  language: string;     // ISO code (e.g. "ur")
  languageName: string; // Display name in English (e.g. "Urdu")
  direction: "ltr" | "rtl";
}

export const TRANSLATIONS: Translation[] = [
  // ── English ──────────────────────────────────────────────────────────────
  { id: "en.sahih",      identifier: "en.sahih",      name: "Saheeh International",  englishName: "Saheeh International",          language: "en", languageName: "English",    direction: "ltr" },
  { id: "en.pickthall",  identifier: "en.pickthall",  name: "Pickthall",             englishName: "Pickthall",                     language: "en", languageName: "English",    direction: "ltr" },
  { id: "en.yusufali",   identifier: "en.yusufali",   name: "Yusuf Ali",             englishName: "Yusuf Ali",                     language: "en", languageName: "English",    direction: "ltr" },
  { id: "en.asad",       identifier: "en.asad",       name: "Muhammad Asad",         englishName: "Muhammad Asad",                 language: "en", languageName: "English",    direction: "ltr" },
  { id: "en.hilali",     identifier: "en.hilali",     name: "Hilali & Khan",         englishName: "Hilali & Khan",                 language: "en", languageName: "English",    direction: "ltr" },
  { id: "en.arberry",    identifier: "en.arberry",    name: "Arberry",               englishName: "A. J. Arberry",                 language: "en", languageName: "English",    direction: "ltr" },
  { id: "en.itani",      identifier: "en.itani",      name: "Clear Quran (Itani)",   englishName: "Talal Itani",                   language: "en", languageName: "English",    direction: "ltr" },
  { id: "en.maududi",    identifier: "en.maududi",    name: "Maududi",               englishName: "Abul Ala Maududi",              language: "en", languageName: "English",    direction: "ltr" },

  // ── Urdu ─────────────────────────────────────────────────────────────────
  { id: "ur.maududi",    identifier: "ur.maududi",    name: "مودودی",                englishName: "Maududi",                       language: "ur", languageName: "Urdu",       direction: "rtl" },
  { id: "ur.junagarhi",  identifier: "ur.junagarhi",  name: "جوناگڑھی",              englishName: "Junagarhi",                     language: "ur", languageName: "Urdu",       direction: "rtl" },
  { id: "ur.qadri",      identifier: "ur.qadri",      name: "طاہر القادری",           englishName: "Tahir ul Qadri",                language: "ur", languageName: "Urdu",       direction: "rtl" },
  { id: "ur.jalandhry",  identifier: "ur.jalandhry",  name: "جالندھری",              englishName: "Fateh Muhammad Jalandhry",      language: "ur", languageName: "Urdu",       direction: "rtl" },

  // ── Persian / Farsi ───────────────────────────────────────────────────────
  { id: "fa.makarem",    identifier: "fa.makarem",    name: "مکارم شیرازی",          englishName: "Makarem Shirazi",               language: "fa", languageName: "Persian",    direction: "rtl" },
  { id: "fa.fooladvand", identifier: "fa.fooladvand", name: "فولادوند",              englishName: "Fooladvand",                    language: "fa", languageName: "Persian",    direction: "rtl" },
  { id: "fa.ghomshei",   identifier: "fa.ghomshei",   name: "الهی قمشه‌ای",          englishName: "Elahi Ghomshei",                language: "fa", languageName: "Persian",    direction: "rtl" },

  // ── French ───────────────────────────────────────────────────────────────
  { id: "fr.hamidullah", identifier: "fr.hamidullah", name: "Hamidullah",            englishName: "Muhammad Hamidullah",           language: "fr", languageName: "French",     direction: "ltr" },

  // ── German ───────────────────────────────────────────────────────────────
  { id: "de.bubenheim",  identifier: "de.bubenheim",  name: "Bubenheim & Elyas",     englishName: "Bubenheim & Elyas",             language: "de", languageName: "German",     direction: "ltr" },
  { id: "de.aburida",    identifier: "de.aburida",    name: "Abu Rida",              englishName: "Abu Rida",                      language: "de", languageName: "German",     direction: "ltr" },

  // ── Turkish ──────────────────────────────────────────────────────────────
  { id: "tr.diyanet",    identifier: "tr.diyanet",    name: "Diyanet İşleri",        englishName: "Diyanet Isleri",                language: "tr", languageName: "Turkish",    direction: "ltr" },
  { id: "tr.vakfi",      identifier: "tr.vakfi",      name: "Diyanet Vakfı",         englishName: "Diyanet Vakfi",                 language: "tr", languageName: "Turkish",    direction: "ltr" },

  // ── Indonesian ───────────────────────────────────────────────────────────
  { id: "id.indonesian", identifier: "id.indonesian", name: "Bahasa Indonesia",      englishName: "Indonesian Ministry of Rel.",   language: "id", languageName: "Indonesian", direction: "ltr" },
  { id: "id.jalalayn",   identifier: "id.jalalayn",   name: "Jalalayn (ID)",         englishName: "Jalalayn — Indonesian",         language: "id", languageName: "Indonesian", direction: "ltr" },

  // ── Russian ──────────────────────────────────────────────────────────────
  { id: "ru.kuliev",     identifier: "ru.kuliev",     name: "Кулиев",                englishName: "Kuliev",                        language: "ru", languageName: "Russian",    direction: "ltr" },
  { id: "ru.osmanov",    identifier: "ru.osmanov",    name: "Османов",               englishName: "Osmanov",                       language: "ru", languageName: "Russian",    direction: "ltr" },

  // ── Spanish ──────────────────────────────────────────────────────────────
  { id: "es.cortes",     identifier: "es.cortes",     name: "Julio Cortés",          englishName: "Julio Cortes",                  language: "es", languageName: "Spanish",    direction: "ltr" },
  { id: "es.garcia",     identifier: "es.garcia",     name: "Muhammad Isa García",   englishName: "Muhammad Isa Garcia",           language: "es", languageName: "Spanish",    direction: "ltr" },

  // ── Bengali ──────────────────────────────────────────────────────────────
  { id: "bn.bengali",    identifier: "bn.bengali",    name: "মুহিউদ্দীন খান",        englishName: "Muhiuddin Khan",                language: "bn", languageName: "Bengali",    direction: "ltr" },

  // ── Malay ─────────────────────────────────────────────────────────────────
  { id: "ms.basmeih",    identifier: "ms.basmeih",    name: "Basmeih",               englishName: "Abdullah Muhammad Basmeih",     language: "ms", languageName: "Malay",      direction: "ltr" },

  // ── Chinese ──────────────────────────────────────────────────────────────
  { id: "zh.jian",       identifier: "zh.jian",       name: "马坚",                  englishName: "Ma Jian",                       language: "zh", languageName: "Chinese",    direction: "ltr" },
  { id: "zh.majian",     identifier: "zh.majian",     name: "马金鹏",                englishName: "Ma Jinpeng",                    language: "zh", languageName: "Chinese",    direction: "ltr" },

  // ── Bosnian ──────────────────────────────────────────────────────────────
  { id: "bs.korkut",     identifier: "bs.korkut",     name: "Korkut",                englishName: "Besim Korkut",                  language: "bs", languageName: "Bosnian",    direction: "ltr" },

  // ── Italian ──────────────────────────────────────────────────────────────
  { id: "it.piccardo",   identifier: "it.piccardo",   name: "Piccardo",              englishName: "Hamza Roberto Piccardo",        language: "it", languageName: "Italian",    direction: "ltr" },

  // ── Portuguese ───────────────────────────────────────────────────────────
  { id: "pt.elhayek",    identifier: "pt.elhayek",    name: "El-Hayek",              englishName: "Samir El-Hayek",                language: "pt", languageName: "Portuguese", direction: "ltr" },

  // ── Swedish ──────────────────────────────────────────────────────────────
  { id: "sv.bernstrom",  identifier: "sv.bernstrom",  name: "Bernström",             englishName: "Knut Bernstrom",                language: "sv", languageName: "Swedish",    direction: "ltr" },

  // ── Dutch ────────────────────────────────────────────────────────────────
  { id: "nl.keyzer",     identifier: "nl.keyzer",     name: "Keyzer",                englishName: "Salomo Keyzer",                 language: "nl", languageName: "Dutch",      direction: "ltr" },

  // ── Japanese ─────────────────────────────────────────────────────────────
  { id: "ja.japanese",   identifier: "ja.japanese",   name: "日本語",                 englishName: "Japanese",                      language: "ja", languageName: "Japanese",   direction: "ltr" },

  // ── Korean ───────────────────────────────────────────────────────────────
  { id: "ko.korean",     identifier: "ko.korean",     name: "한국어",                 englishName: "Korean",                        language: "ko", languageName: "Korean",     direction: "ltr" },

  // ── Hausa ─────────────────────────────────────────────────────────────────
  { id: "ha.gumi",       identifier: "ha.gumi",       name: "Gumi",                  englishName: "Abubakar Mahmoud Gumi",         language: "ha", languageName: "Hausa",      direction: "ltr" },

  // ── Swahili ──────────────────────────────────────────────────────────────
  { id: "sw.barwani",    identifier: "sw.barwani",    name: "Al-Barwani",            englishName: "Ali Muhsin Al-Barwani",         language: "sw", languageName: "Swahili",    direction: "ltr" },
];

/** Default translation identifier based on the UI locale. */
export function getDefaultTranslation(locale: string): string {
  if (locale === "ar") return "ur.maududi"; // Arabic-locale users often prefer Urdu
  return "en.sahih";
}

/** Look up a translation's text direction by identifier. Falls back to "ltr". */
export function getTranslationDirection(identifier: string): "ltr" | "rtl" {
  return TRANSLATIONS.find((t) => t.identifier === identifier)?.direction ?? "ltr";
}

/** Group translations by languageName, preserving insertion order. */
export function groupByLanguage(translations: Translation[]): Map<string, Translation[]> {
  const map = new Map<string, Translation[]>();
  for (const t of translations) {
    const group = map.get(t.languageName) ?? [];
    group.push(t);
    map.set(t.languageName, group);
  }
  return map;
}
