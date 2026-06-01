import githubData from "@/data/github.json";
import type { GitHubData } from "@/types/github";

const data = githubData as GitHubData;

export function Footer() {
  const year = new Date().getFullYear();
  const name = data.profile.name?.trim() || "GZMaster";

  return (
    <footer className="border-t border-surface-border py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <p>
          © {year} {name}. Crafted for clarity.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/GZMaster"
            className="hover:text-brand-light transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.retrodevs.com"
            className="hover:text-brand-light transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            RetroDevs
          </a>
          <span className="text-ink-muted/60">
            Built with Vite, React &amp; love.
          </span>
        </div>
      </div>
    </footer>
  );
}
