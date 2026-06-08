import { resume } from "@/data/resume";
import { Download } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <p>
          © {year} {resume.fullName}. Crafted for clarity.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={resume.linkedinUrl}
            className="hover:text-brand-light transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={resume.instagramUrl}
            className="hover:text-brand-light transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
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
          <a
            href={resume.publicResumePath}
            download={resume.downloadFileName}
            className="inline-flex items-center gap-1.5 hover:text-brand-light transition-colors"
          >
            <Download className="size-3.5" aria-hidden />
            Résumé
          </a>
          <span className="text-ink-muted/60">
            Built with Vite, React &amp; love.
          </span>
        </div>
      </div>
    </footer>
  );
}
