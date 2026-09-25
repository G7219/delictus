interface MessageBubbleProps {
  sender: "CUSTOMER" | "BOT" | "AGENT";
  text: string;
  timestamp: string;
}

/** Structured styling for text messages. Trade cards / OTP-specific layouts are a TODO. */
export function MessageBubble({ sender, text, timestamp }: MessageBubbleProps) {
  const fromCustomer = sender === "CUSTOMER";
  return (
    <div className={`flex ${fromCustomer ? "justify-start" : "justify-end"} mb-2`}>
      <div
        className={`max-w-[70%] rounded px-3 py-2 text-sm ${
          fromCustomer ? "bg-surface text-ink" : "bg-gold/90 text-navy"
        }`}
      >
        <p>{text}</p>
        <span className="block mt-1 text-[11px] opacity-70 font-figures">{timestamp}</span>
      </div>
    </div>
  );
}
