const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getProfile,
  getDashboardStats,
  setupAdmin,
} = require("../controllers/adminController");
const {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/auth");
const {
  loginValidation,
  handleValidation,
} = require("../middleware/validator");
const { authLimiter } = require("../middleware/rateLimiter");

// ─── Public ──────────────────────────────────────────────────────
// POST /api/admin/setup — First-time admin setup
router.post("/setup", setupAdmin);

// POST /api/admin/login — Admin login
router.post(
  "/login",
  authLimiter,
  loginValidation,
  handleValidation,
  loginAdmin,
);

// ─── Protected ───────────────────────────────────────────────────
router.use(protect); // All routes below require auth

// GET /api/admin/me
router.get("/me", getProfile);

// GET /api/admin/dashboard
router.get("/dashboard", getDashboardStats);

// ─── Contact Management ─────────────────────────────────────────
// GET /api/admin/contacts
router.get("/contacts", getContacts);

// GET /api/admin/contacts/:id
router.get("/contacts/:id", getContact);

// PATCH /api/admin/contacts/:id
router.patch("/contacts/:id", updateContact);

// DELETE /api/admin/contacts/:id — Superadmin only
router.delete("/contacts/:id", authorize("superadmin"), deleteContact);

module.exports = router;
