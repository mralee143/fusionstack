import Marquee from "./Marquee";

/**
 * The oversized two-row banner between the hero and the about statement.
 * Rows travel in opposite directions and overlap slightly, as in the template.
 */

const rowOne = ["Design", "Develop"];
const rowTwo = ["Automate", "Grow"];

function Row({ words }: { words: string[] }) {
  return (
    <>
      {words.map((word) => (
        <span
          key={word}
          className="display whitespace-nowrap pr-[0.26em] text-[length:var(--text-marquee)] font-semibold uppercase text-ink"
        >
          {word}
          <span className="px-[0.12em] text-accent">.</span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeBanner() {
  return (
    <section
      aria-label="What we do"
      className="pt-[clamp(3rem,8vw,6.25rem)] pb-[clamp(5rem,12vw,10rem)]"
    >
      <Marquee duration={38}>
        <Row words={rowOne} />
      </Marquee>
      <Marquee duration={38} reverse className="-mt-[0.14em]">
        <Row words={rowTwo} />
      </Marquee>
    </section>
  );
}
