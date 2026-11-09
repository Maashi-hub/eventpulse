// Hard-coded sample data (the assignment does not require a backend).
// Events are fictional but use realistic names, venues, dates and prices (LKR).

export const CATEGORIES = ['All', 'Tech', 'Music', 'Food', 'Sports', 'Culture', 'Education'];

const images = {
  Tech: require('../assets/images/tech.png'),
  Music: require('../assets/images/music.png'),
  Food: require('../assets/images/food.png'),
  Sports: require('../assets/images/sports.png'),
  Culture: require('../assets/images/culture.png'),
  Education: require('../assets/images/education.png'),
};

// One illustration per event (assets/images/events/event-<id>.png).
// Replace any file with a real photo (same name) if you prefer photographs.
const eventImages = {
  '1': require('../assets/images/events/event-1.png'),
  '2': require('../assets/images/events/event-2.png'),
  '3': require('../assets/images/events/event-3.png'),
  '4': require('../assets/images/events/event-4.png'),
  '5': require('../assets/images/events/event-5.png'),
  '6': require('../assets/images/events/event-6.png'),
  '7': require('../assets/images/events/event-7.png'),
  '8': require('../assets/images/events/event-8.png'),
  '9': require('../assets/images/events/event-9.png'),
  '10': require('../assets/images/events/event-10.png'),
  '11': require('../assets/images/events/event-11.png'),
  '12': require('../assets/images/events/event-12.png'),
};

const raw = [
  {
    id: '1',
    title: 'React Native Night Colombo',
    category: 'Tech',
    date: '2026-11-21T18:00:00+05:30',
    venue: 'Co-working Hub, Union Place',
    city: 'Colombo',
    price: 0,
    organizer: 'Colombo Mobile Devs',
    attendees: 180,
    description:
      'An evening of lightning talks on Expo Router, local notifications and performance tuning. Bring your laptop for the live-coding session at the end.',
  },
  {
    id: '2',
    title: 'Kelaniya Campus Hackathon 2026',
    category: 'Tech',
    date: '2026-11-28T09:00:00+05:30',
    venue: 'Faculty of Science Auditorium, University of Kelaniya',
    city: 'Kelaniya',
    price: 500,
    organizer: 'Department of Statistics & Computer Science',
    attendees: 240,
    description:
      'A 12-hour hackathon for undergraduates and postgraduates. Teams of up to four build a working prototype around the theme "Smart Campus".',
  },
  {
    id: '3',
    title: 'Negombo Beach Food Festival',
    category: 'Food',
    date: '2026-12-05T16:00:00+05:30',
    venue: 'Negombo Beach Park',
    city: 'Negombo',
    price: 1500,
    organizer: 'Negombo Tourism Society',
    attendees: 1200,
    description:
      'Seafood BBQ, kottu, hoppers and street desserts from 40 local vendors, with live acoustic music as the sun sets over the Indian Ocean.',
  },
  {
    id: '4',
    title: 'Colombo Jazz Under the Stars',
    category: 'Music',
    date: '2026-12-12T19:30:00+05:30',
    venue: 'Galle Face Green Amphitheatre',
    city: 'Colombo',
    price: 3500,
    organizer: 'Island Jazz Collective',
    attendees: 650,
    description:
      'Three local jazz ensembles and a guest saxophonist perform an open-air set. Bring a picnic mat; food stalls are available on site.',
  },
  {
    id: '5',
    title: 'Colombo 10K Night Run',
    category: 'Sports',
    date: '2026-12-13T05:30:00+05:30',
    venue: 'Independence Square',
    city: 'Colombo',
    price: 2000,
    organizer: 'Run Lanka Club',
    attendees: 900,
    description:
      'A flat, fast 10 km route through Colombo 07 with hydration points every 2.5 km. Finisher medals and a race T-shirt for every runner.',
  },
  {
    id: '6',
    title: 'Kandy Heritage Walk & Craft Fair',
    category: 'Culture',
    date: '2026-12-19T08:30:00+05:30',
    venue: 'Temple of the Tooth Square',
    city: 'Kandy',
    price: 1000,
    organizer: 'Hill Country Heritage Trust',
    attendees: 320,
    description:
      'A guided morning walk through Kandy\'s old city followed by a craft fair featuring wood carving, batik and traditional Kandyan dance performances.',
  },
  {
    id: '7',
    title: 'Introduction to Machine Learning Workshop',
    category: 'Education',
    date: '2026-11-24T14:00:00+05:30',
    venue: 'Computer Lab 02, University of Kelaniya',
    city: 'Kelaniya',
    price: 0,
    organizer: 'Kelaniya AI Society',
    attendees: 60,
    description:
      'A hands-on beginner workshop using Python and scikit-learn. Participants train their first classifier by the end of the afternoon.',
  },
  {
    id: '8',
    title: 'Sri Lanka Startup Pitch Day',
    category: 'Tech',
    date: '2026-12-03T10:00:00+05:30',
    venue: 'BMICH Mini Hall',
    city: 'Colombo',
    price: 2500,
    organizer: 'Lanka Founders Network',
    attendees: 400,
    description:
      'Fifteen early-stage startups pitch to a panel of angel investors. Includes networking lunch and a mentor speed-dating session.',
  },
  {
    id: '9',
    title: 'Street Food Trail: Pettah Edition',
    category: 'Food',
    date: '2026-11-29T17:00:00+05:30',
    venue: 'Pettah Market Entrance',
    city: 'Colombo',
    price: 1800,
    organizer: 'Taste of Colombo',
    attendees: 45,
    description:
      'A guided evening food walk through Pettah with eight tasting stops, from isso wade to faluda. Small groups, limited seats.',
  },
  {
    id: '10',
    title: 'Baila Beats Live Concert',
    category: 'Music',
    date: '2026-12-26T19:00:00+05:30',
    venue: 'Sugathadasa Indoor Stadium',
    city: 'Colombo',
    price: 4500,
    organizer: 'Rhythm Lanka Productions',
    attendees: 3000,
    description:
      'A high-energy year-end concert featuring a ten-piece baila band, DJ sets and a fireworks finale.',
  },
  {
    id: '11',
    title: 'Inter-University Cricket Sixes',
    category: 'Sports',
    date: '2026-12-08T09:00:00+05:30',
    venue: 'Havelock Park Ground',
    city: 'Colombo',
    price: 0,
    organizer: 'Sri Lanka University Sports Association',
    attendees: 1500,
    description:
      'Sixteen university teams compete in a one-day six-a-side knockout tournament. Free entry for spectators.',
  },
  {
    id: '12',
    title: 'Sinhala & Tamil New Year Art Exhibition',
    category: 'Culture',
    date: '2026-11-22T10:00:00+05:30',
    venue: 'National Art Gallery, Ananda Coomaraswamy Mawatha',
    city: 'Colombo',
    price: 300,
    organizer: 'Lanka Arts Council',
    attendees: 500,
    description:
      'A two-day exhibition of contemporary paintings, sculpture and photography by 60 emerging Sri Lankan artists.',
  },
];

// Attach each event's own image (falls back to the category image).
export const EVENTS = raw.map((e) => ({ ...e, image: eventImages[e.id] ?? images[e.category] }));

export const getEventById = (id) => EVENTS.find((e) => e.id === String(id));
