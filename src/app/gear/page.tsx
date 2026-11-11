import type { Metadata } from "next";

import { AppRow } from "@/components/gear/app-row";
import { ProductCard } from "@/components/gear/product-card";
import { PageEnter } from "@/components/page-enter";
import { Section } from "@/components/section";
import { SimpleLayout } from "@/components/simple-layout";
import { GEAR_CATEGORIES, GEAR_DESCRIPTION, GEAR_INTRO, GEAR_TITLE, type GearCategory } from "@/content/gear";

export const metadata: Metadata = {
  title: GEAR_TITLE,
  description: GEAR_INTRO,
};

function CategoryContent({ category }: { category: GearCategory }) {
  if (category.kind === "apps") {
    return (
      <ul role="list" className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
        {category.items.map((app) => (
          <AppRow key={app.name} app={app} />
        ))}
      </ul>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
      {category.items.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}

export default function Gear() {
  return (
    <SimpleLayout title={GEAR_TITLE} intro={`${GEAR_INTRO} ${GEAR_DESCRIPTION}`} animateChildren={false}>
      <PageEnter index={1}>
        <nav aria-label="Gear categories" className="-mt-4 sm:-mt-6">
          <ul role="list" className="flex flex-wrap gap-2">
            {GEAR_CATEGORIES.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex rounded-full px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-border transition hover:bg-muted hover:ring-foreground/15"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageEnter>
      <div className="mt-16 space-y-24 sm:mt-20">
        {GEAR_CATEGORIES.map((category, index) => (
          <PageEnter key={category.id} index={index + 2}>
            <Section id={category.id} title={category.title} width="wide">
              <CategoryContent category={category} />
            </Section>
          </PageEnter>
        ))}
      </div>
    </SimpleLayout>
  );
}
