"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, UserCircle2, ArrowRight } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "supporter" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error("Please fill in all fields");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    
    setLoading(true);
    try {
      const { data, error } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role, // Custom field passed to better-auth
        callbackURL: "/dashboard",
      });
      
      if (error) throw new Error(error.message || "Registration failed");
      
      toast.success("Account created successfully! 🎉");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error("Google sign up failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 68px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 16px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 24px rgba(168,85,247,0.45)" }}>
              <Image src="/logo.png" alt="FundFlow" width={40} height={40} style={{ objectFit: "cover" }} />
            </div>
            <span style={{ fontSize: "1.3rem", fontWeight: 800, fontFamily: "Plus Jakarta Sans, Inter, sans-serif", background: "linear-gradient(135deg,#6c47ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              FundFlow
            </span>
          </Link>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, Inter, sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#f1f1f5", marginBottom: "6px" }}>
            Create an account
          </h1>
          <p style={{ color: "#8b8ba8", fontSize: "14px" }}>
            Get bonus credits instantly upon registration
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(15,15,26,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "32px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}>
          
          {/* Google Sign Up */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            id="google-signup-btn"
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "12px", padding: "12px 20px", borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#f1f1f5", fontSize: "14px", fontWeight: 600,
              cursor: googleLoading ? "not-allowed" : "pointer",
              opacity: googleLoading ? 0.7 : 1,
              transition: "all 0.2s ease",
              marginBottom: "20px",
            }}
            onMouseEnter={(e) => { if (!googleLoading) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            {/* Google SVG icon */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? "Redirecting..." : "Sign up with Google"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
            <span style={{ fontSize: "12px", color: "#5a5a74", fontWeight: 500 }}>or register with email</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
          </div>

          <form onSubmit={handleEmailRegister}>
            {/* Account Type Selection */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>
                I want to join as a
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <label style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "12px",
                  border: `1px solid ${form.role === "supporter" ? "#6c47ff" : "rgba(255,255,255,0.08)"}`,
                  background: form.role === "supporter" ? "rgba(108,71,255,0.1)" : "rgba(9,9,15,0.6)",
                  borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease"
                }}>
                  <input type="radio" name="role" value="supporter" checked={form.role === "supporter"} onChange={handleChange} style={{ display: "none" }} />
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `4px solid ${form.role === "supporter" ? "#6c47ff" : "rgba(255,255,255,0.2)"}`, transition: "all 0.2s ease" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: form.role === "supporter" ? "#fff" : "#8b8ba8" }}>Supporter</span>
                </label>
                <label style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "12px",
                  border: `1px solid ${form.role === "creator" ? "#a855f7" : "rgba(255,255,255,0.08)"}`,
                  background: form.role === "creator" ? "rgba(168,85,247,0.1)" : "rgba(9,9,15,0.6)",
                  borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease"
                }}>
                  <input type="radio" name="role" value="creator" checked={form.role === "creator"} onChange={handleChange} style={{ display: "none" }} />
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `4px solid ${form.role === "creator" ? "#a855f7" : "rgba(255,255,255,0.2)"}`, transition: "all 0.2s ease" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: form.role === "creator" ? "#fff" : "#8b8ba8" }}>Creator</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  style={{
                    width: "100%", padding: "11px 14px 11px 40px",
                    background: "rgba(9,9,15,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(168,85,247,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: "100%", padding: "11px 14px 11px 40px",
                    background: "rgba(9,9,15,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(168,85,247,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                  style={{
                    width: "100%", padding: "11px 44px 11px 40px",
                    background: "rgba(9,9,15,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(168,85,247,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <button type="button" onClick={() => setShowPass((v) => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#5a5a74", display: "flex" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px 20px",
                background: loading ? "rgba(168,85,247,0.5)" : "linear-gradient(135deg,#a855f7,#d946ef)",
                border: "none", borderRadius: "14px",
                color: "#fff", fontSize: "15px", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "opacity 0.2s ease",
                boxShadow: loading ? "none" : "0 8px 24px rgba(168,85,247,0.35)",
              }}
            >
              {loading ? (
                <><div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#8b8ba8" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#a855f7", fontWeight: 600, textDecoration: "none" }}>
            Sign in instead →
          </Link>
        </p>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
