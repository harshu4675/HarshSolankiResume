import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiGithubLine,
  RiLinkedinBoxLine,
  RiSendPlaneLine,
  RiCheckboxCircleLine,
  RiChatSmile2Line,
  RiTimeLine,
  RiExternalLinkLine,
} from "react-icons/ri";
import { SiHackerrank } from "react-icons/si";
import SectionHeader from "@components/common/SectionHeader";
import ScrollReveal from "@components/common/ScrollReveal";
import Button from "@components/ui/Button";
import { useContactForm } from "@hooks/useContactForm";
import { PERSONAL, SOCIAL } from "@lib/constants";
import { copyToClipboard, formatPhone } from "@lib/utils";
import toast from "react-hot-toast";

// ─── Input Component ───────────────────────────────────────────────────────
function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  register,
  validation,
  errors,
  rows,
}) {
  const hasError = errors[name];
  const isTextarea = !!rows;

  const baseClasses = `
    w-full px-4 py-3.5 rounded-xl
    bg-white border text-sm text-primary
    placeholder:text-text-quaternary
    transition-all duration-250
    focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40
    ${
      hasError
        ? "border-red-300 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
        : "border-black/[0.08] hover:border-black/[0.15]"
    }
  `;

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-primary/70 tracking-tight mb-2"
      >
        {label}
        <span className="text-accent ml-0.5">*</span>
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClasses} resize-none`}
          {...register(name, validation)}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={baseClasses}
          {...register(name, validation)}
        />
      )}
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 font-medium mt-1.5 flex items-center gap-1"
          >
            <span className="w-1 h-1 rounded-full bg-red-400" />
            {errors[name]?.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact Info Card ─────────────────────────────────────────────────────
function ContactInfoCard({ icon, label, value, href, copyable, color }) {
  const handleCopy = async () => {
    if (copyable) {
      const success = await copyToClipboard(value);
      if (success) toast.success(`${label} copied!`);
    }
  };

  const content = (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/[0.06] group cursor-pointer transition-all duration-300 hover:border-black/[0.12]"
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(10,10,10,0.08)" }}
      onClick={copyable ? handleCopy : undefined}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}12` }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-primary tracking-tight truncate">
          {value}
        </p>
      </div>
      {copyable && (
        <span className="text-[10px] font-semibold text-text-quaternary opacity-0 group-hover:opacity-100 transition-opacity">
          COPY
        </span>
      )}
      {href && !copyable && (
        <RiExternalLinkLine
          size={14}
          className="text-text-quaternary opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </motion.div>
  );

  if (href && !copyable) {
    return (
      <a
        href={href}
        target={
          href.startsWith("mailto") || href.startsWith("tel")
            ? undefined
            : "_blank"
        }
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSuccess,
    validation,
  } = useContactForm();

  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-surface-3"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(10,10,10,0.06), transparent)",
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #2563EB 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #FF5E57 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <SectionHeader
          label="Get In Touch"
          title="Let's Work Together"
          description="Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you."
          align="center"
          className="mb-14 mx-auto"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 mb-6">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <RiTimeLine size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800 tracking-tight">
                    Quick Response
                  </p>
                  <p className="text-xs text-emerald-600">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <ContactInfoCard
                  icon={<RiMailLine size={18} className="text-accent" />}
                  label="Email"
                  value={PERSONAL.email}
                  href={`mailto:${PERSONAL.email}`}
                  copyable
                  color="#FF5E57"
                />
                <ContactInfoCard
                  icon={<RiPhoneLine size={18} className="text-blue-600" />}
                  label="Phone"
                  value={formatPhone(PERSONAL.phone)}
                  href={`tel:${PERSONAL.phone}`}
                  copyable
                  color="#2563EB"
                />
                <ContactInfoCard
                  icon={<RiMapPinLine size={18} className="text-emerald-600" />}
                  label="Location"
                  value={PERSONAL.location}
                  copyable={false}
                  color="#10B981"
                />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-text-quaternary tracking-[0.12em] uppercase mb-4">
                  Connect With Me
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      icon: <RiGithubLine size={16} />,
                      href: SOCIAL.github,
                      label: "GitHub",
                      hoverBg: "hover:bg-[#24292e]",
                    },
                    {
                      icon: <RiLinkedinBoxLine size={16} />,
                      href: SOCIAL.linkedin,
                      label: "LinkedIn",
                      hoverBg: "hover:bg-[#0077B5]",
                    },
                    {
                      icon: <SiHackerrank size={14} />,
                      href: SOCIAL.hackerrank,
                      label: "HackerRank",
                      hoverBg: "hover:bg-[#00EA64]",
                    },
                    {
                      icon: <RiMailLine size={16} />,
                      href: SOCIAL.email,
                      label: "Email",
                      hoverBg: "hover:bg-accent",
                    },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={
                        social.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-black/[0.07] bg-white text-text-secondary text-xs font-semibold ${social.hoverBg} hover:text-white hover:border-transparent transition-all duration-300`}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {social.icon}
                      {social.label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-primary text-white relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <RiChatSmile2Line size={18} className="text-accent" />
                    <span className="text-sm font-bold tracking-tight">
                      Open to Opportunities
                    </span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    I'm currently looking for full-time roles and freelance
                    projects. Let's build something amazing together.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form - NO TiltCard wrapping (fixes typing) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <div
                className="bg-white rounded-3xl border border-black/[0.06] p-8 md:p-10 relative overflow-hidden"
                style={{ boxShadow: "0 4px 16px rgba(10,10,10,0.06)" }}
              >
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(10,10,10,0.15) 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 z-20 bg-white rounded-3xl flex flex-col items-center justify-center p-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5"
                      >
                        <RiCheckboxCircleLine
                          size={32}
                          className="text-emerald-500"
                        />
                      </motion.div>
                      <h3 className="text-xl font-bold text-primary tracking-tight mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-text-secondary text-center max-w-xs">
                        Thanks for reaching out! I'll get back to you as soon as
                        possible.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <RiSendPlaneLine size={16} className="text-accent" />
                    <h3 className="text-lg font-bold text-primary tracking-tight">
                      Send a Message
                    </h3>
                  </div>
                  <p className="text-sm text-text-tertiary">
                    Fill out the form below and I'll get back to you soon.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Your Name"
                      name="name"
                      placeholder="John Doe"
                      register={register}
                      validation={validation.name}
                      errors={errors}
                    />
                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      register={register}
                      validation={validation.email}
                      errors={errors}
                    />
                  </div>

                  <FormInput
                    label="Subject"
                    name="subject"
                    placeholder="Project collaboration, job opportunity..."
                    register={register}
                    validation={validation.subject}
                    errors={errors}
                  />

                  <FormInput
                    label="Your Message"
                    name="message"
                    placeholder="Tell me about your project, idea, or just say hello..."
                    register={register}
                    validation={validation.message}
                    errors={errors}
                    rows={5}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                      icon={!isSubmitting && <RiSendPlaneLine size={16} />}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>

                  <p className="text-[11px] text-text-quaternary leading-relaxed">
                    By submitting, your message will be securely stored. I
                    respect your privacy.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
