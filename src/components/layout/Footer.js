import Link from "next/link";
import Image from "next/image";
import { Heart, ExternalLink, ArrowUpRight, MessageCircle, Link2 } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Explore Campaigns", href: "/campaigns" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Categories", href: "/#categories" },
    { label: "Start a Campaign", href: "/register" },
  ],
  Account: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Developer: [
    { label: "Client Repo", href: "https://github.com/Md-Abdullah303/crowdfunding-client", external: true },
    { label: "Server Repo", href: "https://github.com/Md-Abdullah303/crowdfunding-server", external: true },
  ],
};

const socialLinks = [
  { icon: <ExternalLink size={16} />, href: "https://github.com/Md-Abdullah303", label: "GitHub" },
  { icon: <MessageCircle size={16} />, href: "#", label: "Twitter" },
  { icon: <Link2 size={16} />, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "linear-gradient(180deg, rgba(9,9,15,0) 0%, rgba(8,8,18,1) 100%)",
        marginTop: "auto",
      }}
    >
      {/* Top glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "1px", background: "linear-gradient(to right, transparent, rgba(108,71,255,0.5), transparent)" }} />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "300px", height: "80px", background: "radial-gradient(ellipse, rgba(108,71,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ paddingTop: "64px", paddingBottom: "32px" }}>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr", gap: "40px", marginBottom: "56px" }}>

          {/* Brand col */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px", width: "fit-content" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 20px rgba(108,71,255,0.4)", flexShrink: 0 }}>
                <Image src="/logo.png" alt="FundFlow" width={36} height={36} style={{ objectFit: "cover" }} />
              </div>
              <span style={{
                fontSize: "1.15rem", fontWeight: 800,
                fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
                background: "linear-gradient(135deg,#6c47ff,#a855f7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                FundFlow
              </span>
            </Link>

            <p style={{ fontSize: "13.5px", color: "#8b8ba8", lineHeight: 1.75, maxWidth: "280px", marginBottom: "24px" }}>
              A modern crowdfunding platform where creators launch campaigns and supporters fund the ideas they believe in.{" "}
              <span style={{ color: "#6c47ff", fontWeight: 600 }}>20 credits = $1 USD.</span>
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "38px", height: "38px", borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(19,19,31,0.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#5a5a74", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#6c47ff";
                    e.currentTarget.style.borderColor = "rgba(108,71,255,0.4)";
                    e.currentTarget.style.background = "rgba(108,71,255,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5a5a74";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "rgba(19,19,31,0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 style={{ fontSize: "11px", fontWeight: 700, color: "#5a5a74", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "18px" }}>
                {title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: "13.5px", color: "#8b8ba8", textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#f1f1f5"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#8b8ba8"}
                    >
                      {link.label}
                      {link.external && <ArrowUpRight size={11} style={{ opacity: 0.6 }} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)", marginBottom: "28px" }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "#5a5a74" }}>
            © {new Date().getFullYear()} FundFlow. All rights reserved.
          </p>
          <p style={{ fontSize: "12px", color: "#5a5a74", display: "flex", alignItems: "center", gap: "5px" }}>
            Built with <Heart size={11} fill="#6c47ff" style={{ color: "#6c47ff" }} /> by{" "}
            <a href="https://github.com/Md-Abdullah303" target="_blank" rel="noopener noreferrer" style={{ color: "#6c47ff", textDecoration: "none" }}>
              Md Abdullah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
