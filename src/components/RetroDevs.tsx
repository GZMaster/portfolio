import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function RetroDevs() {
  return (
    <ScrollReveal className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto rounded-3xl border border-brand/35 bg-gradient-to-br from-brand/25 via-surface-card to-surface p-8 md:p-14 shadow-[0_0_80px_-30px_var(--brand)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-light">
              <Sparkles className="size-4" aria-hidden />
              RetroDevs
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Work With Me
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed">
              RetroDevs is my freelance studio for full-stack web development,
              AI integration, and pragmatic mobile experiences. Engagements are
              structured for clear milestones, direct communication, and code
              you can own long-term.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-ink-muted">
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                Product engineering — APIs, dashboards, and performance-minded
                frontends.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                Applied AI — chatbots, vision workflows, and glue code between
                models and production.
              </li>
            </ul>
          </div>

          <a
            href="https://www.retrodevs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-brand-light/40 bg-brand/30 p-6 min-h-[220px] w-full lg:max-w-sm shrink-0 hover:bg-brand/40 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-brand-light/90">
                Start a project
              </p>
              <p className="mt-3 text-xl font-semibold text-ink">
                Tell me about your roadmap
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink">
              Visit retrodevs.com
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
