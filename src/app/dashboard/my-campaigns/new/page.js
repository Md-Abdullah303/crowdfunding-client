"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Campaign created successfully!");
      router.push("/dashboard/my-campaigns");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/dashboard/my-campaigns" style={{
          width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#f1f1f5", transition: "all 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 4px 0" }}>Create New Campaign</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "14px" }}>Start raising funds for your next big idea.</p>
        </div>
      </div>

      <div style={{
        background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", padding: "32px", backdropFilter: "blur(10px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)", maxWidth: "800px"
      }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Title & Category */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Campaign Title</label>
              <input type="text" required placeholder="e.g. Eco-friendly Smart Backpack" style={{
                width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Category</label>
              <select required style={{
                width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                appearance: "none"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                <option value="" disabled selected>Select Category</option>
                <option value="technology">Technology</option>
                <option value="fashion">Fashion</option>
                <option value="film">Film & Video</option>
                <option value="art">Art & Design</option>
                <option value="games">Games</option>
              </select>
            </div>
          </div>

          {/* Goal & Duration */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Funding Goal ($)</label>
              <input type="number" required placeholder="10000" min="100" style={{
                width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Duration (Days)</label>
              <input type="number" required placeholder="30" min="1" max="60" style={{
                width: "100%", padding: "12px 16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Campaign Cover Image</label>
            <div style={{
              width: "100%", height: "200px", background: "rgba(9,9,15,0.6)", border: "1px dashed rgba(255,255,255,0.2)",
              borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s", color: "#8b8ba8"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"; e.currentTarget.style.color = "#a855f7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(9,9,15,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#8b8ba8"; }}
            >
              <ImageIcon size={32} style={{ marginBottom: "12px" }} />
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>Click to upload an image</p>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: 0.7 }}>PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Campaign Description</label>
            <textarea required rows={6} placeholder="Tell us about your project, why you're raising funds, and what backers will get..." style={{
              width: "100%", padding: "16px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", resize: "vertical"
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} style={{
            background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
            padding: "16px", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "transform 0.2s", marginTop: "8px", boxShadow: "0 8px 24px rgba(108,71,255,0.3)"
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = "none")}
          >
            {loading ? "Publishing Campaign..." : <><Sparkles size={18} /> Publish Campaign</>}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
