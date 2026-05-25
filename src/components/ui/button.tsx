import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--ring)]",
        variant === "primary" &&
          "bg-[var(--accent)] text-[var(--brown)] shadow-soft hover:bg-[var(--accent-2)]",
        variant === "secondary" &&
          "bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[rgba(242,221,174,0.8)]",
        variant === "ghost" &&
          "bg-transparent text-[var(--ink)] hover:bg-[rgba(209,161,42,0.16)]",
        className
      )}
      {...props}
    />
  );
}
