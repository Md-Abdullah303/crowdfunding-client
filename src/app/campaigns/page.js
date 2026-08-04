"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Target, Coins, Search, Loader2 } from "lucide-react";
import api from "@/lib/axios";

const CATEGORY_COLORS = {
  environment: { bg: "rgba(34,197,94,0.15)", text: "#22c55e", border: "rgba(34,197,94,0.3)" },
  technology:  { bg: "rgba(59,130,246,0.15)", text: "#60a5fa", border: "rgba(59,130,246,0.3)" },
  arts:        { bg: "rgba(168,85,247,0.15)", text: "#c084fc", border: "rgba(168,85,247,0.3)" },
  community:   { bg: "rgba(245,158,11,0.15)", text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  health:      { bg: "rgba(239,68,68,0.15)",  text: "#f87171", border: "rgba(239,68,68,0.3)"  },
  education:   { bg: "rgba(20,184,166,0.15)", text: "#2dd4bf", border: "rgba(20,184,166,0.3)" },
  other:       { bg: "rgba(139,139,168,0.15)", text: "#8b8ba8", border: "rgba(139,139,168,0.3)" },
};

function getDaysLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function CampaignCard({ campaign, index }) {
  const [hovered, setHovered] = useState(false);
  const progress = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));
  const daysLeft = getDaysLeft(campaign.deadline);
  const cat = CATEGORY_COLORS[campaign.category] || CATEGORY_COLORS.other;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: hovered ? "rgba(108,71,255,0.06)" : "rgba(19,19,31,0.7)",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        border: hovered ? "1px solid rgba(168,85,247,0.35)" : "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        boxShadow: hovered ? "0 20px 60px rgba(108,71,255,0.2)" : "0 8px 30px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Link href={`/campaigns/${campaign._id}`} style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", color: "inherit" }}>
        {/* Image */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden", flexShrink: 0 }}>
          <img
            src={campaign.coverImage}
            alt={campaign.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.7s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              display: "block",
            }}
          />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, #0b0b14 0%, rgba(11,11,20,0.4) 50%, transparent 100%)" }} />

          {/* Category */}
          <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 2 }}>
            <span style={{
              padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
              background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, backdropFilter: "blur(10px)",
            }}>
              {campaign.category}
            </span>
          </div>

          {/* Days Left */}
          <div style={{
            position: "absolute", top: "14px", right: "14px", zIndex: 2,
            background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff",
            padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", backdropFilter: "blur(10px)",
          }}>
            <Clock size={13} style={{ color: "#a855f7" }} />
            {daysLeft}d left
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 2, marginTop: "-20px" }}>
          <h3 style={{
            fontSize: "17px", fontWeight: 800, color: hovered ? "transparent" : "#f1f1f5",
            background: hovered ? "linear-gradient(135deg, #a855f7, #6c47ff)" : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset", WebkitTextFillColor: hovered ? "transparent" : "unset",
            marginBottom: "12px", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", transition: "all 0.3s ease",
          }}>
            {campaign.title}
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #6c47ff, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "#fff", flexShrink: 0,
            }}>
              {campaign.creator?.name ? campaign.creator.name.charAt(0).toUpperCase() : "U"}
            </div>
            <p style={{ fontSize: "13px", color: "#8b8ba8", margin: 0 }}>
              by <span style={{ color: "#d4d4e0", fontWeight: 600 }}>{campaign.creator?.name || "Unknown"}</span>
            </p>
          </div>

          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "10px" }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Raised</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "17px", fontWeight: 800, color: "#10b981" }}>
                  <Coins size={14} />
                  ${campaign.raisedAmount?.toLocaleString() || 0}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Goal</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end", fontSize: "17px", fontWeight: 800, color: "#f1f1f5" }}>
                  <Target size={14} style={{ color: "#a855f7" }} />
                  ${campaign.goalAmount?.toLocaleString() || 0}
                </div>
              </div>
            </div>

            <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #6c47ff, #a855f7)", position: "relative" }}
              />
            </div>

            <div style={{ marginTop: "6px", textAlign: "right", fontSize: "11px", fontWeight: 800, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {progress}% Funded
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get("/api/campaigns");
        if (response.data.success) {
          setCampaigns(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch campaigns");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", paddingBottom: "100px" }}>
      {/* Background elements */}
      <div style={{ position: "absolute", top: "10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "60px" }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 style={{ fontSize: "42px", fontWeight: 900, marginBottom: "16px", color: "#fff", lineHeight: 1.1 }}>
              Explore <span style={{ background: "linear-gradient(135deg, #a855f7, #6c47ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Campaigns</span>
            </h1>
            <p style={{ color: "#8b8ba8", fontSize: "16px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
              Discover innovative projects, back creative minds, and help bring the future to life.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px", background: "rgba(239,68,68,0.1)", borderRadius: "16px", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
            <p>{error}</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px dashed rgba(255,255,255,0.1)" }}>
            <Search size={48} style={{ margin: "0 auto 20px", color: "#4f4f69" }} />
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#f1f1f5", marginBottom: "10px" }}>No campaigns found</h3>
            <p style={{ color: "#8b8ba8" }}>There are currently no active campaigns to display.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
          }}>
            {campaigns.map((campaign, idx) => (
              <CampaignCard key={campaign._id} campaign={campaign} index={idx} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
