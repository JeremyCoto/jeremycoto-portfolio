import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { StackLogo } from "@/components/stack-logo";
import { getStackEntry, stackHref } from "@/content/stack";

interface TechChip {
  name: string;
  /** Slug de /stack; sin él se muestra como texto (p. ej. n8n). */
  stack?: string;
}

const CHIP = "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-border";

/** Tecnologías como chips de logo + nombre; enlazan a su página de Stack cuando existe. */
export function TechChips({ items }: { items: readonly TechChip[] }) {
  return (
    <ul role="list" className="flex flex-wrap gap-3">
      {items.map((item) => {
        const entry = item.stack ? getStackEntry(item.stack) : undefined;
        if (!entry) {
          return (
            <li key={item.name} className={`${CHIP} text-muted-foreground`}>
              {item.name}
            </li>
          );
        }
        return (
          <li key={item.name}>
            <Link
              href={stackHref(entry.slug)}
              className={`${CHIP} group bg-card text-foreground transition hover:ring-foreground/20 dark:bg-muted/40`}
            >
              <StackLogo item={entry} size={16} className="rounded-[4px]" />
              {entry.name}
              <ChevronRightIcon className="-mr-1 size-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
