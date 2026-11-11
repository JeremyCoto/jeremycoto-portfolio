import type { StaticImageData } from "next/image";

// Fotos de producto verificadas: ver research/gear/SOURCES.md.
import airpodsMax from "@/images/gear/airpods-max.jpg";
import airpodsPro2 from "@/images/gear/airpods-pro-2.jpg";
import asusVg27aq from "@/images/gear/asus-tuf-vg27aq.jpg";
import belkinPowerBank from "@/images/gear/belkin-power-bank-25k.jpg";
import fireTvStick from "@/images/gear/fire-tv-stick.jpg";
import ipad10 from "@/images/gear/ipad-10.jpg";
import laptopBackpack from "@/images/gear/laptop-backpack.jpg";
import lofreeFlowLite from "@/images/gear/lofree-flow-lite-100.jpg";
import mxMaster3 from "@/images/gear/logitech-mx-master-3.jpg";
import macbookAirM4 from "@/images/gear/macbook-air-m4.jpg";
import playstation5 from "@/images/gear/playstation-5-slim.jpg";
import sihooM18 from "@/images/gear/sihoo-m18.jpg";
import sonosRoam2 from "@/images/gear/sonos-roam-2.jpg";
import thuleCrossbody from "@/images/gear/thule-subterra-crossbody.jpg";

export interface GearLink {
  label: string;
  href: string;
}

export interface GearProduct {
  name: string;
  /** Especificaciones exactas indicadas por Jeremy (si las hay). */
  specs?: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  link: GearLink;
  /** Enlace secundario (especificaciones oficiales o marca). */
  secondaryLink?: GearLink;
  /** Modelo de referencia no confirmado: se indica en la interfaz. */
  isReference?: boolean;
}

export interface GearApp {
  name: string;
  description: string;
  logo: string;
  /** Logo de una sola tinta oscura: se invierte en tema oscuro. */
  monochrome?: boolean;
  href: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  kind: "products";
  items: GearProduct[];
}

export interface AppCategory {
  id: string;
  title: string;
  kind: "apps";
  items: GearApp[];
}

export type GearCategory = ProductCategory | AppCategory;

export const GEAR_TITLE = "Gear";
export const GEAR_INTRO = "Things I use to build, create and stay productive.";
/** Frase ampliada bajo el título (describe las cuatro categorías). */
export const GEAR_DESCRIPTION =
  "From the devices I carry every day and the setup I work at to what I unwind with at home and the apps that keep my workflow moving – this is the equipment behind my everyday work.";

const VIEW_PRODUCT = "View product";

