import type { Metadata } from "next";

import { ContentCard, ContentCardDescription, ContentCardTitle } from "@/components/content-card";
import { PageEnter } from "@/components/page-enter";
import { Section } from "@/components/section";
import { SimpleLayout } from "@/components/simple-layout";
import { StackOrbit } from "@/components/stack/stack-orbit";
import { StackLogo } from "@/components/stack-logo";
import { STACK_GROUPS, STACK_INTRO, getStackEntry, stackHref, stackSlug, summarize } from "@/content/stack";
import type { StackItem } from "@/content/stack";
import { ICON_CHROME_CLASS } from "@/lib/icon-chrome";
import { cn } from "@/lib/utils";

const HERO_TITLE = "Technologies and tools I use to build and ship.";

export const metadata: Metadata = {
  title: "Stack",
  description: STACK_INTRO,
};

function StackRow({ item }: { item: StackItem }) {
  const entry = getStackEntry(stackSlug(item.name));
  return (
    <ContentCard as="li" className="flex-row items-start gap-6">
      <div className="flex w-14 shrink-0 justify-center sm:w-[4.25rem]">
        <div className={cn("relative z-20 flex size-12 items-center justify-center rounded-xl", ICON_CHROME_CLASS)}>
          <StackLogo item={item} size={32} className="rounded-md" />
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <ContentCardTitle as="h3" href={stackHref(stackSlug(item.name))}>
          {item.name}
        </ContentCardTitle>
        {entry ? <p className="relative z-10 mt-1 text-xs text-muted-foreground">{entry.category}</p> : null}
        <ContentCardDescription className="text-pretty">{summarize(item.description)}</ContentCardDescription>
      </div>
    </ContentCard>
  );
}

export default function Stack() {
  return (
    <SimpleLayout title={HERO_TITLE} intro={STACK_INTRO} animateChildren={false}>
      <PageEnter index={1}>
        <StackOrbit />
      </PageEnter>
      <div className="mt-20 space-y-20 sm:mt-24">
        {STACK_GROUPS.map((group, index) => (
          <PageEnter key={group.title} index={index + 2}>
            <Section title={group.title}>
              <ul role="list" className="space-y-12 sm:space-y-14">
                {group.items.map((item) => (
                  <StackRow key={`${group.title}-${item.name}`} item={item} />
                ))}
              </ul>
            </Section>
          </PageEnter>
        ))}
      </div>
    </SimpleLayout>
  );
}
