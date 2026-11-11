import { cn } from "@/lib/utils";

/** Lista editorial con guiones finos: nunca numerada. */
export function DetailList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul role="list" className={cn("space-y-4", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-base text-muted-foreground">
          <span aria-hidden className="mt-[0.85rem] h-px w-3 flex-none bg-foreground/30" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DetailText({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-6 text-base text-pretty text-muted-foreground">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
