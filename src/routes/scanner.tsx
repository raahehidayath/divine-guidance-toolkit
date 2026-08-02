import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Camera, CheckCircle2, HelpCircle, ImageIcon, Info, ScanBarcode, StopCircle, Trash2, X } from "lucide-react";
import { Card, SectionTitle } from "@/components/AppShell";
import { analyseBarcode, type ScanResult } from "@/lib/extra-data";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Barcode Scanner — Check Product Origin | Raah e Hidayath" },
      {
        name: "description",
        content:
          "Scan or type a product barcode to see the country that registered it, including Israeli (729) registrations, with an EAN-13 checksum check.",
      },
      { property: "og:title", content: "Product Barcode Origin Scanner | Raah e Hidayath" },
      { property: "og:description", content: "Find out which country registered a product barcode before you buy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Scanner,
});

const HISTORY_KEY = "reh-scan-history";

function Scanner() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [gallery, setGallery] = useState<{ id: string; src: string; code: string; verdict: ScanResult["verdict"] }[]>([]);
  const [galleryError, setGalleryError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as ScanResult[]);
    } catch {
      /* ignore */
    }
  }, []);

  const remember = useCallback((r: ScanResult) => {
    setHistory((prev) => {
      const next = [r, ...prev.filter((h) => h.code !== r.code)].slice(0, 12);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const check = useCallback(
    (value: string) => {
      const r = analyseBarcode(value);
      if (!r) {
        setResult(null);
        setError("Enter a valid barcode of at least 8 digits (EAN-8, UPC-A or EAN-13).");
        return;
      }
      setError("");
      setResult(r);
      remember(r);
    },
    [remember],
  );

  /* ---- Gallery: pick a photo of the barcode from the phone and decode it ---- */
  const readFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      setGalleryError("");
      const Detector = (window as unknown as { BarcodeDetector?: new (o?: unknown) => { detect: (s: CanvasImageSource) => Promise<{ rawValue: string }[]> } }).BarcodeDetector;
      const detector = Detector ? new Detector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e"] }) : null;
      let failed = 0;

      for (const file of Array.from(files).slice(0, 8)) {
        const src = URL.createObjectURL(file);
        let code = "";
        if (detector) {
          try {
            const bitmap = await createImageBitmap(file);
            const found = await detector.detect(bitmap);
            code = found[0]?.rawValue ?? "";
            bitmap.close();
          } catch {
            /* unreadable image */
          }
        }
        const r = code ? analyseBarcode(code) : null;
        if (r) {
          setInput(r.code);
          setResult(r);
          setError("");
          remember(r);
        } else {
          failed += 1;
        }
        setGallery((prev) =>
          [{ id: `${file.name}-${Date.now()}-${Math.random()}`, src, code: r?.code ?? "Not detected", verdict: r?.verdict ?? "unknown" }, ...prev].slice(0, 12),
        );
      }

      if (failed) {
        setGalleryError(
          detector
            ? "Some photos could not be read. Crop closer to the bars, keep them straight and well lit, or type the digits below."
            : "This browser cannot read barcodes from photos. The images are saved below — type the digits underneath the bars to check them.",
        );
      }
    },
    [remember],
  );

  const stopCamera = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setScanning(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const startCamera = useCallback(async () => {
    setCameraError("");
    const Detector = (window as unknown as { BarcodeDetector?: new (o?: unknown) => { detect: (s: CanvasImageSource) => Promise<{ rawValue: string }[]> } }).BarcodeDetector;
    if (!Detector) {
      setCameraError("Live camera scanning is not supported by this browser. Please type the barcode digits below instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      setScanning(true);
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();

      const detector = new Detector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e"] });
      const tick = async () => {
        if (!streamRef.current || !videoRef.current) return;
        try {
          const codes = await detector.detect(videoRef.current);
          const first = codes[0]?.rawValue;
          if (first) {
            setInput(first);
            check(first);
            stopCamera();
            return;
          }
        } catch {
          /* keep scanning */
        }
        rafRef.current = requestAnimationFrame(() => void tick());
      };
      rafRef.current = requestAnimationFrame(() => void tick());
    } catch {
      setCameraError("Camera permission was refused. Allow camera access, or type the barcode digits below.");
      stopCamera();
    }
  }, [check, stopCamera]);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Product Barcode Scanner"
        subtitle="Check which country registered a product — including Israeli (729) barcodes"
      />

      <Card className="space-y-4">
        <h2 className="sr-only">Scan a barcode</h2>

        <div className="flex flex-wrap gap-2">
          {!scanning ? (
            <button
              onClick={() => void startCamera()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full gradient-hero px-5 text-sm font-semibold text-primary-foreground"
            >
              <Camera className="size-4" aria-hidden /> Scan with camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold"
            >
              <StopCircle className="size-4" aria-hidden /> Stop camera
            </button>
          )}

          <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold hover:text-primary focus-within:ring-2 focus-within:ring-primary">
            <ImageIcon className="size-4" aria-hidden /> Choose from gallery
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => {
                void readFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
        </div>

        {galleryError && (
          <p role="status" className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {galleryError}
          </p>
        )}

        {cameraError && (
          <p role="status" className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {cameraError}
          </p>
        )}

        <div className={scanning ? "relative overflow-hidden rounded-2xl border border-border" : "hidden"}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video ref={videoRef} muted playsInline className="h-56 w-full bg-black object-cover" aria-label="Camera preview for barcode scanning" />
          <span aria-hidden className="pointer-events-none absolute inset-x-8 top-1/2 h-0.5 -translate-y-1/2 bg-accent shadow-glow" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            check(input);
          }}
          className="space-y-2"
        >
          <label htmlFor="barcode-input" className="block text-sm font-medium">
            Or type the barcode number
          </label>
          <div className="flex gap-2">
            <input
              id="barcode-input"
              value={input}
              inputMode="numeric"
              autoComplete="off"
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 7290000066318"
              aria-describedby="barcode-help"
              className="min-h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl gradient-hero px-4 text-sm font-semibold text-primary-foreground"
            >
              <ScanBarcode className="size-4" aria-hidden /> Check
            </button>
          </div>
          <p id="barcode-help" className="text-xs text-muted-foreground">
            Works with EAN-8, UPC-A and EAN-13 numbers printed under the bars.
          </p>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </form>
      </Card>

      <div aria-live="polite">{result && <ResultCard result={result} />}</div>

      <Card>
        <h2 className="flex items-center gap-2 font-display text-lg">
          <HelpCircle className="size-4 text-primary" aria-hidden /> How to read the result
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• The first three digits of a barcode are the GS1 prefix of the country where the company registered the product.</li>
          <li>• <strong className="text-foreground">729</strong> is GS1 Israel.</li>
          <li>• A prefix shows the registering company's country — it does not always match where the item was manufactured, and a multinational may register locally.</li>
          <li>• Use the result as a first check, then confirm with the label or the manufacturer.</li>
        </ul>
      </Card>

      {gallery.length > 0 && (
        <section aria-labelledby="scan-gallery" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="scan-gallery" className="font-display text-xl">
              Gallery
            </h2>
            <button
              onClick={() => {
                gallery.forEach((g) => URL.revokeObjectURL(g.src));
                setGallery([]);
              }}
              className="inline-flex min-h-11 items-center gap-1 rounded-full border border-border px-4 text-sm text-muted-foreground hover:text-primary"
            >
              <Trash2 className="size-4" aria-hidden /> Clear gallery
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((g) => (
              <li key={g.id}>
                <button
                  onClick={() => setPreview(g.src)}
                  className="group block w-full overflow-hidden rounded-2xl border border-border text-left focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`View full size photo of barcode ${g.code}`}
                >
                  <img src={g.src} alt={`Scanned product barcode ${g.code}`} loading="lazy" className="h-32 w-full object-cover transition group-hover:scale-105" />
                  <span className="block truncate px-3 py-2 font-mono text-xs">{g.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Barcode photo preview"
          className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-4"
          onClick={() => setPreview(null)}
        >
          <img src={preview} alt="Full size barcode photo" className="max-h-[80dvh] w-auto max-w-full rounded-2xl" />
          <button
            onClick={() => setPreview(null)}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold"
          >
            <X className="size-4" aria-hidden /> Close
          </button>
        </div>
      )}

      {history.length > 0 && (
        <section aria-labelledby="scan-history" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="scan-history" className="font-display text-xl">
              Recent checks
            </h2>
            <button
              onClick={() => {
                setHistory([]);
                try {
                  localStorage.removeItem(HISTORY_KEY);
                } catch {
                  /* ignore */
                }
              }}
              className="inline-flex min-h-11 items-center gap-1 rounded-full border border-border px-4 text-sm text-muted-foreground hover:text-primary"
            >
              <X className="size-4" aria-hidden /> Clear
            </button>
          </div>
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h.code}>
                <Card className="flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-sm">{h.code}</span>
                    <span className="block truncate text-xs text-muted-foreground">{h.country}</span>
                  </span>
                  <VerdictPill verdict={h.verdict} />
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function VerdictPill({ verdict }: { verdict: ScanResult["verdict"] }) {
  const map = {
    israeli: { text: "Israeli (729)", cls: "bg-destructive/15 text-destructive" },
    flagged: { text: "Check further", cls: "bg-accent/20 text-accent-foreground" },
    clear: { text: "Not Israeli", cls: "bg-primary/15 text-primary" },
    unknown: { text: "Unknown", cls: "bg-secondary text-muted-foreground" },
  } as const;
  const v = map[verdict];
  return <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${v.cls}`}>{v.text}</span>;
}

function ResultCard({ result }: { result: ScanResult }) {
  const Icon = result.verdict === "israeli" ? AlertTriangle : result.verdict === "clear" ? CheckCircle2 : Info;
  return (
    <Card className="space-y-3">
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-0.5 size-6 shrink-0 ${result.verdict === "israeli" ? "text-destructive" : result.verdict === "clear" ? "text-primary" : "text-muted-foreground"}`}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="font-display text-lg">
            {result.verdict === "israeli" ? "Registered in Israel" : result.verdict === "clear" ? "Not an Israeli barcode" : "Needs manual verification"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
        </div>
        <VerdictPill verdict={result.verdict} />
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Barcode</dt>
          <dd className="font-mono">{result.code}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">GS1 prefix</dt>
          <dd className="font-mono">{result.prefix}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Registered country</dt>
          <dd>{result.country}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Checksum</dt>
          <dd>
            {result.validChecksum === null ? "Not applicable" : result.validChecksum ? "Valid ✓" : "Invalid ✗"}
          </dd>
        </div>
      </dl>

      {result.brandNote && <p className="text-sm text-muted-foreground">{result.brandNote}</p>}
    </Card>
  );
}
