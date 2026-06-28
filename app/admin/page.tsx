import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCurrentEvent, listEvents } from "@/lib/event-store";
import { listRegistrations } from "@/lib/registration-store";
import { listQuestions } from "@/lib/questions-store";
import { listGalleryImages } from "@/lib/gallery-store";
import { logoutAdmin } from "./actions";
import { EventForm } from "./event-form";
import { QuestionsEditor } from "./questions-editor";
import { GalleryManager } from "./gallery-manager";
import { type EventItem } from "@/lib/events";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin | GreenPune"
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

const blankEvent: EventItem = {
  id: "",
  title: "",
  titleEnglish: "",
  titleDevanagari: "",
  organizer: "",
  organizerEnglish: "",
  date: "",
  dateLabel: "",
  dateLabelEnglish: "",
  location: "",
  locationEnglish: "",
  theme: "",
  themeEnglish: "",
  summary: "",
  summaryMarathi: "",
  status: "open"
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [registrations, events, currentEvent, questions, images] = await Promise.all([
    listRegistrations(),
    listEvents(),
    getCurrentEvent(),
    listQuestions(),
    listGalleryImages()
  ]);

  const bringTreeCount = registrations.filter((record) => record.canBringTree === "yes" || record.answers?.canBringTree === "yes").length;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">GreenPune Admin</p>
          <h1>Dashboard</h1>
          <p>Manage event entries and review incoming registrations.</p>
        </div>
        <form action={logoutAdmin}>
          <button className="admin-ghost-button" type="submit">
            Logout
          </button>
        </form>
      </header>

      <section className="admin-stats">
        <article>
          <span>Total registrations</span>
          <strong>{registrations.length}</strong>
        </article>
        <article>
          <span>Can bring saplings</span>
          <strong>{bringTreeCount}</strong>
        </article>
        <article>
          <span>Published events</span>
          <strong>{events.length}</strong>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="admin-kicker">Current site event</p>
            <h2>{currentEvent.titleEnglish}</h2>
          </div>
          <a className="admin-link-button" href="/" target="_blank">
            View site
          </a>
        </div>
        <EventForm event={currentEvent} />
      </section>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="admin-kicker">Push new event</p>
            <h2>Create event</h2>
          </div>
        </div>
        <EventForm event={blankEvent} />
      </section>

      {/* Dynamic Questions Editor Panel */}
      <QuestionsEditor initialQuestions={questions} />

      {/* Gallery Manager Panel */}
      <GalleryManager initialImages={images} />

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="admin-kicker">Registrations received</p>
            <h2>Entries</h2>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Event</th>
                <th>Custom Answers</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={6}>No registrations yet.</td>
                </tr>
              ) : (
                registrations.map((record, index) => (
                  <tr key={record.id || `${record.phone}-${index}`}>
                    <td>{record.name}</td>
                    <td><code>{record.phone}</code></td>
                    <td>{record.address}</td>
                    <td><code>{record.eventId}</code></td>
                    <td>
                      <div style={{ fontSize: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {Object.entries(record.answers || {}).map(([key, value]) => (
                          <span key={key}>
                            <strong>{key}:</strong> {value}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{formatDate(record.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

