import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiGithubLine,
  RiExternalLinkLine,
  RiArrowRightLine,
  RiCheckLine,
  RiLayoutGridLine,
  RiStarFill,
  RiCodeBoxLine,
  RiChat3Line,
  RiShoppingBag3Line,
  RiArticleLine,
  RiCupLine,
  RiStore3Line,
  RiGraduationCapLine,
  RiFolder3Line,
} from "react-icons/ri";
import SectionHeader from "@components/common/SectionHeader";
import ScrollReveal from "@components/common/ScrollReveal";
import Button from "@components/ui/Button";
import { TechTagGroup } from "@components/ui/Tag";
import { PROJECTS, GITHUB_PROFILE_URL } from "@lib/constants";
import { gridContainerVariants, gridItemVariants } from "@lib/animations";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ICON MAPPING - Real React Icons (No Emojis)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ICON_MAP = {
  chat: RiChat3Line,
  shop: RiShoppingBag3Line,
  blog: RiArticleLine,
  coffee: RiCupLine,
  marketplace: RiStore3Line,
  education: RiGraduationCapLine,
  default: RiFolder3Line,
};

function ProjectIcon({ name, size = 24, className = "" }) {
  const IconComponent = ICON_MAP[name] || ICON_MAP.default;
  return <IconComponent size={size} className={className} />;
}

function ProjectPreview({ project, isLarge = false }) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-black/[0.08] bg-gradient-card group/preview">
      <div className="px-3 py-2.5 border-b border-black/[0.05] flex items-center gap-2 bg-surface-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="px-2.5 py-0.5 rounded-md bg-white border border-black/[0.06]">
            <span className="text-[9px] font-mono text-text-tertiary tracking-wide">
              {project.id}.app
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-700 tracking-wide">
            LIVE
          </span>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center p-6 min-h-[180px] bg-white">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,15,18,0.5) 1px, transparent 0)`,
            backgroundSize: isLarge ? "24px 24px" : "16px 16px",
          }}
        />

        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(233,75,60,0.6), transparent)",
          }}
        />

        <div className="relative z-10 text-center">
          <div
            className={`${
              isLarge ? "w-16 h-16" : "w-12 h-12"
            } mx-auto mb-4 rounded-2xl bg-surface-2 border border-black/[0.06] flex items-center justify-center group-hover/preview:border-black/[0.12] group-hover/preview:bg-surface-3 transition-all duration-300`}
          >
            <ProjectIcon
              name={project.iconName}
              size={isLarge ? 28 : 20}
              className="text-primary"
            />
          </div>

          <h4
            className={`${
              isLarge ? "text-2xl" : "text-base"
            } font-bold text-primary tracking-tight mb-1`}
          >
            {project.title}
          </h4>

          <p
            className={`${
              isLarge ? "text-xs" : "text-[10px]"
            } font-mono text-text-tertiary tracking-wider uppercase`}
          >
            {project.type}
          </p>

          {isLarge && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-2 text-text-secondary border border-black/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 opacity-30">
          <div className="text-[10px] font-mono text-text-quaternary">$</div>
          <div className="flex-1 h-px bg-gradient-to-r from-black/15 via-black/5 to-transparent" />
          <div className="text-[10px] font-mono text-text-quaternary">_</div>
        </div>
      </div>
    </div>
  );
}

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 md:p-8 lg:p-10 relative">
          <ScrollReveal className="lg:col-span-6" delay={0.1}>
            <div className="aspect-[4/3] w-full">
              <ProjectPreview project={project} isLarge={true} />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg text-[10px] font-bold tracking-[0.08em] uppercase text-white bg-primary">
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
                    className="bg-surface-2 rounded-xl border border-black/[0.06] p-3"
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
                            ? "bg-primary text-white"
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
                        <div className="w-4 h-4 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <RiCheckLine size={9} className="text-emerald-600" />
                        </div>
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

function ProjectCard({ project }) {
  return (
    <motion.div variants={gridItemVariants}>
      <div
        className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden h-full flex flex-col group transition-all duration-400 hover:shadow-elevation-4 hover:-translate-y-1 hover:border-black/[0.10]"
        style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.04)" }}
      >
        <div className="relative aspect-[16/9] p-3 bg-surface-2">
          <ProjectPreview project={project} isLarge={false} />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold tracking-[0.08em] uppercase text-text-tertiary bg-black/[0.04] border border-black/[0.05]">
              {project.type}
            </span>
          </div>

          <h3 className="text-sm font-bold text-primary tracking-tight mb-0.5">
            {project.title}
          </h3>
          <p className="text-[11px] text-text-tertiary font-medium mb-2.5">
            {project.subtitle}
          </p>

          <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
            {project.tagline}
          </p>

          <div className="grid grid-cols-2 gap-1 mb-3">
            {project.stats.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="px-2 py-1 rounded-md bg-surface-2 border border-black/[0.04]"
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

          <div className="flex flex-wrap gap-1 mb-3">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-black/[0.03] text-text-tertiary border border-black/[0.04]"
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

function ViewMoreCard() {
  return (
    <motion.a
      href={GITHUB_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      variants={gridItemVariants}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white rounded-2xl border border-black/[0.06] overflow-hidden h-full flex flex-col items-center justify-center p-6 transition-all duration-400 hover:shadow-elevation-4 hover:border-black/[0.12] cursor-pointer min-h-[300px]"
      style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.04)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,15,18,0.5) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgba(233,75,60,0.6), transparent)",
        }}
      />

      <div className="relative z-10 text-center">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-surface-2 border border-black/[0.06] flex items-center justify-center group-hover:bg-surface-3 group-hover:border-black/[0.10] transition-all duration-300">
          <RiGithubLine size={26} className="text-primary" />
        </div>

        <h3 className="text-base font-bold text-primary tracking-tight mb-1.5">
          More on GitHub
        </h3>

        <p className="text-xs text-text-tertiary leading-relaxed mb-5 max-w-[200px] mx-auto">
          Explore my full collection of projects
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-3 mb-5 text-[10px] text-text-quaternary font-mono">
          <div className="flex items-center gap-1">
            <RiCodeBoxLine size={11} />
            <span>20+ Repos</span>
          </div>
          <div className="w-0.5 h-0.5 rounded-full bg-text-quaternary" />
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Active</span>
          </div>
        </div>

        {/* CTA */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold group-hover:bg-accent transition-all duration-300">
          <RiGithubLine size={12} />
          View Profile
          <RiArrowRightLine
            size={11}
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

        {/* 3-column grid */}
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

          <ViewMoreCard />
        </motion.div>
      </div>
    </section>
  );
}
