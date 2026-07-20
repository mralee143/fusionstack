"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Check, Instagram, Mail } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "email" | "brief", string>>;

const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k +"];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const brief = String(data.get("brief") ?? "").trim();

    if (!name) next.name = "Tell us who we're talking to.";
    if (!email) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email doesn't look right — check the @ and domain.";
    if (brief.length < 20)
      next.brief = "A couple of sentences helps us give a useful answer (20+ characters).";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Focus the first invalid field so keyboard/screen-reader users land on the problem.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    // Wire this to your inbox/CRM endpoint — the UI contract is already here.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    form.reset();
  }

  const field =
    "min-h-[48px] w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-accent focus:outline-none";

  return (
    <section id="contact" className="scroll-mt-24 py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Tell us what you&apos;re <span className="text-foreground">building.</span>
              </>
            }
            body="Send a short brief. You'll get a real reply from the people who'd do the work — usually within one business day."
          />

          <Reveal delay={0.1} className="mt-10 space-y-3">
            <a
              href={`mailto:${site.email}`}
              className="glass flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl px-4 transition-colors duration-200 hover:border-accent/50"
            >
              <Mail size={18} className="text-accent" aria-hidden />
              <span className="text-sm">{site.email}</span>
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl px-4 transition-colors duration-200 hover:border-accent/50"
            >
              <Instagram size={18} className="text-accent" aria-hidden />
              <span className="text-sm">{site.instagramHandle}</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass rounded-[var(--radius-card)] p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  className={field}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Alee Haider"
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-2 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={field}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="budget" className="mb-2 block text-sm font-medium">
                  Budget range
                </label>
                <select id="budget" name="budget" className={`${field} cursor-pointer`} defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="brief" className="mb-2 block text-sm font-medium">
                  Project brief <span className="text-accent">*</span>
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  rows={5}
                  className={`${field} resize-y`}
                  aria-invalid={!!errors.brief}
                  aria-describedby={errors.brief ? "brief-error" : "brief-help"}
                  placeholder="What are you building, and what does success look like?"
                />
                {errors.brief ? (
                  <p id="brief-error" role="alert" className="mt-2 text-sm text-red-600">
                    {errors.brief}
                  </p>
                ) : (
                  <p id="brief-help" className="mt-2 text-sm text-muted-foreground">
                    Goals, timeline, and anything already in place.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="glow-cobalt mt-8 inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-cobalt px-8 font-semibold text-white transition-transform duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" && <Loader2 size={18} className="animate-spin" aria-hidden />}
              {status === "sent" && <Check size={18} aria-hidden />}
              {status === "sending" ? "Sending…" : status === "sent" ? "Brief received" : "Send brief"}
            </button>

            <p aria-live="polite" className="sr-only">
              {status === "sent" ? "Your brief was sent. We'll reply within one business day." : ""}
            </p>
            {status === "sent" && (
              <p className="mt-4 text-center text-sm text-accent">
                Thanks — we&apos;ll reply within one business day.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
