"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Zap,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Coins,
  Github,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
  };

  const navLinks = [
    { href: "/campaigns", label: "Explore" },
    {
      href: "https://github.com/Md-Abdullah303/crowdfunding-client",
      label: "GitHub",
      external: true,
      icon: <Github size={14} />,
    },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(9,9,15,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="FundFlow Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c47ff] to-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(108,71,255,0.4)] group-hover:shadow-[0_0_30px_rgba(108,71,255,0.6)] transition-shadow duration-300">
                <Zap size={16} className="text-white" />
              </div>
              <span
                className="text-lg font-bold gradient-text"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                FundFlow
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-[#6c47ff] bg-[rgba(108,71,255,0.1)]"
                      : "text-[#8b8ba8] hover:text-[#f1f1f5] hover:bg-[rgba(255,255,255,0.05)]"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-3">
              {isPending ? (
                <div className="skeleton w-24 h-9 rounded-lg" />
              ) : user ? (
                // Logged-in user dropdown
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(19,19,31,0.7)] hover:border-[rgba(108,71,255,0.4)] transition-all duration-200"
                    id="user-menu-btn"
                    aria-expanded={dropdownOpen}
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6c47ff] to-[#a855f7] flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-xs font-semibold text-[#f1f1f5] leading-none">
                        {user.name?.split(" ")[0]}
                      </p>
                      <p className="text-[10px] text-[#8b8ba8] capitalize">
                        {user.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-[rgba(108,71,255,0.15)] border border-[rgba(108,71,255,0.25)]">
                      <Coins size={10} className="text-[#8b6bff]" />
                      <span className="text-[10px] font-bold text-[#8b6bff]">
                        {user.credits ?? 0}
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-[#8b8ba8] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 glass-card p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#f1f1f5] hover:bg-[rgba(108,71,255,0.1)] transition-colors duration-150"
                        >
                          <LayoutDashboard size={15} />
                          Dashboard
                        </Link>
                        <hr className="my-1 border-[rgba(255,255,255,0.06)]" />
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#ef4444] hover:bg-[rgba(239,68,68,0.08)] transition-colors duration-150"
                          id="sign-out-btn"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Guest buttons
                <>
                  <Link href="/login" className="btn-secondary text-sm py-2 px-4">
                    Log In
                  </Link>
                  <Link href="/register" className="btn-primary text-sm py-2 px-4">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-[#8b8ba8] hover:text-[#f1f1f5] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[rgba(255,255,255,0.06)] bg-[rgba(9,9,15,0.95)] backdrop-blur-xl"
            >
              <div className="container py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#8b8ba8] hover:text-[#f1f1f5] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
                <hr className="border-[rgba(255,255,255,0.06)]" />
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#f1f1f5] hover:bg-[rgba(108,71,255,0.1)] transition-all"
                    >
                      <LayoutDashboard size={15} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#ef4444] hover:bg-[rgba(239,68,68,0.08)] transition-all w-full"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-1">
                    <Link href="/login" className="btn-secondary text-sm justify-center">
                      Log In
                    </Link>
                    <Link href="/register" className="btn-primary text-sm justify-center">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-16" />
    </>
  );
}
