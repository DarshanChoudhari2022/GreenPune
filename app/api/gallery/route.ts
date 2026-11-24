import path from "node:path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteGalleryImage, galleryWritesAvailable, listGalleryImages, saveGalleryMedia } from "@/lib/gallery-store";
import { GALLERY_UPLOAD_MAX_BYTES, galleryMediaTypes } from "@/lib/gallery-upload";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });
const unavailable = () => fail("Gallery storage is not configured. Set up Supabase Storage before changing production media.", 503);

function refreshGallery() {
  revalidatePath("/gallery");
  revalidatePath("/admin");
}

export async function GET() {
  try {
    return NextResponse.json({ ok: true, images: await listGalleryImages() });
  } catch (error) {
    console.error("Could not load gallery:", error);
    return fail("Could not load gallery media.", 500);
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return fail("Unauthorized.", 401);
  if (!galleryWritesAvailable()) return unavailable();

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string" || !file.size) return fail("Choose a photo or video to upload.", 400);
  if (file.size > GALLERY_UPLOAD_MAX_BYTES) return fail("Choose a photo or short video up to 4 MB.", 413);
  const contentType = galleryMediaTypes[path.extname(file.name).toLowerCase()];
  if (!contentType || (file.type && file.type !== "application/octet-stream" && file.type !== contentType)) {
    return fail("Choose a JPEG, PNG, WebP, GIF, AVIF, MP4, WebM or MOV file.", 400);
  }
  const caption = String(form?.get("caption") ?? "").trim();
  if (caption.length > 150) return fail("Use a caption of 150 characters or less.", 400);

  try {
    const image = await saveGalleryMedia(file, contentType, caption || (contentType.startsWith("video/") ? "Gallery video" : "Gallery photo"));
    refreshGallery();
    return NextResponse.json({ ok: true, image });
  } catch (error) {
    console.error("Could not save gallery media:", error);
    return fail("Upload could not be saved. Check the gallery bucket and database setup, then try again.", 500);
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return fail("Unauthorized.", 401);
  if (!galleryWritesAvailable()) return unavailable();
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return fail("Media ID is required.", 400);
  try {
    if (!(await deleteGalleryImage(id))) return fail("Media was not found.", 404);
    refreshGallery();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Could not delete gallery media:", error);
    return fail("Could not delete gallery media. Check the storage setup and try again.", 500);
  }
}
