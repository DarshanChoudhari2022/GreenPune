import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import defaultGalleryData from "@/data/gallery.json";

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  createdAt: string;
  mediaType?: "image" | "video";
}

const fallbackPath = path.join(process.cwd(), "data", "gallery.json");

export async function listGalleryImages(): Promise<GalleryImage[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = "gallery_images";

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error listing gallery, falling back to local:", error.message);
      } else if (data && data.length > 0) {
        return data.map((record) => ({
          id: record.id,
          url: record.url,
          caption: record.caption || "",
          createdAt: record.created_at,
          mediaType: record.media_type || (/\.(mp4|webm|mov)$/i.test(record.url) ? "video" : "image")
        }));
      }
    } catch (e: any) {
      console.error("Supabase exception listing gallery, falling back to local:", e.message || e);
    }
  }

  // Fallback to local file storage or bundled default data
  try {
    const raw = await fs.readFile(fallbackPath, "utf8");
    const images = JSON.parse(raw) as GalleryImage[];
    if (images.length > 0) {
      return images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  } catch {
    // Ignore read error and use imported default JSON
  }

  return (defaultGalleryData as GalleryImage[]).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addGalleryImage(image: GalleryImage): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = "gallery_images";

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from(table).insert({
        id: image.id,
        url: image.url,
        caption: image.caption,
        created_at: image.createdAt,
        media_type: image.mediaType || "image"
      });

      if (error) {
        console.error("Supabase error inserting gallery image:", error.message);
      }
    } catch (e: any) {
      console.error("Supabase exception inserting gallery image:", e.message || e);
    }
  }

  // Always write to local as fallback or dual-write
  try {
    let images: GalleryImage[] = [];
    try {
      const raw = await fs.readFile(fallbackPath, "utf8");
      images = JSON.parse(raw) as GalleryImage[];
    } catch {
      images = defaultGalleryData as GalleryImage[];
    }

    images.push(image);
    await fs.mkdir(path.dirname(fallbackPath), { recursive: true });
    await fs.writeFile(fallbackPath, JSON.stringify(images, null, 2));
  } catch (err: any) {
    console.error("Failed to save gallery image locally:", err);
  }
}

export async function deleteGalleryImage(id: string): Promise<void> {
  // Read local file to see if we need to delete physical file
  let imageToDelete: GalleryImage | undefined;
  try {
    const raw = await fs.readFile(fallbackPath, "utf8");
    const images = JSON.parse(raw) as GalleryImage[];
    imageToDelete = images.find((img) => img.id === id);
  } catch {
    // Ignore error, might only be on Supabase
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = "gallery_images";

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from(table).delete().eq("id", id);

      if (error) {
        console.error("Supabase error deleting gallery image:", error.message);
      }
    } catch (e: any) {
      console.error("Supabase exception deleting gallery image:", e.message || e);
    }
  }

  // Remove from local file
  try {
    const raw = await fs.readFile(fallbackPath, "utf8");
    let images = JSON.parse(raw) as GalleryImage[];
    images = images.filter((img) => img.id !== id);
    await fs.writeFile(fallbackPath, JSON.stringify(images, null, 2));

    // Delete local physical file if it exists and is local
    if (imageToDelete && imageToDelete.url.startsWith("/uploads/")) {
      const filename = imageToDelete.url.substring("/uploads/".length);
      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      try {
        await fs.unlink(filePath);
      } catch (e) {
        console.warn("Failed to delete physical file (it might have been deleted already):", e);
      }
    }
  } catch (err: any) {
    console.error("Failed to delete gallery image locally:", err);
  }
}
