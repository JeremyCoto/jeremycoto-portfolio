"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import { REVEAL_FROM_OPACITY, revealRanges } from "@/lib/scroll-reveal";

/** Igual que el About actual: empieza con el bloque al 60 % de la pantalla y termina con su final al 30 %. */
const OFFSET: ["start 0.6", "end 0.3"] = ["start 0.6", "end 0.3"];

/** Progreso de la página (0–1); 1 si no hay scroll. Garantiza el texto completo al llegar al final. */
function pageProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 1;
}

interface ScrollRevealTextProps {
  paragraphs: readonly string[];
  className?: string;
}

/**
 * Las letras toman su color a medida que se hace scroll.
 * Un solo valor (`--reveal`) se escribe en el contenedor; cada letra calcula su opacidad en CSS.
 */
export function ScrollRevealText({ paragraphs, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const ranges = useMemo(() => revealRanges(paragraphs), [paragraphs]);
  const { scrollYProgress } = useScroll({ target: ref, offset: OFFSET });

  const apply = (progress: number) => {
    const value = reduceMotion ? 1 : Math.max(progress, pageProgress());
    ref.current?.style.setProperty("--reveal", value.toFixed(4));
  };

  useMotionValueEvent(scrollYProgress, "change", apply);
  // Valor inicial (y al cambiar la preferencia de movimiento).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => apply(scrollYProgress.get()), [reduceMotion]);

  return (
    <div ref={ref} className={className} style={{ "--reveal-from": REVEAL_FROM_OPACITY } as CSSProperties}>
      {paragraphs.map((paragraph, p) => (
        <p key={paragraph}>
          <span className="sr-only">{paragraph}</span>
          <span aria-hidden="true">
            {ranges[p]!.map((word, w) => (
              <span key={w}>
                <span className="whitespace-nowrap">
                  {word.map(({ char, start, rate }, c) => (
                    <span
                      key={c}
                      className="reveal-char"
                      style={{ "--s": start.toFixed(5), "--k": rate.toFixed(3) } as CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>{" "}
              </span>
            ))}
          </span>
        </p>
      ))}
    </div>
  );
}
