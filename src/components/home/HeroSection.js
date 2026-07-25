"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "🚀 Launch Your Idea",
    heading: "Turn Your Vision Into",
    highlight: "Reality",
    sub: "Create campaigns, raise funds with platform credits, and build the future you've always imagined.",
    cta: { label: "Start a Campaign", href: "/register" },
    ctaSecondary: { label: "Explore Campaigns", href: "/campaigns" },
    gradient: "from-[#6c47ff] via-[#a855f7] to-[#ec4899]",
    orb1: "bg-[#6c47ff]",
    orb2: "bg-[#a855f7]",
  },
  {
    id: 2,
    badge: "💰 Support Creators",
    heading: "Fund Ideas That",
    highlight: "Matter",
    sub: "Purchase platform credits, support campaigns you believe in, and watch great ideas come to life.",
    cta: { label: "Explore Campaigns", href: "/campaigns" },
    ctaSecondary: { label: "Buy Credits", href: "/dashboard/purchase-credit" },
    gradient: "from-[#ff6b35] via-[#f59e0b] to-[#eab308]",
    orb1: "bg-[#ff6b35]",
    orb2: "bg-[#f59e0b]",
  },
  {
    id: 3,
    badge: "🏆 Top Platform",
    heading: "Where Innovation",
    highlight: "Gets Funded",
    sub: "Join thousands of creators and supporters in a transparent, credit-based crowdfunding ecosystem.",
    cta: { label: "Join for Free", href: "/register" },
    ctaSecondary: { label: "How It Works", href: "/#how-it-works" },
    gradient: "from-[#06b6d4] via-[#3b82f6] to-[#6c47ff]",
    orb1: "bg-[#06b6d4]",
    orb2: "bg-[#3b82f6]",
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          key={`orb1-${current}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 1 }}
          className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[100px] ${slide.orb1}`}
        />
        <motion.div
          key={`orb2-${current}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] ${slide.orb2}`}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative z-10 py-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex"
            >
              <span className="badge badge-primary text-sm gap-2">
                <Sparkles size={12} />
                {slide.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {slide.heading}{" "}
              <span
                className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
              >
                {slide.highlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#8b8ba8] max-w-2xl leading-relaxed mb-8"
            >
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href={slide.cta.href} className="btn-primary text-base px-6 py-3">
                {slide.cta.label}
                <ArrowRight size={16} />
              </Link>
              <Link href={slide.ctaSecondary.href} className="btn-secondary text-base px-6 py-3">
                {slide.ctaSecondary.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slider controls */}
        <div className="flex items-center gap-4 mt-14">
          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-[#6c47ff]"
                    : "w-2 h-2 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={prev}
              aria-label="Previous slide"
              id="hero-prev-btn"
              className="w-9 h-9 rounded-xl border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#8b8ba8] hover:text-[#f1f1f5] hover:border-[rgba(108,71,255,0.4)] hover:bg-[rgba(108,71,255,0.08)] transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              id="hero-next-btn"
              className="w-9 h-9 rounded-xl border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#8b8ba8] hover:text-[#f1f1f5] hover:border-[rgba(108,71,255,0.4)] hover:bg-[rgba(108,71,255,0.08)] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
