import React, { useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  intensity = 0.4,
  disabled = false,
  onClick,
  as = "button",
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });

  // Subtle text shift (less than container)
  const textX = useTransform(x, (v) => v * 0.4);
  const textY = useTransform(y, (v) => v * 0.4);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current || disabled) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) * intensity;
      const moveY = (e.clientY - centerY) * intensity;
      x.set(moveX);
      y.set(moveY);
    },
    [x, y, intensity, disabled],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{ x, y }}
      className={`relative inline-flex select-none ${className}`}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      <motion.span
        style={{ x: textX, y: textY }}
        className="inline-flex items-center justify-center gap-2 w-full h-full"
      >
        {children}
      </motion.span>
    </Component>
  );
}
