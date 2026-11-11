import type { ReactNode } from "react";

import { BackButton } from "@/components/detail/back-button";
import { Container } from "@/components/container";
import { PageEnter } from "@/components/page-enter";

interface DetailLayoutProps {
  /** Etiqueta descriptiva sobre el título (sin numeración). */
  eyebrow: string;
  title: string;
  intro: string;
  backHref: string;
  backLabel: string;
  /** Imagen de marca opcional junto a la cabecera (logo de una tecnología). */
  media?: ReactNode;
  children: ReactNode;
}

export function DetailLayout({ eyebrow, title, intro, backHref, backLabel, media, children }: DetailLayoutProps) {
  return (
    <Container className="mt-16 sm:mt-28">
      <BackButton fallbackHref={backHref} label={backLabel} />
      <PageEnter as="header" className="max-w-2xl">
        {media ? <div className="mb-8">{media}</div> : null}
        <p className="flex items-center text-sm text-muted-foreground">
          <span aria-hidden className="h-4 w-0.5 rounded-full bg-foreground/20" />
          <span className="ml-3">{eyebrow}</span>
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg/8 text-pretty text-muted-foreground">{intro}</p>
      </PageEnter>
      <PageEnter index={1} className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
        {children}
      </PageEnter>
    </Container>
  );
}
