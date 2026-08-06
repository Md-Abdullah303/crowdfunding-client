"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, Loader2, AlertCircle, Wallet } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const STATUS = {
  pending:  { label: "Pending",  color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", icon: <Clock size={11} /> },
  approved: { label: "Approved", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", icon: <CheckCircle size={11} /> },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.2)",  icon: <XCircle size={11} /> },
};

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("pending");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchWithdrawals = async (status = "pending") => {
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/withdrawals?status=${status}`);
      setWithdrawals(res.data.data);
    } catch {
      toast.error("Failed to load withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWithdrawals(activeFilter); }, [activeFilter]);

  const handleAction = async (id, status) => {
    setActionLoading(id + "-" + status);
    try {
      await api.patch(`/api/admin/withdrawals/${id}/status`, { status });
      toast.success(`Withdrawal ${status}! Creator has been notified.`);
      fetchWithdrawals(activeFilter);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = withdrawals.filter(w => w.status === "pending").length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Withdrawal Requests</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>
          Review and process creator withdrawal requests.
          {pendingCount > 0 && (
            <span style={{ marginLeft: "12px", background: "rgba(245,158,11,0.15)", color: "#f59e0b", padding: "2px 10px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 }}>
              {pendingCount} pending
            </span>
          )}
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {["pending", "approved", "rejected", "all"].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            style={{ padding: "8px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: activeFilter === f ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.08)", background: activeFilter === f ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.03)", color: activeFilter === f ? "#a855f7" : "#8b8ba8", transition: "all 0.2s", textTransform: "capitalize" }}>
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", overflow: "hidden", backdropFilter: "blur(10px)", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px" }}>
            <Loader2 className="animate-spin" size={28} style={{ color: "#a855f7" }} />
          </div>
        ) : withdrawals.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px", gap: "12px" }}>
            <Wallet size={40} style={{ color: "#5a5a74" }} />
            <p style={{ color: "#8b8ba8", fontSize: "16px", margin: 0 }}>No {activeFilter !== "all" ? activeFilter : ""} withdrawal requests found.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Creator", "Amount", "Payment Method", "Details/Note", "Status", "Actions"].map((h, i) => (
                    <th key={h} style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.8px", textAlign: i === 5 ? "right" : "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {withdrawals.map(w => {
                    const s = STATUS[w.status] || STATUS.pending;
                    return (
                      <motion.tr key={w._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: w.creator?.image ? `url(${w.creator.image}) center/cover` : "linear-gradient(135deg, #6c47ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 800, flexShrink: 0 }}>
                              {!w.creator?.image && w.creator?.name?.[0]?.toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", fontWeight: 700, color: "#f1f1f5" }}>{w.creator?.name}</div>
                              <div style={{ fontSize: "12px", color: "#8b8ba8" }}>{w.creator?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontSize: "16px", fontWeight: 800, color: "#10b981" }}>{w.amountCredits} cr</div>
                          <div style={{ fontSize: "13px", color: "#8b8ba8" }}>${w.amountUSD?.toFixed(2)}</div>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: "#d4d4e0", textTransform: "capitalize" }}>
                          {w.paymentMethod}
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: "13px", color: "#8b8ba8", maxWidth: "180px" }}>
                          <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.note || "—"}</span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                            {s.icon} {s.label}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          {w.status === "pending" && (
                            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                              <button onClick={() => handleAction(w._id, "approved")} disabled={!!actionLoading}
                                style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981", cursor: actionLoading ? "not-allowed" : "pointer", padding: "7px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: 700 }}>
                                {actionLoading === w._id + "-approved" ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />} Approve
                              </button>
                              <button onClick={() => handleAction(w._id, "rejected")} disabled={!!actionLoading}
                                style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444", cursor: actionLoading ? "not-allowed" : "pointer", padding: "7px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: 700 }}>
                                {actionLoading === w._id + "-rejected" ? <Loader2 size={13} className="animate-spin" /> : <XCircle size={13} />} Reject
                              </button>
                            </div>
                          )}
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
    </motion.div>
  );
}
