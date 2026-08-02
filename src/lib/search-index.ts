import {
  DUAS,
  HADITH_BOOKS,
  IBADAAT_SECTIONS,
  PROPHET_NAMES,
  QAIDA_LESSONS,
  RAKAH_TABLE,
  SEERAH_FAMILY,
  SEERAH_TIMELINE,
  TAJWEED_RULES,
  TASBEEH_PRESETS,
} from "./islamic-data";

export type SiteResult = {
  id: string;
  title: string;
  subtitle: string;
  section: string;
  to: string;
  params?: Record<string, string>;
  haystack: string;
};

const push = (
  out: SiteResult[],
  r: Omit<SiteResult, "haystack"> & { extra?: string },
) => {
  const { extra, ...rest } = r;
  out.push({
    ...rest,
    haystack: `${r.title} ${r.subtitle} ${r.section} ${extra ?? ""}`.toLowerCase(),
  });
};

function build(): SiteResult[] {
  const out: SiteResult[] = [];

  const pages: Array<[string, string, string]> = [
    ["/", "Home", "Prayer times, quick access and today's Islamic date"],
    ["/quran", "Al Quran", "114 surahs — read, listen, translation, tafseer, explanation"],
    ["/mushaf/13", "13 Line Quran", "Full Indo-Pak style mushaf with translation and audio"],
    ["/mushaf/15", "15 Line Quran", "Full Madani mushaf, 604 pages, with translation and audio"],
    ["/hadith", "Hadith", "Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah, Malik"],
    ["/ibadaat", "Ibadaat", "Taharah, salah, zakat, sawm, hajj and umrah"],
    ["/duas", "Duas", "Daily, salah, protection, travel and forgiveness duas"],
    ["/names", "99 Names of Allah", "Asma ul Husna with meanings"],
    ["/tasbeeh", "Digital Tasbeeh", "Counter with dhikr presets"],
    ["/qibla", "Qibla Direction", "Live compass towards the Ka'bah"],
    ["/calendar", "Hijri Calendar", "Islamic dates and Gregorian conversion"],
    ["/qaida", "Noorani Qaida", "Learn to read Arabic letter by letter"],
    ["/seerah", "Seerat un Nabi ﷺ", "Life, family, timeline and companions"],
    ["/tracker", "Salah Tracker", "Track your five daily prayers"],
    ["/ai", "Islamic AI", "Ask any Islamic question"],
    ["/more", "More", "All other sections of the app"],
    ["/settings", "Settings", "Language, reciter, theme, city, calculation method"],
  ];
  for (const [to, title, subtitle] of pages)
    push(out, { id: `page-${to}`, title, subtitle, section: "Page", to, extra: "namaz salah prayer" });

  for (const b of HADITH_BOOKS)
    push(out, {
      id: `hadith-${b.id}`,
      title: b.name,
      subtitle: `${b.arabic} · ${b.count} hadith`,
      section: "Hadith book",
      to: "/hadith/$bookId",
      params: { bookId: b.id },
      extra: b.arabic,
    });

  for (const d of DUAS)
    push(out, {
      id: `dua-${d.title}`,
      title: d.title,
      subtitle: d.en,
      section: `Dua · ${d.cat}`,
      to: "/duas",
      extra: `${d.ar} ${d.tr}`,
    });

  for (const s of IBADAAT_SECTIONS) {
    push(out, { id: `ib-${s.id}`, title: s.title, subtitle: s.summary, section: "Ibadaat", to: "/ibadaat" });
    for (const item of s.items)
      push(out, {
        id: `ib-${s.id}-${item.h}`,
        title: item.h,
        subtitle: item.b.slice(0, 140),
        section: `Ibadaat · ${s.title}`,
        to: "/ibadaat",
        extra: item.b,
      });
  }

  for (const r of RAKAH_TABLE)
    push(out, {
      id: `rakah-${r.prayer}`,
      title: `${r.prayer} — rak'ah count`,
      subtitle: `${r.sunnahBefore} · ${r.farz} · ${r.sunnahAfter}`,
      section: "Namaz",
      to: "/ibadaat",
      extra: `${r.extra} namaz salah`,
    });

  for (const t of TAJWEED_RULES)
    push(out, {
      id: `tajweed-${t.title}`,
      title: t.title,
      subtitle: t.rules[0] ?? "",
      section: "Tajweed",
      to: "/qaida",
      extra: t.rules.join(" "),
    });

  for (const l of QAIDA_LESSONS)
    push(out, {
      id: `qaida-${l.n}`,
      title: `Lesson ${l.n} — ${l.title}`,
      subtitle: l.note,
      section: "Noorani Qaida",
      to: "/qaida",
      extra: l.letters.join(" "),
    });

  for (const t of TASBEEH_PRESETS)
    push(out, {
      id: `tasbeeh-${t.name}`,
      title: t.name,
      subtitle: `${t.arabic} · target ${t.target}`,
      section: "Tasbeeh",
      to: "/tasbeeh",
      extra: t.arabic,
    });

  for (const t of SEERAH_TIMELINE)
    push(out, {
      id: `seerah-${t.year}-${t.title}`,
      title: t.title,
      subtitle: `${t.year} — ${t.text.slice(0, 120)}`,
      section: "Seerah",
      to: "/seerah",
      extra: t.text,
    });

  for (const f of SEERAH_FAMILY)
    push(out, {
      id: `family-${f.name}`,
      title: f.name,
      subtitle: `${f.role} · ${f.life}`,
      section: "Seerah · Family",
      to: "/seerah",
    });

  for (const n of PROPHET_NAMES)
    push(out, {
      id: `pname-${n.tr}`,
      title: `${n.tr} — ${n.ar}`,
      subtitle: n.en,
      section: "Names of the Prophet ﷺ",
      to: "/seerah",
    });

  return out;
}

export const SITE_INDEX: SiteResult[] = build();

export function searchSite(query: string, limit = 40): SiteResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return SITE_INDEX.map((item) => {
    let score = 0;
    for (const t of terms) {
      if (item.title.toLowerCase().includes(t)) score += 5;
      if (item.haystack.includes(t)) score += 2;
    }
    return { item, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
