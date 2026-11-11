/**
 * Stack y herramientas: texto literal del sitio actual de Jeremy (/stack y /tools).
 * `href` es el sitio oficial de cada producto.
 */
import type { ServiceSlug } from "@/content/services";

export interface StackItem {
  name: string;
  logo: string;
  /** Logo de una sola tinta oscura: se invierte en tema oscuro. */
  monochrome: boolean;
  role: string;
  description: string;
  points: string[];
  href: string;
}

export interface StackGroup {
  title: string;
  /** Rótulo de los puntos en la página de detalle, como en el sitio actual. */
  pointsLabel: string;
  items: StackItem[];
}

export const STACK_INTRO =
  "The technologies behind the websites, automation systems, AI integrations, SaaS products and MVPs I build – what each one is, why I use it and how it is put to work in real-world projects.";

export const TOOLS_INTRO =
  "The tools I use every day to plan, write, review and ship software – what each one does and how it fits into my workflow, from the first idea to production.";

export const TECH_STACK: StackItem[] = [
  {
    name: "Next.js",
    logo: "/logos/nextjs.svg",
    monochrome: true,
    role: "Framework",
    description:
      "A React framework for building complete web applications. With the App Router, every route is a folder and every page is a Server Component by default, so data is fetched on the server and the browser only receives the JavaScript it actually needs. It is the foundation of every product I build: frontend, backend logic and deployment live in one codebase.",
    points: [
      "Static and server-rendered pages that load fast and are easy for search engines to index.",
      "Server Actions and Route Handlers for forms, webhooks and APIs, keeping business logic and secrets on the server.",
      "Layouts, loading and error states defined per route, so navigation feels instant and failures stay contained.",
      "Streaming responses, so AI features show results while they are still being generated.",
      "Built-in image, font and metadata optimisation for strong Lighthouse scores and SEO out of the box.",
    ],
    href: "https://nextjs.org",
  },
  {
    name: "React",
    logo: "/logos/react.svg",
    monochrome: false,
    role: "UI Library",
    description:
      "The library behind every interface I build. React describes the UI as small components that react to state: when the data changes, the screen updates on its own. Combined with Server Components, interactive pieces stay on the client while everything else renders on the server.",
    points: [
      "Reusable components – buttons, forms, tables, modals – that keep large interfaces consistent.",
      "Interactive features such as dashboards, multi-step forms, drag and drop and live updates.",
      "Optimistic updates, so the interface responds instantly while data saves in the background.",
      "Loading, empty and error states designed for every component that depends on data.",
    ],
    href: "https://react.dev",
  },
  {
    name: "Tailwind CSS",
    logo: "/logos/tailwind-css.svg",
    monochrome: false,
    role: "Styling",
    description:
      "A utility-first CSS framework: styles are written as small classes directly in the markup, built on design tokens such as colors, spacing and typography. Only the classes that are used end up in the final CSS, so styles stay small no matter how big the product gets. I pair it with shadcn/ui for accessible, customisable components.",
    points: [
      "A design system defined once as tokens and reused across every page.",
      "Mobile-first, responsive layouts without fighting CSS specificity or naming conflicts.",
      "Light and dark themes generated from the same set of CSS variables.",
      "Accessible components (dialogs, menus, forms) adapted to each brand instead of a generic look.",
    ],
    href: "https://tailwindcss.com",
  },
  {
    name: "Drizzle ORM",
    logo: "/logos/drizzle.svg",
    monochrome: true,
    role: "ORM",
    description:
      "A TypeScript ORM that stays close to SQL. The database schema is written as code, and every query is typed from that schema, so the editor knows exactly which tables and columns exist. It is lightweight, has no heavy runtime and works well in serverless environments such as Vercel.",
    points: [
      "Database schemas written as code and versioned with migrations, so every environment matches.",
      "Type-safe queries: a renamed or removed column is caught before it reaches production.",
      "Readable SQL-like queries for joins, filters and pagination, with no hidden magic.",
      "Fast cold starts in serverless functions thanks to its small footprint.",
    ],
    href: "https://orm.drizzle.team",
  },
  {
    name: "Supabase",
    logo: "/logos/supabase.svg",
    monochrome: false,
    role: "Backend Platform",
    description:
      "An open-source backend built on PostgreSQL. It brings a production database, authentication, file storage, realtime updates and edge functions together in one platform. Its key feature is Row Level Security: access rules live inside the database itself, so data stays protected even if a mistake slips into the application code.",
    points: [
      "Sign-in with email and password, magic links or social providers.",
      "Row Level Security policies, so each user can only read and change their own data.",
      "Storage buckets for images and documents, with the same access rules as the database.",
      "Realtime subscriptions for live dashboards, notifications and collaborative features.",
      "pgvector for AI features such as semantic search over a product's own content.",
    ],
    href: "https://supabase.com",
  },
  {
    name: "TypeScript",
    logo: "/logos/typescript.svg",
    monochrome: false,
    role: "Language",
    description:
      "JavaScript with a type system. Types describe the shape of the data – what a user, an order or an API response looks like – and the compiler checks every change against them before the code ever runs. I always work in strict mode, without any, so the compiler acts as the first reviewer on every line.",
    points: [
      "One set of types shared by the database, the API and the interface.",
      "Zod schemas that validate every input at the system boundaries and produce types from the same source.",
      "Autocomplete and inline errors that make development faster and safer.",
      "Confident refactors as a codebase and its team grow.",
    ],
    href: "https://www.typescriptlang.org",
  },
];

