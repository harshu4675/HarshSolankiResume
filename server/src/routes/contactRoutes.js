const express = require("express");
const router = express.Router();
const { submitContact } = require("../controllers/contactController");
const {
  contactValidation,
  handleValidation,
} = require("../middleware/validator");
const { contactLimiter } = require("../middleware/rateLimiter");

// POST /api/contact — Submit contact form (public)
router.post(
  "/",
  contactLimiter,
  contactValidation,
  handleValidation,
  submitContact,
);

module.exports = router;
