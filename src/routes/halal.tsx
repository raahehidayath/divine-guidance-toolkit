import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, Search, ShieldQuestion } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { HALAL_CATEGORIES, HALAL_ITEMS, RULING_LABEL, type Ruling } from "@/lib/halal-data";

export const Route = createFileRoute("/halal")({
  head: () => ({
    meta: [
      { title: "Halal or Haram Checker — Food, E-Numbers & Daily Life | Raah e Hidayath" },
      {
        name: "description",
        content:
          "Search whether food, E-number additives, drinks, medicine, money matters and everyday things are halal, haram or doubtful, with the reason and the evidence.",
      },
      { property: "og:title", content: "Halal or Haram Checker | Raah e Hidayath" },
      { property: "og:description", content: "Know if it is halal, haram or doubtful — with the evidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Halal,
});

const RULING_STYLE: Record<Ruling, string> = {
  halal: "bg-primary/15 text-primary",
  haram: "bg-destructive/15 text-destructive",
  mushbooh: "bg-accent/20 text-accent-foreground",
};

const RULING_ICON: Record<Ruling, typeof CheckCircle2> = {
  halal: CheckCircle2,
  haram: AlertTriangle,
  mushbooh: ShieldQuestion,
};

const PILL =
  "inline-flex min-h-9 items-center rounded-full border border-border px-3 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-primary";

function Halal() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [ruling, setRuling] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HALAL_ITEMS.filter(
      (i) =>
        (category === "All" || i.category === category) &&
        (ruling === "All" || i.ruling === ruling) &&
        (!q ||
          i.name.toLowerCase().includes(q) ||
          i.why.toLowerCase().includes(q) ||
          (i.aka ?? []).some((a) => a.toLowerCase().includes(q))),
    );
  }, [query, category, ruling]);

  const counts = useMemo(
    () => ({
      halal: HALAL_ITEMS.filter((i) => i.ruling === "halal").length,
      mushbooh: HALAL_ITEMS.filter((i) => i.ruling === "mushbooh").length,
      haram: HALAL_ITEMS.filter((i) => i.ruling === "haram").length,
    }),
    [],
  );

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Halal or Haram"
        subtitle="Food, additives, medicine, money and daily life — with the reason and the evidence"
      />

      <ul className="grid grid-cols-3 gap-3">
        {(["halal", "mushbooh", "haram"] as Ruling[]).map((r) => (
          <li key={r}>
            <Card className="text-center">
              <p className="font-display text-2xl">{counts[r]}</p>
              <p className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${RULING_STYLE[r]}`}>
                {RULING_LABEL[r]}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <Card className="space-y-3">
        <label htmlFor="halal-search" className="sr-only">
          Search for a product or ingredient
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            id="halal-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. gelatine, E471, insurance, tattoo"
            className="min-h-11 w-full bg-transparent text-sm outline-none"
          />
        </div>

        <fieldset className="flex flex-wrap gap-2">
          <legend className="sr-only">Filter by ruling</legend>
          {["All", "halal", "mushbooh", "haram"].map((r) => (
            <button
              key={r}
              onClick={() => setRuling(r)}
              aria-pressed={ruling === r}
              className={`${PILL} ${ruling === r ? "gradient-hero border-transparent text-primary-foreground" : "hover:text-primary"}`}
            >
              {r === "All" ? "All rulings" : RULING_LABEL[r as Ruling]}
            </button>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap gap-2">
          <legend className="sr-only">Filter by category</legend>
          {["All", ...HALAL_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`${PILL} ${category === c ? "bg-primary/10 text-primary" : "hover:text-primary"}`}
            >
              {c === "All" ? "All categories" : c}
            </button>
          ))}
        </fieldset>
      </Card>

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {results.length} result{results.length === 1 ? "" : "s"}.
      </p>

      <ul className="grid gap-3 sm:grid-cols-2">
        {results.map((item) => {
          const Icon = RULING_ICON[item.ruling];
          return (
            <li key={item.id}>
              <Card className="flex h-full flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-base leading-snug">{item.name}</h2>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${RULING_STYLE[item.ruling]}`}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {RULING_LABEL[item.ruling]}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.category}</p>
                <p className="text-sm">{item.why}</p>
                {item.aka && (
                  <p className="text-xs text-muted-foreground">
                    Also on labels as: {item.aka.join(", ")}
                  </p>
                )}
                {item.evidence && <p className="mt-auto text-xs italic text-primary">{item.evidence}</p>}
              </Card>
            </li>
          );
        })}
      </ul>

      <Card className="flex items-start gap-3 text-sm text-muted-foreground">
        <HelpCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p>
          Rulings follow the majority position of the four Sunni schools. Where the schools differ this is stated in the
          card. "Doubtful" means the ruling depends on the source of the ingredient — check the certification or ask
          your local scholar before deciding.
        </p>
      </Card>
    </div>
  );
}
