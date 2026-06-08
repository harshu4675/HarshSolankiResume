import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@components/common/SectionHeader";
import ScrollReveal from "@components/common/ScrollReveal";
import { SKILLS } from "@lib/constants";
import { gridContainerVariants, gridItemVariants } from "@lib/animations";

const CATEGORIES = [
  {
    key: "Frontend",
    label: "Frontend",
    icon: "🎨",
    color: "#E94B3C",
    description: "Building responsive, performant user interfaces",
  },
  {
    key: "Backend",
    label: "Backend",
    icon: "⚙️",
    color: "#5B5FC7",
    description: "Server-side logic, APIs & real-time systems",
  },
  {
    key: "Database",
    label: "Database",
    icon: "🗄️",
    color: "#0F766E",
    description: "Data modeling & database management",
  },
  {
    key: "Tools",
    label: "Dev Tools",
    icon: "🔧",
    color: "#B45309",
    description: "Development workflow & deployment tools",
  },
  {
    key: "Concepts",
    label: "Concepts",
    icon: "💡",
    color: "#7C3AED",
    description: "Core engineering principles & patterns",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SKILL CARD — Premium card with experience tags
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SkillCard({ skill, categoryColor }) {
  // Tag color mapping based on type
  const getTagStyle = (tag) => {
    const productionTags = ["Production", "Daily Use", "Expert", "Built"];
    const advancedTags = ["Advanced", "Primary Editor", "Mobile-First"];
    const specialtyTags = ["Real-Time", "Secure", "REST APIs", "Offline-First"];

    if (productionTags.includes(tag)) {
      return {
        bg: `${categoryColor}15`,
        border: `${categoryColor}30`,
        color: categoryColor,
        dot: categoryColor,
      };
    }
    if (advancedTags.includes(tag)) {
      return {
        bg: "#10B98115",
        border: "#10B98130",
        color: "#10B981",
        dot: "#10B981",
      };
    }
    if (specialtyTags.includes(tag)) {
      return {
        bg: "#5B5FC715",
        border: "#5B5FC730",
        color: "#5B5FC7",
        dot: "#5B5FC7",
      };
    }
    // Default (neutral)
    return {
      bg: "rgba(15,15,18,0.04)",
      border: "rgba(15,15,18,0.08)",
      color: "#6B6B76",
      dot: "#9999A5",
    };
  };

  return (
    <motion.div
      variants={gridItemVariants}
      whileHover={{ y: -2 }}
      className="group bg-white rounded-2xl border border-black/[0.06] p-4 transition-all duration-300 hover:shadow-elevation-3 hover:border-black/[0.10]"
      style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
    >
      {/* Header — Icon + Name */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${categoryColor}10` }}
        >
          {skill.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-primary tracking-tight">
            {skill.name}
          </h4>
          {skill.description && (
            <p className="text-[11px] text-text-tertiary leading-relaxed mt-0.5 line-clamp-2">
              {skill.description}
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      {skill.tags && skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.04]">
          {skill.tags.map((tag) => {
            const style = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border"
                style={{
                  backgroundColor: style.bg,
                  borderColor: style.border,
                  color: style.color,
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: style.dot }}
                />
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN SKILLS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const activeCat = CATEGORIES.find((c) => c.key === activeCategory);
  const activeSkills = SKILLS[activeCategory] || [];

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${activeCat?.color || "#E94B3C"} 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <SectionHeader
          label="Skills & Tech"
          title="Technologies I Work With"
          description="My toolkit for building complete web applications — each skill backed by real project experience."
          className="mb-12"
        />

        {/* ━━━ Category Tabs ━━━ */}
        <ScrollReveal className="mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const skillCount = SKILLS[cat.key]?.length || 0;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-semibold
                    transition-colors duration-250 flex items-center gap-2
                    ${
                      isActive
                        ? "text-white"
                        : "text-text-secondary hover:text-primary bg-white border border-black/[0.06] hover:border-black/[0.12]"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skill-tab-bg"
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: cat.color }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-base leading-none">{cat.icon}</span>
                    {cat.label}
                    <span
                      className={`text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-md ${
                        isActive ? "bg-white/20" : "bg-black/[0.05]"
                      }`}
                    >
                      {skillCount}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ━━━ Skills Display ━━━ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Category Info Card */}
              <div className="lg:col-span-4">
                <div
                  className="rounded-2xl p-6 h-full text-white relative overflow-hidden sticky top-24"
                  style={{
                    background: `linear-gradient(135deg, ${activeCat.color} 0%, ${activeCat.color}DD 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  <div className="relative z-10">
                    <span className="text-3xl mb-3 block">
                      {activeCat.icon}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight mb-2">
                      {activeCat.label}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-5">
                      {activeCat.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/10 backdrop-blur-sm">
                        <span className="text-xs font-semibold text-white/90">
                          Total Skills
                        </span>
                        <span className="text-sm font-bold text-white tabular-nums">
                          {activeSkills.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/10 backdrop-blur-sm">
                        <span className="text-xs font-semibold text-white/90">
                          Production Use
                        </span>
                        <span className="text-sm font-bold text-white tabular-nums">
                          {
                            activeSkills.filter((s) =>
                              s.tags?.some((t) =>
                                ["Production", "Daily Use", "Built"].includes(
                                  t,
                                ),
                              ),
                            ).length
                          }
                        </span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-5 pt-4 border-t border-white/15">
                      <p className="text-[10px] font-semibold text-white/60 tracking-[0.1em] uppercase mb-2.5">
                        Tag Legend
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span className="text-white/80">
                            Used in production projects
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                          <span className="text-white/80">
                            Advanced proficiency
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                          <span className="text-white/80">
                            Specialty / Expertise
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="lg:col-span-8">
                <motion.div
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {activeSkills.map((skill) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      categoryColor={activeCat.color}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
