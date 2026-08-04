// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isStaticPagesBuild = ["github_pages", "github-pages", "static"].includes(
  process.env["NITRO_PRESET"] ?? "",
);

export default defineConfig({
  // Static hosts need TanStack's default prerender entry. Server deployments
  // keep the custom SSR error wrapper.
  tanstackStart: isStaticPagesBuild ? {} : { server: { entry: "server" } },
});
