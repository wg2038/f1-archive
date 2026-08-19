import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "danger" | "gold" | "success" | "era";
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-zinc-800 text-zinc-200 border-zinc-700",
    secondary: "bg-zinc-900/80 text-zinc-400 border-zinc-800",
    outline: "bg-transparent text-zinc-300 border-zinc-700",
    danger: "bg-red-950/60 text-red-400 border-red-800/60",
    gold: "bg-amber-950/60 text-amber-300 border-amber-700/60",
    success: "bg-emerald-950/60 text-emerald-300 border-emerald-800/60",
    era: "bg-blue-950/50 text-blue-300 border-blue-800/50 font-mono text-[11px]"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
