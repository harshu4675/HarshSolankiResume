import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiDashboardLine,
  RiMailLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiShieldKeyholeLine,
  RiHome2Line,
  RiCloseLine,
} from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin", icon: <RiDashboardLine size={17} /> },
  { label: "Inbox", path: "/admin/inbox", icon: <RiMailLine size={17} /> },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: <RiSettings3Line size={17} />,
  },
];

export default function AdminSidebar({
  unreadCount = 0,
  isMobileOpen,
  onClose,
}) {
  const location = useLocation();
  const { admin, logout } = useAuth();

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      {/* Logo / Brand */}
      <div className="px-6 py-6 border-b border-black/[0.05]">
        <div className="flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-dark flex items-center justify-center shadow-elevation-2">
              <RiShieldKeyholeLine size={17} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-primary tracking-tight leading-none">
                Admin Panel
              </div>
              <div className="text-[10px] text-text-tertiary font-medium tracking-wide mt-0.5 leading-none">
                Portfolio CMS
              </div>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:text-primary hover:bg-black/[0.05] transition-colors"
          >
            <RiCloseLine size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold text-text-quaternary tracking-[0.12em] uppercase">
          Main
        </p>

        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            const showBadge = item.label === "Inbox" && unreadCount > 0;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  relative flex items-center justify-between px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200 group
                  ${
                    active
                      ? "bg-primary text-white shadow-elevation-2"
                      : "text-text-secondary hover:text-primary hover:bg-black/[0.04]"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      active
                        ? "text-white"
                        : "text-text-tertiary group-hover:text-primary"
                    }
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </div>

                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`
                      inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md
                      text-[10px] font-bold tabular-nums
                      ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-accent/15 text-accent border border-accent/20"
                      }
                    `}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick links */}
        <p className="px-3 mt-6 mb-2 text-[10px] font-semibold text-text-quaternary tracking-[0.12em] uppercase">
          Quick Links
        </p>
        <div className="space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:bg-black/[0.04] transition-all duration-200 group"
          >
            <RiHome2Line
              size={17}
              className="text-text-tertiary group-hover:text-primary"
            />
            View Portfolio
          </a>
        </div>
      </nav>

      {/* Admin profile */}
      <div className="p-3 border-t border-black/[0.05]">
        <div className="p-3 rounded-xl bg-surface-2 border border-black/[0.04]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0 text-white text-sm font-bold">
              {admin?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-primary tracking-tight truncate">
                {admin?.name || "Admin"}
              </div>
              <div className="text-[10px] text-text-tertiary truncate">
                {admin?.email}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white border border-black/[0.06] text-xs font-semibold text-text-secondary hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
          >
            <RiLogoutBoxRLine size={13} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-black/[0.05] z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-64 flex flex-col bg-white z-50"
            style={{ boxShadow: "24px 0 64px rgba(15,15,18,0.15)" }}
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </>
  );
}
