import React from "react";

interface SecurityFeature {
  readonly title: string;
  readonly description: React.ReactNode;
  readonly icon: React.ReactNode;
}

interface VerificationRow {
  readonly label: string;
  readonly value: React.ReactNode;
}

const SECURITY_FEATURES: readonly SecurityFeature[] = [
  {
    title: "Edge middleware",
    description: (
      <>
        Every request to{" "}
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
          /dashboard/*
        </code>{" "}
        is validated at the edge and rejected before it wakes a serverless
        function.
      </>
    ),
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        className='w-3.75 h-3.75'
        aria-hidden='true'
      >
        <rect x='3' y='11' width='18' height='10' rx='0' />
        <path d='M7 11V7a5 5 0 0110 0v4' />
      </svg>
    ),
  },
  {
    title: "Row-level tenancy",
    description: (
      <>
        Every GitHub-scoped query filters strictly by{" "}
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
          installationId
        </code>{" "}
        — no cross-tenant reads are structurally possible.
      </>
    ),
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        className='w-3.75 h-3.75'
        aria-hidden='true'
      >
        <path d='M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z' />
      </svg>
    ),
  },
  {
    title: "Idempotency by design",
    description: (
      <>
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
          headSha
        </code>{" "}
        tracks the exact commit reviewed — duplicate webhook deliveries never
        trigger duplicate LLM calls.
      </>
    ),
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        className='w-3.75 h-3.75'
        aria-hidden='true'
      >
        <path d='M12 8v4l3 3M12 3a9 9 0 100 18 9 9 0 000-18z' />
      </svg>
    ),
  },
] as const;

const VERIFICATION_ROWS: readonly VerificationRow[] = [
  { label: "payload", value: "raw request body" },
  { label: "computed", value: "hmac_sha256(secret, body)" },
  { label: "received", value: "sha256=7f3a9c...e21d" },
  {
    label: "result",
    value: (
      <span className='text-ml-diff-add flex items-center gap-1.5'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          className='w-3 h-3'
          aria-hidden='true'
        >
          <path d='M20 6L9 17l-5-5' />
        </svg>
        signatures match
      </span>
    ),
  },
] as const;

export function SecurityStrip() {
  return (
    <section
      className='bg-ml-bg-raised border-y border-ml-border py-20 md:py-30 px-5 md:px-8'
      id='security'
    >
      <div className='max-w-300 mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.85fr] gap-12 md:gap-17.5 items-start'>
        <div>
          <div className='max-w-165 mb-10 md:mb-16 reveal'>
            <div className='inline-flex items-center gap-2.25 font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted'>
              <span
                className='w-2.5 md:w-2.75 h-2.5 md:h-2.75 -mt-px md:-mt-px bg-ml-accent shrink-0'
                aria-hidden='true'
              />
              Security & Infra
            </div>
            <h2 className='font-syne text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em] leading-[1.15] mt-4.5'>
              Zero-trust by default.
            </h2>
            <p className='font-manrope mt-4 text-ml-text-muted text-[12.5px] md:text-[15px] leading-[1.7] max-w-140'>
              Every webhook is cryptographically verified before it touches
              business logic, and every protected route is checked at the edge —
              before a serverless function even wakes up.
            </p>
          </div>

          <div className='flex flex-col gap-0 mt-9'>
            {SECURITY_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className='py-5 md:py-5.5 border-t border-ml-border flex gap-4 last:border-b reveal'
              >
                <div className='w-8.5 h-8.5 shrink-0 border border-ml-border-strong flex items-center justify-center text-ml-accent'>
                  {feature.icon}
                </div>
                <div>
                  <h3 className='font-syne text-[14.5px] md:text-[15.5px] font-semibold mb-1 text-ml-text'>
                    {feature.title}
                  </h3>
                  <p className='font-manrope text-[12.5px] md:text-[13.5px] text-ml-text-muted leading-[1.65] max-w-105'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='border border-ml-border bg-ml-surface reveal'>
          <div className='p-3.5 md:p-4.5 border-b border-ml-border font-ml-mono text-[11px] md:text-[11.5px] text-ml-text-dim flex justify-between flex-wrap gap-y-1.5 gap-x-4'>
            <span>POST /api/github/webhook</span>
            <span>x-hub-signature-256</span>
          </div>
          <div className='p-5 md:p-5.5 font-ml-mono text-[11.5px] md:text-[12px] leading-loose'>
            {VERIFICATION_ROWS.map((row) => (
              <div
                key={row.label}
                className='flex justify-between items-center py-2 md:py-2.5 border-b border-dashed border-ml-border last:border-b-0'
              >
                <span className='text-ml-text-dim'>{row.label}</span>
                <span className='text-ml-text-muted'>{row.value}</span>
              </div>
            ))}
          </div>
          <div className='mt-1 p-3.5 md:p-4.5 border-t border-ml-border bg-ml-diff-add-bg font-ml-mono text-[11px] md:text-[11.5px] text-ml-diff-add flex justify-between items-center flex-wrap gap-y-1 gap-x-4'>
            <span>request accepted</span>
            <span>enqueued to inngest · 200 OK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
