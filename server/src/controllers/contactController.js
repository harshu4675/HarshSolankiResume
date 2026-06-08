const Contact = require("../models/Contact");
const { sendContactNotification } = require("../utils/sendEmail");

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.headers["x-forwarded-for"],
      userAgent: req.headers["user-agent"],
    });

    // Send email notification (non-blocking)
    sendContactNotification({ name, email, subject, message }).catch((err) => {
      console.error("Email notification error:", err.message);
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      data: {
        id: contact._id,
        name: contact.name,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/admin/contacts
 * @access  Private (Admin)
 */
const getContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      starred,
      search,
      sort = "-createdAt",
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (starred === "true") filter.isStarred = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
      Contact.countDocuments(filter),
    ]);

    // Stats
    const [unreadCount, totalCount, starredCount] = await Promise.all([
      Contact.countDocuments({ status: "unread" }),
      Contact.countDocuments(),
      Contact.countDocuments({ isStarred: true }),
    ]);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
      stats: {
        unread: unreadCount,
        total: totalCount,
        starred: starredCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single contact
 * @route   GET /api/admin/contacts/:id
 * @access  Private (Admin)
 */
const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id).select(
      "+ipAddress +userAgent",
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Mark as read
    if (contact.status === "unread") {
      contact.status = "read";
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update contact status
 * @route   PATCH /api/admin/contacts/:id
 * @access  Private (Admin)
 */
const updateContact = async (req, res, next) => {
  try {
    const { status, isStarred, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (typeof isStarred === "boolean") updateData.isStarred = isStarred;
    if (notes !== undefined) updateData.notes = notes;
    if (status === "replied") updateData.repliedAt = new Date();

    const contact = await Contact.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete contact
 * @route   DELETE /api/admin/contacts/:id
 * @access  Private (Admin)
 */
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
