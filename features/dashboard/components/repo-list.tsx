"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Search01Icon,
  SquareLock01Icon,
  SquareUnlock01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { githubReposInfiniteQuery } from "@/features/github/lib/repos-query";
import type { DashboardRepo } from "../lib/types";
import { statusBadge } from "../lib/status-style";
import SyncRepoButton from "@/features/repo-sync/components/sync-repo-button";

type Filter = "all" | "public" | "private";

export function RepoList() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useInfiniteQuery(githubReposInfiniteQuery);

  const loading = isPending && !data;

  const repos = useMemo(() => {
    if (!data) {
      return [];
    }

    const map = new Map<string, DashboardRepo>();
    for (const page of data.pages) {
      for (const repo of page.repos) {
        if (!map.has(repo.id)) {
          map.set(repo.id, repo);
        }
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
    );
  }, [data]);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const counts = useMemo(() => {
    let publicCount = 0;
    let privateCount = 0;
    for (let i = 0; i < repos.length; i++) {
      if (repos[i].visibility === "public") {
        publicCount++;
      } else if (repos[i].visibility === "private") {
        privateCount++;
      }
    }
    return {
      all: totalCount,
      public: publicCount,
      private: privateCount,
    };
  }, [repos, totalCount]);

  const visibleRepos = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return repos.filter((repo) => {
      if (filter !== "all" && repo.visibility !== filter) {
        return false;
      }

      if (query && !repo.fullName.toLowerCase().includes(query)) {
        return false;
      }

      return true;
    });
  }, [repos, filter, deferredSearch]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  let footer: React.ReactNode = null;

  if (isFetchingNextPage) {
    footer = (
      <span className='inline-flex items-center gap-2'>
        <Spinner className='size-3 text-ml-text-muted' />
        <span>Loading more repositories…</span>
      </span>
    );
  } else if (hasNextPage) {
    footer = (
      <button
        type='button'
        onClick={() => fetchNextPage()}
        className='hover:text-ml-text transition-colors underline-offset-4 hover:underline focus-visible:outline-none'
      >
        Showing {repos.length} of {totalCount} repositories (click to load more)
      </button>
    );
  } else if (repos.length > 0) {
    footer = `All ${repos.length} repositories loaded`;
  }

  let rows: React.ReactNode;

  if (loading) {
    rows = Array.from({ length: 6 }).map((_, i) => (
      <TableRow
        key={i}
        className='border-b border-ml-border hover:bg-transparent'
      >
        <TableCell className='px-4 py-3 min-w-55'>
          <div className='flex flex-col gap-1.5'>
            <Skeleton className='h-4 w-36 rounded-none bg-ml-surface-2' />
            <Skeleton className='h-3 w-48 rounded-none bg-ml-surface-2/60' />
          </div>
        </TableCell>
        <TableCell className='px-4 py-3 w-27.5'>
          <Skeleton className='h-5 w-18 rounded-none bg-ml-surface-2/60' />
        </TableCell>
        <TableCell className='px-4 py-3 w-30'>
          <Skeleton className='h-3.5 w-14 rounded-none bg-ml-surface-2/60' />
        </TableCell>
        <TableCell className='px-4 py-3 w-30'>
          <Skeleton className='h-3.5 w-20 rounded-none bg-ml-surface-2/60' />
        </TableCell>
        <TableCell className='px-4 py-3 text-right w-22.5'>
          <Skeleton className='h-3.5 w-10 ml-auto rounded-none bg-ml-surface-2/60' />
        </TableCell>
        <TableCell className='px-4 py-3 text-right w-35'>
          <Skeleton className='h-3.5 w-22 ml-auto rounded-none bg-ml-surface-2/60' />
        </TableCell>
        <TableCell className='px-4 py-3 text-right w-30'>
          <Skeleton className='h-7 w-16 ml-auto rounded-none bg-ml-surface-2 border border-ml-border' />
        </TableCell>
      </TableRow>
    ));
  } else if (isError) {
    rows = (
      <TableRow className='border-b border-ml-border hover:bg-transparent'>
        <TableCell
          colSpan={7}
          className='h-40 text-center font-manrope text-xs bg-ml-diff-remove-bg/10'
        >
          <div className='flex flex-col items-center justify-center gap-2.5 py-6'>
            <p className='text-ml-diff-remove font-medium'>
              Failed to load repositories. Please check your GitHub connection.
            </p>
            <button
              type='button'
              onClick={() => refetch()}
              className='font-manrope font-semibold text-xs text-ml-text bg-ml-surface border border-ml-border hover:bg-ml-surface-2 px-3 py-1.5 transition-all rounded-none select-none active:translate-y-px shadow-none'
            >
              Retry
            </button>
          </div>
        </TableCell>
      </TableRow>
    );
  } else if (visibleRepos.length === 0) {
    rows = (
      <TableRow className='border-b border-ml-border hover:bg-transparent'>
        <TableCell
          colSpan={7}
          className='h-40 text-center font-manrope text-xs text-ml-text-muted bg-ml-surface/40'
        >
          <div className='flex flex-col items-center justify-center gap-2 py-6'>
            <p className='text-ml-text-muted'>
              {search
                ? `No repositories matching "${search}"`
                : filter !== "all"
                  ? `No ${filter} repositories found.`
                  : "No repositories found."}
            </p>
            {search ? (
              <button
                type='button'
                onClick={() => setSearch("")}
                className='font-manrope text-xs text-ml-accent hover:underline focus-visible:outline-none'
              >
                Clear search filter
              </button>
            ) : null}
          </div>
        </TableCell>
      </TableRow>
    );
  } else {
    rows = visibleRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />);
  }

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-8 w-full max-w-7xl select-none'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as Filter)}
          className='w-full sm:w-auto'
        >
          <TabsList className='h-8 w-full sm:w-fit rounded-none border border-ml-border bg-ml-surface-2 p-0.5 gap-1'>
            <TabsTrigger
              value='all'
              className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted data-active:bg-ml-surface data-active:text-ml-text transition-all'
            >
              All ({counts.all})
            </TabsTrigger>
            <TabsTrigger
              value='public'
              className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted data-active:bg-ml-surface data-active:text-ml-text transition-all'
            >
              Public ({counts.public})
            </TabsTrigger>
            <TabsTrigger
              value='private'
              className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted data-active:bg-ml-surface data-active:text-ml-text transition-all'
            >
              Private ({counts.private})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='relative w-full sm:max-w-xs'>
          <HugeiconsIcon
            icon={Search01Icon}
            className='absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-ml-text-muted pointer-events-none'
          />
          <Input
            placeholder='Search repositories…'
            className='rounded-none border-ml-border bg-ml-surface text-ml-text placeholder:text-ml-text-muted pl-8 pr-7 h-8 font-manrope text-xs focus-visible:ring-1 focus-visible:ring-ml-border-strong w-full shadow-none'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search ? (
            <button
              type='button'
              onClick={() => setSearch("")}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-ml-text-muted hover:text-ml-text transition-colors'
              aria-label='Clear search'
            >
              <HugeiconsIcon icon={Cancel01Icon} className='size-3.5' />
            </button>
          ) : null}
        </div>
      </div>

      <div className='rounded-none border border-ml-border bg-ml-surface overflow-hidden shadow-none'>
        <Table className='min-w-212.5 w-full'>
          <TableHeader className='bg-ml-surface-2 border-b border-ml-border'>
            <TableRow className='border-b border-ml-border hover:bg-transparent'>
              <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 min-w-55'>
                Repository
              </TableHead>
              <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-27.5'>
                Visibility
              </TableHead>
              <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-30'>
                Branch
              </TableHead>
              <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-30'>
                Language
              </TableHead>
              <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-22.5'>
                Stars
              </TableHead>
              <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-35'>
                Updated
              </TableHead>
              <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-30'>
                Codebase
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>

      <div
        ref={loadMoreRef}
        className='py-3 text-center font-manrope text-xs text-ml-text-muted'
      >
        {footer}
      </div>
    </div>
  );
}

