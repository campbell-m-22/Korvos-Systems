import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { PrimaryButton, GhostButton } from "./primitives.jsx";

const EASE = [0.16, 1, 0.3, 1];

const LINE_1 = ["Software", "built", "around"];
const LINE_2 = ["not", "the", "other", "way", "around."];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};
const word = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
export default function Hero() {
  const reduce = useReducedMotion();

  // subtle cursor-following glow (lighter than the panel's)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 20 });
  const sy = useSpring(py, { stiffness: 140, damping: 20 });
  const glowLeft = useTransform(sx, (v) => `${v * 100}%`);
  const glowTop = useTransform(sy, (v) => `${v * 100}%`);

  function handleMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      data-thread-behind
      className="relative z-10 flex min-h-[90dvh] items-center overflow-hidden px-5 pb-16 pt-24 sm:px-8"
    >
      {/* Soft brand wash — layered radial, not an AI mesh blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(52% 60% at 12% 18%, rgba(255,90,31,0.07), transparent 60%), radial-gradient(46% 50% at 88% 82%, rgba(15,30,51,0.05), transparent 55%)",
        }}
      />

      {/* whirling, pulsing glow that softly trails the cursor — kept faint */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{ left: glowLeft, top: glowTop, x: "-50%", y: "-50%" }}
      >
        <motion.div
          className="h-[34rem] w-[34rem] rounded-full opacity-50 blur-[100px]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,90,31,0), rgba(255,90,31,0.16), rgba(255,150,90,0.05), rgba(255,90,31,0.14), rgba(255,90,31,0))",
          }}
          animate={reduce ? undefined : { rotate: 360, scale: [1, 1.12, 1] }}
          transition={{
            rotate: { duration: 34, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px]">
        <motion.h1
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-[20ch] font-display text-[40px] font-extrabold leading-[1.03] tracking-tight text-navy sm:text-6xl lg:text-[72px]"
        >
          <span className="block">
            {LINE_1.map((w) => (
              <motion.span
                key={w}
                variants={word}
                className="mr-[0.26em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={word}
              className="inline-block whitespace-nowrap"
            >
              <span className="text-accent-text">your business</span>
              <span className="text-navy">,</span>
            </motion.span>
          </span>
          <span className="block">
            {LINE_2.map((w) => (
              <motion.span
                key={w}
                variants={word}
                className="mr-[0.26em] inline-block"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.7)}
          className="mt-7 max-w-[52ch] font-sans text-lg leading-relaxed text-navy-500 sm:text-xl"
        >
          Every build is one of a kind, shaped to your workflow and your problem.
          Made for you, and yours to own outright.
        </motion.p>

        <motion.div
          {...rise(0.82)}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <PrimaryButton href="/contact">
            Book a call
            <ArrowRight weight="bold" className="h-4 w-4" />
          </PrimaryButton>
          <GhostButton href="#capabilities">See what we build</GhostButton>
        </motion.div>

        <motion.p {...rise(0.94)} className="mt-8 font-sans text-sm text-navy-300">
          Every build quoted up front. First systems from A$2,700. No lock-in.
        </motion.p>
      </div>
    </section>
  );
}
