"use client";

import { motion } from "framer-motion";
import { Users, Target, Coins, TrendingUp } from "lucide-react";

const stats = [
  { icon: <Users size={22} />, value: "12,000+", label: "Active Users", color: "#6c47ff" },
  { icon: <Target size={22} />, value: "3,400+", label: "Campaigns Funded", color: "#a855f7" },
  { icon: <Coins size={22} />, value: "5M+", label: "Credits Distributed", color: "#ff6b35" },
  { icon: <TrendingUp size={22} />, value: "98%", label: "Success Rate", color: "#22c55e" },
];

export default function PlatformStats() {
  return (
    <section className="py-10 border-y border-[rgba(255,255,255,0.05)]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${stat.color}18`,
                  color: stat.color,
                  border: `1px solid ${stat.color}30`,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-[#f1f1f5]">{stat.value}</p>
                <p className="text-xs text-[#8b8ba8] font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
