import {
  Notepad,
  PhoneSlash,
  ArrowsClockwise,
  ChartBar,
} from "@phosphor-icons/react";
import { Reveal } from "./primitives.jsx";

const SIGNS = [
  {
    icon: Notepad,
    text: "Quotes, jobs and invoices tracked across spreadsheets and sticky notes.",
  },
  {
    icon: PhoneSlash,
    text: "New enquiries slip through the cracks when everyone is on the tools.",
  },
  {
    icon: ArrowsClockwise,
    text: "The same job details get re-typed into three different systems.",
  },
  {
    icon: ChartBar,
    text: "Reporting means one person exporting and reconciling by hand.",
  },
];

export default function Audience() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-navy sm:text-4xl lg:text-5xl">
            You have outgrown the tools that got you here.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[62ch] font-sans text-lg leading-relaxed text-navy-500">
            The work is solid and the demand is real. What holds you back sits
            underneath it: spreadsheets, inboxes and off-the-shelf apps that
            never quite fit how you operate. That is the part we rebuild around
            you.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {SIGNS.map(({ icon: Icon, text }, i) => (
            <Reveal
              key={text}
              delay={i * 0.06}
              className="flex items-start gap-4 bg-surface-raised p-7 lg:p-9"
            >
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-navy">
                <Icon weight="regular" className="h-[22px] w-[22px]" />
              </span>
              <p className="font-sans text-[17px] leading-snug text-navy">
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
