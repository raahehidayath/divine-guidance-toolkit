import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, LayoutDashboard, LogOut, Mail, Settings2, ShieldCheck, Users } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { CREATORS, HADITH_BOOKS, LANGUAGES, RECITERS } from "@/lib/islamic-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Raah e Hidayath" },
      { name: "description", content: "Administrator dashboard for managing content, languages, reciters and announcements in Raah e Hidayath." },
      { property: "og:title", content: "Admin Panel | Raah e Hidayath" },
      { property: "og:description", content: "Manage the Raah e Hidayath app." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const SESSION_KEY = "reh-admin-session";
const ADMIN_USER = "rahehidayath";
const ADMIN_PASS = "w@964000";

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
      setAnnouncement(localStorage.getItem("reh-announcement") ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect username or password.");
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
    setUser("");
    setPass("");
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm space-y-6 py-10">
        <SectionTitle title="Admin Login" subtitle="Authorised personnel only" />
        <Card>
          <form onSubmit={login} className="space-y-3">
            <ShieldCheck className="mx-auto size-10 text-primary" />
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:shadow-glow"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:shadow-glow"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" className="w-full rounded-xl gradient-hero py-3 text-sm font-semibold text-primary-foreground">
              Sign in
            </button>
          </form>
        </Card>
      </div>
    );
  }

  const stats = [
    { label: "Surahs", value: 114, icon: BookOpen },
    { label: "Ayaat", value: 6236, icon: LayoutDashboard },
    { label: "Hadith books", value: HADITH_BOOKS.length, icon: BookOpen },
    { label: "Languages", value: LANGUAGES.length, icon: Users },
    { label: "Reciters", value: RECITERS.length, icon: Settings2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle title="Admin Dashboard" subtitle={`Signed in as ${ADMIN_USER}`} />
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:text-primary">
          <LogOut className="size-4" /> Sign out
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="text-center">
            <Icon className="mx-auto size-5 text-primary" />
            <p className="mt-2 font-display text-2xl">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <p className="font-display text-lg">Home announcement</p>
        <p className="text-xs text-muted-foreground">Shown as a banner on the home page for all users of this device.</p>
        <textarea
          rows={3}
          value={announcement}
          onChange={(e) => {
            setAnnouncement(e.target.value);
            setSaved(false);
          }}
          className="mt-3 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:shadow-glow"
          placeholder="e.g. Ramadan timetable is now available"
        />
        <button
          onClick={() => {
            try {
              localStorage.setItem("reh-announcement", announcement);
              setSaved(true);
            } catch {
              /* ignore */
            }
          }}
          className="mt-3 rounded-full gradient-hero px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          {saved ? "Saved" : "Save announcement"}
        </button>
      </Card>

      <Card>
        <p className="font-display text-lg">Content sources</p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Quran text, translations & audio — alquran.cloud</li>
          <li>• Tafseer — spa5k tafsir_api (Ibn Kathir, Mokhtasar and more)</li>
          <li>• Hadith collections — fawazahmed0 hadith-api</li>
          <li>• Prayer times, Qibla, Hijri calendar & Asma ul Husna — aladhan.com</li>
          <li>• Islamic AI assistant — Lovable AI Gateway</li>
        </ul>
      </Card>

      <Card>
        <p className="flex items-center gap-2 font-display text-lg">
          <Mail className="size-4 text-primary" /> Support inbox
        </p>
        <a href="mailto:rahehidayath@gmail.com" className="mt-1 block text-sm text-primary underline">
          rahehidayath@gmail.com
        </a>
        <p className="mt-3 text-xs text-muted-foreground">App maintained by {CREATORS.join(", ")}.</p>
      </Card>
    </div>
  );
}