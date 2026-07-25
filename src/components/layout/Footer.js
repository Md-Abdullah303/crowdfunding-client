import Link from "next/link";
import { Zap, Heart, ExternalLink, MessageCircle, Link2 } from "lucide-react";

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
    {
      label: "Client Repo",
      href: "https://github.com/Md-Abdullah303/crowdfunding-client",
      external: true,
    },
    {
      label: "Server Repo",
      href: "https://github.com/Md-Abdullah303/crowdfunding-server",
      external: true,
    },
  ],
};

const socialLinks = [
  { icon: <ExternalLink size={18} />, href: "https://github.com/Md-Abdullah303", label: "GitHub" },
  { icon: <MessageCircle size={18} />, href: "#", label: "Twitter" },
  { icon: <Link2 size={18} />, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(9,9,15,0.8)]"
      role="contentinfo"
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 w-fit mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c47ff] to-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(108,71,255,0.3)]">
                <Zap size={16} className="text-white" />
              </div>
              <span
                className="text-lg font-bold gradient-text"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                FundFlow
              </span>
            </Link>
            <p className="text-[#8b8ba8] text-sm leading-relaxed max-w-xs">
              A modern crowdfunding platform where creators launch campaigns
              and supporters fund the ideas they believe in. 20 credits = $1 USD.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#5a5a74] hover:text-[#6c47ff] hover:border-[rgba(108,71,255,0.4)] hover:bg-[rgba(108,71,255,0.08)] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold text-[#5a5a74] uppercase tracking-widest mb-4">
                {title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-[#8b8ba8] hover:text-[#f1f1f5] transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#5a5a74]">
            © {new Date().getFullYear()} FundFlow. All rights reserved.
          </p>
          <p className="text-xs text-[#5a5a74] flex items-center gap-1.5">
            Built with <Heart size={11} className="text-[#6c47ff]" fill="#6c47ff" /> by Md Abdullah
          </p>
        </div>
      </div>
    </footer>
  );
}
