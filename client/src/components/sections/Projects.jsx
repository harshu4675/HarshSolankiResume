import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiGithubLine,
  RiExternalLinkLine,
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiLayoutGridLine,
  RiSignalWifiLine,
  RiShieldCheckLine,
  RiSmartphoneLine,
  RiStarFill,
  RiCodeBoxLine,
} from "react-icons/ri";
import SectionHeader from "@components/common/SectionHeader";
import ScrollReveal from "@components/common/ScrollReveal";
import Button from "@components/ui/Button";
import { TechTagGroup } from "@components/ui/Tag";
import { PROJECTS, GITHUB_PROFILE_URL } from "@lib/constants";
import { gridContainerVariants, gridItemVariants } from "@lib/animations";

// ═══════════════════════════════════════════════════════════════════
// FLAGSHIP - TalishTalks
// ═══════════════════════════════════════════════════════════════════
function FlagshipProject({ project }) {
  const [activeFeatureSet, setActiveFeatureSet] = useState(0);
  const featureSets = [
    project.features.slice(0, 5),
    project.features.slice(5, 10),
  ];

  return (
    <div className="mb-14">
      <ScrollReveal className="mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <RiStarFill size={11} className="text-accent" />
            <span className="text-[11px] font-bold text-accent tracking-[0.1em] uppercase">
              Flagship Project
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
      </ScrollReveal>

      <div className="relative bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-elevation-3">
        <div
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.color}04 0%, transparent 60%)`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 md:p-8 lg:p-10 relative">
          <ScrollReveal className="lg:col-span-6" delay={0.1}>
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center"
              style={{
                background: `linear-gradient(145deg, ${project.mockupBg} 0%, ${project.mockupBg}EE 100%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative w-[80%] max-w-[320px]">
                <div className="bg-white rounded-[24px] shadow-2xl overflow-hidden border border-white/20">
                  <div className="bg-gradient-to-r from-accent to-accent-light px-4 py-2.5 flex items-center justify-between">
                    <span className="text-white text-[11px] font-bold tracking-tight">
                      TalishTalks
                    </span>
                    <div className="flex items-center gap-1.5">
                      <RiSignalWifiLine size={11} className="text-white/80" />
                      <RiShieldCheckLine size={11} className="text-white/80" />
                    </div>
                  </div>

                  <div className="p-4 space-y-3 bg-gray-50 min-h-[200px]">
                    <div className="flex items-end gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold text-accent">
                          A
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl rounded-bl-md px-3 py-2 max-w-[75%] shadow-sm">
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          Hey! Have you checked the new features? 🚀
                        </p>
                        <span className="text-[8px] text-gray-400 mt-1 block">
                          10:24 AM
                        </span>
                      </div>
                    </div>

                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-accent rounded-2xl rounded-br-md px-3 py-2 max-w-[75%] shadow-sm">
                        <p className="text-[11px] text-white leading-relaxed">
                          Yes! The real-time typing indicator is amazing ✨
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-[8px] text-white/70">
                            10:25 AM
                          </span>
                          <span className="text-[8px] text-white/70">✓✓</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold text-accent">
                          A
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl rounded-bl-md px-3 py-2 shadow-sm">
                        <div className="flex items-center gap-1">
                          {[0, 0.2, 0.4].map((delay, i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-gray-400"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-2.5 border-t border-gray-100 flex items-center gap-2 bg-white">
                    <div className="flex-1 bg-gray-50 rounded-full px-3 py-1.5">
                      <span className="text-[10px] text-gray-400">
                        Type a message...
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                      <RiArrowRightLine size={12} className="text-white" />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute -top-3 -right-3 px-2.5 py-1 rounded-xl bg-white shadow-lg border border-black/[0.05] flex items-center gap-1.5"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <RiSmartphoneLine size={11} className="text-accent" />
                  <span className="text-[10px] font-bold text-primary">
                    PWA
                  </span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-3 px-2.5 py-1 rounded-xl bg-white shadow-lg border border-black/[0.05] flex items-center gap-1.5"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <RiSignalWifiLine size={11} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-primary">
                    Real-Time
                  </span>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded-lg text-[10px] font-bold tracking-[0.08em] uppercase text-white"
                  style={{ backgroundColor: project.color }}
                >
                  {project.type}
                </span>
                <span className="text-xs text-text-tertiary font-medium">
                  MERN + Socket.io + PWA
                </span>
              </div>

              <h3 className="text-heading-2 text-primary mb-3">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl border border-black/[0.06] p-3"
                    style={{ boxShadow: "0 1px 2px rgba(15,15,18,0.03)" }}
                  >
                    <div className="text-[9px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-sm font-bold text-primary tracking-tight">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-text-quaternary tracking-[0.1em] uppercase">
                    Key Features
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[0, 1].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveFeatureSet(idx)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                          activeFeatureSet === idx
                            ? "bg-accent text-white"
                            : "bg-black/[0.04] text-text-tertiary hover:text-primary"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.ul
                    key={activeFeatureSet}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1.5"
                  >
                    {featureSets[activeFeatureSet]?.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <RiCheckboxCircleLine
                          size={14}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              <div className="mb-6">
                <TechTagGroup tags={project.tech} size="sm" />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  variant="accent"
                  size="md"
                  icon={<RiExternalLinkLine size={15} />}
                  href={project.live}
                  target="_blank"
                >
                  Live Demo
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  icon={<RiGithubLine size={15} />}
                  href={project.github}
                  target="_blank"
                >
                  Source Code
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPACT PROJECT CARD - 3 per row
// ═══════════════════════════════════════════════════════════════════
function ProjectCard({ project }) {
  return (
    <motion.div variants={gridItemVariants}>
      <div
        className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden h-full flex flex-col group transition-all duration-400 hover:shadow-elevation-4 hover:-translate-y-1"
        style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.04)" }}
      >
        {/* Compact icon preview */}
        <div
          className="relative aspect-[16/7] overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${project.mockupBg} 0%, ${project.mockupBg}DD 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(15,15,18,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,18,0.1) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${project.color}20`,
                boxShadow: `0 6px 20px ${project.color}25`,
              }}
            >
              {project.icon || "💻"}
            </div>
          </div>

          {/* Type badge */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-[0.08em] uppercase text-white shadow-sm"
              style={{ backgroundColor: project.color }}
            >
              {project.type}
            </span>
          </div>
        </div>

        {/* Compact body */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-primary tracking-tight mb-0.5">
            {project.title}
          </h3>
          <p className="text-[11px] text-text-tertiary font-medium mb-2.5">
            {project.subtitle}
          </p>

          <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
            {project.tagline}
          </p>

          {/* Mini stats - 2x2 */}
          <div className="grid grid-cols-2 gap-1 mb-3">
            {project.stats.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="px-2 py-1 rounded-md bg-black/[0.03] border border-black/[0.04]"
              >
                <div className="text-[8px] font-semibold text-text-quaternary tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="text-[10px] font-bold text-primary tracking-tight">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1" />

          {/* Compact tech tags - max 4 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-black/[0.04] text-text-tertiary border border-black/[0.04]"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-md text-text-quaternary">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Compact action buttons */}
          <div className="flex items-center gap-1.5 pt-3 border-t border-black/[0.05]">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary-soft transition-colors duration-200"
            >
              <RiExternalLinkLine size={11} />
              Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-black/[0.08] text-primary text-[11px] font-semibold hover:bg-black/[0.03] transition-all duration-200"
            >
              <RiGithubLine size={11} />
              Code
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// VIEW MORE ON GITHUB CARD
// ═══════════════════════════════════════════════════════════════════
function ViewMoreCard() {
  return (
    <motion.a
      href={GITHUB_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      variants={gridItemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-gradient-dark rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col items-center justify-center p-6 text-white transition-all duration-400 hover:shadow-elevation-5 cursor-pointer min-h-[280px]"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-30"
        style={{
          background: "radial-gradient(circle, #5B5FC7, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-32 h-32 opacity-20"
        style={{
          background: "radial-gradient(circle, #E94B3C, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        >
          <RiGithubLine size={32} className="text-white" />
        </motion.div>

        <h3 className="text-lg font-bold text-white tracking-tight mb-1.5">
          More Projects
        </h3>

        <p className="text-xs text-white/60 leading-relaxed mb-5 max-w-[200px] mx-auto">
          Explore my full collection of projects, experiments & open-source
          contributions
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mb-5 text-[11px] text-white/50">
          <div className="flex items-center gap-1.5">
            <RiCodeBoxLine size={12} />
            <span>20+ Repos</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="flex items-center gap-1.5">
            <RiStarFill size={11} className="text-amber-400" />
            <span>Public</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-primary text-xs font-bold group-hover:bg-accent group-hover:text-white transition-all duration-300">
          <RiGithubLine size={13} />
          View on GitHub
          <RiArrowRightLine
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </motion.a>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════════
export default function Projects() {
  const flagshipProject = PROJECTS.find((p) => p.id === "talishtalks");
  const otherProjects = PROJECTS.filter((p) => p.id !== "talishtalks");

  return (
    <section
      id="projects"
      className="section relative overflow-hidden bg-surface-3"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(15,15,18,0.06), transparent)",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <SectionHeader
          label="Featured Work"
          title="Projects I've Built"
          description="Real-world applications built from scratch — each solving genuine problems with modern technologies."
          className="mb-12"
        />

        {/* Flagship */}
        {flagshipProject && <FlagshipProject project={flagshipProject} />}

        {/* Section header */}
        <ScrollReveal className="mb-5">
          <div className="flex items-center gap-3">
            <RiLayoutGridLine size={16} className="text-text-tertiary" />
            <span className="text-sm font-semibold text-text-secondary tracking-tight">
              More Projects
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-text-tertiary bg-black/[0.04] border border-black/[0.05]">
              {otherProjects.length}
            </span>
            <div className="h-px flex-1 bg-black/[0.06]" />
          </div>
        </ScrollReveal>

        {/* 3-column compact grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* ━━━ View More on GitHub Card (last item) ━━━ */}
          <ViewMoreCard />
        </motion.div>
      </div>
    </section>
  );
}
