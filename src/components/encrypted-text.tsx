"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

interface EncryptedTextProps {
  text: string;
  className?: string;
  revealDelayMs?: number;
  initialDelayMs?: number;
  scrambleHoldMs?: number;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
}

function randomCharacter(): string {
  return DEFAULT_CHARSET.charAt(Math.floor(Math.random() * DEFAULT_CHARSET.length));
}

/** Mezcla determinista inicial (igual en servidor y cliente: sin errores de hidratación). */
function initialScramble(text: string): string[] {
  return Array.from(text, (character, index) =>
    character === " " ? " " : String.fromCharCode(65 + ((character.charCodeAt(0) + index * 11) % 26)),
  );
}

/** Texto que empieza cifrado y se revela letra a letra; se repite al pasar el ratón. */
export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  initialDelayMs = 450,
  scrambleHoldMs = 600,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const characters = useMemo(() => Array.from(text), [text]);
  const [revealCount, setRevealCount] = useState(0);
  const [scramble, setScramble] = useState<string[]>(() => initialScramble(text));
  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    let frameId = 0;
    let startTime = 0;
    let lastFlip = 0;
    let previousCount = -1;
    let cancelled = false;

    const update = (now: number) => {
      if (cancelled) return;
      if (startTime === 0) {
        startTime = now;
        lastFlip = now;
      }
      const count = Math.min(
        characters.length,
        Math.floor(Math.max(0, now - startTime - scrambleHoldMs) / Math.max(1, revealDelayMs)),
      );
      if (count !== previousCount) {
        previousCount = count;
        setRevealCount(count);
      }
      if (count >= characters.length) return;
      if (now - lastFlip >= flipDelayMs) {
        setScramble((current) =>
          current.map((character, index) =>
            index < count || characters[index] === " " ? character : randomCharacter(),
          ),
        );
        lastFlip = now;
      }
      frameId = requestAnimationFrame(update);
    };

    const timeoutId = window.setTimeout(
      () => {
        frameId = requestAnimationFrame(update);
      },
      replayCount === 0 ? initialDelayMs : 0,
    );
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [characters, flipDelayMs, initialDelayMs, isInView, reduceMotion, replayCount, revealDelayMs, scrambleHoldMs]);

  if (!text) return null;

  return (
    <span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse" || reduceMotion) return;
        setScramble(characters.map((character) => (character === " " ? " " : randomCharacter())));
        setRevealCount(0);
        setReplayCount((count) => count + 1);
      }}
    >
      {characters.map((character, index) => {
        const isRevealed = reduceMotion || index < revealCount;
        return (
          <span key={index} aria-hidden className={cn(isRevealed ? revealedClassName : encryptedClassName)}>
            {isRevealed ? character : (scramble[index] ?? "•")}
          </span>
        );
      })}
    </span>
  );
}
