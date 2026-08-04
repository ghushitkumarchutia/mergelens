import type { Metadata } from "next";
import Link from "next/link";
import {
  GitBranch,
  GitPullRequest,
  ChartBar,
  Crown,
  GithubLogo,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

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
  title: "Dashboard",
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
      <div className='flex flex-1 flex-col gap-6 p-6'>
        <div>
          <h2 className='text-xl font-semibold tracking-tight'>
            Welcome back, {firstName} 👋
          </h2>
          <p className='text-sm text-muted-foreground'>
            Here&apos;s a summary of your AI code review activity.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            icon={<GitBranch className='size-5 text-blue-500' />}
            title='Repos Synced'
            value={overview.reposSynced}
          />
          <StatCard
            icon={<GitPullRequest className='size-5 text-purple-500' />}
            title='PRs Reviewed'
            value={overview.totalPrsReviewed}
          />
          <StatCard
            icon={<ChartBar className='size-5 text-amber-500' />}
            title='This Month'
            value={overview.reviewsThisMonth}
          />
          <StatCard
            icon={<Crown className='size-5 text-green-500' />}
            title='Current Plan'
            value={overview.plan}
          />
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-sm'>
                <GithubLogo className='size-4' />
                GitHub App
              </CardTitle>
              <CardDescription>
                {overview.githubConnected
                  ? `Connected as @${overview.githubAccount}`
                  : "Install the GitHub App to get started."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span
                className={statusBadge(
                  overview.githubConnected ? "success" : "neutral",
                )}
              >
                {overview.githubConnected ? "Connected" : "Not connected"}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-sm'>
                <GitBranch className='size-4' />
                Repositories
              </CardTitle>
              <CardDescription>
                Manage your repositories and sync codebases for contextual
                reviews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size='sm'
                variant='outline'
                nativeButton={false}
                render={<Link href={DASHBOARD_ROUTES.repos} />}
              >
                View Repositories
                <ArrowRight className='size-3' />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-sm'>
                <GitPullRequest className='size-4' />
                Pull Requests
              </CardTitle>
              <CardDescription>
                Track all PRs reviewed by the AI across your connected
                repositories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size='sm'
                variant='outline'
                nativeButton={false}
                render={<Link href={DASHBOARD_ROUTES.pullRequest} />}
              >
                View Pull Requests
                <ArrowRight className='size-3' />
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
    <Card>
      <CardContent className='flex items-center gap-4 pt-6'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-none border border-border bg-muted'>
          {icon}
        </div>
        <div>
          <p className='text-xs text-muted-foreground'>{title}</p>
          <p className='text-2xl font-semibold tracking-tight'>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
