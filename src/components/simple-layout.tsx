import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { PageEnter } from "@/components/page-enter";

interface SimpleLayoutProps {
  title: string;
  intro: ReactNode;
  children?: ReactNode;
  animateChildren?: boolean;
}

export function SimpleLayout({ title, intro, children, animateChildren = true }: SimpleLayoutProps) {
  return (
    <Container className="mt-16 sm:mt-32">
      <PageEnter as="header" className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-6 text-base text-muted-foreground">{intro}</p>
      </PageEnter>
      {children && animateChildren ? (
        <PageEnter className="mt-16 sm:mt-20" index={1}>
          {children}
        </PageEnter>
      ) : null}
      {children && !animateChildren ? <div className="mt-16 sm:mt-20">{children}</div> : null}
    </Container>
  );
}
