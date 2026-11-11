import { FAQAutoAccordion } from "@/components/faq/faq-auto-accordion";
import { FAQ_AUTO_INTERVAL, FAQ_ITEMS, FAQ_SUBTITLE, FAQ_TITLE } from "@/content/faq";

/** Área del FAQ al final de Services (componente de Ruixen con las preguntas reales de Jeremy). */
export function ServicesFaq() {
  return (
    <div id="faq" className="mt-24 scroll-mt-28 border-t border-border pt-20 sm:mt-32 sm:pt-24">
      <FAQAutoAccordion
        items={FAQ_ITEMS}
        title={FAQ_TITLE}
        subtitle={FAQ_SUBTITLE}
        autoInterval={FAQ_AUTO_INTERVAL}
        className="py-0 md:py-0"
      />
    </div>
  );
}
