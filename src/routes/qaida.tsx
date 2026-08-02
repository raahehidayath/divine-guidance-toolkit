import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { Play, Square, Volume2 } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { QAIDA_LESSONS, VOICE_PROFILES } from "@/lib/islamic-data";
import { useSettings } from "@/lib/settings";
import { speak, stopSpeaking, ttsSupported } from "@/lib/tts";

export const Route = createFileRoute("/qaida")({
  head: () => ({
    meta: [
      { title: "Noorani Qaida — Learn to Read Quran | Raah e Hidayath" },
      { name: "description", content: "Learn Arabic letters, harakaat, tanween, maddah and tashdeed step by step with an animated guide for children and beginners." },
      { property: "og:title", content: "Noorani Qaida | Raah e Hidayath" },
      { property: "og:description", content: "Step-by-step Quran reading lessons for beginners." },
    ],
  }),
  component: Qaida,
});

function LittleReader({ speaking }: { speaking: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className={`size-28 ${speaking ? "animate-float" : ""}`} aria-hidden>
      <circle cx="60" cy="38" r="20" className="fill-accent/70" />
      <path d="M38 34c0-14 44-14 44 0-6-4-38-4-44 0Z" className="fill-primary" />
      <ellipse cx="52" cy="40" rx="2.6" ry={speaking ? 1.2 : 2.6} className="fill-primary" />
      <ellipse cx="68" cy="40" rx="2.6" ry={speaking ? 1.2 : 2.6} className="fill-primary" />
      <ellipse cx="60" cy="49" rx={speaking ? 5 : 3} ry={speaking ? 4 : 1.4} className="fill-primary/70" />
      <path d="M32 108c0-18 12-28 28-28s28 10 28 28Z" className="fill-primary" />
      <path d="M36 96h48l-24 12Z" className="fill-accent" />
    </svg>
  );
}

function Qaida() {
  const { settings, update } = useSettings();
  const [lesson, setLesson] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [active_i, setActiveI] = useState<number | null>(null);
  const [tajweedSlow, setTajweedSlow] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const cancelled = useRef(false);
  const active = QAIDA_LESSONS[lesson]!;

  /* A calm, authentic male ustad voice reading each letter with tajweed pacing. */
  const say = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!ttsSupported()) return;
      setSpeaking(true);
      speak(text, "ar-SA", {
        voiceProfile: settings.voiceProfile,
        rate: tajweedSlow ? 0.55 : 0.8,
        speed: settings.playbackSpeed,
        onEnd: () => {
          setSpeaking(false);
          onEnd?.();
        },
      });
    },
    [settings.voiceProfile, settings.playbackSpeed, tajweedSlow],
  );

  /* Repeat each letter as many times as the learner asked for. */
  const sayRepeated = useCallback(
    (text: string, done?: () => void) => {
      let n = 0;
      const once = () => {
        n += 1;
        if (cancelled.current) return;
        if (n < settings.repeatVerses) say(text, once);
        else done?.();
      };
      say(text, once);
    },
    [say, settings.repeatVerses],
  );

  const playLesson = useCallback(() => {
    cancelled.current = false;
    const letters = active.letters;
    const step = (i: number) => {
      if (cancelled.current || i >= letters.length) {
        setActiveI(null);
        if (!cancelled.current && autoplay) setLesson((l) => (l + 1) % QAIDA_LESSONS.length);
        return;
      }
      setActiveI(i);
      sayRepeated(String(letters[i]), () => step(i + 1));
    };
    step(0);
  }, [active.letters, sayRepeated, autoplay]);

  const stopAll = () => {
    cancelled.current = true;
    stopSpeaking();
    setSpeaking(false);
    setActiveI(null);
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Noorani Qaida" subtitle="Tap any letter and our little friend will read it for you" />

      <Card className="flex items-center gap-4 gradient-soft">
        <LittleReader speaking={speaking} />
        <div>
          <p className="font-display text-lg">Assalamu Alaikum!</p>
          <p className="text-sm text-muted-foreground">
            Let's learn lesson {active.n}: {active.title}. Tap a letter to hear it in a clear ustad voice with
            proper makhraj and tajweed.
          </p>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {QAIDA_LESSONS.map((l, i) => (
          <button
            key={l.n}
            onClick={() => setLesson(i)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              i === lesson ? "border-transparent gradient-hero text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-primary"
            }`}
          >
            Lesson {l.n}
          </button>
        ))}
      </div>

      <Card className="grid gap-3 text-sm sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Ustad voice</span>
          <select
            value={settings.voiceProfile}
            onChange={(e) => update({ voiceProfile: e.target.value })}
            className="rounded-lg border border-border bg-background px-2 py-1.5"
          >
            {VOICE_PROFILES.map((v) => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Repeat each letter — {settings.repeatVerses}×</span>
          <input type="range" min={1} max={10} value={settings.repeatVerses}
            onChange={(e) => update({ repeatVerses: Number(e.target.value) })} className="accent-primary" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Speed — {settings.playbackSpeed.toFixed(2)}×</span>
          <input type="range" min={0.5} max={1.5} step={0.05} value={settings.playbackSpeed}
            onChange={(e) => update({ playbackSpeed: Number(e.target.value) })} className="accent-primary" />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTajweedSlow((v) => !v)}
            className={`rounded-full border px-3 py-1.5 text-xs ${tajweedSlow ? "border-transparent gradient-hero text-primary-foreground" : "border-border"}`}
          >
            Tajweed pace
          </button>
          <button
            onClick={() => setAutoplay((v) => !v)}
            className={`rounded-full border px-3 py-1.5 text-xs ${autoplay ? "border-transparent gradient-hero text-primary-foreground" : "border-border"}`}
          >
            Auto next lesson
          </button>
          <button
            onClick={() => (active_i === null ? playLesson() : stopAll())}
            className="inline-flex items-center gap-2 rounded-full gradient-gold px-4 py-1.5 text-xs font-semibold text-accent-foreground"
          >
            {active_i === null ? <Play className="size-3.5" /> : <Square className="size-3.5" />}
            {active_i === null ? "Play whole lesson" : "Stop"}
          </button>
        </div>
        {!ttsSupported() && <p className="text-xs text-muted-foreground sm:col-span-2">Voice playback is not supported in this browser.</p>}
      </Card>

      <Card>
        <p className="flex items-center gap-2 font-display text-lg">
          <Volume2 className="size-4 text-primary" /> {active.title}
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
          {active.letters.map((ch, i) => (
            <button
              key={`${ch}-${i}`}
              onClick={() => {
                cancelled.current = false;
                setActiveI(i);
                sayRepeated(ch, () => setActiveI(null));
              }}
              style={{ animationDelay: `${i * 25}ms` }}
              className={`animate-rise grid aspect-square place-items-center rounded-2xl border bg-card text-3xl text-primary shadow-soft transition hover:-translate-y-1 hover:shadow-glow ${
                active_i === i ? "border-primary ring-2 ring-primary/40" : "border-border"
              }`}
            >
              <span className="arabic-ayah">{ch}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}