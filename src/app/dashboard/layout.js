"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Wallet, 
  Settings, 
  Heart, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Activity,
  History,
  Home,
  FolderKanban,
  PieChart,
  Users,
  Layers,
  Shield
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role || "supporter";

  const navItems = role === "admin" ? [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "User Management", href: "/dashboard/users", icon: <Users size={18} /> },
    { name: "All Campaigns", href: "/dashboard/all-campaigns", icon: <Layers size={18} /> },
    { name: "Platform Settings", href: "/dashboard/platform-settings", icon: <Shield size={18} /> },
    { name: "Account Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
  ] : role === "creator" ? [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Campaigns", href: "/dashboard/my-campaigns", icon: <FolderKanban size={18} /> },
    { name: "Earnings", href: "/dashboard/earnings", icon: <PieChart size={18} /> },
    { name: "Wallet & Credits", href: "/dashboard/wallet", icon: <Wallet size={18} /> },
    { name: "Account Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
  ] : [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Contributions", href: "/dashboard/contributions", icon: <Heart size={18} /> },
    { name: "Transaction History", href: "/dashboard/history", icon: <History size={18} /> },
    { name: "Wallet & Credits", href: "/dashboard/wallet", icon: <Wallet size={18} /> },
    { name: "Account Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 68px)", position: "relative" }}>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
            }}
            className="lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          position: "fixed", left: 0, top: "68px", bottom: 0, zIndex: 45,
          width: "260px", background: "rgba(9,9,15,0.7)", borderRight: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          transition: "transform 0.3s ease",
        }}
      >
        {/* User Card (Sidebar top) */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "14px",
              background: "linear-gradient(135deg,#6c47ff,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "16px", fontWeight: 700,
              boxShadow: "0 4px 14px rgba(108,71,255,0.3)"
            }}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#f1f1f5", margin: 0, lineHeight: 1.2 }}>
                {user?.name || "Loading..."}
              </h3>
              <p style={{ fontSize: "12px", color: "#8b8ba8", margin: "4px 0 0 0", textTransform: "capitalize" }}>
                {user?.role || "Supporter"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: "20px 12px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#5a5a74", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", paddingLeft: "8px" }}>
            Menu
          </div>
          
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 14px", borderRadius: "12px",
                color: active ? "#fff" : "#8b8ba8",
                background: active ? "rgba(108,71,255,0.15)" : "transparent",
                border: `1px solid ${active ? "rgba(108,71,255,0.3)" : "transparent"}`,
                textDecoration: "none", fontSize: "13.5px", fontWeight: active ? 600 : 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#d4d4e0"; }
              }}
              onMouseLeave={(e) => {
                if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b8ba8"; }
              }}>
                <div style={{ color: active ? "#a855f7" : "#5a5a74", transition: "color 0.2s" }}>
                  {item.icon}
                </div>
                {item.name}
                {active && <ChevronRight size={14} style={{ marginLeft: "auto", color: "#a855f7" }} />}
              </Link>
            )
          })}
        </div>

        {/* Bottom Actions */}
        <div style={{ padding: "20px 12px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "12px", width: "100%",
            padding: "12px 14px", borderRadius: "12px", textDecoration: "none",
            color: "#f1f1f5", background: "transparent", border: "1px solid rgba(255,255,255,0.05)",
            fontSize: "13.5px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            boxSizing: "border-box"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
          }}>
            <Home size={18} /> Back to Home
          </Link>

          <button onClick={handleSignOut} style={{
            display: "flex", alignItems: "center", gap: "12px", width: "100%",
            padding: "12px 14px", borderRadius: "12px",
            color: "#ef4444", background: "rgba(239,68,68,0.05)", border: "1px solid transparent",
            fontSize: "13.5px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            boxSizing: "border-box"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.1)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.05)";
            e.currentTarget.style.borderColor = "transparent";
          }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, position: "relative", minWidth: 0 }}>
        
        {/* Mobile Header Toggle */}
        <div className="lg:hidden" style={{ 
          padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", 
          borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(9,9,15,0.8)",
          backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 30
        }}>
          <button 
            onClick={() => setSidebarOpen(true)}
            style={{ background: "none", border: "none", color: "#f1f1f5", cursor: "pointer", display: "flex" }}
          >
            <Menu size={20} />
          </button>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>Dashboard</span>
        </div>

        {/* Content Container */}
        <div style={{ padding: "32px 24px", maxWidth: "1100px", margin: "0 auto" }}>
          {children}
        </div>
      </main>

    </div>
  );
}
