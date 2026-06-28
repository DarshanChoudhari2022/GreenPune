import { HomeClient } from "./home-client";
import { listEvents } from "@/lib/event-store";
import { listGalleryImages } from "@/lib/gallery-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [events, images] = await Promise.all([
    listEvents(),
    listGalleryImages()
  ]);

  return <HomeClient events={events} initialImages={images} />;
}
