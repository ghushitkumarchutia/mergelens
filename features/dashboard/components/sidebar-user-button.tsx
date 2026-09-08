"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  UserMenu,
  type UserMenuUser,
} from "@/features/auth/components/user-menu";
import { cn } from "@/lib/utils";

export interface SidebarUserButtonProps {
  readonly user: UserMenuUser;
  readonly plan?: string;
  readonly className?: string;
}

export function SidebarUserButton({
  user,
  plan = "Free",
  className,
}: SidebarUserButtonProps) {
  const { state, isMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";

  return (
    <SidebarMenu className={cn("select-none w-full", className)}>
      <SidebarMenuItem className='flex justify-center w-full'>
        <UserMenu
          user={user}
          plan={plan}
          variant={isCollapsed ? "compact" : "profile"}
          className={cn(
            "rounded-none transition-all duration-150",
            isCollapsed
              ? "[&_button]:size-8 [&_button]:p-0 [&_button]:justify-center [&_button]:rounded-none [&_button]:border-ml-border/70 hover:[&_button]:border-ml-border-strong hover:[&_button]:bg-ml-surface-2 [&_button]:mx-auto"
              : "w-full [&_button]:h-11 md:[&_button]:h-11.5 [&_button]:w-full [&_button]:justify-start [&_button]:gap-2.5 [&_button]:px-2 md:[&_button]:px-2.5 [&_button]:rounded-none [&_button]:border [&_button]:border-transparent hover:[&_button]:border-ml-border/60 hover:[&_button]:bg-ml-surface-2",
          )}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
