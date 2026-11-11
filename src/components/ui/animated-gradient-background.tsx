/*
 * Animated Gradient Background, adaptado del componente original (framer-motion).
 *
 * Adaptaciones: `motion/react` (el mismo motor, ya instalado), `cn` del proyecto,
 * `breathing` en minúscula, sin bucle de animación cuando no respira, pausa fuera de
 * pantalla y respeto de "reducir movimiento".
 */

"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"];
const DEFAULT_STOPS = [35, 50, 60, 70, 80, 90, 100];
const ENTRANCE_EASE = [0.25, 0.1, 0.25, 1] as const;

interface AnimatedGradientBackgroundProps {
  /** Tamaño inicial del degradado radial (%). */
  startingGap?: number;
  /** Activa la "respiración" (el degradado crece y se encoge). */
  breathing?: boolean;
  /** Colores del degradado; uno por cada valor de `gradientStops`. Admite variables CSS. */
  gradientColors?: readonly string[];
  /** Paradas en porcentaje (0–100), una por color. */
  gradientStops?: readonly number[];
  /** Puntos porcentuales por fotograma al respirar. */
  animationSpeed?: number;
  /** Amplitud máxima de la respiración (puntos porcentuales). */
  breathingRange?: number;
  /** Alto extra de la elipse respecto al ancho (%). */
  topOffset?: number;
  containerStyle?: CSSProperties;
  containerClassName?: string;
}

function radialGradient(size: number, topOffset: number, colors: readonly string[], stops: readonly number[]) {
  const list = stops.map((stop, index) => `${colors[index]} ${stop}%`).join(", ");
  return `radial-gradient(${size}% ${size + topOffset}% at 50% 20%, ${list})`;
}

export function AnimatedGradientBackground({
  startingGap = 125,
  breathing = false,
  gradientColors = DEFAULT_COLORS,
  gradientStops = DEFAULT_STOPS,
  animationSpeed = 0.02,
  breathingRange = 5,
  topOffset = 0,
  containerStyle,
  containerClassName,
}: AnimatedGradientBackgroundProps) {
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `gradientColors and gradientStops must have the same length (received ${gradientColors.length} and ${gradientStops.length}).`,
    );
  }

  const reduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const paint = (size: number) => {
      layer.style.background = radialGradient(size, topOffset, gradientColors, gradientStops);
    };
    paint(startingGap);
    if (!breathing || reduceMotion) return;

    let size = startingGap;
    let direction = 1;
    let frame = 0;

    const step = () => {
      if (size >= startingGap + breathingRange) direction = -1;
      if (size <= startingGap - breathingRange) direction = 1;
      size += direction * animationSpeed;
      paint(size);
      frame = requestAnimationFrame(step);
    };

    // Solo respira mientras se ve.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting) frame = requestAnimationFrame(step);
    });
    observer.observe(layer);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [startingGap, breathing, reduceMotion, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset]);

  return (
    <motion.div
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, scale: 1.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: ENTRANCE_EASE }}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", containerClassName)}
    >
      <div ref={layerRef} style={containerStyle} className="absolute inset-0" />
    </motion.div>
  );
}
