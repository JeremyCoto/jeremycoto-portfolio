import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const VARIANT_STYLES = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/80",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
  ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
  link: "h-auto px-0 py-0 text-foreground underline-offset-4 hover:underline",
} as const;

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-offset-2 transition-all active:not-aria-[haspopup]:translate-y-px disabled:opacity-60";

type Variant = keyof typeof VARIANT_STYLES;

type ButtonProps = { variant?: Variant } & (
  (ComponentPropsWithoutRef<"button"> & { href?: undefined }) | ComponentPropsWithoutRef<typeof Link>
);

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = cn(BASE, VARIANT_STYLES[variant], className);
  if (typeof props.href === "undefined") {
    return <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)} />;
  }
  return <Link className={classes} {...(props as ComponentPropsWithoutRef<typeof Link>)} />;
}
