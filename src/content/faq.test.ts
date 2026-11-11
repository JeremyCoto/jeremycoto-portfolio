import { describe, expect, it } from "vitest";

import { FAQ_AUTO_INTERVAL, FAQ_ITEMS } from "@/content/faq";

describe("faq", () => {
  it("uses the real questions from the current site, without pricing", () => {
    expect(FAQ_ITEMS).toHaveLength(7);
    expect(FAQ_ITEMS[0].question).toBe("What kind of projects do you take on?");
    expect(FAQ_ITEMS.map((item) => item.question).join(" ")).not.toMatch(/refund|plan later|Pro users/i);
    const text = FAQ_ITEMS.map((item) => `${item.question} ${item.answer}`).join(" ");
    expect(text).not.toMatch(/\b(prices?|pricing|costs?|quotes?|quoted|budgets?)\b/i);
  });

  it("auto-advances every six seconds, like the current site", () => {
    expect(FAQ_AUTO_INTERVAL).toBe(6);
  });
});
