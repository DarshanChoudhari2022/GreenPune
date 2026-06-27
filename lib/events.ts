export type EventItem = {
  id: string;
  title: string;
  titleDevanagari: string;
  titleEnglish: string;
  organizer: string;
  organizerEnglish: string;
  date: string;
  dateLabel: string;
  dateLabelEnglish: string;
  location: string;
  locationEnglish: string;
  theme: string;
  themeEnglish: string;
  summary: string;
  summaryMarathi: string;
  status: "open" | "upcoming" | "completed";
};

export const events: EventItem[] = [
  {
    id: "mahadji-shinde-nagar-tree-plantation-2026",
    title: "Mahadji Shinde Nagar Tree Plantation 2026",
    titleDevanagari: "श्री महादजी शिंदे नगर वृक्षारोपण २०२६",
    titleEnglish: "Mahadji Shinde Nagar Tree Plantation 2026",
    organizer: "सकल हिंदू समाज",
    organizerEnglish: "Sakal Hindu Samaj",
    date: "2026-08-15",
    dateLabel: "१५ ऑगस्ट २०२६",
    dateLabelEnglish: "15 August 2026",
    location: "श्री महादजी शिंदे नगर",
    locationEnglish: "Shri Mahadji Shinde Nagar",
    theme: "हरित नगर - सुंदर नगर - समृद्ध नगर",
    themeEnglish: "Green Neighborhood - Beautiful Neighborhood - Prosperous Neighborhood",
    summary:
      "A community tree plantation drive inviting residents to plant, protect, and nurture trees for a greener neighborhood.",
    summaryMarathi:
      "हरित परिसरासाठी झाडे लावणे, त्यांचे संरक्षण करणे आणि त्यांची काळजी घेण्यासाठी नागरिकांना जोडणारा सामुदायिक वृक्षारोपण उपक्रम.",
    status: "open"
  }
];

export const currentEvent = events[0];
