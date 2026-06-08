import React from "react";
import { motion } from "framer-motion";
import { cn } from "@lib/utils";
import MagneticButton from "@components/common/MagneticButton";

const VARIANTS = {
  primary: `
    bg-primary text-white
    shadow-[0_2px_8px_rgba(0,0,0,0.20),0_1px_3px_rgba(0,0,0,0.15)]
    hover:shadow-[0_8px_24px_rgba(0,0,0,0.22),0_3px_8px_rgba(0,0,0,0.15)]
  `,
  accent: `
    bg-accent text-white
    shadow-[0_4px_16px_rgba(255,94,87,0.30),0_2px_6px_rgba(255,94,87,0.20)]
    hover:shadow-[0_8px_28px_rgba(255,94,87,0.40),0_4px_12px_rgba(255,94,87,0.25)]
  `,
  ghost: `
    border border-black/10 text-primary
    bg-white/60 backdrop-blur-sm
    hover:bg-white/90 hover:border-black/18
    hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]
  `,
  outline: `
    border border-primary/20 text-primary
    hover:border-primary/40 hover:bg-primary/[0.03]
  `,
  link: `
    text-primary underline-offset-4
    hover:underline hover:text-accent
  `,
};

const SIZES = {
  sm: "px-5 py-2.5 text-sm rounded-xl gap-1.5",
  md: "px-7 py-3.5 text-sm rounded-xl gap-2",
  lg: "px-9 py-4 text-base rounded-2xl gap-2.5",
  xl: "px-11 py-5 text-base rounded-2xl gap-3",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconRight,
  loading = false,
  disabled = false,
  magnetic = true,
  href,
  target,
  onClick,
  type = "button",
  ...props
}) {
  const baseClass = cn(
    "inline-flex items-center justify-center font-semibold tracking-tight",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "select-none relative overflow-hidden",
    "disabled:opacity-50 disabled:pointer-events-none",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <MagneticButton
        as="a"
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={baseClass}
        intensity={magnetic ? 0.3 : 0}
        {...props}
      >
        {content}
      </MagneticButton>
    );
  }

  return (
    <MagneticButton
      as="button"
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClass}
      intensity={magnetic ? 0.3 : 0}
      {...props}
    >
      {content}
    </MagneticButton>
  );
}
