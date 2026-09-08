"use client";

import Image from "next/image";
import Link from "next/link";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { DashboardNav } from "@/features/dashboard/components/dashboard-nav";
import { SidebarUserButton } from "@/features/dashboard/components/sidebar-user-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { type UserMenuUser } from "@/features/auth/components/user-menu";
import { cn } from "@/lib/utils";

export interface DashboardSidebarProps {
  readonly user: UserMenuUser;
  readonly plan?: string;
  readonly className?: string;
}

export function DashboardSidebar({
  user,
  plan = "Free",
  className,
}: DashboardSidebarProps) {
  const { state, isMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";

  return (
    <Sidebar
      collapsible='icon'
      className={cn(
        "rounded-none border-r border-ml-border bg-sidebar select-none transition-all duration-200",
        className,
      )}
    >
      <SidebarHeader className='h-13 md:h-14 p-0 rounded-none border-b border-ml-border/70 flex items-center justify-center group-data-[collapsible=icon]:p-0'>
        <div
          className={cn(
            "flex items-center w-full h-full",
            isCollapsed
              ? "justify-center px-0!"
              : "justify-between pl-2.5 pr-1 md:pl-3 md:pr-1.5",
            "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0! md:group-data-[collapsible=icon]:px-0!",
          )}
        >
          <Link
            href={DASHBOARD_ROUTES.overview}
            className={cn(
              "items-center gap-1.5 md:gap-2 min-w-0 flex-1 py-1 rounded-none hover:opacity-90 transition-opacity select-none group-data-[collapsible=icon]:hidden",
              isCollapsed ? "hidden" : "flex",
            )}
            aria-label='MergeLens - Go to Overview'
          >
            <Image
              src='/icons/logo.svg'
              alt='MergeLens'
              width={48}
              height={64}
              priority
              className='h-5.5 md:h-6.75 w-auto shrink-0 object-contain'
            />
            <span className='truncate font-syne font-bold text-[15px] md:text-[17px] tracking-[-0.02em] text-ml-text'>
              MergeLens
            </span>
          </Link>
          <SidebarTrigger
            className={cn(
              "shrink-0 rounded-none border-0 bg-transparent hover:bg-transparent active:bg-transparent text-ml-text-muted hover:text-ml-text transition-colors duration-150 shadow-none",
              isCollapsed
                ? "size-8 md:size-8.5 mx-auto m-0"
                : "size-8.5 md:size-9 mr-0 md:-mr-0.5",
              "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:m-0 group-data-[collapsible=icon]:size-8 md:group-data-[collapsible=icon]:size-8.5",
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className='rounded-none py-1 overflow-x-hidden'>
        <DashboardNav />
      </SidebarContent>

      <SidebarFooter
        className={cn(
          "px-2.5 md:px-3 py-2 rounded-none gap-2",
          isCollapsed && "px-0!",
          "group-data-[collapsible=icon]:px-0!",
        )}
      >
        <SidebarSeparator className='mx-0 bg-ml-border rounded-none' />
        <SidebarUserButton user={user} plan={plan} />
      </SidebarFooter>

      <SidebarRail className='rounded-none hover:after:bg-ml-border' />
    </Sidebar>
  );
}
