import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Music4, Pause, Play } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { NAATS } from "@/lib/extra-data";
import { speak, stopSpeaking } from "@/lib/tts";

export const Route = createFileRoute("/naats")({
  head: () => ({
    meta: [
      { title: "Naats & Salawat — Praise of the Prophet ﷺ | Raah e Hidayath" },
      {
        name: "description",
        content:
          "A collection of classic naats and salawat in Arabic and Urdu with transliteration and English meaning, including Tala' al-Badru and Qasida Burda.",
      },
      { property: "og:title", content: "Naats & Salawat | Raah e Hidayath" },
      { property: "og:description", content: "Classic naats with Arabic text, transliteration and English meaning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Naats,
});

function Naats() {
  const [playing, setPlaying] = useState<string | null>(null);

  const toggle = (id: string, text: string, lang: string) => {
    if (playing === id) {
      stopSpeaking();
      setPlaying(null);
      return;
    }
    stopSpeaking();
    setPlaying(id);
    speak(text, lang, { onEnd: () => setPlaying(null) });
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Naats & Salawat" subtitle="Praise of the Prophet ﷺ with meaning and transliteration" />

      <Card className="gradient-hero text-primary-foreground">
        <p className="arabic-ayah text-2xl text-accent">اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّد</p>
        <p className="mt-3 text-sm text-primary-foreground/85">
          "Indeed Allah and His angels send blessings upon the Prophet. O you who believe, send blessings upon him and
          greet him with peace." — Surah al-Ahzab 33:56
        </p>
      </Card>

      <ul className="space-y-4">
        {NAATS.map((n, i) => (
          <li key={n.id} style={{ animationDelay: `${i * 40}ms` }} className="animate-rise">
            <Card className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-display text-lg">{n.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {n.poet} · {n.language}
                  </p>
                </div>
                <button
                  onClick={() => toggle(n.id, n.arabic.replace(/\n/g, " "), n.language === "Urdu" ? "ur-PK" : "ar-SA")}
                  aria-label={playing === n.id ? `Stop recitation of ${n.title}` : `Recite ${n.title}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {playing === n.id ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
                  {playing === n.id ? "Stop" : "Recite"}
                </button>
              </div>

              <p dir="rtl" lang={n.language === "Urdu" ? "ur" : "ar"} className="arabic-ayah whitespace-pre-line text-right text-2xl leading-loose">
                {n.arabic}
              </p>
              <p className="whitespace-pre-line text-sm italic text-primary">{n.transliteration}</p>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{n.translation}</p>
            </Card>
          </li>
        ))}
      </ul>

      <Card className="flex items-start gap-3 text-sm text-muted-foreground">
        <Music4 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p>
          These are recited without instruments. Playback uses your device voice, so pronunciation quality depends on
          the Arabic or Urdu voices installed on your phone.
        </p>
      </Card>
    </div>
  );
}
