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
      className="group cursor-pointer flex flex-col h-full bg-[#0f0f1a]/80 rounded-[20px] border border-white/5 overflow-hidden shadow-lg hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/campaigns/${campaign.id}`} className="flex flex-col h-full">
        
        {/* Top Image Section */}
        <div className="relative h-[180px] w-full overflow-hidden shrink-0">
          <img
            src={campaign.coverImage}
            alt={campaign.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          <div className="absolute top-3 left-3">
            <span 
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border"
              style={{ background: cat.bg, color: cat.text, borderColor: cat.border }}
            >
              {campaign.category}
            </span>
          </div>
          
          <div className="absolute top-3 right-3 bg-black/70 border border-white/10 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 backdrop-blur-sm">
            <Clock size={12} className="text-[#a855f7]" />
            {daysLeft}d left
          </div>
        </div>

        {/* Bottom Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-[17px] font-bold text-[#f1f1f5] mb-1.5 leading-snug line-clamp-2 overflow-hidden group-hover:text-[#a855f7] transition-colors">
            {campaign.title}
          </h3>
          
          <p className="text-[13px] text-[#8b8ba8] mb-4">
            by <span className="text-[#d4d4e0] font-semibold">{campaign.creator.name}</span>
          </p>

          <div className="mt-auto">
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-[#8b8ba8] text-[11px] font-medium mb-0.5 uppercase tracking-wide">Raised</div>
                <div className="flex items-center gap-1 text-[#10b981] text-[15px] font-bold">
                  <Coins size={14} />
                  ${campaign.raisedAmount.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#8b8ba8] text-[11px] font-medium mb-0.5 uppercase tracking-wide">Goal</div>
                <div className="text-[#f1f1f5] text-[15px] font-bold">
                  {progress}%
                </div>
              </div>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#6c47ff] to-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                style={{ width: `${progress}%` }} 
              />
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
