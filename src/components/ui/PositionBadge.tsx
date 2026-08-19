import React from "react";
import { cn } from "@/lib/utils";

interface PositionBadgeProps {
  pos: number | string;
  className?: string;
}

export function PositionBadge({ pos, className }: PositionBadgeProps) {
  const pStr = String(pos).trim();

  let bgClass = "bg-zinc-800 text-zinc-300 border-zinc-700";
  if (pStr === "1") {
    bgClass = "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold";
  } else if (pStr === "2") {
    bgClass = "bg-slate-300/20 text-slate-200 border-slate-400/50 font-bold";
  } else if (pStr === "3") {
    bgClass = "bg-amber-700/20 text-amber-400 border-amber-700/50 font-bold";
  } else if (["R", "Ret", "DNF", "DNS", "DSQ"].includes(pStr)) {
    bgClass = "bg-red-950/40 text-red-400 border-red-900/40 text-[10px]";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-7 h-7 rounded text-xs font-mono border",
        bgClass,
        className
      )}
    >
      {pStr}
    </span>
  );
}
