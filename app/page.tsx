import { HomeClient } from "./home-client";
import { listEvents } from "@/lib/event-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const events = await listEvents();

  return <HomeClient events={events} />;
}
