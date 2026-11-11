import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  tone?: "accent" | "muted";
}

/** Enlace externo con flecha: siempre en pestaña nueva y sin acceso a window.opener. */
export function ExternalLink({ href, children, tone = "accent" }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/link inline-flex items-center gap-1 text-sm font-medium transition",
        tone === "accent" ? "text-accent hover:text-accent/80" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
      <ArrowUpRightIcon className="size-3.5 transition group-hover/link:translate-x-px group-hover/link:-translate-y-px" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
