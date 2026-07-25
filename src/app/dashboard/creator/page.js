"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Heart, 
  Target, 
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

// Dummy Data for Creator
const creatorStats = [
  { label: "Total Raised", value: "$4,500", icon: <TrendingUp size={20} />, color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  { label: "Active Campaigns", value: "2", icon: <Target size={20} />, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { label: "Total Backers", value: "128", icon: <Heart size={20} />, color: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
];

export default function CreatorDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>
            Welcome back, Creator {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Here's how your campaigns are performing.</p>
        </div>
        
        <Link href="/dashboard/creator/my-campaigns/new" style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 20px", borderRadius: "12px",
          background: "linear-gradient(135deg, #6c47ff, #a855f7)",
          border: "none", color: "#fff", fontSize: "14px", fontWeight: 700, textDecoration: "none",
          transition: "all 0.2s", boxShadow: "0 8px 24px rgba(108,71,255,0.3)"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          <Sparkles size={16} /> Create New Campaign
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {creatorStats.map((stat, i) => (
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

      <div style={{
        background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)", flex: 1
      }}>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 16px 0" }}>Campaign Performance Overview</h3>
        <p style={{ color: "#8b8ba8", fontSize: "14px", lineHeight: 1.6, margin: "0 0 24px 0" }}>
          You have 2 active campaigns currently raising funds. Keep up the good work!
        </p>
        <div style={{ height: "200px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#5a5a74", fontSize: "13px" }}>
          [ Campaign Performance Chart Placeholder ]
        </div>
      </div>
    </motion.div>
  );
}
