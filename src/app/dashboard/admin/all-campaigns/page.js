"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, CheckCircle, XCircle, Clock, Loader2, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const STATUS_CONFIG = {
  approved: { label: "Approved", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  pending:  { label: "Pending",  color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.2)" },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.2)" },
  completed:{ label: "Completed",color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.2)" },
};

const FILTERS = ["all", "pending", "approved", "rejected"];

export default function AllCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // track which campaign is being actioned
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Reject modal state
  const [rejectModal, setRejectModal] = useState({ open: false, campaign: null });
  const [rejectReason, setRejectReason] = useState("");

  const fetchCampaigns = async (status = "all") => {
    try {
      setLoading(true);
      const params = status !== "all" ? `?status=${status}` : "";
      const res = await api.get(`/api/admin/campaigns${params}`);
      const data = res.data.data;
      setCampaigns(data);
      setFiltered(data);
    } catch (err) {
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(campaigns);
    } else {
      const q = search.toLowerCase();
      setFiltered(campaigns.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.creator?.name?.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      ));
    }
  }, [search, campaigns]);

  const handleApprove = async (campaign) => {
    setActionLoading(campaign._id + "-approve");
    try {
      await api.patch(`/api/admin/campaigns/${campaign._id}/status`, { status: "approved" });
      toast.success(`"${campaign.title}" approved & is now live!`);
      fetchCampaigns(activeFilter);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (campaign) => {
    setRejectModal({ open: true, campaign });
    setRejectReason("");
  };

  const handleReject = async () => {
    const { campaign } = rejectModal;
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setActionLoading(campaign._id + "-reject");
    try {
      await api.patch(`/api/admin/campaigns/${campaign._id}/status`, {
        status: "rejected",
        rejectionReason: rejectReason,
      });
      toast.success(`"${campaign.title}" has been rejected.`);
      setRejectModal({ open: false, campaign: null });
      fetchCampaigns(activeFilter);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = campaigns.filter(c => c.status === "pending").length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>All Campaigns</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>
            Review submissions and moderate platform campaigns.
            {pendingCount > 0 && (
              <span style={{ marginLeft: "12px", background: "rgba(245,158,11,0.15)", color: "#f59e0b", padding: "2px 10px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 }}>
                {pendingCount} pending
              </span>
            )}
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            style={{
              background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
              padding: "10px 14px 10px 38px", borderRadius: "10px", color: "#f1f1f5",
              fontSize: "14px", outline: "none", width: "220px", transition: "all 0.2s"
            }}
            onFocus={e => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
            onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: "8px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
              border: activeFilter === f ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.08)",
              background: activeFilter === f ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.03)",
              color: activeFilter === f ? "#a855f7" : "#8b8ba8",
              transition: "all 0.2s", textTransform: "capitalize"
            }}
          >
            {f === "all" ? "All Campaigns" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", overflow: "hidden", backdropFilter: "blur(10px)", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px", gap: "12px" }}>
            <Loader2 className="animate-spin" size={28} style={{ color: "#a855f7" }} />
            <span style={{ color: "#8b8ba8", fontSize: "16px" }}>Loading campaigns...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px", gap: "12px" }}>
            <AlertCircle size={40} style={{ color: "#5a5a74" }} />
            <p style={{ color: "#8b8ba8", fontSize: "16px", margin: 0 }}>No campaigns found.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Campaign", "Creator", "Goal", "Status", "Actions"].map((h, i) => (
                    <th key={h} style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.8px", textAlign: i === 4 ? "right" : "left" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((campaign) => {
                    const statusCfg = STATUS_CONFIG[campaign.status] || STATUS_CONFIG.pending;
                    const isApprovingThis = actionLoading === campaign._id + "-approve";
                    const isRejectingThis = actionLoading === campaign._id + "-reject";

                    return (
                      <motion.tr
                        key={campaign._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "16px 20px", maxWidth: "260px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {campaign.coverImage && (
                              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `url(${campaign.coverImage}) center/cover`, flexShrink: 0 }} />
                            )}
                            <div>
                              <div style={{ fontSize: "14px", fontWeight: 700, color: "#f1f1f5", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "180px" }}>{campaign.title}</div>
                              <div style={{ fontSize: "12px", color: "#a855f7", fontWeight: 600, textTransform: "capitalize" }}>{campaign.category}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {campaign.creator?.image ? (
                              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: `url(${campaign.creator.image}) center/cover`, flexShrink: 0 }} />
                            ) : (
                              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #6c47ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: 800 }}>
                                {campaign.creator?.name?.[0]?.toUpperCase()}
                              </div>
                            )}
                            <span style={{ fontSize: "14px", color: "#d4d4e0", fontWeight: 600, whiteSpace: "nowrap" }}>{campaign.creator?.name || "Unknown"}</span>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: "14px", color: "#d4d4e0", fontWeight: 600 }}>
                          {campaign.goalAmount?.toLocaleString()} credits
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.border}` }}>
                            {campaign.status === "pending" && <Clock size={11} />}
                            {campaign.status === "approved" && <CheckCircle size={11} />}
                            {campaign.status === "rejected" && <XCircle size={11} />}
                            {statusCfg.label}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", alignItems: "center" }}>
                            {campaign.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(campaign)}
                                  disabled={!!actionLoading}
                                  title="Approve Campaign"
                                  style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981", cursor: actionLoading ? "not-allowed" : "pointer", padding: "7px 12px", borderRadius: "8px", transition: "all 0.2s", fontSize: "13px", fontWeight: 700 }}
                                  onMouseEnter={e => { if (!actionLoading) e.currentTarget.style.background = "rgba(16,185,129,0.2)"; }}
                                  onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.1)"}
                                >
                                  {isApprovingThis ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                  Approve
                                </button>
                                <button
                                  onClick={() => openRejectModal(campaign)}
                                  disabled={!!actionLoading}
                                  title="Reject Campaign"
                                  style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444", cursor: actionLoading ? "not-allowed" : "pointer", padding: "7px 12px", borderRadius: "8px", transition: "all 0.2s", fontSize: "13px", fontWeight: 700 }}
                                  onMouseEnter={e => { if (!actionLoading) e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                                  onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                                >
                                  {isRejectingThis ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                                  Reject
                                </button>
                              </>
                            )}
                            <Link href={`/campaigns/${campaign._id}`} target="_blank">
                              <button title="View Campaign" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#8b8ba8", cursor: "pointer", padding: "7px", borderRadius: "8px", transition: "all 0.2s", display: "flex" }}
                                onMouseEnter={e => { e.currentTarget.style.color = "#a855f7"; e.currentTarget.style.background = "rgba(108,71,255,0.1)"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "#8b8ba8"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                                <Eye size={16} />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rejection Reason Modal */}
      <AnimatePresence>
        {rejectModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
            onClick={() => setRejectModal({ open: false, campaign: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "rgba(19,19,31,0.98)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "460px", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#f1f1f5", margin: "0 0 4px 0" }}>Reject Campaign</h2>
                  <p style={{ color: "#8b8ba8", fontSize: "14px", margin: 0 }}>"{rejectModal.campaign?.title}"</p>
                </div>
                <button onClick={() => setRejectModal({ open: false, campaign: null })} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#8b8ba8", cursor: "pointer", padding: "8px", borderRadius: "10px", display: "flex" }}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Reason for Rejection *</label>
                <textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="Explain why this campaign is being rejected. The creator will be notified."
                  rows={4}
                  style={{ width: "100%", padding: "14px 16px", background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#f1f1f5", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setRejectModal({ open: false, campaign: null })}
                  style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#d4d4e0", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!!actionLoading || !rejectReason.trim()}
                  style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "none", background: actionLoading ? "rgba(239,68,68,0.5)" : "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff", fontSize: "14px", fontWeight: 800, cursor: actionLoading || !rejectReason.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
