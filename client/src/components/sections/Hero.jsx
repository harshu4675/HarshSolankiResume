import React from "react";
import { motion } from "framer-motion";
import {
  RiArrowDownLine,
  RiGithubLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiDownloadLine,
  RiEyeLine,
  RiSparklingLine,
} from "react-icons/ri";
import { SiHackerrank } from "react-icons/si";
import ProfileCard from "@components/3d/ProfileCard";
import FloatingElements from "@components/3d/FloatingElements";
import Badge from "@components/ui/Badge";
import Button from "@components/ui/Button";
import { PERSONAL, SOCIAL } from "@lib/constants";
import { scrollToSection } from "@lib/utils";
import {
  heroTextVariants,
  containerVariants,
  fadeUpVariant,
} from "@lib/animations";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-mesh"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[30%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #2563EB 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #FF5E57 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating Tech Elements */}
      <FloatingElements />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,10,10,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ─── LEFT: Text Content ─────────────────────────── */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badges */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <Badge variant="accent" size="sm" dot dotColor="bg-emerald-500">
                Open to Work
              </Badge>
              <Badge variant="default" size="sm" icon="🎓">
                B.Tech CSE Graduate
              </Badge>
              <Badge variant="default" size="sm" icon="📍">
                Indore, India
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              custom={0.1}
              variants={heroTextVariants}
              className="text-hero text-primary mb-6 text-balance"
            >
              Building{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Full-Stack</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-3 bg-accent/15 rounded-sm -z-0"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.8,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </span>{" "}
              Applications That{" "}
              <span className="text-gradient-accent">Solve Real Problems</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              custom={0.25}
              variants={heroTextVariants}
              className="text-lead max-w-xl mb-8"
            >
              MERN Developer with internship experience at{" "}
              <span className="text-primary font-semibold">
                Kodrish Innovation
              </span>
              . I build scalable real-time apps, e-commerce platforms, and
              production-ready APIs from scratch.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Button
                variant="accent"
                size="lg"
                icon={<RiEyeLine size={17} />}
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>

              <Button
                variant="ghost"
                size="lg"
                icon={<RiDownloadLine size={17} />}
                href="/assets/Harsh_Solanki_Resume.pdf"
                target="_blank"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUpVariant}
              className="flex items-center gap-5"
            >
              <span className="text-xs font-semibold text-text-quaternary tracking-widest uppercase">
                Connect
              </span>
              <div className="w-8 h-px bg-black/10" />
              <div className="flex items-center gap-2">
                {[
                  {
                    icon: <RiGithubLine size={17} />,
                    href: SOCIAL.github,
                    label: "GitHub",
                  },
                  {
                    icon: <RiLinkedinBoxLine size={17} />,
                    href: SOCIAL.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: <SiHackerrank size={15} />,
                    href: SOCIAL.hackerrank,
                    label: "HackerRank",
                  },
                  {
                    icon: <RiMailLine size={17} />,
                    href: SOCIAL.email,
                    label: "Email",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="w-10 h-10 rounded-xl border border-black/[0.07] bg-white/60 backdrop-blur-sm flex items-center justify-center text-text-tertiary hover:text-primary hover:border-black/[0.15] hover:bg-white transition-all duration-250"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats Bar */}
            <motion.div
              variants={fadeUpVariant}
              className="mt-12 flex items-center gap-8 pt-8 border-t border-black/[0.06]"
            >
              {[
                { label: "Projects", value: "20+" },
                { label: "Industry Exp.", value: "3 Mo" },
                { label: "Certifications", value: "6" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-text-quaternary font-medium tracking-wide mt-0.5 uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Profile Card ─────────────────────────── */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
            }}
          >
            <ProfileCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
