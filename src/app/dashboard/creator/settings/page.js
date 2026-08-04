"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Image as ImageIcon, Save, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    try {
      const response = await api.patch("/api/users/me", {
        name: formData.name,
        image: formData.image,
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        // Reload to refresh the session data globally across the dashboard
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: "800px" }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#f1f1f5", margin: "0 0 12px 0" }}>Profile Settings</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "16px" }}>
          Update your creator profile information. This will be displayed on your campaigns.
        </p>
      </div>

      <div style={{
        background: "rgba(19,19,31,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", padding: "40px", backdropFilter: "blur(16px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Avatar Preview */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              width: "100px", height: "100px", borderRadius: "24px",
              background: formData.image ? `url(${formData.image}) center/cover` : "linear-gradient(135deg, #6c47ff, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "36px", fontWeight: 800,
              boxShadow: "0 10px 25px rgba(108,71,255,0.3)",
              border: "2px solid rgba(255,255,255,0.1)"
            }}>
              {!formData.image && (formData.name?.[0]?.toUpperCase() || user.name?.[0]?.toUpperCase() || "U")}
            </div>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#f1f1f5", margin: "0 0 4px 0" }}>Profile Picture</h3>
              <p style={{ fontSize: "14px", color: "#8b8ba8", margin: 0 }}>Provide an image URL below to update your avatar.</p>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#a1a1aa", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#6c47ff" }} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{
                  width: "100%", padding: "16px 16px 16px 48px",
                  background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px", color: "#f1f1f5", fontSize: "16px", outline: "none", boxSizing: "border-box", transition: "all 0.2s"
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#a1a1aa", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Profile Image URL</label>
            <div style={{ position: "relative" }}>
              <ImageIcon size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#6c47ff" }} />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                style={{
                  width: "100%", padding: "16px 16px 16px 48px",
                  background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px", color: "#f1f1f5", fontSize: "16px", outline: "none", boxSizing: "border-box", transition: "all 0.2s"
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#a1a1aa", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
              <input
                type="email"
                value={user.email}
                disabled
                style={{
                  width: "100%", padding: "16px 16px 16px 48px",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "16px", color: "#5a5a74", fontSize: "16px", outline: "none", boxSizing: "border-box", cursor: "not-allowed"
                }}
              />
            </div>
            <p style={{ fontSize: "13px", color: "#5a5a74", marginTop: "8px" }}>Your email address is used for login and cannot be changed.</p>
          </div>

          <div style={{ marginTop: "12px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #a855f7, #6c47ff)", border: "none",
                padding: "16px 32px", borderRadius: "16px", color: "#fff", fontSize: "16px", fontWeight: 800,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.2s",
                boxShadow: "0 10px 25px rgba(108,71,255,0.3)"
              }}
              onMouseEnter={e => { if(!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(108,71,255,0.4)"; } }}
              onMouseLeave={e => { if(!loading) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(108,71,255,0.3)"; } }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
          
        </form>
      </div>
    </motion.div>
  );
}
