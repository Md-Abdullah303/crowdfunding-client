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
  UserPlus,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import NotificationBell from "./NotificationBell";

const navLinks = [
  { href: "/campaigns", label: "Explore", icon: <Compass size={15} /> },
  { href: "/#how-it-works", label: "How It Works", icon: <Info size={15} /> },
  { href: "/#categories", label: "Categories", icon: <Grid3x3 size={15} /> },
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
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          background: scrolled
            ? "rgba(9,9,15,0.92)"
            : "rgba(9,9,15,0.3)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>

            {/* ── Logo ────────────────────────────────────────────────────────── */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px", overflow: "hidden",
                boxShadow: "0 0 20px rgba(108,71,255,0.45)",
                flexShrink: 0,
              }}>
                <Image src="/logo.png" alt="FundFlow logo" width={36} height={36} style={{ objectFit: "cover" }} />
              </div>
              <span style={{
                fontSize: "1.15rem", fontWeight: 800,
                fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
                background: "linear-gradient(135deg, #6c47ff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                FundFlow
              </span>
            </Link>

            {/* ── Desktop Nav ──────────────────────────────────────────────────── */}
            <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "7px 14px", borderRadius: "10px",
                      fontSize: "0.875rem", fontWeight: 500,
                      textDecoration: "none",
                      color: active ? "#a78bfa" : "#8b8ba8",
                      background: active ? "rgba(108,71,255,0.1)" : "transparent",
                      transition: "all 0.18s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "#f1f1f5";
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "#8b8ba8";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Auth Area ────────────────────────────────────────────────────── */}
            <div className="hidden lg:flex" style={{ alignItems: "center", gap: "10px" }}>
              <a href="https://github.com/Md-Abdullah303/crowdfunding-client" target="_blank" rel="noopener noreferrer" 
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 14px", borderRadius: "10px",
                  fontSize: "0.875rem", fontWeight: 600, color: "#a855f7",
                  textDecoration: "none", transition: "all 0.18s ease",
                  border: "1px solid rgba(168,85,247,0.3)",
                  background: "rgba(168,85,247,0.05)"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168,85,247,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(168,85,247,0.05)"; }}
              >
                Join as Developer
              </a>
              {isPending ? (
                <div className="skeleton" style={{ width: "120px", height: "38px", borderRadius: "10px" }} />
              ) : user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <NotificationBell />
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      id="user-menu-btn"
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "6px 12px 6px 6px", borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.09)",
                        background: "rgba(19,19,31,0.8)",
                        cursor: "pointer",
                        transition: "border-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.45)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"}
                    >
                      {user.image ? (
                        <img src={user.image} alt={user.name} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
                      ) : (
                        <div style={{
                          width: "28px", height: "28px", borderRadius: "50%",
                          background: "linear-gradient(135deg,#6c47ff,#a855f7)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0,
                        }}>
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <div style={{ textAlign: "left" }}>
                        <p style={{ fontSize: "12px", fontWeight: 600, color: "#f1f1f5", lineHeight: 1 }}>{user.name?.split(" ")[0]}</p>
                        <p style={{ fontSize: "10px", color: "#8b8ba8", textTransform: "capitalize" }}>{user.role}</p>
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "3px",
                        padding: "2px 8px", borderRadius: "999px",
                        background: "rgba(108,71,255,0.15)", border: "1px solid rgba(108,71,255,0.25)",
                      }}>
                        <Coins size={10} style={{ color: "#8b6bff" }} />
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "#8b6bff" }}>{user.credits ?? 0}</span>
                      </div>
                      <ChevronDown size={13} style={{ color: "#8b8ba8", transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.14 }}
                          style={{
                            position: "absolute", right: 0, top: "calc(100% + 8px)",
                            width: "200px", background: "rgba(15,15,26,0.95)",
                            border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px",
                            padding: "6px", backdropFilter: "blur(20px)",
                            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                          }}
                        >
                          <Link href="/dashboard" style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "10px 12px", borderRadius: "10px",
                            fontSize: "13px", color: "#f1f1f5", textDecoration: "none",
                            transition: "background 0.15s",
                          }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(108,71,255,0.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            <LayoutDashboard size={15} /> Dashboard
                          </Link>
                          <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.06)" }} />
                          <button onClick={handleSignOut} id="sign-out-btn" style={{
                            width: "100%", display: "flex", alignItems: "center", gap: "10px",
                            padding: "10px 12px", borderRadius: "10px",
                            fontSize: "13px", color: "#ef4444", background: "none",
                            border: "none", cursor: "pointer", transition: "background 0.15s",
                          }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            <LogOut size={15} /> Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "8px 18px" }}>
                    Log In
                  </Link>
                  <Link href="/register" className="btn-primary" style={{ fontSize: "0.875rem", padding: "8px 18px" }}>
                    <UserPlus size={14} /> Get Started
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger & Icons ──────────────────────────────────────── */}
            <div className="flex lg:hidden items-center gap-4">
              {user && <NotificationBell />}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
                style={{
                  padding: "8px", borderRadius: "10px", border: "none",
                  background: "none", cursor: "pointer", color: "#8b8ba8",
                }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
              transition={{ duration: 0.22 }}
              style={{
                overflow: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(9,9,15,0.97)",
              }}
            >
              <div className="container" style={{ paddingTop: "12px", paddingBottom: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 16px", borderRadius: "12px",
                    fontSize: "14px", fontWeight: 500,
                    color: "#8b8ba8", textDecoration: "none",
                  }}>
                    {link.icon} {link.label}
                  </Link>
                ))}
                <hr style={{ margin: "8px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.06)" }} />
                <a href="https://github.com/Md-Abdullah303/crowdfunding-client" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 16px", borderRadius: "12px",
                  fontSize: "14px", fontWeight: 600,
                  color: "#a855f7", textDecoration: "none", background: "rgba(168,85,247,0.05)"
                }}>
                  Join as Developer
                </a>
                {user ? (
                  <>
                    <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "12px", fontSize: "14px", color: "#f1f1f5", textDecoration: "none" }}>
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "12px", fontSize: "14px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", width: "100%" }}>
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                    <Link href="/login" className="btn-secondary" style={{ justifyContent: "center" }}>Log In</Link>
                    <Link href="/register" className="btn-primary" style={{ justifyContent: "center" }}><UserPlus size={14} /> Get Started</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div style={{ height: "68px" }} />
    </>
  );
}
