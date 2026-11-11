"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";

/**
 * Misma combinación del componente original (azul, rosa, naranja, amarillo), mezclada con el
 * fondo para un término medio: el color se nota sin dominar la página.
 */
const mix = (color: string, amount: number) => `color-mix(in oklab, ${color} ${amount}%, var(--background))`;
const GLOW_COLORS = [
  "var(--background)",
  mix("#2979FF", 80),
  mix("#FF80AB", 72),
  mix("#FF6D00", 62),
  mix("#FFD600", 55),
] as const;
const GLOW_STOPS = [34, 48, 59, 70, 84] as const;

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
      <div className="absolute inset-0 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_30%,black_85%,transparent)]">
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
