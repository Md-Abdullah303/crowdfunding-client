"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Target, Coins, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: <Users size={26} />,
    value: 12000,
    suffix: "+",
    label: "Active Users",
    sub: "Creators & Supporters",
    color: "#6c47ff",
    gradient: "linear-gradient(135deg, #6c47ff22, #6c47ff08)",
    border: "rgba(108,71,255,0.2)",
    glow: "rgba(108,71,255,0.25)",
  },
  {
    icon: <Target size={26} />,
    value: 3400,
    suffix: "+",
    label: "Campaigns Funded",
    sub: "Ideas brought to life",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f722, #a855f708)",
    border: "rgba(168,85,247,0.2)",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    icon: <Coins size={26} />,
    value: 5,
    suffix: "M+ Credits",
    label: "Distributed",
    sub: "Across all campaigns",
    color: "#ff6b35",
    gradient: "linear-gradient(135deg, #ff6b3522, #ff6b3508)",
    border: "rgba(255,107,53,0.2)",
    glow: "rgba(255,107,53,0.25)",
  },
  {
    icon: <TrendingUp size={26} />,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    sub: "Campaigns fully funded",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e22, #22c55e08)",
    border: "rgba(34,197,94,0.2)",
    glow: "rgba(34,197,94,0.25)",
  },
];

function AnimatedNumber({ value, suffix, color, isInView }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600;
    const step = 16;
    const totalSteps = duration / step;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span style={{
      fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
      fontWeight: 900,
      fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
      letterSpacing: "-0.02em",
      color,
      lineHeight: 1,
    }}>
      {displayed.toLocaleString()}{suffix}
    </span>
  );
}

export default function PlatformStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(9,9,15,0) 0%, rgba(13,13,22,0.9) 40%, rgba(9,9,15,0) 100%)",
      }}
    >
      {/* Decorative background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "200px",
        background: "radial-gradient(ellipse, rgba(108,71,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span className="badge badge-primary" style={{ fontSize: "12px", marginBottom: "12px", display: "inline-flex" }}>
            📊 Platform Metrics
          </span>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 800,
            fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
            color: "#f1f1f5",
            letterSpacing: "-0.02em",
          }}>
            Numbers That{" "}
            <span style={{
              background: "linear-gradient(135deg, #6c47ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Speak
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
              style={{
                background: stat.gradient,
                border: `1px solid ${stat.border}`,
                borderRadius: "20px",
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(12px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                cursor: "default",
              }}
              whileHover={{
                y: -4,
                boxShadow: `0 16px 48px ${stat.glow}`,
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "100px", height: "100px", borderRadius: "50%",
                background: stat.color,
                opacity: 0.08,
                filter: "blur(20px)",
                pointerEvents: "none",
              }} />

              {/* Icon */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px",
                background: `${stat.color}18`,
                border: `1px solid ${stat.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: stat.color,
                marginBottom: "20px",
              }}>
                {stat.icon}
              </div>

              {/* Animated number */}
              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                color={stat.color}
                isInView={isInView}
              />

              {/* Label */}
              <p style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#f1f1f5",
                marginTop: "6px",
                marginBottom: "4px",
              }}>
                {stat.label}
              </p>

              {/* Sub */}
              <p style={{
                fontSize: "12px",
                color: "#8b8ba8",
              }}>
                {stat.sub}
              </p>

              {/* Bottom accent line */}
              <div style={{
                position: "absolute", bottom: 0, left: "28px", right: "28px",
                height: "2px", borderRadius: "999px",
                background: `linear-gradient(to right, ${stat.color}60, transparent)`,
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
