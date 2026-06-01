import githubData from "@/data/github.json";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatCard } from "@/components/ui/StatCard";
import { formatRelativeUpdated, getLatestRepoActivityIso } from "@/lib/utils";
import type { GitHubData } from "@/types/github";

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
            I build products end-to-end — from APIs and dashboards to ML
            prototypes and hardware-adjacent tooling.
          </p>
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
            , I ship pragmatic software for clients who care about reliability,
            clarity, and speed. My public GitHub is a playground of voting
            systems, full-stack apps, and applied AI experiments.
          </p>
          <p>
            Whether it is election infrastructure, product UI, or a PCB-aware
            chatbot pipeline, I gravitate toward problems that sit at the
            intersection of software, data, and the physical world.
          </p>
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
