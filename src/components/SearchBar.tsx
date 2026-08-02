import { useNavigate } from "@tanstack/react-router";
import { Mic, Search } from "lucide-react";
import { useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: Array<Array<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};

export function SearchBar({
  placeholder = "Search Quran, hadith, duas…",
  initialQuery = "",
  onSearch,
}: {
  placeholder?: string;
  initialQuery?: string;
  onSearch?: (value: string) => void;
}) {
  const [q, setQ] = useState(initialQuery);
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const navigate = useNavigate();

  const submit = (value: string) => {
    const term = value.trim();
    if (!term) return;
    if (onSearch) {
      onSearch(term);
      return;
    }
    void navigate({ to: "/search", search: { q: term } });
  };

  const startMic = () => {
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    recRef.current = rec;
    rec.lang = "en-US";
    rec.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript ?? "";
      setQ(text);
      submit(text);
    };
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(q);
      }}
      className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-soft focus-within:shadow-glow"
    >
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="button"
        aria-label="Search by voice"
        onClick={startMic}
        className={`relative rounded-full p-2 transition ${listening ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
      >
        {listening && <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" aria-hidden />}
        <Mic className="relative size-4" />
      </button>
    </form>
  );
}