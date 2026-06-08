import React from "react";
import { motion } from "framer-motion";
import { cn } from "@lib/utils";

const VARIANTS = {
  default: "bg-black/[0.05] text-primary/70 border-black/[0.07]",
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-emerald-50 text-emerald-700 border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  info: "bg-blue-50 text-blue-700 border-blue-100",
  dark: "bg-primary text-white border-transparent",
  outline: "bg-transparent text-primary/60 border-black/10",
};

const SIZES = {
  xs: "text-[10px] px-2 py-0.5 rounded-md tracking-[0.06em]",
  sm: "text-xs px-2.5 py-1 rounded-lg tracking-[0.04em]",
  md: "text-xs px-3 py-1.5 rounded-xl tracking-[0.03em]",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  dot = false,
  dotColor = "bg-emerald-500",
  animate = false,
  icon,
}) {
  const Component = animate ? motion.span : "span";

  const motionProps = animate
    ? {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }
    : {};

  return (
    <Component
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold border uppercase",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...motionProps}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      )}
      {icon && <span className="shrink-0 text-base leading-none">{icon}</span>}
      {children}
    </Component>
  );
}
