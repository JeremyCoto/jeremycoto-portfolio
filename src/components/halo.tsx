"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

interface HaloProps {
  children?: ReactNode;
  /** Tamaño del brillo en px. */
  size?: number;
  /** Intensidad 0–100. */
  strength?: number;
  className?: string;
}

/**
 * Brillo que sigue al puntero. La opacidad la controla `group-hover:` del padre,
 * así funciona aunque el enlace de la tarjeta quede por encima.
 */
export function Halo({ children, size = 600, strength = 16, className }: HaloProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition(ref);
  const offset = size / 2;

  const style = {
    "--x": `${x != null ? x - offset : -offset}px`,
    "--y": `${y != null ? y - offset : -offset}px`,
    "--halo-strength": strength / 100,
    width: size,
    height: size,
    background: "radial-gradient(circle, color-mix(in oklab, var(--foreground) 28%, transparent) 0%, transparent 60%)",
  } as CSSProperties;

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        aria-hidden
        style={style}
        className="pointer-events-none absolute inset-0 z-50 translate-x-(--x) translate-y-(--y) opacity-0 transition-opacity duration-300 group-hover:opacity-(--halo-strength) max-md:group-hover:opacity-0"
      />
      {children}
    </div>
  );
}
