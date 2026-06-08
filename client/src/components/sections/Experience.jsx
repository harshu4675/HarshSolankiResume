import React from "react";
import { motion } from "framer-motion";
import {
  RiBriefcaseLine,
  RiMapPinLine,
  RiCalendarLine,
  RiCheckDoubleLine,
  RiTrophyLine,
} from "react-icons/ri";
import SectionHeader from "@components/common/SectionHeader";
import ScrollReveal from "@components/common/ScrollReveal";
import Badge from "@components/ui/Badge";
import { TechTagGroup } from "@components/ui/Tag";
import { EXPERIENCE } from "@lib/constants";

function ExperienceCard({ exp, index }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden transition-all duration-400 hover:shadow-elevation-3"
        style={{ boxShadow: "0 2px 8px rgba(10,10,10,0.05)" }}
      >
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-accent via-accent-light to-accent/30" />

        <div className="p-7 md:p-9">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-7">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                <RiBriefcaseLine size={22} className="text-accent" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary tracking-tight mb-0.5">
                  {exp.company}
                </h3>
                <p className="text-base font-semibold text-accent mb-2">
                  {exp.role}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary">
                  <span className="flex items-center gap-1.5">
                    <RiCalendarLine size={13} />
                    {exp.duration} · {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RiMapPinLine size={13} />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>

            <Badge variant="accent" size="sm" icon="💼">
              {exp.type}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-7 max-w-2xl">
            {exp.description}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
            {/* Responsibilities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <RiCheckDoubleLine size={13} className="text-blue-600" />
                </div>
                <h4 className="text-sm font-bold text-primary tracking-tight">
                  Responsibilities
                </h4>
              </div>
              <ul className="space-y-2.5">
                {exp.responsibilities.map((resp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{resp}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                  <RiTrophyLine size={13} className="text-amber-600" />
                </div>
                <h4 className="text-sm font-bold text-primary tracking-tight">
                  Key Achievements
                </h4>
              </div>
              <ul className="space-y-2.5">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <RiTrophyLine
                      size={13}
                      className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-5 border-t border-black/[0.05]">
            <p className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-3">
              Technologies Used
            </p>
            <TechTagGroup tags={exp.tech} size="sm" />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(10,10,10,0.06), transparent)",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <SectionHeader
          label="Experience"
          title="Professional Experience"
          description="Real-world industry experience building production applications and collaborating with engineering teams."
          className="mb-12"
        />

        <div className="space-y-6">
          {EXPERIENCE.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
