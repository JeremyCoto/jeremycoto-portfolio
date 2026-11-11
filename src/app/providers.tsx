"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";

/** Si el usuario elige el mismo tema que el sistema, vuelve a "system". */
function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function onMediaChange() {
      const systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) setTheme("system");
    }
    onMediaChange();
    media.addEventListener("change", onMediaChange);
    return () => media.removeEventListener("change", onMediaChange);
  }, [resolvedTheme, setTheme]);

  return null;
}

export const AppContext = createContext<{ previousPathname?: string }>({});

/** Recuerda la ruta anterior (el botón de volver solo aparece si existe). */
function usePreviousPathname(pathname: string): string | undefined {
  const [state, setState] = useState<{ current: string; previous?: string }>({ current: pathname });
  if (state.current !== pathname) {
    setState({ current: pathname, previous: state.current });
  }
  return state.previous;
}

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPathname = usePreviousPathname(pathname);
  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}
