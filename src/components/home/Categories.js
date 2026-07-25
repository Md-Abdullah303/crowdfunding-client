"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Leaf, Heart, BookOpen, Users, Briefcase, Palette, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Technology", icon: <Cpu size={22} />, count: "142", color: "#3b82f6", href: "/campaigns?category=technology" },
  { name: "Environment", icon: <Leaf size={22} />, count: "89", color: "#22c55e", href: "/campaigns?category=environment" },
  { name: "Health", icon: <Heart size={22} />, count: "76", color: "#ef4444", href: "/campaigns?category=health" },
  { name: "Education", icon: <BookOpen size={22} />, count: "115", color: "#14b8a6", href: "/campaigns?category=education" },
  { name: "Community", icon: <Users size={22} />, count: "98", color: "#f59e0b", href: "/campaigns?category=community" },
  { name: "Business", icon: <Briefcase size={22} />, count: "63", color: "#ff6b35", href: "/campaigns?category=business" },
  { name: "Arts", icon: <Palette size={22} />, count: "54", color: "#a855f7", href: "/campaigns?category=arts" },
  { name: "Other", icon: <MoreHorizontal size={22} />, count: "37", color: "#8b8ba8", href: "/campaigns?category=other" },
];

export default function Categories() {
  return (
    <section className="section bg-[rgba(15,15,26,0.6)]" id="categories">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge badge-primary mb-3">🗂️ Browse by Category</span>
          <h2
            className="text-3xl md:text-4xl font-black text-[#f1f1f5]"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Find What <span className="gradient-text">Inspires You</span>
          </h2>
          <p className="text-[#8b8ba8] mt-3 max-w-md mx-auto">
            From groundbreaking tech to grassroots community projects — there's something for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={cat.href}
                className="flex flex-col items-center gap-3 p-4 glass-card text-center group hover:border-[rgba(255,255,255,0.2)] transition-all duration-200"
                id={`category-${cat.name.toLowerCase()}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${cat.color}18`,
                    color: cat.color,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#f1f1f5]">{cat.name}</p>
                  <p className="text-[10px] text-[#8b8ba8]">{cat.count} campaigns</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
