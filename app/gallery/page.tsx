import { ArchivePage } from "@/app/components/ArchivePage";
import { listGalleryImages } from "@/lib/gallery-store";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/gallery", "Community Gallery", "Browse photos and videos from GreenPune's native tree plantation drives and community events.");
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  return <ArchivePage images={await listGalleryImages()} />;
}
