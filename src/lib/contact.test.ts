import { describe, expect, it } from "vitest";

import { mailtoHref } from "@/content/site";
import { buildContactDraft, isValidEmail } from "@/lib/contact";

describe("contact", () => {
  it("accepts valid emails and trims spaces", () => {
    expect(isValidEmail("visitor@example.com")).toBe(true);
    expect(isValidEmail("  visitor@example.com  ")).toBe(true);
  });

  it("rejects invalid or oversized emails", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail(`${"a".repeat(250)}@x.co`)).toBe(false);
  });

  it("builds a draft with the visitor's address", () => {
    const draft = buildContactDraft(" visitor@example.com ");
    expect(draft.subject).toBe("Project inquiry");
    expect(draft.body).toContain("You can reach me at: visitor@example.com");
  });

  it("encodes subject and body in the mailto link", () => {
    expect(mailtoHref()).toBe("mailto:jeremycoto2003@gmail.com?subject=Project%20inquiry");
    expect(mailtoHref("Hi & bye", "a\nb")).toBe("mailto:jeremycoto2003@gmail.com?subject=Hi%20%26%20bye&body=a%0Ab");
  });
});
