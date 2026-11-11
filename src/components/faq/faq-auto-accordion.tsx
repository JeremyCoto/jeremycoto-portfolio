"use client";

/*
 * FAQ Auto Accordion — adaptado de Ruixen UI (faq-auto-accordion).
 * Barra que viaja entre preguntas con layoutId, altura con resorte, revelado de
 * desenfocado a nítido y barra de progreso del avance automático.
 * Cambios: pausa con foco de teclado, fuera de pantalla y con movimiento reducido;
 * keyframes en tailwind.css; ids accesibles por pregunta.
 */
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAutoAccordionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  /** Segundos por pregunta en el avance automático. 0 lo desactiva. */
  autoInterval?: number;
  className?: string;
}

const LAYOUT_SPRING = { type: "spring", stiffness: 400, damping: 35 } as const;
const ACCENT_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const;

export function FAQAutoAccordion({
  title = "Have questions?",
  subtitle = "Everything you need to know.",
  items,
  autoInterval = 6,
  className,
}: FAQAutoAccordionProps) {
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const autoEnabled = autoInterval > 0 && !reduceMotion && items.length > 1;
  const paused = hovered || keyboardFocus || !isInView;

  // Avance automático: solo si está visible, sin interacción y con movimiento permitido.
  useEffect(() => {
    if (!autoEnabled || paused || active === null) return;
    const timer = window.setTimeout(() => {
      setActive((previous) => (previous === null ? 0 : (previous + 1) % items.length));
      setCycleKey((key) => key + 1);
    }, autoInterval * 1000);
    return () => window.clearTimeout(timer);
  }, [active, autoEnabled, autoInterval, paused, items.length, cycleKey]);

  const toggle = useCallback((index: number) => {
    setActive((previous) => (previous === index ? null : index));
    setCycleKey((key) => key + 1);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCycleKey((key) => key + 1);
      }}
      onFocusCapture={(event) => {
        // Solo el foco de teclado pausa: un clic deja el botón enfocado y no debe detener el avance.
        if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setKeyboardFocus(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
      }}
    >
      <div className="mx-auto max-w-xl px-6">
        {title ? (
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
            {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
        ) : null}

        <LayoutGroup>
          <div>
            {items.map((item, index) => {
              const isActive = active === index;
              const buttonId = `${baseId}-question-${index}`;
              const panelId = `${baseId}-answer-${index}`;

              return (
                <motion.div key={item.question} layout="position" transition={{ layout: LAYOUT_SPRING }}>
                  <button
                    id={buttonId}
                    type="button"
                    className="relative flex w-full items-center gap-4 rounded-md py-[14px] text-left outline-offset-4"
                    onClick={() => toggle(index)}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                  >
                    <span className="relative flex w-[3px] shrink-0 self-stretch">
                      {isActive ? (
                        <motion.span
                          layoutId={`${baseId}-accent`}
                          className="absolute inset-0 rounded-full bg-foreground"
                          transition={reduceMotion ? { duration: 0 } : ACCENT_SPRING}
                        />
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-[15px] font-medium transition-colors duration-200",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/70",
                      )}
                    >
                      {item.question}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0 }}
                        animate={{ height: "auto", transition: { type: "spring", stiffness: 300, damping: 30 } }}
                        exit={{ height: 0, transition: { type: "spring", stiffness: 400, damping: 35 } }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                              y: { type: "spring", stiffness: 380, damping: 26, delay: 0.04 },
                              opacity: { duration: 0.25, delay: 0.04 },
                              filter: { duration: 0.3, delay: 0.04 },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            filter: "blur(2px)",
                            transition: { opacity: { duration: 0.12 }, filter: { duration: 0.12 } },
                          }}
                          className="pr-2 pb-4 pl-[19px] text-[13px] leading-relaxed text-muted-foreground"
                        >
                          {item.answer}
                        </motion.p>

                        {autoEnabled ? (
                          <div className="mr-2 mb-3 ml-[19px] h-px overflow-hidden rounded-full bg-foreground/[0.06]">
                            <div
                              key={`bar-${index}-${cycleKey}`}
                              className="faq-auto-bar h-full origin-left scale-x-0 rounded-full bg-foreground/15"
                              style={{
                                animationDuration: `${autoInterval}s`,
                                animationPlayState: paused ? "paused" : "running",
                              }}
                            />
                          </div>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
