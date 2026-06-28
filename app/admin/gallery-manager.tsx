"use client";

import { useState } from "react";
import Image from "next/image";
import { type GalleryImage } from "@/lib/gallery-store";

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadError("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadError("Please select an image file.");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setUploadSuccess("Image uploaded successfully!");
        setImages((prev) => [result.image, ...prev]);
        setFile(null);
        setCaption("");
        
        // Reset form input manually
        const fileInput = document.getElementById("admin-gallery-file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setUploadError(result.error || "Failed to upload image.");
      }
    } catch (err) {
      setUploadError("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image from the gallery?")) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        alert(result.error || "Failed to delete image.");
      }
    } catch (err) {
      alert("An error occurred during deletion.");
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-kicker">Gallery administration</p>
          <h2>Manage Gallery</h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", padding: "24px" }}>
        
        {/* Upload Form */}
        <div className="admin-card-inner" style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #eee" }}>
          <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "16px", color: "#111" }}>Upload New Image</h3>
          <form onSubmit={handleUpload} className="admin-event-form" style={{ padding: 0 }}>
            <div className="admin-form-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              <label>
                <span>Image File</span>
                <input
                  type="file"
                  id="admin-gallery-file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  style={{ border: "1px dashed #ccc", padding: "8px", background: "#fff", borderRadius: "4px" }}
                />
              </label>
              <label>
                <span>Caption (Optional)</span>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Tree plantation drive group photo"
                  maxLength={100}
                />
              </label>
            </div>

            {uploadError && <p className="admin-error" style={{ margin: "12px 0 0" }}>{uploadError}</p>}
            {uploadSuccess && <p className="admin-success" style={{ margin: "12px 0 0" }}>{uploadSuccess}</p>}

            <button disabled={isUploading} type="submit" style={{ marginTop: "16px", width: "auto" }}>
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        </div>

        {/* Uploaded Images List */}
        <div>
          <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "16px", color: "#111" }}>Uploaded Images ({images.length})</h3>
          {images.length === 0 ? (
            <p style={{ color: "#666", fontStyle: "italic" }}>No images uploaded yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
              {images.map((img) => (
                <div 
                  key={img.id} 
                  style={{ 
                    border: "1px solid #eee", 
                    borderRadius: "8px", 
                    overflow: "hidden", 
                    background: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "120px", background: "#f5f5f5" }}>
                    <Image
                      src={img.url}
                      alt={img.caption || "Gallery Preview"}
                      fill
                      sizes="180px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "8px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#333", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: "32px", lineHeight: "1.3" }}>
                      {img.caption || <span style={{ color: "#aaa", fontStyle: "italic" }}>No caption</span>}
                    </p>
                    <button 
                      onClick={() => handleDelete(img.id)}
                      style={{ 
                        background: "#fee2e2", 
                        color: "#991b1b", 
                        border: "none", 
                        padding: "6px 12px", 
                        borderRadius: "4px", 
                        fontSize: "11px", 
                        fontWeight: "600",
                        width: "100%",
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = "#fecaca")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "#fee2e2")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
