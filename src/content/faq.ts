/** Preguntas frecuentes: texto del FAQ del sitio actual de Jeremy, sin la pregunta de precios (pedido de Jeremy). */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_TITLE = "Have questions?";
export const FAQ_SUBTITLE = "Everything you need to know about working together.";

/** Segundos que cada respuesta queda abierta antes de pasar a la siguiente. */
export const FAQ_AUTO_INTERVAL = 6;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Professional websites, automation systems, AI integrations, SaaS products and MVPs – from a single landing page to a full product with authentication, a database and a dashboard.",
  },
  {
    question: "How does a project start?",
    answer:
      "With a short conversation about your goals, your users and your constraints. From there I confirm the requirements in writing, propose the approach and split the work into clear phases before any code is written.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the scope. After the first conversation you get a timeline broken into phases, each with a clear result, so you always know what is being built and when it will be ready.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "Next.js, React and TypeScript on the frontend, Tailwind CSS for design systems, Supabase and PostgreSQL with Drizzle ORM for data, and Claude for AI features – all deployed on Vercel.",
  },
  {
    question: "Can you add AI to an existing product?",
    answer:
      "Yes. AI features such as assistants, automated workflows or structured data extraction can be integrated into an existing product, with validation and rate limits in place.",
  },
  {
    question: "Do you work remotely?",
    answer: "Yes. I work remotely from Costa Rica and communicate in English and Spanish.",
  },
  {
    question: "What happens after launch?",
    answer:
      "The work continues: I can monitor how the product is used, fix issues and keep improving it in small, safe releases as your needs grow.",
  },
];
