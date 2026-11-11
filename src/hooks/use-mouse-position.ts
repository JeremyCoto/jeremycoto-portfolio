"use client";

import { useEffect, useState, type RefObject } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
}

/** Posición del puntero relativa al elemento (para el halo). */
export function useMousePosition(ref: RefObject<HTMLElement | null>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: null, y: null });

  useEffect(() => {
    function onMove(event: MouseEvent) {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [ref]);

  return position;
}
