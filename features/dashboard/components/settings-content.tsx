"use client";

import Image from "next/image";
import { format } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { UpgradeButton } from "@/features/billing/components/upgrade-button";
import type { UserSubscription } from "@/features/dashboard/lib/types";
import { PLAN_DETAILS } from "@/features/settings/lib/plan-details";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProfile } from "@/features/settings/types";
import { UsageSummary } from "@/features/billing/server/usage";
import { statusBadge } from "../lib/status-style";
import { CancelSubscriptionButton } from "@/features/billing/components/cancel-subscription-button";
import {
  getDisplayName,
  getInitials,
} from "@/features/auth/components/user-menu";

type SettingsContentProps = {
  profile: SettingsProfile;
  subscription: UserSubscription;
  usage: UsageSummary;
};

function formatRenewalDate(renewsAt: string | null): string | null {
  if (!renewsAt) {
    return null;
  }

  return format(new Date(renewsAt), "MMMM d, yyyy");
}

function getSubscriptionStatusLabel(
  status: UserSubscription["status"],
): string {
  if (status === "active") {
    return "active";
  }

  if (status === "trialing") {
    return "trialing";
  }

  if (status === "halted") {
    return "payment failed";
  }

  if (status === "pending") {
    return "payment pending";
  }

  return "canceled";
}

function getUsageText(usage: UsageSummary): string {
  if (usage.limit === null) {
    return `${usage.used} reviews used this month (unlimited)`;
  }

  return `${usage.used} / ${usage.limit} reviews used this month`;
}

function ProfileTab({ profile }: { profile: SettingsProfile }) {
  const displayName = getDisplayName(profile);
  const initials = getInitials(profile);
  const memberSince = format(new Date(profile.memberSince), "MMMM d, yyyy");

  return (
    <Card className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0'>
      <CardHeader className='border-b border-ml-border p-5 sm:p-6'>
        <CardTitle className='font-syne text-[17px] sm:text-[19px] font-bold tracking-[-0.01em] text-ml-text'>
          Account Profile
        </CardTitle>
        <CardDescription className='font-manrope text-[12.5px] sm:text-[13px] text-ml-text-muted mt-1'>
          Personal and authentication details synced from your GitHub sign-in.
        </CardDescription>
      </CardHeader>

      <CardContent className='p-5 sm:p-6 space-y-6'>
        <div className='flex items-center gap-4.5 p-4 border border-ml-border bg-ml-bg/60'>
          <div className='relative size-16 shrink-0 overflow-hidden rounded-none border border-ml-border bg-ml-surface-2'>
            {profile.image ? (
              <Image
                src={profile.image}
                alt={displayName}
                width={64}
                height={64}
                unoptimized
                className='size-full object-cover rounded-none'
              />
            ) : (
              <div className='flex size-full items-center justify-center font-ml-mono font-semibold text-ml-text text-base'>
                {initials}
              </div>
            )}
          </div>

          <div className='min-w-0 flex-1 space-y-1'>
            <div className='flex items-center gap-2.5 flex-wrap'>
              <h3 className='font-syne font-bold text-[16px] text-ml-text truncate'>
                {displayName}
              </h3>
              <span className='font-ml-mono text-[10px] tracking-wider uppercase text-ml-accent bg-ml-accent-wash border border-ml-accent/30 px-2 py-0.5 select-none'>
                GitHub Verified
              </span>
            </div>
            <p className='font-manrope text-[12.5px] text-ml-text-muted truncate'>
              {profile.email}
            </p>
            <p className='font-ml-mono text-[11px] text-ml-text-dim'>
              Member since {memberSince}
            </p>
          </div>
        </div>

        <Separator className='bg-ml-border' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <div className='space-y-2'>
            <Label
              htmlFor='name'
              className='font-manrope text-[11.5px] font-semibold tracking-[0.04em] uppercase text-ml-text-muted'
            >
              Display name
            </Label>
            <Input
              id='name'
              defaultValue={profile.name}
              readOnly
              className='rounded-none h-10 px-3.5 bg-ml-bg border-ml-border text-ml-text font-manrope text-[13px] select-all cursor-default focus-visible:ring-0 focus-visible:border-ml-border-strong'
            />
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='email'
              className='font-manrope text-[11.5px] font-semibold tracking-[0.04em] uppercase text-ml-text-muted'
            >
              Email address
            </Label>
            <Input
              id='email'
              type='email'
              defaultValue={profile.email}
              readOnly
              className='rounded-none h-10 px-3.5 bg-ml-bg border-ml-border text-ml-text font-manrope text-[13px] select-all cursor-default focus-visible:ring-0 focus-visible:border-ml-border-strong'
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className='border-t border-ml-border bg-ml-bg/40 p-4 sm:p-5 flex items-center justify-between'>
        <p className='font-manrope text-[12px] text-ml-text-dim flex items-center gap-2'>
          <HugeiconsIcon
            icon={InformationCircleIcon}
            size={14}
            strokeWidth={2}
            className='size-3.5 shrink-0 text-ml-text-dim'
            aria-hidden='true'
          />
          Profile details are managed by your GitHub account settings.
        </p>
      </CardFooter>
    </Card>
  );
}

