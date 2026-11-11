"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { DialogOverlay } from "@/components/dialog";
import { currentPageLabel } from "@/components/header/current-page";
import { NAV_ITEMS } from "@/content/site";
import { bouncySpring, contentFade, motionTransition } from "@/lib/transitions";
import { cn } from "@/lib/utils";

interface Bounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

const TRAY_MARGIN = 16;
const TRAY_TOP = 32;
const TRAY_RADIUS = 24;

/** Botón píldora que se transforma (resorte con rebote) en una bandeja con la navegación. */
export function MobileNavigation({ className }: { className?: string }) {
  const pathname = usePathname();
  const currentPage = currentPageLabel(pathname);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  // Sigue montada durante la animación de salida para que el botón real no aparezca antes.
  const [trayMounted, setTrayMounted] = useState(false);
  const [origin, setOrigin] = useState<Bounds | null>(null);
  const [target, setTarget] = useState<Bounds | null>(null);
  const [pathnameWhenOpen, setPathnameWhenOpen] = useState(pathname);

  // Cerrar al cambiar de ruta (patrón de estado derivado de React).
  if (pathnameWhenOpen !== pathname) {
    setPathnameWhenOpen(pathname);
    setOpen(false);
  }

  function openMenu() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    setTarget({ top: TRAY_TOP, left: TRAY_MARGIN, width: window.innerWidth - TRAY_MARGIN * 2, height: rect.height });
    setTrayMounted(true);
    setOpen(true);
    triggerRef.current?.blur();
  }

  function closeMenu() {
    setOpen(false);
  }

  function measureTargetHeight() {
    const content = contentRef.current;
    if (!content) return;
    const height = content.scrollHeight;
    setTarget((current) => (current && current.height !== height ? { ...current, height } : current));
  }

  useLayoutEffect(() => {
    if (open) measureTargetHeight();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onResize() {
      setTarget((current) =>
        current ? { ...current, left: TRAY_MARGIN, width: window.innerWidth - TRAY_MARGIN * 2 } : current,
      );
      requestAnimationFrame(measureTargetHeight);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const transition = motionTransition(bouncySpring, reduceMotion);
  const labelFade = motionTransition(contentFade, reduceMotion);
  // Mitad de la altura = cápsula exacta (un radio enorme tardaría en "asentarse").
  const pillRadius = origin ? origin.height / 2 : 20;
  const collapsed = origin
    ? { top: origin.top, left: origin.left, width: origin.width, height: origin.height, borderRadius: pillRadius }
    : undefined;

  return (
    <div className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "pointer-events-auto flex items-center rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg ring-1 shadow-foreground/5 ring-border transition dark:bg-muted dark:hover:ring-foreground/20",
          trayMounted && "invisible",
        )}
        onClick={openMenu}
      >
        {currentPage}
        <ChevronDownIcon className="ml-3 size-3 text-muted-foreground" />
      </button>

      <AnimatePresence onExitComplete={() => setTrayMounted(false)}>
        {open && origin && target ? (
          <>
            <DialogOverlay key="backdrop" aria-label="Close menu" onClose={closeMenu} className="bg-transparent" />
            <motion.div
              key="tray"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="pointer-events-auto fixed z-50 overflow-hidden bg-card shadow-lg ring-1 shadow-foreground/5 ring-border dark:bg-muted"
              initial={collapsed}
              animate={{ ...target, borderRadius: TRAY_RADIUS }}
              exit={collapsed}
              transition={transition}
            >
              {/* El rótulo de la página queda sobre la misma superficie durante la transformación. */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={labelFade}
              >
                <span className="flex items-center">
                  {currentPage}
                  <ChevronDownIcon className="ml-3 size-3 text-muted-foreground" />
                </span>
              </motion.div>

              <div ref={contentRef} className="p-8" style={{ width: target.width }}>
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ ...labelFade, delay: reduceMotion ? 0 : 0.06 }}
                >
                  <div className="flex flex-row-reverse items-center justify-between">
                    <button type="button" aria-label="Close menu" className="-m-1 p-1" onClick={closeMenu}>
                      <XMarkIcon className="size-6 text-muted-foreground" />
                    </button>
                    <h2 id={titleId} className="text-sm font-medium text-muted-foreground">
                      Navigation
                    </h2>
                  </div>
                  <nav className="mt-6" aria-label="Mobile">
                    <ul className="-my-2 divide-y divide-border text-base text-foreground">
                      {NAV_ITEMS.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block py-2" onClick={closeMenu}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
