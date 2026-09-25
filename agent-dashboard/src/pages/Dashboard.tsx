import { useState } from "react";
import { ChatList, ChatSummary } from "../components/chat/ChatList";
import { ChatWindow } from "../components/chat/ChatWindw";

// TODO: replace with a useChatStream() hook that loads sessions from the
// API and subscribes to chatHub for live updates via services/socket.ts.
const PLACEHOLDER_CHATS: ChatSummary[] = [];

export function Dashboard() {
  const [activeId, setActiveId] = useState<string | undefined>();

  return (
    <div className="flex-1 flex overflow-hidden">
      <ChatList chats={PLACEHOLDER_CHATS} activeId={activeId} onSelect={setActiveId} />
      <ChatWindow messages={[]} onSend={() => {}} />
    </div>
  );
}
