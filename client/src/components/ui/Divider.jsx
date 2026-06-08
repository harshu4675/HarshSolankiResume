import React from "react";
import { cn } from "@lib/utils";

export default function Divider({
  className = "",
  label,
  orientation = "horizontal",
}) {
  if (orientation === "vertical") {
    return (
      <div className={cn("w-px bg-black/[0.07] self-stretch", className)} />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="flex-1 h-px bg-black/[0.07]" />
        <span className="text-xs font-medium text-black/30 tracking-wider uppercase">
          {label}
        </span>
        <div className="flex-1 h-px bg-black/[0.07]" />
      </div>
    );
  }

  return <div className={cn("w-full h-px bg-black/[0.07]", className)} />;
}
