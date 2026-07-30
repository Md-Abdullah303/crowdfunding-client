"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Target, Coins } from "lucide-react";

const MOCK_CAMPAIGNS = [
  {
    id: "1",
    title: "EcoCharge — Solar Powered Community Hub",
    category: "environment",
    coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60",
    goalAmount: 10000,
    raisedAmount: 8420,
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    creator: { name: "Sarah Green" },
  },
  {
    id: "2",
    title: "NeuralNote — AI Study Companion for Students",
    category: "technology",
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=60",
    goalAmount: 5000,
    raisedAmount: 4920,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    creator: { name: "Alex Park" },
  },
  {
    id: "3",
    title: "ArtVault — Digital Gallery for Independent Artists",
    category: "arts",
    coverImage: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&auto=format&fit=crop&q=60",
    goalAmount: 3000,
    raisedAmount: 2880,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    creator: { name: "Maya Liu" },
  },
  {
    id: "4",
    title: "CommuniLink — Local Volunteer Network App",
    category: "community",
    coverImage: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=60",
    goalAmount: 4000,
    raisedAmount: 3600,
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    creator: { name: "James Carter" },
  },
  {
    id: "5",
    title: "MediAssist — AI Health Symptom Checker",
    category: "health",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60",
    goalAmount: 8000,
    raisedAmount: 6200,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    creator: { name: "Dr. Priya Shah" },
  },
  {
    id: "6",
    title: "LearnBridge — Free Coding Bootcamp for Rural Youth",
    category: "education",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    goalAmount: 6000,
    raisedAmount: 5800,
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    creator: { name: "Nadia Rahman" },
  },
];

const CATEGORY_COLORS = {
  environment: { bg: "rgba(34,197,94,0.15)", text: "#22c55e", border: "rgba(34,197,94,0.3)" },
  technology:  { bg: "rgba(59,130,246,0.15)", text: "#60a5fa", border: "rgba(59,130,246,0.3)" },
  arts:        { bg: "rgba(168,85,247,0.15)", text: "#c084fc", border: "rgba(168,85,247,0.3)" },
  community:   { bg: "rgba(245,158,11,0.15)", text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  health:      { bg: "rgba(239,68,68,0.15)",  text: "#f87171", border: "rgba(239,68,68,0.3)"  },
  education:   { bg: "rgba(20,184,166,0.15)", text: "#2dd4bf", border: "rgba(20,184,166,0.3)" },
  other:       { bg: "rgba(139,139,168,0.15)","text": "#8b8ba8", border: "rgba(139,139,168,0.3)" },
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: hovered
          ? "rgba(108,71,255,0.06)"
          : "rgba(19,19,31,0.7)",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        border: hovered
          ? "1px solid rgba(168,85,247,0.35)"
          : "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 20px 60px rgba(108,71,255,0.2)"
          : "0 8px 30px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Link href={`/campaigns/${campaign.id}`} style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", color: "inherit" }}>

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
          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to top, #0b0b14 0%, rgba(11,11,20,0.4) 50%, transparent 100%)",
          }} />

          {/* Category badge */}
          <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 2 }}>
            <span style={{
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              background: cat.bg,
              color: cat.text,
              border: `1px solid ${cat.border}`,
              backdropFilter: "blur(10px)",
            }}>
              {campaign.category}
            </span>
          </div>

          {/* Days left */}
          <div style={{
            position: "absolute", top: "14px", right: "14px", zIndex: 2,
            background: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backdropFilter: "blur(10px)",
          }}>
            <Clock size={13} style={{ color: "#a855f7" }} />
            {daysLeft}d left
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: "20px 22px 22px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
          marginTop: "-20px",
        }}>
          <h3 style={{
            fontSize: "17px",
            fontWeight: 800,
            color: hovered ? "transparent" : "#f1f1f5",
            background: hovered ? "linear-gradient(135deg, #a855f7, #6c47ff)" : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset",
            WebkitTextFillColor: hovered ? "transparent" : "unset",
            marginBottom: "12px",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            transition: "all 0.3s ease",
            fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
          }}>
            {campaign.title}
          </h3>

          {/* Creator */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "linear-gradient(135deg, #6c47ff, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 800, color: "#fff", flexShrink: 0,
            }}>
              {campaign.creator.name.charAt(0)}
            </div>
            <p style={{ fontSize: "13px", color: "#8b8ba8", margin: 0 }}>
              by <span style={{ color: "#d4d4e0", fontWeight: 600 }}>{campaign.creator.name}</span>
            </p>
          </div>

          {/* Stats */}
          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "10px" }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Raised</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "17px", fontWeight: 800, color: "#10b981" }}>
                  <Coins size={14} />
                  ${campaign.raisedAmount.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Goal</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end", fontSize: "17px", fontWeight: 800, color: "#f1f1f5" }}>
                  <Target size={14} style={{ color: "#a855f7" }} />
                  ${campaign.goalAmount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              width: "100%", height: "8px", background: "rgba(255,255,255,0.07)",
              borderRadius: "999px", overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                  height: "100%",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #6c47ff, #a855f7)",
                  position: "relative",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, right: 0, bottom: 0, width: "40px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35))",
                  borderRadius: "999px",
                }} />
              </motion.div>
            </div>

            <div style={{
              marginTop: "6px", textAlign: "right",
              fontSize: "11px", fontWeight: 800,
              color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              {progress}% Funded
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function TopCampaigns() {
  return (
    <section
      id="top-campaigns"
      style={{
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG glow orbs */}
      <div style={{ position: "absolute", top: "20%", right: "-8%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px", gap: "16px", flexWrap: "wrap" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-primary" style={{ marginBottom: "14px", display: "inline-flex", fontSize: "12px" }}>🔥 Top Funded</span>
            <h2 style={{
              fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "#f1f1f5",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}>
              Campaigns Making <br />
              <span style={{
                background: "linear-gradient(135deg, #6c47ff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                an Impact
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/campaigns"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "999px",
                border: "1px solid rgba(108,71,255,0.4)",
                color: "#a78bfa",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                background: "rgba(108,71,255,0.08)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(108,71,255,0.18)";
                e.currentTarget.style.borderColor = "rgba(108,71,255,0.7)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(108,71,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(108,71,255,0.4)";
              }}
            >
              View All <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {MOCK_CAMPAIGNS.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
