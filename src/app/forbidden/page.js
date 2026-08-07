"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%"
        }}
      >
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.1)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto"
        }}>
          <ShieldAlert size={40} color="#ef4444" />
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#fff", marginBottom: "10px" }}>Access Denied</h1>
        <p style={{ color: "#8b8ba8", marginBottom: "30px", fontSize: "15px" }}>
          You don't have permission to view this page. This area is restricted to specific roles.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)",
            color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          <ArrowLeft size={18} />
          Go to Your Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