export const GEAR_CATEGORIES: GearCategory[] = [
  {
    id: "everyday-carry",
    title: "Everyday Carry",
    kind: "products",
    items: [
      {
        name: "Apple MacBook Air 13-inch",
        specs: "Apple M4 · 24GB unified memory · 512GB SSD",
        description:
          "My primary machine for software development, AI-assisted workflows and building digital products.",
        image: macbookAirM4,
        imageAlt: "Apple MacBook Air 13-inch with M4 chip",
        link: { label: VIEW_PRODUCT, href: "https://www.apple.com/macbook-air/" },
      },
      {
        name: "Apple AirPods Max",
        specs: "1st generation · Lightning",
        description: "Over-ear headphones for focused listening, music, desk work and travel.",
        image: airpodsMax,
        imageAlt: "Apple AirPods Max first generation headphones",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B08PZHYWJS" },
      },
      {
        name: "Apple AirPods Pro 2",
        specs: "2nd generation",
        description: "Lightweight everyday earbuds for calls, focus, music and commuting.",
        image: airpodsPro2,
        imageAlt: "Apple AirPods Pro second generation earbuds",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B0CHWRXH8B" },
      },
      {
        name: "Apple iPad",
        specs: "10th generation · 10.9-inch display",
        description: "A portable device for reading, browsing and everyday productivity.",
        image: ipad10,
        imageAlt: "Apple iPad 10th generation",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B0BJLCWFNM" },
      },
      {
        name: "Black Laptop Backpack",
        description: "A black backpack with a dedicated laptop compartment for carrying my work every day.",
        image: laptopBackpack,
        imageAlt: "Black laptop backpack",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B0D2XQ7YQM" },
      },
      {
        name: "Thule Subterra Crossbody 5L",
        specs: "Black",
        description: "A compact everyday crossbody bag for carrying essential personal items.",
        image: thuleCrossbody,
        imageAlt: "Thule Subterra Crossbody 5L bag in black",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B0CVNWRVDV" },
        secondaryLink: { label: "thule.com", href: "https://www.thule.com/" },
      },
      {
        name: "Belkin Portable Charger 25K",
        specs: "25,000 mAh · Integrated USB-C cable · Black",
        description: "A power bank with enough capacity to keep my laptop, phone and earbuds charged on the go.",
        image: belkinPowerBank,
        imageAlt: "Belkin 25K portable charger in black with its integrated USB-C cable",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B0GXX52D5Y" },
      },
    ],
  },
  {
    id: "workstation",
    title: "Workstation",
    kind: "products",
    items: [
      {
        name: "ASUS TUF Gaming VG27AQ",
        specs: "27-inch · QHD 2560 × 1440 · IPS · up to 165Hz",
        description:
          "A high-refresh-rate display for development, multitasking and an immersive workstation experience.",
        image: asusVg27aq,
        imageAlt: "ASUS TUF Gaming VG27AQ 27-inch monitor",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/s?k=ASUS+TUF+VG27AQ" },
        secondaryLink: {
          label: "Specifications",
          href: "https://www.asus.com/us/displays-desktops/monitors/tuf-gaming/tuf-gaming-vg27aq/",
        },
        isReference: true,
      },
      {
        name: "Sonos Roam 2",
        specs: "Black",
        description: "A compact portable speaker for music at home, at my desk and on the go.",
        image: sonosRoam2,
        imageAlt: "Sonos Roam 2 portable speaker in black",
        link: { label: VIEW_PRODUCT, href: "https://www.sonos.com/en-us/shop/roam-2" },
      },
      {
        name: "Logitech MX Master 3",
        specs: "Advanced wireless mouse",
        description: "A precise, comfortable mouse with programmable buttons for long development sessions.",
        image: mxMaster3,
        imageAlt: "Logitech MX Master 3 wireless mouse in graphite",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B07XC2FWD1" },
      },
      {
        name: "LOFREE Flow Lite 100",
        specs: "Low-profile mechanical · Specter linear switches · Marble",
        description: "A full-size, low-profile mechanical keyboard that keeps my wrists relaxed while I type all day.",
        image: lofreeFlowLite,
        imageAlt: "LOFREE Flow Lite 100 low-profile mechanical keyboard in white",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B0DP33XH4X" },
      },
      {
        name: "SIHOO M18 Ergonomic Chair",
        specs: "Mesh back · Adjustable headrest and lumbar support",
        description: "An ergonomic mesh chair with head, back and lumbar support for long hours at the desk.",
        image: sihooM18,
        imageAlt: "SIHOO M18 ergonomic mesh office chair",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B07GNDDNMW" },
      },
    ],
  },
  {
    id: "home",
    title: "Home",
    kind: "products",
    items: [
      {
        name: "Amazon Fire TV Stick",
        description: "An easy way to access streaming platforms and entertainment at home.",
        image: fireTvStick,
        imageAlt: "Amazon Fire TV Stick with its remote",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/s?k=Amazon+Fire+TV+Stick" },
      },
      {
        name: "PlayStation 5",
        specs: "Slim",
        description: "Gaming and entertainment as part of my everyday home setup.",
        image: playstation5,
        imageAlt: "PlayStation 5 Slim console with controller",
        link: { label: VIEW_PRODUCT, href: "https://www.amazon.com/dp/B0CL61F39H" },
        isReference: true,
      },
    ],
  },
  {
    id: "apps",
    title: "Apps",
    kind: "apps",
    items: [
      {
        name: "OpenAI Codex",
        description: "AI-assisted software development and coding workflows.",
        logo: "/logos/codex.svg",
        href: "https://openai.com/codex/",
      },
      {
        name: "Claude",
        description: "AI assistance for development, reasoning and working through complex tasks.",
        logo: "/logos/claude-code.webp",
        href: "https://claude.ai/",
      },
      {
        name: "Cursor",
        description: "An AI code editor for hands-on development, with AI assistance right next to the code.",
        logo: "/logos/cursor.svg",
        monochrome: true,
        href: "https://cursor.com/",
      },
      {
        name: "Wispr Flow",
        description: "Voice dictation for writing and communicating more efficiently.",
        logo: "/logos/wispr-flow.svg",
        monochrome: true,
        href: "https://wisprflow.ai/",
      },
      {
        name: "Notion",
        description: "Organizing information, documentation and personal workflows.",
        logo: "/logos/notion.svg",
        monochrome: true,
        href: "https://www.notion.com/",
      },
      {
        name: "Linear",
        description: "Managing software development tasks, issues and project workflows.",
        logo: "/logos/linear.svg",
        href: "https://linear.app/",
      },
      {
        name: "Supabase",
        description: "Database infrastructure, authentication and backend services for applications.",
        logo: "/logos/supabase.svg",
        href: "https://supabase.com/",
      },
      {
        name: "Spotify",
        description: "Music and audio for everyday listening and focus.",
        logo: "/logos/spotify.svg",
        href: "https://www.spotify.com/",
      },
    ],
  },
];
