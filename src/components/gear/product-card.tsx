import Image from "next/image";

import { ExternalLink } from "@/components/external-link";
import type { GearProduct } from "@/content/gear";

const REFERENCE_NOTE = "Reference model: the exact model is not confirmed yet.";

/**
 * Producto físico: foto auténtica sobre fondo blanco en un marco fino, sin precios ni valoraciones.
 * En móvil es una fila compacta (foto pequeña + texto); desde sm, una tarjeta vertical.
 */
export function ProductCard({ product }: { product: GearProduct }) {
  return (
    <article className="group flex items-start gap-5 sm:flex-col sm:items-stretch sm:gap-0">
      <a
        href={product.link.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        className="relative block size-24 flex-none overflow-hidden rounded-xl bg-white ring-1 ring-border transition duration-300 group-hover:shadow-md group-hover:shadow-foreground/5 group-hover:ring-foreground/15 sm:aspect-[4/3] sm:size-auto sm:rounded-2xl"
      >
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 15rem, (min-width: 640px) 40vw, 6rem"
          quality={90}
          className="object-contain p-3 transition duration-500 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100 sm:p-7"
        />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-4">
          <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-[0.9375rem]">{product.name}</h3>
          {product.isReference ? (
            <span
              title={REFERENCE_NOTE}
              className="rounded-full px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground ring-1 ring-border"
            >
              Reference model
              <span className="sr-only">: the exact model is not confirmed yet</span>
            </span>
          ) : null}
        </div>
        {product.specs ? <p className="mt-1 text-xs text-muted-foreground">{product.specs}</p> : null}
        <p className="mt-2 text-sm text-pretty text-muted-foreground">{product.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <ExternalLink href={product.link.href}>
            {product.link.label}
            <span className="sr-only">: {product.name}</span>
          </ExternalLink>
          {product.secondaryLink ? (
            <ExternalLink href={product.secondaryLink.href} tone="muted">
              {product.secondaryLink.label}
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
