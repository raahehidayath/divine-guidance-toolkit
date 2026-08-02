import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";

export const Route = createFileRoute("/tracker")({
  head: () => ({
    meta: [
      { title: "Salah Tracker — Daily Prayer Log | Raah e Hidayath" },
      { name: "description", content: "Track your five daily prayers, keep a weekly streak and never miss a salah again." },
      { property: "og:title", content: "Salah Tracker | Raah e Hidayath" },
      { property: "og:description", content: "Log your five daily prayers and watch your streak grow." },
    ],
  }),
  component: Tracker,
});

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const KEY = "reh-salah-tracker";

const lastDays = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().slice(0, 10);
  });

function Tracker() {
  const days = lastDays(7);
  const [log, setLog] = useState<Record<string, string[]>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLog(JSON.parse(raw) as Record<string, string[]>);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (day: string, prayer: string) => {
    setLog((prev) => {
      const current = prev[day] ?? [];
      const next = current.includes(prayer) ? current.filter((p) => p !== prayer) : [...current, prayer];
      const updated = { ...prev, [day]: next };
      try {
        localStorage.setItem(KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  const total = days.reduce((sum, d) => sum + (log[d]?.length ?? 0), 0);
  const pct = Math.round((total / (days.length * 5)) * 100);

  return (
    <div className="space-y-6">
      <SectionTitle title="Salah Tracker" subtitle="Your last 7 days of prayers" />

      <Card className="gradient-hero text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.28em] text-accent">This week</p>
        <p className="mt-2 font-display text-4xl">{pct}%</p>
        <p className="text-sm text-primary-foreground/80">
          {total} of {days.length * 5} prayers marked complete
        </p>
      </Card>

      <div className="space-y-3">
        {days.map((day) => (
          <Card key={day}>
            <p className="text-sm font-semibold">
              {new Date(day).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRAYERS.map((p) => {
                const done = log[day]?.includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => toggle(day, p)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition ${
                      done ? "border-transparent gradient-hero text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {done && <Check className="size-3.5" />}
                    {p}
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}