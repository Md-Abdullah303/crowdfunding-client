"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Target, Coins } from "lucide-react";

// Placeholder data — will be replaced by API call in Step 4/5
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
  environment: { bg: "rgba(34,197,94,0.12)", text: "#22c55e", border: "rgba(34,197,94,0.2)" },
  technology: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.2)" },
  arts: { bg: "rgba(168,85,247,0.12)", text: "#c084fc", border: "rgba(168,85,247,0.2)" },
  community: { bg: "rgba(245,158,11,0.12)", text: "#fbbf24", border: "rgba(245,158,11,0.2)" },
  health: { bg: "rgba(239,68,68,0.12)", text: "#f87171", border: "rgba(239,68,68,0.2)" },
  education: { bg: "rgba(20,184,166,0.12)", text: "#2dd4bf", border: "rgba(20,184,166,0.2)" },
  business: { bg: "rgba(255,107,53,0.12)", text: "#ff8c5a", border: "rgba(255,107,53,0.2)" },
  other: { bg: "rgba(139,139,168,0.12)", text: "#8b8ba8", border: "rgba(139,139,168,0.2)" },
};

function getDaysLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function CampaignCard({ campaign, index }) {
  const progress = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));
  const daysLeft = getDaysLeft(campaign.deadline);
  const cat = CATEGORY_COLORS[campaign.category] || CATEGORY_COLORS.other;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group cursor-pointer"
      style={{
        background: "rgba(15,15,26,0.8)",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        height: "400px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
      }}
    >
      <Link href={`/campaigns/${campaign.id}`} style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}>
        
        {/* Top Image Section */}
        <div style={{ position: "relative", height: "220px", width: "100%", overflow: "hidden" }}>
          <img
            src={campaign.coverImage}
            alt={campaign.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
            className="group-hover:scale-110"
          />
          
          {/* Top Badges */}
          <div style={{ position: "absolute", top: "16px", left: "16px" }}>
            <span style={{ 
              background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`,
              padding: "6px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", backdropFilter: "blur(4px)"
            }}>
              {campaign.category}
            </span>
          </div>
          
          <div style={{ 
            position: "absolute", top: "16px", right: "16px",
            background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff",
            padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", backdropFilter: "blur(4px)"
          }}>
            <Clock size={14} style={{ color: "#a855f7" }} />
            {daysLeft}d left
          </div>
        </div>

        {/* Bottom Content Section */}
        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", background: "linear-gradient(180deg, rgba(15,15,26,0) 0%, rgba(9,9,15,0.8) 100%)" }}>
          <h3 style={{ 
            fontSize: "20px", fontWeight: 700, color: "#f1f1f5", margin: "0 0 10px 0", lineHeight: 1.35,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
          }}
          className="group-hover:text-[#a855f7] transition-colors"
          >
            {campaign.title}
          </h3>
          
          <p style={{ fontSize: "14px", color: "#8b8ba8", margin: "0 0 16px 0" }}>
            by <span style={{ color: "#d4d4e0", fontWeight: 600 }}>{campaign.creator.name}</span>
          </p>

          <div style={{ marginTop: "auto" }}>
            {/* Custom Progress Bar */}
            <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "6px", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ 
                height: "100%", width: `${progress}%`,
                background: "linear-gradient(90deg, #6c47ff, #a855f7)", borderRadius: "6px",
                boxShadow: "0 0 12px rgba(168,85,247,0.6)"
              }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#f1f1f5", fontSize: "14px", fontWeight: 700 }}>
                <Coins size={14} style={{ color: "#a855f7" }} />
                ${campaign.raisedAmount.toLocaleString()} <span style={{ color: "#8b8ba8", fontSize: "12px", fontWeight: 500 }}>raised</span>
              </div>
              <div style={{ color: "#a855f7", fontSize: "14px", fontWeight: 700 }}>
                {progress}% <span style={{ color: "#8b8ba8", fontSize: "12px", fontWeight: 500 }}>of goal</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function TopCampaigns() {
  return (
    <section className="section" id="top-campaigns">
      <div className="container ">
        {/* Section Header */}
        <div className="flex items-end gap-4 justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-primary mb-3">🔥 Top Funded</span>
            <h2
              className="text-3xl md:text-4xl font-black text-[#f1f1f5] leading-tight"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Campaigns Making <br />
              <span className="gradient-text">an Impact</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/campaigns" className="btn-secondary text-sm hidden md:flex">
              View All <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CAMPAIGNS.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/campaigns" className="btn-secondary">
            View All Campaigns <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
