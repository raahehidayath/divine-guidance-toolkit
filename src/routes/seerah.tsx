import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionTitle } from "@/components/AppShell";
import { SEERAH_FAMILY, SEERAH_TIMELINE } from "@/lib/islamic-data";

export const Route = createFileRoute("/seerah")({
  head: () => ({
    meta: [
      { title: "Seerat un Nabi ﷺ — Life, Family & Timeline | Rah e Hidayath" },
      { name: "description", content: "The complete life of Prophet Muhammad ﷺ: a year-by-year timeline, his family and companions, with their birth years, ages and roles." },
      { property: "og:title", content: "Seerat un Nabi ﷺ | Rah e Hidayath" },
      { property: "og:description", content: "Timeline, family tree and age chart from the blessed life of the Prophet ﷺ." },
    ],
  }),
  component: Seerah,
});

function Seerah() {
  const maxAge = Math.max(...SEERAH_FAMILY.map((f) => f.age));

  return (
    <div className="space-y-8">
      <SectionTitle title="Seerat un Nabi ﷺ" subtitle="Born 570 CE in Makkah · Passed away 632 CE in Madinah · Age 63" />

      <Card className="gradient-hero text-primary-foreground">
        <p className="arabic-ayah text-2xl text-accent">مُحَمَّدٌ رَسُولُ ٱللَّٰهِ</p>
        <p className="mt-3 text-sm text-primary-foreground/85">
          Forty years in Makkah before prophethood, thirteen years of da'wah in Makkah, and ten years building the
          community in Madinah — a mercy to all the worlds.
        </p>
      </Card>

      <section className="space-y-4">
        <h2 className="font-display text-xl">Timeline</h2>
        <div className="relative space-y-4 border-l border-border pl-6">
          {SEERAH_TIMELINE.map((t, i) => (
            <div key={t.year} style={{ animationDelay: `${i * 40}ms` }} className="animate-rise relative">
              <span className="absolute -left-[31px] top-2 size-3 rounded-full gradient-gold shadow-glow" />
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{t.year}</p>
                <p className="mt-1 font-display text-lg">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl">Family & Companions — Age Chart</h2>
        <Card className="space-y-4">
          {SEERAH_FAMILY.map((f) => (
            <div key={f.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold">{f.name}</span>
                <span className="text-xs text-muted-foreground">
                  {f.life} · {f.age} years
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{f.role}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full gradient-hero" style={{ width: `${(f.age / maxAge) * 100}%` }} />
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}