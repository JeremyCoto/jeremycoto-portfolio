"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";

/** Fondo de la página primero (se funde con ella) y luego los tonos del acento. */
const GLOW_COLORS = [
  "var(--background)",
  "color-mix(in oklab, var(--accent) 75%, var(--background))",
  "color-mix(in oklab, oklch(0.62 0.2 290) 65%, var(--background))",
  "color-mix(in oklab, oklch(0.72 0.15 350) 55%, var(--background))",
  "color-mix(in oklab, var(--accent) 60%, var(--background))",
] as const;
const GLOW_STOPS = [40, 60, 72, 86, 100] as const;

/** El reproductor de Lottie (y su motor WASM) solo se descarga cuando el gato está por verse. */
const LottieCat = dynamic(() => import("@/components/home/lottie-cat"), { ssr: false });
const PRELOAD_MARGIN = "300px";

/** Cierre de la home: resplandor animado con el gato de la demo encima. Decorativo. */
export function ClosingGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="relative -mb-32 h-72 sm:h-96">
      <div className="absolute inset-0 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_35%,black_70%,transparent)]">
        <AnimatedGradientBackground
          gradientColors={GLOW_COLORS}
          gradientStops={GLOW_STOPS}
          breathing
          startingGap={110}
        />
      </div>
      {/* Caja fija con la proporción de la animación (280 × 200): no hay salto de diseño al cargar. */}
      <div className="absolute top-[47%] left-1/2 aspect-[7/5] w-52 -translate-1/2 sm:w-72">
        {isNear ? <LottieCat animate={!reduceMotion} /> : null}
      </div>
    </div>
  );
}
