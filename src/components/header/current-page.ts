import { NAV_ITEMS } from "@/content/site";

/** Rótulo del botón del menú móvil según la ruta actual. */
export function currentPageLabel(pathname: string): string {
  if (pathname === "/") return "Home";
  const item = NAV_ITEMS.find((nav) => pathname === nav.href || pathname.startsWith(`${nav.href}/`));
  return item?.label ?? "Menu";
}

export function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
