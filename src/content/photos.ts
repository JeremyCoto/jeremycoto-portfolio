import type { StaticImageData } from "next/image";

// Generadas por scripts/prepare-images.mjs desde ~/Documents/Jeremy_IMG (originales intactos).
import downtown from "@/images/photos/downtown.jpg";
import drive from "@/images/photos/drive.jpg";
import me from "@/images/photos/me.jpg";
import street from "@/images/photos/street.jpg";
import sunset from "@/images/photos/sunset.jpg";
import walk from "@/images/photos/walk.jpg";

export interface Photo {
  image: StaticImageData;
  /** Solo describe lo que se ve (sin lugares ni historias inventadas). */
  alt: string;
  objectPosition?: string;
}

export const GALLERY_PHOTOS: Photo[] = [
  { image: downtown, alt: "Tall buildings and a street lamp" },
  { image: walk, alt: "Jeremy Coto walking across a plaza", objectPosition: "top" },
  { image: street, alt: "A street lined with cars between buildings" },
  { image: sunset, alt: "Orange and purple sunset over a parking lot" },
  { image: drive, alt: "View from the driver’s seat of a car" },
];

/** Rotaciones de la galería: mismo patrón que la referencia. */
export const GALLERY_ROTATIONS = ["rotate-2", "-rotate-2", "rotate-2", "rotate-2", "-rotate-2"];

export const PORTRAIT: Photo = {
  image: me,
  alt: "Portrait of Jeremy Coto",
};
