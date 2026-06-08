import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSearchLine,
  RiFilterLine,
  RiMailLine,
  RiMailUnreadLine,
  RiStarLine,
  RiStarFill,
  RiArchiveLine,
  RiCheckLine,
  RiInboxLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiRefreshLine,
  RiCloseLine,
} from "react-icons/ri";
import toast from "react-hot-toast";
import { messagesApi } from "../lib/adminApi";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MESSAGE ROW COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function MessageRow({ message, index, onStar, onArchive }) {
  const isUnread = message.status === "unread";

  const timeAgo = (() => {
    const diff = Date.now() - new Date(message.createdAt).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return new Date(message.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  })();

  const STATUS_COLORS = {
    unread: { bg: "bg-accent", text: "text-white" },
    read: { bg: "bg-surface-3", text: "text-text-tertiary" },
    replied: { bg: "bg-emerald-100", text: "text-emerald-700" },
    archived: { bg: "bg-amber-100", text: "text-amber-700" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group"
    >
      <Link
        to={`/admin/inbox/${message._id}`}
        className={`
          block px-5 py-4 border-b border-black/[0.04] transition-all duration-200
          ${isUnread ? "bg-accent-indigo/[0.02]" : "bg-white"}
          hover:bg-black/[0.02]
        `}
      >
        <div className="flex items-start gap-3">
          {/* Star button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onStar(message._id, !message.isStarred);
            }}
            className="shrink-0 mt-0.5 text-text-quaternary hover:text-amber-500 transition-colors"
            aria-label="Star"
          >
            {message.isStarred ? (
              <RiStarFill size={16} className="text-amber-500" />
            ) : (
              <RiStarLine size={16} />
            )}
          </button>

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
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span
                  className={`text-sm tracking-tight truncate ${isUnread ? "font-bold text-primary" : "font-semibold text-text-secondary"}`}
                >
                  {message.name}
                </span>
                <span className="hidden sm:inline text-[11px] text-text-quaternary font-medium truncate">
                  · {message.email}
                </span>
              </div>
              <span className="text-[11px] text-text-quaternary font-medium shrink-0 tabular-nums">
                {timeAgo}
              </span>
            </div>

            <p
              className={`text-sm truncate mb-1 ${isUnread ? "font-semibold text-primary" : "font-medium text-text-secondary"}`}
            >
              {message.subject}
            </p>

            <p className="text-xs text-text-tertiary truncate">
              {message.message?.substring(0, 100)}
              {message.message?.length > 100 ? "..." : ""}
            </p>

            {/* Status badge */}
            {message.status !== "read" && (
              <div
                className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase border"
                style={{
                  backgroundColor:
                    message.status === "unread"
                      ? "#E94B3C"
                      : message.status === "replied"
                        ? "#10B981"
                        : "#B45309",
                  color: "white",
                  borderColor: "transparent",
                }}
              >
                {message.status}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN INBOX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function AdminInbox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [stats, setStats] = useState({ unread: 0, total: 0, starred: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ━━━ Get filters from URL ━━━
  const currentStatus = searchParams.get("status") || "";
  const currentStarred = searchParams.get("starred") === "true";
  const currentPage = parseInt(searchParams.get("page") || "1");

  // ━━━ Fetch messages ━━━
  const fetchMessages = useCallback(
    async (showRefresh = false) => {
      if (showRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      try {
        const params = {
          page: currentPage,
          limit: 15,
        };
        if (currentStatus) params.status = currentStatus;
        if (currentStarred) params.starred = "true";
        if (search) params.search = search;

        const { data } = await messagesApi.getAll(params);

        if (data.success) {
          setMessages(data.data);
          setPagination(data.pagination);
          setStats(data.stats);
        }
      } catch (error) {
        toast.error("Failed to load messages");
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [currentStatus, currentStarred, currentPage, search],
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // ━━━ Filter handlers ━━━
  const setFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === "" || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
    newParams.set("page", "1"); // Reset to page 1
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search) newParams.set("search", search);
    else newParams.delete("search");
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const clearSearch = () => {
    setSearch("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  // ━━━ Action handlers ━━━
  const handleStar = async (id, isStarred) => {
    try {
      await messagesApi.update(id, { isStarred });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isStarred } : m)),
      );
      toast.success(isStarred ? "Message starred" : "Star removed");
    } catch (error) {
      toast.error("Failed to update message");
    }
  };

  const FILTERS = [
    {
      key: "",
      label: "All",
      icon: <RiMailLine size={14} />,
      count: stats.total,
    },
    {
      key: "unread",
      label: "Unread",
      icon: <RiMailUnreadLine size={14} />,
      count: stats.unread,
    },
    {
      key: "starred",
      label: "Starred",
      icon: <RiStarLine size={14} />,
      count: stats.starred,
      isStarred: true,
    },
    { key: "replied", label: "Replied", icon: <RiCheckLine size={14} /> },
    { key: "archived", label: "Archived", icon: <RiArchiveLine size={14} /> },
  ];

  return (
    <div className="space-y-5">
      {/* ━━━ Filter Bar ━━━ */}
      <div
        className="bg-white rounded-2xl border border-black/[0.06] p-4"
        style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-quaternary">
                <RiSearchLine size={16} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or subject..."
                className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-surface-2 border border-black/[0.06] text-sm text-primary placeholder:text-text-quaternary focus:outline-none focus:ring-2 focus:ring-accent-indigo/20 focus:border-accent-indigo/40 focus:bg-white transition-all duration-250"
              />
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center text-text-quaternary hover:text-primary hover:bg-black/[0.05] transition-all"
                >
                  <RiCloseLine size={14} />
                </button>
              )}
            </div>
          </form>

          {/* Refresh */}
          <button
            onClick={() => fetchMessages(true)}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm font-semibold text-text-secondary hover:text-primary hover:border-black/[0.15] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <motion.span
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{
                duration: 0.8,
                repeat: isRefreshing ? Infinity : 0,
                ease: "linear",
              }}
            >
              <RiRefreshLine size={15} />
            </motion.span>
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
          <span className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase shrink-0 mr-1">
            Filter:
          </span>
          {FILTERS.map((filter) => {
            const isActive = filter.isStarred
              ? currentStarred
              : currentStatus === filter.key && !currentStarred;

            return (
              <button
                key={filter.label}
                onClick={() => {
                  if (filter.isStarred) {
                    setFilter("starred", !currentStarred);
                    setFilter("status", "");
                  } else {
                    setFilter("starred", false);
                    setFilter("status", filter.key);
                  }
                }}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0
                  transition-all duration-200 border
                  ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-text-secondary border-black/[0.06] hover:border-black/[0.15] hover:text-primary"
                  }
                `}
              >
                {filter.icon}
                {filter.label}
                {filter.count !== undefined && filter.count > 0 && (
                  <span
                    className={`
                    px-1.5 py-0.5 rounded-md text-[10px] font-bold tabular-nums
                    ${isActive ? "bg-white/20" : "bg-black/[0.05]"}
                  `}
                  >
                    {filter.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ━━━ Messages List ━━━ */}
      <div
        className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden"
        style={{ boxShadow: "0 1px 3px rgba(15,15,18,0.04)" }}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex items-center justify-between bg-surface-2/40">
          <div className="flex items-center gap-2">
            <RiInboxLine size={15} className="text-text-tertiary" />
            <span className="text-xs font-semibold text-text-secondary tracking-tight">
              {pagination.total}{" "}
              {pagination.total === 1 ? "Message" : "Messages"}
              {search && ` matching "${search}"`}
            </span>
          </div>
          <span className="text-[11px] text-text-quaternary font-medium">
            Page {pagination.page} of {pagination.pages || 1}
          </span>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="p-5 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="w-9 h-9 rounded-xl bg-surface-3" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-surface-3 rounded w-1/3" />
                  <div className="h-3 bg-surface-3 rounded w-2/3" />
                  <div className="h-2 bg-surface-3 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-2 flex items-center justify-center mx-auto mb-4">
              <RiInboxLine size={28} className="text-text-quaternary" />
            </div>
            <p className="text-base font-semibold text-primary mb-1">
              No messages found
            </p>
            <p className="text-sm text-text-tertiary max-w-sm mx-auto">
              {search
                ? "Try adjusting your search or filters"
                : currentStatus || currentStarred
                  ? "No messages match this filter"
                  : "Messages from your contact form will appear here"}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageRow
                key={message._id}
                message={message}
                index={index}
                onStar={handleStar}
              />
            ))}
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!isLoading && pagination.pages > 1 && (
          <div className="px-5 py-4 border-t border-black/[0.05] flex items-center justify-between bg-surface-2/40">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-primary hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            >
              <RiArrowLeftSLine size={14} />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-primary hover:bg-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= pagination.pages}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-primary hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            >
              Next
              <RiArrowRightSLine size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
