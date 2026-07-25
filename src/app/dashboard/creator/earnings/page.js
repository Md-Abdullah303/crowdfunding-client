"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Download, Calendar, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";

// Dummy Data
const earningsStats = [
  { label: "Available Balance", value: "$3,250", change: "+$450 this week", icon: <DollarSign size={20} />, color: "#10b981", bg: "rgba(16,185,129,0.1)", trend: "up" },
  { label: "Total Earnings", value: "$12,400", change: "+15% from last month", icon: <TrendingUp size={20} />, color: "#a855f7", bg: "rgba(168,85,247,0.1)", trend: "up" },
  { label: "Pending Clearance", value: "$850", change: "Available in 3-5 days", icon: <Calendar size={20} />, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", trend: "neutral" },
];

const recentTransactions = [
  { id: 1, type: "withdrawal", title: "Bank Transfer (ending in 4829)", amount: "-$1,200", date: "Today, 10:30 AM", status: "Completed" },
  { id: 2, type: "earning", title: "Pledge: Eco-friendly Backpack", amount: "+$150", date: "Yesterday, 2:15 PM", status: "Cleared" },
  { id: 3, type: "earning", title: "Pledge: Artisan Coffee Roaster", amount: "+$50", date: "2 days ago", status: "Pending" },
  { id: 4, type: "withdrawal", title: "Bank Transfer (ending in 4829)", amount: "-$2,500", date: "Last week", status: "Completed" },
];

export default function EarningsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Earnings & Payouts</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Track your campaign earnings and manage withdrawals.</p>
        </div>
        
        <button style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          padding: "10px 18px", borderRadius: "10px", color: "#f1f1f5", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, transition: "all 0.2s", fontSize: "14px"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >
          <Download size={16} /> Download CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {earningsStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{
              background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "24px", display: "flex", alignItems: "center", gap: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)", backdropFilter: "blur(10px)"
            }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: stat.bg, color: stat.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#8b8ba8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</p>
              <h2 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#fff" }}>{stat.value}</h2>
              <p style={{ margin: 0, fontSize: "12px", color: stat.trend === "up" ? "#10b981" : "#8b8ba8", fontWeight: 600 }}>{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "flex-start" }}>
        
        {/* Recent Transactions */}
        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 24px 0" }}>Recent Transactions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentTransactions.map((tx) => (
              <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: tx.type === "earning" ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)", color: tx.type === "earning" ? "#10b981" : "#f43f5e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {tx.type === "earning" ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: 600, color: "#fff" }}>{tx.title}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#8b8ba8" }}>
                    <span>{tx.date}</span>
                    <span style={{
                      color: tx.status === "Completed" || tx.status === "Cleared" ? "#10b981" : "#f59e0b",
                      background: tx.status === "Completed" || tx.status === "Cleared" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                      padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600
                    }}>
                      {tx.status}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: tx.type === "earning" ? "#10b981" : "#fff" }}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw Panel */}
        <div style={{
          background: "linear-gradient(180deg, rgba(15,15,26,0.8) 0%, rgba(15,15,26,0.4) 100%)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)", position: "sticky", top: "24px"
        }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(108,71,255,0.1)", color: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <CreditCard size={24} />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 8px 0" }}>Withdraw Funds</h3>
          <p style={{ color: "#8b8ba8", fontSize: "13px", lineHeight: 1.6, margin: "0 0 24px 0" }}>
            Transfer your available balance to your connected bank account. Funds usually arrive in 1-3 business days.
          </p>
          
          <div style={{ background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "12px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: "12px", color: "#8b8ba8", fontWeight: 600, marginBottom: "4px" }}>AVAILABLE TO WITHDRAW</div>
            <div style={{ fontSize: "24px", color: "#10b981", fontWeight: 800 }}>$3,250.00</div>
          </div>

          <button style={{
            width: "100%", background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
            padding: "14px", borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: 700,
            cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 8px 24px rgba(108,71,255,0.3)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            Request Payout
          </button>
        </div>

      </div>
    </motion.div>
  );
}
