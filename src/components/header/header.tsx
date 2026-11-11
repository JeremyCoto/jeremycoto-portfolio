"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";

import { Container } from "@/components/container";
import { DesktopNavigation } from "@/components/header/desktop-navigation";
import { MobileNavigation } from "@/components/header/mobile-navigation";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { PageEnter } from "@/components/page-enter";
import { SITE } from "@/content/site";
import avatarImage from "@/images/photos/avatar.jpg";
import { cn } from "@/lib/utils";

/** Escala final del avatar grande (64 px → 36 px) y desplazamiento en rem. */
const AVATAR_TO_SCALE = 36 / 64;
const AVATAR_TO_X = 2 / 16;
/** Píxeles de scroll hacia arriba antes de volver a mostrar la cabecera. */
const UP_DELAY = 64;

function clamp(value: number, a: number, b: number): number {
  return Math.min(Math.max(value, Math.min(a, b)), Math.max(a, b));
}

/** Las posiciones se controlan con variables CSS que actualiza el scroll. */
function cssPosition(variable: string): CSSProperties["position"] {
  return `var(${variable})` as CSSProperties["position"];
}

function AvatarContainer({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        className,
        "h-10 w-10 rounded-full bg-card/90 p-0.5 shadow-lg ring-1 shadow-foreground/5 ring-border backdrop-blur-sm dark:bg-muted/90",
      )}
      {...props}
    />
  );
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { large?: boolean }) {
  return (
    <Link href="/" aria-label="Home" className={cn(className, "pointer-events-auto")} {...props}>
      <Image
        src={avatarImage}
        alt={SITE.name}
        sizes={large ? "4rem" : "2.25rem"}
        className={cn("rounded-full bg-muted object-cover", large ? "h-16 w-16" : "h-9 w-9")}
        priority
      />
    </Link>
  );
}

function useHeaderScroll(isHomePage: boolean) {
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const root = document.documentElement.style;
    const downDelay = avatarRef.current?.offsetTop ?? 0;

    function updateHeader() {
      const header = headerRef.current;
      if (!header) return;
      const { top, height } = header.getBoundingClientRect();
      const scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight);

      if (isInitial.current) root.setProperty("--header-position", "sticky");
      root.setProperty("--content-offset", `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        root.setProperty("--header-height", `${downDelay + height}px`);
        root.setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -UP_DELAY) {
        const offset = Math.max(height, scrollY - UP_DELAY);
        root.setProperty("--header-height", `${offset}px`);
        root.setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        root.setProperty("--header-height", `${scrollY + height}px`);
        root.setProperty("--header-mb", `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        root.setProperty("--header-inner-position", "fixed");
        root.removeProperty("--header-top");
        root.removeProperty("--avatar-top");
      } else {
        root.removeProperty("--header-inner-position");
        root.setProperty("--header-top", "0px");
        root.setProperty("--avatar-top", "0px");
      }
    }

    function updateAvatar() {
      if (!isHomePage || downDelay === 0) return;
      const distance = downDelay - window.scrollY;
      const scale = clamp((distance * (1 - AVATAR_TO_SCALE)) / downDelay + AVATAR_TO_SCALE, 1, AVATAR_TO_SCALE);
      const x = clamp((distance * (0 - AVATAR_TO_X)) / downDelay + AVATAR_TO_X, 0, AVATAR_TO_X);
      root.setProperty("--avatar-image-transform", `translate3d(${x}rem, 0, 0) scale(${scale})`);

      const borderScale = scale / AVATAR_TO_SCALE;
      const borderX = (x - AVATAR_TO_X) * borderScale;
      root.setProperty("--avatar-border-transform", `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`);
      root.setProperty("--avatar-border-opacity", scale === AVATAR_TO_SCALE ? "1" : "0");
    }

    function update() {
      updateHeader();
      updateAvatar();
      isInitial.current = false;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHomePage]);

  return { headerRef, avatarRef };
}

export function Header() {
  const isHomePage = usePathname() === "/";
  const { headerRef, avatarRef } = useHeaderScroll(isHomePage);

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{ height: "var(--header-height)", marginBottom: "var(--header-mb)" }}
      >
        {isHomePage ? (
          <>
            <div ref={avatarRef} className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]" />
            <Container className="top-0 order-last -mb-3 pt-3" style={{ position: cssPosition("--header-position") }}>
              <div
                className="top-(--avatar-top,--spacing(3)) w-full"
                style={{ position: cssPosition("--header-inner-position") }}
              >
                <PageEnter className="relative">
                  <AvatarContainer
                    className="absolute top-3 left-0 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: "var(--avatar-image-transform)" }}
                  />
                </PageEnter>
              </div>
            </Container>
          </>
        ) : null}
        <div ref={headerRef} className="top-0 z-10 h-16 pt-6" style={{ position: cssPosition("--header-position") }}>
          <Container
            className="top-(--header-top,--spacing(6)) w-full"
            style={{ position: cssPosition("--header-inner-position") }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage ? (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                ) : null}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage ? <div className="flex-none" style={{ height: "var(--content-offset)" }} /> : null}
    </>
  );
}
