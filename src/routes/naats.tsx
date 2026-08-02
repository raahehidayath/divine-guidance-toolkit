import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Music4, Pause, Play, Search } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { NAATS } from "@/lib/extra-data";
import { NASHEEDS, NASHEED_LANGUAGES, NASHEED_THEMES } from "@/lib/nasheed-data";
import { speak, stopSpeaking } from "@/lib/tts";
import { useSettings } from "@/lib/settings";

export const Route = createFileRoute("/naats")({
  head: () => ({
    meta: [
      { title: "Naats & Nasheeds — 100 Vocals-Only Tracks | Raah e Hidayath" },
      {
        name: "description",
        content:
          "A library of 100 naats, nasheeds and salawat sung without instruments, in Arabic, Urdu, English, Turkish and Malay, with meaning, transliteration and male-voice recitation.",
      },
      { property: "og:title", content: "Naats & Nasheeds Library | Raah e Hidayath" },
      { property: "og:description", content: "100 vocals-only nasheeds with meaning and recitation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Naats,
});

const PILL =
  "inline-flex min-h-9 items-center rounded-full border border-border px-3 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-primary";

function Naats() {
  const { settings } = useSettings();
  const [playing, setPlaying] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState<string>("All");
  const [themeFilter, setThemeFilter] = useState<string>("All");

  const toggle = (id: string, text: string, lang: string) => {
    if (playing === id) {
      stopSpeaking();
      setPlaying(null);
      return;
    }
    stopSpeaking();
    setPlaying(id);
    speak(text, lang, {
      voiceProfile: settings.voiceProfile,
      speed: settings.playbackSpeed,
      onEnd: () => setPlaying(null),
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NASHEEDS.filter(
      (n) =>
        (langFilter === "All" || n.language === langFilter) &&
        (themeFilter === "All" || n.theme === themeFilter) &&
        (!q ||
          n.title.toLowerCase().includes(q) ||
          n.artist.toLowerCase().includes(q) ||
          n.about.toLowerCase().includes(q)),
    );
  }, [query, langFilter, themeFilter]);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Naats & Nasheeds"
        subtitle="100 tracks sung without instruments — praise of Allah and His Messenger ﷺ"
      />

      <Card className="gradient-hero text-primary-foreground">
        <p className="arabic-ayah text-2xl text-accent">اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّد</p>
        <p className="mt-3 text-sm text-primary-foreground/85">
          "Indeed Allah and His angels send blessings upon the Prophet. O you who believe, send blessings upon him and
          greet him with peace." — Surah al-Ahzab 33:56
        </p>
      </Card>

      {/* ---- Full text naats ---- */}
      <section aria-labelledby="full-naats" className="space-y-4">
        <h2 id="full-naats" className="font-display text-xl">
          With full text &amp; meaning
        </h2>
        <ul className="space-y-4">
          {NAATS.map((n, i) => (
            <li key={n.id} style={{ animationDelay: `${i * 40}ms` }} className="animate-rise">
              <Card className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg">{n.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {n.poet} · {n.language}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      toggle(n.id, n.arabic.replace(/\n/g, " "), n.language === "Urdu" ? "ur-PK" : "ar-SA")
                    }
                    aria-label={playing === n.id ? `Stop recitation of ${n.title}` : `Recite ${n.title}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {playing === n.id ? (
                      <Pause className="size-4" aria-hidden />
                    ) : (
                      <Play className="size-4" aria-hidden />
                    )}
                    {playing === n.id ? "Stop" : "Recite"}
                  </button>
                </div>

                <p
                  dir="rtl"
                  lang={n.language === "Urdu" ? "ur" : "ar"}
                  className="arabic-ayah whitespace-pre-line text-right text-2xl leading-loose"
                >
                  {n.arabic}
                </p>
                <p className="whitespace-pre-line text-sm italic text-primary">{n.transliteration}</p>
                <p className="whitespace-pre-line text-sm text-muted-foreground">{n.translation}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- 100 nasheed library ---- */}
      <section aria-labelledby="library" className="space-y-4">
        <h2 id="library" className="font-display text-xl">
          Nasheed library ({NASHEEDS.length})
        </h2>

        <Card className="space-y-3">
          <label htmlFor="nasheed-search" className="sr-only">
            Search nasheeds
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              id="nasheed-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, reciter or topic"
              className="min-h-11 w-full bg-transparent text-sm outline-none"
            />
          </div>

          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Filter by language</legend>
            {NASHEED_LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                aria-pressed={langFilter === l}
                className={`${PILL} ${langFilter === l ? "gradient-hero border-transparent text-primary-foreground" : "hover:text-primary"}`}
              >
                {l}
              </button>
            ))}
          </fieldset>

          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Filter by theme</legend>
            {NASHEED_THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setThemeFilter(t)}
                aria-pressed={themeFilter === t}
                className={`${PILL} ${themeFilter === t ? "bg-primary/10 text-primary" : "hover:text-primary"}`}
              >
                {t}
              </button>
            ))}
          </fieldset>
        </Card>

        <p aria-live="polite" className="text-sm text-muted-foreground">
          Showing {filtered.length} of {NASHEEDS.length} nasheeds.
        </p>

        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((n) => (
            <li key={n.id}>
              <Card className="flex h-full flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-base leading-snug">{n.title}</h3>
                    <p className="truncate text-xs text-muted-foreground">{n.artist}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
                    {n.language}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{n.about}</p>

                {n.refrain && (
                  <>
                    <p dir="rtl" lang="ar" className="arabic-ayah text-right text-xl leading-loose">
                      {n.refrain}
                    </p>
                    {n.translation && <p className="text-xs text-muted-foreground">{n.translation}</p>}
                    <button
                      onClick={() => toggle(n.id, n.refrain!, n.language === "Urdu" ? "ur-PK" : "ar-SA")}
                      aria-label={playing === n.id ? `Stop ${n.title}` : `Recite the refrain of ${n.title}`}
                      className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-border px-4 text-sm font-medium hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {playing === n.id ? (
                        <Pause className="size-4" aria-hidden />
                      ) : (
                        <Play className="size-4" aria-hidden />
                      )}
                      {playing === n.id ? "Stop" : "Recite refrain"}
                    </button>
                  </>
                )}

                <span className="mt-auto text-[11px] uppercase tracking-wider text-primary">{n.theme}</span>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <Card className="flex items-start gap-3 text-sm text-muted-foreground">
        <Music4 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p>
          Every nasheed listed here is sung without instruments. We do not stream from music services — recitation uses
          the male voice installed on your device, so pronunciation depends on the Arabic or Urdu voices your phone has.
        </p>
      </Card>
    </div>
  );
}
