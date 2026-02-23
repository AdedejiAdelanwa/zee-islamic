import Link from "next/link";
import { Heart } from "lucide-react";

// Curated "Did you know?" snippets keyed by topic keywords
const SNIPPETS = [
  {
    keywords: ["patience", "sabr", "hardship", "test", "trial", "صبر", "ابتلاء"],
    arabic: "وَاصْبِرُوا ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    text: "And be patient; indeed, Allah is with the patient.",
    ref: "Quran 8:46",
  },
  {
    keywords: ["forgiveness", "mercy", "repent", "tawbah", "مغفرة", "رحمة", "توبة"],
    arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    text: "Say: O My servants who have transgressed — do not despair of the mercy of Allah.",
    ref: "Quran 39:53",
  },
  {
    keywords: ["prayer", "salah", "salat", "صلاة", "worship"],
    arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
    text: "Indeed, prayer has been decreed upon the believers at specified times.",
    ref: "Quran 4:103",
  },
  {
    keywords: ["knowledge", "learning", "seek", "علم", "طلب العلم"],
    arabic: "طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    text: "Seeking knowledge is an obligation upon every Muslim.",
    ref: "Ibn Majah 224",
  },
  {
    keywords: ["gratitude", "thankful", "shukr", "شكر", "نعمة"],
    arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    text: "If you are grateful, I will surely increase you [in favour].",
    ref: "Quran 14:7",
  },
  {
    keywords: ["day of judgment", "judgment", "akhirah", "قيامة", "آخرة"],
    arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ",
    text: "Every soul will taste death.",
    ref: "Quran 3:185",
  },
  {
    keywords: ["paradise", "jannah", "heaven", "جنة", "فردوس"],
    arabic: "وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ",
    text: "A Paradise as wide as the heavens and the earth, prepared for the righteous.",
    ref: "Quran 3:133",
  },
  {
    keywords: ["charity", "sadaqah", "give", "صدقة", "زكاة"],
    arabic: "مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
    text: "The example of those who spend in the way of Allah is like a grain that sprouts seven ears.",
    ref: "Quran 2:261",
  },
  {
    keywords: ["trust", "tawakkul", "reliance", "توكل", "يقين"],
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    text: "And whoever relies upon Allah — then He is sufficient for him.",
    ref: "Quran 65:3",
  },
];

const FALLBACK_SNIPPET = SNIPPETS[0];

const RELATED_TERMS_EN = [
  "patience", "forgiveness", "prayer", "mercy of Allah", "Day of Judgment",
  "Paradise", "seeking knowledge", "gratitude", "charity", "repentance",
  "trust in Allah", "kindness", "honesty", "humility", "love of Allah",
];

const RELATED_TERMS_AR = [
  "الصبر", "الصلاة", "الرحمة", "يوم القيامة", "الجنة",
  "طلب العلم", "الشكر", "الصدقة", "التوبة", "التوكل",
  "الإخلاص", "الكرم", "الأمانة", "التواضع", "حب الله",
];

function pickSnippet(query: string) {
  const q = query.toLowerCase();
  return (
    SNIPPETS.find((s) => s.keywords.some((k) => q.includes(k))) ??
    FALLBACK_SNIPPET
  );
}

function pickRelated(query: string, locale: string, count = 5): string[] {
  const terms = locale === "ar" ? RELATED_TERMS_AR : RELATED_TERMS_EN;
  const q = query.toLowerCase();
  // Exclude the current query; prefer terms that share a word with the query
  const scored = terms
    .filter((t) => t.toLowerCase() !== q)
    .map((t) => ({
      term: t,
      score: t.toLowerCase().split(" ").some((w) => q.includes(w)) ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.term);
}

interface SearchSidebarProps {
  query: string;
  locale: string;
}

export default function SearchSidebar({ query, locale }: SearchSidebarProps) {
  const isAr = locale === "ar";
  const snippet = pickSnippet(query);
  const related = pickRelated(query, locale);

  return (
    <aside
      className="sticky top-6 hidden w-75 shrink-0 space-y-4 md:block"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Did you know? */}
      <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
          {isAr ? "هل تعلم؟" : "Did you know?"}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="arabic-text mb-2 text-right text-base leading-loose text-(--color-foreground)"
        >
          {snippet.arabic}
        </p>
        {!isAr && (
          <p className="mb-2 text-sm leading-relaxed text-(--color-foreground)">
            &ldquo;{snippet.text}&rdquo;
          </p>
        )}
        <p className="text-xs text-(--color-muted)">{snippet.ref}</p>
      </div>

      {/* Donation CTA */}
      <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
        <p className="mb-1 text-sm font-semibold text-(--color-foreground)">
          {isAr ? "ZEE مجاني، ابقِه كذلك." : "ZEE is free. Keep it that way."}
        </p>
        <p className="mb-3 text-xs text-(--color-muted)">
          {isAr
            ? "ساعدنا في الحفاظ على هذه الخدمة مفتوحة للجميع."
            : "Help us keep this resource open for everyone."}
        </p>
        <a
          href="https://ko-fi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Heart size={14} />
          {isAr ? "تبرع" : "Donate"}
        </a>
      </div>

      {/* Related searches */}
      <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
          {isAr ? "عمليات بحث ذات صلة" : "Related searches"}
        </p>
        <ul className="space-y-1">
          {related.map((term) => (
            <li key={term}>
              <Link
                href={`/${locale}/search?q=${encodeURIComponent(term)}`}
                className="block rounded-lg px-2 py-1.5 text-sm text-(--color-foreground) transition-colors hover:bg-(--color-surface) hover:text-(--color-primary)"
              >
                {isAr ? "›" : "›"} {term}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
