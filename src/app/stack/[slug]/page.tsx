import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailLayout } from "@/components/detail/detail-layout";
import { ExternalLink } from "@/components/external-link";
import { DetailList, DetailText } from "@/components/detail/detail-list";
import { TechChips } from "@/components/detail/tech-chips";
import { Section } from "@/components/section";
import { StackLogo } from "@/components/stack-logo";
import { getService, serviceHref, type Service } from "@/content/services";
import { STACK_ENTRIES, STACK_PATH, getRelatedStack, getStackEntry } from "@/content/stack";
import { ICON_CHROME_CLASS } from "@/lib/icon-chrome";
import { cn } from "@/lib/utils";

interface StackPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return STACK_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: StackPageProps): Promise<Metadata> {
  const entry = getStackEntry((await params).slug);
  if (!entry) return {};
  return { title: entry.name, description: `${entry.category}. ${entry.workflow}` };
}

export default async function StackEntryPage({ params }: StackPageProps) {
  const entry = getStackEntry((await params).slug);
  if (!entry) notFound();
  const services = entry.services
    .map((slug) => getService(slug))
    .filter((service): service is Service => service !== undefined);
  const related = getRelatedStack(entry);

  return (
    <DetailLayout
      eyebrow={entry.category}
      title={entry.name}
      intro={entry.workflow}
      backHref={STACK_PATH}
      backLabel="Back to stack"
      media={
        <div className={cn("flex size-16 items-center justify-center rounded-2xl", ICON_CHROME_CLASS)}>
          <StackLogo item={entry} size={40} className="rounded-lg" />
        </div>
      }
    >
      <Section title="What it is">
        <DetailText paragraphs={[entry.description]} />
      </Section>
      <Section title={entry.pointsLabel}>
        <DetailList items={entry.points} />
      </Section>
      {entry.secondary ? (
        <Section title="In my daily workflow">
          <div className="space-y-8">
            <DetailText paragraphs={[entry.secondary.description]} />
            <DetailList items={entry.secondary.points} />
          </div>
        </Section>
      ) : null}
      {services.length > 0 ? (
        <Section title="Where I use it">
          <ul role="list" className="flex flex-wrap gap-x-6 gap-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={serviceHref(service.slug)} className="link-underline text-base text-foreground">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      {related.length > 0 ? (
        <Section title="Works with">
          <TechChips items={related.map((item) => ({ name: item.name, stack: item.slug }))} />
        </Section>
      ) : null}
      <Section title="Official resources">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <ExternalLink href={entry.docs}>Documentation</ExternalLink>
          <ExternalLink href={entry.href}>Official website</ExternalLink>
        </div>
      </Section>
    </DetailLayout>
  );
}
