import type { Transition } from "motion/react";

/** Resortes con la API duración/rebote de Motion (equivalentes a smooth/snappy/bouncy). */
interface SpringOptions {
  duration?: number;
  extraBounce?: number;
}

function spring(baseBounce: number, { duration = 0.5, extraBounce = 0 }: SpringOptions = {}): Transition {
  return { type: "spring", duration, bounce: baseBounce + extraBounce };
}

export const smooth = (options?: SpringOptions): Transition => spring(0, options);
export const bouncy = (options?: SpringOptions): Transition => spring(0.3, options);

export const smoothSpring = smooth();
export const bouncySpring = bouncy();

/** Fundido del fondo de diálogos y bandejas. */
export const overlayFade = { duration: 0.1 } as const satisfies Transition;

/** Fundido corto del contenido (etiqueta del menú, contenido del diálogo). */
export const contentFade = { duration: 0.14, ease: "easeInOut" } as const satisfies Transition;

/** Resorte del arrastre (carrusel y fotos). */
export const dragSpring = { type: "spring", stiffness: 400, damping: 40, mass: 0.8 } as const satisfies Transition;
export const dragTransition = { bounceStiffness: 400, bounceDamping: 40 } as const;

/** Duración cero si el usuario pide movimiento reducido. */
export function motionTransition(transition: Transition, reduceMotion: boolean | null): Transition {
  return reduceMotion ? { duration: 0 } : transition;
}
