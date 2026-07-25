"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Search, Download, Clock } from "lucide-react";

// Dummy Data
const transactions = [
  { id: "TRX-9823", type: "contribution", title: "Contribution: Eco-friendly Tech Gadget", amount: "-$150.00", date: "Oct 24, 2026, 14:30 PM", status: "Completed" },
  { id: "TRX-9822", type: "deposit", title: "Wallet Deposit", amount: "+$500.00", date: "Oct 20, 2026, 09:15 AM", status: "Completed" },
  { id: "TRX-9821", type: "contribution", title: "Contribution: Indie Game Development", amount: "-$50.00", date: "Oct 18, 2026, 11:45 AM", status: "Completed" },
  { id: "TRX-9820", type: "refund", title: "Refund: Cancelled Campaign", amount: "+$75.00", date: "Oct 12, 2026, 16:20 PM", status: "Completed" },
  { id: "TRX-9819", type: "contribution", title: "Contribution: Community Garden Project", amount: "-$25.00", date: "Oct 10, 2026, 10:05 AM", status: "Completed" },
  { id: "TRX-9818", type: "withdrawal", title: "Wallet Withdrawal", amount: "-$100.00", date: "Sep 05, 2026, 13:10 PM", status: "Pending" },
];

export default function HistoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Transaction History</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>View all your past transactions, deposits, and refunds.</p>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
            <input 
              type="text" 
              placeholder="Search ID or Title..." 
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
            background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
            padding: "10px 16px", borderRadius: "10px", color: "#fff", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, transition: "transform 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div style={{
        background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", padding: "12px 24px", backdropFilter: "blur(10px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)", overflowX: "auto"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
          <thead>
            <tr>
              <th style={{ padding: "20px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#5a5a74", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Transaction Details</th>
              <th style={{ padding: "20px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#5a5a74", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Date & Time</th>
              <th style={{ padding: "20px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#5a5a74", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Status</th>
              <th style={{ padding: "20px 16px", textAlign: "right", fontSize: "13px", fontWeight: 600, color: "#5a5a74", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => {
              const isPositive = trx.amount.startsWith("+");
              return (
                <tr key={trx.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "20px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "10px",
                        background: isPositive ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)",
                        color: isPositive ? "#10b981" : "#f43f5e",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        {isPositive ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <div>
                        <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: 600, color: "#f1f1f5" }}>{trx.title}</h4>
                        <span style={{ fontSize: "12px", color: "#8b8ba8" }}>{trx.id}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "20px 16px", fontSize: "14px", color: "#d4d4e0" }}>
                    {trx.date}
                  </td>
                  <td style={{ padding: "20px 16px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                      background: trx.status === "Completed" ? "rgba(16,185,129,0.1)" : "rgba(234,179,8,0.1)",
                      color: trx.status === "Completed" ? "#10b981" : "#eab308"
                    }}>
                      {trx.status === "Completed" ? <Clock size={12} style={{ display: "none" }} /> : <Clock size={12} />}
                      {trx.status}
                    </span>
                  </td>
                  <td style={{ padding: "20px 16px", textAlign: "right", fontSize: "16px", fontWeight: 700, color: isPositive ? "#10b981" : "#fff" }}>
                    {trx.amount}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
