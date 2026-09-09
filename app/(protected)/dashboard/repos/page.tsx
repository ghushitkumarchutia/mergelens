import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { getInstallationStatus } from "@/features/github/server/installation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireAuth } from "@/features/auth/actions";
import { RepoList } from "@/features/dashboard/components/repo-list";
import {
  statusBadge,
  statusButtonClass,
} from "@/features/dashboard/lib/status-style";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Repositories · Dashboard",
};

function ReposNotConnected() {
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
                  organization to view and synchronize repositories.
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
            Repositories are managed through the MergeLens GitHub App. Once
            installed, all public and private repositories granted to the app
            will appear here ready for automated code reviews.
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

export default async function DashboardReposPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  const header = (
    <DashboardHeader
      title='Repositories'
      description='All public and private repositories available to the GitHub App.'
    />
  );

  if (!installation.connected) {
    return (
      <>
        {header}
        <ReposNotConnected />
      </>
    );
  }

  return (
    <>
      {header}
      <RepoList />
    </>
  );
}
