import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { GithubSignInForm } from "@/features/auth/components/github-sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to MergeLens with your GitHub account.",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { callbackUrl } = await searchParams;

  return (
    <div className='w-full'>
      <div className='relative bg-white dark:bg-black border border-ml-border text-left shadow-[0_24px_70px_-20px_rgba(20,20,30,0.18)] dark:shadow-[0_24px_70px_-20px_rgba(0,0,0,0.8)] rounded-none overflow-hidden'>
        <div className='p-6 md:p-8 text-center bg-white dark:bg-black'>
          <div className='flex items-center justify-center mb-1'>
            <Link
              href='/'
              className='group inline-flex items-center justify-center focus-visible:outline-none select-none'
              aria-label='MergeLens homepage'
            >
              <Image
                src='/icons/logo.svg'
                alt='MergeLens'
                width={80}
                height={80}
                priority
                className='w-16 h-16 md:w-20 md:h-20 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105'
              />
            </Link>
          </div>

          <div className='space-y-1.5 mb-6'>
            <h1 className='font-syne text-[22px] md:text-[25px] font-bold tracking-tight text-ml-text'>
              Welcome back
            </h1>
            <p className='font-manrope text-[12.5px] md:text-[13px] text-ml-text-muted leading-[1.6] max-w-75 mx-auto'>
              Sign in with GitHub to review pull requests with full codebase
              context.
            </p>
          </div>

          <div className='space-y-4'>
            <GithubSignInForm callbackUrl={callbackUrl} />

            <div className='relative my-5 flex items-center justify-center'>
              <div
                className='absolute inset-0 flex items-center'
                aria-hidden='true'
              >
                <div className='w-full border-t border-ml-border' />
              </div>
              <span className='relative bg-white dark:bg-black px-2.5 font-ml-mono text-[9.5px] md:text-[10px] uppercase tracking-[0.08em] text-ml-text-dim select-none'>
                Authorized OAuth 2.0
              </span>
            </div>

            <div className='bg-neutral-50 dark:bg-black border border-ml-border p-3 rounded-none text-left flex items-start gap-2.5'>
              <svg
                className='w-3.5 h-3.5 text-ml-accent shrink-0 mt-0.5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='square'
                strokeLinejoin='miter'
                aria-hidden='true'
              >
                <rect x='3' y='11' width='18' height='11' rx='0' ry='0' />
                <path d='M7 11V7a5 5 0 0 1 10 0v4' />
              </svg>
              <p className='font-manrope text-[11px] md:text-[11.5px] text-ml-text-muted leading-[1.55]'>
                Only read permissions for your GitHub identity are requested.
                You can revoke access at any time.
              </p>
            </div>
          </div>
        </div>

        <div className='py-3 px-4 border-t border-ml-border bg-white dark:bg-black text-center'>
          <p className='font-manrope text-[11px] text-ml-text-dim leading-normal'>
            By continuing, you agree to our{" "}
            <Link
              href='/#pricing'
              className='text-ml-text hover:underline underline-offset-2 transition-colors'
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href='/#security'
              className='text-ml-text hover:underline underline-offset-2 transition-colors'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      <div className='mt-5 text-center'>
        <Link
          href='/'
          className='inline-flex items-center gap-1.5 font-manrope text-[12px] text-ml-text-muted hover:text-ml-text transition-colors select-none group'
        >
          <span
            className='transition-transform duration-150 group-hover:-translate-x-0.5'
            aria-hidden='true'
          >
            ←
          </span>
          Back to MergeLens
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
