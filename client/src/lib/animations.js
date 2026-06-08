// ============================================
// FRAMER MOTION ANIMATION VARIANTS
// Centralized animation library
// ============================================

// ─── Viewport Settings ────────────────────
export const VIEWPORT = {
  once: true,
  margin: "-80px",
};

export const VIEWPORT_EAGER = {
  once: true,
  margin: "-40px",
};

// ─── Stagger Container ────────────────────
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const containerVariantsFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const containerVariantsSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// ─── Item Variants ────────────────────────
export const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeUpLargeVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const scaleInVariant = {
  hidden: {
    opacity: 0,
    scale: 0.93,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideRightVariant = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideLeftVariant = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─── Card Hover ───────────────────────────
export const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Magnetic Button ──────────────────────
export const magneticVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

// ─── Page Transition ─────────────────────
export const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// ─── Hero Specific ────────────────────────
export const heroTextVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// ─── Skill Bar ────────────────────────────
export const skillBarVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (level) => ({
    scaleX: level / 100,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  }),
};

// ─── Navbar ───────────────────────────────
export const navVariants = {
  top: {
    backgroundColor: "rgba(247, 242, 238, 0)",
    boxShadow: "none",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    backgroundColor: "rgba(247, 242, 238, 0.9)",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
    backdropFilter: "blur(16px)",
  },
};

// ─── Badge Hover ──────────────────────────
export const badgeVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Stagger Grid ─────────────────────────
export const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

export const gridItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
