import React from "react";

interface WorkflowStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly icon: React.ReactNode;
}

const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    step: "01 / IDENTITY",
    title: "App installation",
    description:
      "Better Auth handles GitHub OAuth for identity. A separate GitHub App install grants repo access — the two are deliberately decoupled, so login never implies code access.",
    tags: ["Better Auth", "Octokit"],
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        className='w-4.25 h-4.25'
        aria-hidden='true'
      >
        <circle cx='12' cy='8' r='4' />
        <path d='M4 20c0-4 4-6 8-6s8 2 8 6' />
      </svg>
    ),
  },
  {
    step: "02 / INGEST",
    title: "Codebase sync",
    description:
      "The Inngest worker mints an installation JWT, walks the git tree, chunks source into 500–1k token windows, and embeds each chunk before upserting to a per-repo Pinecone namespace.",
    tags: ["Inngest", "Pinecone"],
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        className='w-4.25 h-4.25'
        aria-hidden='true'
      >
        <path d='M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2' />
      </svg>
    ),
  },
  {
    step: "03 / REVIEW",
    title: "Webhook → review",
    description:
      "A push fires an HMAC-verified webhook. The diff is embedded, queried against the repo's namespace, assembled into a prompt with the retrieved context, and posted back as a PR comment.",
    tags: ["HMAC SHA-256", "OpenRouter"],
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        className='w-4.25 h-4.25'
        aria-hidden='true'
      >
        <path d='M9 12l2 2 4-4M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z' />
      </svg>
    ),
  },
] as const;

export function Pipeline() {
  return (
    <section className='pt-20 md:pt-30 px-5 md:px-8 pb-0' id='pipeline'>
      <div className='max-w-300 mx-auto'>
        <div className='max-w-165 mb-10 md:mb-16 reveal'>
          <div className='inline-flex items-center gap-2.25 font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted'>
            <span
              className='w-2.5 md:w-2.75 h-2.5 md:h-2.75 -mt-px md:-mt-px bg-ml-accent shrink-0'
              aria-hidden='true'
            />
            How It Works
          </div>
          <h2 className='font-syne text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em] leading-[1.15] mt-4.5'>
            Three workflows. Zero idle compute.
          </h2>
          <p className='font-manrope mt-4 text-ml-text-muted text-[12.5px] md:text-[15px] leading-[1.7] max-w-140'>
            Every heavy operation is handed off the moment it&apos;s received.
            The HTTP request enqueues an event and returns — Inngest carries the
            rest, with automatic retries if a step fails partway through.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 border border-ml-border border-b-0'>
          {WORKFLOW_STEPS.map((workflow) => (
            <div
              key={workflow.step}
              className='p-7 md:p-8 md:pb-10 border-b border-ml-border md:border-r md:nth-[3n]:border-r-0 relative transition-colors duration-200 hover:bg-ml-surface reveal'
            >
              <div className='font-ml-mono text-[11.5px] md:text-[12px] text-ml-text-dim flex items-center justify-between'>
                {workflow.step}
              </div>
              <div className='w-9.5 h-9.5 border border-ml-border-strong flex items-center justify-center my-5 text-ml-accent'>
                {workflow.icon}
              </div>
              <h3 className='font-syne text-[17px] md:text-[18px] font-semibold tracking-[-0.01em] mb-2.25 text-ml-text'>
                {workflow.title}
              </h3>
              <p className='font-manrope text-[13.5px] text-ml-text-muted leading-[1.65]'>
                {workflow.description}
              </p>
              <div className='mt-4.5 flex gap-1.5 flex-wrap'>
                {workflow.tags.map((tag) => (
                  <span
                    key={tag}
                    className='font-ml-mono text-[10.5px] text-ml-text-dim border border-ml-border py-0.75 px-1.75'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
