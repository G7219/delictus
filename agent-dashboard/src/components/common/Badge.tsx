interface BadgeProps {
  label: string;
  tone?: "neutral" | "positive" | "warning" | "danger";
}

const TONE_CLASSES: Record<string, string> = {
  neutral: "bg-surface text-muted border-border",
  positive: "bg-emerald/10 text-emerald border-emerald/30",
  warning: "bg-gold/10 text-gold border-gold/30",
  danger: "bg-rose/10 text-rose border-rose/30",
};

/** Small status pill — e.g. session state, subscription status, verification state. */
export function Badge({ label, tone = "neutral" }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs border ${TONE_CLASSES[tone]}`}>
      {label}
    </span>
  );
}
