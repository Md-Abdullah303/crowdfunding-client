"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, Coins, TrendingUp, Clock, CheckCircle, XCircle, Loader2, AlertCircle, ChevronRight } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const PAYMENT_METHODS = [
  { id: "bkash",    label: "bKash",        color: "#e01e8c" },
  { id: "nagad",    label: "Nagad",        color: "#f0501a" },
  { id: "rocket",   label: "Rocket",       color: "#8b0aed" },
  { id: "paypal",   label: "PayPal",       color: "#003087" },
  { id: "bank",     label: "Bank Transfer",color: "#3b82f6" },
];

const CREDITS_PER_DOLLAR = 20;

export default function CreatorWithdrawalPage() {
  const [balance, setBalance] = useState({ totalEarned: 0, totalWithdrawn: 0, available: 0 });
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [amount, setAmount] = useState(200);
  const [method, setMethod] = useState("bkash");
  const [note, setNote] = useState("");
  const [accountDetails, setAccountDetails] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [balRes, withRes] = await Promise.all([
        api.get("/api/creator/balance"),
        api.get("/api/creator/withdrawals"),
      ]);
      setBalance(balRes.data.data);
      setWithdrawals(withRes.data.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) { toast.error("Enter a valid amount"); return; }
    if (amount < 100) { toast.error("Minimum withdrawal is 100 credits"); return; }
    if (amount > balance.available) { toast.error("Insufficient available balance"); return; }

    // Disable withdrawal system for now
    toast.error("This system does not work for now but will be added in the future!");
    return;
    
    // Original code (bypassed)
    /*
    try {
      setFormLoading(true);
      await api.post("/api/withdrawals", {
        amountCredits: amount,
        paymentMethod: method,
        note: `${accountDetails}${note ? " | Note: " + note : ""}`,
      });
      toast.success("Withdrawal request submitted! Admin will review it.");
      setAccountDetails("");
      setNote("");
      setAmount(100);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    } finally {
      setFormLoading(false);
    }
    */
  };

  const STATUS_CFG = {
    pending:  { label: "Pending",  color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <Clock size={11} /> },
    approved: { label: "Approved", color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle size={11} /> },
    rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)",  icon: <XCircle size={11} /> },
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Loader2 className="animate-spin" size={40} style={{ color: "#a855f7" }} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Withdraw Funds</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Request a withdrawal of your earned credits. Minimum 100 credits ($5).</p>
      </div>

      {/* Balance Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "36px" }}>
        {[
          { label: "Total Earned", value: balance.totalEarned, icon: <TrendingUp size={20} />, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { label: "Withdrawn", value: balance.totalWithdrawn, icon: <Wallet size={20} />, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { label: "Available", value: balance.available, icon: <Coins size={20} />, color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "24px", display: "flex", alignItems: "center", gap: "16px", backdropFilter: "blur(10px)" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {s.icon}
            </div>
            <div>
              <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#8b8ba8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</p>
              <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#fff" }}>{s.value} <span style={{ fontSize: "14px", color: s.color }}>cr</span></h2>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#5a5a74" }}>${(s.value / CREDITS_PER_DOLLAR).toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>

        {/* Withdrawal Form */}
        <div style={{ background: "rgba(19,19,31,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "32px", backdropFilter: "blur(16px)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: "0 0 24px 0" }}>New Withdrawal Request</h2>

          <form onSubmit={handleWithdraw} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Amount */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount (Credits)</label>
              <input type="number" value={amount} min={100} max={balance.available} onChange={e => setAmount(parseInt(e.target.value) || 100)}
                style={{ width: "100%", padding: "14px 16px", background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#f1f1f5", fontSize: "18px", fontWeight: 800, outline: "none", boxSizing: "border-box" }}
                onFocus={e => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#8b8ba8" }}>= ${(amount / CREDITS_PER_DOLLAR).toFixed(2)} USD • Available: {balance.available} credits</p>
            </div>

            {/* Payment Method */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#a1a1aa", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Payment Method</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {PAYMENT_METHODS.map(m => (
                  <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                    style={{ padding: "8px 16px", borderRadius: "10px", border: method === m.id ? `1px solid ${m.color}` : "1px solid rgba(255,255,255,0.08)", background: method === m.id ? `${m.color}20` : "rgba(255,255,255,0.03)", color: method === m.id ? m.color : "#8b8ba8", fontWeight: 700, cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Account Details */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Account Number / ID *</label>
              <input type="text" value={accountDetails} onChange={e => setAccountDetails(e.target.value)} placeholder="Enter your account number or email"
                style={{ width: "100%", padding: "14px 16px", background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#f1f1f5", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
                onFocus={e => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Note */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Additional Note (optional)</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Any extra info for the admin..."
                style={{ width: "100%", padding: "14px 16px", background: "rgba(9,9,15,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#f1f1f5", fontSize: "15px", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                onFocus={e => e.currentTarget.style.borderColor = "#a855f7"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>

            <button type="submit" disabled={formLoading || balance.available < 100}
              style={{ padding: "16px", borderRadius: "16px", background: balance.available < 100 ? "rgba(108,71,255,0.4)" : "linear-gradient(135deg, #a855f7, #6c47ff)", color: "#fff", fontSize: "16px", fontWeight: 800, border: "none", cursor: formLoading || balance.available < 100 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", boxShadow: "0 10px 25px rgba(108,71,255,0.3)", transition: "all 0.2s" }}>
              {formLoading ? <Loader2 size={20} className="animate-spin" /> : <Wallet size={20} />}
              {balance.available < 100 ? "Need 100+ credits to withdraw" : "Submit Withdrawal Request"}
            </button>
          </form>
        </div>

        {/* History */}
        <div style={{ background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", overflow: "hidden", backdropFilter: "blur(10px)" }}>
          <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: 0 }}>Request History</h2>
          </div>
          {withdrawals.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", gap: "12px" }}>
              <AlertCircle size={36} style={{ color: "#5a5a74" }} />
              <p style={{ color: "#8b8ba8", margin: 0 }}>No withdrawal requests yet.</p>
            </div>
          ) : (
            <div style={{ padding: "8px" }}>
              {withdrawals.map(w => {
                const s = STATUS_CFG[w.status] || STATUS_CFG.pending;
                return (
                  <div key={w._id} style={{ padding: "16px", borderRadius: "14px", margin: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "16px", fontWeight: 800, color: "#f1f1f5" }}>{w.amountCredits} cr</span>
                        <span style={{ fontSize: "13px", color: "#8b8ba8" }}>= ${w.amountUSD?.toFixed(2)}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#5a5a74" }}>
                        via {w.paymentMethod} • {new Date(w.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, background: s.bg, color: s.color }}>
                      {s.icon} {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
