export interface GitHubProfile {
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
}
