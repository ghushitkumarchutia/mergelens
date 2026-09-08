"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label='Toggle theme'
            className='inline-flex h-7.5 w-7.5 md:h-8.5 md:w-8.5 items-center justify-center bg-transparent border border-transparent text-ml-text-muted hover:bg-ml-surface hover:text-ml-text transition-all duration-150 active:scale-[0.97] active:opacity-90 select-none focus:outline-none'
          />
        }
      >
        <HugeiconsIcon
          icon={Sun03Icon}
          className='h-4 md:h-4.5 w-4 md:w-4.5 scale-100 rotate-0 transition-all duration-200 dark:scale-0 dark:-rotate-90'
        />
        <HugeiconsIcon
          icon={Moon02Icon}
          className='absolute h-4 md:h-4.5 w-4 md:w-4.5 scale-0 rotate-90 transition-all duration-200 dark:scale-100 dark:rotate-0'
        />
        <span className='sr-only'>Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className='font-medium text-xs'
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className='font-medium text-xs'
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className='font-medium text-xs'
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
