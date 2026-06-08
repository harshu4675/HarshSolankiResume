import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMailLine,
  RiMailUnreadLine,
  RiStarLine,
  RiArrowRightUpLine,
  RiTimeLine,
  RiCalendarLine,
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiInboxLine,
  RiBarChart2Line,
} from "react-icons/ri";
import toast from "react-hot-toast";
import { dashboardApi, messagesApi } from "../lib/adminApi";
import { useAuth } from "../hooks/useAuth";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STAT CARD COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StatCard({ icon, label, value, change, color, link, delay = 0 }) {
  const Wrapper = link ? Link : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Wrapper
        to={link}
        className={`block bg-white rounded-2xl border border-black/[0.06] p-5 group transition-all duration-300 ${
          link
            ? "hover:shadow-elevation-4 hover:-translate-y-0.5 cursor-pointer"
            : ""
        }`}
        style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
      >
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${color}12` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>

          {link && (
            <div className="w-7 h-7 rounded-lg bg-black/[0.04] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <RiArrowRightUpLine size={13} className="text-text-tertiary" />
            </div>
          )}
        </div>

        <div className="text-3xl font-extrabold text-primary tracking-tight tabular-nums mb-1">
          {value}
        </div>
        <div className="text-xs text-text-tertiary font-medium">{label}</div>

        {change !== undefined && (
          <div className="mt-3 pt-3 border-t border-black/[0.04] flex items-center gap-1.5">
            <div
              className={`flex items-center gap-1 text-[11px] font-bold ${
                change > 0
                  ? "text-emerald-600"
                  : change < 0
                    ? "text-red-500"
                    : "text-text-tertiary"
              }`}
            >
              {change > 0 && "↑"} {change < 0 && "↓"} {Math.abs(change)}
            </div>
            <span className="text-[11px] text-text-tertiary">this week</span>
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RECENT MESSAGE ITEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function RecentMessageItem({ message, index }) {
  const isUnread = message.status === "unread";
  const timeAgo = (() => {
    const diff = Date.now() - new Date(message.createdAt).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(message.createdAt).toLocaleDateString();
  })();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/admin/inbox/${message._id}`} className="block group">
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl hover:bg-black/[0.02] transition-colors duration-200 -mx-2">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-indigo flex items-center justify-center text-white text-sm font-bold">
              {message.name?.[0]?.toUpperCase() || "?"}
            </div>
            {isUnread && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span
                className={`text-sm tracking-tight truncate ${isUnread ? "font-bold text-primary" : "font-semibold text-text-secondary"}`}
              >
                {message.name}
              </span>
              <span className="text-[10px] text-text-quaternary font-medium shrink-0">
                {timeAgo}
              </span>
            </div>
            <p className="text-xs text-text-tertiary truncate font-medium">
              {message.subject}
            </p>
          </div>

          {/* Arrow on hover */}
          <RiArrowRightLine
            size={14}
            className="text-text-quaternary opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1.5 shrink-0"
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN DASHBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function AdminDashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await dashboardApi.getStats();
        if (data.success) {
          setStats(data.data.stats);
          setRecentMessages(data.data.recentMessages || []);
        }
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-36 bg-white rounded-2xl border border-black/[0.06] animate-pulse"
            />
          ))}
        </div>
        <div className="h-96 bg-white rounded-2xl border border-black/[0.06] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ━━━ Welcome Card ━━━ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-dark rounded-2xl overflow-hidden text-white p-6 md:p-8"
        style={{ boxShadow: "0 8px 32px rgba(15,15,18,0.15)" }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient orbs */}
        <div
          className="absolute top-0 right-0 w-80 h-80 opacity-20"
          style={{
            background: "radial-gradient(circle, #5B5FC7, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-60 h-60 opacity-15"
          style={{
            background: "radial-gradient(circle, #E94B3C, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wide">
                Admin Console Online
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Welcome back,{" "}
              <span
                className="text-gradient-accent"
                style={{
                  background: "linear-gradient(135deg, #F26B5E, #E94B3C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {admin?.name?.split(" ")[0]}
              </span>{" "}
              👋
            </h2>
            <p className="text-sm text-white/60 max-w-lg leading-relaxed">
              You have{" "}
              <strong className="text-white">
                {stats?.unreadMessages || 0} unread
              </strong>{" "}
              messages and{" "}
              <strong className="text-white">
                {stats?.last7Days || 0} new submissions
              </strong>{" "}
              this week.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/inbox?status=unread"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-primary text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-elevation-3"
            >
              <RiMailUnreadLine size={15} />
              View Inbox
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ━━━ Stats Grid ━━━ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<RiMailLine size={20} />}
          label="Total Messages"
          value={stats?.totalMessages || 0}
          color="#5B5FC7"
          link="/admin/inbox"
          delay={0.05}
        />
        <StatCard
          icon={<RiMailUnreadLine size={20} />}
          label="Unread Messages"
          value={stats?.unreadMessages || 0}
          color="#E94B3C"
          link="/admin/inbox?status=unread"
          delay={0.1}
        />
        <StatCard
          icon={<RiStarLine size={20} />}
          label="Starred"
          value={stats?.starredMessages || 0}
          color="#B45309"
          link="/admin/inbox?starred=true"
          delay={0.15}
        />
        <StatCard
          icon={<RiBarChart2Line size={20} />}
          label="Last 7 Days"
          value={stats?.last7Days || 0}
          color="#0F766E"
          delay={0.2}
        />
      </div>

      {/* ━━━ Recent Messages + Quick Stats ━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-black/[0.06] overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
        >
          <div className="px-6 py-5 border-b border-black/[0.05] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">
                Recent Messages
              </h3>
              <p className="text-xs text-text-tertiary mt-0.5">
                Latest 5 submissions
              </p>
            </div>
            <Link
              to="/admin/inbox"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition-colors duration-200"
            >
              View All
              <RiArrowRightLine size={12} />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center mx-auto mb-3">
                <RiInboxLine size={24} className="text-text-quaternary" />
              </div>
              <p className="text-sm font-semibold text-primary mb-1">
                No messages yet
              </p>
              <p className="text-xs text-text-tertiary">
                Messages from your contact form will appear here
              </p>
            </div>
          ) : (
            <div className="p-3">
              {recentMessages.map((message, index) => (
                <RecentMessageItem
                  key={message._id}
                  message={message}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="space-y-4"
        >
          {/* This Month Card */}
          <div
            className="bg-white rounded-2xl border border-black/[0.06] p-5"
            style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-indigo/10 flex items-center justify-center">
                <RiCalendarLine size={14} className="text-accent-indigo" />
              </div>
              <h3 className="text-sm font-bold text-primary tracking-tight">
                This Month
              </h3>
            </div>

            <div className="text-3xl font-extrabold text-primary tracking-tight mb-1">
              {stats?.last30Days || 0}
            </div>
            <p className="text-xs text-text-tertiary mb-4">Messages received</p>

            {stats?.last30Days > 0 && (
              <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((stats.last30Days / 30) * 100, 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-accent-indigo to-indigo-light rounded-full"
                />
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
              <span className="text-text-tertiary font-medium">
                Daily Average
              </span>
              <span className="font-bold text-primary tabular-nums">
                {((stats?.last30Days || 0) / 30).toFixed(1)}
              </span>
            </div>
          </div>

          {/* Quick Action Card */}
          <div
            className="bg-white rounded-2xl border border-black/[0.06] p-5 relative overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
          >
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, #E94B3C, transparent)",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <RiCheckboxCircleLine size={16} className="text-emerald-500" />
                <h3 className="text-sm font-bold text-primary tracking-tight">
                  System Status
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "API Server", status: "Online" },
                  { label: "Database", status: "Connected" },
                  { label: "Email Service", status: "Active" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-text-tertiary font-medium">
                      {item.label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
