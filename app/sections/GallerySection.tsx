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
  const [images] = useState<GalleryImage[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const t = {
    en: {
      eyebrow: "Community Gallery",
      title: "Memories from the Ground",
      intro: "Photos uploaded by our volunteers and community members from various tree plantation drives.",
      noImages: "No photos in the gallery yet. Stay tuned!",
    },
    mr: {
      eyebrow: "कम्युनिटी गॅलरी",
      title: "वृक्षारोपणाचे क्षण",
      intro: "आमच्या स्वयंसेवकांनी आणि नागरिकांनी विविध वृक्षारोपण मोहिमेदरम्यान घेतलेली छायाचित्रे.",
      noImages: "गॅलरीमध्ये अद्याप कोणतेही फोटो नाहीत. लवकरच!",
    }
  }[lang];

  return (
    <section className="gallery-section" id="gallery">
      <div className="slide-inner">
        <div className="section-header">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-intro">{t.intro}</p>
        </div>

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
