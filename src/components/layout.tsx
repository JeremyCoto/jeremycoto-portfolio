import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { PageTransition } from "@/components/page-transition";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh w-full flex-col overflow-x-clip">
      <Header />
      <main className="flex-auto">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
