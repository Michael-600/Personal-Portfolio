import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GradientText({
  children,
  className,
  from = "from-cyan-300",
  via = "via-cyan-200",
  to = "to-blue-400",
}: {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </span>
  );
}