function SubscriptionTab({
  subscription,
  usage,
}: {
  subscription: UserSubscription;
  usage: UsageSummary;
}) {
  const planDetails = PLAN_DETAILS[subscription.plan];
  const renewalDate = formatRenewalDate(subscription.renewsAt);
  const statusLabel = getSubscriptionStatusLabel(subscription.status);

  const isActive =
    subscription.status === "active" || subscription.status === "trialing";

  let badgeTone: "success" | "neutral" | "warning" = "neutral";

  if (isActive) {
    badgeTone = "success";
  } else if (subscription.status === "canceled") {
    badgeTone = "warning";
  }

  const usagePercent =
    usage.limit !== null
      ? Math.min(100, Math.max(0, Math.round((usage.used / usage.limit) * 100)))
      : 100;

  return (
    <Card className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0'>
      <CardHeader className='border-b border-ml-border p-5 sm:p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <div>
            <CardTitle className='font-syne text-[17px] sm:text-[19px] font-bold tracking-[-0.01em] text-ml-text'>
              Subscription & Billing
            </CardTitle>
            <CardDescription className='font-manrope text-[12.5px] sm:text-[13px] text-ml-text-muted mt-1'>
              Manage your plan, quotas, and automated AI pull request reviews.
            </CardDescription>
          </div>
          <span className={statusBadge(badgeTone)}>{statusLabel}</span>
        </div>
      </CardHeader>

      <CardContent className='p-5 sm:p-6 space-y-6'>
        <div
          className={cn(
            "relative p-5 md:p-6 border rounded-none transition-all",
            isActive
              ? "border-ml-diff-add/40 bg-ml-diff-add-bg/20"
              : "border-ml-border bg-ml-bg/60",
          )}
        >
          <div className='flex flex-col sm:flex-row sm:items-baseline justify-between gap-2'>
            <div>
              <span className='font-ml-mono text-[11px] uppercase tracking-[0.06em] text-ml-text-muted'>
                Current Plan
              </span>
              <h3 className='font-syne text-[26px] sm:text-[30px] font-extrabold tracking-[-0.03em] text-ml-text mt-1'>
                {planDetails.label} Plan
              </h3>
            </div>

            <div className='text-left sm:text-right mt-2 sm:mt-0'>
              <div className='font-syne text-[22px] sm:text-[24px] font-extrabold text-ml-text'>
                {subscription.plan === "pro" ? "₹299" : "₹0"}
                <span className='font-manrope text-[12.5px] font-normal text-ml-text-dim ml-1.5'>
                  / month
                </span>
              </div>
              {renewalDate ? (
                <p className='font-ml-mono text-[11px] text-ml-text-muted mt-0.5'>
                  {subscription.status === "canceled" ? "Expires" : "Renews"}{" "}
                  {renewalDate}
                </p>
              ) : (
                <p className='font-ml-mono text-[11px] text-ml-text-dim mt-0.5'>
                  Billed via Razorpay
                </p>
              )}
            </div>
          </div>

          <Separator className='my-4.5 bg-ml-border/60' />

          <div className='space-y-2'>
            <div className='flex items-center justify-between font-manrope text-[12.5px]'>
              <span className='font-medium text-ml-text'>
                Monthly Review Usage
              </span>
              <span className='font-ml-mono text-[11.5px] text-ml-text-muted'>
                {getUsageText(usage)}
              </span>
            </div>

            {usage.limit !== null ? (
              <div className='h-2 w-full bg-ml-surface-2 border border-ml-border overflow-hidden rounded-none'>
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    usage.used >= usage.limit ? "bg-amber-500" : "bg-ml-accent",
                  )}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            ) : (
              <div className='h-2 w-full bg-ml-surface-2 border border-ml-border overflow-hidden rounded-none'>
                <div className='h-full bg-ml-diff-add w-full' />
              </div>
            )}
          </div>
        </div>

        <div className='space-y-3'>
          <h4 className='font-manrope text-[11.5px] font-semibold uppercase tracking-wider text-ml-text-muted'>
            Included in your plan
          </h4>
          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
            {planDetails.features.map((feature) => (
              <li
                key={feature}
                className='flex items-start gap-2.5 font-manrope text-[13px] text-ml-text leading-snug'
              >
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  className='size-3.5 shrink-0 mt-0.5 text-ml-accent'
                  aria-hidden='true'
                >
                  <path d='M20 6L9 17l-5-5' />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className='border-t border-ml-border bg-ml-bg/40 p-5 sm:p-6 flex flex-col items-center gap-3'>
        <div className='w-full'>
          {subscription.plan === "free" ? (
            <UpgradeButton className='w-full justify-center' />
          ) : null}
          {subscription.plan === "pro" ? (
            <CancelSubscriptionButton
              disabled={subscription.status === "canceled"}
              className='w-full justify-center'
            />
          ) : null}
        </div>

        <p className='font-ml-mono text-[11px] text-ml-text-dim text-center select-none'>
          Secured by Razorpay · Cancel anytime
        </p>
      </CardFooter>
    </Card>
  );
}

export function SettingsContent({
  profile,
  subscription,
  usage,
}: SettingsContentProps) {
  return (
    <div className='flex flex-1 flex-col p-4 sm:p-6 md:p-8 w-full max-w-3xl space-y-6 select-none'>
      <Tabs defaultValue='profile' className='w-full'>
        <TabsList
          variant='line'
          className='h-10 border-b border-ml-border rounded-none w-full flex justify-start gap-6 p-0 bg-transparent'
        >
          <TabsTrigger
            value='profile'
            className='flex-initial w-auto rounded-none h-full px-2 py-2 font-manrope font-semibold text-[13px] sm:text-[13.5px] text-ml-text-muted data-active:text-ml-text transition-all relative after:bg-ml-text after:rounded-none'
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value='subscription'
            className='flex-initial w-auto rounded-none h-full px-2 py-2 font-manrope font-semibold text-[13px] sm:text-[13.5px] text-ml-text-muted data-active:text-ml-text transition-all relative after:bg-ml-text after:rounded-none'
          >
            Subscription & Quotas
          </TabsTrigger>
        </TabsList>

        <TabsContent value='profile' className='mt-6 outline-none'>
          <ProfileTab profile={profile} />
        </TabsContent>

        <TabsContent value='subscription' className='mt-6 outline-none'>
          <SubscriptionTab subscription={subscription} usage={usage} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
