"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { statusButtonClass } from "@/features/dashboard/lib/status-style";
import { startProSubscription } from "@/lib/billing";

type RazorpayCheckout = new (options: Record<string, unknown>) => {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: RazorpayCheckout;
  }
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

type UpgradeButtonProps = {
  className?: string;
};

export function UpgradeButton({ className }: UpgradeButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      toast.error("Razorpay is not configured yet.");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Checkout is still loading, please try again in a moment.");
      return;
    }

    setLoading(true);

    try {
      const { subscriptionId } = await startProSubscription();

      const checkout = new window.Razorpay({
        key,
        subscription_id: subscriptionId,
        name: "MergeLens",
        description: "Pro plan — unlimited AI reviews",
        handler: () => {
          toast.success(
            "Payment successful! Your Pro plan will activate shortly.",
          );
          router.refresh();
        },
      });

      checkout.open();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not start checkout.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Script src={RAZORPAY_SCRIPT_URL} strategy='lazyOnload' />
      <Button
        onClick={handleUpgrade}
        disabled={loading}
        className={cn(
          statusButtonClass.success,
          "h-9 md:h-9.5 px-4 md:px-5 text-[12.5px] md:text-[13px] font-semibold tracking-[-0.01em] gap-2",
          className,
        )}
      >
        {loading ? (
          <>
            <span
              className='size-3.5 border-2 border-ml-bg/30 border-t-ml-bg animate-spin shrink-0'
              aria-hidden='true'
            />
            <span>Opening checkout…</span>
          </>
        ) : (
          <>
            <span>Upgrade to Pro</span>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.25'
              className='size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5'
              aria-hidden='true'
            >
              <path d='M5 12h14m-7-7 7 7-7 7' />
            </svg>
          </>
        )}
      </Button>
    </>
  );
}
