import { motion, useReducedMotion } from "motion/react";

/* Live-text wordmark: "Korvos Systems" in navy with an orange full stop,
   mirroring the parent Korvos brand. Never an image. */
export function Wordmark({ className = "" }) {
  return (
    <span
      className={`font-display font-extrabold tracking-tight text-navy ${className}`}
    >
      Korvos Systems
      {/* Round full stop, matching the parent Korvos wordmark. Live element,
          scales with font-size (em units), decorative for screen readers. */}
      <span
        aria-hidden
        className="ml-[0.06em] inline-block h-[0.17em] w-[0.17em] rounded-full bg-accent"
        style={{ verticalAlign: "baseline" }}
      />
    </span>
  );
}

/* Scroll-reveal wrapper. Honours prefers-reduced-motion (degrades to static). */
export function Reveal({ children, delay = 0, y = 22, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Primary CTA — navy fill, tactile push. One contact intent across the page. */
export function PrimaryButton({ children, className = "", ...props }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 font-display text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,30,51,0.55)] hover:bg-navy-700 ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}

/* Secondary CTA — outlined, same push physics, passes contrast on the surface. */
export function GhostButton({ children, className = "", ...props }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-surface-raised px-6 py-3.5 font-display text-[15px] font-semibold text-navy hover:border-navy/40 ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}
