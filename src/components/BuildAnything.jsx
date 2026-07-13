import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal } from "./primitives.jsx";

export default function BuildAnything() {
  const reduce = useReducedMotion();

  // cursor position (normalised 0..1), softened with a spring for a gentle lag
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 50, damping: 20 });
  const sy = useSpring(py, { stiffness: 50, damping: 20 });
  const glowLeft = useTransform(sx, (v) => `${v * 100}%`);
  const glowTop = useTransform(sy, (v) => `${v * 100}%`);

  function handleMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  return (
    <section className="px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div
          onMouseMove={handleMove}
          className="relative overflow-hidden rounded-[24px] bg-accent-wash px-7 py-16 sm:px-12 lg:px-16 lg:py-24"
        >
          {/* whirling, pulsing orange glow that softly trails the cursor */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-0"
            style={{ left: glowLeft, top: glowTop, x: "-50%", y: "-50%" }}
          >
            <motion.div
              className="h-[24rem] w-[24rem] rounded-full opacity-70 blur-[70px]"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(255,90,31,0), rgba(255,90,31,0.4), rgba(255,150,90,0.12), rgba(255,90,31,0.34), rgba(255,90,31,0))",
              }}
              animate={reduce ? undefined : { rotate: 360, scale: [1, 1.15, 1] }}
              transition={{
                rotate: { duration: 22, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>

          <div className="relative z-10 max-w-[38ch]">
            <Reveal>
              <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-[56px]">
                You&rsquo;ve got a problem. We&rsquo;ll build the answer.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <p className="relative z-10 mt-6 max-w-[58ch] font-sans text-lg leading-relaxed text-navy/70">
              Most of our work starts with a problem no product on the market
              fits. You describe how your business actually runs, and we build
              the thing that fits it. One build, made for you, yours to keep.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
