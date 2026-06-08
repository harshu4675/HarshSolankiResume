const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const { apiLimiter } = require("./src/middleware/rateLimiter");
const { errorHandler, notFound } = require("./src/middleware/errorHandler");

// Route imports
const contactRoutes = require("./src/routes/contactRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

// ═══════════════════════════════════════════════════════
// SECURITY MIDDLEWARE
// ═══════════════════════════════════════════════════════

// Helmet - Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

// CORS
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      "http://localhost:5173",
      "https://harshsolanki.dev",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  }),
);

// MongoDB injection sanitization
app.use(mongoSanitize());

// XSS protection via simple sanitizer
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key]
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\$/g, "");
      }
    }
  }
  next();
});

// ═══════════════════════════════════════════════════════
// GENERAL MIDDLEWARE
// ═══════════════════════════════════════════════════════

// Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Compression
app.use(compression());

// Logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting for all API routes
app.use("/api", apiLimiter);

// ═══════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// ═══════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
