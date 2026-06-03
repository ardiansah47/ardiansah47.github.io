"use client";

import { useEffect, useState } from "react";

/**
 * Sun/moon switch that flips the `data-theme` attribute on <html>.
 * The pre-hydration inline script in the root layout sets the initial value;
 * this reads it back on mount so the control matches.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      onClick={toggle}
      className="cursor-pointer leading-none m-0 p-0 flex items-center justify-center w-[30px] h-[30px] text-ink-2 border-0 bg-transparent rounded-lg transition-colors duration-[250ms] ease-[var(--ease)] hover:text-ink hover:bg-surface-2 focus-visible:[outline:2px_solid_var(--accent-ink)] focus-visible:outline-offset-2"
    >
      <svg
        className="block"
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <g className="origin-center transition-[opacity,transform] duration-[450ms] ease-[var(--ease)] dark:opacity-0 dark:rotate-[60deg] dark:scale-[.6]">
          <circle cx="12" cy="12" r="4.2" />
          <g>
            <line x1="12" y1="2.5" x2="12" y2="4.6" />
            <line x1="12" y1="19.4" x2="12" y2="21.5" />
            <line x1="2.5" y1="12" x2="4.6" y2="12" />
            <line x1="19.4" y1="12" x2="21.5" y2="12" />
            <line x1="5.2" y1="5.2" x2="6.7" y2="6.7" />
            <line x1="17.3" y1="17.3" x2="18.8" y2="18.8" />
            <line x1="18.8" y1="5.2" x2="17.3" y2="6.7" />
            <line x1="6.7" y1="17.3" x2="5.2" y2="18.8" />
          </g>
        </g>
        <path
          className="origin-center transition-[opacity,transform] duration-[450ms] ease-[var(--ease)] opacity-0 rotate-[-60deg] scale-[.6] dark:opacity-100 dark:rotate-0 dark:scale-100 dark:text-accent-ink"
          d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z"
        />
      </svg>
    </button>
  );
}
