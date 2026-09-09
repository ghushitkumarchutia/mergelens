import type { Metadata } from "next";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  GithubIcon,
  GitPullRequestIcon,
} from "@hugeicons/core-free-icons";
import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { getInstallationStatus } from "@/features/github/server/installation";
import {
  getUserPullRequests,
  type DashboardPullRequest,
} from "@/features/reviews/server/get-pull-requests";
import {
  statusBadge,
  statusButtonClass,
} from "@/features/dashboard/lib/status-style";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pull Requests · Dashboard",
};

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

function getStatusTone(status: string) {
  switch (status) {
    case "reviewed":
      return "success" as const;
    case "processing":
      return "info" as const;
    case "pending":
      return "neutral" as const;
    case "rate_limited":
      return "warning" as const;
    default:
      return "neutral" as const;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "reviewed":
      return "Reviewed";
    case "processing":
      return "Processing";
    case "pending":
      return "Pending";
    case "rate_limited":
      return "Rate Limited";
    default:
      return status;
  }
}

function PrNotConnected() {
  return (
    <div className='flex flex-1 flex-col p-4 sm:p-6 md:p-8 w-full max-w-3xl space-y-6 select-none'>
      <Card className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0 transition-colors'>
        <CardHeader className='border-b border-ml-border p-5 sm:p-6'>
          <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
            <div className='flex items-start gap-3.5'>
              <span className='flex size-10 shrink-0 items-center justify-center rounded-none border border-ml-border bg-ml-surface-2 text-ml-text-muted'>
                <HugeiconsIcon icon={GithubIcon} className='size-5' />
              </span>
              <div>
                <CardTitle className='font-syne text-[17px] sm:text-[19px] font-bold tracking-[-0.01em] text-ml-text'>
                  GitHub App Required
                </CardTitle>
                <CardDescription className='font-manrope text-[12.5px] sm:text-[13px] text-ml-text-muted mt-1 leading-relaxed'>
                  Install the MergeLens reviewer app on your GitHub account or
                  organization to view and manage automated PR code reviews.
                </CardDescription>
              </div>
            </div>
            <div className='shrink-0 self-start'>
              <span className={statusBadge("neutral")}>Not connected</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-5 sm:p-6 space-y-3 font-manrope'>
          <p className='text-xs leading-relaxed text-ml-text-muted'>
            Pull requests are automatically tracked through GitHub webhooks.
            Once the MergeLens app is connected, all incoming PRs across your
            synced repositories will appear here with AI-generated review summaries.
          </p>
        </CardContent>

        <CardFooter
          className='border-t border-ml-border px-5 pb-4 sm:px-6 sm:pb-5 flex flex-col items-center gap-3 bg-ml-bg/40'
          style={{ paddingTop: "24px" }}
        >
          <Button
            nativeButton={false}
            render={<Link href={DASHBOARD_ROUTES.github} />}
            className={cn(
              statusButtonClass.success,
              "w-full h-10 px-4 text-[13px] tracking-tight flex items-center justify-center gap-2",
            )}
          >
            <HugeiconsIcon icon={GithubIcon} className='size-3.5 shrink-0' />
            <span>Configure GitHub App</span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={1.65}
              className='size-4 opacity-70 -ml-1.5'
            />
          </Button>
          <p className='text-center font-manrope text-[11.5px] text-ml-text-muted'>
            You can grant access to select repositories or all repositories.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function EmptyState() {
  return (
    <TableRow className='hover:bg-transparent'>
      <TableCell colSpan={6} className='py-12 text-center'>
        <div className='flex flex-col items-center justify-center gap-2.5'>
          <div className='flex size-10 items-center justify-center rounded-none border border-ml-border bg-ml-surface-2 text-ml-text-muted'>
            <HugeiconsIcon icon={GitPullRequestIcon} className='size-5' />
          </div>
          <p className='font-syne text-sm font-semibold text-ml-text'>
            No pull requests found
          </p>
          <p className='max-w-sm font-manrope text-xs text-ml-text-muted'>
            Open a pull request on any connected repository to trigger an automated
            AI code review.
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}

function PrRow({ pr }: { pr: DashboardPullRequest }) {
  const tone = getStatusTone(pr.status);
  const githubPrUrl = `https://github.com/${pr.repoFullName}/pull/${pr.prNumber}`;

  return (
    <TableRow className='border-b border-ml-border hover:bg-ml-surface-2/40 transition-colors group'>
      <TableCell className='px-4 py-3 min-w-44 sm:min-w-52'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex flex-col gap-0.5 min-w-0'>
            <div className='flex items-center gap-1.5'>
              <span className='font-ml-mono font-semibold text-xs text-ml-text'>
                #{pr.prNumber}
              </span>
              <a
                href={githubPrUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='opacity-0 group-hover:opacity-100 transition-opacity text-ml-text-muted hover:text-ml-text p-0.5'
                title='Open on GitHub'
              >
                <HugeiconsIcon icon={ArrowUpRight01Icon} className='size-3' />
              </a>
            </div>
            <span
              className='font-manrope text-[12px] text-ml-text-muted truncate block'
              title={pr.repoFullName}
            >
              {pr.repoFullName}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className='px-4 py-3 min-w-60 max-w-sm'>
        <a
          href={githubPrUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='font-manrope text-xs font-medium text-ml-text hover:text-ml-accent transition-colors line-clamp-2 leading-snug block'
          title={pr.title}
        >
          {pr.title}
        </a>
      </TableCell>
      <TableCell className='px-4 py-3 w-32'>
        <span className='font-manrope text-xs text-ml-text-muted truncate block' title={pr.authorLogin ?? undefined}>
          {pr.authorLogin ? `@${pr.authorLogin}` : "—"}
        </span>
      </TableCell>
      <TableCell className='px-4 py-3 w-32'>
        <span className={statusBadge(tone)}>{getStatusLabel(pr.status)}</span>
      </TableCell>
      <TableCell className='px-4 py-3 text-right w-32 font-manrope text-xs text-ml-text-muted whitespace-nowrap'>
        {pr.reviewedAt
          ? formatDistanceToNow(new Date(pr.reviewedAt), { addSuffix: true })
          : "—"}
      </TableCell>
      <TableCell className='px-4 py-3 text-right w-32 font-manrope text-xs text-ml-text-muted whitespace-nowrap'>
        {formatDistanceToNow(new Date(pr.createdAt), { addSuffix: true })}
      </TableCell>
    </TableRow>
  );
}

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Rate Limited", value: "rate_limited" },
] as const;

export default async function PullRequestsPage({ searchParams }: PageProps) {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);
  const { status: statusFilter } = await searchParams;

  const activeFilter = statusFilter ?? "all";

  const header = (
    <DashboardHeader
      title='Pull Requests'
      description='All pull requests reviewed by the AI reviewer.'
    />
  );

  if (!installation.connected) {
    return (
      <>
        {header}
        <PrNotConnected />
      </>
    );
  }

  const pullRequests = await getUserPullRequests(session.user.id, activeFilter);

  return (
    <>
      {header}
      <div className='flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-8 w-full max-w-7xl select-none'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='h-8 w-full sm:w-fit rounded-none border border-ml-border bg-ml-surface-2 p-0.5 flex gap-1 items-center overflow-x-auto'>
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <Link
                  key={filter.value}
                  href={`${DASHBOARD_ROUTES.pullRequest}${
                    filter.value === "all" ? "" : `?status=${filter.value}`
                  }`}
                  className={cn(
                    "flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs flex items-center justify-center transition-all whitespace-nowrap select-none",
                    isActive
                      ? "bg-ml-surface text-ml-text shadow-xs border border-ml-border"
                      : "text-ml-text-muted hover:text-ml-text hover:bg-ml-surface/40",
                  )}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className='rounded-none border border-ml-border bg-ml-surface overflow-x-auto shadow-none'>
          <Table className='min-w-232 w-full'>
            <TableHeader className='bg-ml-surface-2 border-b border-ml-border'>
              <TableRow className='border-b border-ml-border hover:bg-transparent'>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 min-w-44 sm:min-w-52'>
                  Pull Request
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 min-w-60 max-w-sm'>
                  Title
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-32'>
                  Author
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-32'>
                  Status
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-32'>
                  Reviewed
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-32'>
                  Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pullRequests.length === 0 ? (
                <EmptyState />
              ) : (
                pullRequests.map((pr) => <PrRow key={pr.id} pr={pr} />)
              )}
            </TableBody>
          </Table>
        </div>

        <div className='flex items-center justify-between text-xs text-ml-text-muted font-manrope pt-1'>
          <p>
            Showing <span className='font-semibold text-ml-text'>{pullRequests.length}</span> pull request
            {pullRequests.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </>
  );
}

