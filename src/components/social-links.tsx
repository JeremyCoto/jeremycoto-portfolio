import type { ComponentType } from "react";

import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { SOCIAL_LINKS, type SocialLink, type SocialName } from "@/content/site";
import { cn } from "@/lib/utils";

type Icon = ComponentType<{ className?: string }>;

export const SOCIAL_ICONS: Record<SocialName, Icon> = {
  instagram: InstagramIcon,
  x: XIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

const COMING_SOON = "coming soon";

/** Fila de iconos de la home. Sin cuenta: icono atenuado, sin enlace. */
export function SocialIconRow() {
  return (
    <div className="mt-6 flex gap-6">
      {SOCIAL_LINKS.map((social) => {
        const Icon = SOCIAL_ICONS[social.name];
        if (!social.href) {
          return (
            <span
              key={social.name}
              role="img"
              aria-label={`${social.network} (${COMING_SOON})`}
              title={`${social.network} · ${COMING_SOON}`}
              className="-m-1 cursor-default p-1"
            >
              <Icon className="size-6 fill-muted-foreground opacity-50" />
            </span>
          );
        }
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group -m-1 p-1"
          >
            <Icon className="size-6 fill-muted-foreground transition group-hover:fill-foreground" />
          </a>
        );
      })}
    </div>
  );
}

/** Elemento de la lista de About (icono + texto). */
export function SocialListItem({ social, className }: { social: SocialLink; className?: string }) {
  const Icon = SOCIAL_ICONS[social.name];
  if (!social.href) {
    return (
      <li className={cn(className, "flex")}>
        <span className="flex text-sm font-medium text-muted-foreground" title={`${social.network} · ${COMING_SOON}`}>
          <Icon className="size-6 flex-none fill-muted-foreground opacity-50" />
          <span className="ml-4">
            {social.label} <span className="font-normal">· Coming soon</span>
          </span>
        </span>
      </li>
    );
  }
  return (
    <li className={cn(className, "flex")}>
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex text-sm font-medium text-foreground transition hover:text-accent"
      >
        <Icon className="size-6 flex-none fill-muted-foreground transition group-hover:fill-accent" />
        <span className="ml-4">{social.label}</span>
      </a>
    </li>
  );
}
