"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Remonta el contenido por ruta para que las entradas se repitan al navegar. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="contents">
      {children}
    </div>
  );
}
