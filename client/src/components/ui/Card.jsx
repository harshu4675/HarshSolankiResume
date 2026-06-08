import React from "react";
import { motion } from "framer-motion";
import { cn } from "@lib/utils";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
  variant = "default",
  onClick,
  as = "div",
}) {
  const PADDING = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const VARIANTS = {
    default: "bg-white border border-black/[0.06]",
    warm: "bg-[#F9F7F5] border border-black/[0.05]",
    dark: "bg-primary border border-white/[0.08] text-white",
    ghost: "bg-transparent border border-black/[0.07]",
    accent: "bg-accent/5 border border-accent/15",
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      onClick={onClick}
      className={cn(
        "rounded-2xl",
        VARIANTS[variant],
        PADDING[padding],
        hover &&
          "transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
      }}
      whileHover={
        hover
          ? {
              y: -3,
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.09), 0 6px 16px rgba(0,0,0,0.05)",
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
    >
      {children}
    </Component>
  );
}

// ─── Feature Card ──────────────────────────────────────────────────────────
export function FeatureCard({
  icon,
  title,
  description,
  color,
  className = "",
}) {
  return (
    <Card className={cn("group", className)} hover>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
        style={{ backgroundColor: `${color}15` }}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-primary mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
