import React from "react";
import { motion } from "framer-motion";
import {
  RiCodeSSlashLine,
  RiServerLine,
  RiRocketLine,
  RiLightbulbLine,
  RiTeamLine,
  RiArrowRightLine,
  RiCheckLine,
} from "react-icons/ri";
import SectionHeader from "@components/common/SectionHeader";
import ScrollReveal from "@components/common/ScrollReveal";
import Card from "@components/ui/Card";
import TiltCard from "@components/3d/TiltCard";
import { METRICS } from "@lib/constants";
import { gridContainerVariants, gridItemVariants } from "@lib/animations";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// METRIC CARD - DIRECT VALUE DISPLAY (NO ANIMATION DEPENDENCY)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function MetricCard({ metric }) {
  return (
    <TiltCard intensity={3} scale={1.01} glare={false}>
      <div
        className="bg-white rounded-2xl border border-black/[0.06] p-6 text-center h-full"
        style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
      >
        <div className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-1">
          <span>
            {metric.value}
            {metric.suffix}
          </span>
        </div>
        <div className="text-sm font-semibold text-primary/80 mb-0.5">
          {metric.label}
        </div>
        <div className="text-xs text-text-tertiary font-medium">
          {metric.description}
        </div>
      </div>
    </TiltCard>
  );
}

function ValueCard({ icon, title, description, color }) {
  return (
    <motion.div variants={gridItemVariants}>
      <Card className="h-full group" hover>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${color}10`,
            color: color,
          }}
        >
          {icon}
        </div>
        <h4 className="text-sm font-bold text-primary tracking-tight mb-1.5">
          {title}
        </h4>
        <p className="text-xs text-text-tertiary leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}

export default function About() {
  const VALUES = [
    {
      icon: <RiCodeSSlashLine size={20} />,
      title: "Clean Code",
      description:
        "Writing maintainable, well-documented code following best practices.",
      color: "#E94B3C",
    },
    {
      icon: <RiServerLine size={20} />,
      title: "Full-Stack Thinking",
      description:
        "Understanding every layer — from database to pixel-perfect UI.",
      color: "#5B5FC7",
    },
    {
      icon: <RiRocketLine size={20} />,
      title: "Production Ready",
      description:
        "Building apps with auth, security, and optimization baked in.",
      color: "#0F766E",
    },
    {
      icon: <RiLightbulbLine size={20} />,
      title: "Problem Solver",
      description:
        "Breaking down complex problems into elegant, scalable solutions.",
      color: "#7C3AED",
    },
  ];

  const HIGHLIGHTS = [
    "Built 20+ complete production-ready web applications independently",
    "Implemented real-time communication systems with Socket.io",
    "Integrated payment gateways (Razorpay) in e-commerce platforms",
    "Designed and built RESTful APIs with JWT authentication",
    "Developed Progressive Web Apps with offline support",
    "Managed complete project lifecycle — from idea to deployment",
  ];

  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="container-main relative z-10">
        <SectionHeader
          label="About Me"
          title="Full Stack Developer with Real-World Experience"
          description="I don't just write code — I build complete applications from the ground up, handling everything from database design to polished user interfaces."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Story */}
          <ScrollReveal className="lg:col-span-7">
            <div className="space-y-5">
              <Card padding="lg" hover={false}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <RiTeamLine size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary tracking-tight">
                      My Journey
                    </h3>
                    <p className="text-xs text-text-tertiary">
                      From student to developer
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                  <p>
                    I'm a Full Stack MERN Developer based in{" "}
                    <span className="text-primary font-semibold">
                      Indore, India
                    </span>
                    , with a{" "}
                    <span className="text-primary font-semibold">
                      B.Tech in Computer Science Engineering
                    </span>{" "}
                    from IPS Academy.
                  </p>
                  <p>
                    During my{" "}
                    <span className="text-primary font-semibold">
                      3-month internship at Kodrish Innovation
                    </span>
                    , I worked on real-world production systems that gave me
                    hands-on experience across the complete development
                    lifecycle — from database schema design to frontend
                    component architecture.
                  </p>
                  <p>
                    Beyond the internship, I independently built complete web
                    applications including{" "}
                    <span className="text-accent font-semibold">
                      real-time chat apps
                    </span>
                    ,{" "}
                    <span className="text-accent font-semibold">
                      e-commerce platforms
                    </span>
                    , and{" "}
                    <span className="text-accent font-semibold">
                      content management systems
                    </span>{" "}
                    — each with authentication, admin dashboards, and
                    production-ready infrastructure.
                  </p>
                </div>
              </Card>

              <Card padding="lg" hover={false}>
                <h4 className="text-sm font-bold text-primary tracking-tight mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Key Highlights
                </h4>
                <ul className="space-y-2.5">
                  {HIGHLIGHTS.map((highlight, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                    >
                      <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <RiCheckLine size={11} className="text-emerald-600" />
                      </div>
                      <span className="leading-relaxed">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </div>
          </ScrollReveal>

          {/* Values */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.15}>
              <p className="text-xs font-semibold text-text-quaternary tracking-[0.12em] uppercase mb-5">
                What I Bring
              </p>
            </ScrollReveal>

            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3"
            >
              {VALUES.map((value) => (
                <ValueCard key={value.title} {...value} />
              ))}
            </motion.div>

            <ScrollReveal delay={0.4}>
              <motion.button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark group transition-colors duration-200"
                whileHover={{ x: 4 }}
              >
                See what I've built
                <RiArrowRightLine
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </motion.button>
            </ScrollReveal>
          </div>
        </div>

        {/* ━━━ METRICS - DIRECT DISPLAY (NO ANIMATION DEPENDENCY) ━━━ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
