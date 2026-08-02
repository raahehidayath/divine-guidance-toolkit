import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, SectionTitle } from "@/components/AppShell";
import { IBADAAT_SECTIONS, SHAHADAH, TAJWEED_RULES } from "@/lib/islamic-data";

export const Route = createFileRoute("/ibadaat")({
  head: () => ({
    meta: [
      { title: "Ibadaat — Salah, Fasting, Hajj, Umrah & Janazah | Rah e Hidayath" },
      { name: "description", content: "Detailed guidance on prayer, wudu, fasting, Zakat, Hajj, Umrah, Namaz-e-Janazah, the Shahadah and the rules of tajweed and stopping." },
      { property: "og:title", content: "Ibadaat — Complete Worship Guide | Rah e Hidayath" },
      { property: "og:description", content: "Every act of worship explained step by step." },
    ],
  }),
  component: Ibadaat,
});

function Ibadaat() {
  const [open, setOpen] = useState<string | null>("salah");

  return (
    <div className="space-y-6">
      <SectionTitle title="Ibadaat" subtitle="Salah · Sawm · Zakat · Hajj · Umrah · Janazah · Tajweed" />

      <Card className="gradient-hero text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.28em] text-accent">Shahadah</p>
        <p className="arabic-ayah mt-3 text-2xl text-accent">{SHAHADAH.arabic}</p>
        <p className="mt-3 text-sm italic text-primary-foreground/80">{SHAHADAH.transliteration}</p>
        <p className="mt-2 text-sm">{SHAHADAH.english}</p>
        <p className="urdu-text mt-2 text-sm text-primary-foreground/90">{SHAHADAH.urdu}</p>
      </Card>

      <div className="space-y-3">
        {IBADAAT_SECTIONS.map((s) => {
          const isOpen = open === s.id;
          return (
            <Card key={s.id} className="animate-rise">
              <button onClick={() => setOpen(isOpen ? null : s.id)} className="flex w-full items-center justify-between text-left">
                <span>
                  <span className="block font-display text-lg">{s.title}</span>
                  <span className="block text-xs text-muted-foreground">{s.summary}</span>
                </span>
                <span className={`text-primary transition ${isOpen ? "rotate-90" : ""}`}>▸</span>
              </button>
              {isOpen && (
                <div className="mt-4 space-y-3">
                  {s.items.map((it) => (
                    <div key={it.h} className="rounded-xl bg-secondary/60 p-4">
                      <p className="font-semibold text-primary">{it.h}</p>
                      <p className="mt-1 text-sm leading-relaxed">{it.b}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-xl">Tajweed — Pronunciation & Rules of Stopping</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TAJWEED_RULES.map((t) => (
            <Card key={t.title}>
              <p className="font-semibold text-primary">{t.title}</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {t.rules.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}