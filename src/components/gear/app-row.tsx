import Image from "next/image";

import { ExternalLink } from "@/components/external-link";
import type { GearApp } from "@/content/gear";
import { ICON_CHROME_CLASS } from "@/lib/icon-chrome";
import { cn } from "@/lib/utils";

/** App: logo oficial en su placa, nombre, uso y sitio oficial. */
export function AppRow({ app }: { app: GearApp }) {
  return (
    <li className="flex items-start gap-5">
      <div className={cn("flex size-12 flex-none items-center justify-center rounded-xl", ICON_CHROME_CLASS)}>
        <Image
          src={app.logo}
          alt=""
          width={28}
          height={28}
          unoptimized
          className={cn("size-7 rounded-md object-contain", app.monochrome && "logo-mono")}
        />
      </div>
      <div className="min-w-0 pt-0.5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{app.name}</h3>
        <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{app.description}</p>
        <div className="mt-3">
          <ExternalLink href={app.href}>
            Visit site
            <span className="sr-only">: {app.name}</span>
          </ExternalLink>
        </div>
      </div>
    </li>
  );
}
