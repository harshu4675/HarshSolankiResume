import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@lib/utils";

export default function TiltCard({
  children,
  className = "",
  intensity = 10,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  borderGlow = false,
  shadowOnHover = true,
  disabled = false,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [intensity, -intensity]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-intensity, intensity]),
    springConfig,
  );

  // Glare position (percentage strings)
  const glareXPercent = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareYPercent = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  // Border glow background (single transform that combines both)
  const borderGlowBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,94,87,0.25) 0%, transparent 60%)`,
  );

  // Glare overlay background
  const glareBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const handleMouseMove = useCallback(
    (e) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, disabled],
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered && !disabled ? scale : 1,
        }}
        transition={{
          scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative w-full h-full"
      >
        {/* Border Glow Effect */}
        {borderGlow && (
          <motion.div
            className="absolute -inset-px rounded-[inherit] z-0 pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: borderGlowBg,
              borderRadius: "inherit",
            }}
          />
        )}

        {/* Card Content */}
        <div className="relative z-10 w-full h-full">{children}</div>

        {/* Glare Overlay */}
        {glare && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] overflow-hidden"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ background: glareBg }}
            />
          </motion.div>
        )}

        {/* Dynamic Shadow */}
        {shadowOnHover && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-[inherit]"
            animate={{
              boxShadow: isHovered
                ? "0 32px 80px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.08)"
                : "0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
