import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-[rgba(75,45,23,0.15)] bg-white/80 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)]",
        className
      )}
      {...props}
    />
  );
}
