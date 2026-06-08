import githubData from "@/data/github.json";
import { resume } from "@/data/resume";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatCard } from "@/components/ui/StatCard";
import { formatRelativeUpdated, getLatestRepoActivityIso } from "@/lib/utils";
import type { GitHubData } from "@/types/github";
import { Mail, MapPin } from "lucide-react";

const data = githubData as GitHubData;

export function About() {
  const { profile, repos } = data;
  const latestIso = getLatestRepoActivityIso(profile.updated_at, repos);
  const repoFloor = Math.max(profile.public_repos, 138);

  return (
    <ScrollReveal className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="section-heading">About</h2>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <div className="space-y-6 text-lg text-ink-muted leading-relaxed">
          <p className="text-ink text-xl font-medium tracking-tight">
            I&apos;m {resume.fullName} — {resume.headline}
          </p>
          <p>{resume.summary}</p>
          <p>
            As founder of{" "}
            <a
              href="https://www.retrodevs.com"
              className="text-brand-light hover:text-ink underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              RetroDevs
            </a>
            , I led client deliveries across e-commerce, healthcare, and logistics
            before my current full-stack role at Golive. My public GitHub (
            <span className="font-mono text-ink-muted/90">{resume.handle}</span>
            ) is where voting systems, product experiments, and AI tooling live in
            the open.
          </p>
          <p>
            Whether it is multi-tenant SaaS, mobile parity with React Native, or
            applied AI prototypes, I care about systems that stay understandable as
            they grow.
          </p>
          <div className="flex flex-col gap-2 text-sm text-ink-muted pt-2 border-t border-surface-border/80">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-brand-light shrink-0" aria-hidden />
              {resume.location}
            </span>
            <a
              href={`mailto:${resume.email}`}
              className="inline-flex items-center gap-2 hover:text-brand-light transition-colors w-fit"
            >
              <Mail className="size-4 text-brand-light shrink-0" aria-hidden />
              {resume.email}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            label="Repositories"
            numericValue={repoFloor}
            suffix="+"
          />
          <StatCard label="Pinned projects" numericValue={5} suffix="+" />
          <StatCard label="Role" textValue="Founder @ RetroDevs" />
          <StatCard
            label="Active on GitHub"
            textValue={formatRelativeUpdated(latestIso)}
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
