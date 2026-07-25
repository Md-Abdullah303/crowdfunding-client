"use client";

import { motion } from "framer-motion";
import { Settings, Save, Bell, Shield, Server, CreditCard, Activity } from "lucide-react";

export default function PlatformSettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Platform Settings</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Manage global configuration and platform-wide preferences.</p>
        </div>
        
        <button style={{
          background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
          padding: "10px 24px", borderRadius: "10px", color: "#fff", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 700, transition: "transform 0.2s", fontSize: "14px", boxShadow: "0 4px 14px rgba(108,71,255,0.3)"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", maxWidth: "800px" }}>
        
        {/* General Settings */}
        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(108,71,255,0.1)", color: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Server size={20} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: 0 }}>General Configuration</h3>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Platform Name</label>
                <input type="text" defaultValue="FundFlow" style={{
                  width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Support Email</label>
                <input type="email" defaultValue="support@fundflow.com" style={{
                  width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>Maintenance Mode</div>
                <div style={{ fontSize: "13px", color: "#8b8ba8" }}>Temporarily disable access to the platform for users.</div>
              </div>
              <div style={{ width: "44px", height: "24px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", position: "relative", cursor: "pointer" }}>
                <div style={{ width: "20px", height: "20px", background: "#fff", borderRadius: "50%", position: "absolute", top: "2px", left: "2px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Settings */}
        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(16,185,129,0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CreditCard size={20} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: 0 }}>Financial & Fees</h3>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Platform Fee (%)</label>
              <input type="number" defaultValue="5" min="0" max="100" style={{
                width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              />
              <p style={{ fontSize: "12px", color: "#5a5a74", marginTop: "8px" }}>Percentage deducted from successful campaigns.</p>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Sign-up Bonus Credits</label>
              <input type="number" defaultValue="50" min="0" style={{
                width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              />
              <p style={{ fontSize: "12px", color: "#5a5a74", marginTop: "8px" }}>Credits given to new users upon registration.</p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
