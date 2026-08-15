import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { listGalleryImages, addGalleryImage, deleteGalleryImage, type GalleryImage } from "@/lib/gallery-store";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try {
    const images = await listGalleryImages();
    return NextResponse.json({ ok: true, images });
  } catch (error: any) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const caption = String(formData.get("caption") || "").trim();

    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, error: "Please select a valid photo or video file." }, { status: 400 });
    }

    const mimeType = file.type || "";
    const isVideo = mimeType.startsWith("video/") || /\.(mp4|webm|mov|avi|mkv)$/i.test(file.name);
    const isImage = mimeType.startsWith("image/") || /\.(png|jpe?g|webp|gif|heic|avif|bmp)$/i.test(file.name);

    if (!isImage && !isVideo) {
      return NextResponse.json({ ok: false, error: "Only image and video files are allowed." }, { status: 400 });
    }

    // Read file bytes
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save locally to public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const timestamp = Date.now();
    const sanitizedName = (file.name || "upload").replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${sanitizedName}`;
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;
    const imageRecord: GalleryImage = {
      id: `img_${timestamp}_${Math.random().toString(36).substring(2, 7)}`,
      url: imageUrl,
      caption: caption || (isVideo ? "Nandanvan Drive Video Highlight" : "Nandanvan Drive Photo"),
      createdAt: new Date().toISOString(),
      mediaType: isVideo ? "video" : "image"
    };

    await addGalleryImage(imageRecord);

    // Revalidate paths so the new upload shows up immediately
    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({ ok: true, image: imageRecord });
  } catch (error: any) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Server error while saving uploaded file." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Authenticate admin session
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "Image ID is required." }, { status: 400 });
    }

    await deleteGalleryImage(id);

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("DELETE /api/gallery error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
