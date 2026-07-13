import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Wordmark } from "./primitives.jsx";

const LINKS = [
  { label: "Pricing", href: "/#pricing", always: false },
  { label: "Why Korvos", href: "/#why-us", always: false },
  { label: "Contact", href: "/contact", always: true },
];

export default function Nav() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line/70 bg-surface/85 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <a href="/" className="shrink-0" aria-label="Korvos Systems home">
          <Wordmark className="text-[19px]" />
        </a>

        <nav className="flex items-center gap-6 sm:gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-sans text-[14.5px] font-medium text-navy-500 transition-colors hover:text-navy ${
                l.always ? "" : "hidden sm:inline"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
