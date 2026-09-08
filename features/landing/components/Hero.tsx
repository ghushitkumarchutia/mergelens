import Link from "next/link";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

interface TechStackItem {
  readonly name: string;
}

const TECH_STACK: readonly TechStackItem[] = [
  { name: "GitHub Apps" },
  { name: "Next.js" },
  { name: "Vercel" },
  { name: "PostgreSQL" },
  { name: "Pinecone" },
  { name: "Inngest" },
] as const;

export function Hero() {
  return (
    <section className='relative z-1 pt-29 md:pt-38 px-5 md:px-8 overflow-hidden'>
      <BackgroundRippleEffect />
      <div className='max-w-300 mx-auto text-center relative z-10'>
        <div className='inline-flex items-center justify-center gap-2.25 py-1.25 px-3.75 rounded-none border border-ml-border bg-white/60 dark:bg-white/4 backdrop-blur-[10px] backdrop-saturate-[1.3] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted mb-5.5 reveal'>
          <span
            className='w-2 md:w-2.5 h-2 md:h-2.5 mt-[-0.07em] bg-ml-accent shrink-0 animate-pulse'
            aria-hidden='true'
          />
          RAG-Native PR Review
        </div>
        <h1 className='font-syne text-[clamp(38px,6vw,74px)] font-extrabold tracking-[-0.035em] leading-[1.03] uppercase max-w-350 mx-auto reveal'>
          Every pull request,
          <br />
          <span className='text-ml-text-dim'>reviewed with full context.</span>
        </h1>
        <p className='font-manrope max-w-140 md:max-w-195 mx-auto mt-3 md:mt-6 text-ml-text-muted text-[12.5px] md:text-[17px] leading-[1.6] reveal'>
          MergeLens embeds your entire codebase into Pinecone and retrieves the
          exact functions and files a diff touches — so the model reviews
          against your architecture, not just eleven changed lines.
        </p>
        <div className='flex items-center justify-center gap-3 mt-6 md:mt-9 flex-wrap reveal'>
          <Link
            href='/sign-in'
            className='inline-flex items-center justify-center gap-2 py-2.5 md:py-3.25 px-4 md:px-6 text-[13px] md:text-[14px] font-semibold font-manrope border border-transparent whitespace-nowrap transition-all duration-150 active:translate-y-px bg-ml-text text-ml-bg hover:bg-ml-text/90 dark:hover:bg-white select-none'
          >
            Connect a repository
          </Link>
          <Link
            href='#pipeline'
            className='inline-flex items-center justify-center gap-2 py-2.5 md:py-3.25 px-4 md:px-6 text-[13px] md:text-[14px] font-semibold font-manrope border whitespace-nowrap transition-all duration-150 active:translate-y-px bg-transparent text-ml-text border-ml-border-strong hover:border-ml-text select-none'
          >
            See the pipeline<span aria-hidden='true'> →</span>
          </Link>
        </div>
        <div className='mt-4.5 font-ml-mono text-[11px] md:text-[12px] text-ml-text-dim tracking-[0.01em] px-2.5 md:px-0 reveal'>
          No credit card · Installs as a GitHub App · First review in under 2
          minutes
        </div>

        <div className='relative mt-12 md:mt-19 mx-auto max-w-245 md:max-w-265 perspective-[1800px] reveal'>
          <div className='relative bg-ml-surface border border-ml-border text-left shadow-[0_40px_90px_-50px_rgba(20,20,30,0.25)] dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] overflow-x-hidden md:overflow-x-visible'>
            <div className='flex items-center justify-between flex-wrap gap-y-2 gap-x-3.5 py-3.25 px-4.5 border-b border-ml-border bg-ml-surface-2'>
              <div className='flex items-center gap-3 font-ml-mono text-[12.5px] text-ml-text-muted min-w-0'>
                <div className='flex gap-1.5 shrink-0' aria-hidden='true'>
                  <span className='w-2 h-2 border border-ml-border-strong' />
                  <span className='w-2 h-2 border border-ml-border-strong' />
                  <span className='w-2 h-2 border border-ml-border-strong' />
                </div>
                <span>mergelens · PR #482 · sync-repo-codebase.ts</span>
              </div>
              <div className='flex items-center gap-1.75 font-ml-mono text-[11.5px] text-ml-diff-add py-1 px-2.25 bg-ml-diff-add-bg border border-[#5cb585]/25 shrink-0'>
                <span
                  className='w-1.25 h-1.25 bg-ml-diff-add rounded-full animate-[pulse-dot_2s_ease-in-out_infinite]'
                  aria-hidden='true'
                />
                Review posted
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]'>
              <div className='font-ml-mono text-[12.5px] leading-[1.9] border-r-0 md:border-r border-ml-border border-b md:border-b-0 overflow-x-auto'>
                <div className='flex whitespace-pre'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    96
                  </span>
                  <span className='w-5 shrink-0 text-ml-text-dim'> </span>
                  <span className='text-ml-text-dim pr-4'>
                    {"  "}
                    <span className='text-ml-text-dim italic'>
                      {"// Inngest Step 3: Embedding Creation"}
                    </span>
                  </span>
                </div>
                <div className='flex whitespace-pre'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    97
                  </span>
                  <span className='w-5 shrink-0 text-ml-text-dim'> </span>
                  <span className='text-ml-text-dim pr-4'>
                    {"  "}
                    <span className='text-ml-accent'>async function</span>{" "}
                    <span className='text-ml-text'>embedChunks</span>(chunks){" "}
                    {"{"}
                  </span>
                </div>
                <div className='flex whitespace-pre bg-ml-diff-remove-bg'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    98
                  </span>
                  <span className='w-5 shrink-0 text-ml-diff-remove'>−</span>
                  <span className='text-ml-text-dim line-through decoration-[#d07272]/40 pr-4'>
                    {"    "}
                    <span className='text-ml-accent'>const</span> res ={" "}
                    <span className='text-ml-accent'>await</span> embed(chunks)
                  </span>
                </div>
                <div className='flex whitespace-pre bg-ml-diff-add-bg'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    98
                  </span>
                  <span className='w-5 shrink-0 text-ml-diff-add'>+</span>
                  <span className='text-ml-text pr-4'>
                    {"    "}
                    <span className='text-ml-accent'>const</span> res ={" "}
                    <span className='text-ml-accent'>await</span>{" "}
                    <span className='text-ml-text'>step.run</span>(
                    <span className='text-ml-diff-add'>
                      &apos;embed-batch&apos;
                    </span>
                    , () =&gt;
                  </span>
                </div>
                <div className='flex whitespace-pre bg-ml-diff-add-bg'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    99
                  </span>
                  <span className='w-5 shrink-0 text-ml-diff-add'>+</span>
                  <span className='text-ml-text pr-4'>
                    {"      "}embed(chunks, {"{"} model:{" "}
                    <span className='text-ml-diff-add'>
                      &apos;voyage-code-2&apos;
                    </span>{" "}
                    {"}"}))
                  </span>
                </div>
                <div className='flex whitespace-pre'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    100
                  </span>
                  <span className='w-5 shrink-0 text-ml-text-dim'> </span>
                  <span className='text-ml-text-dim pr-4'>
                    {"    "}
                    <span className='text-ml-accent'>return</span> res.vectors
                  </span>
                </div>
                <div className='flex whitespace-pre'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    101
                  </span>
                  <span className='w-5 shrink-0 text-ml-text-dim'> </span>
                  <span className='text-ml-text-dim pr-4'>
                    {"  "}
                    {"}"}
                  </span>
                </div>
                <div className='flex whitespace-pre bg-ml-diff-add-bg'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    102
                  </span>
                  <span className='w-5 shrink-0 text-ml-diff-add'>+</span>
                  <span className='text-ml-text pr-4'>
                    {"  "}
                    <span className='text-ml-text-dim italic'>
                      {"// namespace vectors per repo before upsert"}
                    </span>
                  </span>
                </div>
                <div className='flex whitespace-pre bg-ml-diff-add-bg'>
                  <span className='w-9.5 shrink-0 text-right pr-3.5 text-ml-text-dim select-none'>
                    103
                  </span>
                  <span className='w-5 shrink-0 text-ml-diff-add'>+</span>
                  <span className='text-ml-text pr-4'>
                    {"  "}
                    <span className='text-ml-accent'>const</span> ns ={" "}
                    <span className='text-ml-text'>deriveNamespace</span>
                    (repoFullName)
                  </span>
                </div>
              </div>
              <div className='p-4.5 flex flex-col gap-3.5'>
                <div className='flex items-center gap-2 font-ml-mono text-[11px] tracking-wider uppercase text-ml-text-dim'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='w-3 h-3 text-ml-accent'
                    aria-hidden='true'
                  >
                    <path d='M12 2L2 7l10 5 10-5-10-5z' />
                    <path d='M2 17l10 5 10-5M2 12l10 5 10-5' />
                  </svg>
                  AI review · retrieved 6 chunks
                </div>
                <div className='border border-ml-border p-[14px_15px] bg-ml-surface-2'>
                  <div className='flex items-center gap-2 font-ml-mono text-[11.5px] font-semibold text-ml-text mb-2'>
                    <span className='text-[9.5px] font-ml-mono py-0.5 px-1.5 tracking-[0.04em] text-ml-accent bg-ml-accent-wash border border-ml-accent/22'>
                      SUGGESTION
                    </span>
                    step.run wrapping
                  </div>
                  <p className='font-manrope text-[12.5px] text-ml-text-muted leading-[1.6]'>
                    Wrapping the embed call in{" "}
                    <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
                      step.run
                    </code>{" "}
                    matches the durable-execution pattern used in{" "}
                    <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
                      review-pr-function
                    </code>{" "}
                    — retries won&apos;t re-embed already-processed chunks.
                  </p>
                </div>
                <div className='border border-ml-border p-[14px_15px] bg-ml-surface-2'>
                  <div className='flex items-center gap-2 font-ml-mono text-[11.5px] font-semibold text-ml-text mb-2'>
                    <span className='text-[9.5px] font-ml-mono py-0.5 px-1.5 tracking-[0.04em] text-[#D0A15C] bg-[#d0a15c]/10 border border-[#d0a15c]/25'>
                      FLAG
                    </span>
                    Namespace collision risk
                  </div>
                  <p className='font-manrope text-[12.5px] text-ml-text-muted leading-[1.6]'>
                    <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
                      deriveNamespace
                    </code>{" "}
                    isn&apos;t checked against the existing{" "}
                    <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
                      owner--repo-name
                    </code>{" "}
                    convention from{" "}
                    <code className='font-ml-mono text-ml-text bg-ml-surface py-px px-1 text-[11.5px]'>
                      RepoSync
                    </code>{" "}
                    — could split one repo across two namespaces.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between flex-wrap gap-y-1.5 gap-x-4 py-2.75 px-4.5 border-t border-ml-border font-ml-mono text-[11px] text-ml-text-dim'>
              <span>
                text-embedding-3-small · pinecone namespace: mergelens
              </span>
              <div className='flex gap-4 shrink-0'>
                <span>+6 −2</span>
                <span>2 comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 md:mt-14 pb-12 md:pb-20 text-center relative z-10'>
        <div className='font-ml-mono text-[10px] md:text-[13px] tracking-[0.06em] uppercase text-ml-text-dim mb-4 md:mb-8.5 reveal'>
          Built on the same infrastructure your team already trusts
        </div>
        <div className='flex items-center justify-center gap-6 md:gap-12 flex-wrap font-ml-mono text-[18px] md:text-[24px] font-semibold text-ml-text-dim tracking-[-0.01em] cursor-default select-none reveal'>
          {TECH_STACK.map((item) => (
            <span
              key={item.name}
              className='opacity-55 transition-opacity duration-200 hover:opacity-100 cursor-default select-none'
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
