const Admin = require("../models/Admin");
const Contact = require("../models/Contact");

/**
 * @desc    Admin login
 * @route   POST /api/admin/login
 * @access  Public
 */
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check admin exists
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = admin.generateToken();

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admin profile
 * @route   GET /api/admin/me
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.admin,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard stats
 * @route   GET /api/admin/dashboard
 * @access  Private
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

    const [
      totalMessages,
      unreadMessages,
      starredMessages,
      last30Days,
      last7Days,
      recentMessages,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "unread" }),
      Contact.countDocuments({ isStarred: true }),
      Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Contact.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Contact.find()
        .sort("-createdAt")
        .limit(5)
        .select("name email subject status createdAt")
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalMessages,
          unreadMessages,
          starredMessages,
          last30Days,
          last7Days,
        },
        recentMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create initial admin (one-time setup)
 * @route   POST /api/admin/setup
 * @access  Public (only works if no admin exists)
 */
const setupAdmin = async (req, res, next) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.countDocuments();
    if (existingAdmin > 0) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists. Setup not allowed.",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: "superadmin",
    });

    const token = admin.generateToken();

    res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  getProfile,
  getDashboardStats,
  setupAdmin,
};
