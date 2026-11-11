"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Description, Field, Fieldset, Label, Legend } from "@headlessui/react";
import { CheckCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/dialog";
import { Input } from "@/components/input";
import { mailtoHref } from "@/content/site";
import { buildContactDraft, isValidEmail } from "@/lib/contact";
import { motionTransition, smoothSpring } from "@/lib/transitions";

const ERROR_MESSAGE = "Please enter a valid email address.";
const ERROR_TIMEOUT_MS = 5000;

/**
 * Equivalente de la tarjeta de newsletter de la referencia. Sin backend ni datos guardados:
 * abre el cliente de correo del visitante con un borrador dirigido a Jeremy.
 */
export function ContactCard() {
  const formRef = useRef<HTMLFormElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!error) return;
    const timer = window.setTimeout(() => setError(null), ERROR_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [error]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string" || !isValidEmail(email)) {
      setError(ERROR_MESSAGE);
      formRef.current?.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
      return;
    }
    setError(null);
    const draft = buildContactDraft(email);
    window.location.href = mailtoHref(draft.subject, draft.body);
    formRef.current?.reset();
    setDialogOpen(true);
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border p-6">
        <Fieldset>
          <Legend className="flex text-sm font-semibold text-foreground">
            <EnvelopeIcon className="size-6 flex-none text-muted-foreground" />
            <span className="ml-3">Start a project</span>
          </Legend>
          <Field className="mt-2">
            <Label className="sr-only">Email address</Label>
            <Description className="text-sm text-muted-foreground">
              Have a website, automation or SaaS in mind? Leave your email and your mail app opens a ready-to-send
              message to me.
            </Description>
            <div className="mt-6 flex items-center gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                required
                aria-invalid={error ? true : undefined}
                className="min-w-0 flex-auto"
              />
              <Button type="submit">Contact</Button>
            </div>
            <AnimatePresence initial={false}>
              {error ? (
                <motion.p
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={motionTransition(smoothSpring, reduceMotion)}
                  className="overflow-hidden text-sm text-destructive"
                >
                  <span className="block pt-3">{error}</span>
                </motion.p>
              ) : null}
            </AnimatePresence>
          </Field>
        </Fieldset>
      </form>

      <Dialog open={dialogOpen} onClose={setDialogOpen}>
        <DialogContent>
          <CheckCircleIcon className="size-6 flex-none text-accent" />
          <DialogHeader>
            <DialogTitle>Your draft is ready</DialogTitle>
            <DialogDescription>
              Your email app opened with a message to me. Add a few details about your project and hit send.
            </DialogDescription>
          </DialogHeader>
          <Button type="button" variant="secondary" className="w-fit" onClick={() => setDialogOpen(false)}>
            Got it, thanks!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
