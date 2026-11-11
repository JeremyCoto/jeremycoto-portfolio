import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { Container } from "@/components/container";
import {
  ContentCard,
  ContentCardCta,
  ContentCardDescription,
  ContentCardEyebrow,
  ContentCardTitle,
} from "@/components/content-card";
import { ClosingGlow } from "@/components/home/closing-glow";
import { ContactCard } from "@/components/home/contact-card";
import { WorkCard } from "@/components/home/work-card";
import { PageEnter } from "@/components/page-enter";
import { PhotoGallery } from "@/components/photo-gallery";
import { SocialIconRow } from "@/components/social-links";
import { SERVICES, SERVICES_PATH, serviceHref, type Service } from "@/content/services";
import { HERO } from "@/content/site";

/** Servicios destacados en la home (el resto está en /services). */
const FEATURED_SERVICES = 3;

function FeaturedService({ service }: { service: Service }) {
  return (
    <ContentCard as="article">
      <ContentCardTitle href={serviceHref(service.slug)}>{service.title}</ContentCardTitle>
      <ContentCardEyebrow>{service.tagline}</ContentCardEyebrow>
      <ContentCardDescription className="line-clamp-2 text-pretty">{service.summary}</ContentCardDescription>
      <ContentCardCta>Learn more</ContentCardCta>
    </ContentCard>
  );
}

/** Los servicios como texto enlazado: comunican qué construye sin poner el framework al frente. */
function ServiceLinks() {
  return (
    <nav aria-label="Services" className="mt-6">
      <ul role="list" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link href={serviceHref(service.slug)} className="text-foreground/70 transition hover:text-accent">
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Home() {
  return (
    <>
      <Container className="mt-9">
        <PageEnter className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            {HERO.title}
          </h1>
          <p className="mt-6 text-base text-pretty text-muted-foreground">
            {HERO.intro} {HERO.supporting}
          </p>
          <ServiceLinks />
          <SocialIconRow />
        </PageEnter>
      </Container>
      <PhotoGallery />
      <Container className="mt-24 md:mt-28">
        <PageEnter index={3}>
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 md:max-w-none md:grid-cols-2">
            <div className="space-y-10">
              <h2 className="text-sm font-semibold tracking-tight">Services</h2>
              <div className="flex flex-col gap-16">
                {SERVICES.slice(0, FEATURED_SERVICES).map((service) => (
                  <FeaturedService key={service.slug} service={service} />
                ))}
              </div>
              <Link
                href={SERVICES_PATH}
                className="group inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-accent"
              >
                View all services
                <ChevronRightIcon className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            </div>
            <div className="space-y-10 md:pl-8 lg:pl-16 xl:pl-24">
              <ContactCard />
              <WorkCard />
            </div>
          </div>
        </PageEnter>
      </Container>
      <ClosingGlow />
    </>
  );
}
