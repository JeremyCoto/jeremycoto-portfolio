/**
 * Datos personales: fuente única.
 * Todo está tomado del portafolio en producción de Jeremy (portafolio-ten-mocha-97.vercel.app);
 * ver la tabla de verificación en docs/RESEARCH.md §8.
 */
export const SITE = {
  name: "Jeremy Coto",
  firstName: "Jeremy",
  position: "AI Software Developer",
  title: "Jeremy Coto - AI software developer in Costa Rica",
  description:
    "Software developer from Costa Rica building professional websites, intelligent automation systems, AI integrations, SaaS products and MVPs.",
  email: "jeremycoto2003@gmail.com",
  instagram: { handle: "@pssjeremy", href: "https://www.instagram.com/pssjeremy" },
  /** Asunto prellenado del correo, igual que en el sitio actual. */
  emailSubject: "Project inquiry",
} as const;

export type SocialName = "instagram" | "x" | "github" | "linkedin";

export interface SocialLink {
  name: SocialName;
  /** Nombre de la red (para lectores de pantalla y avisos). */
  network: string;
  /** Texto de la lista de About, igual que la referencia. */
  label: string;
  /** null = Jeremy aún no tiene cuenta: el icono se muestra sin enlace ("coming soon"). */
  href: string | null;
}

/**
 * Las mismas redes y en el mismo orden que la referencia.
 * Instagram viene del sitio actual; GitHub (JeremyCoto) se verificó con la API pública de GitHub;
 * X (@itspsjeremy) y LinkedIn (/in/jeremycoto) los dio Jeremy.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "instagram",
    network: "Instagram",
    label: "Follow on Instagram",
    href: "https://www.instagram.com/pssjeremy",
  },
  { name: "x", network: "X", label: "Follow on X", href: "https://x.com/itspsjeremy" },
  { name: "github", network: "GitHub", label: "Follow on GitHub", href: "https://github.com/JeremyCoto" },
  {
    name: "linkedin",
    network: "LinkedIn",
    label: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/jeremycoto",
  },
];

export function mailtoHref(subject: string = SITE.emailSubject, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}?${params.join("&")}`;
}

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Navegación principal definitiva: exactamente cuatro secciones.
 * "Projects" llegará en una versión futura (cuando haya proyectos terminados).
 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/stack", label: "Stack" },
  { href: "/gear", label: "Gear" },
];

/** Presentación profesional del hero (texto indicado por Jeremy). */
export const HERO = {
  title: "Intelligent products, websites, and automation with AI.",
  intro:
    "I’m Jeremy Coto, an independent AI Software Developer building intelligent products, websites, and business processes with AI.",
  supporting:
    "I combine modern software development, artificial intelligence and automation to create digital products, streamline business operations and turn ideas into functional solutions.",
} as const;

/** Experiencia profesional: solo la que figura en el sitio actual (sin empresas ni clientes). */
export interface Role {
  company: string;
  title: string;
  initials: string;
  start: string;
  end: string;
}

export const WORK: Role[] = [
  { company: "Independent", title: "AI Software Developer", initials: "JC", start: "2023", end: "Present" },
];

export const ABOUT_HERO_TITLE = "Hey, I’m Jeremy. I build software with AI and modern web tech.";

/** Texto de "About" del sitio actual + experiencia + FAQ (idiomas), en párrafos. */
export const ABOUT_PARAGRAPHS: string[] = [
  "I’m Jeremy Coto – a 23-year-old software developer from Costa Rica with approximately three years of experience exploring artificial intelligence, modern development technologies, and AI-powered solutions.",
  "My approach combines modern web technologies, thoughtful design, AI-assisted development, and automation to create digital experiences and systems that are functional, scalable, and tailored to each project’s needs.",
  "Since 2023 I’ve worked as an independent AI software developer, building professional websites, intelligent automation systems, AI integrations, SaaS products and MVPs that help businesses streamline operations, improve efficiency and turn ideas into practical digital products.",
  "My goal is to leverage these technologies transparently and responsibly, delivering solutions that provide real value rather than unnecessary complexity. I work remotely from Costa Rica and communicate in English and Spanish.",
];
