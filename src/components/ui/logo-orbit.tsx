/*
 * Logo Orbit, adapted from xevrion lab.
 * https://lab.xevrion.dev/lab/logo-orbit
 *
 * Adaptaciones: `cn` del proyecto, sombras con utilidades de Tailwind del tema,
 * elementos con `href` que enlazan a su página e iconos que reciben `active`.
 */

"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface LogoOrbitIconProps {
  className?: string;
  /** true mientras el elemento está señalado (hover o foco). */
  active?: boolean;
}

export interface LogoOrbitItem {
  label: string;
  icon: ComponentType<LogoOrbitIconProps>;
  /** Color de marca al pasar el ratón, si tiene contraste suficiente. */
  color?: string;
  /** Destino al hacer clic; sin él, el elemento es un botón. */
  href?: string;
}

export interface Orbit {
  items: LogoOrbitItem[];
  /** Radio como proporción del ancho del escenario. */
  radius: number;
  /** Segundos por vuelta; negativo invierte el sentido. */
  lap: number;
}

interface LogoOrbitProps {
  orbits: Orbit[];
  children: ReactNode;
  className?: string;
  iconSize?: number;
  paused?: boolean;
  /** Inclinación de la elipse: 0 = línea, 1 = círculo. */
  tilt?: number;
}

/** Inclinación por defecto de la elipse (perspectiva). */
const TILT = 0.42;
/** Rapidez con la que la órbita frena al pasar el ratón y vuelve a arrancar. */
const BRAKE = 4;

function readable(hex: string): boolean {
  const value = hex.replace("#", "");
  if (value.length !== 6) return false;
  const n = parseInt(value, 16);
  if (Number.isNaN(n)) return false;
  const lum = 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum > 40 && lum < 225;
}

export function LogoOrbit({ orbits, children, className, iconSize = 44, paused = false, tilt = TILT }: LogoOrbitProps) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hovering = useRef(false);
  const [active, setActive] = useState<string | null>(null);

  const flat = orbits.flatMap((orbit, r) => orbit.items.map((item, i) => ({ item, r, i, n: orbit.items.length })));

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const turns = orbits.map(() => 0);
    let speed = 1;
    let frame = 0;
    let visible = true;
    let last = performance.now();

    const place = () => {
      const w = stage.offsetWidth;
      const h = stage.offsetHeight;
      flat.forEach(({ r, i, n }, k) => {
        const el = itemRefs.current[k];
        if (!el) return;
        const angle = turns[r]! + (i / n) * Math.PI * 2;
        const rx = (orbits[r]!.radius * w) / 2;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * rx * tilt;
        const depth = Math.sin(angle);
        const near = (depth + 1) / 2;
        el.style.transform = `translate(${(w / 2 + x).toFixed(1)}px, ${(h / 2 + y).toFixed(1)}px) translate(-50%, -50%) scale(${(0.7 + near * 0.35).toFixed(3)})`;
        el.style.opacity = (0.28 + near * 0.72).toFixed(3);
        el.style.zIndex = depth > 0 ? "3" : "1";
      });
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const target = hovering.current ? 0 : 1;
      speed += (target - speed) * (1 - Math.exp(-BRAKE * dt));
      orbits.forEach((orbit, r) => {
        turns[r]! += ((Math.PI * 2) / orbit.lap) * dt * speed;
      });
      place();
      frame = visible ? requestAnimationFrame(step) : 0;
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(stage);
    if (paused || reduceMotion) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    });
    io.observe(stage);
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
    // flat se deriva de orbits
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orbits, paused, reduceMotion, tilt]);

  return (
    <div
      data-slot="logo-orbit"
      ref={stageRef}
      className={cn("relative isolate aspect-16/10 w-full", className)}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") hovering.current = true;
      }}
      onPointerLeave={() => {
        hovering.current = false;
        setActive(null);
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-2 grid place-items-center px-[18%] text-center *:pointer-events-auto">
        {children}
      </div>

      {flat.map(({ item }, k) => {
        const on = active === item.label;
        const Icon = item.icon;
        const fill = on && item.color && readable(item.color) ? item.color : undefined;
        const handlers = {
          onPointerEnter: (event: PointerEvent) => {
            if (event.pointerType !== "touch") setActive(item.label);
          },
          onPointerLeave: () => setActive(null),
          onFocus: () => {
            hovering.current = true;
            setActive(item.label);
          },
          onBlur: () => {
            hovering.current = false;
            setActive(null);
          },
        };
        const control =
          "relative grid touch-manipulation place-items-center rounded-full bg-card text-foreground shadow-sm ring-1 shadow-foreground/10 ring-border outline-hidden transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring dark:bg-muted";
        const content = (
          <>
            <span
              className="grid size-[45%] place-items-center transition-[color,scale] duration-200 ease-out *:size-full"
              style={{ color: fill, scale: on ? "1.12" : "1" }}
            >
              <Icon aria-hidden="true" active={on} />
            </span>
            <span
              data-slot="logo-orbit-label"
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 rounded-full bg-foreground px-2 py-0.5 text-xs font-medium whitespace-nowrap text-background transition-[opacity,translate] duration-150 ease-out",
                on ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
              )}
            >
              {item.label}
            </span>
          </>
        );

        return (
          <div
            key={item.label}
            data-slot="logo-orbit-item"
            ref={(el) => {
              itemRefs.current[k] = el;
            }}
            data-on={on}
            // Oculto hasta que place() lo coloca (evita verlo en la esquina antes de hidratar).
            style={{ opacity: 0 }}
            className="absolute top-0 left-0 will-change-transform data-[on=true]:z-4! data-[on=true]:opacity-100!"
          >
            {item.href ? (
              <Link
                href={item.href}
                aria-label={item.label}
                className={control}
                style={{ width: iconSize, height: iconSize }}
                {...handlers}
              >
                {content}
              </Link>
            ) : (
              <button
                type="button"
                aria-label={item.label}
                className={control}
                style={{ width: iconSize, height: iconSize }}
                {...handlers}
              >
                {content}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default LogoOrbit;
