"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "bg-canvas/90 backdrop-blur-md border-b border-hairline"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-[72px] md:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/images/logo-emblem.webp"
              alt=""
              width={36}
              height={36}
              priority
              className="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9"
            />
            <span className="flex items-baseline gap-2.5">
              <span className="serif-accent text-[19px] leading-none tracking-[-0.01em] md:text-[21px]">
                법률사무소 진원
              </span>
              <span className="hidden font-mono text-[10px] tracking-[0.2em] text-mute sm:inline">
                JINWON LAW FIRM
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-sm px-3.5 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                    active ? "text-ink" : "text-body hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/consult"
              className="ml-3 rounded-sm bg-ink px-4 py-2 text-[14px] font-medium text-on-primary transition-opacity duration-200 hover:opacity-85"
            >
              빠른 상담신청
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${site.phone}`}
              className="rounded-sm bg-ink px-3.5 py-2 font-mono text-[13px] font-medium text-on-primary"
            >
              {site.phone}
            </a>
            <button
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            >
              <span
                className={`block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 전체화면 메뉴 */}
      <div
        className={`fixed inset-0 z-40 bg-canvas transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center px-8 pt-16">
          {[...navLinks, { href: "/consult", label: "빠른 상담신청" }].map(
            (l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`hairline-b flex items-center justify-between py-5 transition-[opacity,transform] duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <span className="display text-[26px]">{l.label}</span>
                <span className="font-mono text-[11px] text-mute">
                  0{i + 1}
                </span>
              </Link>
            ),
          )}
          <div
            className={`mt-10 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: open ? "480ms" : "0ms" }}
          >
            <p className="eyebrow mb-2">24시간 상담</p>
            <a href={`tel:${site.phone}`} className="font-mono text-[32px] text-ink">
              {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
