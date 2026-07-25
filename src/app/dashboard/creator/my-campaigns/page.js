"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, FolderKanban, MoreVertical, Edit2, Trash2, Eye, TrendingUp, Users, Target, X, UploadCloud, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const IMGBB_API_KEY = "381cf4c5171920c0fa0a6254cd865633";

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Search state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "technology",
    goalAmount: "",
    deadline: "",
    coverImage: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 on search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/campaigns/my-campaigns?page=${page}&limit=5&search=${debouncedSearch}`);
      if (res.data.success) {
        setCampaigns(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [page, debouncedSearch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image Upload Logic
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
        setFormData(prev => ({ ...prev, coverImage: result.data.url }));
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadToImgBB(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadToImgBB(e.target.files[0]);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!formData.coverImage) return toast.error("Please upload a cover image");
    
    try {
      setSubmitting(true);
      const res = await api.post("/api/campaigns", formData);
      if (res.data.success) {
        toast.success("Campaign created and pending approval!");
        setIsModalOpen(false);
        setFormData({ title: "", description: "", category: "technology", goalAmount: "", deadline: "", coverImage: "" });
        fetchCampaigns();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>My Campaigns</h1>
          <p style={{ color: "#8b8ba8", margin: 0, fontSize: "15px" }}>Manage and track the performance of your active projects.</p>
        </div>
        
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#5a5a74" }} />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                padding: "10px 14px 10px 38px", borderRadius: "10px", color: "#f1f1f5",
                fontSize: "14px", outline: "none", width: "220px", transition: "all 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(108,71,255,0.5)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{
            background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none",
            padding: "10px 18px", borderRadius: "10px", color: "#fff", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, transition: "transform 0.2s", fontSize: "14px", boxShadow: "0 4px 14px rgba(108,71,255,0.3)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            <Plus size={16} /> New Campaign
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {loading ? (
           <div style={{ gridColumn: "1/-1", display: "flex", justifyContent: "center", padding: "60px 0", color: "#a855f7" }}>
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Loader2 size={32} /></motion.div>
           </div>
        ) : campaigns.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#8b8ba8", background: "rgba(15,15,26,0.6)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
            <FolderKanban size={48} style={{ margin: "0 auto 16px", color: "#5a5a74" }} />
            <h3 style={{ color: "#fff", fontSize: "18px", marginBottom: "8px" }}>No Campaigns Found</h3>
            <p>You haven't created any campaigns yet or none match your search.</p>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <motion.div key={campaign._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{
              background: "rgba(15,15,26,0.6)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ height: "160px", background: `url(${campaign.coverImage}) center/cover`, position: "relative" }}>
                <div style={{
                  position: "absolute", top: "12px", right: "12px",
                  background: campaign.status === 'approved' ? "rgba(16,185,129,0.9)" : campaign.status === 'pending' ? "rgba(245,158,11,0.9)" : "rgba(239,68,68,0.9)",
                  color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", backdropFilter: "blur(4px)", textTransform: "capitalize"
                }}>
                  {campaign.status}
                </div>
              </div>
              
              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "12px", color: "#a855f7", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{campaign.category}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 16px 0", lineHeight: 1.3 }}>{campaign.title}</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#8b8ba8", marginBottom: "4px" }}>Raised</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}><TrendingUp size={14} /> ${campaign.raisedAmount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#8b8ba8", marginBottom: "4px" }}>Goal</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#f1f1f5", display: "flex", alignItems: "center", gap: "4px" }}><Target size={14} /> ${campaign.goalAmount}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                  <button style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "10px", borderRadius: "10px", color: "#f1f1f5", fontSize: "13px", fontWeight: 600, display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "10px", borderRadius: "10px", color: "#f1f1f5", fontSize: "13px", fontWeight: 600, display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                    <Eye size={14} /> View
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "32px" }}>
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "8px", color: "#f1f1f5", display: "flex", alignItems: "center", gap: "8px", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.5 : 1 }}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <div style={{ color: "#8b8ba8", fontSize: "14px" }}>Page <span style={{ color: "#fff", fontWeight: 700 }}>{page}</span> of {totalPages}</div>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "8px", color: "#f1f1f5", display: "flex", alignItems: "center", gap: "8px", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.5 : 1 }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Create Campaign Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0 }}>Create New Campaign</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: "transparent", border: "none", color: "#8b8ba8", cursor: "pointer", padding: "4px" }}><X size={20} /></button>
              </div>

              <form onSubmit={handleCreateCampaign} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* Image Upload */}
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Cover Image</label>
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      height: "160px", borderRadius: "12px", border: isDragging ? "2px dashed #a855f7" : "2px dashed rgba(255,255,255,0.2)",
                      background: formData.coverImage ? `url(${formData.coverImage}) center/cover` : "rgba(255,255,255,0.02)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.2s"
                    }}
                  >
                    {!formData.coverImage && !uploadingImage && (
                      <>
                        <UploadCloud size={32} style={{ color: "#a855f7", marginBottom: "12px" }} />
                        <div style={{ color: "#f1f1f5", fontWeight: 600, fontSize: "14px" }}>Click or drag image here</div>
                        <div style={{ color: "#5a5a74", fontSize: "12px", marginTop: "4px" }}>SVG, PNG, JPG (Max 5MB)</div>
                      </>
                    )}
                    {uploadingImage && (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Loader2 size={32} style={{ color: "#a855f7" }} /></motion.div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" style={{ display: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Campaign Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g., Next-Gen Smart Watch"
                    style={{ width: "100%", padding: "12px 14px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Description</label>
                  <textarea name="description" required value={formData.description} onChange={handleInputChange} placeholder="Describe your campaign..." rows="4"
                    style={{ width: "100%", padding: "12px 14px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box", resize: "vertical" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}
                      style={{ width: "100%", padding: "12px 14px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                    >
                      <option value="technology">Technology</option>
                      <option value="arts">Arts & Design</option>
                      <option value="health">Health & Fitness</option>
                      <option value="education">Education</option>
                      <option value="environment">Environment</option>
                      <option value="community">Community</option>
                      <option value="business">Business</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Goal Amount (USD)</label>
                    <input type="number" name="goalAmount" required min="200" value={formData.goalAmount} onChange={handleInputChange} placeholder="Min. 200"
                      style={{ width: "100%", padding: "12px 14px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#8b8ba8", marginBottom: "8px" }}>Deadline</label>
                  <input type="date" name="deadline" required value={formData.deadline} onChange={handleInputChange}
                    style={{ width: "100%", padding: "12px 14px", background: "rgba(9,9,15,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#f1f1f5", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <button type="submit" disabled={submitting || uploadingImage} style={{
                  background: "linear-gradient(135deg, #6c47ff, #a855f7)", border: "none", padding: "14px", borderRadius: "10px", color: "#fff", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: (submitting || uploadingImage) ? "not-allowed" : "pointer", opacity: (submitting || uploadingImage) ? 0.7 : 1, marginTop: "8px", transition: "all 0.2s"
                }}>
                  {submitting ? <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Loader2 size={18} /></motion.div> Creating...</> : "Create Campaign"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
