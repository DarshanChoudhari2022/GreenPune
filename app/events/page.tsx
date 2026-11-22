import { ArchivePage } from "@/app/components/ArchivePage";
import { listEvents } from "@/lib/event-store";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/events", "Completed Plantation Drives", "Explore GreenPune's completed native tree plantation drives and community milestones across Pune.");
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = (await listEvents())
    .filter((event) => event.status === "completed")
    .sort((a, b) => b.date.localeCompare(a.date));
  return <ArchivePage events={events} />;
}
