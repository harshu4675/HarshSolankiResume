import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  containerVariants,
  fadeUpVariant,
  slideRightVariant,
} from "@lib/animations";

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
  maxWidth = "max-w-2xl",
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex flex-col ${alignClass} ${maxWidth} ${className}`}
    >
      {/* Label */}
      {label && (
        <motion.div variants={slideRightVariant} className="section-label">
          {label}
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        variants={fadeUpVariant}
        className={`text-heading-1 text-primary ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p variants={fadeUpVariant} className="text-lead mt-4 max-w-xl">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
