"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SIGN_IN_PATH } from "../utils";
import { CaretCircleUpIcon, SignOutIcon } from "@phosphor-icons/react";

const DEFAULT_PLAN = "Free";

export type UserMenuUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type UserMenuTriggerVariant = "compact" | "profile";

export interface UserMenuProps {
  readonly user: UserMenuUser;
  readonly variant?: UserMenuTriggerVariant;
  readonly plan?: string;
  readonly className?: string;
}

export function getDisplayName(user: UserMenuUser): string {
  return user.name?.trim() || user.email?.split("@")[0] || "User";
}

export function getInitials(user: UserMenuUser): string {
  const source = user.name?.trim() || user.email || "U";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

function UserAvatar({
  user,
  size = "default",
  className,
}: {
  readonly user: UserMenuUser;
  readonly size?: "default" | "sm" | "lg";
  readonly className?: string;
}) {
  const displayName = getDisplayName(user);
  const initials = getInitials(user);

  return (
    <Avatar
      size={size}
      className={cn(
        "rounded-none after:rounded-none border border-ml-border bg-ml-surface-2 shrink-0 select-none",
        className,
      )}
    >
      {user.image ? (
        <AvatarImage
          src={user.image}
          alt={displayName}
          className='rounded-none object-cover'
        />
      ) : null}
      <AvatarFallback className='rounded-none bg-ml-surface-2 text-ml-text font-ml-mono font-semibold text-[11px] md:text-[12px]'>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

export function UserMenu({
  user,
  variant = "profile",
  plan = DEFAULT_PLAN,
  className,
}: UserMenuProps) {
  const router = useRouter();
  const displayName = getDisplayName(user);
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(SIGN_IN_PATH);
          },
          onError: () => {
            setIsSigningOut(false);
          },
        },
      });
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("outline-none select-none", className)}
        render={
          variant === "compact" ? (
            <Button
              variant='ghost'
              size='icon'
              className='size-8 md:size-9 rounded-none border border-ml-border bg-ml-surface hover:bg-ml-surface-2 hover:border-ml-border-strong text-ml-text transition-all duration-150 active:translate-y-px select-none focus-visible:ring-2 focus-visible:ring-ml-accent/40'
              aria-label='Open account menu'
            />
          ) : (
            <Button
              variant='ghost'
              className='h-9 md:h-10 gap-2 px-2 md:px-2.5 rounded-none border border-transparent hover:border-ml-border hover:bg-ml-surface-2 text-ml-text transition-all duration-150 active:translate-y-px select-none justify-start focus-visible:ring-2 focus-visible:ring-ml-accent/40'
              aria-label='Open account menu'
            />
          )
        }
      >
        <UserAvatar
          user={user}
          size={variant === "compact" ? "default" : "sm"}
        />
        {variant === "profile" ? (
          <>
            <span className='max-w-32 truncate text-left font-manrope font-medium text-[12.5px] md:text-[13px] text-ml-text'>
              {displayName}
            </span>
            <CaretCircleUpIcon
              className='size-3.5 md:size-4 shrink-0 text-ml-text-dim group-hover/button:text-ml-text ml-auto transition-colors'
              aria-hidden='true'
            />
          </>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={6}
        className='w-56 md:w-60 rounded-none bg-ml-surface border border-ml-border p-0 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]'
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className='p-2.5 md:p-3 rounded-none font-normal bg-ml-surface-2/60 border-b border-ml-border'>
            <div className='flex items-start gap-2.5'>
              <UserAvatar
                user={user}
                size='default'
                className='shrink-0 mt-0.5'
              />
              <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
                <p className='truncate font-syne font-semibold text-[13px] md:text-[13.5px] text-ml-text tracking-[-0.01em]'>
                  {displayName}
                </p>
                {user.email ? (
                  <p className='truncate font-manrope text-[11.5px] md:text-[12px] text-ml-text-muted'>
                    {user.email}
                  </p>
                ) : null}
                <div className='mt-1.5 flex items-center'>
                  <span className='inline-flex items-center px-1.5 py-0.5 rounded-none font-ml-mono text-[9.5px] md:text-[10px] uppercase tracking-wider font-medium bg-ml-accent-wash text-ml-accent border border-ml-accent/20'>
                    {plan} plan
                  </span>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='my-0 h-px bg-ml-border' />
        <DropdownMenuGroup className='p-1'>
          <DropdownMenuItem
            variant='destructive'
            disabled={isSigningOut}
            onClick={handleSignOut}
            className='rounded-none cursor-pointer text-ml-diff-remove hover:bg-ml-diff-remove-bg hover:text-ml-diff-remove focus:bg-ml-diff-remove-bg focus:text-ml-diff-remove font-manrope font-medium text-[12.5px] md:text-[13px] px-2.5 py-1.5 md:py-2 gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <SignOutIcon
              className='size-3.5 md:size-4 shrink-0'
              aria-hidden='true'
            />
            <span>{isSigningOut ? "Signing out…" : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type UserMenuWithSessionProps = Omit<UserMenuProps, "user">;

export function UserMenuWithSession(props: UserMenuWithSessionProps) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session?.user) {
    return null;
  }

  return <UserMenu user={session.user} {...props} />;
}
