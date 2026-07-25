"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "/hero-1.png",
    badge: "🚀 Launch Your Idea",
    heading: "Turn Your Vision Into",
    highlight: "Reality",
    highlightGradient: "linear-gradient(135deg, #6c47ff, #a855f7, #ec4899)",
    sub: "Create campaigns, raise funds with platform credits, and build the future you've always imagined.",
    cta: { label: "Start a Campaign", href: "/register" },
    ctaSecondary: { label: "Explore Campaigns", href: "/campaigns" },
  },
  {
    id: 2,
    bg: "/hero-2.png",
    badge: "💰 Support Creators",
    heading: "Fund Ideas That",
    highlight: "Matter",
    highlightGradient: "linear-gradient(135deg, #ff6b35, #f59e0b, #eab308)",
    sub: "Purchase platform credits, support campaigns you believe in, and watch great ideas come to life.",
    cta: { label: "Explore Campaigns", href: "/campaigns" },
    ctaSecondary: { label: "How It Works", href: "/#how-it-works" },
  },
  {
    id: 3,
    bg: "/hero-3.png",
    badge: "🏆 Trusted Platform",
    heading: "Where Innovation",
    highlight: "Gets Funded",
    highlightGradient: "linear-gradient(135deg, #06b6d4, #3b82f6, #6c47ff)",
    sub: "Join thousands of creators and supporters in a transparent, credit-based crowdfunding ecosystem.",
    cta: { label: "Join for Free", href: "/register" },
    ctaSecondary: { label: "Browse Categories", href: "/#categories" },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  const textVariants = {
    enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.3 } }),
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 68px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
      aria-label="Hero"
    >
      {/* Background Image Layer — crossfade between slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to right, rgba(9,9,15,0.88) 45%, rgba(9,9,15,0.55) 70%, rgba(9,9,15,0.3) 100%)",
      }} />
      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", zIndex: 1,
        background: "linear-gradient(to bottom, transparent, rgba(9,9,15,0.95))",
      }} />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "3rem", paddingBottom: "5rem" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`content-${current}`}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ maxWidth: "700px" }}
          >
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ marginBottom: "20px" }}>
              <span className="badge badge-primary" style={{ fontSize: "13px", padding: "5px 14px" }}>
                <Sparkles size={12} />
                {slide.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                color: "#f1f1f5",
                marginBottom: "16px",
              }}
            >
              {slide.heading}{" "}
              <span style={{
                background: slide.highlightGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {slide.highlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "1.1rem",
                color: "rgba(241,241,245,0.7)",
                lineHeight: 1.65,
                maxWidth: "560px",
                marginBottom: "36px",
              }}
            >
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
            >
              <Link href={slide.cta.href} className="btn-primary" style={{ fontSize: "1rem", padding: "12px 28px" }}>
                {slide.cta.label}
                <ArrowRight size={17} />
              </Link>
              <Link href={slide.ctaSecondary.href} className="btn-secondary" style={{ fontSize: "1rem", padding: "12px 28px" }}>
                {slide.ctaSecondary.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div style={{
          display: "flex", alignItems: "center", gap: "16px",
          marginTop: "60px",
        }}>
          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "8px" }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  height: "6px",
                  width: i === current ? "28px" : "8px",
                  borderRadius: "999px",
                  background: i === current ? "#6c47ff" : "rgba(255,255,255,0.25)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            {[{ fn: prev, label: "Previous slide", icon: <ChevronLeft size={18} />, id: "hero-prev-btn" },
              { fn: next, label: "Next slide", icon: <ChevronRight size={18} />, id: "hero-next-btn" }].map((btn) => (
              <button
                key={btn.id}
                id={btn.id}
                onClick={btn.fn}
                aria-label={btn.label}
                style={{
                  width: "38px", height: "38px", borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(9,9,15,0.5)",
                  color: "#8b8ba8", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#f1f1f5";
                  e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)";
                  e.currentTarget.style.background = "rgba(108,71,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#8b8ba8";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.background = "rgba(9,9,15,0.5)";
                }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
