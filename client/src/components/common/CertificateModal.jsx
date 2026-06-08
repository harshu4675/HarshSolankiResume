import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiZoomInLine,
  RiZoomOutLine,
  RiDownloadLine,
  RiExternalLinkLine,
  RiAwardLine,
  RiCalendarLine,
  RiShieldCheckLine,
  RiImageLine,
} from "react-icons/ri";
import { SiHackerrank } from "react-icons/si";

export default function CertificateModal({ certificate, isOpen, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isHackerRank = certificate?.issuer === "HackerRank";

  // ━━━ Reset state when modal opens/closes ━━━
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setImageError(false);
      setIsImageLoaded(false);
    }
  }, [isOpen, certificate?.id]);

  // ━━━ Close on ESC key ━━━
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = () => {
    if (!certificate?.certificateUrl) return;
    const link = document.createElement("a");
    link.href = certificate.certificateUrl;
    link.download = `${certificate.title.replace(/\s+/g, "_")}_Certificate.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ━━━ Backdrop ━━━ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/85 backdrop-blur-md z-[100]"
          />

          {/* ━━━ Modal Container ━━━ */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-elevation-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top accent bar */}
                <div
                  className="h-1"
                  style={{
                    background: `linear-gradient(90deg, ${certificate.color}, ${certificate.color}80)`,
                  }}
                />

                {/* ━━━ Header ━━━ */}
                <div className="px-5 md:px-7 py-4 border-b border-black/[0.05] flex items-center justify-between gap-4 bg-surface-2/40">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${certificate.color}15` }}
                    >
                      {isHackerRank ? (
                        <SiHackerrank
                          size={20}
                          style={{ color: certificate.color }}
                        />
                      ) : (
                        <RiAwardLine
                          size={20}
                          style={{ color: certificate.color }}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base md:text-lg font-bold text-primary tracking-tight truncate">
                        {certificate.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: certificate.color }}
                        >
                          {certificate.issuer}
                        </span>
                        <span className="text-xs text-text-quaternary">·</span>
                        <span className="text-xs text-text-tertiary flex items-center gap-1">
                          <RiCalendarLine size={11} />
                          {certificate.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-text-tertiary hover:text-primary hover:border-black/[0.15] transition-all duration-200 shrink-0"
                    aria-label="Close"
                  >
                    <RiCloseLine size={18} />
                  </button>
                </div>

                {/* ━━━ Certificate Image Area ━━━ */}
                <div
                  className="relative bg-surface-3 overflow-hidden"
                  style={{ minHeight: "400px", maxHeight: "70vh" }}
                >
                  {/* Loading state */}
                  {!isImageLoaded &&
                    !imageError &&
                    certificate.certificateUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                          <span className="text-xs font-semibold text-text-tertiary tracking-wider uppercase">
                            Loading Certificate...
                          </span>
                        </div>
                      </div>
                    )}

                  {/* Error / No image fallback */}
                  {(imageError || !certificate.certificateUrl) && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center max-w-sm">
                        <div
                          className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                          style={{ backgroundColor: `${certificate.color}12` }}
                        >
                          <RiImageLine
                            size={28}
                            style={{ color: certificate.color }}
                          />
                        </div>
                        <h3 className="text-base font-bold text-primary tracking-tight mb-2">
                          Certificate Preview Unavailable
                        </h3>
                        <p className="text-sm text-text-tertiary mb-5">
                          {certificate.verifyUrl
                            ? "View the verified certificate on the official platform"
                            : "Certificate image will be uploaded soon"}
                        </p>
                        {certificate.verifyUrl && (
                          <a
                            href={certificate.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200"
                            style={{ backgroundColor: certificate.color }}
                          >
                            <RiExternalLinkLine size={14} />
                            Verify on {certificate.issuer}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  {certificate.certificateUrl && !imageError && (
                    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-6">
                      <motion.img
                        key={certificate.id}
                        src={certificate.certificateUrl}
                        alt={`${certificate.title} Certificate`}
                        onLoad={() => setIsImageLoaded(true)}
                        onError={() => setImageError(true)}
                        animate={{ scale: zoom }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-elevation-4"
                        style={{
                          opacity: isImageLoaded ? 1 : 0,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    </div>
                  )}

                  {/* Zoom controls */}
                  {certificate.certificateUrl &&
                    !imageError &&
                    isImageLoaded && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1.5 rounded-xl bg-primary/90 backdrop-blur-md border border-white/10">
                        <button
                          onClick={handleZoomOut}
                          disabled={zoom <= 0.5}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-40 transition-all"
                          aria-label="Zoom out"
                        >
                          <RiZoomOutLine size={15} />
                        </button>

                        <button
                          onClick={handleResetZoom}
                          className="px-3 py-1.5 text-[11px] font-bold text-white/90 tabular-nums hover:bg-white/10 rounded-lg transition-colors min-w-[50px]"
                        >
                          {Math.round(zoom * 100)}%
                        </button>

                        <button
                          onClick={handleZoomIn}
                          disabled={zoom >= 3}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-40 transition-all"
                          aria-label="Zoom in"
                        >
                          <RiZoomInLine size={15} />
                        </button>
                      </div>
                    )}
                </div>

                {/* ━━━ Footer with description + actions ━━━ */}
                <div className="px-5 md:px-7 py-4 border-t border-black/[0.05] bg-white">
                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {certificate.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {certificate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: `${certificate.color}08`,
                          borderColor: `${certificate.color}20`,
                          color: certificate.color,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {certificate.certificateUrl && !imageError && (
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-soft transition-all duration-200"
                      >
                        <RiDownloadLine size={13} />
                        Download
                      </button>
                    )}

                    {certificate.verifyUrl && (
                      <a
                        href={certificate.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-black/[0.08] text-text-secondary text-xs font-semibold hover:text-primary hover:border-black/[0.15] transition-all duration-200"
                      >
                        <RiShieldCheckLine size={13} />
                        Verify Online
                        <RiExternalLinkLine size={11} />
                      </a>
                    )}

                    <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-text-quaternary">
                      <kbd className="px-1.5 py-0.5 rounded bg-surface-3 border border-black/[0.06] font-mono font-semibold">
                        ESC
                      </kbd>
                      to close
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
