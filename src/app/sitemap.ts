import type { MetadataRoute } from "next";

import { SERVICES, serviceHref } from "@/content/services";
import { NAV_ITEMS } from "@/content/site";
import { STACK_ENTRIES, stackHref } from "@/content/stack";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...NAV_ITEMS.map((item) => item.href),
    ...SERVICES.map((service) => serviceHref(service.slug)),
    ...STACK_ENTRIES.map((entry) => stackHref(entry.slug)),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