const RepoRow = React.memo(function RepoRow({ repo }: { repo: DashboardRepo }) {
  const tone = repo.visibility === "public" ? "info" : "warning";

  const timeAgo = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(repo.updatedAt), {
        addSuffix: true,
      });
    } catch {
      return repo.updatedAt;
    }
  }, [repo.updatedAt]);

  return (
    <TableRow className='border-b border-ml-border hover:bg-ml-surface-2/40 transition-colors'>
      <TableCell className='px-4 py-3 min-w-55'>
        <div className='flex flex-col gap-0.5'>
          <span className='font-syne font-semibold text-[13.5px] text-ml-text leading-tight tracking-[-0.01em]'>
            {repo.name}
          </span>
          <span className='font-ml-mono text-[11px] text-ml-text-muted'>
            {repo.fullName}
          </span>
        </div>
      </TableCell>
      <TableCell className='px-4 py-3 w-27.5'>
        <span className={statusBadge(tone, "gap-1.5")}>
          {repo.visibility === "private" ? (
            <HugeiconsIcon
              icon={SquareLock01Icon}
              className='size-2.5 shrink-0'
            />
          ) : (
            <HugeiconsIcon
              icon={SquareUnlock01Icon}
              className='size-2.5 shrink-0'
            />
          )}
          <span>{repo.visibility}</span>
        </span>
      </TableCell>
      <TableCell className='px-4 py-3 font-ml-mono text-xs text-ml-text-muted w-30'>
        {repo.defaultBranch}
      </TableCell>
      <TableCell className='px-4 py-3 font-manrope text-xs text-ml-text-muted w-30'>
        {repo.language ? (
          <span className='inline-flex items-center gap-1.5'>
            <span className='size-2 rounded-none bg-ml-accent shrink-0' />
            <span>{repo.language}</span>
          </span>
        ) : (
          "—"
        )}
      </TableCell>
      <TableCell className='px-4 py-3 text-right w-22.5'>
        <span className='inline-flex items-center justify-end gap-1 font-ml-mono text-xs text-ml-text-muted'>
          <HugeiconsIcon
            icon={StarIcon}
            className='size-3 text-amber-500 fill-amber-500/20 shrink-0'
          />
          <span>{repo.stars.toLocaleString()}</span>
        </span>
      </TableCell>
      <TableCell className='px-4 py-3 text-right font-manrope text-xs text-ml-text-muted whitespace-nowrap w-35'>
        {timeAgo}
      </TableCell>
      <TableCell className='px-4 py-3 text-right w-30'>
        <SyncRepoButton
          repoFullName={repo.fullName}
          branch={repo.defaultBranch}
          syncStatus={repo.syncStatus ?? null}
        />
      </TableCell>
    </TableRow>
  );
});
