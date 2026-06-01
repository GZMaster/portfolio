/**
 * Fetches public GitHub profile + repos at build time so the site ships with
 * real data and avoids rate limits in the browser.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src", "data", "github.json");

const USER = "GZMaster";
const BASE = "https://api.github.com";

/** Display order for manually pinned highlights (subset may be missing from API). */
const PINNED_REPO_NAMES = [
  "cpe_election_server",
  "cpe_voting_site",
  "doak-backend",
  "doak-frontend",
  "AI_Chatbot_PCB_Detection",
] as const;

interface GitHubUserResponse {
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

interface GitHubRepoResponse {
  name: string;
  fork: boolean;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

interface SavedProfile {
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

interface SavedRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

interface GitHubDataFile {
  profile: SavedProfile;
  repos: SavedRepo[];
}

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status} for ${url}: ${text}`);
  }
  return res.json() as Promise<T>;
}

async function fetchAllRepos(): Promise<GitHubRepoResponse[]> {
  const perPage = 100;
  const all: GitHubRepoResponse[] = [];
  let page = 1;

  for (;;) {
    const url = `${BASE}/users/${USER}/repos?per_page=${perPage}&sort=updated&type=owner&page=${page}`;
    const batch = await fetchJson<GitHubRepoResponse[]>(url);
    if (batch.length === 0) break;
    all.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }

  return all;
}

function mapRepo(r: GitHubRepoResponse): SavedRepo {
  return {
    name: r.name,
    description: r.description,
    html_url: r.html_url,
    language: r.language,
    stargazers_count: r.stargazers_count,
    topics: r.topics ?? [],
    updated_at: r.updated_at,
  };
}

function sortRepos(repos: SavedRepo[]): SavedRepo[] {
  const pinnedSet = new Set<string>(PINNED_REPO_NAMES);
  const pinned: SavedRepo[] = [];
  const rest: SavedRepo[] = [];

  const byName = new Map(repos.map((r) => [r.name, r]));
  for (const name of PINNED_REPO_NAMES) {
    const r = byName.get(name);
    if (r) pinned.push(r);
  }

  for (const r of repos) {
    if (!pinnedSet.has(r.name)) rest.push(r);
  }

  rest.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return [...pinned, ...rest];
}

async function main(): Promise<void> {
  const [user, rawRepos] = await Promise.all([
    fetchJson<GitHubUserResponse>(`${BASE}/users/${USER}`),
    fetchAllRepos(),
  ]);

  const nonForks = rawRepos.filter((r) => !r.fork).map(mapRepo);
  const repos = sortRepos(nonForks);

  const payload: GitHubDataFile = {
    profile: {
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      updated_at: user.updated_at,
    },
    repos,
  };

  writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${repos.length} repos to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
