"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

import { isNavActive } from "@/components/header/current-page";
import { Halo } from "@/components/halo";
import { NAV_ITEMS } from "@/content/site";
import { cn } from "@/lib/utils";

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = isNavActive(pathname, href);

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn("relative block px-3 py-2 transition", isActive ? "text-accent" : "hover:text-accent")}
      >
        {label}
        {isActive ? (
          <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-accent/0 via-accent/50 to-accent/0" />
        ) : null}
      </Link>
    </li>
  );
}

export function DesktopNavigation({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav aria-label="Main" {...props} className={cn("group", className)}>
      <div className="relative rounded-full bg-card/90 shadow-lg ring-1 shadow-foreground/5 ring-border backdrop-blur-sm dark:bg-muted/90">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <Halo />
        </div>
        <ul className="relative z-10 flex px-3 text-sm font-medium text-foreground">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
