import { Badge } from "../common/Badge";

export interface ChatSummary {
  id: string;
  customerPhone: string;
  lastMessage: string;
  status: "BOT" | "HUMAN_WAITING" | "HUMAN_ACTIVE" | "RESOLVED";
}

const STATUS_LABEL: Record<ChatSummary["status"], { label: string; tone: "neutral" | "warning" | "positive" }> = {
  BOT: { label: "Bot handling", tone: "neutral" },
  HUMAN_WAITING: { label: "Waiting for agent", tone: "warning" },
  HUMAN_ACTIVE: { label: "You're active", tone: "positive" },
  RESOLVED: { label: "Resolved", tone: "neutral" },
};

interface ChatListProps {
  chats: ChatSummary[];
  activeId?: string;
  onSelect: (id: string) => void;
}

/** High-density list of active conversations. Data wiring via useChatStream is a TODO. */
export function ChatList({ chats, activeId, onSelect }: ChatListProps) {
  return (
    <div className="w-72 shrink-0 border-r border-border overflow-y-auto">
      {chats.length === 0 && <p className="p-4 text-sm text-muted">No active conversations.</p>}
      {chats.map((chat) => {
        const status = STATUS_LABEL[chat.status];
        return (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`w-full text-left px-4 py-3 border-b border-border ${
              chat.id === activeId ? "bg-surfaceHover" : "hover:bg-surface"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-figures">{chat.customerPhone}</span>
              <Badge label={status.label} tone={status.tone} />
            </div>
            <p className="text-xs text-muted truncate">{chat.lastMessage}</p>
          </button>
        );
      })}
    </div>
  );
}
