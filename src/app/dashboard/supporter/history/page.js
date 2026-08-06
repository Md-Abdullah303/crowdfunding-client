"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Receipt, Loader2, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function SupporterPaymentHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/stripe/payment-history")
      .then(r => setHistory(r.data.data))
      .catch(() => toast.error("Failed to load payment history"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Payment History</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>All your credit purchases via Stripe.</p>
      </div>

      <div style={{ background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", overflow: "hidden", backdropFilter: "blur(10px)" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px" }}>
            <Loader2 className="animate-spin" size={28} style={{ color: "#a855f7" }} />
          </div>
        ) : history.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px", gap: "16px" }}>
            <Receipt size={48} style={{ color: "#5a5a74" }} />
            <p style={{ color: "#8b8ba8", margin: 0 }}>No purchase history yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Credits Added", "Amount Paid", "Status", "Date"].map(h => (
                    <th key={h} style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#8b8ba8", textTransform: "uppercase", letterSpacing: "0.8px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map(p => (
                  <tr key={p._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ fontSize: "18px", fontWeight: 800, color: "#10b981" }}>+{p.credits} credits</span>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "16px", fontWeight: 700, color: "#f1f1f5" }}>
                      ${p.amountUSD?.toFixed(2)}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                        <CheckCircle size={11} /> Completed
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "13px", color: "#5a5a74" }}>
                      {new Date(p.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
