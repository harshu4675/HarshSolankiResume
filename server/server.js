const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening
    const server = app.listen(PORT, () => {
      console.log("");
      console.log("╔══════════════════════════════════════════╗");
      console.log("║                                          ║");
      console.log(`║   🚀 Portfolio API Server                ║`);
      console.log(`║   📡 Port: ${PORT}                          ║`);
      console.log(
        `║   🌍 Env: ${process.env.NODE_ENV || "development"}                  ║`,
      );
      console.log("║                                          ║");
      console.log("╚══════════════════════════════════════════╝");
      console.log("");
    });

    // Unhandled rejection handler
    process.on("unhandledRejection", (err) => {
      console.error("❌ UNHANDLED REJECTION:", err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Uncaught exception handler
    process.on("uncaughtException", (err) => {
      console.error("❌ UNCAUGHT EXCEPTION:", err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n📡 ${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
