import React from "react";
import { motion } from "framer-motion";
import {
  RiGithubLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiHeartFill,
  RiArrowUpLine,
} from "react-icons/ri";
import { SiHackerrank } from "react-icons/si";
import { PERSONAL, SOCIAL, NAV_LINKS } from "@lib/constants";
import { scrollToSection } from "@lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.08]" />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-main relative py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <div className="font-bold text-white tracking-tight">
                  {PERSONAL.name}
                </div>
                <div className="text-xs text-white/40 font-medium tracking-wide">
                  {PERSONAL.role}
                </div>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Building scalable, production-ready full-stack applications with
              the MERN stack. Based in Indore, open to exciting opportunities.
            </p>

            <div className="flex items-center gap-2 mt-7">
              {[
                {
                  icon: <RiGithubLine size={16} />,
                  href: SOCIAL.github,
                  label: "GitHub",
                },
                {
                  icon: <RiLinkedinBoxLine size={16} />,
                  href: SOCIAL.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: <SiHackerrank size={14} />,
                  href: SOCIAL.hackerrank,
                  label: "HackerRank",
                },
                {
                  icon: <RiMailLine size={16} />,
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
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.09] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-250"
                  whileHover={{ scale: 1.08, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-white/30 tracking-[0.12em] uppercase mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold text-white/30 tracking-[0.12em] uppercase mb-5">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  <RiMailLine size={14} className="text-white/40" />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-medium mb-0.5">
                    Email
                  </div>
                  <div className="text-sm text-white/60 group-hover:text-white transition-colors duration-200">
                    {PERSONAL.email}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white/40 text-xs">📍</span>
                </div>
                <div>
                  <div className="text-xs text-white/30 font-medium mb-0.5">
                    Location
                  </div>
                  <div className="text-sm text-white/60">
                    {PERSONAL.location}
                  </div>
                </div>
              </div>

              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 tracking-wide">
                  Open to Work
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 border-t border-white/[0.07]">
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            © {currentYear} {PERSONAL.name}. Crafted with
            <RiHeartFill size={11} className="text-accent" />
            in Indore, India
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-white/20 hidden sm:inline">
              MERN · React · Node.js · MongoDB
            </span>

            <motion.button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <RiArrowUpLine size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
