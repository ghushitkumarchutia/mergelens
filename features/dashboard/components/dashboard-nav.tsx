"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare02Icon,
  WorkflowCircle04Icon,
  GitPullRequestIcon,
  GithubIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";

import {
  DASHBOARD_NAV_ITEMS,
  type DashboardRoute,
} from "@/features/dashboard/lib/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NAV_ICONS = {
  "layout-dashboard": DashboardSquare02Icon,
  "folder-git-2": WorkflowCircle04Icon,
  "git-pull-request": GitPullRequestIcon,
  github: GithubIcon,
  settings: Settings02Icon,
} as const;

function isNavActive(pathname: string, href: DashboardRoute): boolean {
  if (href === "/dashboard") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav() {
  const pathname = usePathname() ?? "";
  const { state, isMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";

  return (
    <SidebarGroup className='px-2.5 md:px-3 py-2 group-data-[collapsible=icon]:px-0! group-data-[collapsible=icon]:py-2'>
      <SidebarGroupLabel className='font-syne font-bold text-[10.5px] md:text-[11px] uppercase tracking-[0.08em] text-ml-text-dim rounded-none px-2 h-7 mb-1 select-none'>
        Workspace
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className='gap-1'>
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const active = isNavActive(pathname, item.href);

            return (
              <SidebarMenuItem
                key={item.href}
                className='group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center'
              >
                <SidebarMenuButton
                  isActive={active}
                  tooltip={item.title}
                  className={cn(
                    "rounded-none font-manrope text-[12.5px] md:text-[13px] transition-all duration-150 border select-none",
                    "h-9 md:h-9.5 px-2.5 w-full",
                    "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto",
                    isCollapsed && "size-8! p-0! justify-center mx-auto",
                    active
                      ? "bg-ml-surface text-ml-text border-ml-border font-semibold shadow-xs"
                      : "bg-transparent text-ml-text-muted border-transparent hover:bg-ml-surface-2 hover:text-ml-text hover:border-ml-border/40 font-medium",
                  )}
                  render={
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center w-full gap-2.5",
                        "group-data-[collapsible=icon]:size-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:gap-0",
                        isCollapsed && "size-full justify-center p-0 gap-0",
                      )}
                    >
                      <HugeiconsIcon
                        icon={Icon}
                        size={17}
                        strokeWidth={active ? 1.8 : 1.5}
                        className={cn(
                          "size-4.5 shrink-0 transition-colors",
                          "group-data-[collapsible=icon]:m-auto group-data-[collapsible=icon]:shrink-0",
                          isCollapsed && "m-auto",
                          active
                            ? "text-ml-accent"
                            : "text-ml-text-dim group-hover/menu-button:text-ml-text",
                        )}
                        aria-hidden='true'
                      />
                      {!isCollapsed && (
                        <span className='truncate group-data-[collapsible=icon]:hidden'>
                          {item.title}
                        </span>
                      )}
                      {!isCollapsed && active ? (
                        <span
                          className='ml-auto w-1 h-3.5 bg-ml-accent rounded-none shrink-0 group-data-[collapsible=icon]:hidden'
                          aria-hidden='true'
                        />
                      ) : null}
                    </Link>
                  }
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
