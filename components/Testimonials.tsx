import Image from "next/image";
import Marquee from "./Marquee";
import { testimonials } from "@/lib/site";

/** Client quotes as a slow single-row drift of bordered cards. */
export default function Testimonials() {
  return (
    <section aria-label="Client testimonials" className="pb-[clamp(6rem,14vw,10rem)]">
      <div className="container-mid mb-10">
        <p className="eyebrow mb-4">Testimonials</p>
        <h2 className="display text-[length:var(--text-section)] font-light text-ink">
          What it&rsquo;s like to work with us
        </h2>
      </div>

      <Marquee duration={60}>
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="mx-[10px] flex w-[min(86vw,420px)] shrink-0 flex-col justify-between rounded-[var(--radius-card)] border border-border bg-surface p-8"
          >
            <div>
              <h3 className="display text-2xl font-normal text-ink">{t.headline}</h3>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/60">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3">
              <Image
                src={t.avatar}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
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
