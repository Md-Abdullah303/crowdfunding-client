"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users,
  DollarSign, 
  FolderKanban
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    api.get("/api/admin/stats")
      .then(res => setStats(res.data.data))
      .catch(err => console.error("Failed to fetch admin stats"));
  }, []);

  const adminStats = [
    { label: "Total Users", value: stats.totalUsers, icon: <Users size={20} />, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
    { label: "Platform Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: <DollarSign size={20} />, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Active Campaigns", value: stats.totalCampaigns, icon: <FolderKanban size={20} />, color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>
          Admin Overview
        </h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Welcome back, {user?.name}. Here is the platform summary.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {adminStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{
              background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "24px", display: "flex", alignItems: "center", gap: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)", backdropFilter: "blur(10px)"
            }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: stat.bg, color: stat.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#8b8ba8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</p>
              <h2 style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: "#fff" }}>{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 16px 0" }}>Recent User Registrations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", fontSize: "14px", color: "#d4d4e0" }}>New supporter: Alex Johnson joined 2 hrs ago</div>
            <div style={{ padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", fontSize: "14px", color: "#d4d4e0" }}>New creator: TechNova Inc joined 5 hrs ago</div>
          </div>
        </div>

        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 16px 0" }}>Platform Alerts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "12px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", borderRadius: "12px", fontSize: "14px" }}>
              2 campaigns pending approval
            </div>
            <div style={{ padding: "12px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", borderRadius: "12px", fontSize: "14px" }}>
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
