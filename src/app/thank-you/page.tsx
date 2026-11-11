import type { Metadata } from "next";

import { SimpleLayout } from "@/components/simple-layout";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for reaching out.",
};

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Thank you!"
      intro="Thanks for reaching out about your project. I read every message, and I’ll reply to the email address you wrote from. Talk soon."
    />
  );
}
