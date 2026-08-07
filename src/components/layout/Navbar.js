"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Coins,
  Compass,
  Info,
  Grid3x3,
  UserPlus
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import NotificationBell from "./NotificationBell";

const navLinks = [
  { href: "/campaigns", label: "Explore", icon: <Compass size={16} /> },
  { href: "/#how-it-works", label: "How It Works", icon: <Info size={16} /> },
  { href: "/#categories", label: "Categories", icon: <Grid3x3 size={16} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const showNav = pathname === "/" || pathname.startsWith("/campaigns");
  if (!showNav) return null;

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090f]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-gradient-to-b from-[#09090f]/80 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-[72px] gap-4">
            
            {/* ── Logo ────────────────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(108,71,255,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300">
                <Image src="/logo.png" alt="FundFlow logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-br from-[#6c47ff] to-[#a855f7] bg-clip-text text-transparent">
                FundFlow
              </span>
            </Link>

            {/* ── Desktop Nav ──────────────────────────────────────────────────── */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? "text-[#a855f7] bg-[#a855f7]/10"
                        : "text-[#8b8ba8] hover:text-[#f1f1f5] hover:bg-white/5"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop Auth Area ────────────────────────────────────────────── */}
            <div className="hidden xl:flex items-center gap-4 shrink-0">
              <a
                href="https://github.com/Md-Abdullah303/crowdfunding-client"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/30 hover:bg-[#a855f7]/20 transition-all duration-200 whitespace-nowrap"
              >
                Join as Developer
              </a>

              {isPending ? (
                <div className="w-32 h-10 bg-white/5 animate-pulse rounded-xl" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  <NotificationBell />

                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 bg-[#13131f]/80 hover:border-[#6c47ff]/50 transition-all whitespace-nowrap"
                    >
                      {user.image ? (
                        <img
                          src={user.image}
                          alt="Profile"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c47ff] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm">
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-bold text-[#f1f1f5] leading-tight">
                          {user.name?.split(" ")[0]}
                        </span>
                        <span className="text-[10px] font-bold text-[#a855f7] uppercase tracking-wider">
                          {user.role}
                        </span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-[#8b8ba8] transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 bg-[#13131f] border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                            <div className="text-sm font-bold text-white truncate">{user.name}</div>
                            <div className="text-xs text-[#8b8ba8] truncate">{user.email}</div>
                          </div>
                          <div className="p-2 flex flex-col gap-1">
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#d4d4e0] hover:text-white hover:bg-white/5 transition-all"
                            >
                              <LayoutDashboard size={16} className="text-[#a855f7]" />
                              Dashboard
                            </Link>
                            <button
                              onClick={handleSignOut}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#ef4444] hover:bg-[#ef4444]/10 transition-all w-full text-left"
                            >
                              <LogOut size={16} />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-xl text-sm font-bold text-[#d4d4e0] hover:text-white hover:bg-white/5 transition-all whitespace-nowrap"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#6c47ff] to-[#a855f7] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all whitespace-nowrap"
                  >
                    <UserPlus size={16} />
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile Hamburger & Icons ──────────────────────────────────────── */}
            <div className="flex xl:hidden items-center gap-3 shrink-0">
              {user && <NotificationBell />}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl bg-white/5 text-[#d4d4e0] hover:bg-white/10 transition-colors"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-white/5 bg-[#09090f]/98 backdrop-blur-3xl overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold text-[#d4d4e0] hover:bg-white/5 hover:text-white transition-all"
                  >
                    {link.icon} {link.label}
                  </Link>
                ))}
                
                <div className="w-full h-px bg-white/5 my-2" />
                
                <a
                  href="https://github.com/Md-Abdullah303/crowdfunding-client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-bold text-[#a855f7] bg-[#a855f7]/10"
                >
                  Join as Developer
                </a>

                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold text-white bg-white/5"
                    >
                      <LayoutDashboard size={18} className="text-[#a855f7]" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold text-[#ef4444] hover:bg-[#ef4444]/10 transition-all text-left w-full"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center py-3 rounded-xl text-[15px] font-bold text-[#d4d4e0] bg-white/5 hover:bg-white/10 transition-all"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-bold text-white bg-gradient-to-r from-[#6c47ff] to-[#a855f7] shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
                    >
                      <UserPlus size={18} />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
}
