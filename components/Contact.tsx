"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Check } from "lucide-react";
import Reveal from "./Reveal";
import Arrow from "./Arrow";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";
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
    try {
      const endpoint = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;
      const payload = new URLSearchParams({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        budget: String(data.get("budget") ?? ""),
        brief: String(data.get("brief") ?? ""),
      });

      if (endpoint) {
        // Google Apps Script Web App. `no-cors` + urlencoded avoids a CORS
        // preflight; the row still lands in the Sheet even though the opaque
        // response can't be read.
        await fetch(endpoint, { method: "POST", mode: "no-cors", body: payload });
      } else {
        // No Sheet endpoint configured yet — simulate so the UI still works.
        await new Promise((r) => setTimeout(r, 900));
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "min-h-[52px] w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-ink placeholder:text-muted-foreground/60 transition-colors duration-200 focus:border-accent focus:outline-none";

  return (
    <section id="contact" className="scroll-mt-28 pb-[clamp(6rem,14vw,10rem)]">
      <div className="container-mid grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="display text-[length:var(--text-section)] font-light leading-[1.05] text-ink">
            Tell us what you&rsquo;re building
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/50">
            Send a short brief. You&rsquo;ll get a real reply from the people
            who&rsquo;d do the work — usually within one business day.
          </p>

          <Reveal delay={0.1} className="mt-12 space-y-8">
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a href={`mailto:${site.email}`} className="link-line display text-3xl text-ink">
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">WhatsApp</p>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line display text-3xl text-ink"
              >
                {site.whatsappDisplay}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Instagram</p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line display text-3xl text-ink"
              >
                {site.instagramHandle}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
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
                  <p id="name-error" role="alert" className="mt-2 text-sm text-accent">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
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
                  <p id="email-error" role="alert" className="mt-2 text-sm text-accent">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="budget" className="mb-2 block text-sm font-medium text-ink">
                  Budget range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className={`${field} cursor-pointer`}
                  defaultValue=""
                >
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
                <label htmlFor="brief" className="mb-2 block text-sm font-medium text-ink">
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
                  <p id="brief-error" role="alert" className="mt-2 text-sm text-accent">
                    {errors.brief}
                  </p>
                ) : (
                  <p id="brief-help" className="mt-2 text-sm text-ink/40">
                    Goals, timeline, and anything already in place.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-border mt-8 w-full cursor-pointer justify-center text-[clamp(1.25rem,2vw,1.75rem)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" && <Loader2 size={20} className="animate-spin" aria-hidden />}
              {status === "sent" && <Check size={20} aria-hidden />}
              {status === "sending" ? "Sending…" : status === "sent" ? "Brief received" : "Send brief"}
              {status === "idle" && <Arrow />}
            </button>

            <p aria-live="polite" className="sr-only">
              {status === "sent" ? "Your brief was sent. We'll reply within one business day." : ""}
            </p>
            {status === "sent" && (
              <p className="mt-4 text-center text-sm text-ink/70">
                Thanks — we&apos;ll reply within one business day.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-4 text-center text-sm text-accent">
                Something went wrong. Please email us at {site.email} or try again.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
