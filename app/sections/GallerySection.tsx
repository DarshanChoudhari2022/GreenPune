"use client";

import { useState } from "react";
import Image from "next/image";
import { type Language } from "@/lib/site-content";
import { type GalleryImage } from "@/lib/gallery-store";

interface GallerySectionProps {
  lang: Language;
  initialImages: GalleryImage[];
}

function isVideoUrl(url: string, mediaType?: string) {
  if (mediaType === "video") return true;
  return /\.(mp4|webm|mov|avi|mkv)$/i.test(url);
}

export function GallerySection({ lang, initialImages }: GallerySectionProps) {
  const [images] = useState<GalleryImage[]>(initialImages);
  const [selectedMedia, setSelectedMedia] = useState<GalleryImage | null>(null);
  const [copied, setCopied] = useState(false);

  const t = {
    en: {
      eyebrow: "Community Gallery & Highlights",
      title: "Community gallery",
      intro: "Photos and videos from our 15 August 2026 plantation drive at Anandvan, Mahadevwadi, Pune.",
      noImages: "Photos & video highlights will be uploaded here shortly by our team!",
      shareBtn: "Share Drive Highlights & Gallery",
      copiedText: "Link Copied to Clipboard!"
    },
    mr: {
      eyebrow: "कम्युनिटी गॅलरी आणि हायलाईट्स",
      title: "आनंदवन मोहिमेचे क्षणचित्र आणि व्हिडिओ",
      intro: "१५ ऑगस्ट २०२६ रोजी आनंदवन, महादेववाडी, पुणे येथील वृक्षारोपण मोहिमेची छायाचित्रे व व्हिडिओ हायलाईट्स.",
      noImages: "आनंदवन मोहिमेची छायाचित्रे आणि व्हिडिओ लवकरच येथे अपलोड केले जातील!",
      shareBtn: "मोहिमेचे फोटो व व्हिडिओ शेअर करा",
      copiedText: "दुवा कॉपी झाला!"
    }
  }[lang];

  const shareText = lang === "mr"
    ? `🌳 *आनंदवन महादेववाडी वृक्षारोपण मोहीम २०२६*\n📅 *दिनांक*: १५ ऑगस्ट २०२६ (सकाळी ११:०० ते दुपारी २:००)\n📍 *स्थान*: आनंदवन, महादेववाडी, पुणे\n🌿 *झाडे लावली*: ११० रोपे\n🤝 *आयोजक*: सकल हिंदू समाज आणि चोक्सी स्कूल पुणे\n🎭 *जनजागृती नृत्य*: चोक्सी स्कूल पुणे च्या विद्यार्थ्यांद्वारे वृक्षारोपण जनजागृती नृत्य सादरीकरण\n📞 *संपर्क*: मयांक गोहर (+91 9623130157)\n\n📸 *मोहिमेचे फोटो व व्हिडिओ पहा*:`
    : `🌳 *Anandvan, Mahadevwadi Tree Plantation Drive 2026*\n📅 *Date*: 15 August 2026 (11:00 AM – 2:00 PM IST)\n📍 *Location*: Anandvan, Mahadevwadi, Pune\n🌿 *Trees Planted*: 110 Native Trees\n🤝 *Organizers*: Sakal Hindu Samaj & Choksi School Pune\n🎭 *Special Performance*: Tree Plantation Awareness Dance Act by students of Choksi School Pune\n📞 *Contact*: Mayank Goher (+91 9623130157)\n\n📸 *View Photos & Video Highlights*:`;

  const shareUrl = new URL("/gallery", process.env.NEXT_PUBLIC_SITE_URL || "https://www.greenpune.in").href;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "GreenPune Event Highlights & Gallery",
          text: shareText,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback ignore cancel
    }
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="slide-inner">
        <div className="section-header">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="section-title">{t.title}</h1>
          <p className="section-intro">{t.intro}</p>

          <div className="gallery-share-bar" style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="https://drive.google.com/drive/folders/17Z-pQMYlNhUkpZpvk2Rjt6hWhvocGW7r"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn gdrive-btn"
              style={{ padding: "10px 18px", fontSize: "13px" }}
            >
              📁 {lang === "mr" ? "सर्व फोटो व व्हिडिओ Google Drive वर पहा" : "View All Photos & Videos on Google Drive"}
            </a>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-action"
              style={{ padding: "10px 18px", fontSize: "13px" }}
            >
              💬 {lang === "mr" ? "WhatsApp वर शेअर करा" : "Share on WhatsApp"}
            </a>
            <button
              onClick={handleCopyLink}
              className="secondary-btn"
              style={{ padding: "10px 18px", fontSize: "13px" }}
            >
              🔗 {copied ? t.copiedText : t.shareBtn}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="gallery-empty" style={{ margin: "24px 0", padding: "32px", background: "rgba(255,255,255,0.8)", borderRadius: "16px", textAlign: "center" }}>
            <p style={{ margin: 0, color: "#444", fontWeight: 500 }}>{t.noImages}</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img) => {
              const isVid = isVideoUrl(img.url, img.mediaType);
              return (
                <div 
                  key={img.id} 
                  className="gallery-card"
                  onClick={() => setSelectedMedia(img)}
                >
                  <div className="gallery-image-wrapper">
                    {isVid ? (
                      <video
                        src={img.url}
                        controls={false}
                        muted
                        playsInline
                        className="gallery-img"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    ) : (
                      <Image
                        src={img.url}
                        alt={img.caption || (lang === "mr" ? "ग्रीनपुणे आनंदवन वृक्षारोपण मोहीम छायाचित्र" : "GreenPune Anandvan tree plantation drive highlight")}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="gallery-img"
                      />
                    )}
                    {isVid && (
                      <span className="media-play-badge" style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 600 }}>
                        ▶ Video
                      </span>
                    )}
                  </div>
                  {img.caption && (
                    <div className="gallery-caption">
                      <p>{img.caption}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Media Modal */}
      {selectedMedia && (
        <div className="gallery-lightbox" onClick={() => setSelectedMedia(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedMedia(null)}>
              &times;
            </button>
            <div className="lightbox-image-wrapper">
              {isVideoUrl(selectedMedia.url, selectedMedia.mediaType) ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="lightbox-img"
                  style={{ maxHeight: "80vh", width: "100%" }}
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.caption || (lang === "mr" ? "ग्रीनपुणे आनंदवन वृक्षारोपण मोहीम छायाचित्र" : "GreenPune Anandvan tree plantation drive highlight")}
                  className="lightbox-img"
                />
              )}
            </div>
            {selectedMedia.caption && (
              <div className="lightbox-caption">
                <p>{selectedMedia.caption}</p>
                <span className="lightbox-date">
                  {new Date(selectedMedia.createdAt).toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
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
