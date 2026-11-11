import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  id?: string;
  /** "wide" ocupa todo el contenedor (cuadrículas de productos). */
  width?: "default" | "wide";
  children: ReactNode;
}

/** Bloque editorial con borde izquierdo y título en columna (Stack, Gear y detalles). */
export function Section({ title, id, width = "default", children }: SectionProps) {
  const headingId = useId();
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28 md:border-l md:border-border md:pl-6">
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-y-8 md:grid-cols-4",
          width === "default" ? "max-w-3xl" : "max-w-none",
        )}
      >
        <h2 id={headingId} className="text-sm font-semibold text-foreground md:pt-0.5">
          {title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  );
}
