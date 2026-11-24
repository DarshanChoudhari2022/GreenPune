import type { GalleryImage } from "./gallery-store";

export const galleryTimeZone = "Asia/Kolkata";

const dayKey = new Intl.DateTimeFormat("en-CA", {
  timeZone: galleryTimeZone, year: "numeric", month: "2-digit", day: "2-digit"
});

export function groupGalleryByUploadDate(items: GalleryImage[]) {
  const groups = new Map<string, GalleryImage[]>();
  const ordered = [...items].sort((a, b) =>
    (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0)
  );
  for (const item of ordered) {
    const timestamp = Date.parse(item.createdAt);
    const key = Number.isFinite(timestamp) ? dayKey.format(timestamp) : "";
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }
  return [...groups].map(([date, media]) => ({ date, media }));
}
