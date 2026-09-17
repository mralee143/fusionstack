import Image from "next/image";
import Marquee from "./Marquee";

/**
 * Collaborators — two rows of light cards drifting in opposite directions.
 * Swap the files in public/tpl/brand/ for real client marks when you have them.
 */
const logos = [1, 2, 3, 4, 5].map((n) => `/tpl/brand/icon-${n}.png`);

function Card({ src }: { src: string }) {
  return (
    <div className="mx-[5px] grid h-[clamp(120px,18vw,220px)] min-w-[clamp(200px,32vw,380px)] place-content-center rounded-[var(--radius-card)] bg-surface-2 p-[clamp(1.25rem,3vw,2.5rem)]">
      <Image
        src={src}
        alt=""
        width={180}
        height={60}
        className="h-auto w-[clamp(90px,14vw,160px)] object-contain"
      />
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section aria-label="Collaborators" className="pb-[clamp(5rem,10vw,8.75rem)]">
      <div className="container-mid mb-10">
        <h2 className="display text-[length:var(--text-section)] font-light text-ink">
          Collaborators
        </h2>
      </div>

      <Marquee duration={40} className="pb-[10px]">
        {logos.map((src, i) => (
          <Card key={`a-${i}`} src={src} />
        ))}
      </Marquee>
      <Marquee duration={40} reverse>
        {[...logos].reverse().map((src, i) => (
          <Card key={`b-${i}`} src={src} />
        ))}
      </Marquee>
    </section>
  );
}
