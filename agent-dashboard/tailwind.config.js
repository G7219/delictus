/**
 * Design tokens for the DSE broker agent dashboard.
 *
 * Palette: institutional trading-floor dark theme — navy base, slate
 * surfaces, gold used sparingly as the one accent (brand + pending
 * states), emerald for verified/active, rose for locked/past-due.
 * Chosen to read as serious financial infrastructure, not a generic
 * SaaS product — see README "Design notes" for the full rationale.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        surface: "#1E293B",
        surfaceHover: "#263449",
        border: "#2D3B52",
        gold: "#D97706",
        emerald: "#059669",
        rose: "#DC2626",
        ink: "#E2E8F0",
        muted: "#8B9AB3",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};
