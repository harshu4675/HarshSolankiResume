import React from "react";
import { motion } from "framer-motion";
import {
  RiUser3Line,
  RiMailLine,
  RiShieldKeyholeLine,
  RiCalendarLine,
  RiTimeLine,
  RiCheckboxCircleFill,
  RiInformationLine,
  RiLogoutBoxRLine,
  RiDatabase2Line,
  RiServerLine,
  RiCloudLine,
} from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";

function InfoCard({ icon, label, value, color = "#5B5FC7" }) {
  return (
    <div
      className="bg-white rounded-xl border border-black/[0.06] p-4"
      style={{ boxShadow: "0 1px 2px rgba(15,15,18,0.03)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}12` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-0.5">
            {label}
          </p>
          <p className="text-sm font-bold text-primary tracking-tight truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const { admin, logout } = useAuth();

  const accountCreated = admin?.createdAt
    ? new Date(admin.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const lastLogin = admin?.lastLogin
    ? new Date(admin.lastLogin).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "—";

  return (
    <div className="space-y-5 max-w-4xl">
      {/* ━━━ Profile Card ━━━ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden"
        style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.05)" }}
      >
        {/* Header background */}
        <div className="h-24 bg-gradient-dark relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute top-0 right-0 w-60 h-60 opacity-20"
            style={{
              background: "radial-gradient(circle, #5B5FC7, transparent 60%)",
            }}
          />
        </div>

        {/* Avatar + Info */}
        <div className="px-6 pb-6 relative">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-accent border-4 border-white flex items-center justify-center text-white text-2xl font-bold shadow-elevation-4">
              {admin?.name?.[0] || "A"}
            </div>

            <div className="flex-1 pb-2">
              <h2 className="text-xl font-bold text-primary tracking-tight mb-0.5">
                {admin?.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-tertiary">
                  {admin?.email}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-indigo/10 border border-accent-indigo/20 text-[10px] font-bold tracking-wide uppercase text-accent-indigo">
                  {admin?.role}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <RiCheckboxCircleFill size={12} className="text-emerald-600" />
              <span className="text-[11px] font-semibold text-emerald-700">
                Active
              </span>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <InfoCard
              icon={<RiUser3Line size={16} />}
              label="Full Name"
              value={admin?.name || "—"}
              color="#E94B3C"
            />
            <InfoCard
              icon={<RiMailLine size={16} />}
              label="Email Address"
              value={admin?.email || "—"}
              color="#5B5FC7"
            />
            <InfoCard
              icon={<RiCalendarLine size={16} />}
              label="Account Created"
              value={accountCreated}
              color="#0F766E"
            />
            <InfoCard
              icon={<RiTimeLine size={16} />}
              label="Last Login"
              value={lastLogin}
              color="#B45309"
            />
          </div>
        </div>
      </motion.div>

      {/* ━━━ Security Notice ━━━ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl border border-black/[0.06] p-5"
        style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.05)" }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 flex items-center justify-center shrink-0">
            <RiShieldKeyholeLine size={18} className="text-accent-indigo" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary tracking-tight">
              Security & Privacy
            </h3>
            <p className="text-xs text-text-tertiary mt-0.5">
              Authentication and data security measures
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            {
              label: "JWT Token Authentication",
              status: "Enabled",
              icon: <RiShieldKeyholeLine size={13} />,
            },
            {
              label: "Password Hashing (bcrypt)",
              status: "Active",
              icon: <RiCheckboxCircleFill size={13} />,
            },
            {
              label: "Rate Limiting on Auth",
              status: "10 attempts / 15min",
              icon: <RiServerLine size={13} />,
            },
            {
              label: "Database Encryption",
              status: "MongoDB Atlas",
              icon: <RiDatabase2Line size={13} />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.04]"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-text-tertiary">{item.icon}</span>
                <span className="text-xs font-medium text-text-secondary">
                  {item.label}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ━━━ System Info ━━━ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white rounded-2xl border border-black/[0.06] p-5"
        style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.05)" }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#B4530912" }}
          >
            <RiInformationLine size={18} style={{ color: "#B45309" }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary tracking-tight">
              System Information
            </h3>
            <p className="text-xs text-text-tertiary mt-0.5">
              Application configuration & version
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { label: "Application", value: "Portfolio CMS v1.0" },
            { label: "Frontend", value: "React 18 + Vite" },
            { label: "Backend", value: "Node.js + Express" },
            { label: "Database", value: "MongoDB" },
            { label: "Hosting", value: "Vercel + Render" },
            {
              label: "Environment",
              value:
                import.meta.env.MODE === "production"
                  ? "Production"
                  : "Development",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.04]"
            >
              <span className="text-xs font-medium text-text-tertiary">
                {item.label}
              </span>
              <span className="text-xs font-semibold text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ━━━ Sign Out ━━━ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border border-red-200 p-5"
        style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.05)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-primary tracking-tight mb-1">
              Sign Out
            </h3>
            <p className="text-xs text-text-tertiary">
              Sign out of your admin account on this device
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to sign out?")) {
                logout();
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-elevation-2"
          >
            <RiLogoutBoxRLine size={15} />
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
