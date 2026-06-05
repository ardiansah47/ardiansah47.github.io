"use client";

import { useEffect, type ReactNode } from "react";
import { WRAP } from "@/lib/styles";
import type { NavItem } from "@/lib/content";

const LINK =
  "font-mono text-xs text-ink-2 no-underline tracking-[.4px] relative py-1 transition-colors hover:text-ink after:content-[''] after:absolute after:left-0 after:right-full after:bottom-0 after:h-[1.5px] after:bg-ink after:transition-[right] after:duration-[250ms] after:ease-[var(--ease)] hover:after:right-0 [&.active]:after:right-0";

/**
 * Sticky header that condenses into a floating pill on scroll and highlights
 * the link for whichever section is in view. `right` is an optional slot for
 * trailing controls (e.g. the theme toggle).
 */
export function Navbar({
  items,
  right,
}: {
  items: NavItem[];
  right?: ReactNode;
}) {
  useEffect(() => {
    const hdr = document.getElementById("hdr");
    const onScroll = () =>
      hdr?.classList.toggle("scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const links = [
      ...document.querySelectorAll<HTMLAnchorElement>("nav.sect a"),
    ];
    const map: Record<string, HTMLAnchorElement> = {};
    links.forEach((a) => {
      map[a.getAttribute("href")!.slice(1)] = a;
    });
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove("active"));
            map[e.target.id]?.classList.add("active");
          }
        });
      },
      { threshold: 0.4 },
    );
    // Observe the hero too: it has no matching link, so scrolling back up to
    // it clears every active link (instead of leaving "About" highlighted).
    [...items.map((i) => i.id), "hero"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [items]);

  return (
    <header
      id="hdr"
      className="group/hdr sticky top-0 z-30 bg-transparent transition-[padding] duration-300 ease-[var(--ease)]"
    >
      <div
        className={`${WRAP} flex items-center justify-center gap-3 h-[74px] transition-[height] duration-300 ease-[var(--ease)] group-[.scrolled]/hdr:h-[66px]`}
      >
        <nav className="sect flex items-center gap-6 pl-[22px] pr-3 py-2 rounded-[30px] border border-transparent transition-[background-color,border-color,box-shadow,padding,backdrop-filter] duration-[350ms] ease-[var(--ease)] group-[.scrolled]/hdr:bg-[color-mix(in_oklch,var(--bg)_90%,transparent)] group-[.scrolled]/hdr:border-line group-[.scrolled]/hdr:shadow-[0_8px_26px_-14px_rgba(0,0,0,.4)] group-[.scrolled]/hdr:backdrop-blur-[14px] max-[760px]:hidden">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={LINK}>
              <span className="text-accent-ink">{item.n}</span> {item.label}
            </a>
          ))}
          {right ? (
            <>
              <span className="w-px h-[18px] bg-line-2 flex-none" />
              {right}
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
