interface StatItem {
  readonly value: string;
  readonly label: string;
}

interface SimilarityChunk {
  readonly label: string;
  readonly score: string;
  readonly hit: boolean;
  readonly width: string;
}

const STATS: readonly StatItem[] = [
  { value: "Top-K", label: "chunks retrieved per diff" },
  { value: "500–1k", label: "tokens per semantic chunk" },
  { value: "1:1", label: "namespace to repository" },
] as const;

const CHUNKS_DATA: readonly SimilarityChunk[] = [
  { label: "webhook.ts", score: "0.94", hit: true, width: "94%" },
  { label: "chunk-code.ts", score: "0.88", hit: true, width: "88%" },
  { label: "repo-sync.ts", score: "0.81", hit: true, width: "81%" },
  { label: "billing.ts", score: "0.73", hit: true, width: "73%" },
  { label: "schema.prisma", score: "0.41", hit: false, width: "41%" },
  { label: "auth-utils.ts", score: "0.22", hit: false, width: "22%" },
] as const;

export function ProblemStatement() {
  return (
    <section className='bg-ml-bg-raised border-y border-ml-border'>
      <div className='py-20 md:py-30 px-5 md:px-8'>
        <div className='max-w-300 mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-12 md:gap-20 items-start'>
          <div className='reveal'>
            <div className='inline-flex items-center gap-2.25 font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted'>
              <span
                className='w-2.5 md:w-2.75 h-2.5 md:h-2.75 mt-[0.08px] md:-mt-px bg-ml-accent shrink-0'
                aria-hidden='true'
              />
              The Context Problem
            </div>
            <h2 className='font-syne text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.02em] leading-[1.22] mt-4.5'>
              A diff shows you{" "}
              <em className='not-italic text-ml-text-dim'>what changed.</em> It
              never shows you what it{" "}
              <em className='not-italic text-ml-text-dim'>touches.</em>
            </h2>
            <p className='font-manrope mt-5 text-ml-text-muted text-[12.5px] md:text-[15px] leading-[1.7] max-w-110'>
              An LLM reading eleven changed lines has no idea those lines are
              called from a billing webhook three files away. MergeLens closes
              that gap with retrieval-augmented generation — the model reviews
              with the surrounding architecture in view, every time.
            </p>
            <div className='grid grid-cols-3 gap-3 md:gap-9 mt-9'>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <b className='block font-ml-mono text-[22px] md:text-[26px] font-bold text-ml-text'>
                    {stat.value}
                  </b>
                  <span className='font-manrope text-[11px] md:text-[12.5px] text-ml-text-dim leading-snug block mt-1'>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='border border-ml-border bg-ml-surface p-5 md:p-6.5 reveal'>
            <div className='flex justify-between items-center mb-5.5 font-ml-mono text-[11px] md:text-[11.5px] text-ml-text-dim tracking-[0.04em] uppercase'>
              <span>pinecone · similarity query</span>
              <span>mergelens</span>
            </div>
            <div className='flex flex-col gap-2.5'>
              {CHUNKS_DATA.map((item) => (
                <div
                  className='flex items-center gap-2.5 md:gap-3'
                  key={item.label}
                >
                  <span className='w-24 md:w-29.5 shrink-0 font-ml-mono text-[11px] md:text-[11.5px] text-ml-text-muted truncate'>
                    {item.label}
                  </span>
                  <div
                    className='flex-1 h-5 bg-ml-surface-2 border border-ml-border relative overflow-hidden'
                    role='progressbar'
                    aria-valuenow={parseFloat(item.score)}
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-label={`${item.label} similarity score: ${item.score}`}
                  >
                    <div
                      className={`h-full relative transition-all duration-300 ${
                        item.hit
                          ? "bg-ml-accent opacity-100"
                          : "opacity-55 bg-[repeating-linear-gradient(135deg,var(--ml-accent-dim)_0px,var(--ml-accent-dim)_5px,transparent_5px,transparent_10px)]"
                      }`}
                      style={{ width: item.width }}
                    />
                  </div>
                  <span className='w-9.5 shrink-0 text-right font-ml-mono text-[10.5px] md:text-[11px] text-ml-text-dim'>
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-5 pt-4 border-t border-ml-border text-[11px] md:text-[11.5px] text-ml-text-dim flex justify-between items-center flex-wrap gap-1.5'>
              <span className='font-manrope'>
                4 of 6 chunks passed threshold
              </span>
              <b className='font-ml-mono text-ml-accent font-semibold'>
                0.70 cutoff
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
