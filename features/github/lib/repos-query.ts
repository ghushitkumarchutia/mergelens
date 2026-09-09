import type { DashboardRepo } from "@/features/dashboard/lib/types";
import { infiniteQueryOptions } from "@tanstack/react-query";

export type GithubReposPage = {
  repos: DashboardRepo[];
  totalCount: number;
  page: number;
  hasMore: boolean;
};

export const githubRepoKeys = {
  all: ["github", "repos"] as const,
  lists: () => [...githubRepoKeys.all, "list"] as const,
};

const REPOS_STALE_TIME = 10 * 60 * 1000;
const REPOS_GC_TIME = 15 * 60 * 1000;

export const githubReposInfiniteQuery = infiniteQueryOptions({
  queryKey: githubRepoKeys.lists(),
  queryFn: async ({ pageParam, signal }) => {
    const response = await fetch(`/api/github/repos?page=${pageParam}`, {
      signal,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.error || "Failed to load repositories");
    }

    return (await response.json()) as GithubReposPage;
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    return lastPage.hasMore ? lastPage.page + 1 : undefined;
  },
  staleTime: REPOS_STALE_TIME,
  gcTime: REPOS_GC_TIME,
});
