"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Clock, CheckCircle, XCircle, Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";

const STATUS = {
  pending:  { label: "Pending",  color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <Clock size={11} /> },
  approved: { label: "Approved", color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle size={11} /> },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)",  icon: <XCircle size={11} /> },
};

const LIMIT = 5;

export default function MyContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchContributions = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/contributions/my-contributions?page=${p}&limit=${LIMIT}`);
      setContributions(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch {
      toast.error("Failed to load contributions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContributions(page); }, [page, fetchContributions]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>My Contributions</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Track all the campaigns you have supported.</p>
        </div>
        {total > 0 && <span style={{ color: "#8b8ba8", fontSize: "14px" }}>{total} total contributions</span>}
      </div>

      <div style={{ background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", overflow: "hidden", backdropFilter: "blur(10px)", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px", gap: "12px" }}>
            <Loader2 className="animate-spin" size={28} style={{ color: "#a855f7" }} />
          </div>
        ) : contributions.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px", gap: "16px" }}>
            <Heart size={48} style={{ color: "#5a5a74" }} />
            <h3 style={{ color: "#f1f1f5", margin: "0 0 4px 0" }}>No contributions yet</h3>
            <p style={{ color: "#8b8ba8", margin: 0 }}>Support a campaign to see it here.</p>
            <Link href="/campaigns" style={{ marginTop: "8px", padding: "10px 24px", background: "linear-gradient(135deg, #a855f7, #6c47ff)", color: "#fff", borderRadius: "12px", fontWeight: 700, textDecoration: "none" }}>
              Explore Campaigns
            </Link>
          </div>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {["Campaign", "Amount", "Message", "Status", "Date"].map(h => (
                      <th key={h} style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.8px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contributions.map(c => {
                    const s = STATUS[c.status] || STATUS.pending;
                    return (
                      <tr key={c._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {c.campaign?.coverImage && (
                              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `url(${c.campaign.coverImage}) center/cover`, flexShrink: 0 }} />
                            )}
                            <div>
                              <Link href={`/campaigns/${c.campaign?._id}`} style={{ fontSize: "14px", fontWeight: 700, color: "#f1f1f5", textDecoration: "none", display: "block", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {c.campaign?.title || "Deleted Campaign"}
                              </Link>
                              <span style={{ fontSize: "11px", color: "#a855f7", fontWeight: 600, textTransform: "capitalize" }}>{c.campaign?.category}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ fontSize: "16px", fontWeight: 800, color: "#10b981" }}>{c.amount} cr</span>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: "13px", color: "#8b8ba8", maxWidth: "140px" }}>
                          <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.message || "—"}</span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, background: s.bg, color: s.color }}>
                            {s.icon} {s.label}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: "13px", color: "#5a5a74" }}>
                          {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", padding: "20px" }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  style={{ padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: page === 1 ? "#5a5a74" : "#f1f1f5", cursor: page === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, fontSize: "14px" }}>
                  <ChevronLeft size={16} /> Prev
                </button>
                <span style={{ color: "#8b8ba8", fontSize: "14px", fontWeight: 600 }}>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  style={{ padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: page === totalPages ? "#5a5a74" : "#f1f1f5", cursor: page === totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, fontSize: "14px" }}>
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
