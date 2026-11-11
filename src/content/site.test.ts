import { describe, expect, it } from "vitest";

import { NAV_ITEMS, SOCIAL_LINKS } from "@/content/site";

describe("site", () => {
  it("shows Instagram, X, GitHub and LinkedIn (no YouTube)", () => {
    expect(SOCIAL_LINKS.map((social) => social.name)).toEqual(["instagram", "x", "github", "linkedin"]);
  });

  it("only links accounts that exist (others stay as icons without a link)", () => {
    const linked = SOCIAL_LINKS.filter((social) => social.href).map((social) => social.name);
    expect(linked).toEqual(["instagram", "x", "github", "linkedin"]);
    for (const social of SOCIAL_LINKS) {
      if (social.href) expect(social.href).toMatch(/^https:\/\//);
    }
  });

  it("has exactly the four final sections: About, Services, Stack and Gear", () => {
    expect(NAV_ITEMS.map((item) => item.label)).toEqual(["About", "Services", "Stack", "Gear"]);
    expect(NAV_ITEMS.map((item) => item.href)).toEqual(["/about", "/services", "/stack", "/gear"]);
  });
});
