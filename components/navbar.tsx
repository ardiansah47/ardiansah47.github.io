"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WRAP } from "@/lib/styles";
import type { NavItem } from "@/lib/content";

const EASE = [0.22, 0.61, 0.36, 1] as [number, number, number, number];

const LINK =
  "font-mono text-xs text-ink-2 no-underline tracking-[.4px] relative py-1 transition-colors hover:text-ink after:content-[''] after:absolute after:left-0 after:right-full after:bottom-0 after:h-[1.5px] after:bg-ink after:transition-[right] after:duration-[250ms] after:ease-[var(--ease)] hover:after:right-0 [&.active]:after:right-0";

/**
 * Sticky header. On desktop it's a centered pill that condenses on scroll and
 * highlights the in-view section. On mobile the pill is replaced by a
 * hamburger that opens a dropdown menu. `right` is a trailing slot (e.g. the
 * theme toggle), rendered in both the desktop pill and the mobile menu.
 */
export function Navbar({
  items,
  right,
}: {
  items: NavItem[];
  right?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // scrolled-state pill + active-link highlighting
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
    // hero clears the active link (it has no matching nav entry)
    [...items.map((i) => i.id), "hero"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [items]);

  // while the mobile menu is open: lock scroll, close on Escape / desktop resize
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header
        id="hdr"
        className="group/hdr sticky top-0 z-40 bg-transparent transition-[padding] duration-300 ease-[var(--ease)]"
      >
        <div
          className={`${WRAP} flex items-center justify-center max-[760px]:justify-end gap-3 h-20 transition-[height] duration-300 ease-[var(--ease)] group-[.scrolled]/hdr:h-16`}
        >
          {/* desktop pill */}
          <nav className="sect flex items-center gap-6 pl-6 pr-3 py-2 rounded-4xl border border-transparent transition-[background-color,border-color,box-shadow,padding,backdrop-filter] duration-[350ms] ease-[var(--ease)] group-[.scrolled]/hdr:bg-[color-mix(in_oklch,var(--bg)_90%,transparent)] group-[.scrolled]/hdr:border-line group-[.scrolled]/hdr:shadow-[0_8px_26px_-14px_rgba(0,0,0,.4)] group-[.scrolled]/hdr:backdrop-blur-[14px] max-[760px]:hidden">
            {items.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={LINK}>
                <span className="text-accent-ink">{item.n}</span> {item.label}
              </a>
            ))}
            {right ? (
              <>
                <span className="w-px h-5 bg-line-2 flex-none" />
                {right}
              </>
            ) : null}
          </nav>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="hidden max-[760px]:flex flex-col items-center justify-center gap-1.5 w-10 h-10 -mr-1.5 cursor-pointer text-ink"
          >
            <motion.span
              aria-hidden
              className="block h-[1.5px] w-6 rounded bg-current origin-center"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            />
            <motion.span
              aria-hidden
              className="block h-[1.5px] w-6 rounded bg-current origin-center"
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            />
          </button>
        </div>
      </header>

      {/* mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-30 min-[761px]:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[color-mix(in_oklch,#000_28%,transparent)]"
            />
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute left-6 right-6 top-20 origin-top overflow-hidden rounded-2xl border border-line bg-[color-mix(in_oklch,var(--bg)_92%,transparent)] backdrop-blur-[16px] shadow-[0_16px_50px_-16px_rgba(0,0,0,.4)] p-2"
            >
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <span className="text-accent-ink">{item.n}</span> {item.label}
                </a>
              ))}
              {right ? (
                <div className="mt-1 flex items-center justify-between border-t border-line px-4 py-3">
                  <span className="font-mono text-xs uppercase tracking-[1px] text-ink-3">
                    Theme
                  </span>
                  {right}
                </div>
              ) : null}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
