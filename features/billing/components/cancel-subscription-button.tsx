"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cancelSubscription } from "@/lib/billing";
import { statusButtonClass } from "@/features/dashboard/lib/status-style";

type CancelSubscriptionButtonProps = {
  disabled?: boolean;
  className?: string;
};

export function CancelSubscriptionButton({
  disabled = false,
  className,
}: CancelSubscriptionButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    setLoading(true);

    try {
      await cancelSubscription();
      toast.success(
        "Subscription canceled. Pro access continues until renewal date.",
      );
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not cancel subscription.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant='outline'
      onClick={handleCancel}
      disabled={disabled || loading}
      className={cn(
        statusButtonClass.danger,
        "h-9 md:h-9.5 px-4 md:px-5 text-[12.5px] md:text-[13px] font-semibold tracking-[-0.01em] gap-2",
        className,
      )}
    >
      {loading ? (
        <>
          <span
            className='size-3.5 border-2 border-ml-diff-remove/30 border-t-ml-diff-remove animate-spin shrink-0'
            aria-hidden='true'
          />
          <span>Canceling…</span>
        </>
      ) : (
        "Cancel subscription"
      )}
    </Button>
  );
}
