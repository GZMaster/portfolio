import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { loadEnv } from "vite";

/** Project root (this file lives next to `vite.config.ts`). */
const DIR = path.dirname(fileURLToPath(import.meta.url));

interface GitHubProfile {
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  updated_at: string;
}

interface GitHubFile {
  profile: GitHubProfile;
}

function readGithubData(): GitHubFile {
  const file = path.join(DIR, "src", "data", "github.json");
  const fallback: GitHubFile = {
    profile: {
      name: "GZMaster",
      bio: "Full-stack developer, AI engineer, and founder of RetroDevs.",
      avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
      public_repos: 0,
      updated_at: new Date().toISOString(),
    },
  };
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as GitHubFile;
  } catch {
    return fallback;
  }
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function trimForMetaDescription(text: string, maxLen: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= maxLen) return t;
  const cut = t.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function isoDateForSitemap(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function buildJsonLd(params: {
  siteUrl: string;
  displayName: string;
  description: string;
  image: string;
  githubUrl: string;
}): string {
  const { siteUrl, displayName, description, image, githubUrl } = params;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${displayName} — Portfolio`,
        description,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: `${displayName} — Portfolio`,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: displayName,
        url: siteUrl,
        image: { "@type": "ImageObject", url: image },
        sameAs: [githubUrl, "https://www.retrodevs.com"],
        jobTitle: "Full-stack developer",
        worksFor: {
          "@type": "Organization",
          name: "RetroDevs",
          url: "https://www.retrodevs.com",
        },
      },
    ],
  };
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

function optionalVerificationMeta(env: Record<string, string>): string {
  const google = env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = env.VITE_BING_SITE_VERIFICATION?.trim();
  const parts: string[] = [];
  if (google) {
    parts.push(
      `    <meta name="google-site-verification" content="${escapeHtmlAttr(google)}" />`,
    );
  }
  if (bing) {
    parts.push(
      `    <meta name="msvalidate.01" content="${escapeHtmlAttr(bing)}" />`,
    );
  }
  return parts.length ? `\n${parts.join("\n")}\n` : "";
}

function optionalTwitterSiteMeta(handle: string | undefined): string {
  if (!handle?.trim()) return "";
  const h = handle.trim().startsWith("@") ? handle.trim() : `@${handle.trim()}`;
  return `    <meta name="twitter:site" content="${escapeHtmlAttr(h)}" />\n    <meta name="twitter:creator" content="${escapeHtmlAttr(h)}" />\n`;
}

export function portfolioSeoPlugin(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), "") as Record<string, string>;
  const siteUrlRaw = env.VITE_SITE_URL?.trim() || "https://gzmaster.dev";
  const siteUrl = siteUrlRaw.replace(/\/$/, "");
  const githubUsername = env.VITE_GITHUB_USERNAME?.trim() || "GZMaster";
  const githubUrl = `https://github.com/${githubUsername}`;
  const twitterHandle = env.VITE_TWITTER_HANDLE?.trim();

  return {
    name: "portfolio-seo",
    transformIndexHtml(html: string) {
      const data = readGithubData();
      const p = data.profile;
      const displayName = p.name?.trim() || githubUsername;
      const baseBio =
        p.bio?.trim() ||
        "Full-stack developer, AI engineer, and founder of RetroDevs — shipping web apps, AI integrations, and open source.";
      const descriptionPlain = trimForMetaDescription(baseBio, 158);
      const description = escapeHtmlAttr(descriptionPlain);
      const pageTitle = escapeHtmlAttr(
        `${displayName} — Full-stack developer & founder | Portfolio`,
      );
      const ogTitle = escapeHtmlAttr(`${displayName} — Portfolio`);
      const ogDescription = description;
      const image = p.avatar_url || `${siteUrl}/vite.svg`;

      const ogSiteName = escapeHtmlAttr(`${displayName} — Portfolio`);

      const jsonLd = buildJsonLd({
        siteUrl,
        displayName,
        description: trimForMetaDescription(baseBio, 300),
        image,
        githubUrl,
      });

      return html
        .replaceAll("__SITE_URL__", escapeHtmlAttr(siteUrl))
        .replaceAll("__AUTHOR_NAME__", escapeHtmlAttr(displayName))
        .replaceAll("__OG_SITE_NAME__", ogSiteName)
        .replaceAll("__PAGE_TITLE__", pageTitle)
        .replaceAll("__META_DESCRIPTION__", description)
        .replaceAll("__OG_TITLE__", ogTitle)
        .replaceAll("__OG_DESCRIPTION__", ogDescription)
        .replaceAll("__OG_IMAGE__", escapeHtmlAttr(image))
        .replaceAll(
          "__OG_IMAGE_ALT__",
          escapeHtmlAttr(`${displayName} profile photo`),
        )
        .replaceAll("__STRUCTURED_DATA__", jsonLd)
        .replaceAll("__VERIFICATION_META__", optionalVerificationMeta(env))
        .replaceAll(
          "__TWITTER_SITE_META__",
          optionalTwitterSiteMeta(twitterHandle),
        );
    },
    writeBundle(options) {
      const outDir = options.dir;
      if (!outDir) return;

      const data = readGithubData();
      const lastmod = isoDateForSitemap(data.profile.updated_at);

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
      fs.writeFileSync(path.join(outDir, "robots.txt"), robots, "utf8");
    },
  };
}
