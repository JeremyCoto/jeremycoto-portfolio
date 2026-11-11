/**
 * Servicios: lo que Jeremy construye. Basado en "What I Build", el proceso y el stack de su
 * sitio actual, más las capacidades que él indicó (p. ej. n8n). Sin clientes, casos ni resultados.
 */
export type ServiceSlug =
  "websites" | "automation-systems" | "ai-integrations" | "saas-products" | "mvp-development" | "scalability";

/** Tecnología mencionada en un servicio. `stack` enlaza a su página en /stack cuando existe. */
export interface ServiceTechnology {
  name: string;
  stack?: string;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  /** Línea corta que define el servicio (sustituye a cualquier numeración). */
  tagline: string;
  /** Resumen de una frase para listas y tarjetas (texto de "What I Build"). */
  summary: string;
  /** Palabras clave que se muestran como texto en la lista de servicios. */
  keywords: string[];
  intro: string;
  whatItIs: string;
  whatIBuild: string[];
  problems: string[];
  approach: string[];
  technologies: ServiceTechnology[];
  examples: string[];
  value: string;
  related: ServiceSlug[];
}

export const SERVICES_INTRO =
  "Professional websites, automation systems, AI integrations, SaaS products and MVPs – from a single landing page to a full product with authentication, a database and a dashboard.";

