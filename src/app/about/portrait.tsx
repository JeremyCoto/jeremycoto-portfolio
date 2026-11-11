"use client";

import type { ReactNode } from "react";

import { PageEnter } from "@/components/page-enter";
import { PhotoCard } from "@/components/photo-card";
import { PORTRAIT } from "@/content/photos";
import { useMediaQuery } from "@/hooks/use-media-query";

const DESKTOP_QUERY = "(min-width: 768px)";

export function Portrait() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  return (
    <div className="max-w-[19.25rem] px-2.5 md:max-w-none">
      <PhotoCard
        {...PORTRAIT}
        index={isDesktop ? 3 : 0}
        priority
        sizes="(min-width: 1280px) 28rem, (min-width: 768px) calc((100vw - 12rem) / 2), 18rem"
        className="w-full sm:w-full"
        rotationClassName="rotate-3"
      />
    </div>
  );
}

export function SocialLinksEnter({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  return (
    <PageEnter className="md:pl-8 lg:pl-20" delay={isDesktop ? 0.3 : 0.13}>
      {children}
    </PageEnter>
  );
}
