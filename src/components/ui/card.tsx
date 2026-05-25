import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[rgba(75,45,23,0.1)] bg-[rgba(255,249,235,0.85)] p-6 shadow-soft",
        className
      )}
      {...props}
    />
  );
}
