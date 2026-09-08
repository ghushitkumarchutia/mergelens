import React from "react";

interface EngineStep {
  readonly number: string;
  readonly title: string;
  readonly desc: React.ReactNode;
}

const STEPS_DATA: readonly EngineStep[] = [
  {
    number: "01",
    title: "Fetch",
    desc: "Recursively pull the git tree using a short-lived, installation-scoped token.",
  },
  {
    number: "02",
    title: "Semantic chunking",
    desc: "Split files into logical windows, tagged with filename and line-range metadata.",
  },
  {
    number: "03",
    title: "Embedding creation",
    desc: "Each chunk becomes a high-dimensional vector representing its semantic meaning.",
  },
  {
    number: "04",
    title: "Vector storage",
    desc: (
      <>
        Upserted into a namespace derived from{" "}
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
          owner--repo-name
        </code>
        , isolating every repo&apos;s search space.
      </>
    ),
  },
  {
    number: "05",
    title: "Status update",
    desc: (
      <>
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
          RepoSync.status
        </code>{" "}
        flips to{" "}
        <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
          synced
        </code>
        , and the dashboard reflects it immediately.
      </>
    ),
  },
] as const;

const VECTOR_GRID_CELLS: readonly boolean[] = [
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  false,
] as const;

export function Engine() {
  return (
    <section
      className='bg-ml-bg-raised border-y border-ml-border py-20 md:py-30 px-5 md:px-8'
      id='engine'
    >
      <div className='max-w-300 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-17.5 items-center'>
        <div className='reveal'>
          <div className='max-w-165 mb-8'>
            <div className='inline-flex items-center gap-2.25 font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted'>
              <span
                className='w-2.5 md:w-2.75 h-2.5 md:h-2.75 -mt-px md:-mt-px bg-ml-accent shrink-0'
                aria-hidden='true'
              />
              The RepoSync Engine
            </div>
            <h2 className='font-syne text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em] leading-[1.15] mt-4.5'>
              Five durable steps, one source of truth.
            </h2>
          </div>

          <div className='flex flex-col'>
            {STEPS_DATA.map((step) => (
              <div
                className='flex gap-4 py-4 border-t border-ml-border last:border-b'
                key={step.number}
              >
                <div className='font-ml-mono text-[11.5px] md:text-[12px] text-ml-text-dim w-5 shrink-0 pt-0.5'>
                  {step.number}
                </div>
                <div>
                  <h3 className='font-syne text-[14.5px] md:text-[15.5px] font-semibold mb-1 text-ml-text'>
                    {step.title}
                  </h3>
                  <p className='font-manrope text-[12.5px] md:text-[13.5px] text-ml-text-muted leading-[1.65] max-w-100'>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='border border-ml-border bg-ml-surface p-0 reveal'>
          <div className='p-3.5 md:p-4.5 border-b border-ml-border flex justify-between items-center font-ml-mono text-[11px] md:text-[11.5px] text-ml-text-dim'>
            <span>sync-repo-codebase.ts</span>
            <span className='text-ml-diff-add flex items-center gap-1.5'>
              <span
                className='w-1.25 h-1.25 bg-ml-diff-add rounded-full'
                aria-hidden='true'
              />
              step 4 of 5
            </span>
          </div>

          <div className='p-5 md:p-5.5'>
            <div className='flex items-center gap-0 mb-6.5'>
              <div className='flex-1 text-center py-2.5 md:py-3 px-1 md:px-1.5 border border-ml-border font-ml-mono text-[8.5px] md:text-[10.5px] font-semibold tracking-[0.04em] relative bg-ml-surface-2 text-ml-diff-add'>
                FETCH
              </div>
              <div
                className="w-3 md:w-5 h-px bg-ml-border-strong shrink-0 relative after:content-[''] after:absolute after:right-0 after:top-[-2.5px] after:w-0 after:h-0 after:border-t-[2.5px] after:border-t-transparent after:border-b-[2.5px] after:border-b-transparent after:border-l-4 after:border-l-ml-border-strong"
                aria-hidden='true'
              />
              <div className='flex-1 text-center py-2.5 md:py-3 px-1 md:px-1.5 border border-ml-border font-ml-mono text-[8.5px] md:text-[10.5px] font-semibold tracking-[0.04em] relative bg-ml-surface-2 text-ml-diff-add'>
                CHUNK
              </div>
              <div
                className="w-3 md:w-5 h-px bg-ml-border-strong shrink-0 relative after:content-[''] after:absolute after:right-0 after:top-[-2.5px] after:w-0 after:h-0 after:border-t-[2.5px] after:border-t-transparent after:border-b-[2.5px] after:border-b-transparent after:border-l-4 after:border-l-ml-border-strong"
                aria-hidden='true'
              />
              <div className='flex-1 text-center py-2.5 md:py-3 px-1 md:px-1.5 border border-ml-border font-ml-mono text-[8.5px] md:text-[10.5px] font-semibold tracking-[0.04em] relative bg-ml-surface-2 text-ml-diff-add'>
                EMBED
              </div>
              <div
                className="w-3 md:w-5 h-px bg-ml-border-strong shrink-0 relative after:content-[''] after:absolute after:right-0 after:top-[-2.5px] after:w-0 after:h-0 after:border-t-[2.5px] after:border-t-transparent after:border-b-[2.5px] after:border-b-transparent after:border-l-4 after:border-l-ml-border-strong"
                aria-hidden='true'
              />
              <div className='flex-1 text-center py-2.5 md:py-3 px-1 md:px-1.5 border border-ml-accent font-ml-mono text-[8.5px] md:text-[10.5px] font-semibold tracking-[0.04em] relative bg-ml-accent-wash text-ml-text'>
                STORE
              </div>
            </div>

            <div className='font-ml-mono text-[11px] md:text-[11.5px] text-ml-text-dim bg-ml-surface-2 border border-ml-border p-3 md:p-3.5 flex justify-between items-center'>
              <span>namespace</span>
              <b className='text-ml-accent font-medium'>mergelens</b>
            </div>

            <div className='mt-4 grid grid-cols-12 gap-1' aria-hidden='true'>
              {VECTOR_GRID_CELLS.map((on, i) => (
                <span
                  key={i}
                  className={`aspect-square ${
                    on
                      ? "bg-ml-accent-dim border-ml-accent"
                      : "bg-ml-surface-2 border-ml-border"
                  } border`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
