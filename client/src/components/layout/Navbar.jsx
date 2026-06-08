import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  RiMenuLine,
  RiCloseLine,
  RiDownloadLine,
  RiGithubLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";
import { SiHackerrank } from "react-icons/si";
import { NAV_LINKS, PERSONAL, SOCIAL } from "@lib/constants";
import { scrollToSection } from "@lib/utils";
import Button from "@components/ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((href) => {
    const id = href.replace("#", "");
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <motion.div
          animate={{
            backgroundColor: isScrolled
              ? "rgba(250, 250, 247, 0.92)"
              : "rgba(250, 250, 247, 0)",
            boxShadow: isScrolled
              ? "0 1px 0 rgba(10,10,10,0.06), 0 2px 16px rgba(10,10,10,0.04)"
              : "0 0 0 rgba(10,10,10,0)",
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full"
        >
          <div className="container-main">
            <div className="flex items-center justify-between h-16 lg:h-[68px]">
              {/* Logo */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm tracking-tight">
                    H
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-primary tracking-tight leading-none">
                    Harsh Solanki
                  </span>
                  <span className="text-[10px] text-text-tertiary font-medium tracking-wide mt-0.5 leading-none">
                    MERN Developer
                  </span>
                </div>
              </motion.button>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className={`
                        relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200
                        ${isActive ? "text-primary" : "text-text-tertiary hover:text-primary"}
                      `}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 bg-black/[0.05] rounded-xl"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 40,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-1 mr-1">
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
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:text-primary hover:bg-black/[0.05] transition-all duration-200"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                      title={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 tracking-wide">
                    Open to Work
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  icon={<RiDownloadLine size={14} />}
                  href="/assets/Harsh_Solanki_Resume.pdf"
                  target="_blank"
                >
                  Resume
                </Button>
              </div>

              {/* Mobile Toggle */}
              <motion.button
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-primary hover:bg-black/[0.05] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RiCloseLine size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RiMenuLine size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-background z-50 lg:hidden"
              style={{ boxShadow: "-24px 0 64px rgba(10,10,10,0.12)" }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.07]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-xs">H</span>
                  </div>
                  <span className="font-bold text-sm text-primary tracking-tight">
                    Harsh Solanki
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:text-primary hover:bg-black/[0.05] transition-colors"
                >
                  <RiCloseLine size={18} />
                </button>
              </div>

              <nav className="p-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-primary/70 hover:text-primary hover:bg-black/[0.04] rounded-xl transition-all duration-200 text-left"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-black/[0.07]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-emerald-700">
                    Open to Work
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    {
                      icon: <RiGithubLine size={14} />,
                      href: SOCIAL.github,
                      label: "GitHub",
                    },
                    {
                      icon: <RiLinkedinBoxLine size={14} />,
                      href: SOCIAL.linkedin,
                      label: "LinkedIn",
                    },
                    {
                      icon: <SiHackerrank size={12} />,
                      href: SOCIAL.hackerrank,
                      label: "HackerRank",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl bg-black/[0.04] text-xs font-medium text-primary/70 hover:text-primary hover:bg-black/[0.08] transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                <a
                  href="/assets/Harsh_Solanki_Resume.pdf"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-sm font-semibold rounded-xl"
                >
                  <RiDownloadLine size={15} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
