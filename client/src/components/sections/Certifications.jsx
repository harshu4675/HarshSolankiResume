import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiAwardLine,
  RiCalendarLine,
  RiShieldCheckLine,
  RiExternalLinkLine,
  RiEyeLine,
} from "react-icons/ri";
import { SiHackerrank } from "react-icons/si";
import SectionHeader from "@components/common/SectionHeader";
import CertificateModal from "@components/common/CertificateModal";
import { CERTIFICATIONS, SOCIAL } from "@lib/constants";
import { gridContainerVariants, gridItemVariants } from "@lib/animations";

function CertificationCard({ cert, onView }) {
  const isHackerRank = cert.issuer === "HackerRank";

  return (
    <motion.div variants={gridItemVariants}>
      <div
        className="relative bg-white rounded-2xl border border-black/[0.06] overflow-hidden h-full group transition-all duration-400 hover:shadow-elevation-4 hover:-translate-y-0.5 flex flex-col"
        style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.04)" }}
      >
        {/* Top accent bar */}
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, ${cert.color}, ${cert.color}80)`,
          }}
        />

        {/* Bg decoration */}
        <div className="absolute top-4 right-4 opacity-[0.04] pointer-events-none">
          <RiAwardLine size={70} />
        </div>

        <div className="p-5 relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${cert.color}12` }}
            >
              {isHackerRank ? (
                <SiHackerrank size={20} style={{ color: cert.color }} />
              ) : (
                <RiAwardLine size={20} style={{ color: cert.color }} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[14px] font-bold text-primary tracking-tight leading-snug mb-0.5">
                {cert.title}
              </h3>
              <p
                className="text-xs font-semibold"
                style={{ color: cert.color }}
              >
                {cert.issuer}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold text-text-tertiary bg-black/[0.04] border border-black/[0.05]">
              <RiCalendarLine size={9} />
              {cert.year}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold text-text-tertiary bg-black/[0.04] border border-black/[0.05]">
              <RiShieldCheckLine size={9} />
              {cert.type}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
            {cert.description}
          </p>

          {/* Skills */}
          <div className="mb-4 flex-1">
            <p className="text-[9px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {cert.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: `${cert.color}08`,
                    borderColor: `${cert.color}18`,
                    color: cert.color,
                  }}
                >
                  {skill}
                </span>
              ))}
              {cert.skills.length > 4 && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md text-text-quaternary">
                  +{cert.skills.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* ━━━ View Certificate Button ━━━ */}
          <motion.button
            onClick={() => onView(cert)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[11px] font-semibold transition-all duration-200 hover:shadow-elevation-2"
            style={{
              borderColor: `${cert.color}30`,
              color: cert.color,
              backgroundColor: `${cert.color}06`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = cert.color;
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = cert.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${cert.color}06`;
              e.currentTarget.style.color = cert.color;
              e.currentTarget.style.borderColor = `${cert.color}30`;
            }}
          >
            <RiEyeLine size={12} />
            View Certificate
          </motion.button>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: cert.color }}
        />
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Don't clear cert immediately - lets exit animation play
    setTimeout(() => setSelectedCert(null), 300);
  };

  // Separate HackerRank from professional certs
  const professionalCerts = CERTIFICATIONS.filter(
    (c) => c.issuer !== "HackerRank",
  );
  const hackerRankCerts = CERTIFICATIONS.filter(
    (c) => c.issuer === "HackerRank",
  );

  return (
    <>
      <section
        id="certifications"
        className="section-sm relative overflow-hidden"
      >
        <div className="container-main relative z-10">
          <SectionHeader
            label="Certifications"
            title="Verified Skills & Certifications"
            description="Industry-recognized certifications validating my expertise across multiple technologies. Click to view."
            className="mb-12"
          />

          {/* Professional Certifications */}
          {professionalCerts.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <RiAwardLine size={16} className="text-text-tertiary" />
                <h3 className="text-sm font-semibold text-text-secondary tracking-tight">
                  Professional Training
                </h3>
                <div className="h-px flex-1 bg-black/[0.06]" />
              </div>

              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
              >
                {professionalCerts.map((cert) => (
                  <CertificationCard
                    key={cert.id}
                    cert={cert}
                    onView={handleView}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* HackerRank Certifications */}
          {hackerRankCerts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3 flex-1">
                  <SiHackerrank size={16} className="text-[#00EA64]" />
                  <h3 className="text-sm font-semibold text-text-secondary tracking-tight">
                    HackerRank Verified Skills
                  </h3>
                  <div className="h-px flex-1 bg-black/[0.06]" />
                </div>
                <a
                  href={SOCIAL.hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-text-tertiary hover:text-primary transition-colors"
                >
                  View Profile
                  <RiExternalLinkLine size={11} />
                </a>
              </div>

              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {hackerRankCerts.map((cert) => (
                  <CertificationCard
                    key={cert.id}
                    cert={cert}
                    onView={handleView}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Bottom divider */}
          <motion.div
            className="mt-16 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(15,15,18,0.06), transparent)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </section>

      {/* ━━━ Certificate Modal ━━━ */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
}
