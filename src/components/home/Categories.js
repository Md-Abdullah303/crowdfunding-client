"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Leaf, Heart, BookOpen, Users, Briefcase, Palette, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Technology", icon: <Cpu size={28} />, count: "142", color: "#3b82f6", bg: "linear-gradient(135deg, #3b82f622, #3b82f608)", border: "rgba(59,130,246,0.2)", href: "/campaigns?category=technology", emoji: "💻" },
  { name: "Environment", icon: <Leaf size={28} />, count: "89", color: "#22c55e", bg: "linear-gradient(135deg, #22c55e22, #22c55e08)", border: "rgba(34,197,94,0.2)", href: "/campaigns?category=environment", emoji: "🌿" },
  { name: "Health", icon: <Heart size={28} />, count: "76", color: "#ef4444", bg: "linear-gradient(135deg, #ef444422, #ef444408)", border: "rgba(239,68,68,0.2)", href: "/campaigns?category=health", emoji: "❤️" },
  { name: "Education", icon: <BookOpen size={28} />, count: "115", color: "#14b8a6", bg: "linear-gradient(135deg, #14b8a622, #14b8a608)", border: "rgba(20,184,166,0.2)", href: "/campaigns?category=education", emoji: "📚" },
  { name: "Community", icon: <Users size={28} />, count: "98", color: "#f59e0b", bg: "linear-gradient(135deg, #f59e0b22, #f59e0b08)", border: "rgba(245,158,11,0.2)", href: "/campaigns?category=community", emoji: "🤝" },
  { name: "Business", icon: <Briefcase size={28} />, count: "63", color: "#ff6b35", bg: "linear-gradient(135deg, #ff6b3522, #ff6b3508)", border: "rgba(255,107,53,0.2)", href: "/campaigns?category=business", emoji: "💼" },
  { name: "Arts", icon: <Palette size={28} />, count: "54", color: "#a855f7", bg: "linear-gradient(135deg, #a855f722, #a855f708)", border: "rgba(168,85,247,0.2)", href: "/campaigns?category=arts", emoji: "🎨" },
  { name: "Other", icon: <MoreHorizontal size={28} />, count: "37", color: "#8b8ba8", bg: "linear-gradient(135deg, #8b8ba822, #8b8ba808)", border: "rgba(139,139,168,0.2)", href: "/campaigns?category=other", emoji: "✨" },
];

export default function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="categories"
      style={{
        padding: "100px 0",
        position: "relative",
        background: "linear-gradient(180deg, rgba(9,9,15,0) 0%, rgba(15,10,30,0.5) 50%, rgba(9,9,15,0) 100%)",
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="badge badge-primary" style={{ marginBottom: "14px", display: "inline-flex", fontSize: "12px" }}>🗂️ Browse by Category</span>
          <h2 style={{ fontFamily: "Plus Jakarta Sans, Inter, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#f1f1f5", letterSpacing: "-0.02em" }}>
            Find What{" "}
            <span style={{ background: "linear-gradient(135deg,#6c47ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Inspires You
            </span>
          </h2>
          <p style={{ color: "#8b8ba8", marginTop: "12px", fontSize: "1rem", maxWidth: "500px", margin: "12px auto 0" }}>
            From groundbreaking tech to grassroots community projects — there's something for everyone.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              <Link
                href={cat.href}
                id={`category-${cat.name.toLowerCase()}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "22px 24px",
                  background: cat.bg,
                  border: `1px solid ${cat.border}`,
                  borderRadius: "18px",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  backdropFilter: "blur(10px)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 12px 36px ${cat.color}20`;
                  e.currentTarget.style.borderColor = `${cat.color}45`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = cat.border;
                }}
              >
                {/* Icon box */}
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                  background: `${cat.color}18`,
                  border: `1px solid ${cat.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: cat.color,
                  transition: "transform 0.25s ease",
                }}>
                  {cat.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: "15px", color: "#f1f1f5", marginBottom: "3px" }}>
                    {cat.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#8b8ba8" }}>
                    {cat.count} campaigns
                  </p>
                </div>

                {/* Arrow indicator */}
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: `${cat.color}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: cat.color, fontSize: "14px", flexShrink: 0,
                  marginLeft: "auto"
                }}>
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "48px" }}
        >
          <Link href="/campaigns" className="btn-secondary" style={{ display: "inline-flex", gap: "8px" }}>
            Browse All Campaigns →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
