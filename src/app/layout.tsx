import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import { Providers } from "@/app/providers";
import { Layout } from "@/components/layout";
import { SITE } from "@/content/site";

import "@/styles/tailwind.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

/** URL pública: SITE_URL si existe; si no, el dominio de producción que da Vercel. */
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { template: `%s - ${SITE.name}`, default: SITE.title },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex h-full bg-white dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
