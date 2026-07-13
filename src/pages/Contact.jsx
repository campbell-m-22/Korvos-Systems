import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  EnvelopeSimple,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
} from "@phosphor-icons/react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

const EASE = [0.16, 1, 0.3, 1];

// Web3Forms delivers submissions straight to an inbox with no server to run.
// Generate a free key at https://web3forms.com (enter contact@korvos.com.au as
// the destination) and paste it below. Until it's set, the form falls back to
// opening the visitor's email client, so nothing is broken in the meantime.
const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
const HAS_KEY = ACCESS_KEY && !ACCESS_KEY.startsWith("YOUR_");

const DETAILS = [
  { icon: EnvelopeSimple, label: "Email", value: "contact@korvos.com.au", href: "mailto:contact@korvos.com.au" },
  { icon: Clock, label: "Reply time", value: "Within one business day, AEST" },
  { icon: MapPin, label: "Where we are", value: "Sunshine Coast, Queensland" },
];

function Field({ label, name, value, onChange, error, type = "text", textarea, placeholder, optional }) {
  const common =
    "w-full rounded-xl border bg-surface-raised px-4 py-3 font-sans text-[15px] text-navy placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-accent/30";
  const border = error ? "border-accent-text/60" : "border-line focus:border-accent";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-sans text-sm font-medium text-navy">
        {label}
        {optional && <span className="ml-1.5 font-normal text-navy-300">optional</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={`${common} ${border} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={`${common} ${border}`}
        />
      )}
      {error && <p className="font-sans text-[13px] text-accent-text">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  function validate() {
    const er = {};
    if (!form.name.trim()) er.name = "Please add your name.";
    if (!form.email.trim()) er.email = "Please add an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      er.email = "That email address doesn't look right.";
    if (!form.message.trim())
      er.message = "Tell us a little about what you're trying to solve.";
    return er;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.website) {
      setStatus("sent"); // honeypot tripped: silently "succeed"
      return;
    }
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    const subject = `New enquiry from ${form.name} - Korvos Systems`;

    // No key yet: fall back to the visitor's email client (still works today).
    if (!HAS_KEY) {
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Business: ${form.business || "-"}`,
        `Phone: ${form.phone || "-"}`,
        "",
        form.message,
      ].join("\n");
      window.location.href = `mailto:contact@korvos.com.au?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    // Key present: post in the background, no email client needed.
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject,
          from_name: "Korvos Systems website",
          replyto: form.email,
          name: form.name,
          email: form.email,
          business: form.business || "-",
          phone: form.phone || "-",
          message: form.message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface">
      <Nav />
      <main className="flex-1 px-5 pb-24 pt-32 sm:px-8 lg:pt-40">
        <div className="mx-auto max-w-[720px]">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-navy-500 transition-colors hover:text-navy"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Back to home
          </a>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-6 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl"
          >
            Contact
          </motion.h1>
          <p className="mt-4 font-display text-xl font-bold text-navy">
            Talk to the team who will build it.
          </p>
          <p className="mt-4 max-w-[52ch] font-sans text-lg leading-relaxed text-navy-500">
            Scope, pricing, timelines, or an idea you are still chewing on. It
            goes straight to the founder, not a sales queue.
          </p>

          {/* contact details */}
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {DETAILS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="bg-surface-raised p-5">
                <Icon weight="regular" className="h-5 w-5 text-accent-text" />
                <p className="mt-3 font-sans text-xs font-medium uppercase tracking-wide text-navy-300">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block font-sans text-[15px] font-medium text-navy hover:text-accent-text"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 font-sans text-[15px] font-medium text-navy">
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* form / success */}
          <div className="mt-10">
            {status === "sent" ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="rounded-2xl border border-accent/40 bg-surface-raised p-8 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-wash text-accent">
                  <CheckCircle weight="fill" className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy">
                  Thanks for reaching out.
                </h2>
                <p className="mx-auto mt-3 max-w-[46ch] font-sans text-[15px] leading-relaxed text-navy-500">
                  {HAS_KEY ? (
                    <>
                      Your message is on its way and we'll reply within one
                      business day. If anything is urgent, reach us at{" "}
                    </>
                  ) : (
                    <>
                      Your email app should have opened with your message ready
                      to send. If it didn't, email us directly at{" "}
                    </>
                  )}
                  <a
                    href="mailto:contact@korvos.com.au"
                    className="font-medium text-accent-text hover:underline"
                  >
                    contact@korvos.com.au
                  </a>
                  {HAS_KEY ? "." : " and we'll reply within one business day."}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* honeypot: hidden from people, catches bots */}
                <div className="absolute left-[-9999px]" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update}
                  />
                </div>

                <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} placeholder="Jane Whitlock" />
                <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={errors.email} placeholder="jane@yourbusiness.com.au" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Business name" name="business" value={form.business} onChange={update} placeholder="Whitlock & Co." optional />
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={update} placeholder="0400 000 000" optional />
                </div>
                <Field
                  label="What are you trying to solve?"
                  name="message"
                  textarea
                  value={form.message}
                  onChange={update}
                  error={errors.message}
                  placeholder="Tell us how your business runs today and where the manual work piles up."
                />

                {status === "error" && (
                  <p className="font-sans text-[14px] text-accent-text">
                    Something went wrong sending that. Please email us directly at{" "}
                    <a href="mailto:contact@korvos.com.au" className="font-medium underline">
                      contact@korvos.com.au
                    </a>
                    .
                  </p>
                )}

                <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={reduce || status === "sending" ? undefined : { y: -2 }}
                    whileTap={reduce || status === "sending" ? undefined : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 font-display text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,30,51,0.55)] hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    {status !== "sending" && <ArrowRight weight="bold" className="h-4 w-4" />}
                  </motion.button>
                  <p className="font-sans text-[13px] text-navy-300">
                    We never share your details. Replies come from
                    contact@korvos.com.au.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
