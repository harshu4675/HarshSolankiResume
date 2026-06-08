import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./styles/index.css";

// Performance: Mark initial render
if (typeof performance !== "undefined") {
  performance.mark("app-start");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{
          bottom: 24,
          right: 24,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111111",
            color: "#FFFFFF",
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            letterSpacing: "-0.01em",
          },
          success: {
            iconTheme: {
              primary: "#FF5E57",
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#FF5E57",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
);
