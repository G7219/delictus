export type WidgetLanguage = "sw" | "en";

/** Simple Swahili / English toggle rendered above the message thread. */
export function createLanguagePicker(
  current: WidgetLanguage,
  onChange: (lang: WidgetLanguage) => void
): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.cssText = "display:flex;gap:6px;padding:8px 12px;border-bottom:1px solid #e2e8f0;";

  (["sw", "en"] as const).forEach((lang) => {
    const btn = document.createElement("button");
    btn.textContent = lang === "sw" ? "Kiswahili" : "English";
    btn.style.cssText = `font-size:12px;padding:4px 8px;border-radius:4px;border:1px solid #cbd5e1;background:${
      lang === current ? "#0f172a" : "#fff"
    };color:${lang === current ? "#fff" : "#0f172a"};cursor:pointer;`;
    btn.onclick = () => onChange(lang);
    wrap.appendChild(btn);
  });

  return wrap;
}
