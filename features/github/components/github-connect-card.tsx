"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Unlink01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { useFormStatus } from "react-dom";

import type { GithubInstallationStatus } from "@/features/dashboard/lib/types";
import {
  statusBadge,
  statusButtonClass,
} from "@/features/dashboard/lib/status-style";
import { getGithubInstallUrl } from "@/features/github/lib/github-install-url";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { disconnectGithubApp } from "../actions";

type GithubConnectCardProps = {
  userId: string;
  installation: GithubInstallationStatus;
};

function ConnectedDetails({ accountLogin }: { accountLogin: string | null }) {
  return (
    <div className='space-y-3 font-manrope'>
      <div className='flex flex-wrap items-center gap-2 text-xs text-ml-text-muted'>
        <span>Installed account / organization:</span>
        <span className='inline-flex items-center gap-1 font-ml-mono text-[12px] font-medium text-ml-diff-add bg-ml-diff-add-bg border border-ml-diff-add/30 px-2 py-0.5'>
          @{accountLogin ?? "connected"}
        </span>
      </div>
      <p className='text-xs leading-relaxed text-ml-text-muted'>
        The app is actively listening to repository pull request events. It can
        read metadata and post AI-powered code reviews directly to your pull
        requests.
      </p>
    </div>
  );
}

function DisconnectedDetails() {
  return (
    <div className='space-y-3 font-manrope'>
      <p className='text-xs text-ml-text-muted'>
        Connecting the MergeLens reviewer app enables:
      </p>
      <ul className='space-y-2 text-xs text-ml-text-muted'>
        <li className='flex items-center gap-2'>
          <span className='size-1.5 bg-ml-diff-add shrink-0' />
          <span>
            Automated AI code reviews for pull requests (opened & synchronized)
          </span>
        </li>
        <li className='flex items-center gap-2'>
          <span className='size-1.5 bg-ml-diff-add shrink-0' />
          <span>Access to selected public and private repositories</span>
        </li>
        <li className='flex items-center gap-2'>
          <span className='size-1.5 bg-ml-diff-add shrink-0' />
          <span>Line-by-line inline review comments and summary insights</span>
        </li>
      </ul>
    </div>
  );
}

function DisconnectSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant='outline'
      disabled={pending}
      aria-busy={pending}
      className={cn(
        statusButtonClass.danger,
        "w-full h-10 px-4 text-[13px] tracking-tight flex items-center justify-center gap-2",
      )}
    >
      {pending ? (
        <>
          <Spinner className='size-3.5 shrink-0' />
          <span>Disconnecting…</span>
        </>
      ) : (
        <>
          <HugeiconsIcon icon={Unlink01Icon} className='size-3.5 shrink-0' />
          <span>Disconnect GitHub App</span>
        </>
      )}
    </Button>
  );
}

function ConnectedActions() {
  return (
    <form action={disconnectGithubApp} className='w-full'>
      <DisconnectSubmitButton />
    </form>
  );
}

function DisconnectedActions({ installUrl }: { installUrl: string }) {
  return (
    <Button
      nativeButton={false}
      render={<a href={installUrl} target='_blank' rel='noopener noreferrer' />}
      className={cn(
        statusButtonClass.success,
        "w-full h-10 px-4 text-[13px] tracking-tight flex items-center justify-center gap-2",
      )}
    >
      <HugeiconsIcon icon={GithubIcon} className='size-3.5 shrink-0' />
      <span>Install GitHub App</span>
      <HugeiconsIcon
        icon={ArrowUpRight01Icon}
        strokeWidth={1.65}
        className='size-4 opacity-70 -ml-1.5'
      />
    </Button>
  );
}

function ConnectionDetails({
  connected,
  accountLogin,
}: {
  connected: boolean;
  accountLogin: string | null;
}) {
  if (connected) {
    return <ConnectedDetails accountLogin={accountLogin} />;
  }

  return <DisconnectedDetails />;
}

function ConnectionActions({
  connected,
  installUrl,
}: {
  connected: boolean;
  installUrl: string;
}) {
  if (connected) {
    return <ConnectedActions />;
  }

  return <DisconnectedActions installUrl={installUrl} />;
}

export function GithubConnectCard({
  userId,
  installation,
}: GithubConnectCardProps) {
  const { connected, accountLogin } = installation;
  const installUrl = getGithubInstallUrl(userId);

  const cardBorderClass = connected
    ? "border-ml-diff-add/40"
    : "border-ml-border";
  const iconWrapperClass = connected
    ? "border-ml-diff-add/40 bg-ml-diff-add-bg text-ml-diff-add"
    : "border-ml-border bg-ml-surface-2 text-ml-text-muted";
  const statusTone: "success" | "neutral" = connected ? "success" : "neutral";
  const statusLabel = connected ? "Connected" : "Not connected";

  return (
    <div className='flex flex-1 flex-col p-4 sm:p-6 md:p-8 w-full max-w-3xl space-y-6 select-none'>
      <Card
        className={cn(
          "rounded-none border bg-ml-surface shadow-none ring-0 gap-0 transition-colors",
          cardBorderClass,
        )}
      >
        <CardHeader className='border-b border-ml-border p-5 sm:p-6'>
          <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
            <div className='flex items-start gap-3.5'>
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-none border transition-colors",
                  iconWrapperClass,
                )}
              >
                <HugeiconsIcon icon={GithubIcon} className='size-5' />
              </span>
              <div>
                <CardTitle className='font-syne text-[17px] sm:text-[19px] font-bold tracking-[-0.01em] text-ml-text'>
                  GitHub App
                </CardTitle>
                <CardDescription className='font-manrope text-[12.5px] sm:text-[13px] text-ml-text-muted mt-1 leading-relaxed'>
                  Install the MergeLens reviewer app on your GitHub account or
                  organization to review public and private repositories.
                </CardDescription>
              </div>
            </div>
            <div className='shrink-0 self-start'>
              <span className={statusBadge(statusTone)}>{statusLabel}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-5 sm:p-6'>
          <ConnectionDetails
            connected={connected}
            accountLogin={accountLogin}
          />
        </CardContent>

        <CardFooter
          className='border-t border-ml-border px-5 pb-4 sm:px-6 sm:pb-5 flex flex-col items-center gap-3 bg-ml-bg/40'
          style={{ paddingTop: "28px" }}
        >
          <div className='w-full'>
            <ConnectionActions connected={connected} installUrl={installUrl} />
          </div>
          <span className='font-manrope text-[11.5px] text-ml-text-muted text-center'>
            {connected
              ? "You can disconnect anytime"
              : "Directs to GitHub app installation"}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
