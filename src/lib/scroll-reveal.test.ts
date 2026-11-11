import { describe, expect, it } from "vitest";

import { REVEAL_FROM_OPACITY, revealOpacity, revealRanges } from "@/lib/scroll-reveal";

describe("revealRanges", () => {
  const ranges = revealRanges(["Hey there", "Costa Rica"]);
  const chars = ranges.flat(2);

  it("keeps paragraphs, words and letters", () => {
    expect(ranges.map((p) => p.map((w) => w.map((c) => c.char).join("")))).toEqual([
      ["Hey", "there"],
      ["Costa", "Rica"],
    ]);
  });

  it("orders letters along the scroll and finishes before the end", () => {
    const starts = chars.map((c) => c.start);
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
    const last = chars.at(-1)!;
    expect(last.start + 1 / last.rate).toBeCloseTo(4 / 5);
  });
});

describe("revealOpacity", () => {
  const [first] = revealRanges(["Jeremy"]).flat(2);

  it("goes from faint to full", () => {
    expect(revealOpacity(first!, 0)).toBe(REVEAL_FROM_OPACITY);
    expect(revealOpacity(first!, 1)).toBe(1);
  });
});
