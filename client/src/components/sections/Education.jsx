import React from "react";
import { motion } from "framer-motion";
import {
  RiGraduationCapLine,
  RiMapPinLine,
  RiCalendarLine,
  RiBookOpenLine,
  RiCheckLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import SectionHeader from "@components/common/SectionHeader";
import ScrollReveal from "@components/common/ScrollReveal";
import TiltCard from "@components/3d/TiltCard";
import Badge from "@components/ui/Badge";
import { EDUCATION } from "@lib/constants";

function EducationCard({ edu }) {
  return (
    <ScrollReveal>
      <TiltCard intensity={3} scale={1.005} glare={false}>
        <div
          className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden"
          style={{ boxShadow: "0 2px 8px rgba(10,10,10,0.05)" }}
        >
          {/* Top section */}
          <div className="relative px-8 pt-8 pb-6 md:px-10 md:pt-10">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.04] pointer-events-none">
              <RiGraduationCapLine className="w-full h-full text-primary" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <RiGraduationCapLine size={24} className="text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary tracking-tight mb-0.5">
                    {edu.institution}
                  </h3>
                  <p className="text-base font-semibold text-blue-600 mb-2">
                    {edu.degree} — {edu.field}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary">
                    <span className="flex items-center gap-1.5">
                      <RiCalendarLine size={13} />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <RiMapPinLine size={13} />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Completed Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 self-start">
                <RiCheckboxCircleFill size={14} className="text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">
                  {edu.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="px-8 pb-8 md:px-10 md:pb-10">
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {edu.description}
            </p>

            {/* Coursework */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <RiBookOpenLine size={15} className="text-blue-600" />
                <h4 className="text-sm font-bold text-primary tracking-tight">
                  Key Coursework
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {edu.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <div className="w-4 h-4 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                      <RiCheckLine size={9} className="text-blue-600" />
                    </div>
                    <span className="leading-relaxed">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Graduation note */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/[0.05]" />
              <span className="text-xs font-semibold text-emerald-600 tracking-wider flex items-center gap-1.5">
                <RiCheckboxCircleFill size={12} />
                Graduated 2026
              </span>
              <div className="h-px flex-1 bg-black/[0.05]" />
            </div>
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

export default function Education() {
  return (
    <section id="education" className="section-sm relative overflow-hidden">
      <div className="container-main relative z-10">
        <SectionHeader
          label="Education"
          title="Academic Background"
          description="Strong foundation in Computer Science with hands-on development experience."
          className="mb-14"
        />

        <div className="max-w-3xl">
          {EDUCATION.map((edu) => (
            <EducationCard key={edu.id} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}
