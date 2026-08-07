"use client";

import { motion } from "framer-motion";
import { Search, Loader2, AlertTriangle, Trash2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function ReportsManagementPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null); // stores report id

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/reports");
      if (res.data.success) {
        setReports(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch reports");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleAction = async (reportId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this report?`)) return;
    
    try {
      setActionLoading(reportId);
      const res = await api.patch(`/api/admin/reports/${reportId}/action`, { action });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchReports(); // refresh the list to see updated status
      } else {
        toast.error(res.data.message || "Failed to perform action");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error performing action");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredReports = reports.filter(r => 
    r.campaign?.title?.toLowerCase().includes(search.toLowerCase()) || 
    r.reporter?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.reason?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Reported Campaigns</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Review and manage campaigns flagged by supporters.</p>
        </div>
        
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                padding: "10px 14px 10px 38px", borderRadius: "10px", color: "#f1f1f5",
                fontSize: "14px", outline: "none", width: "220px", transition: "all 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
            />
          </div>
        </div>
      </div>

      <div style={{
        background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", padding: "12px", backdropFilter: "blur(10px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th style={{ padding: "16px", color: "#8b8ba8", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Reporter</th>
                <th style={{ padding: "16px", color: "#8b8ba8", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Campaign</th>
                <th style={{ padding: "16px", color: "#8b8ba8", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Reason</th>
                <th style={{ padding: "16px", color: "#8b8ba8", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
                <th style={{ padding: "16px", color: "#8b8ba8", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "16px", color: "#8b8ba8", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: "40px 16px", textAlign: "center", color: "#8b8ba8" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
                      <Loader2 className="animate-spin" size={20} style={{ color: "#a855f7" }} /> Loading reports...
                    </div>
                  </td>
                </tr>
              ) : filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: "40px 16px", textAlign: "center", color: "#8b8ba8" }}>
                    No reports found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#f1f1f5", marginBottom: "4px" }}>
                        {report.reporter?.name || "Unknown User"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#8b8ba8" }}>
                        {report.reporter?.email || "No email"}
                      </div>
                    </td>

                    <td style={{ padding: "16px", maxWidth: "200px" }}>
                      {report.campaign ? (
                        <>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#f1f1f5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "4px" }}>
                            {report.campaign.title}
                          </div>
                          {report.campaign.status === "rejected" && (
                            <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>SUSPENDED</span>
                          )}
                        </>
                      ) : (
                        <span style={{ fontSize: "13px", color: "#ef4444", fontStyle: "italic" }}>Campaign Deleted</span>
                      )}
                    </td>

                    <td style={{ padding: "16px", maxWidth: "300px" }}>
                      <div style={{ fontSize: "13px", color: "#d4d4e0", lineHeight: 1.5 }}>
                        {report.reason}
                      </div>
                    </td>

                    <td style={{ padding: "16px", fontSize: "13px", color: "#8b8ba8", whiteSpace: "nowrap" }}>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>

                    <td style={{ padding: "16px" }}>
                      {report.status === "pending" ? (
                        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, background: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>
                          Pending
                        </span>
                      ) : report.status === "dismissed" ? (
                        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, background: "rgba(139,139,168,0.1)", color: "#8b8ba8", border: "1px solid rgba(139,139,168,0.2)" }}>
                          Dismissed
                        </span>
                      ) : (
                        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
                          Action Taken
                        </span>
                      )}
                    </td>

                    <td style={{ padding: "16px", textAlign: "right", whiteSpace: "nowrap" }}>
                      {report.status === "pending" && report.campaign && (
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => handleAction(report._id, "dismiss")}
                            disabled={actionLoading === report._id}
                            style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#d4d4e0", fontSize: "12px", fontWeight: 600, cursor: actionLoading === report._id ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                          >
                            {actionLoading === report._id ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                            Dismiss
                          </button>
                          
                          <button
                            onClick={() => handleAction(report._id, "suspend")}
                            disabled={actionLoading === report._id}
                            style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.1)", color: "#fbbf24", fontSize: "12px", fontWeight: 600, cursor: actionLoading === report._id ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                          >
                            <AlertTriangle size={14} />
                            Suspend
                          </button>
                          
                          <button
                            onClick={() => handleAction(report._id, "delete")}
                            disabled={actionLoading === report._id}
                            style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: actionLoading === report._id ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                      
                      {!report.campaign && report.status === "pending" && (
                        <button
                          onClick={() => handleAction(report._id, "dismiss")}
                          style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#d4d4e0", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                        >
                          Auto Dismiss
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
