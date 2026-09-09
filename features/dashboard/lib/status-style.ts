import { cn } from "@/lib/utils";

export const statusBadgeClass = {
  success: "border-ml-diff-add/40 bg-ml-diff-add-bg text-ml-diff-add",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  danger: "border-ml-diff-remove/40 bg-ml-diff-remove-bg text-ml-diff-remove",
  info: "border-ml-accent/40 bg-ml-accent-wash text-ml-accent",
  neutral: "border-ml-border bg-ml-surface-2 text-ml-text-muted",
} as const;

export const statusButtonClass = {
  success:
    "rounded-none font-manrope font-semibold bg-ml-text text-ml-bg hover:bg-ml-text/90 active:translate-y-px transition-all border border-transparent select-none shadow-none focus-visible:ring-1 focus-visible:ring-ml-border-strong",
  danger:
    "rounded-none font-manrope font-semibold bg-transparent text-ml-diff-remove border border-ml-diff-remove/40 hover:bg-ml-diff-remove-bg active:translate-y-px transition-all select-none shadow-none",
  warning:
    "rounded-none font-manrope font-semibold bg-transparent text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 active:translate-y-px transition-all select-none shadow-none",
} as const;

export function statusBadge(
  tone: keyof typeof statusBadgeClass,
  className?: string,
) {
  return cn(
    "inline-flex items-center rounded-none border px-2 py-0.5 font-ml-mono text-[10.5px] font-medium tracking-[0.04em] uppercase select-none",
    statusBadgeClass[tone],
    className,
  );
}
