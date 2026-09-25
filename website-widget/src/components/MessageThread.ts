export interface WidgetMessage {
  sender: "CUSTOMER" | "BOT";
  text: string;
}

/** Renders the scrollable message list inside the widget panel. */
export function renderMessageThread(container: HTMLElement, messages: WidgetMessage[]): void {
  container.innerHTML = "";
  messages.forEach((msg) => {
    const bubble = document.createElement("div");
    bubble.className = `dse-widget-message ${msg.sender.toLowerCase()}`;
    bubble.textContent = msg.text;
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;
}
