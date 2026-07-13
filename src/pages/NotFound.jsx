import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "@phosphor-icons/react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

export default function NotFound() {
  const reduce = useReducedMotion();
  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface">
      <Nav />
      <main className="flex flex-1 items-center px-5 pt-24 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[1240px]"
        >
          <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-accent-text">
            404
          </p>
          <h1 className="mt-4 max-w-[16ch] font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl">
            This page doesn&rsquo;t exist.
          </h1>
          <p className="mt-5 max-w-[46ch] font-sans text-lg leading-relaxed text-navy-500">
            The link may be broken, or the page may have moved. Let&rsquo;s get
            you back on track.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 font-display text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,30,51,0.55)] transition-colors hover:bg-navy-700"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Back to home
          </a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
