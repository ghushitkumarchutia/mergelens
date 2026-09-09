"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HugeiconsIcon } from "@hugeicons/react";
import { Refresh01Icon } from "@hugeicons/core-free-icons";
import { githubRepoKeys } from "@/features/github/lib/repos-query";
import { syncRepoCodebase } from "../actions/repo-sync";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { RepoSyncStatus } from "../types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SyncRepoButtonProps = {
  repoFullName: string;
  branch: string;
  syncStatus: RepoSyncStatus | null;
  className?: string;
};

function isSyncing(
  status: RepoSyncStatus | null,
  mutationPending: boolean,
): boolean {
  if (mutationPending) {
    return true;
  }

  return status === "pending" || status === "syncing";
}

function getButtonLabel(
  status: RepoSyncStatus | null,
  mutationPending: boolean,
): string {
  if (isSyncing(status, mutationPending)) {
    return "Syncing…";
  }

  if (status === "synced") {
    return "Re-sync";
  }

  if (status === "failed") {
    return "Retry Sync";
  }

  return "Sync";
}

const SyncRepoButton = ({
  repoFullName,
  branch,
  syncStatus,
  className,
}: SyncRepoButtonProps) => {
  const queryClient = useQueryClient();

  const syncRepo = useMutation({
    mutationFn: async () => {
      const result = await syncRepoCodebase(repoFullName, branch);

      if (!result.success) {
        throw new Error(result.error ?? "Sync failed.");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: githubRepoKeys.all });
      toast.success(`Repo ${repoFullName} sync started.`);
    },
    onError: (error) => {
      toast.error(`Failed to sync repo ${repoFullName}: ${error.message}`);
    },
  });

  const syncing = isSyncing(syncStatus, syncRepo.isPending);

  let variantStyle =
    "border-ml-border bg-ml-surface hover:bg-ml-surface-2 text-ml-text hover:text-ml-text";
  if (syncStatus === "failed" && !syncing) {
    variantStyle =
      "border-ml-diff-remove/40 text-ml-diff-remove hover:bg-ml-diff-remove-bg";
  } else if (syncStatus === "synced" && !syncing) {
    variantStyle =
      "border-ml-border bg-ml-surface hover:bg-ml-surface-2 text-ml-text-muted hover:text-ml-text";
  }

  return (
    <Button
      size='sm'
      variant='outline'
      disabled={syncing}
      aria-busy={syncing}
      onClick={() => syncRepo.mutate()}
      className={cn(
        "rounded-none font-manrope font-semibold text-xs h-7 px-2.5 gap-1.5 transition-all active:translate-y-px select-none shadow-none disabled:opacity-60 disabled:cursor-not-allowed",
        variantStyle,
        className,
      )}
    >
      {syncing ? (
        <Spinner className='size-3 shrink-0' />
      ) : (
        <HugeiconsIcon
          icon={Refresh01Icon}
          className='size-3 shrink-0 opacity-70'
        />
      )}
      <span>{getButtonLabel(syncStatus, syncRepo.isPending)}</span>
    </Button>
  );
};

export default SyncRepoButton;
