"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, type MotionStyle } from "motion/react";

import { dragTransition } from "@/lib/transitions";
import { cn } from "@/lib/utils";

/**
 * Ancho desde sm: hasta 18rem, y menos si hace falta para que las 5 fotos de la galería
 * quepan completas (4 separaciones de 2rem + 2rem de margen por lado = 12rem).
 */
const FLUID_WIDTH = "sm:w-[min(18rem,calc((100vw-12rem)/5))]";

/** Calidad de las fotos personales (lista permitida en next.config.ts). */
export const PHOTO_QUALITY = 90;
/** Retraso entre fotos al entrar. */
const PHOTO_STAGGER = 0.1;

const REST_SHADOW = "0 6px 16px -8px rgb(0 0 0 / 0.18)";
const LIFT_SHADOW = "0 28px 48px -18px rgb(0 0 0 / 0.38)";
/** Resorte del hover: firme y con un rebote mínimo, para que se sienta táctil. */
const HOVER_SPRING = { type: "spring", stiffness: 320, damping: 24, mass: 0.7 } as const;

interface PhotoCardProps {
  image: StaticImageData;
  alt: string;
  objectPosition?: string;
  aspectClassName?: string;
  className?: string;
  /** Rotación de Tailwind (propiedad CSS `rotate`, independiente del transform de Motion). */
  rotationClassName?: string;
  sizes?: string;
  isDraggable?: boolean;
  index?: number;
  priority?: boolean;
}

/** Foto girada con elevación al pasar el ratón; si se arrastra, vuelve a su sitio. */
export function PhotoCard({
  image,
  alt,
  objectPosition,
  aspectClassName = "aspect-[4/5]",
  className,
  rotationClassName,
  sizes = "(min-width: 1500px) 18rem, (min-width: 640px) 20vw, 11rem",
  isDraggable = true,
  index = 0,
  priority = false,
}: PhotoCardProps) {
  const reduceMotion = useReducedMotion();
  const canDrag = isDraggable && !reduceMotion;

  return (
    <motion.figure
      drag={canDrag}
      dragSnapToOrigin
      dragElastic={0.15}
      dragTransition={dragTransition}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.03, boxShadow: LIFT_SHADOW, transition: HOVER_SPRING }}
      whileDrag={{ scale: 1.06, boxShadow: LIFT_SHADOW, zIndex: 40 }}
      style={{ boxShadow: REST_SHADOW, "--enter-delay": `${index * PHOTO_STAGGER}s` } as MotionStyle}
      className={cn(
        "photo-enter relative z-30 w-44 flex-none overflow-hidden rounded-xl bg-muted sm:rounded-2xl",
        FLUID_WIDTH,
        canDrag && "cursor-grab active:cursor-grabbing",
        rotationClassName,
        className,
      )}
    >
      <div className={cn("relative", aspectClassName)}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          quality={PHOTO_QUALITY}
          priority={priority}
          placeholder="blur"
          draggable={false}
          className="pointer-events-none object-cover"
          style={{ objectPosition: objectPosition ?? "center" }}
        />
      </div>
    </motion.figure>
  );
}
