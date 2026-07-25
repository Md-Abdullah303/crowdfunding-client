"use client";

import { motion } from "framer-motion";
import { Search, Filter, Eye, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import Link from "next/link";

// Dummy Data
const allCampaigns = [
  { id: 1, title: "Next-Gen Smart Watch", creator: "TechNova Inc", category: "Technology", raised: "$12,400", status: "Active" },
  { id: 2, title: "Artisan Coffee Roaster", creator: "Sarah Smith", category: "Food & Craft", raised: "$8,500", status: "Pending Approval" },
  { id: 3, title: "Eco-Friendly Backpack", creator: "GreenLife", category: "Fashion", raised: "$2,100", status: "Active" },
  { id: 4, title: "Indie Board Game", creator: "GameStudio", category: "Games", raised: "$0", status: "Pending Approval" },
  { id: 5, title: "Smart Home Hub", creator: "TechNova Inc", category: "Technology", raised: "$45,000", status: "Funded" },
];

export default function AllCampaignsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>All Campaigns</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Monitor platform campaigns, approve new submissions, or take moderation actions.</p>
        </div>
        
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
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
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Campaign</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Creator</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCampaigns.map((campaign) => (
                <tr key={campaign.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{campaign.title}</div>
                    <div style={{ fontSize: "12px", color: "#a855f7", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{campaign.category} • Raised: {campaign.raised}</div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", color: "#d4d4e0", fontWeight: 600 }}>
                    {campaign.creator}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ 
                      padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700,
                      background: campaign.status === "Active" ? "rgba(16,185,129,0.1)" : campaign.status === "Pending Approval" ? "rgba(245,158,11,0.1)" : "rgba(168,85,247,0.1)",
                      color: campaign.status === "Active" ? "#10b981" : campaign.status === "Pending Approval" ? "#f59e0b" : "#a855f7"
                    }}>
                      {campaign.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      {campaign.status === "Pending Approval" && (
                        <>
                          <button style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", cursor: "pointer", padding: "6px", borderRadius: "6px", transition: "all 0.2s" }} title="Approve Campaign">
                            <CheckCircle size={16} />
                          </button>
                          <button style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer", padding: "6px", borderRadius: "6px", transition: "all 0.2s" }} title="Reject Campaign">
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      <button style={{ background: "transparent", border: "none", color: "#8b8ba8", cursor: "pointer", padding: "6px", borderRadius: "6px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#a855f7"; e.currentTarget.style.background = "rgba(108,71,255,0.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#8b8ba8"; e.currentTarget.style.background = "transparent"; }} title="View Campaign Details">
                        <Eye size={16} />
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
