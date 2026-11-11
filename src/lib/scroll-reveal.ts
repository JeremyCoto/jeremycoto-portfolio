/**
 * Revelado de texto con el scroll (tomado del About del portafolio actual):
 * cada palabra ocupa 1/(palabras + 1) del progreso y se reparte entre sus letras.
 */

/** Opacidad de una letra antes de revelarse. */
export const REVEAL_FROM_OPACITY = 0.2;

export interface RevealChar {
  char: string;
  /** Progreso (0–1) en el que la letra empieza a encenderse. */
  start: number;
  /** 1 / duración: multiplicador para pasar de progreso a 0–1 dentro de la letra. */
  rate: number;
}

/** Párrafos → palabras → letras, con el tramo de progreso de cada letra. */
export function revealRanges(paragraphs: readonly string[]): RevealChar[][][] {
  const words = paragraphs.map((paragraph) => paragraph.split(/\s+/).filter(Boolean));
  const total = words.reduce((sum, list) => sum + list.length, 0) + 1;
  let index = 0;

  return words.map((list) =>
    list.map((word) => {
      const start = index / total;
      index += 1;
      const span = 1 / total / word.length;
      return Array.from(word, (char, i) => ({ char, start: start + span * i, rate: 1 / span }));
    }),
  );
}

/** Opacidad de una letra para un progreso dado (misma fórmula que el CSS). */
export function revealOpacity({ start, rate }: RevealChar, progress: number): number {
  const t = Math.min(Math.max((progress - start) * rate, 0), 1);
  return REVEAL_FROM_OPACITY + (1 - REVEAL_FROM_OPACITY) * t;
}
