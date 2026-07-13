/* Breadth strip. Its job is to show range: the point of the business is that
   almost any business problem is buildable. Present-tense capability claims
   (no invented client work). One marquee per page; frozen under reduced motion.

   NOTE: the separator is an orange em-dash. The skill bans em-dashes outright;
   the user explicitly overrode that ban for this one element only. Do not
   "fix" it back to an asterisk. */
const BUILDS = [
  "Job scheduling",
  "Client portals",
  "Automated quoting",
  "Booking systems",
  "Inventory sync",
  "Compliance workflows",
  "Custom CRMs",
  "Invoice automation",
  "Document generation",
  "Reporting dashboards",
  "Field data capture",
  "Approval workflows",
  "Payment reminders",
  "Customer notifications",
];

function Item({ label }) {
  return (
    <span className="flex items-center gap-6 pr-6">
      <span className="font-display text-lg font-semibold tracking-tight text-navy sm:text-xl">
        {label}
      </span>
      <span
        aria-hidden
        className="shrink-0 font-display text-xl font-bold text-accent"
      >
        —
      </span>
    </span>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Examples of what we build"
      className="border-y border-line bg-surface-raised py-6"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
        <span className="shrink-0 font-sans text-sm font-medium text-navy-300">
          We build
        </span>

        {/* marquee-group enables pause-on-hover */}
        <div className="marquee-group relative flex-1 overflow-hidden">
          {/* edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface-raised to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface-raised to-transparent"
          />
          <div className="marquee-track flex w-max">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex" aria-hidden={dup === 1}>
                {BUILDS.map((b) => (
                  <Item key={`${dup}-${b}`} label={b} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
