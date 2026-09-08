import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { type UserMenuUser } from "@/features/auth/components/user-menu";
import { cn } from "@/lib/utils";

export interface DashboardShellProps {
  readonly children: React.ReactNode;
  readonly user: UserMenuUser;
  readonly plan?: string;
  readonly defaultOpen?: boolean;
  readonly className?: string;
}

export function DashboardShell({
  children,
  user,
  plan = "Free",
  defaultOpen = true,
  className,
}: DashboardShellProps) {
  return (
    <TooltipProvider delay={0}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardSidebar user={user} plan={plan} />
        <SidebarInset
          className={cn(
            "min-h-svh flex flex-col bg-ml-bg overflow-x-hidden",
            className,
          )}
        >
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
