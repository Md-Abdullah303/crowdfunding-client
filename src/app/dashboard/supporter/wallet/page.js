"use client";

import { motion } from "framer-motion";
import { Wallet, Coins, ArrowRightLeft, Plus, CreditCard, ArrowUpRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function WalletPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Wallet & Credits</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Manage your funds, add credits, and withdraw earnings.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        
        {/* Main Balance Card */}
        <div style={{
          background: "linear-gradient(135deg, #6c47ff, #a855f7)", borderRadius: "24px",
          padding: "32px", color: "#fff", position: "relative", overflow: "hidden",
          boxShadow: "0 20px 40px rgba(108,71,255,0.3)"
        }}>
          <div style={{ position: "absolute", top: "-50px", right: "-20px", opacity: 0.2 }}>
            <Wallet size={200} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 600, opacity: 0.9 }}>Available Balance</p>
            <h2 style={{ margin: "0 0 32px 0", fontSize: "42px", fontWeight: 900, letterSpacing: "-1px" }}>$425.00</h2>
            
            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{
                flex: 1, background: "#fff", color: "#6c47ff", border: "none",
                padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                cursor: "pointer", transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
              >
                <Plus size={16} /> Add Funds
              </button>
              <button style={{
                flex: 1, background: "rgba(0,0,0,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
                padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                cursor: "pointer", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "none"; }}
              >
                <ArrowUpRight size={16} /> Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Platform Credits Card */}
        <div style={{
          background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", padding: "32px", backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <div>
              <p style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 600, color: "#8b8ba8" }}>Platform Credits</p>
              <h2 style={{ margin: 0, fontSize: "36px", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(168,85,247,0.15)", color: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Coins size={24} />
                </div>
                {user?.credits || 0}
              </h2>
            </div>
          </div>
          
          <p style={{ color: "#d4d4e0", fontSize: "14px", lineHeight: 1.6, margin: "0 0 auto 0" }}>
            Credits can be used to boost campaigns or cover platform fees. 1 Credit = $1 USD equivalent on FundFlow.
          </p>
          
          <button style={{
            marginTop: "24px", width: "100%", background: "transparent", color: "#a855f7",
            border: "1px solid rgba(168,85,247,0.3)", padding: "12px", borderRadius: "12px",
            fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(168,85,247,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <ArrowRightLeft size={16} /> Convert to Balance
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: "0 0 20px 0" }}>Payment Methods</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        
        {/* Visa Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", transition: "all 0.2s"
        }}>
          <div style={{ width: "48px", height: "32px", background: "#1a1f36", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontStyle: "italic", fontSize: "14px" }}>
            VISA
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 600, color: "#f1f1f5" }}>•••• 4242</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#8b8ba8" }}>Expires 12/28</p>
          </div>
          <span style={{ fontSize: "12px", padding: "4px 8px", background: "rgba(16,185,129,0.1)", color: "#10b981", borderRadius: "6px", fontWeight: 600 }}>Default</span>
        </div>

        {/* Add New Card */}
        <button style={{
          background: "transparent", border: "1px dashed rgba(255,255,255,0.2)",
          borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", cursor: "pointer", transition: "all 0.2s", color: "#8b8ba8"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b8ba8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
        >
          <CreditCard size={20} />
          <span style={{ fontSize: "14px", fontWeight: 600 }}>Add New Method</span>
        </button>

      </div>
    </motion.div>
  );
}
