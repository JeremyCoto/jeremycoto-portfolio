import { describe, expect, it } from "vitest";

import { GEAR_CATEGORIES, GEAR_DESCRIPTION, GEAR_INTRO, GEAR_TITLE } from "@/content/gear";

const names = (id: string) => GEAR_CATEGORIES.find((category) => category.id === id)?.items.map((item) => item.name);

describe("gear", () => {
  it("has the requested title, intro and exactly four categories", () => {
    expect(GEAR_TITLE).toBe("Gear");
    expect(GEAR_INTRO).toBe("Things I use to build, create and stay productive.");
    expect(GEAR_DESCRIPTION.length).toBeGreaterThan(GEAR_INTRO.length);
    expect(GEAR_CATEGORIES.map((category) => category.title)).toEqual([
      "Everyday Carry",
      "Workstation",
      "Home",
      "Apps",
    ]);
  });

  it("contains exactly the requested products and apps", () => {
    expect(names("everyday-carry")).toEqual([
      "Apple MacBook Air 13-inch",
      "Apple AirPods Max",
      "Apple AirPods Pro 2",
      "Apple iPad",
      "Black Laptop Backpack",
      "Thule Subterra Crossbody 5L",
      "Belkin Portable Charger 25K",
    ]);
    expect(names("workstation")).toEqual([
      "Beats Powerbeats Fit",
      "Sonos Roam 2",
      "ASUS TUF Gaming VG27AQ",
      "Logitech MX Master 3",
      "LOFREE Flow Lite 100",
      "SIHOO M18 Ergonomic Chair",
    ]);
    expect(names("home")).toEqual(["Amazon Fire TV Stick", "PlayStation 5"]);
    expect(names("apps")).toEqual([
      "OpenAI Codex",
      "Claude",
      "Cursor",
      "Wispr Flow",
      "Notion",
      "Linear",
      "Supabase",
      "Spotify",
    ]);
  });

  it("keeps the exact MacBook Air configuration", () => {
    const everyday = GEAR_CATEGORIES.find((category) => category.id === "everyday-carry");
    const macbook = everyday?.kind === "products" ? everyday.items[0] : undefined;
    expect(macbook?.specs).toBe("Apple M4 · 24GB unified memory · 512GB SSD");
  });

  it("marks unconfirmed models as references", () => {
    const flagged = GEAR_CATEGORIES.flatMap((category) =>
      category.kind === "products" ? category.items.filter((item) => item.isReference).map((item) => item.name) : [],
    );
    expect(flagged).toEqual(["ASUS TUF Gaming VG27AQ", "PlayStation 5"]);
  });

  it("uses https links and never shows prices or ratings", () => {
    for (const category of GEAR_CATEGORIES) {
      for (const item of category.items) {
        const text = JSON.stringify(item);
        expect(text).not.toMatch(/\$\d|rating|discount|stars/i);
        const href = "link" in item ? item.link.href : item.href;
        expect(href).toMatch(/^https:\/\//);
      }
    }
  });
});
