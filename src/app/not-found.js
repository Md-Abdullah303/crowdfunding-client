"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "calc(100vh - 68px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 16px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center"
    }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", top: "10%", left: "15%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "15%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 1, maxWidth: "600px" }}
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ 
            fontSize: "120px", 
            fontWeight: 900, 
            margin: 0, 
            lineHeight: 1,
            background: "linear-gradient(135deg, #a855f7, #6c47ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 10px 20px rgba(108,71,255,0.3))"
          }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: "28px", fontWeight: 700, color: "#fff", margin: "20px 0 10px 0" }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ color: "#8b8ba8", fontSize: "16px", lineHeight: 1.6, marginBottom: "40px", maxWidth: "400px", margin: "10px auto 40px auto" }}
        >
          Oops! The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}
        >
          <button 
            onClick={() => window.history.back()}
            style={{
              padding: "12px 24px", borderRadius: "12px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#f1f1f5", fontSize: "14px", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "8px", cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)" }}
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link href="/" style={{
            padding: "12px 24px", borderRadius: "12px",
            background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
            color: "#fff", fontSize: "14px", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "8px",
            boxShadow: "0 8px 24px rgba(108,71,255,0.35)", transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            <Home size={16} /> Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
