import githubData from "@/data/github.json";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import type { GitHubData } from "@/types/github";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

const data = githubData as GitHubData;

const INITIAL_VISIBLE = 9;

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const cardReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function Projects() {
  const { repos } = data;
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const item = shouldReduceMotion ? cardReduced : cardVariants;

  const visibleRepos = useMemo(() => {
    if (showAll) return repos;
    return repos.slice(0, INITIAL_VISIBLE);
  }, [repos, showAll]);

  const hasMore = repos.length > INITIAL_VISIBLE;

  return (
    <ScrollReveal
      id="projects"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <h2 className="section-heading">Projects</h2>
      <p className="text-ink-muted text-lg max-w-2xl mb-10 leading-relaxed">
        A snapshot of what ships publicly on GitHub — pinned work first, then
        the rest ranked by stars and recency.
      </p>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.12, once: true }}
      >
        {visibleRepos.map((repo) => (
          <motion.div key={repo.name} variants={item} className="h-full">
            <ProjectCard repo={repo} className="h-full" />
          </motion.div>
        ))}
      </motion.div>

      {hasMore ? (
        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className={cn(
              "rounded-full border border-surface-border px-6 py-2.5 text-sm font-semibold",
              "text-ink hover:border-brand-light/60 hover:text-brand-light transition-colors",
              "bg-surface-card/60",
            )}
          >
            {showAll ? "Show less" : "Load more"}
          </button>
        </div>
      ) : null}
    </ScrollReveal>
  );
}
