import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "success" | "warning";
};

export function Badge({
  className,
  tone = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tone === "default" && "bg-[rgba(209,161,42,0.2)] text-[var(--accent-2)]",
        tone === "success" && "bg-[rgba(140,113,46,0.2)] text-[#6a4a1f]",
        tone === "warning" && "bg-[rgba(224,176,63,0.3)] text-[#8d5a1f]",
        className
      )}
      {...props}
    />
  );
}
