import { useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { Button } from "../common/Button";

interface Message {
  id: string;
  sender: "CUSTOMER" | "BOT" | "AGENT";
  text: string;
  createdAt: string;
}

interface ChatWindowProps {
  messages: Message[];
  onSend: (text: string) => void;
}

/** Central messaging interface for the active conversation. */
export function ChatWindow({ messages, onSend }: ChatWindowProps) {
  const [draft, setDraft] = useState("");

  function handleSend() {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} sender={m.sender} text={m.text} timestamp={m.createdAt} />
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-muted">Select a conversation to see the message history.</p>
        )}
      </div>
      <div className="border-t border-border p-3 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a reply"
          className="flex-1 bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
