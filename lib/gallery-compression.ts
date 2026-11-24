import { GALLERY_UPLOAD_MAX_BYTES, galleryMediaTypes } from "./gallery-upload";

const targetBytes = Math.floor(GALLERY_UPLOAD_MAX_BYTES * 0.88);

function rename(file: File, blob: Blob, extension: string, type: string) {
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + extension, { type });
}

async function compressPhoto(file: File) {
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return file;
    let smallest = file;
    for (const [maxSide, quality] of [[1800, 0.84], [1440, 0.76], [1080, 0.68]]) {
      const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
      if (blob?.type !== "image/webp") break;
      if (blob.size < smallest.size) smallest = rename(file, blob, ".webp", blob.type);
      if (smallest.size <= Math.min(targetBytes, file.size * 0.9)) break;
    }
    return smallest;
  } finally {
    bitmap.close();
  }
}

async function compressVideo(file: File, onProgress: (progress: number) => void) {
  const { ALL_FORMATS, BlobSource, BufferTarget, Conversion, Input, Output, WebMOutputFormat } = await import("mediabunny");
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  try {
    const video = await input.getPrimaryVideoTrack();
    const audio = await input.getPrimaryAudioTrack();
    const duration = await input.computeDuration();
    if (!video || !Number.isFinite(duration) || duration <= 0) return file;
    const [width, height] = await Promise.all([video.getDisplayWidth(), video.getDisplayHeight()]);
    const audioBitrate = 48_000;
    const bitrate = Math.min(850_000, Math.floor(Math.min(targetBytes, file.size * 0.75) * 8 / duration) - (audio ? audioBitrate : 0));
    if (bitrate < 120_000) return file;

    const target = new BufferTarget();
    const output = new Output({ target, format: new WebMOutputFormat() });
    const maxSide = bitrate < 450_000 ? 640 : 800;
    const conversion = await Conversion.init({
      input, output, tracks: "primary",
      video: {
        ...(width >= height ? { width: Math.min(width, maxSide) } : { height: Math.min(height, maxSide) }),
        codec: "vp8", bitrate, frameRate: 24, forceTranscode: true
      },
      audio: { codec: "opus", bitrate: audioBitrate, forceTranscode: true }
    });
    if (!conversion.isValid || !conversion.utilizedTracks.includes(video) ||
        (audio && !conversion.utilizedTracks.includes(audio))) {
      throw new Error(conversion.discardedTracks.map(({ reason }) => reason).join(", ") || "Required media tracks unavailable.");
    }
    conversion.onProgress = onProgress;
    await conversion.execute();
    if (!target.buffer || target.buffer.byteLength >= file.size) return file;
    return rename(file, new Blob([target.buffer]), ".webm", "video/webm");
  } finally {
    input.dispose();
  }
}

export async function prepareGalleryUpload(file: File, onProgress: (progress: number) => void) {
  const extension = file.name.match(/\.[^.]+$/)?.[0].toLowerCase() ?? "";
  const type = galleryMediaTypes[extension];
  if (!type) throw new Error("Choose a supported photo or video file.");
  let candidate = file;
  try {
    if (type.startsWith("video/") && file.size > 512 * 1024) candidate = await compressVideo(file, onProgress);
    else if (type.startsWith("image/") && type !== "image/gif" && file.size > 200 * 1024) candidate = await compressPhoto(file);
  } catch (error) {
    // Preserve the original if decoding or encoding is unsupported.
    console.warn("Gallery compression unavailable:", error);
  }
  if (candidate.size > GALLERY_UPLOAD_MAX_BYTES) {
    throw new Error(type.startsWith("video/")
      ? "This video could not fit the 4 MB upload limit. Try a shorter clip."
      : "This photo could not fit the 4 MB upload limit. Resize it and try again.");
  }
  return candidate;
}
