import { FileText, PuzzlePiece, Key, HandPalm, ArrowRight } from "@phosphor-icons/react";
import { Reveal, PrimaryButton } from "./primitives.jsx";

const GUARANTEES = [
  {
    icon: FileText,
    label: "A fixed quote",
    body: "Agreed in writing before any work starts.",
  },
  {
    icon: PuzzlePiece,
    label: "Priced per piece",
    body: "Start small. Add only what earns its place.",
  },
  {
    icon: Key,
    label: "You own it all",
    body: "Full IP, on your own accounts.",
  },
  {
    icon: HandPalm,
    label: "No lock-in",
    body: "Pause or stop between stages.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="overflow-hidden rounded-[24px] border border-line bg-surface-raised">
          {/* Statement */}
          <div className="px-7 pt-12 sm:px-12 lg:px-16 lg:pt-16">
            <Reveal>
              <p className="mb-4 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-accent-text">
                Pricing
              </p>
              <h2 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Every build is quoted.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-[58ch] font-sans text-lg leading-relaxed text-navy-500">
                No two builds are the same, we don&rsquo;t sell fixed packages.
                We&rsquo;ll scope your specific problem, then put a firm price on
                it before a line of code is written.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-5xl font-extrabold tracking-tight text-navy lg:text-6xl">
                  from A$2,700
                </span>
                <span className="font-sans text-[15px] text-navy-300">
                  for a first system, fixed once scoped
                </span>
              </div>
            </Reveal>
          </div>

          {/* Guarantee strip — hairline-separated, distinct from the card grids */}
          <div className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map(({ icon: Icon, label, body }, i) => (
              <Reveal
                key={label}
                delay={i * 0.06}
                className={`border-line px-7 py-8 sm:px-8 ${
                  i > 0 ? "border-t sm:border-t-0" : ""
                } ${i % 2 === 1 ? "sm:border-l" : ""} ${
                  i > 1 ? "sm:border-t" : ""
                } lg:border-t-0 ${i > 0 ? "lg:border-l" : ""}`}
              >
                <Icon weight="regular" className="h-6 w-6 text-accent-text" />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-navy">
                  {label}
                </h3>
                <p className="mt-1.5 font-sans text-[14.5px] leading-snug text-navy-500">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Anchor / CTA bar */}
          <div className="flex flex-col gap-5 border-t border-line px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-16">
            <p className="max-w-[44ch] font-sans text-[15px] leading-relaxed text-navy-500">
              No obligation. If software is not worth building for your problem,
              we will tell you.
            </p>
            <PrimaryButton href="/contact" className="shrink-0">
              Book a call
              <ArrowRight weight="bold" className="h-4 w-4" />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
