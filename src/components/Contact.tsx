import { resume } from "@/data/resume";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { track } from "@vercel/analytics";
import {
  Download,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

const envEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;
const primaryEmail = envEmail?.trim() || resume.email;
const mailtoHref = `mailto:${primaryEmail}`;

export function Contact() {
  const telHref = resume.phone.replace(/\s/g, "");

  return (
    <ScrollReveal className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center w-full">
      <div className="flex justify-center w-full">
        <h2 className="section-heading">Contact</h2>
      </div>
      <p className="text-ink-muted text-lg leading-relaxed mb-10">
        Prefer email, a quick call, or want the full résumé? Reach out through any
        channel below — I&apos;m based in {resume.location}.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-5 py-2.5 text-sm font-medium text-ink hover:border-brand-light/50 hover:text-brand-light transition-colors"
        >
          <Mail className="size-4" aria-hidden />
          {primaryEmail}
        </a>
        <a
          href={`tel:${telHref}`}
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-5 py-2.5 text-sm font-medium text-ink hover:border-brand-light/50 hover:text-brand-light transition-colors"
        >
          <Phone className="size-4" aria-hidden />
          {resume.phone}
        </a>
        <a
          href={resume.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-5 py-2.5 text-sm font-medium text-ink hover:border-brand-light/50 hover:text-brand-light transition-colors"
        >
          <Linkedin className="size-4" aria-hidden />
          LinkedIn
        </a>
        <a
          href={resume.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-5 py-2.5 text-sm font-medium text-ink hover:border-brand-light/50 hover:text-brand-light transition-colors"
        >
          <Instagram className="size-4" aria-hidden />
          Instagram
        </a>
        <a
          href="https://github.com/GZMaster"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-5 py-2.5 text-sm font-medium text-ink hover:border-brand-light/50 hover:text-brand-light transition-colors"
        >
          <Github className="size-4" aria-hidden />
          GitHub
        </a>
        <a
          href="https://www.retrodevs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-5 py-2.5 text-sm font-medium text-ink hover:border-brand-light/50 hover:text-brand-light transition-colors"
        >
          <Globe className="size-4" aria-hidden />
          RetroDevs
        </a>
        <a
          href={resume.publicResumePath}
          download={resume.downloadFileName}
          onClick={() => {
            track("resume_download", { location: "contact" });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 text-sm font-semibold text-brand-light hover:bg-brand/20 transition-colors"
        >
          <Download className="size-4 shrink-0" aria-hidden />
          Download résumé (PDF)
        </a>
      </div>
      <p className="mt-12 text-xl font-medium text-ink tracking-tight">
        Let&apos;s build something great together.
      </p>
    </ScrollReveal>
  );
}
