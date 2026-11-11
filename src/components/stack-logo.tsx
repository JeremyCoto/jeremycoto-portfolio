import Image from "next/image";

import type { StackItem } from "@/content/stack";
import { cn } from "@/lib/utils";

/** Logo de una tecnología; los de una sola tinta oscura se invierten en tema oscuro. */
export function StackLogo({ item, size, className }: { item: StackItem; size: number; className?: string }) {
  return (
    <Image
      src={item.logo}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={cn("object-contain", item.monochrome && "logo-mono", className)}
      style={{ width: size, height: size }}
    />
  );
}
