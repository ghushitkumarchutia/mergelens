"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export interface DashboardHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function DashboardHeader({
  title,
  description,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-13 md:h-14 shrink-0 items-center justify-between gap-2 border-b border-ml-border bg-ml-bg px-4 md:px-6 select-none",
        className,
      )}
    >
      <div className='flex min-w-0 items-center gap-2 flex-1'>
        <SidebarTrigger className='-ml-1 md:hidden rounded-none text-ml-text-muted hover:text-ml-text' />
        <Separator
          orientation='vertical'
          className='mr-2 h-4 md:hidden bg-ml-border'
        />
        <div className='flex min-w-0 flex-col justify-center'>
          <h1 className='truncate font-syne font-semibold text-[14px] md:text-[15px] tracking-[-0.01em] text-ml-text leading-tight'>
            {title}
          </h1>
          {description ? (
            <p className='truncate font-manrope text-[11.5px] md:text-[12px] text-ml-text-dim leading-tight mt-0.5'>
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {children ? (
        <div className='flex items-center gap-2 shrink-0'>{children}</div>
      ) : null}
    </header>
  );
}
