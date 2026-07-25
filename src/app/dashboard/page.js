"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Heart, 
  Target, 
  Calendar,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

// Dummy Data for Supporter
const supporterStats = [
  { label: "Total Contributed", value: "$1,250", icon: <TrendingUp size={20} />, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { label: "Campaigns Supported", value: "8", icon: <Heart size={20} />, color: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
  { label: "Active Goals", value: "3", icon: <Target size={20} />, color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
];

const recentContributions = [
  { id: 1, title: "Eco-friendly Tech Gadget", amount: "$150", date: "2 days ago", status: "Success", image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 2, title: "Indie Game Development", amount: "$50", date: "1 week ago", status: "In Progress", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 3, title: "Community Garden Project", amount: "$25", date: "2 weeks ago", status: "Success", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=100&h=100" },
];

function SupporterDashboard({ user }) {

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
            <Link href="/dashboard/contributions" style={{ fontSize: "13px", color: "#a855f7", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentContributions.map((item) => (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", gap: "16px", padding: "16px",
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "16px", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)" }}
              >
                <div style={{ width: "50px", height: "50px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: 600, color: "#f1f1f5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px", color: "#8b8ba8", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={12} /> {item.date}
                    </span>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#5a5a74" }} />
                    <span style={{ fontSize: "12px", color: item.status === "Success" ? "#10b981" : "#eab308", fontWeight: 600 }}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>
                  {item.amount}
                </div>
              </div>
            ))}
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
          </div>

          <div style={{
            background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)", flex: 1
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 16px 0" }}>Your Impact</h3>
            <p style={{ color: "#8b8ba8", fontSize: "14px", lineHeight: 1.6, margin: "0 0 24px 0" }}>
              Thanks to your contributions, 8 projects have reached their funding goals and are now in production.
            </p>
            <div style={{ height: "160px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#5a5a74", fontSize: "13px" }}>
              [ Impact Chart Placeholder ]
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// Dummy Data for Creator
const creatorStats = [
  { label: "Total Raised", value: "$4,500", icon: <TrendingUp size={20} />, color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  { label: "Active Campaigns", value: "2", icon: <Target size={20} />, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { label: "Total Backers", value: "128", icon: <Heart size={20} />, color: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
];

function CreatorDashboard({ user }) {
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
        
        <Link href="/dashboard/my-campaigns/new" style={{
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

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  if (user?.role === "creator") {
    return <CreatorDashboard user={user} />;
  }
  return <SupporterDashboard user={user} />;
}
