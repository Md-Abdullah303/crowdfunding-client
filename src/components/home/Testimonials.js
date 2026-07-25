"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Greenwood",
    role: "Creator · EcoCharge Campaign",
    avatar: "SG",
    color: "#22c55e",
    rating: 5,
    text: "FundFlow completely transformed how I brought my solar project to life. The credit-based system is transparent, and the admin review process gave me confidence that my campaign would reach the right audience. We hit 84% of our goal in the first week!",
  },
  {
    id: 2,
    name: "James Carter",
    role: "Supporter · Backed 12 Campaigns",
    avatar: "JC",
    color: "#6c47ff",
    rating: 5,
    text: "As a supporter, I love how easy it is to discover campaigns that actually matter. The credit system lets me spread support across multiple projects without worrying about transaction fees on every contribution. Genuinely one of the best platforms out there.",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Creator · MediAssist Campaign",
    avatar: "PN",
    color: "#f59e0b",
    rating: 5,
    text: "I was skeptical about a credit-based crowdfunding model, but FundFlow proved me wrong. The registration bonus helped me start immediately, and the withdrawal process was smooth the moment we hit 200 credits. Highly recommend to any aspiring creator.",
  },
  {
    id: 4,
    name: "Amir Hassan",
    role: "Supporter · Community Champion",
    avatar: "AH",
    color: "#3b82f6",
    rating: 5,
    text: "The platform notification system is incredible. I get real-time updates when my contributions are approved, and I always know the status of the campaigns I've backed. FundFlow feels like investing in something you actually care about.",
  },
  {
    id: 5,
    name: "Maya Liu",
    role: "Creator · ArtVault Campaign",
    avatar: "ML",
    color: "#a855f7",
    rating: 5,
    text: "FundFlow gave independent artists like me a real chance. My ArtVault campaign reached 96% funding and I've connected with supporters who genuinely care about the arts. The dashboard is beautiful and super easy to use.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % testimonials.length); };
  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[current];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-primary mb-3">💬 Real Stories</span>
          <h2
            className="text-3xl md:text-4xl font-black text-[#f1f1f5]"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            What Our Community <span className="gradient-text">Says</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Card */}
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass-card p-8 w-full"
              >
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-[rgba(108,71,255,0.12)] border border-[rgba(108,71,255,0.2)] flex items-center justify-center mb-5">
                  <Quote size={18} className="text-[#6c47ff]" />
                </div>

                <p className="text-[#d1d1e0] text-lg leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: `${t.color}CC` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#f1f1f5] text-sm">{t.name}</p>
                    <p className="text-xs text-[#8b8ba8]">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="#f59e0b" className="text-[#f59e0b]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              id="testimonial-prev-btn"
              className="w-9 h-9 rounded-xl border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#8b8ba8] hover:text-[#f1f1f5] hover:border-[rgba(108,71,255,0.4)] hover:bg-[rgba(108,71,255,0.08)] transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-6 h-2 bg-[#6c47ff]"
                      : "w-2 h-2 bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.3)]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              id="testimonial-next-btn"
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
