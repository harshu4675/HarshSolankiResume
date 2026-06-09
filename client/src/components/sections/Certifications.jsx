import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiAwardLine,
  RiCalendarLine,
  RiShieldCheckLine,
  RiExternalLinkLine,
  RiEyeLine,
  RiBriefcaseLine,
  RiCodeBoxLine,
  RiBookOpenLine,
  RiTrophyLine,
} from "react-icons/ri";
import { SiHackerrank, SiFreecodecamp } from "react-icons/si";
import SectionHeader from "@components/common/SectionHeader";
import CertificateModal from "@components/common/CertificateModal";
import { CERTIFICATIONS, SOCIAL } from "@lib/constants";
import { gridContainerVariants, gridItemVariants } from "@lib/animations";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CERTIFICATION CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CertificationCard({ cert, onView }) {
  const getIssuerIcon = () => {
    if (cert.issuer === "HackerRank")
      return <SiHackerrank size={20} style={{ color: cert.color }} />;
    if (cert.issuer === "freeCodeCamp")
      return <SiFreecodecamp size={20} style={{ color: cert.color }} />;
    if (cert.category === "course")
      return <RiBookOpenLine size={20} style={{ color: cert.color }} />;
    return <RiAwardLine size={20} style={{ color: cert.color }} />;
  };

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
              {getIssuerIcon()}
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
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold text-text-tertiary bg-black/[0.04] border border-black/[0.05]">
              <RiCalendarLine size={9} />
              {cert.duration || cert.year}
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

          {/* Credential ID (if exists) */}
          {cert.credentialId && (
            <div className="mb-3 px-2 py-1 rounded-md bg-black/[0.02] border border-black/[0.04]">
              <p className="text-[9px] font-semibold text-text-quaternary tracking-wide uppercase">
                Credential ID
              </p>
              <p className="text-[10px] font-mono font-bold text-text-secondary truncate">
                {cert.credentialId}
              </p>
            </div>
          )}

          {/* View Certificate Button */}
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION HEADER COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CategoryHeader({ icon, iconColor, title, count, badge, profileUrl }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}10` }}
        >
          {React.cloneElement(icon, { size: 14, style: { color: iconColor } })}
        </div>
        <h3 className="text-sm font-bold text-primary tracking-tight">
          {title}
        </h3>
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-text-tertiary bg-black/[0.04] border border-black/[0.05]">
          {count}
        </span>
        {badge && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
            <RiCodeBoxLine size={9} />
            {badge}
          </span>
        )}
        <div className="h-px flex-1 bg-black/[0.06]" />
      </div>
      {profileUrl && (
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-text-tertiary hover:text-primary transition-colors ml-3"
        >
          Profile
          <RiExternalLinkLine size={11} />
        </a>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN CERTIFICATIONS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  // Separate by category
  const professionalCerts = CERTIFICATIONS.filter(
    (c) => c.category === "professional",
  );
  const hackerRankCerts = CERTIFICATIONS.filter(
    (c) => c.category === "hackerrank",
  );
  const freeCodeCampCerts = CERTIFICATIONS.filter(
    (c) => c.category === "freecodecamp",
  );
  const courseCerts = CERTIFICATIONS.filter((c) => c.category === "course");

  // Calculate total fCC hours
  const fccTotalHours = freeCodeCampCerts.length * 300;

  return (
    <>
      <section
        id="certifications"
        className="section-sm relative overflow-hidden"
      >
        <div className="container-main relative z-10">
          <SectionHeader
            label="Certifications"
            title="Verified Skills & Achievements"
            description={`${CERTIFICATIONS.length} industry-recognized certifications across internships, skill assessments, and structured learning paths.`}
            className="mb-12"
          />

          {/* ━━━ 1. PROFESSIONAL INTERNSHIPS ━━━ */}
          {professionalCerts.length > 0 && (
            <div className="mb-12">
              <CategoryHeader
                icon={<RiBriefcaseLine />}
                iconColor="#E94B3C"
                title="Professional Internships"
                count={professionalCerts.length}
              />

              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
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

          {/* ━━━ 2. HACKERRANK SKILL VERIFIED ━━━ */}
          {hackerRankCerts.length > 0 && (
            <div className="mb-12">
              <CategoryHeader
                icon={<SiHackerrank />}
                iconColor="#00EA64"
                title="HackerRank Verified"
                count={hackerRankCerts.length}
                profileUrl={SOCIAL.hackerrank}
              />

              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
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

          {/* ━━━ 3. freeCodeCamp CERTIFICATIONS ━━━ */}
          {freeCodeCampCerts.length > 0 && (
            <div className="mb-12">
              <CategoryHeader
                icon={<SiFreecodecamp />}
                iconColor="#0A0A23"
                title="freeCodeCamp Certified"
                count={freeCodeCampCerts.length}
                badge={`${fccTotalHours}+ hours`}
                profileUrl="https://www.freecodecamp.org/harshu6278"
              />

              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {freeCodeCampCerts.map((cert) => (
                  <CertificationCard
                    key={cert.id}
                    cert={cert}
                    onView={handleView}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* ━━━ 4. ONLINE COURSES (Scaler) ━━━ */}
          {courseCerts.length > 0 && (
            <div>
              <CategoryHeader
                icon={<RiBookOpenLine />}
                iconColor="#2563EB"
                title="Online Courses"
                count={courseCerts.length}
              />

              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {courseCerts.map((cert) => (
                  <CertificationCard
                    key={cert.id}
                    cert={cert}
                    onView={handleView}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Bottom stats summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              {
                icon: <RiBriefcaseLine size={16} />,
                label: "Internships",
                value: professionalCerts.length,
                color: "#E94B3C",
              },
              {
                icon: <SiHackerrank size={16} />,
                label: "HackerRank",
                value: hackerRankCerts.length,
                color: "#00EA64",
              },
              {
                icon: <SiFreecodecamp size={16} />,
                label: "freeCodeCamp",
                value: freeCodeCampCerts.length,
                color: "#0A0A23",
              },
              {
                icon: <RiTrophyLine size={16} />,
                label: "Total Hours",
                value: `${fccTotalHours}+`,
                color: "#2563EB",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-black/[0.06] p-4 text-center"
                style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{
                    backgroundColor: `${stat.color}10`,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-primary tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] text-text-tertiary font-semibold tracking-wide uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Bottom divider */}
          <motion.div
            className="mt-12 h-px"
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

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
}