export const TOOLS: StackItem[] = [
  {
    name: "Claude Code",
    logo: "/logos/claude-code.webp",
    monochrome: false,
    role: "AI Coding Agent",
    description:
      "Anthropic's agentic coding tool. It works directly in the terminal and in the project: it reads the codebase, plans changes, edits files and runs commands, always with my review and approval. It is my main development partner, and it lets me move from an idea to a working, tested feature much faster.",
    points: [
      "Planning a feature before writing code: requirements, architecture and edge cases.",
      "Writing and refactoring code across many files while following the project's own conventions.",
      "Running type checks, linters and tests, then fixing what fails.",
      "Independent code reviews to catch bugs and security issues before they ship.",
      "Connecting external tools through MCP servers, such as browsers, databases and docs.",
    ],
    href: "https://www.claude.com/product/claude-code",
  },
  {
    name: "Codex",
    logo: "/logos/codex.svg",
    monochrome: false,
    role: "AI Coding Agent",
    description:
      "OpenAI's coding agent. It works in the terminal, in the editor and in the cloud, where it can take on several tasks in parallel inside isolated environments and return the finished changes for review. I use it alongside Claude Code as a second agent: delegating well-defined tasks and getting a different perspective on the same code.",
    points: [
      "Delegating well-defined tasks – a bug fix, a small feature, a refactor – that run in the background.",
      "Working on several tasks in parallel while I focus on the main feature.",
      "A second opinion on reviews and solutions proposed by other AI tools.",
      "Reviewing every change it proposes before anything is merged into the project.",
    ],
    href: "https://openai.com/codex",
  },
  {
    name: "Wispr Flow",
    logo: "/logos/wispr-flow.svg",
    monochrome: true,
    role: "Voice Dictation",
    description:
      "An AI voice dictation app that turns speech into clean, formatted text in any application. It removes filler words and fixes punctuation as I talk, so what I dictate is ready to use. Speaking is several times faster than typing, which makes a real difference when explaining complex ideas to an AI agent.",
    points: [
      "Dictating detailed prompts and instructions for AI coding agents.",
      "Writing specs, notes and documentation at the speed of speech.",
      "Replying to messages and emails without breaking focus.",
      "Works in any app – terminal, editor, browser or chat – with a single shortcut.",
    ],
    href: "https://wisprflow.ai",
  },
  {
    name: "GitHub",
    logo: "/logos/github.svg",
    monochrome: true,
    role: "Code Hosting",
    description:
      "The platform where code lives and evolves. Every project is a repository with its full history, so every change is tracked, reviewed and can be undone. It also connects to Vercel: every update to the code becomes a preview link, and approved changes go to production automatically.",
    points: [
      "Version control with branches, so new features never break what is already working.",
      "Pull requests to review every change before it reaches the main code.",
      "GitHub Actions to run type checks, linters and tests automatically on every change.",
      "Automatic preview and production deployments through the Vercel integration.",
    ],
    href: "https://github.com",
  },
  {
    name: "Warp",
    logo: "/logos/warp.svg",
    monochrome: false,
    role: "Terminal",
    description:
      "A modern terminal with AI built in. Every command and its output are grouped into blocks that can be searched, copied and shared, and the input works like a real text editor. It is where I run the development server, tests, builds and deployments, and where AI agents like Claude Code and Codex do their work.",
    points: [
      "Running dev servers, tests, builds and deployments from one window with tabs and split panes.",
      "Blocks that make it easy to find, copy or share the output of a single command.",
      "Asking the built-in AI for the right command or the cause of an error in plain English.",
      "Saved workflows for the commands I repeat on every project.",
    ],
    href: "https://www.warp.dev",
  },
  {
    name: "Cursor",
    logo: "/logos/cursor.svg",
    monochrome: true,
    role: "AI Code Editor",
    description:
      "A code editor built around AI, based on Visual Studio Code. It understands the whole codebase, predicts the next edit as I type and can apply changes across files from a short instruction. I use it when I want to work hands-on in the code with AI assistance right next to me.",
    points: [
      "Smart autocomplete that suggests whole lines and multi-line edits.",
      'Inline edits from a short instruction, such as "add validation to this form".',
      "Asking questions about an unfamiliar codebase and jumping to the right files.",
      "Reviewing AI-generated changes as clear diffs before accepting them.",
    ],
    href: "https://cursor.com",
  },
  {
    name: "Supabase",
    logo: "/logos/supabase.svg",
    monochrome: false,
    role: "Database Dashboard",
    description:
      "Beyond being part of the stack, the Supabase dashboard is a daily tool. It gives a visual view of the whole backend – tables, users, policies, files and logs – so a product's data can be inspected and managed without leaving the browser.",
    points: [
      "Table editor to browse and fix data while building and testing features.",
      "SQL editor to run queries, create functions and test security policies.",
      "Managing users, sign-in providers and email templates for authentication.",
      "Logs and reports to understand what happens in production.",
    ],
    href: "https://supabase.com",
  },
  {
    name: "Visual Studio Code",
    logo: "/logos/vscode.svg",
    monochrome: false,
    role: "Code Editor",
    description:
      "Microsoft's free code editor, built on an open-source core, and the industry standard for web development. It is fast, lightweight and extendable with thousands of extensions. I use it for focused, everyday editing and for reviewing the code produced by AI tools.",
    points: [
      "First-class TypeScript support: autocomplete, inline errors and quick navigation.",
      "ESLint and Prettier extensions that keep code clean and consistent on every save.",
      "Integrated terminal and debugger to run and inspect the app in one window.",
      "Tailwind CSS IntelliSense for class suggestions and previews.",
    ],
    href: "https://code.visualstudio.com",
  },
  {
    name: "Linear",
    logo: "/logos/linear.svg",
    monochrome: false,
    role: "Issue Tracking",
    description:
      "A fast, keyboard-first project management tool for software teams. Work is organised into issues, projects and cycles, so every feature, bug and improvement has an owner, a priority and a clear status. It keeps a project organised from the first idea to the release.",
    points: [
      "Breaking a project into clear, small issues with priorities and estimates.",
      "Planning work in cycles – short, focused periods with a defined goal.",
      "Tracking bugs from report to fix, so nothing gets lost.",
      "Roadmaps that show clients what is being built and what comes next.",
    ],
    href: "https://linear.app",
  },
  {
    name: "Notion",
    logo: "/logos/notion.svg",
    monochrome: true,
    role: "Docs & Notes",
    description:
      "An all-in-one workspace for documents, notes and simple databases. It is where a project's thinking lives before and during development: what we are building, why, and every decision made along the way.",
    points: [
      "Product specs and requirements written and agreed on before development starts.",
      "Research notes, references and design inspiration in one place.",
      "Meeting notes and decision logs that keep everyone aligned.",
      "Reusable templates for project kick-offs, checklists and documentation.",
    ],
    href: "https://www.notion.com",
  },
];

