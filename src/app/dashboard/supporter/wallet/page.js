"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Zap, Star, Crown, Loader2, CheckCircle, ExternalLink } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

const PACKAGE_ICONS = [Zap, Star, Crown, CreditCard];
const PACKAGE_COLORS = [
  { gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)", glow: "rgba(59,130,246,0.3)", accent: "#60a5fa" },
  { gradient: "linear-gradient(135deg, #10b981, #059669)", glow: "rgba(16,185,129,0.3)", accent: "#34d399" },
  { gradient: "linear-gradient(135deg, #a855f7, #6c47ff)", glow: "rgba(168,85,247,0.3)", accent: "#c084fc" },
  { gradient: "linear-gradient(135deg, #f59e0b, #d97706)", glow: "rgba(245,158,11,0.3)", accent: "#fbbf24" },
];

export default function SupporterWalletPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);

  useEffect(() => {
    api.get("/api/stripe/packages")
      .then(r => setPackages(r.data.data))
      .catch(() => toast.error("Failed to load packages"))
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = async (pkg) => {
    setPurchasing(pkg.id);
    try {
      const res = await api.post("/api/stripe/create-checkout-session", { packageId: pkg.id });
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start checkout");
      setPurchasing(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#f1f1f5", margin: "0 0 12px 0" }}>Purchase Credits</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "16px" }}>Buy credits to support your favourite campaigns. 20 credits = $1 USD.</p>
      </div>

      {/* Current Balance */}
      <div style={{ background: "linear-gradient(135deg, rgba(108,71,255,0.15), rgba(168,85,247,0.1))", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "20px", padding: "24px 32px", marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#8b8ba8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Current Balance</p>
          <h2 style={{ margin: 0, fontSize: "40px", fontWeight: 900, background: "linear-gradient(135deg, #a855f7, #6c47ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {user?.credits || 0} <span style={{ fontSize: "20px" }}>Credits</span>
          </h2>
        </div>
        <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "linear-gradient(135deg, #6c47ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(108,71,255,0.4)" }}>
          <CreditCard size={32} style={{ color: "#fff" }} />
        </div>
      </div>

      {/* Package Cards */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
          <Loader2 className="animate-spin" size={40} style={{ color: "#a855f7" }} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
          {packages.map((pkg, i) => {
            const Icon = PACKAGE_ICONS[i] || CreditCard;
            const colors = PACKAGE_COLORS[i] || PACKAGE_COLORS[0];
            const isBuying = purchasing === pkg.id;
            return (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{ background: "rgba(19,19,31,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column" }}>
                {/* Top Banner */}
                <div style={{ padding: "28px 24px", background: colors.gradient, position: "relative" }}>
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                  <Icon size={32} style={{ color: "#fff", marginBottom: "16px", position: "relative" }} />
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 800, color: "#fff" }}>{pkg.label}</h3>
                  <div style={{ fontSize: "36px", fontWeight: 900, color: "#fff" }}>{pkg.credits} <span style={{ fontSize: "16px", fontWeight: 600 }}>Credits</span></div>
                </div>

                {/* Bottom Content */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#8b8ba8", fontSize: "14px" }}>Price</span>
                    <span style={{ fontSize: "22px", fontWeight: 900, color: "#f1f1f5" }}>${(pkg.price / 100).toFixed(0)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: "10px" }}>
                    <span style={{ color: "#8b8ba8", fontSize: "13px" }}>Value</span>
                    <span style={{ color: colors.accent, fontWeight: 700, fontSize: "13px" }}>${(pkg.credits / 20).toFixed(2)} worth</span>
                  </div>

                  <button onClick={() => handlePurchase(pkg)} disabled={!!purchasing}
                    style={{ marginTop: "auto", padding: "14px", borderRadius: "14px", background: isBuying ? "rgba(108,71,255,0.5)" : colors.gradient, color: "#fff", fontSize: "15px", fontWeight: 800, border: "none", cursor: purchasing ? "not-allowed" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", boxShadow: `0 8px 20px ${colors.glow}`, transition: "all 0.2s" }}>
                    {isBuying ? <Loader2 size={18} className="animate-spin" /> : <ExternalLink size={18} />}
                    {isBuying ? "Redirecting..." : "Buy Now"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <p style={{ textAlign: "center", color: "#5a5a74", fontSize: "13px", marginTop: "32px" }}>
        🔒 Secure payments powered by Stripe. Credits are added instantly after payment.
      </p>
    </motion.div>
  );
}
