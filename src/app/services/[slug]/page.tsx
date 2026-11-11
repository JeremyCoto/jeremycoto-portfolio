import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { DetailLayout } from "@/components/detail/detail-layout";
import { DetailList, DetailText } from "@/components/detail/detail-list";
import { TechChips } from "@/components/detail/tech-chips";
import { Section } from "@/components/section";
import { SERVICES, SERVICES_PATH, getRelatedServices, getService, serviceHref } from "@/content/services";
import { mailtoHref } from "@/content/site";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = getRelatedServices(service);

  return (
    <DetailLayout
      eyebrow={service.tagline}
      title={service.title}
      intro={service.intro}
      backHref={SERVICES_PATH}
      backLabel="Back to services"
    >
      <Section title="What it is">
        <DetailText paragraphs={[service.whatItIs]} />
      </Section>
      <Section title="What I build">
        <DetailList items={service.whatIBuild} />
      </Section>
      <Section title="Problems it solves">
        <DetailList items={service.problems} />
      </Section>
      <Section title="How I approach it">
        <DetailText paragraphs={service.approach} />
      </Section>
      <Section title="Technologies and tools">
        <TechChips items={service.technologies} />
      </Section>
      <Section title="Where it applies">
        <DetailList items={service.examples} />
      </Section>
      <Section title="Why it matters">
        <DetailText paragraphs={[service.value]} />
      </Section>
      <Section title="Related services">
        <ul role="list" className="divide-y divide-border">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={serviceHref(item.slug)}
                className="group flex items-center justify-between gap-6 py-4 first:pt-0"
              >
                <span>
                  <span className="block text-base font-semibold tracking-tight text-foreground transition group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.tagline}</span>
                </span>
                <ChevronRightIcon className="size-4 flex-none text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Start a project">
        <p className="text-base text-muted-foreground">
          Have something like this in mind?{" "}
          <a href={mailtoHref(`Project inquiry: ${service.title}`)} className="link-underline text-foreground">
            Send me an email
          </a>{" "}
          and tell me about it.
        </p>
      </Section>
    </DetailLayout>
  );
}
