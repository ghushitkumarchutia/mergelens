import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

interface FooterSection {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Pipeline", href: "#pipeline" },
      { label: "RAG Engine", href: "#engine" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Technical",
    links: [
      { label: "Stack", href: "#stack" },
      { label: "Security", href: "#security" },
      { label: "Changelog", href: "#top" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#top" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Contact", href: "#top" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className='border-t border-ml-border px-5 md:px-8 py-10 md:pt-16 md:pb-12'>
      <div className='max-w-300 mx-auto flex flex-col lg:flex-row justify-between gap-10'>
        <div className='max-w-85'>
          <Link
            href='#top'
            className='inline-flex items-center gap-2 font-syne font-semibold text-base text-ml-text hover:opacity-90 transition-opacity select-none'
          >
            <Image
              src='/icons/logo.svg'
              alt='MergeLens'
              width={22}
              height={22}
              className='w-5.5 h-5.5 object-contain shrink-0'
            />
            <span>MergeLens</span>
          </Link>
          <p className='font-manrope mt-3.5 text-[13px] text-ml-text-muted leading-[1.65]'>
            An event-driven, RAG-native pull request reviewer. Built on
            Feature-Sliced Design, durable orchestration, and
            retrieval-augmented generation.
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-14'>
          {FOOTER_SECTIONS.map((section) => (
            <div className='flex flex-col' key={section.title}>
              <h4 className='font-ml-mono text-[11.5px] font-medium tracking-[0.06em] uppercase text-ml-text mb-4'>
                {section.title}
              </h4>
              <ul className='flex flex-col gap-2.5'>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='font-manrope text-[13.5px] text-ml-text-muted transition-colors duration-150 hover:text-ml-text'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='max-w-300 mx-auto mt-12 md:mt-16 pt-5 border-t border-ml-border flex flex-col sm:flex-row justify-between items-center gap-4 text-[11.5px] text-ml-text-dim'>
        <span className='font-manrope'>
          © {new Date().getFullYear()} MergeLens. All rights reserved.
        </span>
        <div className='inline-flex items-center gap-2 font-ml-mono text-[11px] text-ml-diff-add border border-ml-border py-1 px-2.5 bg-ml-surface select-none'>
          <span
            className='w-1.5 h-1.5 bg-ml-diff-add rounded-full animate-[pulse-dot_2s_ease-in-out_infinite]'
            aria-hidden='true'
          />
          All systems operational
        </div>
      </div>
    </footer>
  );
}
