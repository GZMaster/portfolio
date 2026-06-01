import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Github, Globe, Mail } from "lucide-react";

const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

export function Contact() {
  const emailHref = contactEmail
    ? `mailto:${contactEmail}`
    : "https://www.retrodevs.com";

  return (
    <ScrollReveal className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center w-full">
      <div className="flex justify-center w-full">
        <h2 className="section-heading">Contact</h2>
      </div>
      <p className="text-ink-muted text-lg leading-relaxed mb-10">
        Prefer email, want to browse code first, or need a studio partner?
        Reach out through any channel below.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
        <a
          href={emailHref}
          target={contactEmail ? undefined : "_blank"}
          rel={contactEmail ? undefined : "noopener noreferrer"}
          className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-5 py-2.5 text-sm font-medium text-ink hover:border-brand-light/50 hover:text-brand-light transition-colors"
        >
          <Mail className="size-4" aria-hidden />
          {contactEmail ? contactEmail : "Contact via RetroDevs"}
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
      </div>
      <p className="mt-12 text-xl font-medium text-ink tracking-tight">
        Let&apos;s build something great together.
      </p>
    </ScrollReveal>
  );
}
