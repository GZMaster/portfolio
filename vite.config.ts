import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function injectOgFromGithubJson(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL?.trim() || "https://gzmaster.dev";

  return {
    name: "inject-og-from-github-json",
    transformIndexHtml(html: string) {
      let avatar = "https://avatars.githubusercontent.com/u/9919?v=4";
      try {
        const raw = fs.readFileSync(
          path.resolve(__dirname, "src/data/github.json"),
          "utf8",
        );
        const parsed = JSON.parse(raw) as {
          profile?: { avatar_url?: string };
        };
        if (parsed.profile?.avatar_url) avatar = parsed.profile.avatar_url;
      } catch {
        /* keep fallback when file missing */
      }

      return html
        .replaceAll("__OG_IMAGE__", avatar)
        .replaceAll("__SITE_URL__", siteUrl);
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), injectOgFromGithubJson(mode)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
