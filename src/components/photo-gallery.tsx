"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { PhotoCard } from "@/components/photo-card";
import { GALLERY_PHOTOS, GALLERY_ROTATIONS } from "@/content/photos";
import { useMediaQuery } from "@/hooks/use-media-query";
import { dragSpring, dragTransition } from "@/lib/transitions";

/** Galería: fila centrada en escritorio; carrusel arrastrable bajo 640 px. */
export function PhotoGallery() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const isMobile = !isDesktop;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    if (!isMobile) return;
    function measure() {
      const carousel = carouselRef.current;
      if (carousel) setDragWidth(carousel.scrollWidth - carousel.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  const cards = GALLERY_PHOTOS.map((photo, index) => (
    <PhotoCard
      key={photo.image.src}
      {...photo}
      index={index}
      priority={index < 2}
      isDraggable={!isMobile}
      rotationClassName={GALLERY_ROTATIONS[index % GALLERY_ROTATIONS.length]}
    />
  ));

  return (
    <div className="mt-16 sm:mt-20">
      {isMobile ? (
        <div className="relative -my-4 overflow-hidden py-4">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragElastic={0.15}
            dragConstraints={{ right: 0, left: -dragWidth }}
            dragTransition={dragTransition}
            transition={dragSpring}
            className="flex cursor-grab gap-5 will-change-transform active:cursor-grabbing"
          >
            {cards}
          </motion.div>
        </div>
      ) : (
        <div className="-my-4 flex justify-center gap-5 overflow-visible py-4 sm:gap-8">{cards}</div>
      )}
    </div>
  );
}
