"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Mail, UploadCloud, Save, Loader2, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import axios from "axios";
import api from "@/lib/axios";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
      });
      setImagePreview(user.image || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    } else {
      toast.error("Please drop a valid image file");
    }
  };

  const handleFileChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    
    if (!apiKey) {
      throw new Error("ImgBB API key is missing. Add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.");
    }

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    return response.data.data.url;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = imagePreview;

      // Only upload if a new file was selected
      if (imageFile) {
        toast.loading("Uploading image...", { id: "upload" });
        finalImageUrl = await uploadToImgBB(imageFile);
        toast.dismiss("upload");
      }

      const response = await api.patch("/api/users/me", {
        name: formData.name,
        image: finalImageUrl,
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        window.location.reload();
      }
    } catch (err) {
      toast.dismiss("upload");
      toast.error(err.response?.data?.message || err.message || "Failed to update profile");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: "800px" }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#f1f1f5", margin: "0 0 12px 0" }}>Profile Settings</h1>
        <p style={{ color: "#8b8ba8", margin: 0, fontSize: "16px" }}>
          Update your creator profile information. This will be displayed on your campaigns.
        </p>
      </div>

      <div style={{
        background: "rgba(19,19,31,0.6)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px", padding: "40px", backdropFilter: "blur(16px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Drag and Drop Avatar Section */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#a1a1aa", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Profile Picture</label>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%", padding: "40px 20px",
                background: isDragging ? "rgba(168,85,247,0.08)" : "rgba(9,9,15,0.8)",
                border: isDragging ? "2px dashed #a855f7" : "2px dashed rgba(255,255,255,0.1)",
                borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.3s ease", position: "relative", gap: "16px"
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files[0] && handleFileChange(e.target.files[0])}
                accept="image/*"
                style={{ display: "none" }}
              />

              {imagePreview ? (
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: "120px", height: "120px", borderRadius: "24px",
                    background: `url(${imagePreview}) center/cover`,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                    border: "3px solid rgba(168,85,247,0.4)"
                  }} />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview(user.image || "");
                      if(fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    style={{
                      position: "absolute", top: "-10px", right: "-10px", width: "32px", height: "32px",
                      borderRadius: "50%", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(239,68,68,0.4)"
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div style={{
                  width: "100px", height: "100px", borderRadius: "24px",
                  background: "linear-gradient(135deg, #6c47ff, #a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "36px", fontWeight: 800,
                  boxShadow: "0 10px 25px rgba(108,71,255,0.3)",
                }}>
                  {formData.name?.[0]?.toUpperCase() || user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}

              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#f1f1f5", fontSize: "16px", fontWeight: 600, margin: "0 0 4px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <UploadCloud size={20} style={{ color: "#a855f7" }} /> 
                  {imagePreview ? "Change Image" : "Upload Image"}
                </p>
                <p style={{ color: "#8b8ba8", fontSize: "13px", margin: 0 }}>Drag and drop an image here, or click to browse.</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#a1a1aa", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
              <input
                type="email"
                value={user.email}
                disabled
                style={{
                  width: "100%", padding: "16px 16px 16px 48px",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "16px", color: "#5a5a74", fontSize: "16px", outline: "none", boxSizing: "border-box", cursor: "not-allowed"
                }}
              />
            </div>
            <p style={{ fontSize: "13px", color: "#5a5a74", marginTop: "8px" }}>Your email address is used for login and cannot be changed.</p>
          </div>

          <div style={{ marginTop: "12px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #a855f7, #6c47ff)", border: "none",
                padding: "16px 32px", borderRadius: "16px", color: "#fff", fontSize: "16px", fontWeight: 800,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.2s",
                boxShadow: "0 10px 25px rgba(108,71,255,0.3)"
              }}
              onMouseEnter={e => { if(!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(108,71,255,0.4)"; } }}
              onMouseLeave={e => { if(!loading) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(108,71,255,0.3)"; } }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
          
        </form>
      </div>
    </motion.div>
  );
}
