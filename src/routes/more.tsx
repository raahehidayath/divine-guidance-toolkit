import { createFileRoute, Link } from "@tanstack/react-router";
import { Baby, Bot, CalendarDays, Compass, Heart, ListChecks, Mail, Music4, ScanBarcode, Search, Settings, Shield, Sparkle, Star, Users } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { CREATORS } from "@/lib/islamic-data";

export const Route = createFileRoute("/more")({
  head: () => ({
    meta: [
      { title: "More — Qibla, Duas, Naats, Barcode Scanner & Seerah | Raah e Hidayath" },
      { name: "description", content: "Qibla direction, 99 Names of Allah, tasbeeh, duas, naats, product barcode origin scanner, prophets' families, Noorani Qaida, Hijri calendar and salah tracker." },
      { property: "og:title", content: "More Islamic Tools | Raah e Hidayath" },
      { property: "og:description", content: "Everything else in one place." },
    ],
  }),
  component: More,
});

const LINKS = [
  { to: "/qibla", label: "Qibla Direction", icon: Compass, note: "Live compass from your location" },
  { to: "/names", label: "99 Names of Allah", icon: Star, note: "Asma ul Husna with meanings" },
  { to: "/naats", label: "Naats & Salawat", icon: Music4, note: "Praise of the Prophet ﷺ with meaning" },
  { to: "/scanner", label: "Barcode Scanner", icon: ScanBarcode, note: "Check if a product is Israeli (729)" },
  { to: "/prophets", label: "Prophets & Families", icon: Users, note: "Adam AS to Muhammad ﷺ, wives & children" },
  { to: "/tasbeeh", label: "Digital Tasbeeh", icon: ListChecks, note: "All the common adhkar" },
  { to: "/duas", label: "Duas & Azkar", icon: Heart, note: "Arabic, transliteration, meaning" },
  { to: "/qaida", label: "Noorani Qaida", icon: Baby, note: "Animated learning for children" },
  { to: "/seerah", label: "Seerat un Nabi ﷺ", icon: Sparkle, note: "Timeline, family & ages" },
  { to: "/calendar", label: "Hijri Calendar", icon: CalendarDays, note: "Islamic months and dates" },
  { to: "/tracker", label: "Salah Tracker", icon: ListChecks, note: "Track your five daily prayers" },
  { to: "/search", label: "Search", icon: Search, note: "Search the Quran by voice or text" },
  { to: "/ai", label: "Islamic AI", icon: Bot, note: "Ask any Islamic question" },
  { to: "/settings", label: "Settings", icon: Settings, note: "Language, theme, reciter, location" },
  { to: "/admin", label: "Admin Panel", icon: Shield, note: "Manage the app" },
];


function More() {
  return (
    <div className="space-y-6">
      <SectionTitle title="More" subtitle="Every remaining tool of Raah e Hidayath" />
      <div className="grid gap-3 sm:grid-cols-2">
        {LINKS.map(({ to, label, icon: Icon, note }, i) => (
          <Link key={to} to={to} style={{ animationDelay: `${i * 35}ms` }} className="animate-rise">
            <Card className="group flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{label}</span>
                <span className="block truncate text-xs text-muted-foreground">{note}</span>
              </span>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <p className="flex items-center gap-2 font-display text-lg">
          <Mail className="size-4 text-primary" /> Ask a question
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Send us your questions, corrections or suggestions and our team will reply insha'Allah.
        </p>
        <a
          href="mailto:rahehidayath@gmail.com?subject=Rah%20e%20Hidayath%20Question"
          className="mt-3 inline-block rounded-full gradient-hero px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          rahehidayath@gmail.com
        </a>
      </Card>

      <Card className="text-center text-sm text-muted-foreground">
        <p className="font-display text-base text-foreground">Developed by</p>
        <p className="mt-1">{CREATORS.join(" · ")}</p>
      </Card>
    </div>
  );
}