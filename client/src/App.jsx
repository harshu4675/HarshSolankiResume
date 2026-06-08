import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Portfolio
import Layout from "@components/layout/Layout";
import Hero from "@components/sections/Hero";
import About from "@components/sections/About";
import Skills from "@components/sections/Skills";
import WhatIBuild from "@components/sections/WhatIBuild";
import Projects from "@components/sections/Projects";
import Experience from "@components/sections/Experience";
import Education from "@components/sections/Education";
import Certifications from "@components/sections/Certifications";
import Contact from "@components/sections/Contact";
import { pageVariants } from "@lib/animations";

// Admin
import { AuthProvider } from "./admin/context/AuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";

// Lazy load admin pages
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminInbox = lazy(() => import("./admin/pages/AdminInbox"));
const AdminMessage = lazy(() => import("./admin/pages/AdminMessage"));
const AdminSettings = lazy(() => import("./admin/pages/AdminSettings"));

// ━━━ Loading fallback ━━━
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-text-tertiary tracking-wider uppercase">
          Loading...
        </span>
      </div>
    </div>
  );
}

// ━━━ Portfolio Page ━━━
function PortfolioPage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Layout>
          <Hero />
          <About />
          <Skills />
          <WhatIBuild />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </Layout>
      </motion.div>
    </AnimatePresence>
  );
}

// ━━━ Main App ━━━
export default function App() {
  useEffect(() => {
    document.body.style.visibility = "visible";
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Portfolio (public) */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboard />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inbox"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<PageLoader />}>
                  <AdminInbox />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inbox/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<PageLoader />}>
                  <AdminMessage />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<PageLoader />}>
                  <AdminSettings />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 — redirect to home */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="text-8xl font-bold text-gradient-accent mb-4">
                  404
                </div>
                <h2 className="text-xl font-bold text-primary mb-2">
                  Page not found
                </h2>
                <p className="text-sm text-text-tertiary mb-6">
                  The page you're looking for doesn't exist.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-soft transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
