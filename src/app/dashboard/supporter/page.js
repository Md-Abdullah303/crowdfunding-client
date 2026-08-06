"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Heart, 
  Target, 
  Calendar,
  ArrowUpRight,
  Sparkles,
  Loader2,
  Coins
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";

export default function SupporterDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContributed: 0,
    totalContributions: 0,
    availableCredits: 0
  });
  const [recentContributions, setRecentContributions] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardData = async () => {
      try {
        // Fetch live user data for available credits
        const userRes = await api.get("/api/users/me");
        const availableCredits = userRes.data.data?.credits || 0;

        // Fetch recent contributions (get a good amount to calculate total)
        // In a real production app, the backend should have a dedicated /stats endpoint.
        const contRes = await api.get("/api/contributions/my-contributions?page=1&limit=100");
        const contributions = contRes.data.data || [];
        const totalContributions = contRes.data.total || 0;
        
        let totalContributed = 0;
        contributions.forEach(c => {
          if (c.status === "approved" || c.status === "pending") {
             totalContributed += c.amount;
          }
        });

        setStats({
          totalContributed,
          totalContributions,
          availableCredits
        });

        // Only keep the latest 4 for the recent list
        setRecentContributions(contributions.slice(0, 4));

      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Loader2 className="animate-spin" size={40} style={{ color: "#a855f7" }} />
      </div>
    );
  }

  const supporterStats = [
    { label: "Available Credits", value: `${stats.availableCredits} cr`, icon: <Coins size={20} />, color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
    { label: "Total Contributed", value: `${stats.totalContributed} cr`, icon: <TrendingUp size={20} />, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Contributions Made", value: stats.totalContributions, icon: <Heart size={20} />, color: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>
            Welcome back, {user?.name?.split(" ")[0] || "Supporter"}! 👋
          </h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Here's an overview of your crowdfunding impact.</p>
        </div>
        
        <Link href="/campaigns" style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 20px", borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(108,71,255,0.2), rgba(168,85,247,0.2))",
          border: "1px solid rgba(168,85,247,0.4)",
          color: "#f1f1f5", fontSize: "14px", fontWeight: 600, textDecoration: "none",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(135deg, rgba(108,71,255,0.3), rgba(168,85,247,0.3))"}
        onMouseLeave={(e) => e.currentTarget.style.background = "linear-gradient(135deg, rgba(108,71,255,0.2), rgba(168,85,247,0.2))"}
        >
          <Sparkles size={16} style={{ color: "#a855f7" }} /> Discover New Campaigns
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {supporterStats.map((stat, i) => (
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

      {/* Main Content Area */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
        
        {/* Recent Contributions */}
        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: 0 }}>Recent Contributions</h3>
            {recentContributions.length > 0 && (
              <Link href="/dashboard/supporter/contributions" style={{ fontSize: "13px", color: "#a855f7", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                View All <ArrowUpRight size={14} />
              </Link>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentContributions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#8b8ba8" }}>
                <Heart size={40} style={{ color: "#5a5a74", marginBottom: "12px", display: "inline-block" }} />
                <p style={{ margin: 0 }}>You haven't made any contributions yet.</p>
              </div>
            ) : (
              recentContributions.map((item) => (
                <div key={item._id} style={{
                  display: "flex", alignItems: "center", gap: "16px", padding: "16px",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "16px", transition: "all 0.2s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)" }}
                >
                  <div style={{ width: "50px", height: "50px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.05)" }}>
                    {item.campaign?.coverImage ? (
                      <img src={item.campaign.coverImage} alt={item.campaign.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b8ba8" }}>
                        <Target size={20} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href={`/campaigns/${item.campaign?._id}`} style={{ textDecoration: "none" }}>
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: 600, color: "#f1f1f5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer" }}>
                        {item.campaign?.title || "Unknown Campaign"}
                      </h4>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#8b8ba8", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#5a5a74" }} />
                      <span style={{ 
                        fontSize: "12px", 
                        color: item.status === "approved" ? "#10b981" : item.status === "pending" ? "#eab308" : "#ef4444", 
                        fontWeight: 600,
                        textTransform: "capitalize"
                      }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
                    {item.amount} cr
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions / Promotion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{
            background: "linear-gradient(135deg, rgba(108,71,255,0.15), rgba(168,85,247,0.15))", 
            border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: "24px", padding: "32px", backdropFilter: "blur(10px)",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "rgba(168,85,247,0.4)", filter: "blur(50px)", pointerEvents: "none" }} />
            
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "0 0 12px 0", position: "relative", zIndex: 1 }}>
              Upgrade to Creator
            </h3>
            <p style={{ color: "#d4d4e0", fontSize: "14px", lineHeight: 1.6, margin: "0 0 24px 0", position: "relative", zIndex: 1 }}>
              Have a brilliant idea? Upgrade your account to Creator and start your own crowdfunding campaign today.
            </p>
            <Link href="/dashboard/supporter/settings" style={{ textDecoration: "none" }}>
              <button style={{
                background: "#fff", color: "#13131f", border: "none",
                padding: "12px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                cursor: "pointer", position: "relative", zIndex: 1,
                boxShadow: "0 4px 14px rgba(255,255,255,0.2)", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
              >
                Become a Creator
              </button>
            </Link>
          </div>

          <div style={{
            background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)", flex: 1
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 16px 0" }}>Your Impact</h3>
            <p style={{ color: "#8b8ba8", fontSize: "14px", lineHeight: 1.6, margin: "0 0 24px 0" }}>
              Thanks to your contributions, you have helped fund {stats.totalContributions} great ideas.
            </p>
            <div style={{ height: "160px", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", color: "#5a5a74" }}>
              <Target size={32} style={{ color: "#a855f7", opacity: 0.8 }} />
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#f1f1f5" }}>{stats.totalContributed} Credits</div>
              <div style={{ fontSize: "13px" }}>Total Impact Generated</div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
