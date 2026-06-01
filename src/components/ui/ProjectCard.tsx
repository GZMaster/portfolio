import {
  cn,
  formatRelativeUpdated,
  formatRepoName,
  getLanguageBadgeClass,
} from "@/lib/utils";
import type { GitHubRepo } from "@/types/github";
import { ExternalLink, Star } from "lucide-react";

interface ProjectCardProps {
  repo: GitHubRepo;
  className?: string;
}

export function ProjectCard(props: ProjectCardProps) {
  const { repo, className } = props;
  const title = formatRepoName(repo.name);
  const description =
    repo.description?.trim() || "No description yet.";
  const langClass = getLanguageBadgeClass(repo.language);

  return (
    <article
      className={cn(
        "card-portfolio flex flex-col h-full p-6 gap-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-ink leading-snug pr-2">
          {title}
        </h3>
        {repo.language ? (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full border shrink-0",
              langClass,
            )}
          >
            {repo.language}
          </span>
        ) : null}
      </div>
      <p className="text-sm text-ink-muted leading-relaxed flex-grow line-clamp-3">
        {description}
      </p>
      <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5 text-brand-light shrink-0" aria-hidden />
          {repo.stargazers_count}
        </span>
        <span className="text-ink-muted/80">
          Updated {formatRelativeUpdated(repo.updated_at)}
        </span>
      </div>
      {repo.topics.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 5).map((topic) => (
            <li
              key={topic}
              className="rounded-md border border-surface-border bg-surface-card px-2 py-0.5 text-[11px] text-ink-muted"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-brand-light",
          "hover:text-ink transition-colors mt-auto",
        )}
      >
        View on GitHub
        <ExternalLink className="size-4" aria-hidden />
      </a>
    </article>
  );
}
