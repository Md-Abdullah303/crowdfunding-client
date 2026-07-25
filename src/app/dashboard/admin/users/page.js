"use client";

import { motion } from "framer-motion";
import { Search, Filter, Shield, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function UserManagementPage() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/users");
      if (res.data.success) {
        setUsersList(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await api.patch(`/api/users/${userId}/role`, { role: newRole });
      if (res.data.success) {
        toast.success("Role updated successfully");
        setUsersList(usersList.map(u => u._id === userId ? { ...u, role: newRole } : u));
      } else {
        toast.error(res.data.message || "Failed to update role");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating role");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await api.delete(`/api/users/${userId}`);
      if (res.data.success) {
        toast.success("User deleted successfully");
        setUsersList(usersList.filter(u => u._id !== userId));
        setDeleteUserId(null);
      } else {
        toast.error(res.data.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  const filteredUsers = usersList.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)", minHeight: "400px", position: "relative"
      }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px", color: "#a855f7" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Loader2 size={32} />
            </motion.div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>User</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Role</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Credits</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Joined</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #6c47ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "16px" }}>
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{user.name}</div>
                          <div style={{ fontSize: "13px", color: "#8b8ba8" }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        disabled={user.email === "admin@admin.com"}
                        style={{
                          padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, textTransform: "capitalize",
                          background: user.role === "admin" ? "rgba(108,71,255,0.15)" : user.role === "creator" ? "rgba(244,63,94,0.15)" : "rgba(16,185,129,0.15)",
                          color: user.role === "admin" ? "#a855f7" : user.role === "creator" ? "#f43f5e" : "#10b981", 
                          border: "1px solid transparent", outline: "none", cursor: user.email === "admin@admin.com" ? "not-allowed" : "pointer"
                        }}
                      >
                        <option value="admin" style={{ background: "#151521", color: "#a855f7" }}>Admin</option>
                        <option value="creator" style={{ background: "#151521", color: "#f43f5e" }}>Creator</option>
                        <option value="supporter" style={{ background: "#151521", color: "#10b981" }}>Supporter</option>
                      </select>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#f1f1f5" }}>
                        {user.credits || 0}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "14px", color: "#d4d4e0" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "16px 24px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                        <button 
                          onClick={() => setDeleteUserId(user._id)}
                          disabled={user.email === "admin@admin.com"}
                          style={{ 
                            background: "transparent", border: "none", color: user.email === "admin@admin.com" ? "rgba(239,68,68,0.3)" : "#ef4444", 
                            cursor: user.email === "admin@admin.com" ? "not-allowed" : "pointer", padding: "8px", borderRadius: "8px", transition: "all 0.2s",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }} 
                          onMouseEnter={(e) => { if(user.email !== "admin@admin.com") e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }} 
                          onMouseLeave={(e) => { if(user.email !== "admin@admin.com") e.currentTarget.style.background = "transparent"; }} 
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: "32px", textAlign: "center", color: "#8b8ba8", fontSize: "14px" }}>
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shadcn-like Alert Dialog */}
      {deleteUserId && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(4px)"
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "#13131f", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px", padding: "24px", width: "90%", maxWidth: "420px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
          >
            <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 700, color: "#fff" }}>
              Are you absolutely sure?
            </h2>
            <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#8b8ba8", lineHeight: 1.5 }}>
              This action cannot be undone. This will permanently delete the user's account and remove their data from our servers.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button 
                onClick={() => setDeleteUserId(null)}
                style={{
                  background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f1f5",
                  padding: "10px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDeleteUser(deleteUserId)}
                style={{
                  background: "#ef4444", border: "none", color: "#fff",
                  padding: "10px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#dc2626"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ef4444"}
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
