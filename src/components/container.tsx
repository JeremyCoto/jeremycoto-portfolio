import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type DivProps = ComponentPropsWithoutRef<"div">;

/** Contenedor exterior: ancho máximo 7xl (1280 px). */
export const ContainerOuter = forwardRef<HTMLDivElement, DivProps>(function ContainerOuter(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("sm:px-8", className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  );
});

/** Contenedor interior: el contenido queda en 2xl (móvil) y 5xl (≥ md). */
export const ContainerInner = forwardRef<HTMLDivElement, DivProps>(function ContainerInner(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("relative px-4 sm:px-8 lg:px-12", className)} {...props}>
      <div className="mx-auto max-w-2xl md:max-w-5xl">{children}</div>
    </div>
  );
});

export const Container = forwardRef<HTMLDivElement, DivProps>(function Container({ children, ...props }, ref) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  );
});
