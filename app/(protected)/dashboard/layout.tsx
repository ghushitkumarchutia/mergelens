import { requireAuth } from "@/features/auth/actions";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { getUserSubscription } from "@/features/billing/server/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
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
