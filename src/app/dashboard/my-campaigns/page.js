"use client";

import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, TrendingUp, Users, Target } from "lucide-react";
import Link from "next/link";

// Dummy Data
const myCampaigns = [
  { id: 1, title: "Next-Gen Smart Watch", category: "Technology", raised: "$12,400", goal: "$15,000", backers: 145, daysLeft: 12, status: "Active", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200&h=150" },
  { id: 2, title: "Artisan Coffee Roaster", category: "Food & Craft", raised: "$8,500", goal: "$8,000", backers: 95, daysLeft: 0, status: "Funded", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=200&h=150" },
  { id: 3, title: "Eco-Friendly Backpack", category: "Fashion", raised: "$2,100", goal: "$10,000", backers: 42, daysLeft: 28, status: "Active", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200&h=150" },
];

export default function MyCampaignsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>My Campaigns</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Manage and track the performance of your active projects.</p>
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
          <Link href="/dashboard/my-campaigns/new" style={{
            background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
            padding: "10px 18px", borderRadius: "10px", color: "#fff", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, transition: "transform 0.2s", textDecoration: "none", fontSize: "14px", boxShadow: "0 4px 14px rgba(108,71,255,0.3)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            <Plus size={16} /> New Campaign
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gap: "24px" }}>
        {myCampaigns.map((campaign, i) => {
          const progress = Math.min(100, Math.round((parseInt(campaign.raised.replace(/\$|,/g, "")) / parseInt(campaign.goal.replace(/\$|,/g, ""))) * 100));
          const isFunded = campaign.status === "Funded";
          
          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              style={{
                background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px", padding: "24px", display: "flex", gap: "24px",
                backdropFilter: "blur(10px)", alignItems: "stretch", flexWrap: "wrap",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
              }}
            >
              <div style={{ width: "220px", height: "150px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                <img src={campaign.image} alt={campaign.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "12px", left: "12px", background: isFunded ? "rgba(16,185,129,0.9)" : "rgba(168,85,247,0.9)", color: "#fff", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, backdropFilter: "blur(4px)" }}>
                  {campaign.status}
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#a855f7", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>{campaign.category}</span>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: 700, color: "#fff" }}>{campaign.title}</h3>
                    </div>
                    
                    <button style={{ background: "transparent", border: "none", color: "#8b8ba8", cursor: "pointer", padding: "4px" }}>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(16,185,129,0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#8b8ba8", fontWeight: 600 }}>RAISED</div>
                        <div style={{ fontSize: "15px", color: "#f1f1f5", fontWeight: 700 }}>{campaign.raised}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(244,63,94,0.1)", color: "#f43f5e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Users size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#8b8ba8", fontWeight: 600 }}>BACKERS</div>
                        <div style={{ fontSize: "15px", color: "#f1f1f5", fontWeight: 700 }}>{campaign.backers}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(168,85,247,0.1)", color: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Target size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#8b8ba8", fontWeight: 600 }}>GOAL</div>
                        <div style={{ fontSize: "15px", color: "#f1f1f5", fontWeight: 700 }}>{campaign.goal}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#8b8ba8", marginBottom: "8px", fontWeight: 600 }}>
                    <span>{progress}% Funded</span>
                    <span>{campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Ended"}</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ 
                      height: "100%", 
                      width: `${progress}%`, 
                      background: isFunded ? "#10b981" : "linear-gradient(90deg, #6c47ff, #a855f7)",
                      borderRadius: "3px" 
                    }} />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "140px", borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: "24px" }}>
                <button style={{
                  padding: "10px 16px", borderRadius: "10px", background: "rgba(108,71,255,0.1)",
                  border: "1px solid rgba(108,71,255,0.3)", color: "#a855f7", fontSize: "13px", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(108,71,255,0.2)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(108,71,255,0.1)"}
                >
                  <Eye size={16} /> View Details
                </button>
                <button style={{
                  padding: "10px 16px", borderRadius: "10px", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)", color: "#d4d4e0", fontSize: "13px", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button style={{
                  padding: "10px 16px", borderRadius: "10px", background: "transparent",
                  border: "none", color: "#ef4444", fontSize: "13px", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s", marginTop: "auto"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
