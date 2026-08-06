"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, Target, Coins, Loader2, ArrowLeft, Heart, Share2, CalendarDays, X, Minus, Plus } from "lucide-react";
import api from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

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

// Contribution Modal
function ContributeModal({ campaign, userCredits, onClose, onSuccess }) {
  const [amount, setAmount] = useState(10);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const presets = [5, 10, 25, 50, 100];

  const handleSubmit = async () => {
    if (amount < 1) { toast.error("Minimum contribution is 1 credit"); return; }
    if (amount > userCredits) { toast.error(`Insufficient credits. You have ${userCredits} credits.`); return; }
    setLoading(true);
    try {
      await api.post("/api/contributions", { campaignId: campaign._id, amount, message });
      toast.success(`🎉 Successfully contributed ${amount} credits!`);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Contribution failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 22 }}
        onClick={e => e.stopPropagation()}
        style={{ background: "rgba(19,19,31,0.98)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "28px", padding: "36px", width: "100%", maxWidth: "480px", boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#f1f1f5", margin: "0 0 4px 0" }}>Back this Campaign</h2>
            <p style={{ fontSize: "13px", color: "#8b8ba8", margin: 0 }}>{campaign.title}</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#8b8ba8", cursor: "pointer", padding: "8px", borderRadius: "10px", display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        {/* Balance Banner */}
        <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "14px", padding: "14px 18px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#8b8ba8", fontSize: "14px", fontWeight: 600 }}>Your Balance</span>
          <span style={{ color: "#10b981", fontSize: "18px", fontWeight: 800 }}>{userCredits} Credits</span>
        </div>

        {/* Preset Amounts */}
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>Quick Select</p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {presets.map(p => (
            <button key={p} onClick={() => setAmount(p)}
              style={{ padding: "8px 16px", borderRadius: "10px", border: amount === p ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.08)", background: amount === p ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.03)", color: amount === p ? "#a855f7" : "#d4d4e0", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontSize: "14px" }}>
              {p}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>Custom Amount</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <button onClick={() => setAmount(a => Math.max(1, a - 1))} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#f1f1f5", cursor: "pointer", padding: "12px", borderRadius: "12px", display: "flex" }}>
            <Minus size={18} />
          </button>
          <input type="number" value={amount} min={1} max={userCredits}
            onChange={e => setAmount(Math.max(1, Math.min(userCredits, parseInt(e.target.value) || 1)))}
            style={{ flex: 1, textAlign: "center", padding: "14px", background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#f1f1f5", fontSize: "20px", fontWeight: 800, outline: "none" }}
            onFocus={e => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
          />
          <button onClick={() => setAmount(a => Math.min(userCredits, a + 1))} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#f1f1f5", cursor: "pointer", padding: "12px", borderRadius: "12px", display: "flex" }}>
            <Plus size={18} />
          </button>
        </div>

        {/* Message */}
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Leave an optional message for the creator..." rows={3}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#f1f1f5", fontSize: "14px", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit", marginBottom: "24px" }}
          onFocus={e => { e.currentTarget.style.borderColor = "#a855f7"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
        />

        <button onClick={handleSubmit} disabled={loading || amount < 1 || amount > userCredits}
          style={{ width: "100%", padding: "16px", borderRadius: "16px", background: loading || amount > userCredits ? "rgba(108,71,255,0.4)" : "linear-gradient(135deg, #a855f7, #6c47ff)", color: "#fff", fontSize: "16px", fontWeight: 800, border: "none", cursor: loading || amount > userCredits ? "not-allowed" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", boxShadow: "0 10px 25px rgba(108,71,255,0.3)" }}
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Heart size={20} />}
          {loading ? "Processing..." : `Contribute ${amount} Credits`}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const user = session?.user;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCampaign = async () => {
    try {
      const response = await api.get(`/api/campaigns/${id}`);
      if (response.data.success) {
        setCampaign(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch campaign details");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCampaign();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container" style={{ minHeight: "80vh", paddingTop: "80px" }}>
        <div style={{ textAlign: "center", padding: "40px", background: "rgba(239,68,68,0.1)", borderRadius: "16px", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>Error</h2>
          <p>{error || "Campaign not found"}</p>
          <Link href="/campaigns" style={{ display: "inline-block", marginTop: "20px", color: "#a855f7", textDecoration: "underline" }}>
            Return to Explore
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));
  const daysLeft = getDaysLeft(campaign.deadline);
  const cat = CATEGORY_COLORS[campaign.category] || CATEGORY_COLORS.other;
  const isSupporter = user?.role === "supporter";
  const canContribute = isSupporter && daysLeft > 0;

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", paddingBottom: "100px" }}>
      {/* Background elements */}
      <div style={{ position: "absolute", top: "0%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "40px" }}>
        
        {/* Back Link */}
        <Link href="/campaigns" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8b8ba8", fontWeight: 600, marginBottom: "30px", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#f1f1f5"} onMouseLeave={e => e.currentTarget.style.color = "#8b8ba8"}>
          <ArrowLeft size={18} />
          Back to Explore
        </Link>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          
          {/* Left Column: Image & Details */}
          <div style={{ flex: "1 1 60%" }}>
            
            {/* Category & Title */}
            <div style={{ marginBottom: "24px" }}>
              <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, marginBottom: "16px" }}>
                {campaign.category}
              </span>
              <h1 style={{ fontSize: "38px", fontWeight: 900, color: "#f1f1f5", lineHeight: 1.2, marginBottom: "16px" }}>
                {campaign.title}
              </h1>
              
              {/* Creator Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #6c47ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, color: "#fff" }}>
                  {campaign.creator?.name ? campaign.creator.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#8b8ba8", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>Created By</p>
                  <p style={{ fontSize: "16px", color: "#f1f1f5", fontWeight: 600, margin: 0 }}>{campaign.creator?.name || "Unknown Creator"}</p>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ width: "100%", height: "auto", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", marginBottom: "40px", position: "relative" }}>
              <img src={campaign.coverImage} alt={campaign.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </motion.div>

            {/* Description */}
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#f1f1f5", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>About this Campaign</h2>
              <div style={{ fontSize: "16px", color: "#a1a1aa", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                {campaign.description}
              </div>
            </div>
            
          </div>

          {/* Right Column: Funding Box */}
          <div style={{ flex: "1 1 40%", maxWidth: "450px" }}>
            <div style={{ position: "sticky", top: "100px", background: "rgba(19,19,31,0.6)", backdropFilter: "blur(20px)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.06)", padding: "32px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              
              {/* Progress */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "16px" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #6c47ff, #a855f7)", position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "40px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35))", borderRadius: "999px" }} />
                  </motion.div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "36px", fontWeight: 900, color: "#10b981", lineHeight: 1 }}>
                    {campaign.raisedAmount?.toLocaleString() || 0} credits
                  </span>
                  <span style={{ fontSize: "14px", color: "#8b8ba8", fontWeight: 600 }}>
                    of <span style={{ color: "#f1f1f5" }}>{campaign.goalAmount?.toLocaleString() || 0}</span>
                  </span>
                </div>
                <div style={{ marginTop: "8px", fontSize: "12px", fontWeight: 800, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.06em" }}>{progress}% Funded</div>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#a855f7", marginBottom: "8px" }}>
                    <Target size={18} />
                    <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Goal</span>
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#f1f1f5" }}>{campaign.goalAmount?.toLocaleString() || 0} cr</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#3b82f6", marginBottom: "8px" }}>
                    <Clock size={18} />
                    <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Time Left</span>
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#f1f1f5" }}>{daysLeft} Days</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#8b8ba8", fontSize: "14px", marginBottom: "32px", padding: "12px", background: "rgba(0,0,0,0.2)", borderRadius: "12px" }}>
                <CalendarDays size={16} />
                <span>Ends on {new Date(campaign.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              {/* Action Buttons */}
              {canContribute ? (
                <button onClick={() => setShowModal(true)} style={{ width: "100%", padding: "16px", borderRadius: "16px", background: "linear-gradient(135deg, #a855f7, #6c47ff)", color: "#fff", fontSize: "18px", fontWeight: 800, border: "none", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", boxShadow: "0 10px 25px rgba(108,71,255,0.3)", transition: "transform 0.2s, box-shadow 0.2s", marginBottom: "16px" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(108,71,255,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(108,71,255,0.3)"; }}>
                  <Heart size={20} />
                  Contribute Now
                </button>
              ) : !user ? (
                <Link href="/login" style={{ display: "block", textDecoration: "none", marginBottom: "16px" }}>
                  <div style={{ width: "100%", padding: "16px", borderRadius: "16px", background: "linear-gradient(135deg, #a855f7, #6c47ff)", color: "#fff", fontSize: "18px", fontWeight: 800, textAlign: "center", boxShadow: "0 10px 25px rgba(108,71,255,0.3)" }}>
                    Login to Contribute
                  </div>
                </Link>
              ) : (
                <div style={{ padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)", color: "#8b8ba8", textAlign: "center", fontSize: "14px", marginBottom: "16px" }}>
                  {daysLeft === 0 ? "⏰ This campaign has ended." : "Only Supporters can contribute to campaigns."}
                </div>
              )}

              <button onClick={handleShare} style={{ width: "100%", padding: "14px", borderRadius: "16px", background: "rgba(255,255,255,0.05)", color: "#f1f1f5", fontSize: "16px", fontWeight: 700, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                <Share2 size={18} />
                Share Campaign
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Contribute Modal */}
      <AnimatePresence>
        {showModal && (
          <ContributeModal
            campaign={campaign}
            userCredits={user?.credits || 0}
            onClose={() => setShowModal(false)}
            onSuccess={fetchCampaign}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
