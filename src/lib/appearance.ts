/** Central appearance + reading-preference engine. Every option the user can
 *  change in Settings is turned into a CSS variable / data-attribute on <html>,
 *  so the whole website reacts instantly and consistently. */

export type ThemeMode = "light" | "dark" | "amoled" | "auto";
export type AnimationLevel = "none" | "subtle" | "full";

export const THEME_MODES: Array<{ id: ThemeMode; label: string; hint: string }> = [
  { id: "light", label: "Light", hint: "Bright parchment look" },
  { id: "dark", label: "Dark", hint: "Soft night reading" },
  { id: "amoled", label: "AMOLED", hint: "True black, saves battery" },
  { id: "auto", label: "Auto", hint: "Follows your device" },
];

export const THEME_COLORS = [
  { id: "emerald", label: "Emerald", primary: "0.46 0.09 167", ring: "0.55 0.08 167" },
  { id: "teal", label: "Teal", primary: "0.48 0.08 195", ring: "0.57 0.07 195" },
  { id: "royal", label: "Royal Blue", primary: "0.45 0.12 258", ring: "0.55 0.11 258" },
  { id: "maroon", label: "Maroon", primary: "0.42 0.13 20", ring: "0.52 0.12 20" },
  { id: "midnight", label: "Midnight", primary: "0.33 0.06 265", ring: "0.45 0.06 265" },
  { id: "olive", label: "Olive", primary: "0.48 0.08 130", ring: "0.57 0.07 130" },
] as const;

export const ACCENT_COLORS = [
  { id: "gold", label: "Gold", accent: "0.82 0.13 85" },
  { id: "amber", label: "Amber", accent: "0.80 0.15 70" },
  { id: "rose", label: "Rose", accent: "0.75 0.13 15" },
  { id: "sky", label: "Sky", accent: "0.78 0.10 220" },
  { id: "mint", label: "Mint", accent: "0.83 0.10 160" },
  { id: "violet", label: "Violet", accent: "0.72 0.13 300" },
] as const;

export const UI_FONTS = [
  { id: "jakarta", label: "Plus Jakarta Sans", stack: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif' },
  { id: "inter", label: "Inter", stack: 'Inter, ui-sans-serif, system-ui, sans-serif' },
  { id: "serif", label: "Classic Serif", stack: '"Marcellus", ui-serif, Georgia, serif' },
  { id: "system", label: "System", stack: 'system-ui, -apple-system, Segoe UI, sans-serif' },
] as const;

/** Quran / Arabic mushaf typefaces. */
export const ARABIC_FONTS = [
  { id: "amiri-quran", label: "Amiri Quran (Uthmani)", stack: '"Amiri Quran", "Amiri", serif' },
  { id: "scheherazade", label: "Scheherazade New (Indo-Pak)", stack: '"Scheherazade New", "Amiri", serif' },
  { id: "noto-naskh", label: "Noto Naskh Arabic", stack: '"Noto Naskh Arabic", serif' },
  { id: "lateef", label: "Lateef", stack: 'Lateef, "Noto Naskh Arabic", serif' },
] as const;

export const URDU_FONTS = [
  { id: "nastaliq", label: "Noto Nastaliq Urdu", stack: '"Noto Nastaliq Urdu", serif' },
  { id: "naskh", label: "Noto Naskh Arabic", stack: '"Noto Naskh Arabic", serif' },
  { id: "lateef", label: "Lateef", stack: 'Lateef, serif' },
] as const;

export const READING_WIDTHS = [
  { id: "narrow", label: "Narrow", value: "44rem" },
  { id: "medium", label: "Medium", value: "58rem" },
  { id: "wide", label: "Wide", value: "72rem" },
  { id: "full", label: "Full", value: "100%" },
] as const;

export type ThemeColorId = (typeof THEME_COLORS)[number]["id"];
export type AccentColorId = (typeof ACCENT_COLORS)[number]["id"];
export type UiFontId = (typeof UI_FONTS)[number]["id"];
export type ArabicFontId = (typeof ARABIC_FONTS)[number]["id"];
export type UrduFontId = (typeof URDU_FONTS)[number]["id"];
export type ReadingWidthId = (typeof READING_WIDTHS)[number]["id"];

export type Appearance = {
  theme: ThemeMode;
  themeColor: ThemeColorId;
  accentColor: AccentColorId;
  uiFont: UiFontId;
  fontSize: number;
  quranFont: ArabicFontId;
  arabicFont: ArabicFontId;
  urduFont: UrduFontId;
  lineSpacing: number;
  readingWidth: ReadingWidthId;
  rounded: number;
  animation: AnimationLevel;
  glass: boolean;
  compact: boolean;
};

const find = <T extends { id: string }>(list: readonly T[], id: string, fallback: T): T =>
  list.find((x) => x.id === id) ?? fallback;

export function resolveTheme(mode: ThemeMode): "light" | "dark" | "amoled" {
  if (mode !== "auto") return mode;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Writes every appearance choice onto <html> as variables + data attributes. */
export function applyAppearance(a: Appearance) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = resolveTheme(a.theme);

  root.classList.toggle("dark", resolved !== "light");
  root.dataset["theme"] = resolved;
  root.dataset["animation"] = a.animation;
  root.dataset["glass"] = a.glass ? "on" : "off";
  root.dataset["density"] = a.compact ? "compact" : "cozy";

  const color = find(THEME_COLORS, a.themeColor, THEME_COLORS[0]);
  const accent = find(ACCENT_COLORS, a.accentColor, ACCENT_COLORS[0]);
  const ui = find(UI_FONTS, a.uiFont, UI_FONTS[0]);
  const quran = find(ARABIC_FONTS, a.quranFont, ARABIC_FONTS[0]);
  const arabic = find(ARABIC_FONTS, a.arabicFont, ARABIC_FONTS[0]);
  const urdu = find(URDU_FONTS, a.urduFont, URDU_FONTS[0]);
  const width = find(READING_WIDTHS, a.readingWidth, READING_WIDTHS[1]);

  root.style.setProperty("--brand-primary", color.primary);
  root.style.setProperty("--brand-ring", color.ring);
  root.style.setProperty("--brand-accent", accent.accent);
  root.style.setProperty("--font-ui", ui.stack);
  root.style.setProperty("--font-quran", quran.stack);
  root.style.setProperty("--font-arabic-user", arabic.stack);
  root.style.setProperty("--font-urdu-user", urdu.stack);
  root.style.setProperty("--app-font-size", `${a.fontSize}px`);
  root.style.setProperty("--reading-line", String(a.lineSpacing));
  root.style.setProperty("--reading-width", width.value);
  root.style.setProperty("--radius", `${a.rounded}rem`);
}
