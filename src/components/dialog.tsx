"use client";

import { createContext, useContext, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import {
  Description as HeadlessDescription,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle as HeadlessDialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { bouncySpring, motionTransition, overlayFade } from "@/lib/transitions";
import { cn } from "@/lib/utils";

interface DialogContextValue {
  open: boolean;
  onClose: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

interface DialogProps extends DialogContextValue {
  children: ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  // Montado mientras está abierto o animando la salida; después se retira del DOM.
  const [mounted, setMounted] = useState(open);
  if (open && !mounted) setMounted(true);

  return (
    <DialogContext.Provider value={{ open, onClose }}>
      {mounted ? (
        // `static` mantiene el árbol montado para que AnimatePresence anime la salida.
        <HeadlessDialog static open={open} onClose={onClose} className="relative z-50">
          <AnimatePresence onExitComplete={() => setMounted(false)}>{open ? children : null}</AnimatePresence>
        </HeadlessDialog>
      ) : null}
    </DialogContext.Provider>
  );
}

interface DialogOverlayProps {
  className?: string;
  onClose?: () => void;
  "aria-label"?: string;
}

/** Fondo que cierra al hacer clic (también lo usa la bandeja del menú móvil). */
export function DialogOverlay({ className, onClose, "aria-label": ariaLabel = "Close" }: DialogOverlayProps) {
  const reduceMotion = useReducedMotion();
  const dialog = useContext(DialogContext);
  const handleClose = onClose ?? (() => dialog?.onClose(false));

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      className={cn("fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={motionTransition(overlayFade, reduceMotion)}
      onClick={handleClose}
    />
  );
}

export function DialogContent({ className, children }: { className?: string; children: ReactNode }) {
  const dialog = useContext(DialogContext);
  if (!dialog) throw new Error("DialogContent must be used within <Dialog>");
  const reduceMotion = useReducedMotion();

  return (
    <>
      <DialogOverlay key="backdrop" aria-label="Close dialog" onClose={() => dialog.onClose(false)} />
      <motion.div
        key="panel"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92, y: 12 }}
        transition={motionTransition(bouncySpring, reduceMotion)}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <DialogPanel
          className={cn(
            "pointer-events-auto flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-2xl bg-card p-6 shadow-lg ring-1 shadow-foreground/5 ring-border",
            className,
          )}
        >
          {children}
        </DialogPanel>
      </motion.div>
    </>
  );
}

export function DialogHeader({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: ComponentPropsWithoutRef<typeof HeadlessDialogTitle>) {
  return (
    <HeadlessDialogTitle
      className={cn("text-base font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }: ComponentPropsWithoutRef<typeof HeadlessDescription>) {
  return <HeadlessDescription className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
