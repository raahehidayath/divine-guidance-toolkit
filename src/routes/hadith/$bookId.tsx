import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { fetchHadithInfo, fetchHadithSection } from "@/lib/quran-api";
import { HADITH_BOOKS, LANGUAGES, getLanguage } from "@/lib/islamic-data";
import { useSettings } from "@/lib/settings";

export const Route = createFileRoute("/hadith/$bookId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.bookId} hadith collection | Rah e Hidayath` },
      { name: "description", content: "Read this hadith collection chapter by chapter with translation in your language." },
      { property: "og:title", content: `Hadith — ${params.bookId} | Rah e Hidayath` },
      { property: "og:description", content: "Authentic hadith, chapter by chapter." },
    ],
  }),
  component: HadithBook,
});

function HadithBook() {
  const { bookId } = Route.useParams();
  const { settings, update } = useSettings();
  const lang = getLanguage(settings.lang);
  const [section, setSection] = useState("1");
  const book = HADITH_BOOKS.find((b) => b.id === bookId);

  const info = useQuery({ queryKey: ["hadith-info", bookId], queryFn: () => fetchHadithInfo(bookId), staleTime: Infinity });
  const data = useQuery({
    queryKey: ["hadith", bookId, settings.lang, section],
    queryFn: () => fetchHadithSection(bookId, settings.lang, section),
    staleTime: 1000 * 60 * 30,
  });

  const sections = Object.entries(info.data?.sections ?? {}).filter(([, name]) => name);

  return (
    <div className="space-y-6">
      <Link to="/hadith" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="size-4" /> All collections
      </Link>
      <SectionTitle title={book?.name ?? bookId} subtitle={book?.arabic} />

      <Card className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Language</span>
          <select
            value={settings.lang}
            onChange={(e) => update({ lang: e.target.value as typeof settings.lang })}
            className="rounded-lg border border-border bg-background px-2 py-1"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0 text-muted-foreground">Chapter</span>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-2 py-1"
          >
            {sections.map(([k, name]) => (
              <option key={k} value={k}>
                {k}. {name}
              </option>
            ))}
          </select>
        </label>
      </Card>

      {data.isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl border border-border bg-card shimmer" />
          ))}
        </div>
      )}
      {data.error && <Card className="text-sm text-destructive">{(data.error as Error).message}</Card>}

      <div className="space-y-3">
        {data.data?.hadiths?.map((h) => (
          <Card key={h.hadithnumber} className="animate-rise">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">Hadith {h.hadithnumber}</span>
              {h.reference && (
                <span>
                  Book {h.reference.book} · No. {h.reference.hadith}
                </span>
              )}
            </div>
            <p
              className={`mt-3 text-[15px] leading-relaxed ${
                settings.lang === "ur" ? "urdu-text text-right" : lang.rtl ? "arabic-ayah text-right" : ""
              }`}
            >
              {h.text}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}