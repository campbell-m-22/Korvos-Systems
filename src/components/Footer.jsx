import { Wordmark } from "./primitives.jsx";

const NAV = [
  { label: "What we build", href: "/#capabilities" },
  { label: "Why us", href: "/#why-us" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Book a call", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-[34ch]">
            <Wordmark className="text-[20px]" />
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-navy-500">
              Custom software for established Australian businesses. Built by the
              team behind Korvos, and handed over for you to own.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-sans text-[15px] font-medium text-navy-500 transition-colors hover:text-navy"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-[13.5px] text-navy-300">
            © 2026 Korvos Pty Ltd. ABN 49 697 208 398. Australian owned and operated.
          </p>
          <a
            href="https://korvos.com.au"
            className="font-sans text-[13.5px] font-medium text-navy-500 transition-colors hover:text-navy"
          >
            Part of Korvos → korvos.com.au
          </a>
        </div>
      </div>
    </footer>
  );
}
