"use client";

import { useState } from "react";
import Image from "next/image";
import { type Language } from "@/lib/site-content";
import { type GalleryImage } from "@/lib/gallery-store";

interface GallerySectionProps {
  lang: Language;
  initialImages: GalleryImage[];
}

export function GallerySection({ lang, initialImages }: GallerySectionProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const t = {
    en: {
      eyebrow: "Community Gallery",
      title: "Memories from the Ground",
      intro: "Photos uploaded by our volunteers and community members from various tree plantation drives.",
      uploadTitle: "Share Your Plantation Memory",
      uploadBtn: "Upload Photo",
      captionLabel: "Caption / Message",
      captionPlaceholder: "e.g., Planted a neem tree at Mahadji Shinde Nagar!",
      fileLabel: "Select Image File",
      submit: "Submit to Gallery",
      submitting: "Uploading...",
      success: "Your memory has been added to the gallery!",
      error: "Failed to upload image. Please try again.",
      close: "Close",
      noImages: "No photos in the gallery yet. Be the first to share one!",
      addBtn: "Share a Photo"
    },
    mr: {
      eyebrow: "कम्युनिटी गॅलरी",
      title: "वृक्षारोपणाचे क्षण",
      intro: "आमच्या स्वयंसेवकांनी आणि नागरिकांनी विविध वृक्षारोपण मोहिमेदरम्यान घेतलेली छायाचित्रे.",
      uploadTitle: "आपली वृक्षारोपणाची आठवण शेअर करा",
      uploadBtn: "फोटो अपलोड करा",
      captionLabel: "कॅप्शन / संदेश",
      captionPlaceholder: "उदा., शिंदे नगर येथे कडुनिंबाचे झाड लावले!",
      fileLabel: "फोटो निवडा",
      submit: "गॅलरीमध्ये जोडा",
      submitting: "अपलोड होत आहे...",
      success: "तुमची आठवण गॅलरीमध्ये यशस्वीरित्या जोडली गेली आहे!",
      error: "फोटो अपलोड करण्यात त्रुटी आली. कृपया पुन्हा प्रयत्न करा.",
      close: "बंद करा",
      noImages: "गॅलरीमध्ये अद्याप कोणतेही फोटो नाहीत. पहिले छायाचित्र शेअर करा!",
      addBtn: "फोटो शेअर करा"
    }
  }[lang];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadError("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadError(lang === "mr" ? "कृपया एक फोटो निवडा." : "Please select an image file.");
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
        setUploadSuccess(t.success);
        setImages((prev) => [result.image, ...prev]);
        setFile(null);
        setCaption("");
        // Reset form input manually
        const fileInput = document.getElementById("gallery-file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        
        // Hide form after a short delay
        setTimeout(() => {
          setShowUploadForm(false);
          setUploadSuccess("");
        }, 2000);
      } else {
        setUploadError(result.error || t.error);
      }
    } catch (err) {
      setUploadError(t.error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="slide-inner">
        <div className="section-header">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
          
          <button 
            className="gallery-add-btn" 
            onClick={() => setShowUploadForm(!showUploadForm)}
            aria-expanded={showUploadForm}
          >
            {showUploadForm ? t.close : t.addBtn}
          </button>
        </div>

        {/* Upload Form Modal/Expandable */}
        {showUploadForm && (
          <div className="gallery-upload-card">
            <h3>{t.uploadTitle}</h3>
            <form onSubmit={handleUpload} className="gallery-form">
              <div className="form-group">
                <label htmlFor="gallery-file-input">{t.fileLabel}</label>
                <input
                  type="file"
                  id="gallery-file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gallery-caption-input">{t.captionLabel}</label>
                <input
                  type="text"
                  id="gallery-caption-input"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={t.captionPlaceholder}
                  maxLength={100}
                  className="text-input"
                />
              </div>

              {uploadError && <p className="gallery-error">{uploadError}</p>}
              {uploadSuccess && <p className="gallery-success">{uploadSuccess}</p>}

              <div className="form-actions">
                <button type="submit" disabled={isUploading} className="submit-btn">
                  {isUploading ? t.submitting : t.submit}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="gallery-empty">
            <p>{t.noImages}</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="gallery-card"
                onClick={() => setSelectedImage(img)}
              >
                <div className="gallery-image-wrapper">
                  <Image
                    src={img.url}
                    alt={img.caption || "Gallery Image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="gallery-img"
                  />
                </div>
                {img.caption && (
                  <div className="gallery-caption">
                    <p>{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Image Modal */}
      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <div className="lightbox-image-wrapper">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption || "Gallery Image"}
                className="lightbox-img"
              />
            </div>
            {selectedImage.caption && (
              <div className="lightbox-caption">
                <p>{selectedImage.caption}</p>
                <span className="lightbox-date">
                  {new Date(selectedImage.createdAt).toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
                    dateStyle: "medium"
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
