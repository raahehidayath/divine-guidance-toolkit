import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionTitle, Card } from "@/components/AppShell";
import { HADITH_BOOKS } from "@/lib/islamic-data";

export const Route = createFileRoute("/hadith/")({
  head: () => ({
    meta: [
      { title: "Hadith Collections — Bukhari, Muslim & more | Raah e Hidayath" },
      { name: "description", content: "Browse Sahih al-Bukhari, Sahih Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah, Muwatta Malik and the Forty Hadith collections in many languages." },
      { property: "og:title", content: "Hadith Collections | Raah e Hidayath" },
      { property: "og:description", content: "Every major hadith book, chapter by chapter, in your language." },
    ],
  }),
  component: HadithIndex,
});

function HadithIndex() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Hadith" subtitle="The major collections of the Sunnah — chapter by chapter, in your language" />
      <div className="grid gap-3 sm:grid-cols-2">
        {HADITH_BOOKS.map((b, i) => (
          <Link key={b.id} to="/hadith/$bookId" params={{ bookId: b.id }} style={{ animationDelay: `${i * 40}ms` }} className="animate-rise">
            <Card className="flex items-center justify-between gap-4">
              <span className="min-w-0">
                <span className="block truncate font-semibold">{b.name}</span>
                <span className="block text-xs text-muted-foreground">{b.count} narrations</span>
              </span>
              <span className="arabic-ayah shrink-0 text-lg text-primary">{b.arabic}</span>
            </Card>
          </Link>
        ))}
      </div>
      <Card className="text-xs text-muted-foreground">
        Hadith text is served live from the open Hadith API. Collections such as Mishkat, Musnad Ahmad, Bayhaqi,
        Ibn Hibban and Musannaf Ibn Abi Shaybah are not published by any free open API yet — they will appear here
        as soon as a verified open source is available.
      </Card>
    </div>
  );
}