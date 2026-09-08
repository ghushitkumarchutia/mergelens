import Link from "next/link";

interface PricingFeature {
  readonly text: string;
  readonly included: boolean;
}

interface PricingPlan {
  readonly name: string;
  readonly price: string;
  readonly period: string;
  readonly description: string;
  readonly isPopular?: boolean;
  readonly features: readonly PricingFeature[];
  readonly cta: {
    readonly label: string;
    readonly href: string;
    readonly isPrimary: boolean;
  };
}

const PRICING_PLANS: readonly PricingPlan[] = [
  {
    name: "Free",
    price: "₹0",
    period: "/ month",
    description: "For a single repository and small side projects.",
    cta: {
      label: "Install the GitHub App",
      href: "/sign-in",
      isPrimary: false,
    },
    features: [
      { text: "1 repository synced", included: true },
      { text: "25 PR reviews / month", included: true },
      { text: "Standard RAG retrieval", included: true },
      { text: "Priority Inngest queue", included: false },
      { text: "Model selection (OpenRouter)", included: false },
    ],
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/ month, per seat",
    description: "For teams shipping fast, on more than one repo.",
    isPopular: true,
    cta: {
      label: "Start Pro trial",
      href: "/sign-in",
      isPrimary: true,
    },
    features: [
      { text: "Unlimited repositories", included: true },
      { text: "Unlimited PR reviews", included: true },
      { text: "Priority Inngest queue", included: true },
      { text: "Model selection (OpenRouter)", included: true },
      { text: "Session revocation & audit log", included: true },
    ],
  },
] as const;

export function Pricing() {
  return (
    <section className='py-20 md:py-30 px-5 md:px-8' id='pricing'>
      <div className='max-w-165 mx-auto text-center mb-10 md:mb-16 reveal'>
        <div className='inline-flex items-center justify-center gap-2.25 font-ml-mono text-[11.5px] md:text-[12px] font-medium tracking-[0.06em] uppercase text-ml-text-muted'>
          <span
            className='w-2.5 md:w-2.75 h-2.5 md:h-2.75 -mt-px md:-mt-px bg-ml-accent shrink-0'
            aria-hidden='true'
          />
          Pricing
        </div>
        <h2 className='font-syne text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em] leading-[1.15] mt-4.5'>
          Start reviewing for free.
        </h2>
        <p className='font-manrope mt-4 text-ml-text-muted text-[12.5px] md:text-[15px] leading-[1.7] max-w-140 mx-auto'>
          Every plan gets the full RAG pipeline. Pro removes the review ceiling
          and adds priority queueing on Inngest.
        </p>
      </div>

      <div className='max-w-205 mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border border-ml-border reveal'>
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`p-7 md:p-9 relative border-b md:border-b-0 md:first:border-r border-ml-border last:border-b-0 ${
              plan.isPopular ? "bg-ml-surface" : "bg-ml-bg"
            }`}
          >
            {plan.isPopular && (
              <div className='absolute top-0 right-0 font-ml-mono text-[10px] tracking-[0.04em] uppercase text-ml-bg bg-ml-accent py-1 px-2.5 select-none'>
                Recommended
              </div>
            )}
            <div className='font-ml-mono text-[12.5px] md:text-[13px] text-ml-text-muted uppercase tracking-wider'>
              {plan.name}
            </div>
            <div className='mt-4 flex items-baseline gap-1.5'>
              <b className='font-syne text-[38px] md:text-[44px] font-extrabold tracking-[-0.03em] text-ml-text'>
                {plan.price}
              </b>
              <span className='font-manrope text-[13px] md:text-[13.5px] text-ml-text-dim'>
                {plan.period}
              </span>
            </div>
            <p className='font-manrope mt-3 text-[13px] md:text-[13.5px] text-ml-text-muted leading-[1.6] min-h-10'>
              {plan.description}
            </p>

            <ul className='mt-7 flex flex-col gap-3'>
              {plan.features.map((feature) => (
                <li
                  key={feature.text}
                  className={`flex items-start gap-2.5 font-manrope text-[13px] md:text-[13.5px] ${
                    feature.included ? "text-ml-text" : "text-ml-text-dim"
                  }`}
                >
                  {feature.included ? (
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2.5'
                      className='w-3.5 h-3.5 shrink-0 mt-0.75 text-ml-accent'
                      aria-hidden='true'
                    >
                      <path d='M20 6L9 17l-5-5' />
                    </svg>
                  ) : (
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2.5'
                      className='w-3.5 h-3.5 shrink-0 mt-0.75 text-ml-text-dim'
                      aria-hidden='true'
                    >
                      <path d='M18 6L6 18M6 6l12 12' />
                    </svg>
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.cta.href}
              className={`inline-flex items-center justify-center gap-2 py-3 px-6 text-[13.5px] md:text-[14px] font-semibold font-manrope whitespace-nowrap transition-all duration-150 active:translate-y-px w-full mt-8 select-none ${
                plan.cta.isPrimary
                  ? "bg-ml-text text-ml-bg hover:bg-ml-text/90 dark:hover:bg-white border border-transparent"
                  : "bg-transparent text-ml-text border border-ml-border-strong hover:border-ml-text"
              }`}
            >
              {plan.cta.label}
            </Link>
          </div>
        ))}
      </div>

      <div className='max-w-205 mx-auto mt-5 md:mt-6 flex justify-between items-center font-ml-mono text-[11px] md:text-[11.5px] text-ml-text-dim flex-wrap gap-2 reveal'>
        <span>Billed via Razorpay · cancel anytime</span>
        <span>Usage resets on subscription.renewsAt</span>
      </div>
    </section>
  );
}
