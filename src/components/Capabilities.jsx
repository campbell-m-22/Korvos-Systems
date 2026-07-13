import { motion, useReducedMotion } from "motion/react";
import {
  MagnetStraight,
  StackSimple,
  FlowArrow,
  FileText,
  Receipt,
  ChartLineUp,
} from "@phosphor-icons/react";
import { Reveal } from "./primitives.jsx";

/* Six systems, six cells. Bento with rhythm: one tall image hero, one navy
   panel, two small cards, two wide cards. Visual variation across cells. */
const CELLS = [
  {
    icon: MagnetStraight,
    title: "Catch every enquiry",
    body: "Web forms, missed-call text-backs and inbox capture, all logged the moment they land. Nothing waits for someone to get off the tools.",
    variant: "image",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: StackSimple,
    title: "One source of truth",
    body: "A CRM that connects the tools you already run, so a detail entered once shows up everywhere it is needed.",
    variant: "navy",
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: FlowArrow,
    title: "Right job, right person",
    body: "Matching engines that allocate work by your own rules, not by whoever answers first.",
    variant: "plain",
    span: "lg:col-span-1",
  },
  {
    icon: FileText,
    title: "Paperwork that writes itself",
    body: "Quotes, contracts and compliance documents drafted from your data, ready for a human to check and send.",
    variant: "wash",
    span: "lg:col-span-1",
  },
  {
    icon: Receipt,
    title: "Get paid without chasing",
    body: "Invoices raised on completion and reminders that follow up on their own, so cash stops slipping through the week.",
    variant: "plain",
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: ChartLineUp,
    title: "See the whole business",
    body: "Live dashboards built from your own numbers, so the weekly picture is not one person exporting and reconciling by hand.",
    variant: "plain",
    span: "md:col-span-2 lg:col-span-2",
  },
];

function Cell({ cell, index }) {
  const reduce = useReducedMotion();
  const { icon: Icon, title, body, variant, span } = cell;

  const base =
    "group relative flex flex-col justify-end overflow-hidden rounded-card border p-7 lg:p-8";

  const styles = {
    plain: "border-line bg-surface-raised",
    wash: "border-accent/25 bg-accent-wash",
    navy: "border-navy bg-navy text-white",
    image: "border-line bg-navy text-white min-h-[320px] lg:min-h-[420px]",
  };

  const iconWrap = {
    plain: "bg-surface-sunken text-navy",
    wash: "bg-white text-accent",
    navy: "bg-white/10 text-white",
    image: "bg-white/15 text-white backdrop-blur",
  };

  const titleColor = variant === "navy" || variant === "image" ? "text-white" : "text-navy";
  const bodyColor =
    variant === "navy" || variant === "image"
      ? "text-white/75"
      : variant === "wash"
        ? "text-navy/70"
        : "text-navy-500";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
      className={`${base} ${styles[variant]} ${span}`}
    >
      {variant === "image" && (
        <>
          {/* SWAP TARGET: real photo — an operator using a clean custom system. */}
          <img
            src="https://picsum.photos/seed/korvos-systems-lead-capture-worksite/1200/1400"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,30,51,0.25) 0%, rgba(15,30,51,0.9) 92%)",
            }}
          />
        </>
      )}

      <div className="relative">
        <span
          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${iconWrap[variant]}`}
        >
          <Icon weight="regular" className="h-6 w-6" />
        </span>
        <h3
          className={`font-display text-xl font-bold tracking-tight lg:text-2xl ${titleColor}`}
        >
          {title}
        </h3>
        <p className={`mt-3 max-w-[46ch] font-sans text-[15.5px] leading-relaxed ${bodyColor}`}>
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="mb-4 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-accent-text">
            What we build
          </p>
          <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-navy sm:text-4xl lg:text-5xl">
            A few of the things we build.
          </h2>
          <p className="mt-5 max-w-[58ch] font-sans text-lg leading-relaxed text-navy-500">
            These are common starting points, not a fixed catalogue. Most builds
            are something a business could not buy off a shelf, put together from
            parts like these and shaped to fit exactly how you work.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CELLS.map((cell, i) => (
            <Cell key={cell.title} cell={cell} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
