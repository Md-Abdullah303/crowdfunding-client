"use client";

import { motion } from "framer-motion";
import { Search, Filter, ExternalLink, Calendar, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dummy Data
const contributions = [
  { id: 1, title: "Eco-friendly Tech Gadget", amount: "$150", date: "Oct 24, 2026", status: "Success", progress: 100, image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=200&h=150" },
  { id: 2, title: "Indie Game Development", amount: "$50", date: "Oct 18, 2026", status: "In Progress", progress: 65, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200&h=150" },
  { id: 3, title: "Community Garden Project", amount: "$25", date: "Oct 10, 2026", status: "Success", progress: 120, image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=200&h=150" },
  { id: 4, title: "Smart Home Security System", amount: "$300", date: "Sep 28, 2026", status: "Failed", progress: 45, image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=200&h=150" },
];

export default function ContributionsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>My Contributions</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Track and manage all the campaigns you've supported.</p>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
            <input 
              type="text" 
              placeholder="Search contributions..." 
              style={{
                background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                padding: "10px 14px 10px 38px", borderRadius: "10px", color: "#f1f1f5",
                fontSize: "14px", outline: "none", width: "240px", transition: "all 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
            />
          </div>
          <button style={{
            background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 14px", borderRadius: "10px", color: "#f1f1f5", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15,15,26,0.6)"}
          >
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {contributions.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            style={{
              background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "20px", display: "flex", gap: "24px",
              backdropFilter: "blur(10px)", alignItems: "center", flexWrap: "wrap"
            }}
          >
            <div style={{ width: "160px", height: "110px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
              <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            
            <div style={{ flex: 1, minWidth: "250px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#fff" }}>{item.title}</h3>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "#10b981" }}>{item.amount}</span>
              </div>
              
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8b8ba8", fontSize: "13px" }}>
                  <Calendar size={14} /> {item.date}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px",
                  color: item.status === "Success" ? "#10b981" : item.status === "In Progress" ? "#a855f7" : "#ef4444" }}>
                  {item.status === "Success" ? <CheckCircle2 size={14} /> : item.status === "In Progress" ? <Clock size={14} /> : <Clock size={14} />}
                  {item.status}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#8b8ba8", marginBottom: "6px", fontWeight: 600 }}>
                  <span>Campaign Progress</span>
                  <span style={{ color: item.progress >= 100 ? "#10b981" : "#f1f1f5" }}>{item.progress}%</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ 
                    height: "100%", 
                    width: `${Math.min(item.progress, 100)}%`, 
                    background: item.progress >= 100 ? "#10b981" : "linear-gradient(90deg, #6c47ff, #a855f7)",
                    borderRadius: "3px" 
                  }} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "140px", marginLeft: "auto" }}>
              <Link href={`/campaigns/${item.id}`} style={{
                padding: "10px 16px", borderRadius: "10px", background: "rgba(108,71,255,0.1)",
                border: "1px solid rgba(108,71,255,0.3)", color: "#a855f7", fontSize: "13px", fontWeight: 600,
                textAlign: "center", textDecoration: "none", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(108,71,255,0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(108,71,255,0.1)"}
              >
                View Campaign
              </Link>
              <button style={{
                padding: "10px 16px", borderRadius: "10px", background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)", color: "#d4d4e0", fontSize: "13px", fontWeight: 600,
                textAlign: "center", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Receipt <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
