import type { Metadata } from "next";

import { ServiceList } from "@/components/services/service-list";
import { ServicesFaq } from "@/components/services/services-faq";
import { SimpleLayout } from "@/components/simple-layout";
import { SERVICES, SERVICES_INTRO } from "@/content/services";
import { mailtoHref } from "@/content/site";

const HERO_TITLE = "What I build, and how I approach it.";

export const metadata: Metadata = {
  title: "Services",
  description: SERVICES_INTRO,
};

export default function Services() {
  return (
    <SimpleLayout
      title={HERO_TITLE}
      intro={
        <>
          {SERVICES_INTRO} Have one in mind?{" "}
          <a href={mailtoHref()} className="link-underline">
            Send me an email
          </a>
          .
        </>
      }
    >
      <ServiceList services={SERVICES} />
      <ServicesFaq />
    </SimpleLayout>
  );
}
