import { BriefcaseIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/button";
import { WORK, mailtoHref, type Role } from "@/content/site";

function RoleItem({ role }: { role: Role }) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex size-12 flex-none items-center justify-center rounded-full bg-card text-xs font-semibold text-foreground shadow-md ring-1 shadow-foreground/5 ring-border dark:border dark:border-border dark:bg-muted dark:ring-0">
        {role.initials}
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-foreground">{role.company}</dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-muted-foreground">{role.title}</dd>
        <dt className="sr-only">Date</dt>
        <dd className="ml-auto text-xs text-muted-foreground" aria-label={`${role.start} until ${role.end}`}>
          <time dateTime={role.start}>{role.start}</time> <span aria-hidden="true">—</span> <span>{role.end}</span>
        </dd>
      </dl>
    </li>
  );
}

/** Tarjeta "Work": solo la experiencia que figura en el sitio actual. */
export function WorkCard() {
  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="flex text-sm font-semibold text-foreground">
        <BriefcaseIcon className="size-6 flex-none text-muted-foreground" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {WORK.map((role) => (
          <RoleItem key={`${role.company}-${role.start}`} role={role} />
        ))}
      </ol>
      <Button href={mailtoHref()} variant="secondary" className="mt-6 w-full">
        Send an email
      </Button>
    </div>
  );
}
