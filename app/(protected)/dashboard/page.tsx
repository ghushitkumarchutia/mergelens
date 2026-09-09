import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GitBranchIcon,
  GitPullRequestIcon,
  Analytics01Icon,
  CrownIcon,
  GithubIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import { requireAuth } from "@/features/auth/actions";
import { getDashboardOverview } from "@/features/dashboard/server/get-overview";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { statusBadge } from "@/features/dashboard/lib/status-style";

export const metadata: Metadata = {
  title: "Overview · Dashboard",
};

export default async function DashboardOverviewPage() {
  const session = await requireAuth();
  const overview = await getDashboardOverview(session.user.id);

  const firstName = session.user.name?.split(" ")[0] ?? "there";

  return (
    <>
      <DashboardHeader
        title='Overview'
        description='Your AI code review dashboard at a glance.'
      />
      <div className='flex flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8 w-full max-w-7xl select-none'>
        <div>
          <h2 className='font-syne text-xl sm:text-2xl font-bold tracking-tight text-ml-text'>
            Welcome back, {firstName}
          </h2>
          <p className='font-manrope text-xs sm:text-sm text-ml-text-muted mt-1'>
            Here&apos;s a summary of your automated pull request reviews and
            repository activity.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            icon={
              <HugeiconsIcon
                icon={GitBranchIcon}
                className='size-6 text-ml-text'
                strokeWidth={1.8}
              />
            }
            title='Repos Synced'
            value={overview.reposSynced}
          />
          <StatCard
            icon={
              <HugeiconsIcon
                icon={GitPullRequestIcon}
                className='size-6 text-ml-text'
                strokeWidth={1.8}
              />
            }
            title='PRs Reviewed'
            value={overview.totalPrsReviewed}
          />
          <StatCard
            icon={
              <HugeiconsIcon
                icon={Analytics01Icon}
                className='size-6 text-ml-text'
                strokeWidth={1.8}
              />
            }
            title='This Month'
            value={overview.reviewsThisMonth}
          />
          <StatCard
            icon={
              <HugeiconsIcon
                icon={CrownIcon}
                className='size-6 text-ml-text'
                strokeWidth={1.8}
              />
            }
            title='Current Plan'
            value={overview.plan}
          />
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Card className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0 transition-colors flex flex-col justify-between'>
            <CardHeader className='p-5 border-b border-ml-border'>
              <div className='flex items-center justify-between gap-2'>
                <CardTitle className='flex items-center gap-2 font-syne text-sm font-semibold text-ml-text'>
                  <HugeiconsIcon
                    icon={GithubIcon}
                    className='size-4 text-ml-text-muted'
                  />
                  GitHub App
                </CardTitle>
                <span
                  className={statusBadge(
                    overview.githubConnected ? "success" : "neutral",
                  )}
                >
                  {overview.githubConnected ? "Connected" : "Not connected"}
                </span>
              </div>
              <CardDescription className='font-manrope text-xs text-ml-text-muted leading-relaxed mt-2'>
                {overview.githubConnected
                  ? `Connected as @${overview.githubAccount}. Active for automated code reviews.`
                  : "Install the GitHub App to connect repositories and enable automated PR reviews."}
              </CardDescription>
            </CardHeader>
            <CardContent className='p-5 pt-4'>
              <Button
                size='sm'
                variant='outline'
                nativeButton={false}
                render={<Link href={DASHBOARD_ROUTES.github} />}
                className='group/btn rounded-none border border-ml-border hover:border-ml-border-strong bg-ml-surface-2 hover:bg-ml-surface text-ml-text font-manrope font-semibold text-xs h-8 px-3 flex items-center gap-1.5 transition-all duration-150 active:translate-y-px cursor-pointer select-none'
              >
                <span>
                  {overview.githubConnected
                    ? "Manage GitHub App"
                    : "Configure GitHub App"}
                </span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className='size-3.5 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-150'
                />
              </Button>
            </CardContent>
          </Card>

          <Card className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0 transition-colors flex flex-col justify-between'>
            <CardHeader className='p-5 border-b border-ml-border'>
              <div className='flex items-center justify-between gap-2'>
                <CardTitle className='flex items-center gap-2 font-syne text-sm font-semibold text-ml-text'>
                  <HugeiconsIcon
                    icon={GitBranchIcon}
                    className='size-4 text-ml-text-muted'
                  />
                  Repositories
                </CardTitle>
                <span className='font-ml-mono text-xs text-ml-text-muted'>
                  {overview.reposSynced} synced
                </span>
              </div>
              <CardDescription className='font-manrope text-xs text-ml-text-muted leading-relaxed mt-2'>
                Manage your repositories and synchronize codebase embeddings for
                architecture-aware reviews.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-5 pt-4'>
              <Button
                size='sm'
                variant='outline'
                nativeButton={false}
                render={<Link href={DASHBOARD_ROUTES.repos} />}
                className='group/btn rounded-none border border-ml-border hover:border-ml-border-strong bg-ml-surface-2 hover:bg-ml-surface text-ml-text font-manrope font-semibold text-xs h-8 px-3 flex items-center gap-1.5 transition-all duration-150 active:translate-y-px cursor-pointer select-none'
              >
                <span>View Repositories</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className='size-3.5 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-150'
                />
              </Button>
            </CardContent>
          </Card>

          <Card className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0 transition-colors flex flex-col justify-between'>
            <CardHeader className='p-5 border-b border-ml-border'>
              <div className='flex items-center justify-between gap-2'>
                <CardTitle className='flex items-center gap-2 font-syne text-sm font-semibold text-ml-text'>
                  <HugeiconsIcon
                    icon={GitPullRequestIcon}
                    className='size-4 text-ml-text-muted'
                  />
                  Pull Requests
                </CardTitle>
                <span className='font-ml-mono text-xs text-ml-text-muted'>
                  {overview.totalPrsReviewed} total
                </span>
              </div>
              <CardDescription className='font-manrope text-xs text-ml-text-muted leading-relaxed mt-2'>
                Track all pull requests reviewed by the AI reviewer across your
                connected repositories.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-5 pt-4'>
              <Button
                size='sm'
                variant='outline'
                nativeButton={false}
                render={<Link href={DASHBOARD_ROUTES.pullRequest} />}
                className='group/btn rounded-none border border-ml-border hover:border-ml-border-strong bg-ml-surface-2 hover:bg-ml-surface text-ml-text font-manrope font-semibold text-xs h-8 px-3 flex items-center gap-1.5 transition-all duration-150 active:translate-y-px cursor-pointer select-none'
              >
                <span>View Pull Requests</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className='size-3.5 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-150'
                />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <Card className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0 transition-colors p-4 sm:p-5 py-4 sm:py-5'>
      <CardContent className='p-0 flex items-center gap-4'>
        <div className='flex size-13 shrink-0 items-center justify-center rounded-none border border-ml-border bg-ml-surface-2 text-ml-text'>
          {icon}
        </div>
        <div className='min-w-0 flex-1 h-13 flex flex-col justify-between py-0.5'>
          <p className='font-manrope text-[11px] sm:text-[11.5px] uppercase tracking-wider text-ml-text-muted font-semibold leading-none truncate'>
            {title}
          </p>
          <p className='font-syne text-2xl sm:text-[26px] font-bold tracking-tight text-ml-text leading-none truncate'>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
