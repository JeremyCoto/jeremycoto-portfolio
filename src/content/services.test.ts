import { describe, expect, it } from "vitest";

import { SERVICES, getRelatedServices, getService, serviceHref } from "@/content/services";
import { getStackEntry } from "@/content/stack";

describe("services", () => {
  it("lists the six services in order", () => {
    expect(SERVICES.map((service) => service.title)).toEqual([
      "Websites",
      "Automation Systems",
      "AI Integrations",
      "SaaS Products",
      "MVP Development",
      "Scalability",
    ]);
  });

  it("has unique slugs and complete detail content", () => {
    expect(new Set(SERVICES.map((service) => service.slug)).size).toBe(SERVICES.length);
    for (const service of SERVICES) {
      expect(service.whatIBuild.length).toBeGreaterThan(2);
      expect(service.problems.length).toBeGreaterThan(2);
      expect(service.approach.length).toBeGreaterThan(0);
      expect(service.examples.length).toBeGreaterThan(2);
      expect(service.technologies.length).toBeGreaterThan(0);
      expect(service.value.length).toBeGreaterThan(0);
    }
  });

  it("never uses decorative numbering in titles or taglines", () => {
    for (const service of SERVICES) {
      expect(`${service.title} ${service.tagline}`).not.toMatch(/\b0\d\b|phase/i);
    }
  });

  it("relates only to other existing services", () => {
    for (const service of SERVICES) {
      expect(service.related).not.toContain(service.slug);
      expect(getRelatedServices(service)).toHaveLength(service.related.length);
    }
  });

  it("links technologies to existing stack pages", () => {
    for (const service of SERVICES) {
      for (const technology of service.technologies) {
        if (technology.stack) expect(getStackEntry(technology.stack)).toBeDefined();
      }
    }
  });

  it("builds hrefs and finds services by slug", () => {
    expect(serviceHref("websites")).toBe("/services/websites");
    expect(getService("scalability")?.title).toBe("Scalability");
    expect(getService("process")).toBeUndefined();
  });
});
