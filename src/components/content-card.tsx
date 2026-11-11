import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { Halo } from "@/components/halo";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  as?: "article" | "div" | "li";
  className?: string;
  children: ReactNode;
}

export function ContentCard({ as: Component = "div", className, children }: ContentCardProps) {
  return <Component className={cn("group relative flex flex-col items-start", className)}>{children}</Component>;
}

interface ContentCardTitleProps {
  as?: "h2" | "h3";
  href?: string;
  external?: boolean;
  /** Fondo gris con halo que aparece al pasar el ratón por la tarjeta. */
  hoverBackground?: boolean;
  className?: string;
  children: ReactNode;
}

function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:)/.test(href);
}

export function ContentCardTitle({
  as: Component = "h2",
  href,
  external = false,
  hoverBackground = true,
  className,
  children,
}: ContentCardTitleProps) {
  const opensNewTab = external && !href?.startsWith("mailto:");
  const linkContent = (
    <>
      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
      <span className="relative z-10">{children}</span>
    </>
  );

  return (
    <Component className={cn("text-base font-semibold tracking-tight text-foreground", className)}>
      {href ? (
        <>
          {hoverBackground ? (
            <div className="pointer-events-none absolute -inset-x-4 -inset-y-6 z-0 sm:-inset-x-6">
              <Halo className="h-full w-full scale-95 rounded-2xl bg-muted opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </div>
          ) : null}
          {isExternalHref(href) ? (
            <a
              href={href}
              target={opensNewTab ? "_blank" : undefined}
              rel={opensNewTab ? "noopener noreferrer" : undefined}
            >
              {linkContent}
            </a>
          ) : (
            <Link href={href}>{linkContent}</Link>
          )}
        </>
      ) : (
        children
      )}
    </Component>
  );
}

export function ContentCardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("relative z-10 mt-2 text-sm text-muted-foreground", className)}>{children}</p>;
}

type EyebrowProps<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T;
  className?: string;
  children: ReactNode;
};

export function ContentCardEyebrow<T extends ElementType = "p">({
  as,
  className,
  children,
  ...props
}: EyebrowProps<T>) {
  const Component: ElementType = as ?? "p";
  return (
    <Component
      className={cn(className, "relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground")}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ContentCardCta({ children, external = false }: { children: ReactNode; external?: boolean }) {
  const Icon = external ? ArrowUpRightIcon : ChevronRightIcon;
  return (
    <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-accent">
      {children}
      <Icon className="ml-1 size-4" />
    </div>
  );
}
