import type { Metadata } from "next";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { getInstallationStatus } from "@/features/github/server/installation";
import {
  getUserPullRequests,
  type DashboardPullRequest,
} from "@/features/reviews/server/get-pull-requests";
import { statusBadge } from "@/features/dashboard/lib/status-style";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Pull Requests",
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
    <div className='flex flex-1 flex-col items-center justify-center gap-4 p-6'>
      <p className='text-sm text-muted-foreground'>
        Install the GitHub App first to see pull requests.
      </p>
      <Button
        nativeButton={false}
        render={<Link href={DASHBOARD_ROUTES.github} />}
      >
        Go to GitHub App
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={6} className='text-center text-muted-foreground'>
        No pull requests found. Open a PR on a connected repo to get started.
      </TableCell>
    </TableRow>
  );
}

function PrRow({ pr }: { pr: DashboardPullRequest }) {
  const tone = getStatusTone(pr.status);

  return (
    <TableRow>
      <TableCell>
        <div className='flex flex-col'>
          <span className='font-medium'>#{pr.prNumber}</span>
          <span className='text-xs text-muted-foreground'>
            {pr.repoFullName}
          </span>
        </div>
      </TableCell>
      <TableCell className='max-w-xs truncate'>{pr.title}</TableCell>
      <TableCell className='text-muted-foreground'>
        {pr.authorLogin ?? "—"}
      </TableCell>
      <TableCell>
        <span className={statusBadge(tone)}>{getStatusLabel(pr.status)}</span>
      </TableCell>
      <TableCell className='text-right text-muted-foreground'>
        {pr.reviewedAt
          ? formatDistanceToNow(new Date(pr.reviewedAt), { addSuffix: true })
          : "—"}
      </TableCell>
      <TableCell className='text-right text-muted-foreground'>
        {formatDistanceToNow(new Date(pr.createdAt), { addSuffix: true })}
      </TableCell>
    </TableRow>
  );
}

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
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
      <div className='flex flex-1 flex-col gap-4 p-6'>
        <div className='flex flex-wrap gap-2'>
          {FILTERS.map((filter) => (
            <Button
              key={filter.value}
              size='sm'
              variant={activeFilter === filter.value ? "default" : "outline"}
              nativeButton={false}
              render={
                <Link
                  href={`${DASHBOARD_ROUTES.pullRequest}?status=${filter.value}`}
                />
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className='rounded-none border border-border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PR</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Reviewed</TableHead>
                <TableHead className='text-right'>Created</TableHead>
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

        <p className='text-xs text-muted-foreground'>
          Showing {pullRequests.length} pull request
          {pullRequests.length !== 1 ? "s" : ""}
        </p>
      </div>
    </>
  );
}
