"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import api from "@/lib/axios";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    api.get(`/api/stripe/verify-payment?session_id=${sessionId}`)
      .then(res => { setData(res.data.data); setStatus("success"); })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      {status === "loading" && (
        <div style={{ textAlign: "center" }}>
          <Loader2 size={50} className="animate-spin" style={{ color: "#a855f7", margin: "0 auto 20px" }} />
          <p style={{ color: "#8b8ba8", fontSize: "18px" }}>Verifying your payment...</p>
        </div>
      )}

      {status === "success" && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          style={{ background: "rgba(19,19,31,0.8)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "28px", padding: "48px", textAlign: "center", maxWidth: "460px", width: "100%", boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "2px solid rgba(16,185,129,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle size={40} style={{ color: "#10b981" }} />
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#f1f1f5", margin: "0 0 12px 0" }}>Payment Successful!</h1>
          <p style={{ color: "#8b8ba8", fontSize: "16px", lineHeight: 1.6, margin: "0 0 24px 0" }}>
            <span style={{ color: "#10b981", fontWeight: 800, fontSize: "24px" }}>{data?.credits} credits</span> have been added to your account.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/dashboard/supporter" style={{ flex: 1, padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #a855f7, #6c47ff)", color: "#fff", fontWeight: 800, fontSize: "15px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              Go to Dashboard <ArrowRight size={16} />
            </Link>
            <Link href="/campaigns" style={{ flex: 1, padding: "14px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f1f5", fontWeight: 700, fontSize: "15px", textAlign: "center", textDecoration: "none" }}>
              Explore Campaigns
            </Link>
          </div>
        </motion.div>
      )}

      {status === "error" && (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#ef4444", fontSize: "18px", marginBottom: "20px" }}>Payment verification failed or session expired.</p>
          <Link href="/dashboard/supporter/wallet" style={{ color: "#a855f7", fontWeight: 700 }}>Go back to wallet</Link>
        </div>
      )}
    </div>
  );
}
