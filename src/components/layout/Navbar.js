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
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(9, 9, 15, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.3)" : "none"
        }}
      >
        <div className="container" style={{ margin: "0 auto", padding: "0 24px", maxWidth: "1280px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px", gap: "20px" }}>
            
            {/* ── Logo ────────────────────────────────────────────────────────── */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", overflow: "hidden", position: "relative", boxShadow: "0 0 20px rgba(108,71,255,0.4)" }}>
                <Image src="/logo.png" alt="FundFlow logo" fill style={{ objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "-0.5px", background: "linear-gradient(135deg, #6c47ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                FundFlow
              </span>
            </Link>

            {/* ── Desktop Nav ──────────────────────────────────────────────────── */}
            <nav className="hidden xl:flex" style={{ display: "none", alignItems: "center", gap: "8px" }} id="desktop-nav">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "12px",
                      fontSize: "15px", fontWeight: "600", textDecoration: "none", transition: "all 0.2s ease",
                      color: active ? "#a855f7" : "#8b8ba8",
                      backgroundColor: active ? "rgba(168,85,247,0.1)" : "transparent",
                    }}
                    onMouseOver={(e) => { if(!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; } }}
                    onMouseOut={(e) => { if(!active) { e.currentTarget.style.color = "#8b8ba8"; e.currentTarget.style.backgroundColor = "transparent"; } }}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop Auth Area ────────────────────────────────────────────── */}
            <div className="hidden xl:flex" style={{ display: "none", alignItems: "center", gap: "16px", flexShrink: 0 }} id="desktop-auth">
              <a
                href="https://github.com/Md-Abdullah303/crowdfunding-client"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", color: "#a855f7",
                  backgroundColor: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", textDecoration: "none",
                  transition: "all 0.2s ease", whiteSpace: "nowrap"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(168,85,247,0.2)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(168,85,247,0.1)"}
              >
                Join as Developer
              </a>

              {isPending ? (
                <div style={{ width: "120px", height: "40px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px" }} />
              ) : user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <NotificationBell />

                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      style={{
                        display: "flex", alignItems: "center", gap: "12px", padding: "6px 14px 6px 6px", borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(19,19,31,0.8)", cursor: "pointer",
                        transition: "border-color 0.2s ease"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    >
                      {user.image ? (
                        <img src={user.image} alt="Profile" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6c47ff, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "14px" }}>
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#f1f1f5", lineHeight: "1.1" }}>
                          {user.name?.split(" ")[0]}
                        </span>
                        <span style={{ fontSize: "10px", fontWeight: "700", color: "#a855f7", textTransform: "uppercase", letterSpacing: "1px" }}>
                          {user.role || "SUPPORTER"}
                        </span>
                      </div>
                      <ChevronDown size={14} style={{ color: "#8b8ba8", marginLeft: "4px", transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute", right: 0, top: "calc(100% + 8px)", width: "220px",
                            backgroundColor: "#13131f", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", overflow: "hidden"
                          }}
                        >
                          <div style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                            <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
                            <div style={{ fontSize: "12px", color: "#8b8ba8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }}>{user.email}</div>
                          </div>
                          <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", color: "#d4d4e0", textDecoration: "none", transition: "all 0.2s ease" }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#d4d4e0"; }}>
                              <LayoutDashboard size={16} color="#a855f7" /> Dashboard
                            </Link>
                            <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", color: "#ef4444", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                              <LogOut size={16} /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                  <Link href="/login" style={{ padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", color: "#d4d4e0", textDecoration: "none", transition: "all 0.2s ease" }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#d4d4e0"; }}>
                    Log In
                  </Link>
                  <Link href="/register" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", color: "#fff", background: "linear-gradient(135deg, #6c47ff, #a855f7)", textDecoration: "none", transition: "all 0.2s ease", boxShadow: "0 4px 15px rgba(108,71,255,0.3)" }} onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 6px 20px rgba(108,71,255,0.5)"} onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 15px rgba(108,71,255,0.3)"}>
                    <UserPlus size={16} /> Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile Hamburger & Icons ──────────────────────────────────────── */}
            <div className="flex xl:hidden" style={{ alignItems: "center", gap: "16px", flexShrink: 0 }} id="mobile-toggle">
              {user && <NotificationBell />}
              <button onClick={() => setMobileOpen(!mobileOpen)} style={{ padding: "8px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.05)", color: "#d4d4e0", border: "none", cursor: "pointer", transition: "all 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
          </div>
        </div>

        {/* CSS for Media Queries to handle hidden classes safely */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1280px) {
            #mobile-toggle { display: none !important; }
            #desktop-nav { display: flex !important; }
            #desktop-auth { display: flex !important; }
          }
          @media (max-width: 1279px) {
            #mobile-toggle { display: flex !important; }
            #desktop-nav { display: none !important; }
            #desktop-auth { display: none !important; }
          }
        `}} />

        {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden", backgroundColor: "rgba(9, 9, 15, 0.98)", backdropFilter: "blur(30px)", borderTop: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
            >
              <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 24px", borderRadius: "16px", fontSize: "16px", fontWeight: "600", color: "#d4d4e0", textDecoration: "none", transition: "all 0.2s ease" }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#d4d4e0"; }}>
                    <span style={{ color: "#a855f7" }}>{link.icon}</span> {link.label}
                  </Link>
                ))}
                
                <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", margin: "8px 0" }} />
                
                <a href="https://github.com/Md-Abdullah303/crowdfunding-client" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 24px", borderRadius: "16px", fontSize: "16px", fontWeight: "700", color: "#a855f7", backgroundColor: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.2)", textDecoration: "none", transition: "all 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(168,85,247,0.1)"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(168,85,247,0.05)"}>
                  Join as Developer
                </a>

                {user ? (
                  <>
                    <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 24px", borderRadius: "16px", fontSize: "16px", fontWeight: "700", color: "#fff", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "all 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"}>
                      <span style={{ color: "#6c47ff" }}><LayoutDashboard size={18} /></span> Dashboard
                    </Link>
                    <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 24px", borderRadius: "16px", fontSize: "16px", fontWeight: "700", color: "#ef4444", backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)", cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.05)"}>
                      <LogOut size={18} /> Sign Out
                    </button>
                  </>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "12px" }}>
                    <Link href="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: "16px", fontSize: "16px", fontWeight: "700", color: "#d4d4e0", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", transition: "all 0.2s ease" }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#d4d4e0"; }}>
                      Log In
                    </Link>
                    <Link href="/register" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px", borderRadius: "16px", fontSize: "16px", fontWeight: "700", color: "#fff", background: "linear-gradient(135deg, #6c47ff, #a855f7)", boxShadow: "0 8px 25px -8px rgba(168,85,247,0.5)", textDecoration: "none", transition: "all 0.2s ease" }}>
                      <UserPlus size={18} /> Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div style={{ height: "76px" }} />
    </>
  );
}
