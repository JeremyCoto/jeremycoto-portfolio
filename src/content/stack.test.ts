import { describe, expect, it } from "vitest";

import { SERVICES } from "@/content/services";
import {
  STACK_ENTRIES,
  STACK_GROUPS,
  TECH_STACK,
  TOOLS,
  getRelatedStack,
  getStackEntry,
  stackSlug,
  summarize,
} from "@/content/stack";

describe("stack", () => {
  it("keeps the 6 technologies and 10 tools of the current site", () => {
    expect(TECH_STACK).toHaveLength(6);
    expect(TOOLS).toHaveLength(10);
    expect(STACK_GROUPS.map((group) => group.title)).toEqual(["Stack", "Tools"]);
  });

  it("builds one entry per unique item (Supabase appears in both groups)", () => {
    expect(STACK_ENTRIES).toHaveLength(15);
    expect(new Set(STACK_ENTRIES.map((entry) => entry.slug)).size).toBe(15);
    const supabase = getStackEntry("supabase");
    expect(supabase?.group).toBe("Stack");
    expect(supabase?.secondary?.group).toBe("Tools");
  });

  it("gives every entry a category, a workflow role and https links", () => {
    for (const entry of STACK_ENTRIES) {
      expect(entry.category.length).toBeGreaterThan(0);
      expect(entry.workflow.length).toBeGreaterThan(0);
      expect(entry.href).toMatch(/^https:\/\//);
      expect(entry.docs).toMatch(/^https:\/\//);
      expect(entry.logo).toMatch(/^\/logos\//);
    }
  });

  it("uses the category names requested for the main technologies", () => {
    expect(getStackEntry("next-js")?.category).toBe("React Framework");
    expect(getStackEntry("react")?.category).toBe("UI Library");
    expect(getStackEntry("typescript")?.category).toBe("Programming Language");
    expect(getStackEntry("tailwind-css")?.category).toBe("Styling Framework");
  });

  it("only references existing stack entries and services", () => {
    const serviceSlugs = new Set(SERVICES.map((service) => service.slug));
    for (const entry of STACK_ENTRIES) {
      expect(getRelatedStack(entry)).toHaveLength(entry.related.length);
      for (const slug of entry.services) expect(serviceSlugs.has(slug)).toBe(true);
    }
  });

  it("summarizes to the first two sentences and builds slugs from names", () => {
    expect(summarize("One. Two. Three.")).toBe("One. Two.");
    expect(summarize("No period")).toBe("No period");
    expect(stackSlug("Next.js")).toBe("next-js");
    expect(stackSlug("Visual Studio Code")).toBe("visual-studio-code");
  });
});
