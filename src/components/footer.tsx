import Link from "next/link";

import { ContainerInner, ContainerOuter } from "@/components/container";
import { NAV_ITEMS, SITE } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-border pt-10 pb-16">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-foreground">
                {NAV_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-accent">
                    {item.label}
                  </Link>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                &copy; {year} {SITE.name}.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
