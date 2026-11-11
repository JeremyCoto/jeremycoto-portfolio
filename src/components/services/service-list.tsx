import { ContentCard, ContentCardCta, ContentCardTitle } from "@/components/content-card";
import { serviceHref, type Service } from "@/content/services";

/**
 * Palabras clave como texto separado por puntos medios (sin iconos ni chips genéricos).
 * El punto va detrás de cada palabra: si la línea se corta, nunca empieza con un punto.
 */
function KeywordLine({ keywords }: { keywords: readonly string[] }) {
  return (
    <p className="relative z-10 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-foreground/70">
      {keywords.map((keyword, index) => (
        <span key={keyword} className="inline-flex items-center gap-x-2.5">
          {keyword}
          {index < keywords.length - 1 ? (
            <span aria-hidden className="size-0.75 rounded-full bg-foreground/25" />
          ) : null}
        </span>
      ))}
    </p>
  );
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="border-t border-border py-12 first:border-t-0 first:pt-0 last:pb-0 sm:py-14">
      <ContentCard className="grid w-full grid-cols-1 gap-y-5 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-5">
          <ContentCardTitle href={serviceHref(service.slug)} className="text-xl sm:text-2xl">
            {service.title}
          </ContentCardTitle>
          <p className="relative z-10 mt-2 text-sm text-muted-foreground">{service.tagline}</p>
        </div>
        <div className="md:col-span-7">
          <p className="relative z-10 text-base text-pretty text-muted-foreground">{service.summary}</p>
          <div className="mt-5">
            <KeywordLine keywords={service.keywords} />
          </div>
          <ContentCardCta>Explore {service.title}</ContentCardCta>
        </div>
      </ContentCard>
    </li>
  );
}

export function ServiceList({ services }: { services: readonly Service[] }) {
  return (
    <ul role="list" aria-label="Services">
      {services.map((service) => (
        <ServiceRow key={service.slug} service={service} />
      ))}
    </ul>
  );
}
