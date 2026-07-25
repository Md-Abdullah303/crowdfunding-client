"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Rocket, Coins, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: <UserPlus size={28} />,
    title: "Create Your Account",
    desc: "Sign up as a Supporter or Creator. Supporters get 50 bonus credits, Creators get 20 credits — instantly on registration.",
    color: "#6c47ff",
    gradient: "linear-gradient(135deg, #6c47ff, #8b5cf6)",
    cta: { label: "Register Free", href: "/register" },
  },
  {
    step: "02",
    icon: <Rocket size={28} />,
    title: "Launch or Discover",
    desc: "Creators submit campaigns for admin review. Once approved, campaigns go live for supporters to discover and fund.",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7, #c084fc)",
    cta: { label: "View Campaigns", href: "/campaigns" },
  },
  {
    step: "03",
    icon: <Coins size={28} />,
    title: "Fund With Credits",
    desc: "Supporters contribute platform credits. 20 credits = $1 USD. Purchase more credits anytime via Stripe.",
    color: "#ff6b35",
    gradient: "linear-gradient(135deg, #ff6b35, #f59e0b)",
    cta: { label: "How Credits Work", href: "/#how-it-works" },
  },
  {
    step: "04",
    icon: <TrendingUp size={28} />,
    title: "Grow & Withdraw",
    desc: "Creators approve contributions and withdraw funds once they reach 200+ credits ($10). Transparent and instant.",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
    cta: { label: "Start Creating", href: "/register" },
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}
    >
      {/* BG decoration */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "300px", background: "radial-gradient(ellipse, rgba(108,71,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span className="badge badge-primary" style={{ marginBottom: "14px", display: "inline-flex", fontSize: "12px" }}>⚡ Simple Process</span>
          <h2 style={{ fontFamily: "Plus Jakarta Sans, Inter, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#f1f1f5", letterSpacing: "-0.02em" }}>
            How{" "}
            <span style={{ background: "linear-gradient(135deg,#6c47ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              FundFlow
            </span>
            {" "}Works
          </h2>
          <p style={{ color: "#8b8ba8", marginTop: "12px", fontSize: "1rem", maxWidth: "480px", margin: "12px auto 0" }}>
            From idea to funded — our transparent, credit-based system makes crowdfunding simple for everyone.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", position: "relative" }}>

          {/* Connecting line (desktop) */}
          <div style={{
            position: "absolute",
            top: "56px",
            left: "calc(12.5% + 24px)",
            right: "calc(12.5% + 24px)",
            height: "2px",
            background: "linear-gradient(to right, #6c47ff40, #a855f740, #ff6b3540, #22c55e40)",
            zIndex: 0,
            display: "none", // hidden on mobile; use CSS media query in production
          }} />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                position: "relative", zIndex: 1,
                background: "rgba(15,15,26,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                padding: "32px 28px 28px",
                backdropFilter: "blur(12px)",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                overflow: "hidden",
              }}
              whileHover={{
                y: -5,
                borderColor: `${s.color}40`,
                boxShadow: `0 20px 50px ${s.color}15`,
              }}
            >
              {/* Step number watermark */}
              <span style={{
                position: "absolute", top: "16px", right: "20px",
                fontSize: "64px", fontWeight: 900,
                fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
                color: s.color, opacity: 0.07, lineHeight: 1,
                userSelect: "none",
              }}>
                {s.step}
              </span>

              {/* Icon with gradient bg */}
              <div style={{
                width: "60px", height: "60px", borderRadius: "18px",
                background: s.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff",
                marginBottom: "24px",
                boxShadow: `0 8px 24px ${s.color}35`,
              }}>
                {s.icon}
              </div>

              {/* Step label */}
              <span style={{ fontSize: "11px", fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", display: "block" }}>
                Step {s.step}
              </span>

              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f1f1f5", marginBottom: "12px", fontFamily: "Plus Jakarta Sans, Inter, sans-serif" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "13.5px", color: "#8b8ba8", lineHeight: 1.7, marginBottom: "20px" }}>
                {s.desc}
              </p>

              {/* CTA link */}
              <Link href={s.cta.href} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "13px", fontWeight: 600, color: s.color,
                textDecoration: "none", transition: "gap 0.2s ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.gap = "10px"}
                onMouseLeave={(e) => e.currentTarget.style.gap = "6px"}
              >
                {s.cta.label} <ArrowRight size={13} />
              </Link>

              {/* Bottom accent */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: s.gradient, opacity: 0.5 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
