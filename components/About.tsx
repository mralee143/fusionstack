import Link from "next/link";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import Arrow from "./Arrow";
import { about, values } from "@/lib/site";

/**
 * The big centred statement. The paragraph fades in word by word, then the
 * four operating principles sit beneath it as a quiet bordered row.
 */
export default function About() {
  return (
    <section id="about" className="scroll-mt-28 pb-[clamp(6rem,14vw,12.5rem)]">
      <div className="container-narrow text-center">
        <WordReveal
          text={about.statement}
          className="display mx-auto max-w-[22ch] text-[length:var(--text-big)] tracking-[0.01em] text-ink sm:max-w-none"
        />

        <Reveal delay={0.1} className="mt-11">
          <Link href="#contact" className="btn-border">
            More About Us
            <Arrow />
          </Link>
        </Reveal>
      </div>

      <div className="container-mid mt-[clamp(4rem,9vw,7rem)]">
        <Reveal stagger className="grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <div key={value.title} className="border-b border-border py-8 lg:border-b-0 lg:pr-8">
              <span className="font-sans text-xs text-ink/30">0{i + 1}</span>
              <h3 className="display mt-4 text-[28px] font-normal leading-[1.1] text-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/50">{value.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
