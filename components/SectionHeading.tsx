import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-accent ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {align === "left" ? (
          <span className="h-px w-8 bg-accent/40" aria-hidden />
        ) : (
          <span className="h-2 w-2 bg-accent" aria-hidden />
        )}
        {eyebrow.toUpperCase()}
      </p>
      <h2 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{body}</p>
      )}
    </Reveal>
  );
}
