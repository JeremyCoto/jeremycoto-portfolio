import type { Metadata } from "next";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

import { Portrait, SocialLinksEnter } from "@/app/about/portrait";
import { ScrollRevealText } from "@/components/about/scroll-reveal-text";
import { Container } from "@/components/container";
import { PageEnter } from "@/components/page-enter";
import { SocialListItem } from "@/components/social-links";
import { ABOUT_HERO_TITLE, ABOUT_PARAGRAPHS, SITE, SOCIAL_LINKS, mailtoHref } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} is an AI software developer based in Costa Rica.`,
};

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-y-12">
        <div className="md:pl-8 lg:pl-20">
          <Portrait />
        </div>
        <PageEnter className="md:order-first md:row-span-2">
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            {ABOUT_HERO_TITLE}
          </h1>
          <ScrollRevealText paragraphs={ABOUT_PARAGRAPHS} className="mt-6 space-y-7 text-base text-muted-foreground" />
        </PageEnter>
        <SocialLinksEnter>
          <ul role="list">
            {SOCIAL_LINKS.map((social, index) => (
              <SocialListItem key={social.name} social={social} className={index > 0 ? "mt-4" : undefined} />
            ))}
            <li className="mt-8 flex border-t border-border pt-8">
              <a
                href={mailtoHref()}
                className="group flex text-sm font-medium text-foreground transition hover:text-accent"
              >
                <EnvelopeIcon className="size-6 flex-none fill-muted-foreground transition group-hover:fill-accent" />
                <span className="ml-4">{SITE.email}</span>
              </a>
            </li>
          </ul>
        </SocialLinksEnter>
      </div>
    </Container>
  );
}
