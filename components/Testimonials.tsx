import Image from "next/image";
import Marquee from "./Marquee";
import { testimonials } from "@/lib/site";

/**
 * Client quotes as one slowly drifting row (pauses on hover). Each person is
 * listed once, and a photo is only ever shown for one person: if a file is
 * listed twice, later reviews fall back to the person's initials.
 */

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Testimonials() {
  const seenNames = new Set<string>();
  const seenPhotos = new Set<string>();
  const reviews = testimonials
    .filter((t) => !seenNames.has(t.name) && seenNames.add(t.name))
    .map((t) => {
      const photo = t.avatar && !seenPhotos.has(t.avatar) ? t.avatar : null;
      if (photo) seenPhotos.add(photo);
      return { ...t, photo };
    });

  return (
    <section aria-label="Client testimonials" className="pb-[clamp(6rem,14vw,10rem)]">
      <div className="container-mid mb-10">
        <p className="eyebrow mb-4">Testimonials</p>
        <h2 className="display text-[length:var(--text-section)] font-light text-ink">
          What it&rsquo;s like to work with us
        </h2>
      </div>

      <Marquee duration={60} className="testimonial-row">
        {reviews.map((t) => (
          <figure
            key={t.name}
            className="mx-[10px] flex w-[min(86vw,420px)] shrink-0 flex-col justify-between self-stretch rounded-[var(--radius-card)] border border-border bg-surface p-8"
          >
            <div>
              <h3 className="display text-2xl font-normal text-ink">{t.headline}</h3>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/60">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3">
              {t.photo ? (
                <Image
                  src={t.photo}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-content-center rounded-full bg-accent text-sm font-medium text-white"
                >
                  {initials(t.name)}
                </span>
              )}
              <span className="text-sm text-ink">
                {t.name}
                <span className="block text-ink/40">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
