"use client";

import { useActionState } from "react";
import { type EventItem } from "@/lib/events";
import { saveEvent } from "./actions";

export function EventForm({ event }: { event: EventItem }) {
  const [state, formAction, pending] = useActionState(saveEvent, {});

  return (
    <form action={formAction} className="admin-event-form">
      <input name="id" type="hidden" value={event.id} />
      <div className="admin-form-grid">
        <label>
          <span>Status</span>
          <select defaultValue={event.status} name="status">
            <option value="open">Open current event</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          <span>Date</span>
          <input defaultValue={event.date} name="date" type="date" />
        </label>
        <label>
          <span>English title</span>
          <input defaultValue={event.titleEnglish} name="titleEnglish" />
        </label>
        <label>
          <span>Marathi title</span>
          <input defaultValue={event.titleDevanagari} name="titleDevanagari" />
        </label>
        <label>
          <span>English organizer</span>
          <input defaultValue={event.organizerEnglish} name="organizerEnglish" />
        </label>
        <label>
          <span>Marathi organizer</span>
          <input defaultValue={event.organizer} name="organizer" />
        </label>
        <label>
          <span>English date label</span>
          <input defaultValue={event.dateLabelEnglish} name="dateLabelEnglish" />
        </label>
        <label>
          <span>Marathi date label</span>
          <input defaultValue={event.dateLabel} name="dateLabel" />
        </label>
        <label>
          <span>English location</span>
          <input defaultValue={event.locationEnglish} name="locationEnglish" />
        </label>
        <label>
          <span>Marathi location</span>
          <input defaultValue={event.location} name="location" />
        </label>
        <label>
          <span>English theme</span>
          <input defaultValue={event.themeEnglish} name="themeEnglish" />
        </label>
        <label>
          <span>Marathi theme</span>
          <input defaultValue={event.theme} name="theme" />
        </label>
      </div>
      <label>
        <span>English summary</span>
        <textarea defaultValue={event.summary} name="summary" rows={3} />
      </label>
      <label>
        <span>Marathi summary</span>
        <textarea defaultValue={event.summaryMarathi} name="summaryMarathi" rows={3} />
      </label>
      {state.message ? (
        <p className={state.ok ? "admin-success" : "admin-error"}>{state.message}</p>
      ) : null}
      <button disabled={pending} type="submit">
        {pending ? "Publishing..." : "Publish event"}
      </button>
    </form>
  );
}
