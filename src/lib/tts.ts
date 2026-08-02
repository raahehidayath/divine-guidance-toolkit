/** Speech engine used for translation, tafseer and explanation audio.
 *  A voice profile lets the user pick a deep, professional male narration
 *  instead of whatever the device happens to default to. */

import { VOICE_PROFILES } from "./islamic-data";

let current: SpeechSynthesisUtterance | null = null;

export function ttsSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function profile(id: string) {
  return VOICE_PROFILES.find((p) => p.id === id) ?? VOICE_PROFILES[VOICE_PROFILES.length - 1]!;
}

/** Higher-quality engines first: neural/online voices sound far better than
 *  the compact offline fallbacks most phones ship with. */
const QUALITY_HINTS = ["natural", "neural", "online", "enhanced", "premium", "wavenet", "google"];

function score(v: SpeechSynthesisVoice) {
  const n = v.name.toLowerCase();
  let s = 0;
  QUALITY_HINTS.forEach((h, i) => {
    if (n.includes(h)) s += QUALITY_HINTS.length - i;
  });
  if (!v.localService) s += 3;
  return s;
}

function pickVoice(langTag: string, profileId: string) {
  const voices = window.speechSynthesis.getVoices();
  const base = String(langTag.split("-")[0]);
  const exact = voices.filter((v) => v.lang.toLowerCase().replace("_", "-") === langTag.toLowerCase());
  const inLang = voices.filter((v) => v.lang.toLowerCase().startsWith(base));
  const pool = (exact.length ? exact : inLang.length ? inLang : voices).slice().sort((a, b) => score(b) - score(a));
  const wanted = profile(profileId).match;

  for (const hint of wanted) {
    const hit = pool.find((v) => v.name.toLowerCase().includes(hint));
    if (hit) return hit;
  }
  return pool[0] ?? null;
}


export type SpeakOptions = {
  rate?: number;
  /** playback-speed multiplier from settings */
  speed?: number;
  voiceProfile?: string;
  onEnd?: () => void;
};

export function speak(text: string, langTag: string, opts?: SpeakOptions) {
  if (!ttsSupported() || !text.trim()) {
    opts?.onEnd?.();
    return;
  }
  stopSpeaking();
  const p = profile(opts?.voiceProfile ?? "scholar");
  const u = new SpeechSynthesisUtterance(stripHtml(text).slice(0, 4000));
  u.lang = langTag;
  u.rate = Math.min(3, Math.max(0.5, (opts?.rate ?? p.rate) * (opts?.speed ?? 1)));
  u.pitch = p.pitch;
  const voice = pickVoice(langTag, p.id);
  if (voice) u.voice = voice;
  u.onend = () => {
    current = null;
    opts?.onEnd?.();
  };
  u.onerror = () => {
    current = null;
    opts?.onEnd?.();
  };
  current = u;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (!ttsSupported()) return;
  current = null;
  window.speechSynthesis.cancel();
}
