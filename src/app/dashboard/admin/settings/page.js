"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Save, Image as ImageIcon, UploadCloud, CheckCircle2, Loader2, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import api from "@/lib/axios";

// ImgBB API Key provided by user
const IMGBB_API_KEY = "381cf4c5171920c0fa0a6254cd865633";

export default function SettingsPage() {
  const { data: session, refetch } = useSession();
  const user = session?.user;
  
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    image: user?.image || "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToImgBB = async (file) => {
    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      
      if (result.success) {
        const imageUrl = result.data.url;
        setFormData(prev => ({ ...prev, image: imageUrl }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        uploadToImgBB(file);
      } else {
        toast.error("Please upload a valid image file.");
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      uploadToImgBB(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return toast.error("Name cannot be empty");
    }

    setLoading(true);
    try {
      const res = await api.patch("/api/users/me", {
        name: formData.name,
        image: formData.image
      });

      if (res.data.success) {
        toast.success("Profile updated successfully!");
        refetch(); // Refresh auth session to update navbar avatar
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Sync form data if session loads late
  if (!formData.name && user?.name) {
    setFormData({ name: user.name, image: user.image || "" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>Profile Settings</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Customize your profile information and avatar.</p>
      </div>

      <div style={{
        background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", padding: "40px", backdropFilter: "blur(10px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}>
        
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {/* Avatar Drag & Drop Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "120px", height: "120px", borderRadius: "50%",
                background: formData.image ? `url(${formData.image}) center/cover` : "linear-gradient(135deg, #6c47ff, #a855f7)",
                border: isDragging ? "2px dashed #a855f7" : "2px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "40px", fontWeight: 700,
                boxShadow: isDragging ? "0 0 20px rgba(168,85,247,0.4)" : "0 8px 24px rgba(0,0,0,0.3)",
                cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                if(!formData.image) e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                if(!formData.image) e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {!formData.image && !uploadingImage && (user?.name?.[0]?.toUpperCase() || "U")}
              
              <AnimatePresence>
                {uploadingImage && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Loader2 size={24} style={{ color: "#a855f7" }} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Overlay */}
              <div 
                className="avatar-overlay"
                style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  opacity: isDragging ? 1 : 0, transition: "opacity 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = isDragging ? 1 : 0}
              >
                <UploadCloud size={24} style={{ color: "#fff", marginBottom: "4px" }} />
                <span style={{ fontSize: "11px", fontWeight: 600 }}>Drop Image</span>
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              accept="image/*" 
              style={{ display: "none" }} 
            />

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#f1f1f5" }}>Profile Picture</div>
              <div style={{ fontSize: "12px", color: "#8b8ba8", marginTop: "4px" }}>Click or drag & drop to upload (Max 5MB)</div>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", width: "100%" }}></div>

          {/* Form Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%", padding: "14px 16px 14px 46px",
                    background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px", color: "#f1f1f5", fontSize: "15px", outline: "none", boxSizing: "border-box", transition: "all 0.2s"
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  style={{
                    width: "100%", padding: "14px 16px 14px 46px",
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "12px", color: "#8b8ba8", fontSize: "15px", outline: "none", boxSizing: "border-box", cursor: "not-allowed"
                  }}
                />
              </div>
              <p style={{ fontSize: "12px", color: "#5a5a74", marginTop: "8px" }}>Email address is linked to your authentication provider and cannot be changed.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImage}
            style={{
              background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
              padding: "16px", borderRadius: "14px", color: "#fff", fontSize: "15px", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              cursor: (loading || uploadingImage) ? "not-allowed" : "pointer", 
              opacity: (loading || uploadingImage) ? 0.7 : 1, 
              marginTop: "16px", transition: "all 0.2s",
              boxShadow: "0 8px 20px rgba(108,71,255,0.25)"
            }}
            onMouseEnter={(e) => { if(!loading && !uploadingImage) e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { if(!loading && !uploadingImage) e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Loader2 size={18} /></motion.div> Saving...</>
            ) : (
              <><Save size={18} /> Save Profile Changes</>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