export const STACK_GROUPS: StackGroup[] = [
  { title: "Stack", pointsLabel: "In real projects", items: TECH_STACK },
  { title: "Tools", pointsLabel: "How I use it", items: TOOLS },
];

/** Primeras dos frases: resumen corto para filas y tarjetas. */
export function summarize(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  return sentences.slice(0, 2).join("").trim();
}

export function stackSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Información adicional para la página de detalle de cada tecnología o herramienta. */
interface StackDetails {
  /** Categoría descriptiva que acompaña al nombre (p. ej. "React Framework"). */
  category: string;
  /** Papel en el flujo de trabajo de Jeremy, en una frase. */
  workflow: string;
  /** Servicios donde se usa (slugs de /services). */
  services: ServiceSlug[];
  /** Tecnologías relacionadas (slugs de /stack). */
  related: string[];
  /** Documentación oficial (verificada el 2026-11-09). */
  docs: string;
}

const DETAILS: Record<string, StackDetails> = {
  "next-js": {
    category: "React Framework",
    workflow: "The foundation of every product: routing, rendering, server logic and deployment in one codebase.",
    services: ["websites", "saas-products", "mvp-development", "ai-integrations"],
    related: ["react", "typescript", "tailwind-css", "supabase"],
    docs: "https://nextjs.org/docs",
  },
  react: {
    category: "UI Library",
    workflow: "The layer that turns data and state into the interfaces people use.",
    services: ["websites", "saas-products", "mvp-development"],
    related: ["next-js", "typescript", "tailwind-css"],
    docs: "https://react.dev/learn",
  },
  "tailwind-css": {
    category: "Styling Framework",
    workflow: "How design tokens become a consistent, responsive interface.",
    services: ["websites", "saas-products", "mvp-development"],
    related: ["react", "next-js"],
    docs: "https://tailwindcss.com/docs",
  },
  "drizzle-orm": {
    category: "TypeScript ORM",
    workflow: "The typed bridge between application code and the PostgreSQL database.",
    services: ["saas-products", "scalability"],
    related: ["supabase", "typescript", "next-js"],
    docs: "https://orm.drizzle.team/docs/overview",
  },
  supabase: {
    category: "Backend Platform",
    workflow: "The backend: database, authentication, storage and realtime in one platform.",
    services: ["saas-products", "mvp-development", "ai-integrations", "automation-systems"],
    related: ["drizzle-orm", "next-js", "typescript"],
    docs: "https://supabase.com/docs",
  },
  typescript: {
    category: "Programming Language",
    workflow: "The language everything is written in, checked in strict mode.",
    services: ["saas-products", "ai-integrations", "automation-systems", "scalability"],
    related: ["next-js", "react", "drizzle-orm"],
    docs: "https://www.typescriptlang.org/docs/",
  },
  "claude-code": {
    category: "AI Coding Agent",
    workflow: "My main development partner, from planning a feature to reviewing it.",
    services: ["mvp-development", "saas-products", "scalability"],
    related: ["codex", "warp", "github"],
    docs: "https://code.claude.com/docs/en/overview",
  },
  codex: {
    category: "AI Coding Agent",
    workflow: "A second agent for well-defined tasks that run in parallel.",
    services: ["saas-products", "scalability"],
    related: ["claude-code", "github"],
    docs: "https://github.com/openai/codex",
  },
  "wispr-flow": {
    category: "Voice Dictation",
    workflow: "The fastest way to turn ideas and instructions into text.",
    services: [],
    related: ["claude-code", "codex"],
    docs: "https://docs.wisprflow.ai/",
  },
  github: {
    category: "Code Hosting",
    workflow: "Where code is versioned, reviewed and connected to deployments.",
    services: ["websites", "saas-products", "scalability"],
    related: ["claude-code", "codex"],
    docs: "https://docs.github.com/",
  },
  warp: {
    category: "Terminal",
    workflow: "Where commands, servers, tests and AI agents run.",
    services: [],
    related: ["claude-code", "codex"],
    docs: "https://docs.warp.dev/",
  },
  cursor: {
    category: "AI Code Editor",
    workflow: "Hands-on editing with AI assistance right next to the code.",
    services: [],
    related: ["visual-studio-code", "claude-code"],
    docs: "https://cursor.com/docs",
  },
  "visual-studio-code": {
    category: "Code Editor",
    workflow: "Focused everyday editing and reviewing AI-generated changes.",
    services: [],
    related: ["cursor", "typescript", "tailwind-css"],
    docs: "https://code.visualstudio.com/docs",
  },
  linear: {
    category: "Issue Tracking",
    workflow: "Where work is planned, prioritised and tracked.",
    services: ["mvp-development", "saas-products"],
    related: ["notion", "github"],
    docs: "https://linear.app/docs",
  },
  notion: {
    category: "Docs & Notes",
    workflow: "Where specs, research and decisions are written down.",
    services: ["mvp-development"],
    related: ["linear"],
    docs: "https://www.notion.com/help",
  },
};

