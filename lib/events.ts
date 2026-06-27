export type EventItem = {
  id: string;
  title: string;
  titleDevanagari: string;
  organizer: string;
  date: string;
  dateLabel: string;
  location: string;
  theme: string;
  summary: string;
  poster: string;
  status: "open" | "upcoming" | "completed";
};

export const events: EventItem[] = [
  {
    id: "mahadji-shinde-nagar-tree-plantation-2026",
    title: "Mahadji Shinde Nagar Tree Plantation 2026",
    titleDevanagari: "श्री महादजी शिंदे नगर वृक्षारोपण २०२६",
    organizer: "सकल हिंदू समाज",
    date: "2026-08-15",
    dateLabel: "१५ ऑगस्ट २०२६",
    location: "श्री महादजी शिंदे नगर",
    theme: "हरित नगर - सुंदर नगर - समृद्ध नगर",
    summary:
      "A community tree plantation drive inviting residents to plant, protect, and nurture trees for a greener neighborhood.",
    poster: "/images/current-event-poster.png",
    status: "open"
  }
];

export const currentEvent = events[0];
