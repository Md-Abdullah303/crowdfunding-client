"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import TopCampaigns from "@/components/home/TopCampaigns";
import HowItWorks from "@/components/home/HowItWorks";
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import PlatformStats from "@/components/home/PlatformStats";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <PlatformStats />
      <TopCampaigns />
      <HowItWorks />
      <Categories />
      <Testimonials />
    </motion.div>
  );
}
