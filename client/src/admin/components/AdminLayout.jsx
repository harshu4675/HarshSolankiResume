import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { messagesApi } from "../lib/adminApi";

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const { data } = await messagesApi.getAll({
          status: "unread",
          limit: 1,
        });
        if (data.success && data.stats) {
          setUnreadCount(data.stats.unread || 0);
        }
      } catch (error) {
        console.error("Failed to fetch unread count:", error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-mesh-admin">
      <AnimatePresence>
        <AdminSidebar
          unreadCount={unreadCount}
          isMobileOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </AnimatePresence>

      {/* Main content area */}
      <div className="lg:pl-64">
        <AdminTopbar
          onMenuClick={() => setIsMobileMenuOpen(true)}
          unreadCount={unreadCount}
        />

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
