import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import defaultGalleryData from "@/data/gallery.json";

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  createdAt: string;
  mediaType?: "image" | "video";
}

const table = "gallery_images";
const bucket = "gallery-media";
const indexPath = path.join(process.cwd(), "data", "gallery.json");
const uploadDir = path.join(process.cwd(), "public", "uploads");
const bundled = defaultGalleryData as GalleryImage[];
const sortMedia = (items: GalleryImage[]) => items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

function cloudClient() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  return SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;
}

async function readLocalIndex(): Promise<GalleryImage[]> {
  try {
    return JSON.parse(await fs.readFile(indexPath, "utf8")) as GalleryImage[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return [...bundled];
  }
}

async function writeLocalIndex(images: GalleryImage[]) {
  await fs.mkdir(path.dirname(indexPath), { recursive: true });
  await fs.writeFile(indexPath, JSON.stringify(images, null, 2));
}

export function galleryWritesAvailable() {
  return process.env.NODE_ENV !== "production" || Boolean(cloudClient());
}

export async function listGalleryImages(): Promise<GalleryImage[]> {
  const cloud = cloudClient();
  if (!cloud) {
    return sortMedia(process.env.NODE_ENV === "production" ? [...bundled] : await readLocalIndex());
  }

  const { data, error } = await cloud.from(table).select("*");
  if (error) {
    console.error("Could not read cloud gallery:", error.message);
    return sortMedia([...bundled]);
  }

  const cloudUrls = new Set(data.map((record) => record.url));
  const images: GalleryImage[] = data.filter((record) => !record.hidden).map((record) => ({
    id: record.id,
    url: record.url,
    caption: record.caption || "",
    createdAt: record.created_at,
    mediaType: record.media_type || (/\.(mp4|webm|mov)$/i.test(record.url) ? "video" : "image")
  }));
  return sortMedia([...images, ...bundled.filter((item) => !cloudUrls.has(item.url))]);
}

export async function saveGalleryMedia(file: File, contentType: string, caption: string): Promise<GalleryImage> {
  const cloud = cloudClient();
  const id = randomUUID();
  const filename = `${id}${path.extname(file.name).toLowerCase()}`;
  const data = await file.arrayBuffer();
  const mediaType = contentType.startsWith("video/") ? "video" : "image";
  const image = { id, caption, createdAt: new Date().toISOString(), mediaType } satisfies Omit<GalleryImage, "url">;
  if (cloud) {
    const storage = cloud.storage.from(bucket);
    const { error: uploadError } = await storage.upload(filename, data, { contentType });
    if (uploadError) throw uploadError;
    const url = storage.getPublicUrl(filename).data.publicUrl;
    const { error } = await cloud.from(table).insert({
      id, url, caption, created_at: image.createdAt, media_type: mediaType, storage_path: filename
    });
    if (error) {
      const cleanup = await storage.remove([filename]);
      if (cleanup.error) console.error("Could not clean up gallery upload:", cleanup.error);
      throw error;
    }
    return { ...image, url };
  }
  if (process.env.NODE_ENV === "production") throw new Error("Cloud gallery storage is not configured.");

  const local = { ...image, url: `/uploads/${filename}` };
  const images = await readLocalIndex();
  await fs.mkdir(uploadDir, { recursive: true });
  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, Buffer.from(data));
  try {
    await writeLocalIndex([...images, local]);
  } catch (error) {
    await fs.unlink(filepath).catch(console.error);
    throw error;
  }
  return local;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const cloud = cloudClient();
  if (cloud) {
    const seed = bundled.find((item) => item.id === id);
    if (seed) {
      // Hide shipped media without editing immutable deployment assets.
      const { error } = await cloud.from(table).upsert({
        bundled_id: id, url: seed.url, hidden: true
      }, { onConflict: "bundled_id" });
      if (error) throw error;
      return true;
    }
    if (!/^[0-9a-f-]{36}$/i.test(id)) return false;
    const { data, error } = await cloud.from(table).update({ hidden: true })
      .eq("id", id).select("storage_path").maybeSingle();
    if (error) throw error;
    if (!data) return false;
    if (data.storage_path) {
      const { error: cleanupError } = await cloud.storage.from(bucket).remove([data.storage_path]);
      if (cleanupError) console.error("Could not remove hidden gallery asset:", cleanupError);
    }
    return true;
  }
  if (process.env.NODE_ENV === "production") throw new Error("Cloud gallery storage is not configured.");

  const images = await readLocalIndex();
  const found = images.find((item) => item.id === id);
  if (!found) return false;
  await writeLocalIndex(images.filter((item) => item.id !== id));
  if (/^\/uploads\/[0-9a-f-]{36}\.[a-z0-9]+$/i.test(found.url)) {
    await fs.unlink(path.join(uploadDir, path.basename(found.url))).catch(console.error);
  }
  return true;
}
