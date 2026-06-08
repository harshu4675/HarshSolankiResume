import React from "react";
import { motion } from "framer-motion";

// Floating code snippets / tech icons that add depth to hero
export default function FloatingElements() {
  const elements = [
    {
      id: "react",
      content: "⚛️",
      label: "React",
      x: "8%",
      y: "15%",
      delay: 0,
      duration: 5,
      size: "lg",
    },
    {
      id: "node",
      content: "🟢",
      label: "Node.js",
      x: "85%",
      y: "25%",
      delay: 1,
      duration: 4.5,
      size: "md",
    },
    {
      id: "mongo",
      content: "🍃",
      label: "MongoDB",
      x: "12%",
      y: "70%",
      delay: 2,
      duration: 5.5,
      size: "md",
    },
    {
      id: "code",
      content: "</>",
      label: null,
      x: "90%",
      y: "65%",
      delay: 0.5,
      duration: 4,
      size: "sm",
      isCode: true,
    },
    {
      id: "socket",
      content: "⚡",
      label: "Socket.io",
      x: "75%",
      y: "80%",
      delay: 1.5,
      duration: 6,
      size: "sm",
    },
    {
      id: "api",
      content: "{ }",
      label: null,
      x: "5%",
      y: "45%",
      delay: 2.5,
      duration: 5,
      size: "sm",
      isCode: true,
    },
  ];

  const sizeMap = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.65, 0.65, 0],
            scale: [0.5, 1, 1, 0.8],
            y: [0, -8, 0, 8, 0],
          }}
          transition={{
            opacity: {
              duration: el.duration * 2,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            },
            y: {
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            },
            scale: {
              duration: el.duration * 2,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            },
          }}
        >
          <div
            className={`
              ${sizeMap[el.size]}
              rounded-2xl 
              flex items-center justify-center
              ${
                el.isCode
                  ? "bg-primary/[0.06] border border-primary/10 text-primary/40 font-mono font-semibold"
                  : "bg-white/70 backdrop-blur-sm border border-white/60 shadow-elevation-2"
              }
            `}
          >
            <span>{el.content}</span>
          </div>
          {el.label && (
            <div className="text-[9px] font-semibold text-text-quaternary text-center mt-1.5 tracking-wider uppercase">
              {el.label}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
