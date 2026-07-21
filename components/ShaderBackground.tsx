"use client";

import { useEffect, useState } from "react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";

/**
 * Animated shader stack used as the hero backdrop (Axion-style):
 * Swirl base → ChromaFlow colour flow → FlutedGlass refraction → FilmGrain.
 * WebGL, so it only mounts on the client to avoid any SSR/hydration issues.
 */
export default function ShaderBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#efefef]"
    >
      {mounted && (
        <Shader className="h-full w-full" style={{ width: "100%", height: "100%" }}>
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
      )}
    </div>
  );
}
