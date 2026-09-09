import { requireAuth } from "@/features/auth/actions";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { getUserSubscription } from "@/features/billing/server/subscription";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuth();
  const subscription = await getUserSubscription(session.user.id);

  const planLabel = subscription.plan === "pro" ? "Pro" : "Free";

  return (
    <DashboardShell user={session.user} plan={planLabel}>
      {children}
    </DashboardShell>
  );
}
