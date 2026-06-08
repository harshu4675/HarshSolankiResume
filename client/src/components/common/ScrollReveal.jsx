import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  fadeUpVariant,
  fadeInVariant,
  scaleInVariant,
  slideRightVariant,
} from "@lib/animations";

const VARIANTS = {
  "fade-up": fadeUpVariant,
  "fade-in": fadeInVariant,
  "scale-in": scaleInVariant,
  "slide-right": slideRightVariant,
};

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration,
  threshold = 0.15,
  rootMargin = "-60px",
  className = "",
  as = "div",
  once = true,
  custom,
}) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  const selectedVariant = VARIANTS[variant] || VARIANTS["fade-up"];

  // Apply custom delay
  const variantWithDelay = {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible?.transition,
        delay,
        ...(duration && { duration }),
      },
    },
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      variants={variantWithDelay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      custom={custom}
    >
      {children}
    </Component>
  );
}

// ─── Stagger Container Wrapper ─────────────────────────────────────────────
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.1,
  threshold = 0.1,
  rootMargin = "-40px",
  once = true,
}) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
