import type { GithubRepositoryOptions } from ".";

export interface GithubContributorsQuery extends GithubRepositoryOptions {
  source?: string;
  max?: string | number;
}

export interface GithubRawContributor {
  avatar_url: string;
  login: string;
  name: string;
}
