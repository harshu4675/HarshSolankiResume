import React from "react";
import { motion } from "framer-motion";
import {
  RiMenuLine,
  RiNotification3Line,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PAGE_TITLES = {
  "/admin": {
    title: "Dashboard",
    subtitle: "Welcome back, here's what's happening",
  },
  "/admin/inbox": { title: "Inbox", subtitle: "Manage your contact messages" },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Manage your admin account",
  },
};

export default function AdminTopbar({ onMenuClick, unreadCount = 0 }) {
  const location = useLocation();
  const { admin } = useAuth();

  // Get page info
  let pageInfo = PAGE_TITLES[location.pathname] || {
    title: "Admin",
    subtitle: "",
  };

  // Handle dynamic routes like /admin/inbox/:id
  if (
    location.pathname.startsWith("/admin/inbox/") &&
    location.pathname !== "/admin/inbox"
  ) {
    pageInfo = {
      title: "Message Details",
      subtitle: "Read and manage this message",
    };
  }

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-xl border-b border-black/[0.05]">
      <div className="px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile menu + Page Title */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={onMenuClick}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-primary hover:bg-black/[0.05] transition-colors"
            >
              <RiMenuLine size={18} />
            </button>

            <div className="min-w-0">
              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-text-quaternary font-medium mb-0.5">
                <span>Admin</span>
                <RiArrowRightSLine size={12} />
                <span className="text-text-tertiary">{pageInfo.title}</span>
              </div>

              <motion.h1
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg md:text-xl font-bold text-primary tracking-tight truncate"
              >
                {pageInfo.title}
              </motion.h1>
              {pageInfo.subtitle && (
                <motion.p
                  key={`${location.pathname}-sub`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs text-text-tertiary hidden sm:block"
                >
                  {pageInfo.subtitle}
                </motion.p>
              )}
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-3">
            {/* Greeting */}
            <div className="hidden md:flex flex-col items-end mr-1">
              <span className="text-xs text-text-tertiary font-medium">
                {getGreeting()},
              </span>
              <span className="text-xs font-bold text-primary tracking-tight">
                {admin?.name?.split(" ")[0]}
              </span>
            </div>

            {/* Notification button */}
            <button
              onClick={() =>
                (window.location.href = "/admin/inbox?status=unread")
              }
              className="relative w-9 h-9 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-text-tertiary hover:text-primary hover:border-black/[0.15] transition-all duration-200"
            >
              <RiNotification3Line size={16} />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </button>

            {/* Profile avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-sm font-bold shadow-elevation-1">
              {admin?.name?.[0] || "A"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
