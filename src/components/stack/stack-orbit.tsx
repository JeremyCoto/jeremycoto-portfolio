"use client";

import { STACK_GROUPS, stackHref, stackSlug, type StackItem } from "@/content/stack";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LogoOrbit, type LogoOrbitIconProps, type LogoOrbitItem, type Orbit } from "@/components/ui/logo-orbit";
import { cn } from "@/lib/utils";

/**
 * Logo oficial en dos capas: silueta monocroma (color del texto) en reposo
 * y logo a color de marca al señalarlo, igual que el comportamiento del demo.
 */
function brandIcon(item: StackItem) {
  function BrandIcon({ className, active = false }: LogoOrbitIconProps) {
    const mask = `url(${item.logo}) center / contain no-repeat`;
    return (
      <span className={cn("relative block", className)}>
        <span
          className="absolute inset-0 bg-current transition-opacity duration-200"
          style={{ mask, WebkitMask: mask, opacity: active ? 0 : 1 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- logo pequeño y local, sin optimización */}
        <img
          src={item.logo}
          alt=""
          draggable={false}
          className={cn(
            "absolute inset-0 size-full object-contain transition-opacity duration-200",
            item.monochrome && "logo-mono",
          )}
          style={{ opacity: active ? 1 : 0 }}
        />
      </span>
    );
  }
  BrandIcon.displayName = `BrandIcon(${item.name})`;
  return BrandIcon;
}

function toOrbitItems(items: readonly StackItem[], exclude: ReadonlySet<string>): LogoOrbitItem[] {
  return items
    .filter((item) => !exclude.has(stackSlug(item.name)))
    .map((item) => ({ label: item.name, icon: brandIcon(item), href: stackHref(stackSlug(item.name)) }));
}

const [STACK_GROUP, TOOLS_GROUP] = STACK_GROUPS;
const INNER = toOrbitItems(STACK_GROUP.items, new Set());
// Supabase está en ambos grupos: solo aparece en la órbita interior.
const OUTER = toOrbitItems(TOOLS_GROUP.items, new Set(INNER.map((item) => stackSlug(item.label))));

/** Constantes de módulo: LogoOrbit reinicia la animación si cambia la identidad de `orbits`. */
const DESKTOP_ORBITS: Orbit[] = [
  { items: INNER, radius: 0.5, lap: 28 },
  { items: OUTER, radius: 0.94, lap: -44 },
];

/** En móvil la órbita interior se abre para rodear el texto y la exterior no toca los bordes. */
const MOBILE_ORBITS: Orbit[] = [
  { items: INNER, radius: 0.66, lap: 28 },
  { items: OUTER, radius: 0.9, lap: -44 },
];

export function StackOrbit() {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <section aria-labelledby="stack-orbit-heading" className="mx-auto w-full max-w-3xl">
      <LogoOrbit
        orbits={isDesktop ? DESKTOP_ORBITS : MOBILE_ORBITS}
        iconSize={isDesktop ? 44 : 32}
        // Escritorio: elipse baja y ancha. Móvil: escenario cuadrado y elipse alta, para no tapar el texto.
        tilt={isDesktop ? 0.42 : 0.78}
        className={isDesktop ? "aspect-[2/1]" : "aspect-square"}
      >
        <div>
          <p className="text-[0.6875rem] font-medium text-muted-foreground sm:text-sm">Technology ecosystem</p>
          <h2 id="stack-orbit-heading" className="mt-0.5 text-sm font-semibold text-foreground sm:mt-1 sm:text-lg">
            What I build with
          </h2>
          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            {INNER.length} technologies · {OUTER.length} tools
          </p>
        </div>
      </LogoOrbit>
    </section>
  );
}
