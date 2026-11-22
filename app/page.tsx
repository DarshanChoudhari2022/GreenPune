import { HomeClient } from "./home-client";
import { listEvents } from "@/lib/event-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  return <HomeClient events={await listEvents()} />;
}
