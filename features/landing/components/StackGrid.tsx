import React from "react";

interface StackItem {
  readonly title: string;
  readonly badge: string;
  readonly desc: React.ReactNode;
}

const STACK_ITEMS: readonly StackItem[] = [
  {
    title: "Next.js 16",
    badge: "APP ROUTER",
    desc: "Nested routing, streaming SSR, and Server Components on Turbopack.",
  },
  {
    title: "Prisma + adapter-pg",
    badge: "ORM",
    desc: (
      <>
        Native{" "}
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11px]'>
          pg
        </code>{" "}
        driver instead of the Rust engine — no pool exhaustion on the edge.
      </>
    ),
  },
  {
    title: "Better Auth",
    badge: "v1.6",
    desc: "Database sessions by default, avoiding the risks of stateless JWTs.",
  },
  {
    title: "Inngest",
    badge: "v4.5",
    desc: "Durable execution — a crashed step retries alone, not the whole run.",
  },
  {
    title: "Pinecone",
    badge: "VECTOR DB",
    desc: "Namespaced per repository, so context never bleeds across tenants.",
  },
  {
    title: "OpenRouter",
    badge: "AI GATEWAY",
    desc: "Swap Claude, GPT-4o, or local Llama models without touching business logic.",
  },
  {
    title: "Tailwind v4",
    badge: "CSS",
    desc: (
      <>
        CSS-variable driven, no{" "}
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11px]'>
          config.js
        </code>
        , compiled through native PostCSS.
      </>
    ),
  },
  {
    title: "React Query",
    badge: "DATA",
    desc: "Caching, dedup, and background refetch for every dashboard list.",
  },
] as const;

export function StackGrid() {
  return (
    <section className='py-20 md:py-30 px-5 md:px-8' id='stack'>
      <div className='max-w-300 mx-auto'>
        <div className='max-w-165 mb-10 md:mb-16 reveal'>
          <div className='inline-flex items-center gap-2.25 font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted'>
            <span
              className='w-2.5 md:w-2.75 h-2.5 md:h-2.75 -mt-px md:-mt-px bg-ml-accent shrink-0'
              aria-hidden='true'
            />
            Under The Hood
          </div>
          <h2 className='font-syne text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em] leading-[1.15] mt-4.5'>
            Chosen for serverless, not despite it.
          </h2>
          <p className='font-manrope mt-4 text-ml-text-muted text-[12.5px] md:text-[15px] leading-[1.7] max-w-140'>
            Every piece was picked because it survives cold starts,
            connection-pool exhaustion, and Lambda timeouts — the three ways
            background AI work usually breaks.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ml-border border border-ml-border reveal'>
          {STACK_ITEMS.map((item) => (
            <div
              key={item.title}
              className='bg-ml-bg p-6 md:p-6.5 transition-colors duration-150 hover:bg-ml-surface'
            >
              <div className='flex items-center justify-between mb-3.5'>
                <h3 className='font-syne text-[14.5px] md:text-[15px] font-semibold tracking-[-0.01em] text-ml-text'>
                  {item.title}
                </h3>
                <span className='font-ml-mono text-[9.5px] text-ml-text-dim border border-ml-border py-0.5 px-1.5'>
                  {item.badge}
                </span>
              </div>
              <p className='font-manrope text-[12.5px] md:text-[13px] text-ml-text-muted leading-[1.65]'>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
