export type EventItem = {
  id: string;
  title: string;
  titleDevanagari: string;
  titleEnglish: string;
  organizer: string;
  organizerEnglish: string;
  contactPerson?: string;
  contactPhone?: string;
  date: string;
  dateLabel: string;
  dateLabelEnglish: string;
  timeLabel?: string;
  timeLabelEnglish?: string;
  location: string;
  locationEnglish: string;
  theme: string;
  themeEnglish: string;
  summary: string;
  summaryMarathi: string;
  treesPlanted?: number;
  specialAct?: string;
  specialActMarathi?: string;
  whatsappUrl?: string;
  mapUrl?: string;
  status: "open" | "upcoming" | "completed";
};

export const events: EventItem[] = [
  {
    id: "anandvan-mahadevwadi-tree-plantation-2026",
    title: "Anandvan Mahadevwadi Tree Plantation Drive",
    titleDevanagari: "आनंदवन महादेववाडी वृक्षारोपण मोहीम २०२६",
    titleEnglish: "Anandvan Mahadevwadi Tree Plantation Drive",
    organizer: "सकल हिंदू समाज आणि चोक्सी स्कूल पुणे",
    organizerEnglish: "Sakal Hindu Samaj & Choksi School Pune",
    contactPerson: "Mayank Goher",
    contactPhone: "+91 9623130157",
    date: "2026-08-15",
    dateLabel: "१५ ऑगस्ट २०२६",
    dateLabelEnglish: "15 August 2026",
    timeLabel: "सकाळी ११:०० ते दुपारी २:००",
    timeLabelEnglish: "11:00 AM - 2:00 PM",
    location: "आनंदवन, महादेववाडी, पुणे",
    locationEnglish: "Anandvan, Mahadevwadi, Pune",
    theme: "हरित नगर - सुंदर नगर - समृद्ध नगर",
    themeEnglish: "Green Neighborhood - Beautiful Neighborhood - Prosperous Neighborhood",
    treesPlanted: 110,
    specialAct: "Tree Plantation Awareness Dance Performance by students of Choksi School Pune",
    specialActMarathi: "चोक्सी स्कूल पुणे च्या विद्यार्थ्यांद्वारे वृक्षारोपण जनजागृती नृत्य सादरीकरण",
    summary:
      "Successfully planted 110 native trees at Anandvan, Mahadevwadi from 11:00 AM to 2:00 PM today! The drive featured an inspiring tree plantation awareness dance act by Choksi School Pune students. Contact Mayank Goher (+91 9623130157) for details.",
    summaryMarathi:
      "आज सकाळी ११ ते दुपारी २ या वेळेत आनंदवन, महादेववाडी येथे ११० वृक्षांची यशस्वी लागवड करण्यात आली! याप्रसंगी चोक्सी स्कूल पुणे च्या विद्यार्थ्यांनी वृक्षारोपण जनजागृती नृत्य सादर केले. अधिक माहितीसाठी मयांक गोहर (+91 9623130157) यांच्याशी संपर्क साधा.",
    whatsappUrl: "https://wa.me/919623130157?text=Hi%20Mayank,%20I%20want%20to%20know%20more%20about%20GreenPune%20Tree%20Plantation%20Drive",
    mapUrl: "https://maps.google.com/?q=Anandvan+Mahadevwadi+Pune",
    status: "completed"
  }
];

export const currentEvent = events[0];
