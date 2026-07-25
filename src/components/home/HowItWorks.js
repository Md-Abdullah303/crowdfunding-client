"use client";

import { motion } from "framer-motion";
import { UserPlus, Coins, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <UserPlus size={24} />,
    title: "Create Your Account",
    desc: "Sign up as a Supporter or Creator. Supporters get 50 bonus credits, Creators get 20 credits — instantly on registration.",
    color: "#6c47ff",
  },
  {
    step: "02",
    icon: <Rocket size={24} />,
    title: "Launch or Discover",
    desc: "Creators submit campaigns for admin review. Once approved, campaigns go live for supporters to discover and fund.",
    color: "#a855f7",
  },
  {
    step: "03",
    icon: <Coins size={24} />,
    title: "Fund With Credits",
    desc: "Supporters contribute platform credits (20 credits = $1). Purchase more credits anytime via Stripe.",
    color: "#ff6b35",
  },
  {
    step: "04",
    icon: <TrendingUp size={24} />,
    title: "Grow & Withdraw",
    desc: "Creators approve contributions and withdraw funds once they reach 200+ credits ($10). Transparent and fast.",
    color: "#22c55e",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-primary mb-3">⚡ Simple Process</span>
          <h2
            className="text-3xl md:text-4xl font-black text-[#f1f1f5]"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            How <span className="gradient-text">FundFlow</span> Works
          </h2>
          <p className="text-[#8b8ba8] mt-3 max-w-xl mx-auto">
            From idea to funded — our transparent, credit-based system makes crowdfunding simple for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card p-6 relative group"
            >
              {/* Step number */}
              <span
                className="text-6xl font-black absolute top-4 right-5 opacity-[0.06] select-none"
                style={{ color: s.color }}
              >
                {s.step}
              </span>
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${s.color}18`,
                  color: s.color,
                  border: `1px solid ${s.color}30`,
                }}
              >
                {s.icon}
              </div>
              <h3 className="font-bold text-[#f1f1f5] mb-2">{s.title}</h3>
              <p className="text-sm text-[#8b8ba8] leading-relaxed">{s.desc}</p>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
