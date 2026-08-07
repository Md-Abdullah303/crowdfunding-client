"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, Trash2, Loader2, Info } from "lucide-react";
import api from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function NotificationBell() {
  const { data: session } = useSession();
  const user = session?.user;
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const res = await api.get("/api/notifications");
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      toast.error("Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      await api.patch("/api/notifications/read-all");
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      toast.error("Failed to mark all as read");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "50%", width: "40px", height: "40px", display: "flex",
          alignItems: "center", justifyContent: "center", cursor: "pointer",
          position: "relative", color: "#f1f1f5", transition: "all 0.2s",
          marginRight: "16px"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: "-2px", right: "-2px", background: "#ef4444",
            color: "#fff", fontSize: "10px", fontWeight: "bold", width: "16px", height: "16px",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", right: "16px", top: "48px", width: "320px",
              background: "rgba(15,15,26,0.95)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px", backdropFilter: "blur(20px)", overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 100
            }}
          >
            <div style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#fff" }}>Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead} 
                  disabled={loading}
                  style={{ background: "none", border: "none", color: "#a855f7", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  {loading ? <Loader2 size={12} className="animate-spin" /> : "Mark all read"}
                </button>
              )}
            </div>

            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              {notifications.length === 0 ? (
                <div style={{ padding: "32px 16px", textAlign: "center", color: "#8b8ba8" }}>
                  <Info size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: "14px" }}>No notifications yet.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif._id} 
                    style={{
                      padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: notif.isRead ? "transparent" : "rgba(168,85,247,0.05)",
                      display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onClick={() => !notif.isRead && markAsRead(notif._id)}
                    onMouseEnter={(e) => e.currentTarget.style.background = notif.isRead ? "rgba(255,255,255,0.02)" : "rgba(168,85,247,0.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = notif.isRead ? "transparent" : "rgba(168,85,247,0.05)"}
                  >
                    <div style={{ 
                      width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, marginTop: "6px",
                      background: notif.isRead ? "transparent" : "#a855f7" 
                    }} />
                    <div>
                      <p style={{ margin: "0 0 4px", fontSize: "13px", color: notif.isRead ? "#c4c4d4" : "#fff", lineHeight: 1.4 }}>
                        {notif.message}
                      </p>
                      <span style={{ fontSize: "11px", color: "#8b8ba8" }}>
                        {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
