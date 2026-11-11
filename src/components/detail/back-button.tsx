"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import { AppContext } from "@/app/providers";

interface BackButtonProps {
  /** Página de la lista a la que se vuelve si no hay historial dentro del sitio. */
  fallbackHref: string;
  label: string;
}

/** Vuelve a la página anterior (conserva su scroll) o, si se entró directo, a la lista. */
export function BackButton({ fallbackHref, label }: BackButtonProps) {
  const router = useRouter();
  const { previousPathname } = useContext(AppContext);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => (previousPathname ? router.back() : router.push(fallbackHref))}
      className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-md ring-1 shadow-foreground/5 ring-border transition hover:ring-foreground/15 dark:bg-muted dark:ring-0 dark:hover:ring-1 dark:hover:ring-foreground/20"
    >
      <ArrowUturnLeftIcon className="size-4 text-muted-foreground transition group-hover:text-foreground" />
    </button>
  );
}
