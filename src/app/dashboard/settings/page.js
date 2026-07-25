"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Bell, Shield, Save } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    notifications: true,
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Account Settings</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Manage your personal information and preferences.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        
        {/* Profile Details */}
        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "32px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)", flex: 2
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 24px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={18} style={{ color: "#a855f7" }} /> Personal Information
          </h2>
          
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "8px" }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "20px",
                background: "linear-gradient(135deg,#6c47ff,#a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "28px", fontWeight: 700,
                boxShadow: "0 4px 14px rgba(108,71,255,0.3)"
              }}>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <button type="button" style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  padding: "8px 16px", borderRadius: "10px", color: "#f1f1f5", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                >
                  Change Avatar
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name || (user?.name || "")}
                  onChange={handleChange}
                  style={{
                    width: "100%", padding: "12px 14px 12px 42px",
                    background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "all 0.2s"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email || (user?.email || "")}
                  disabled
                  style={{
                    width: "100%", padding: "12px 14px 12px 42px",
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "12px", color: "#8b8ba8", fontSize: "14px", outline: "none", boxSizing: "border-box", cursor: "not-allowed"
                  }}
                />
              </div>
              <p style={{ fontSize: "11px", color: "#5a5a74", marginTop: "6px" }}>Email address cannot be changed right now.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
                padding: "14px", borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "10px", transition: "all 0.2s"
              }}
            >
              {loading ? "Saving..." : <><Save size={16} /> Save Changes</>}
            </button>
          </form>
        </div>

        {/* Security & Preferences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1 }}>
          
          <div style={{
            background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Shield size={16} style={{ color: "#10b981" }} /> Security
            </h2>
            <button style={{
              width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              padding: "12px", borderRadius: "12px", color: "#f1f1f5", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)" }}
            >
              <Lock size={16} style={{ color: "#8b8ba8" }} /> Change Password
            </button>
          </div>

          <div style={{
            background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)", flex: 1
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Bell size={16} style={{ color: "#eab308" }} /> Preferences
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" name="notifications" checked={formData.notifications} onChange={handleChange} style={{ width: "16px", height: "16px", accentColor: "#6c47ff" }} />
                <span style={{ fontSize: "13px", color: "#d4d4e0", fontWeight: 500 }}>Email Notifications for Campaigns</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} style={{ width: "16px", height: "16px", accentColor: "#6c47ff" }} />
                <span style={{ fontSize: "13px", color: "#d4d4e0", fontWeight: 500 }}>Subscribe to Newsletter</span>
              </label>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