export type StackEntry = StackItem &
  StackDetails & {
    slug: string;
    group: string;
    pointsLabel: string;
    /** Mismo nombre en otro grupo (Supabase está en Stack y en Tools). */
    secondary?: { group: string; pointsLabel: string; description: string; points: string[] };
  };

function buildEntries(): StackEntry[] {
  const all = STACK_GROUPS.flatMap((group) => group.items.map((item) => ({ item, group })));
  const firstBySlug = new Map<string, (typeof all)[number]>();
  for (const pair of all) {
    const slug = stackSlug(pair.item.name);
    if (!firstBySlug.has(slug)) firstBySlug.set(slug, pair);
  }

  return [...firstBySlug.entries()].map(([slug, { item, group }]) => {
    const details = DETAILS[slug];
    if (!details) throw new Error(`Missing stack details for "${slug}"`);
    const duplicate = all.find((pair) => pair.group !== group && stackSlug(pair.item.name) === slug);
    return {
      ...item,
      ...details,
      slug,
      group: group.title,
      pointsLabel: group.pointsLabel,
      secondary: duplicate
        ? {
            group: duplicate.group.title,
            pointsLabel: duplicate.group.pointsLabel,
            description: duplicate.item.description,
            points: duplicate.item.points,
          }
        : undefined,
    };
  });
}

/** Inventario único (sin duplicados), en el orden de los grupos. */
export const STACK_ENTRIES: readonly StackEntry[] = buildEntries();

export const STACK_PATH = "/stack";

export function stackHref(slug: string): string {
  return `${STACK_PATH}/${slug}`;
}

export function getStackEntry(slug: string): StackEntry | undefined {
  return STACK_ENTRIES.find((entry) => entry.slug === slug);
}

export function getRelatedStack(entry: StackEntry): StackEntry[] {
  return entry.related
    .map((slug) => getStackEntry(slug))
    .filter((related): related is StackEntry => related !== undefined);
}
