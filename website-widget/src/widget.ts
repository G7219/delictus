import widgetCss from "./styles/widget.css?inline";
import { renderMessageThread, WidgetMessage } from "./components/MessageThread";
import { createLanguagePicker, WidgetLanguage } from "./components/LanguagePicker";

/**
 * Entry point. A broker embeds this with:
 *   <script src="https://cdn.yoursaas.com/widget.min.js" data-tenant-slug="orbit-securities"></script>
 *
 * Everything renders inside a shadow root so the broker's page CSS can
 * never collide with widget styles (see styles/widget.css comment).
 */
function init() {
  const scriptTag = document.currentScript as HTMLScriptElement | null;
  const tenantSlug = scriptTag?.dataset.tenantSlug;
  if (!tenantSlug) {
    console.error("[dse-widget] missing data-tenant-slug on the embed <script> tag");
    return;
  }

  const host = document.createElement("div");
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = widgetCss;
  shadow.appendChild(style);

  const launcher = document.createElement("button");
  launcher.className = "dse-widget-launcher";
  launcher.textContent = "💬";
  shadow.appendChild(launcher);

  const panel = document.createElement("div");
  panel.className = "dse-widget-panel";
  panel.style.display = "none";
  shadow.appendChild(panel);

  let language: WidgetLanguage = "sw";
  const messages: WidgetMessage[] = [];

  const thread = document.createElement("div");
  thread.className = "dse-widget-thread";
  panel.appendChild(createLanguagePicker(language, (lang) => (language = lang)));
  panel.appendChild(thread);
  renderMessageThread(thread, messages);

  launcher.onclick = () => {
    panel.style.display = panel.style.display === "none" ? "flex" : "none";
  };

  // TODO: open a WebSocket to the backend (see /backend/src/sockets/chatHub.ts)
  // scoped to `tenantSlug`, and push/receive messages into `messages`.
}

init();
