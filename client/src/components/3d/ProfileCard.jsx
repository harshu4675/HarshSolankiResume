import React from "react";
import { motion } from "framer-motion";
import {
  RiMapPinLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
} from "react-icons/ri";
import TiltCard from "./TiltCard";
import Badge from "@components/ui/Badge";
import { PERSONAL, SOCIAL } from "@lib/constants";

export default function ProfileCard() {
  return (
    <TiltCard
      intensity={6}
      scale={1.01}
      glare
      borderGlow={false}
      className="w-full max-w-[360px]"
    >
      <div className="relative bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-elevation-5">
        {/* Top gradient bar */}
        <div className="h-24 bg-gradient-to-br from-primary via-primary-soft to-[#2A2A2A] relative overflow-hidden">
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating tech badges */}
          <motion.div
            className="absolute top-3 right-4 px-2 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider border border-white/10"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            MERN
          </motion.div>

          <motion.div
            className="absolute bottom-3 left-4 px-2 py-1 rounded-lg bg-accent/90 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/10"
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            Full Stack
          </motion.div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center -mt-12 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-background border-4 border-white overflow-hidden shadow-elevation-4">
              <div className="w-full h-full bg-gradient-to-br from-primary/8 to-primary/3 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary/40">HS</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm border border-black/[0.05]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="px-6 pt-4 pb-6">
          {/* Name & Role */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-primary tracking-tight">
              {PERSONAL.name}
            </h3>
            <p className="text-sm text-text-tertiary font-medium mt-0.5">
              {PERSONAL.role}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
            <Badge variant="accent" size="xs" dot dotColor="bg-emerald-500">
              Open to Work
            </Badge>
            <Badge variant="default" size="xs" icon="🎓">
              B.Tech Graduate
            </Badge>
          </div>

          {/* Info Grid */}
          <div className="space-y-2.5 mb-5">
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <RiBriefcaseLine size={13} className="text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-text-tertiary text-[10px] font-medium tracking-wide uppercase">
                  Experience
                </span>
                <p className="text-primary text-xs font-semibold truncate">
                  Kodrish Innovation · 3 Months
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <RiGraduationCapLine size={13} className="text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-text-tertiary text-[10px] font-medium tracking-wide uppercase">
                  Education
                </span>
                <p className="text-primary text-xs font-semibold truncate">
                  B.Tech CSE · IPS Academy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <RiMapPinLine size={13} className="text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-text-tertiary text-[10px] font-medium tracking-wide uppercase">
                  Location
                </span>
                <p className="text-primary text-xs font-semibold truncate">
                  Indore, India
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-2.5">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Node.js", "MongoDB", "Express", "Socket.io"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-black/[0.04] text-primary/60 border border-black/[0.05]"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />
      </div>
    </TiltCard>
  );
}
