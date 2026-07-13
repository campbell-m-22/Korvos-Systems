import { ShieldCheck, FileText, Path } from "@phosphor-icons/react";
import { Reveal } from "./primitives.jsx";

/* Trust section. Same navy left-heading + right-numbered-list format as before,
   with the "new as a name, not as a team" copy folded in. */
const POINTS = [
  {
    icon: ShieldCheck,
    title: "No lock-in",
    body: "Everything runs on your own accounts and is handed over in full. You can walk away and keep it all.",
  },
  {
    icon: FileText,
    title: "Nothing hidden",
    body: "Fixed quotes in writing before any work starts. No open-ended retainers, no surprise invoices.",
  },
  {
    icon: Path,
    title: "Proof before scale",
    body: "One system live and earning in your business before we build the next. The results come first.",
  },
];

export default function Approach() {
  return (
    <section id="why-us" className="bg-navy-deep px-5 py-24 text-white sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-12">
        {/* Left — heading block (sticky on desktop) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[44px]">
                We are new as a name, not as a team.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[48ch] font-sans text-lg leading-relaxed text-white/70">
                Korvos Systems is the consulting arm of Korvos, the AML
                compliance platform we built for Australian real-estate
                agencies. Same developers, same standard, pointed at your
                business instead of a regulator's.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right — numbered reassurances */}
        <div className="lg:col-span-7">
          <ul className="flex flex-col">
            {POINTS.map(({ icon: Icon, title, body }, i) => (
              <Reveal
                key={title}
                delay={i * 0.08}
                className="border-t border-white/12 py-9 first:border-t-0 first:pt-0"
              >
                <li className="grid grid-cols-[auto_1fr] gap-5 sm:gap-7">
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-display text-2xl font-extrabold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon weight="regular" className="h-6 w-6 text-white/50" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-[54ch] font-sans text-[16px] leading-relaxed text-white/70">
                      {body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
