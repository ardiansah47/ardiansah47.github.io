import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

const base =
  "group inline-flex items-center gap-2.5 font-mono text-sm no-underline px-5 py-3.5 rounded-xl border-[1.5px] border-ink tracking-[.3px] transition-all duration-200 ease-[var(--ease)]";

const variants = {
  primary:
    "bg-ink text-bg hover:-translate-y-0.5 hover:shadow-[4px_6px_0_var(--line-2)]",
  ghost: "hover:bg-surface-2 hover:-translate-y-0.5",
} as const;

const arrow =
  "transition-transform duration-200 ease-[var(--ease)] group-hover:translate-x-1 group-hover:-translate-y-1";

type Variant = keyof typeof variants;

type Common = {
  variant?: Variant;
  /** Optional trailing glyph (e.g. an arrow) that nudges on hover. */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Renders an <a> when `href` is provided, otherwise a <button>. */
type ButtonProps = Common &
  (
    | ({ href: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        "className" | "children"
      >)
    | ({ href?: undefined } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >)
  );

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();
  const content = (
    <>
      {children}
      {icon ? <span className={arrow}>{icon}</span> : null}
    </>
  );

  if (typeof href === "string") {
    return (
      <a
        href={href}
        className={cls}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
