import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SectionTitle, Card } from "@/components/AppShell";
import { fetchSurahList } from "@/lib/quran-api";

export const Route = createFileRoute("/quran/")({
  head: () => ({
    meta: [
      { title: "Al Quran — Read, Listen, Translate & Tafseer | Rah e Hidayath" },
      { name: "description", content: "All 114 surahs with Arabic text, recitation audio, translation in many languages, tafseer and full explanation of every ayah." },
      { property: "og:title", content: "Al Quran — Rah e Hidayath" },
      { property: "og:description", content: "Read, listen and understand the complete Quran in your language." },
    ],
  }),
  component: QuranIndex,
});

function QuranIndex() {
  const [q, setQ] = useState("");
  const { data, isLoading, error } = useQuery({ queryKey: ["surahs"], queryFn: fetchSurahList, staleTime: Infinity });

  const list = (data ?? []).filter(
    (s) =>
      !q ||
      s.englishName.toLowerCase().includes(q.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(q.toLowerCase()) ||
      String(s.number) === q.trim(),
  );

  return (
    <div className="space-y-6">
      <SectionTitle title="Al Quran" subtitle="114 Surahs · Reading · Audio · Translation · Tafseer · Explanation" />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/mushaf/$lines" params={{ lines: "13" }}>
          <Card className="h-full gradient-hero text-primary-foreground">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent">Full Quran</p>
            <p className="mt-1 font-display text-xl">13 Line Mushaf</p>
            <p className="text-xs text-primary-foreground/80">Indo-Pak layout · every page · with translation & audio</p>
          </Card>
        </Link>
        <Link to="/mushaf/$lines" params={{ lines: "15" }}>
          <Card className="h-full gradient-hero text-primary-foreground">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent">Full Quran</p>
            <p className="mt-1 font-display text-xl">15 Line Mushaf</p>
            <p className="text-xs text-primary-foreground/80">Madani 604 pages · with translation & audio</p>
          </Card>
        </Link>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search surah by name or number…"
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-soft outline-none focus:shadow-glow"
      />

      {isLoading && (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl border border-border bg-card shimmer" />
          ))}
        </div>
      )}
      {error && <Card className="text-sm text-destructive">Couldn't load the surah list. Please retry.</Card>}

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((s, i) => (
          <Link key={s.number} to="/quran/$surahId" params={{ surahId: String(s.number) }} style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }} className="animate-rise">
            <Card className="flex items-center gap-4">
              <span className="relative grid size-11 shrink-0 place-items-center">
                <svg viewBox="0 0 40 40" className="absolute inset-0 text-primary/25" fill="none" stroke="currentColor">
                  <path d="M20 2 34 10v20L20 38 6 30V10L20 2Z" strokeWidth="1.5" />
                </svg>
                <span className="text-xs font-semibold text-primary">{s.number}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{s.englishName}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {s.englishNameTranslation} · {s.numberOfAyahs} ayahs · {s.revelationType}
                </span>
              </span>
              <span className="arabic-ayah shrink-0 text-lg text-primary">{s.name}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}