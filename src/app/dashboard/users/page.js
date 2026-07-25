"use client";

import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Edit2, Shield, Trash2, Ban } from "lucide-react";

// Dummy Data
const usersList = [
  { id: 1, name: "MR. King", email: "admin@admin.com", role: "admin", status: "Active", joined: "Today" },
  { id: 2, name: "Khan MD. Abdullah", email: "khan@example.com", role: "creator", status: "Active", joined: "2 days ago" },
  { id: 3, name: "Alex Johnson", email: "alex@test.com", role: "supporter", status: "Active", joined: "1 week ago" },
  { id: 4, name: "Sarah Smith", email: "sarah@test.com", role: "creator", status: "Suspended", joined: "2 weeks ago" },
  { id: 5, name: "Michael Doe", email: "mike@test.com", role: "supporter", status: "Active", joined: "1 month ago" },
];

export default function UserManagementPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>User Management</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Manage platform users, roles, and account statuses.</p>
        </div>
        
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
            <input 
              type="text" 
              placeholder="Search users..." 
              style={{
                background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                padding: "10px 14px 10px 38px", borderRadius: "10px", color: "#f1f1f5",
                fontSize: "14px", outline: "none", width: "220px", transition: "all 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
            />
          </div>
          <button style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            padding: "10px 18px", borderRadius: "10px", color: "#f1f1f5", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, transition: "all 0.2s", fontSize: "14px"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div style={{
        background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", overflow: "hidden", backdropFilter: "blur(10px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>User</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Role</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Joined</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #6c47ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "16px" }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{user.name}</div>
                        <div style={{ fontSize: "13px", color: "#8b8ba8" }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ 
                      padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, textTransform: "capitalize",
                      background: user.role === "admin" ? "rgba(108,71,255,0.1)" : user.role === "creator" ? "rgba(244,63,94,0.1)" : "rgba(16,185,129,0.1)",
                      color: user.role === "admin" ? "#a855f7" : user.role === "creator" ? "#f43f5e" : "#10b981", border: "1px solid transparent"
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ 
                      display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600,
                      color: user.status === "Active" ? "#10b981" : "#ef4444"
                    }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: user.status === "Active" ? "#10b981" : "#ef4444" }} />
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", color: "#d4d4e0" }}>
                    {user.joined}
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      <button style={{ background: "transparent", border: "none", color: "#8b8ba8", cursor: "pointer", padding: "6px", borderRadius: "6px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#a855f7"; e.currentTarget.style.background = "rgba(108,71,255,0.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#8b8ba8"; e.currentTarget.style.background = "transparent"; }} title="Change Role">
                        <Shield size={16} />
                      </button>
                      <button style={{ background: "transparent", border: "none", color: "#8b8ba8", cursor: "pointer", padding: "6px", borderRadius: "6px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#8b8ba8"; e.currentTarget.style.background = "transparent"; }} title={user.status === "Active" ? "Suspend User" : "Activate User"}>
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
