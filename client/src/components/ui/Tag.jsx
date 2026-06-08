import React from "react";
import { cn } from "@lib/utils";

// Tech stack color mapping
const TECH_COLORS = {
  "React.js": { bg: "#E8F4FD", text: "#1A6EA8", border: "#B3D9F5" },
  "Node.js": { bg: "#E8F5E9", text: "#2E7D32", border: "#A5D6A7" },
  MongoDB: { bg: "#E8F5E9", text: "#1B5E20", border: "#81C784" },
  "Express.js": { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" },
  "Socket.io": { bg: "#FFF3E0", text: "#E65100", border: "#FFB74D" },
  "Tailwind CSS": { bg: "#E0F7FA", text: "#006064", border: "#80DEEA" },
  JavaScript: { bg: "#FFFDE7", text: "#F57F17", border: "#FFF176" },
  JWT: { bg: "#FCE4EC", text: "#880E4F", border: "#F48FB1" },
  Cloudinary: { bg: "#E3F2FD", text: "#0D47A1", border: "#90CAF9" },
  Razorpay: { bg: "#E8EAF6", text: "#283593", border: "#9FA8DA" },
  PWA: { bg: "#F3E5F5", text: "#6A1B9A", border: "#CE93D8" },
  "REST APIs": { bg: "#ECEFF1", text: "#37474F", border: "#B0BEC5" },
  "JWT Authentication": { bg: "#FCE4EC", text: "#880E4F", border: "#F48FB1" },
};

export default function Tag({
  children,
  variant = "default",
  tech = false,
  className = "",
  size = "sm",
}) {
  const techStyle = tech && TECH_COLORS[children];

  const SIZES = {
    xs: "text-[10px] px-2 py-0.5 rounded-md",
    sm: "text-xs px-2.5 py-1 rounded-lg",
    md: "text-sm px-3 py-1.5 rounded-xl",
  };

  if (techStyle && tech) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-medium border",
          SIZES[size],
          className,
        )}
        style={{
          backgroundColor: techStyle.bg,
          color: techStyle.text,
          borderColor: techStyle.border,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border",
        "bg-black/[0.04] text-primary/65 border-black/[0.07]",
        SIZES[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

// ─── Tech Tag Group ────────────────────────────────────────────────────────
export function TechTagGroup({ tags = [], size = "sm", className = "" }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <Tag key={tag} tech size={size}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}
