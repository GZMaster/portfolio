import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";
import type { GitHubRepo } from "@/types/github";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Human-readable title from repo slug (e.g. cpe_election_server → CPE Election Server). */
export function formatRepoName(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function formatRelativeUpdated(isoDate: string): string {
  return formatDistanceToNowStrict(new Date(isoDate), { addSuffix: true });
}

/** Tailwind classes for language pill backgrounds (approximate GitHub hues). */
export function getLanguageBadgeClass(language: string | null): string {
  if (!language) return "bg-zinc-600/30 text-zinc-300";
  const key = language.toLowerCase();
  if (key === "javascript" || key === "js")
    return "bg-amber-400/20 text-amber-200 border-amber-400/30";
  if (key === "typescript" || key === "ts")
    return "bg-blue-500/20 text-blue-200 border-blue-400/30";
  if (key === "python") return "bg-emerald-500/20 text-emerald-200 border-emerald-400/30";
  if (key === "scss" || key === "sass")
    return "bg-pink-500/20 text-pink-200 border-pink-400/30";
  if (key === "jupyter notebook")
    return "bg-orange-500/20 text-orange-200 border-orange-400/30";
  return "bg-[var(--bg-border)] text-[var(--text-muted)] border-[var(--bg-border)]";
}

export const PINNED_REPO_NAMES: readonly string[] = [
  "cpe_election_server",
  "cpe_voting_site",
  "doak-backend",
  "doak-frontend",
  "AI_Chatbot_PCB_Detection",
];

export function isPinnedRepo(name: string): boolean {
  return PINNED_REPO_NAMES.includes(name);
}

/** Latest activity across profile and all repo push times. */
export function getLatestRepoActivityIso(
  profileUpdatedAt: string,
  repos: GitHubRepo[],
): string {
  let latest = new Date(profileUpdatedAt).getTime();
  for (const r of repos) {
    const t = new Date(r.updated_at).getTime();
    if (t > latest) latest = t;
  }
  return new Date(latest).toISOString();
}
