"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { signInWithGithub } from "../actions";

export function GitHubIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className ?? "size-4.5 md:size-5 shrink-0"}
      aria-hidden='true'
      focusable='false'
      fill='currentColor'
      {...props}
    >
      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />
    </svg>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      aria-busy={pending}
      className='w-full h-10 md:h-11 rounded-none bg-ml-text text-ml-bg hover:bg-ml-text/90 dark:hover:bg-white text-[13.5px] md:text-[14px] font-manrope font-semibold tracking-[-0.01em] transition-all duration-150 active:translate-y-px disabled:translate-y-0 border border-transparent shadow-none gap-2.5 select-none disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ml-accent/40 focus-visible:outline-none'
    >
      {pending ? (
        <>
          <Spinner className='size-4.5 md:size-5 shrink-0' />
          <span>Redirecting to GitHub…</span>
        </>
      ) : (
        <>
          <GitHubIcon className='size-4.5 md:size-5 shrink-0' />
          <span>Continue with GitHub</span>
        </>
      )}
    </Button>
  );
}

export interface GithubSignInFormProps {
  readonly callbackUrl?: string;
  readonly className?: string;
}

export function GithubSignInForm({
  callbackUrl,
  className,
}: GithubSignInFormProps) {
  return (
    <form action={signInWithGithub} className={cn("w-full", className)}>
      {callbackUrl ? (
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
      ) : null}
      <SubmitButton />
    </form>
  );
}
