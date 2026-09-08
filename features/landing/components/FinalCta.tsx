import Link from "next/link";

export function FinalCta() {
  return (
    <section className='py-24 md:py-36 px-5 md:px-8 bg-ml-surface border-t border-ml-border'>
      <div className='max-w-175 mx-auto text-center reveal'>
        <div className='inline-flex items-center justify-center gap-2.25 font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted'>
          <span
            className='w-2.5 md:w-2.75 h-2.5 md:h-2.75 -mt-px md:-mt-px bg-ml-accent shrink-0'
            aria-hidden='true'
          />
          Get Started
        </div>
        <h2 className='font-syne text-[clamp(30px,4.5vw,48px)] font-bold tracking-tight leading-[1.1] mt-4.5'>
          Give your reviewer the context it&apos;s been missing.
        </h2>
        <p className='font-manrope mt-4 md:mt-5 text-ml-text-muted text-[13.5px] md:text-[16px] leading-[1.65] max-w-140 mx-auto'>
          Install the GitHub App, sync one repository, and open a pull request.
          The first review lands in minutes.
        </p>
        <div className='flex items-center justify-center gap-3 mt-8 md:mt-9 flex-wrap'>
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
            Read the architecture<span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
