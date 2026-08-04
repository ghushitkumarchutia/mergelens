"use client";

import Image from "next/image";
import Link from "next/link";
import {
  GitPullRequest,
  Robot,
  ShieldCheck,
  Lightning,
  GithubLogo,
  ArrowRight,
  CheckCircle,
  Code,
  Database,
} from "@phosphor-icons/react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className='flex min-h-full flex-col bg-background font-sans'>
      <nav className='sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md'>
        <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-6'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/logo2.svg'
              alt='MergeLens'
              width={32}
              height={32}
              className='object-contain'
            />
            <span className='font-semibold tracking-tight'>MergeLens</span>
          </Link>
          <div className='flex items-center gap-3'>
            <ModeToggle />
            <Link
              href='/sign-in'
              className='inline-flex h-9 items-center justify-center gap-2 rounded-none bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90'
            >
              <GithubLogo className='size-4' />
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      <section className='relative overflow-hidden border-b border-border/30'>
        <div className='absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5' />
        <div className='relative mx-auto max-w-6xl px-6 py-24 text-center sm:py-32'>
          <div className='mx-auto inline-flex items-center gap-2 rounded-none border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground'>
            <Robot className='size-3' />
            Powered by AI &middot; Built for developers
          </div>
          <h1 className='mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl'>
            AI-Powered Code Reviews
            <br />
            <span className='bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400'>
              On Every Pull Request
            </span>
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
            Get instant, actionable code feedback the moment you open a PR.
            MergeLens catches bugs, security issues, and performance bottlenecks
            in your pull requests before they reach production.
          </p>
          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link
              href='/sign-in'
              className='inline-flex h-12 items-center justify-center gap-2 rounded-none bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90'
            >
              <GithubLogo className='size-4' />
              Get Started with GitHub
              <ArrowRight className='size-4' />
            </Link>
            <Link
              href='#pricing'
              className='inline-flex h-12 items-center justify-center gap-2 rounded-none border border-border px-6 text-sm font-medium transition-colors hover:bg-muted'
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className='border-b border-border/30 py-20'>
        <div className='mx-auto max-w-6xl px-6'>
          <h2 className='text-center text-2xl font-bold tracking-tight sm:text-3xl'>
            How It Works
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-center text-muted-foreground'>
            Three simple steps to automated code reviews on every pull request.
          </p>
          <div className='mt-12 grid gap-8 sm:grid-cols-3'>
            <StepCard
              step='01'
              icon={<GithubLogo className='size-6' />}
              title='Connect GitHub'
              description='Install the MergeLens GitHub App on your account or organization. Select which repositories to monitor.'
            />
            <StepCard
              step='02'
              icon={<Database className='size-6' />}
              title='Sync Your Codebase'
              description="Optionally sync your repo's codebase so the AI understands your project's patterns and conventions."
            />
            <StepCard
              step='03'
              icon={<Robot className='size-6' />}
              title='Get AI Reviews'
              description='Open a PR and receive a detailed AI review comment within seconds — covering bugs, security, and best practices.'
            />
          </div>
        </div>
      </section>

      <section className='border-b border-border/30 py-20'>
        <div className='mx-auto max-w-6xl px-6'>
          <h2 className='text-center text-2xl font-bold tracking-tight sm:text-3xl'>
            Built for Serious Developers
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-center text-muted-foreground'>
            Every feature designed to catch real issues, not nitpick style.
          </p>
          <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <FeatureCard
              icon={<ShieldCheck className='size-5 text-red-500' />}
              title='Security Analysis'
              description='Detects injection risks, exposed secrets, auth bypass, and unsafe deserialization patterns.'
            />
            <FeatureCard
              icon={<Lightning className='size-5 text-amber-500' />}
              title='Performance Review'
              description='Flags N+1 queries, unnecessary loops, missing indexes, and memory leaks.'
            />
            <FeatureCard
              icon={<Code className='size-5 text-blue-500' />}
              title='Bug Detection'
              description='Catches logic errors, off-by-one bugs, race conditions, and unhandled edge cases.'
            />
            <FeatureCard
              icon={<GitPullRequest className='size-5 text-purple-500' />}
              title='Contextual Reviews'
              description='Understands your codebase through vector embeddings for reviews that respect your patterns.'
            />
            <FeatureCard
              icon={<GithubLogo className='size-5 text-foreground' />}
              title='GitHub Native'
              description='Reviews appear as PR comments — no extra tools, dashboards, or workflows needed.'
            />
            <FeatureCard
              icon={<Robot className='size-5 text-green-500' />}
              title='Actionable Feedback'
              description="Every finding explains why it's a problem and suggests a specific fix. No vague advice."
            />
          </div>
        </div>
      </section>

      <section id='pricing' className='border-b border-border/30 py-20'>
        <div className='mx-auto max-w-6xl px-6'>
          <h2 className='text-center text-2xl font-bold tracking-tight sm:text-3xl'>
            Simple, Transparent Pricing
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-center text-muted-foreground'>
            Start free. Upgrade when you need more.
          </p>
          <div className='mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2'>
            <div className='flex flex-col rounded-none border border-border p-6'>
              <h3 className='text-lg font-semibold'>Free</h3>
              <p className='mt-1 text-3xl font-bold'>
                ₹0
                <span className='text-sm font-normal text-muted-foreground'>
                  /month
                </span>
              </p>
              <ul className='mt-6 flex-1 space-y-3'>
                <PricingFeature>Up to 5 AI reviews per month</PricingFeature>
                <PricingFeature>Public &amp; private repos</PricingFeature>
                <PricingFeature>Community support</PricingFeature>
              </ul>
              <Link
                href='/sign-in'
                className='mt-6 inline-flex h-10 items-center justify-center rounded-none border border-border text-sm font-medium transition-colors hover:bg-muted'
              >
                Get Started Free
              </Link>
            </div>
            <div className='relative flex flex-col rounded-none border-2 border-green-500/50 p-6'>
              <span className='absolute -top-3 left-4 rounded-none bg-green-600 px-2 py-0.5 text-xs font-medium text-white'>
                Popular
              </span>
              <h3 className='text-lg font-semibold'>Pro</h3>
              <p className='mt-1 text-3xl font-bold'>
                ₹499
                <span className='text-sm font-normal text-muted-foreground'>
                  /month
                </span>
              </p>
              <ul className='mt-6 flex-1 space-y-3'>
                <PricingFeature>Unlimited AI reviews</PricingFeature>
                <PricingFeature>Public &amp; private repos</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
                <PricingFeature>Codebase context sync</PricingFeature>
              </ul>
              <Link
                href='/sign-in'
                className='mt-6 inline-flex h-10 items-center justify-center rounded-none bg-green-600 text-sm font-medium text-white transition-colors hover:bg-green-700'
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className='py-8'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row'>
          <div className='flex items-center gap-2'>
            <Image
              src='/logo2.svg'
              alt=''
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-sm text-muted-foreground'>MergeLens</span>
          </div>
          <p className='text-xs text-muted-foreground'>
            &copy; {new Date().getFullYear()} MergeLens. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='flex size-14 items-center justify-center rounded-none border border-border bg-muted'>
        {icon}
      </div>
      <span className='mt-4 text-xs font-medium text-muted-foreground'>
        STEP {step}
      </span>
      <h3 className='mt-1 font-semibold'>{title}</h3>
      <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
        {description}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='rounded-none border border-border p-5 transition-colors hover:border-foreground/20 hover:bg-muted/30'>
      <div className='flex size-9 items-center justify-center rounded-none border border-border bg-muted'>
        {icon}
      </div>
      <h3 className='mt-3 font-medium'>{title}</h3>
      <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
        {description}
      </p>
    </div>
  );
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className='flex items-center gap-2 text-sm text-muted-foreground'>
      <CheckCircle className='size-4 shrink-0 text-green-500' />
      {children}
    </li>
  );
}
