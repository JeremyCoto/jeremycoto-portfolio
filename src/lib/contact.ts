import { SITE } from "@/content/site";

/** Validación mínima de correo (el campo también usa type="email"). */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length > 0 && email.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(email);
}

export interface ContactDraft {
  subject: string;
  body: string;
}

export function buildContactDraft(email: string): ContactDraft {
  return {
    subject: SITE.emailSubject,
    body: `Hi Jeremy,\n\nI'd like to talk about a project.\n\nYou can reach me at: ${email.trim()}\n`,
  };
}
