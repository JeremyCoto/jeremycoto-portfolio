"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "motion/react";

import { Halo } from "@/components/halo";
import { motionTransition } from "@/lib/transitions";

/** Retraso para que el icono cambie después del cambio de colores. */
const ICON_SWAP_DELAY_MS = 120;

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [iconDark, setIconDark] = useState(false);
  const iconSynced = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!mounted) return;
    const delay = !iconSynced.current || reduceMotion ? 0 : ICON_SWAP_DELAY_MS;
    iconSynced.current = true;
    const timeout = window.setTimeout(() => setIconDark(resolvedTheme === "dark"), delay);
    return () => window.clearTimeout(timeout);
  }, [mounted, reduceMotion, resolvedTheme]);

  const transition = motionTransition({ type: "spring", duration: 0.36, bounce: 0.15 }, reduceMotion);
  const visible = { opacity: 1, y: 0 };

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      className="group relative rounded-full bg-card/90 px-3 py-2 shadow-lg ring-1 shadow-foreground/5 ring-border backdrop-blur-sm transition dark:bg-muted/90 dark:hover:ring-foreground/20"
      onClick={() => setTheme(otherTheme)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-full max-md:hidden">
        <Halo />
      </div>
      <span className="relative z-10 block size-6 overflow-visible">
        {!mounted ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <SunIcon className="size-6 text-muted-foreground" />
          </span>
        ) : (
          <>
            <motion.span
              initial={false}
              animate={iconDark ? { opacity: 0, y: 12 } : visible}
              transition={transition}
              style={{ zIndex: iconDark ? 0 : 1 }}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <SunIcon className="size-6 text-muted-foreground transition group-hover:text-foreground" />
            </motion.span>
            <motion.span
              initial={false}
              animate={iconDark ? visible : { opacity: 0, y: -12 }}
              transition={transition}
              style={{ zIndex: iconDark ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <MoonIcon className="size-6 text-accent transition" />
            </motion.span>
          </>
        )}
      </span>
    </button>
  );
}
