import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@components/common/SectionHeader";
import { WHAT_I_BUILD } from "@lib/constants";
import { gridContainerVariants, gridItemVariants } from "@lib/animations";

function BuildCard({ item }) {
  return (
    <motion.div variants={gridItemVariants}>
      <div
        className="group relative bg-white rounded-2xl border border-black/[0.06] p-5 h-full overflow-hidden transition-all duration-400 hover:shadow-elevation-4 hover:-translate-y-0.5 hover:border-black/[0.10]"
        style={{ boxShadow: "0 1px 3px rgba(10,10,10,0.04)" }}
      >
        {/* Hover gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 0%, ${item.color}06 0%, transparent 70%)`,
          }}
        />

        {/* Top row */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${item.color}12` }}
          >
            {item.icon}
          </div>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-[15px] font-bold text-primary tracking-tight mb-1.5">
          {item.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-[13px] text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Examples */}
        <div className="relative z-10 flex flex-wrap gap-1">
          {item.examples.map((example) => (
            <span
              key={example}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md text-text-tertiary border border-black/[0.05] bg-black/[0.02]"
            >
              {example}
            </span>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: item.color }}
        />
      </div>
    </motion.div>
  );
}

export default function WhatIBuild() {
  return (
    <section id="capabilities" className="section-sm relative overflow-hidden">
      <div className="container-main relative z-10">
        <SectionHeader
          label="Capabilities"
          title="What I Build"
          description="From real-time systems to e-commerce platforms — I build complete, production-ready applications."
          align="center"
          className="mb-12 mx-auto"
        />

        {/* Compact Grid - 3 columns on desktop */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto"
        >
          {WHAT_I_BUILD.map((item) => (
            <BuildCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
