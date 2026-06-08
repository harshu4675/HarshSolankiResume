import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
  RiShieldKeyholeLine,
  RiArrowLeftLine,
  RiUserAddLine,
  RiUser3Line,
} from "react-icons/ri";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setup, isAuthenticated } = useAuth();

  const [mode, setMode] = useState("login"); // 'login' | 'setup'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = mode === "login" ? await login(data) : await setup(data);

      if (result.success) {
        toast.success(
          mode === "login" ? "Welcome back!" : "Admin account created!",
        );
        const from = location.state?.from?.pathname || "/admin";
        navigate(from, { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "setup" : "login");
    reset();
  };

  return (
    <div className="min-h-screen bg-mesh-admin flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #5B5FC7 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #E94B3C 0%, transparent 70%)",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,15,18,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,15,18,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Back to home */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-black/[0.06] text-xs font-semibold text-text-secondary hover:text-primary hover:bg-white transition-all duration-250 z-10"
      >
        <RiArrowLeftLine size={14} />
        Back to Home
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-elevation-5">
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-accent-indigo via-accent to-accent-indigo" />

          <div className="p-8 md:p-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-14 h-14 rounded-2xl bg-gradient-dark flex items-center justify-center mb-6 shadow-elevation-3"
            >
              <RiShieldKeyholeLine size={26} className="text-white" />
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-bold text-primary tracking-tight mb-1.5">
                {mode === "login" ? "Admin Access" : "Initial Setup"}
              </h1>
              <p className="text-sm text-text-tertiary">
                {mode === "login"
                  ? "Sign in to access the admin dashboard"
                  : "Create your admin account (one-time setup)"}
              </p>
            </motion.div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                {/* Name field — only for setup */}
                {mode === "setup" && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-primary/70 mb-2"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-quaternary">
                        <RiUser3Line size={16} />
                      </div>
                      <input
                        id="name"
                        type="text"
                        placeholder="Harsh Solanki"
                        className={`
                          w-full pl-11 pr-4 py-3 rounded-xl
                          bg-surface-2 border text-sm text-primary
                          placeholder:text-text-quaternary
                          transition-all duration-250
                          focus:outline-none focus:ring-2 focus:ring-accent-indigo/20 focus:border-accent-indigo/40 focus:bg-white
                          ${errors.name ? "border-red-300" : "border-black/[0.08] hover:border-black/[0.15]"}
                        `}
                        {...register("name", {
                          required: "Name is required",
                          minLength: { value: 2, message: "Too short" },
                        })}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 font-medium mt-1.5">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-primary/70 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-quaternary">
                      <RiMailLine size={16} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="harshu6278@gmail.com"
                      className={`
                        w-full pl-11 pr-4 py-3 rounded-xl
                        bg-surface-2 border text-sm text-primary
                        placeholder:text-text-quaternary
                        transition-all duration-250
                        focus:outline-none focus:ring-2 focus:ring-accent-indigo/20 focus:border-accent-indigo/40 focus:bg-white
                        ${errors.email ? "border-red-300" : "border-black/[0.08] hover:border-black/[0.15]"}
                      `}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-primary/70 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-quaternary">
                      <RiLockLine size={16} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                      }
                      placeholder="••••••••"
                      className={`
                        w-full pl-11 pr-11 py-3 rounded-xl
                        bg-surface-2 border text-sm text-primary
                        placeholder:text-text-quaternary
                        transition-all duration-250
                        focus:outline-none focus:ring-2 focus:ring-accent-indigo/20 focus:border-accent-indigo/40 focus:bg-white
                        ${errors.password ? "border-red-300" : "border-black/[0.08] hover:border-black/[0.15]"}
                      `}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-quaternary hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <RiEyeOffLine size={16} />
                      ) : (
                        <RiEyeLine size={16} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 font-medium mt-1.5">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full mt-2 px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-soft transition-all duration-250 shadow-elevation-3 hover:shadow-elevation-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {mode === "login" ? "Signing in..." : "Setting up..."}
                    </>
                  ) : (
                    <>
                      {mode === "login" ? "Sign In" : "Create Account"}
                      <RiArrowRightLine size={16} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </AnimatePresence>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/[0.06]" />
              <span className="text-[10px] font-semibold text-text-quaternary tracking-[0.1em] uppercase">
                OR
              </span>
              <div className="h-px flex-1 bg-black/[0.06]" />
            </div>

            {/* Toggle mode */}
            <button
              onClick={toggleMode}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-black/[0.08] text-sm font-semibold text-text-secondary hover:text-primary hover:border-black/[0.15] hover:bg-black/[0.02] transition-all duration-250"
            >
              {mode === "login" ? (
                <>
                  <RiUserAddLine size={15} />
                  First time? Create admin account
                </>
              ) : (
                <>
                  <RiUser3Line size={15} />
                  Already have an account? Sign in
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-text-quaternary mt-6 leading-relaxed">
          Secured with JWT authentication & bcrypt hashing.
          <br />
          Setup is only available when no admin exists.
        </p>
      </motion.div>
    </div>
  );
}
