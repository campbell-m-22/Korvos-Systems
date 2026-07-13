import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react";
import { Reveal, PrimaryButton } from "./primitives.jsx";

export default function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="px-5 pb-8 pt-8 sm:px-8 lg:pb-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface-raised px-7 py-16 sm:px-12 lg:px-20 lg:py-24">
          {/* Brand wash, single accent, no AI mesh */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(48% 70% at 88% 12%, rgba(255,90,31,0.12), transparent 62%)",
            }}
          />
          <div className="relative max-w-[46ch]">
            <Reveal>
              <h2 className="font-display text-3xl font-extrabold leading-[1.06] tracking-tight text-navy sm:text-4xl lg:text-[52px]">
                Tell us the problem. We will tell you if software can solve it.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[52ch] font-sans text-lg leading-relaxed text-navy-500">
                Book a short call, describe how your business runs, and we will
                scope a first build and quote it for a fixed price. If it is not
                worth doing, we will say so.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryButton href="/contact">
                  Book a call
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </PrimaryButton>
                <motion.a
                  href="mailto:contact@korvos.com.au"
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="inline-flex items-center gap-2 font-sans text-[15px] font-medium text-navy-500 transition-colors hover:text-navy"
                >
                  <EnvelopeSimple weight="regular" className="h-[18px] w-[18px]" />
                  contact@korvos.com.au
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
