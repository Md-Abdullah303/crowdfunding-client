"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Greenwood",
    role: "Creator",
    campaign: "EcoCharge Campaign",
    avatar: "SG",
    color: "#22c55e",
    rating: 5,
    text: "FundFlow completely transformed how I brought my solar project to life. The credit-based system is transparent, and we hit 84% of our goal in the first week!",
    featured: true,
  },
  {
    id: 2,
    name: "James Carter",
    role: "Supporter",
    campaign: "Backed 12 Campaigns",
    avatar: "JC",
    color: "#6c47ff",
    rating: 5,
    text: "The credit system lets me spread support across multiple projects without worrying about fees on every contribution. Genuinely one of the best platforms out there.",
    featured: false,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Creator",
    campaign: "MediAssist Campaign",
    avatar: "PN",
    color: "#f59e0b",
    rating: 5,
    text: "FundFlow proved me wrong on credit-based crowdfunding. The registration bonus helped me start immediately, and the withdrawal process was smooth once we hit 200 credits.",
    featured: false,
  },
  {
    id: 4,
    name: "Amir Hassan",
    role: "Supporter",
    campaign: "Community Champion",
    avatar: "AH",
    color: "#3b82f6",
    rating: 5,
    text: "Real-time notifications when my contributions are approved — I always know the status of campaigns I've backed. FundFlow feels like investing in something you care about.",
    featured: false,
  },
  {
    id: 5,
    name: "Maya Liu",
    role: "Creator",
    campaign: "ArtVault Campaign",
    avatar: "ML",
    color: "#a855f7",
    rating: 5,
    text: "FundFlow gave independent artists a real chance. My ArtVault campaign reached 96% funding. The dashboard is beautiful and super easy to use.",
    featured: false,
  },
];

function StarRating({ count }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="#f59e0b" style={{ color: "#f59e0b" }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((c) => (c + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={ref}
      id="testimonials"
      style={{
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, transparent 0%, rgba(108,71,255,0.03) 50%, transparent 100%)",
      }}
    >
      {/* BG orbs */}
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span className="badge badge-primary" style={{ marginBottom: "14px", display: "inline-flex", fontSize: "12px" }}>💬 Real Stories</span>
          <h2 style={{ fontFamily: "Plus Jakarta Sans, Inter, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#f1f1f5", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            What Our Community{" "}
            <span style={{ background: "linear-gradient(135deg,#6c47ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Says</span>
          </h2>
          <p style={{ color: "#8b8ba8", marginTop: "12px", fontSize: "1rem" }}>
            Trusted by thousands of creators and supporters worldwide.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {testimonials.map((item, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => setActive(i)}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${item.color}14, ${item.color}06)`
                    : "rgba(19,19,31,0.6)",
                  border: `1px solid ${isActive ? `${item.color}35` : "rgba(255,255,255,0.06)"}`,
                  borderRadius: "20px",
                  padding: "28px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{ y: -3, borderColor: `${item.color}35` }}
              >
                {/* Active glow */}
                {isActive && (
                  <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: item.color, opacity: 0.08, filter: "blur(25px)", pointerEvents: "none" }} />
                )}

                {/* Quote icon */}
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${item.color}18`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Quote size={16} style={{ color: item.color }} />
                </div>

                {/* Text */}
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: isActive ? "#e4e4f0" : "#a0a0bc", marginBottom: "20px", fontStyle: "italic" }}>
                  "{item.text}"
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: `${item.color}CC`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                    {item.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#f1f1f5", lineHeight: 1.2 }}>{item.name}</p>
                    <p style={{ fontSize: "11px", color: "#8b8ba8" }}>{item.role} · {item.campaign}</p>
                  </div>
                  <StarRating count={item.rating} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              style={{
                height: "6px", width: i === active ? "24px" : "6px",
                borderRadius: "999px", border: "none", cursor: "pointer",
                background: i === active ? "#6c47ff" : "rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
