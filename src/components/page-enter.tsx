import type { CSSProperties, ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Paso entre bloques que entran escalonados. */
export const ENTER_STAGGER = 0.13;

type PageEnterProps = ComponentProps<"div"> & {
  index?: number;
  delay?: number;
  as?: "div" | "header";
};

/**
 * Entrada de página: sube 18 px, de desenfocado a nítido, con el mismo resorte suave de antes.
 * Es CSS (clase `page-enter`), así el contenido se pinta sin esperar a que cargue JavaScript.
 */
export function PageEnter({ className, style, index = 0, delay, as: Element = "div", ...props }: PageEnterProps) {
  const enterDelay = `${delay ?? index * ENTER_STAGGER}s`;
  return (
    <Element
      {...props}
      className={cn("page-enter", className)}
      style={{ ...style, "--enter-delay": enterDelay } as CSSProperties}
    />
  );
}