export const SERVICES: Service[] = [
  {
    slug: "websites",
    title: "Websites",
    tagline: "Business websites and landing pages",
    summary:
      "Fast, responsive websites with a distinctive design, built with performance, SEO and accessibility in mind from the first line of code.",
    keywords: ["Business sites", "Landing pages", "Responsive design", "Performance"],
    intro:
      "A website is often the first conversation a business has with its customers. I design and build professional sites that load fast, read clearly on any screen and are easy to grow over time.",
    whatItIs:
      "Professional business websites, landing pages and digital experiences built as real software: a typed codebase, a consistent design system and a deployment pipeline – not a template that becomes hard to change later.",
    whatIBuild: [
      "Business websites that present services, information and contact options clearly.",
      "Landing pages focused on a single goal, such as a launch, a sign-up or a campaign.",
      "Editorial and portfolio sites with expressive typography and purposeful animation.",
      "Responsive interfaces designed mobile-first and adapted to tablet and desktop.",
      "Content structures that can be updated and extended as the business changes.",
    ],
    problems: [
      "A slow site that loses visitors before the page finishes loading.",
      "A layout that breaks or becomes hard to read on mobile.",
      "A template that looks generic and is difficult to customise.",
      "Pages that search engines and assistive technologies struggle to read.",
    ],
    approach: [
      "Every site starts with the content and the goal of each page, then the layout, then the visual details. I define a design system first – colors, typography and spacing as tokens – so every page stays consistent.",
      "I build with Next.js and React, render on the server by default and only ship the JavaScript a page needs. Images, fonts and metadata are optimised from the start, with Lighthouse scores above 90 as the standard.",
    ],
    technologies: [
      { name: "Next.js", stack: "next-js" },
      { name: "React", stack: "react" },
      { name: "TypeScript", stack: "typescript" },
      { name: "Tailwind CSS", stack: "tailwind-css" },
    ],
    examples: [
      "A company site with service pages and a clear contact flow.",
      "A product landing page for a launch or a waitlist.",
      "A personal brand or portfolio site.",
      "A campaign page connected to email or CRM tools through automation.",
    ],
    value:
      "A fast, accessible and well-structured website builds trust, makes a business easier to find and gives it a foundation it can keep growing instead of rebuilding.",
    related: ["automation-systems", "ai-integrations", "mvp-development"],
  },
  {
    slug: "automation-systems",
    title: "Automation Systems",
    tagline: "Business process automation",
    summary:
      "Workflows that remove repetitive work: scheduled jobs, webhooks, email notifications and AI agents connected to the tools a business already uses.",
    keywords: ["n8n workflows", "API integrations", "Data sync", "Webhooks"],
    intro:
      "Many businesses lose hours to work that simply moves information from one place to another. I design automated workflows that connect the tools a business already uses, so data flows on its own and people focus on the work that needs them.",
    whatItIs:
      "Automation turns repetitive, rule-based tasks into workflows that run on their own – triggered by an event, a schedule or a webhook, and connected to the services where the data lives.",
    whatIBuild: [
      "Workflows in n8n that connect forms, email, spreadsheets, CRMs and internal tools.",
      "API integrations that send and receive data between different services.",
      "Scheduled jobs that sync, clean or report on data automatically.",
      "Webhooks that react to events such as a new sign-up, a payment or a form submission.",
      "Email notifications and summaries triggered by what happens in the business.",
      "AI steps inside workflows to classify, summarise or extract information.",
    ],
    problems: [
      "Copying the same information between tools by hand.",
      "Leads, requests or orders that get lost between systems.",
      "Reports that are assembled manually every week.",
      "Business tools that do not talk to each other.",
    ],
    approach: [
      "I start by mapping the current process step by step: where data comes from, who touches it and where it needs to end up. Only then do I decide what to automate and which tool fits best.",
      "Workflows are built with validation, error handling and alerts when something fails, so an automation never breaks silently. Visual flows live in n8n; logic that needs more control lives in code, connected through APIs and webhooks.",
    ],
    technologies: [
      { name: "n8n" },
      { name: "Next.js", stack: "next-js" },
      { name: "Supabase", stack: "supabase" },
      { name: "TypeScript", stack: "typescript" },
    ],
    examples: [
      "Sending every new form submission to a CRM and notifying the team.",
      "Generating a weekly report from a database and emailing it automatically.",
      "Keeping records in sync between a spreadsheet and an application.",
      "Routing and summarising incoming requests with an AI step.",
    ],
    value:
      "Automation saves time on repetitive work, reduces manual errors and lets a business handle more without adding more manual steps.",
    related: ["ai-integrations", "saas-products", "scalability"],
  },
  {
    slug: "ai-integrations",
    title: "AI Integrations",
    tagline: "AI features inside real software",
    summary:
      "Language models inside real products: streamed responses, tool use and structured output, with validation, rate limits and costs under control.",
    keywords: ["AI APIs", "Assistants", "Structured output", "AI workflows"],
    intro:
      "AI is most useful when it becomes part of a product or a process people already use. I connect language models to applications and workflows, with the validation and limits that real software needs.",
    whatItIs:
      "AI integration means adding capabilities such as understanding text, generating content or extracting structured data to an application or workflow through AI APIs – designed around a concrete task instead of a generic chatbot.",
    whatIBuild: [
      "Assistants that answer questions using a product's own content.",
      "Features that summarise, classify or draft text inside an application.",
      "Structured data extraction from documents, emails or forms.",
      "Streamed responses, so results appear while they are being generated.",
      "AI steps inside automated workflows.",
      "Semantic search over a product's content with pgvector.",
    ],
    problems: [
      "Teams spending hours reading, sorting or summarising large amounts of text.",
      "Information locked inside documents and emails that needs to become structured data.",
      "Users who need quick answers from a product's content.",
      "AI experiments that never become a reliable part of the product.",
    ],
    approach: [
      "I start from a specific task and define what a good result looks like before choosing a model. Inputs and outputs are validated with schemas, and responses are structured whenever the product needs to act on them.",
      "Rate limits, cost controls and fallbacks are part of the design from the beginning, and API keys never leave the server. AI features can also be added to an existing product without rebuilding it.",
    ],
    technologies: [
      { name: "AI APIs" },
      { name: "Next.js", stack: "next-js" },
      { name: "TypeScript", stack: "typescript" },
      { name: "Supabase", stack: "supabase" },
    ],
    examples: [
      "A support assistant grounded in a company's documentation.",
      "Automatic tagging and routing of incoming messages.",
      "Turning invoices or forms into structured records.",
      "Drafting replies or summaries inside an internal tool.",
    ],
    value:
      "Well-integrated AI removes repetitive reading and writing work and makes information easier to use, while staying predictable, secure and affordable.",
    related: ["automation-systems", "saas-products", "mvp-development"],
  },
  {
    slug: "saas-products",
    title: "SaaS Products",
    tagline: "Multi-user web applications",
    summary:
      "Multi-user products with authentication, row-level security, dashboards and a data model ready to grow with the business.",
    keywords: ["Product architecture", "Authentication", "Databases", "Dashboards"],
    intro:
      "A SaaS product is a complete system: interface, data, users and infrastructure working together. I build the foundations that let a product start simple and keep growing.",
    whatItIs:
      "Software delivered through the browser to many users or organisations, each with their own accounts and data, running on infrastructure that can grow with demand.",
    whatIBuild: [
      "Application interfaces: dashboards, tables, forms and settings.",
      "User authentication with email and password, magic links or social providers.",
      "Databases with row-level security, so each user only sees their own data.",
      "Core product features with server-side validation and clear loading and error states.",
      "Realtime updates for live dashboards and collaborative features.",
      "File storage, notifications and the integrations a product needs.",
    ],
    problems: [
      "An idea that needs accounts, data and permissions to work.",
      "A prototype that cannot handle real users or real data.",
      "Data that is exposed because access rules only live in the interface.",
      "A product that becomes harder to change with every new feature.",
    ],
    approach: [
      "I design the data model first, because it shapes everything else. Access rules are enforced in the database with row-level security, and every input is validated on the server.",
      "Frontend, backend and infrastructure share one typed codebase: Next.js for the interface and server logic, Supabase and PostgreSQL for data and authentication, Drizzle for typed queries, deployed on Vercel. That keeps the whole product consistent and easier to maintain.",
    ],
    technologies: [
      { name: "Next.js", stack: "next-js" },
      { name: "React", stack: "react" },
      { name: "TypeScript", stack: "typescript" },
      { name: "Supabase", stack: "supabase" },
      { name: "Drizzle ORM", stack: "drizzle-orm" },
      { name: "Tailwind CSS", stack: "tailwind-css" },
    ],
    examples: [
      "A client portal where each customer manages their own records.",
      "An internal dashboard for a team's daily operations.",
      "A subscription-based tool for a specific industry.",
      "A booking or management system with roles and permissions.",
    ],
    value:
      "A solid foundation lets a business launch with confidence, protect its users' data and add features without rewriting what already works.",
    related: ["mvp-development", "scalability", "ai-integrations"],
  },
  {
    slug: "mvp-development",
    title: "MVP Development",
    tagline: "From idea to a first version",
    summary:
      "From idea to a working product fast: a focused scope, a production-ready stack and a first version real users can try.",
    keywords: ["Essential scope", "Core flows", "Validation", "Iteration"],
    intro:
      "An MVP is the smallest version of a product that real users can try. I help turn a concept into a working first version, focused on what needs to be learned first.",
    whatItIs:
      "Minimum viable product development: defining the essential functionality, building it on a production-ready stack and putting it in front of users to validate the idea.",
    whatIBuild: [
      "A focused scope that separates what is essential from what can wait.",
      "The core user flows of the product, working end to end.",
      "Authentication, data and the first screens users interact with.",
      "A first version deployed to production and ready to share.",
      "A prioritised list of what to build next.",
    ],
    problems: [
      "An idea that has stayed on paper because the full product feels too big.",
      "A first version that tries to do everything and launches too late.",
      "Prototypes that have to be thrown away before real users arrive.",
      "Not knowing which features matter most.",
    ],
    approach: [
      "We start by defining the problem, the users and the one or two flows the product must get right. Everything else goes on a list for later.",
      "I build on the same stack I use for full products, so the MVP is not throwaway work: it can grow into the real product. The work is split into short phases with preview links, so progress can be reviewed at any time and priorities can change as we learn.",
    ],
    technologies: [
      { name: "Next.js", stack: "next-js" },
      { name: "TypeScript", stack: "typescript" },
      { name: "Supabase", stack: "supabase" },
      { name: "Tailwind CSS", stack: "tailwind-css" },
      { name: "Linear", stack: "linear" },
    ],
    examples: [
      "A first version of a SaaS idea for early users.",
      "A marketplace or booking flow with only the essential steps.",
      "An internal tool that tests a new process.",
      "A product demo connected to real data.",
    ],
    value:
      "An MVP reduces risk: it shows whether an idea works with real users before investing in the full product, and gives every next decision real feedback to stand on.",
    related: ["saas-products", "websites", "scalability"],
  },
  {
    slug: "scalability",
    title: "Scalability",
    tagline: "Improving and growing existing software",
    summary:
      "Typed code, validated inputs, rules enforced in the database and a structure a team can maintain, so a product keeps working as users and data grow.",
    keywords: ["Architecture", "Performance", "Maintainability", "Integrations"],
    intro:
      "Products keep changing after launch. I help existing applications stay fast, maintainable and ready for new features as users and data grow.",
    whatItIs:
      "Scalability is the ability of a product to keep working well as it grows – more users, more data, more features and more people working on the code.",
    whatIBuild: [
      "Architecture improvements that separate concerns and simplify the codebase.",
      "Performance work: faster pages, lighter bundles and efficient queries.",
      "Typed, validated code that is safer to change.",
      "New integrations added without disrupting what already works.",
      "Database rules, indexes and structures ready for more data.",
      "Automated tests that protect the flows that matter.",
    ],
    problems: [
      "Pages and queries that get slower as data grows.",
      "A codebase where every change risks breaking something else.",
      "Features that take longer to ship every month.",
      "Integrations added in ways that are hard to maintain.",
    ],
    approach: [
      "I start by reviewing the current application: its structure, data model, performance and the areas that change most often. Improvements are prioritised by impact and shipped in small, safe releases.",
      "Types, validation, tests and independent code review keep every change predictable, so the product keeps improving without stopping development.",
    ],
    technologies: [
      { name: "TypeScript", stack: "typescript" },
      { name: "Next.js", stack: "next-js" },
      { name: "Drizzle ORM", stack: "drizzle-orm" },
      { name: "Supabase", stack: "supabase" },
      { name: "GitHub", stack: "github" },
    ],
    examples: [
      "Speeding up a slow dashboard or report.",
      "Restructuring a codebase before adding a major feature.",
      "Adding types and validation to an existing project.",
      "Preparing a database for many more users.",
    ],
    value:
      "Investing in scalability keeps a product fast and maintainable, lowers the cost of every future feature and protects what the business has already built.",
    related: ["saas-products", "automation-systems", "ai-integrations"],
  },
];

export const SERVICES_PATH = "/services";

export function serviceHref(slug: ServiceSlug): string {
  return `${SERVICES_PATH}/${slug}`;
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.related.map((slug) => getService(slug)).filter((related): related is Service => related !== undefined);
}
