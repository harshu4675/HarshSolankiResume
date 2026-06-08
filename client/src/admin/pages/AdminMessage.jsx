import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiArrowLeftLine,
  RiMailLine,
  RiPhoneLine,
  RiCalendarLine,
  RiTimeLine,
  RiStarLine,
  RiStarFill,
  RiCheckLine,
  RiArchiveLine,
  RiDeleteBin6Line,
  RiReplyLine,
  RiFileCopyLine,
  RiExternalLinkLine,
} from "react-icons/ri";
import toast from "react-hot-toast";
import { messagesApi } from "../lib/adminApi";
import { useAuth } from "../hooks/useAuth";

export default function AdminMessage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await messagesApi.getOne(id);
        if (data.success) {
          setMessage(data.data);
          setNotes(data.data.notes || "");
        }
      } catch (error) {
        toast.error("Failed to load message");
        navigate("/admin/inbox");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [id, navigate]);

  // ━━━ Action handlers ━━━
  const handleAction = async (updates, successMsg) => {
    setIsUpdating(true);
    try {
      const { data } = await messagesApi.update(id, updates);
      if (data.success) {
        setMessage(data.data);
        toast.success(successMsg);
      }
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this message?"))
      return;

    try {
      await messagesApi.delete(id);
      toast.success("Message deleted");
      navigate("/admin/inbox");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Only superadmin can delete messages");
      } else {
        toast.error("Failed to delete");
      }
    }
  };

  const handleSaveNotes = async () => {
    await handleAction({ notes }, "Notes saved");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(message.email);
    toast.success("Email copied!");
  };

  const handleReply = () => {
    const subject = encodeURIComponent(`Re: ${message.subject}`);
    const body = encodeURIComponent(
      `\n\n---\nOn ${new Date(message.createdAt).toLocaleString()}, ${message.name} <${message.email}> wrote:\n\n${message.message}`,
    );
    window.location.href = `mailto:${message.email}?subject=${subject}&body=${body}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-white rounded-xl border border-black/[0.06] animate-pulse" />
        <div className="h-96 bg-white rounded-2xl border border-black/[0.06] animate-pulse" />
      </div>
    );
  }

  if (!message) return null;

  const formattedDate = new Date(message.createdAt).toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="space-y-5">
      {/* ━━━ Back Button + Actions ━━━ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/admin/inbox"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-black/[0.06] text-sm font-semibold text-text-secondary hover:text-primary hover:border-black/[0.15] transition-all duration-200 w-fit"
        >
          <RiArrowLeftLine size={15} />
          Back to Inbox
        </Link>

        <div className="flex items-center gap-2">
          {/* Star toggle */}
          <button
            onClick={() =>
              handleAction(
                { isStarred: !message.isStarred },
                message.isStarred ? "Star removed" : "Starred",
              )
            }
            disabled={isUpdating}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
              message.isStarred
                ? "bg-amber-50 border-amber-200 text-amber-500"
                : "bg-white border-black/[0.06] text-text-tertiary hover:text-amber-500 hover:border-amber-200"
            }`}
            title={message.isStarred ? "Remove star" : "Add star"}
          >
            {message.isStarred ? (
              <RiStarFill size={16} />
            ) : (
              <RiStarLine size={16} />
            )}
          </button>

          {/* Mark as replied */}
          {message.status !== "replied" && (
            <button
              onClick={() =>
                handleAction({ status: "replied" }, "Marked as replied")
              }
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl bg-white border border-black/[0.06] text-sm font-semibold text-text-secondary hover:text-emerald-600 hover:border-emerald-200 transition-all duration-200 flex items-center gap-1.5"
            >
              <RiCheckLine size={14} />
              Mark Replied
            </button>
          )}

          {/* Archive */}
          {message.status !== "archived" && (
            <button
              onClick={() => handleAction({ status: "archived" }, "Archived")}
              disabled={isUpdating}
              className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] text-text-tertiary hover:text-amber-600 hover:border-amber-200 transition-all duration-200 flex items-center justify-center"
              title="Archive"
            >
              <RiArchiveLine size={16} />
            </button>
          )}

          {/* Delete (superadmin only) */}
          {admin?.role === "superadmin" && (
            <button
              onClick={handleDelete}
              className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] text-text-tertiary hover:text-red-600 hover:border-red-200 transition-all duration-200 flex items-center justify-center"
              title="Delete"
            >
              <RiDeleteBin6Line size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ━━━ Main Content ━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Message Body */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-black/[0.06] overflow-hidden"
          style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.05)" }}
        >
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-accent-indigo via-accent to-accent-indigo" />

          {/* Header */}
          <div className="px-6 py-5 border-b border-black/[0.05]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-indigo flex items-center justify-center text-white text-lg font-bold shrink-0">
                {message.name?.[0]?.toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-primary tracking-tight mb-0.5">
                  {message.name}
                </h2>
                <a
                  href={`mailto:${message.email}`}
                  className="text-sm text-accent hover:underline inline-flex items-center gap-1"
                >
                  {message.email}
                </a>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-text-tertiary">
                  <span className="flex items-center gap-1">
                    <RiTimeLine size={11} />
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <div
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase text-white shrink-0"
                style={{
                  backgroundColor:
                    message.status === "unread"
                      ? "#E94B3C"
                      : message.status === "replied"
                        ? "#10B981"
                        : message.status === "archived"
                          ? "#B45309"
                          : "#6B6B76",
                }}
              >
                {message.status}
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="px-6 py-4 border-b border-black/[0.05] bg-surface-2/30">
            <p className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-1">
              Subject
            </p>
            <h3 className="text-lg font-bold text-primary tracking-tight">
              {message.subject}
            </h3>
          </div>

          {/* Message */}
          <div className="px-6 py-6">
            <p className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-3">
              Message
            </p>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>

          {/* Action footer */}
          <div className="px-6 py-4 border-t border-black/[0.05] bg-surface-2/30 flex flex-wrap gap-2">
            <button
              onClick={handleReply}
              className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-all duration-200 flex items-center gap-2 shadow-elevation-2"
            >
              <RiReplyLine size={15} />
              Reply via Email
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-text-secondary text-sm font-semibold hover:text-primary hover:border-black/[0.15] transition-all duration-200 flex items-center gap-2"
            >
              <RiFileCopyLine size={14} />
              Copy Email
            </button>
          </div>
        </motion.div>

        {/* Side panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Contact details */}
          <div
            className="bg-white rounded-2xl border border-black/[0.06] p-5"
            style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.05)" }}
          >
            <h3 className="text-sm font-bold text-primary tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Contact Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <RiMailLine size={14} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold text-text-quaternary tracking-wide uppercase mb-0.5">
                    Email
                  </p>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-xs font-semibold text-primary hover:text-accent break-all"
                  >
                    {message.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-indigo/10 flex items-center justify-center shrink-0">
                  <RiCalendarLine size={14} className="text-accent-indigo" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold text-text-quaternary tracking-wide uppercase mb-0.5">
                    Received
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    {new Date(message.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {message.repliedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <RiCheckLine size={14} className="text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold text-text-quaternary tracking-wide uppercase mb-0.5">
                      Replied
                    </p>
                    <p className="text-xs font-semibold text-primary">
                      {new Date(message.repliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div
            className="bg-white rounded-2xl border border-black/[0.06] p-5"
            style={{ boxShadow: "0 1px 4px rgba(15,15,18,0.05)" }}
          >
            <h3 className="text-sm font-bold text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Internal Notes
            </h3>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add private notes about this message..."
              rows={4}
              maxLength={500}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-black/[0.06] text-sm text-primary placeholder:text-text-quaternary focus:outline-none focus:ring-2 focus:ring-accent-indigo/20 focus:border-accent-indigo/40 focus:bg-white transition-all duration-250 resize-none"
            />
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[10px] text-text-quaternary">
                {notes.length}/500
              </span>
              {notes !== (message.notes || "") && (
                <button
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="px-3 py-1.5 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary-soft transition-all duration-200 disabled:opacity-60"
                >
                  Save Notes
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
