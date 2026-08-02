import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, SectionTitle } from "@/components/AppShell";
import { DUAS } from "@/lib/islamic-data";

export const Route = createFileRoute("/duas")({
  head: () => ({
    meta: [
      { title: "Duas & Daily Azkar | Rah e Hidayath" },
      { name: "description", content: "Authentic daily duas with Arabic, transliteration, English and Urdu meanings for every occasion." },
      { property: "og:title", content: "Duas & Azkar | Rah e Hidayath" },
      { property: "og:description", content: "Masnoon duas for morning, evening, travel, food, sleep and more." },
    ],
  }),
  component: Duas,
});

function Duas() {
  const [q, setQ] = useState("");
  const list = DUAS.filter(
    (d) => !q || d.title.toLowerCase().includes(q.toLowerCase()) || d.en.toLowerCase().includes(q.toLowerCase()) || d.cat.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <SectionTitle title="Duas & Azkar" subtitle="Masnoon supplications for every part of your day" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search a dua…"
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-soft outline-none focus:shadow-glow"
      />
      <div className="space-y-3">
        {list.map((d) => (
          <Card key={d.title} className="animate-rise">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">
              {d.cat} · {d.title}
            </p>
            <p className="arabic-ayah mt-3 text-right text-2xl leading-loose">{d.ar}</p>
            <p className="mt-3 text-sm italic text-muted-foreground">{d.tr}</p>
            <p className="mt-2 text-sm">{d.en}</p>
          </Card>
        ))}
        {list.length === 0 && <Card className="text-center text-sm text-muted-foreground">No dua matched your search.</Card>}
      </div>
    </div>
  );
}