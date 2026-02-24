const CONJUNCTIONS = new Set([
  "and", "or", "but", "nor", "for", "yet", "so",
  "the", "a", "an", "in", "on", "at", "to", "of",
  "is", "it", "as", "by", "be", "we", "he", "she",
  "that", "this", "with", "from", "are", "was", "were",
]);

function buildRegex(query: string): RegExp | null {
  const words = query
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .filter((w) => w.length > 1 && !CONJUNCTIONS.has(w.toLowerCase()));

  if (words.length === 0) return null;
  return new RegExp(`(${words.join("|")})`, "gi");
}

interface HighlightProps {
  text: string;
  query: string;
  className?: string;
}

export default function Highlight({ text, query, className }: HighlightProps) {
  const regex = query.trim() ? buildRegex(query) : null;

  if (!regex) return <span className={className}>{text}</span>;

  const parts = text.split(regex);

  // split() with a capturing group places matched text at odd indices
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded-sm bg-(--color-accent-light) px-0.5 text-(--color-primary) not-italic"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}
