import type { Metadata } from "next";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { EncryptedText } from "@/components/encrypted-text";
import { PageEnter } from "@/components/page-enter";

export const metadata: Metadata = { title: "404" };

export default function NotFound() {
  return (
    <Container className="mt-16 sm:mt-32">
      <PageEnter as="header" className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
          <EncryptedText
            text="404"
            encryptedClassName="text-muted-foreground"
            revealedClassName="text-foreground"
            revealDelayMs={65}
            initialDelayMs={350}
          />
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Page not found. Sorry, looks like the page you’re looking for doesn’t exist or may have been removed.
        </p>
        <Button href="/" variant="link" className="mt-6">
          Go back home
        </Button>
      </PageEnter>
    </Container>
  );
}
