// Shared Tailwind class recipes used across the page and design-system components.
// Keeping them here avoids repeating long arbitrary-value strings in the markup.

export const WRAP =
  "max-w-[var(--maxw)] mx-auto px-8 relative z-[2] max-[760px]:px-6";

export const SECTION = "py-24 border-b border-line";

export const PILL =
  "font-mono text-sm px-4 py-2.5 border border-line-2 rounded-4xl bg-surface cursor-default transition-all duration-200 ease-[var(--ease)] hover:border-ink hover:-translate-y-0.5";

// The highlighter mark now lives in <Mark> (components/mark.tsx) so it can
// animate with Motion.

export const CT_LINK =
  "group font-mono text-sm no-underline text-ink inline-flex items-center gap-2 pb-1 border-b-[1.5px] border-line-2 transition-all duration-200 ease-[var(--ease)] hover:border-ink";
export const CT_LBL = "text-ink-3 transition-colors group-hover:text-accent-ink";
