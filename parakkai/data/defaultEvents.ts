/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { ParakkaiEvent } from '../contracts/event';

export const DEFAULT_PARAKKAI_EVENTS: ParakkaiEvent[] = [
  {
    eventId: 'evt-panguni-utsavam',
    title: 'Annual Panguni Brahmotsavam (10-Day Grand Festival)',
    tamilTitle: 'பங்குனிப் பெருந்திருவிழா - 10 நாள் உற்சவம்',
    description: 'The premier annual temple festival celebrated with Kodiyettam (flag hoisting), daily morning and evening vahanas (Garuda Sevai, Hanumantha Vahana, Sesha Vahana), grand car festival (Therottam / Rathotsavam), and Theerthavari in the sacred Parakkai lake.',
    category: 'FESTIVAL',
    isFestival: true,
    festivalName: 'Panguni Brahmotsavam',
    startDate: '2026-03-24',
    endDate: '2026-04-02',
    startTime: '6:00 AM',
    endTime: '10:00 PM',
    venue: 'Parakkai Temple Mandapam & Sannadhi Car Streets',
    capacity: 5000,
    bookedSeats: 1420,
    bookingEnabled: true,
    bookingFeeINR: 0,
    featured: true,
    highlights: [
      'Day 1: Auspicious Kodiyettam at Golden Kodimaram',
      'Day 5: Night Garuda Sevai with thousands of oil torches',
      'Day 9: Grand Therottam (Temple Chariot Procession) around Ratha Veethi',
      'Day 10: Sacred Theerthavari in Parakkai Temple Lake and Arattu ceremony'
    ],
    contactPerson: 'Sri K. Ramachandran (Temple Festival Trustee)',
    contactPhone: '+91 4652 240 108',
    status: 'UPCOMING'
  },
  {
    eventId: 'evt-vaikunta-ekadasi',
    title: 'Vaikunta Ekadasi — Paramapada Vasal Opening',
    tamilTitle: 'வைகுண்ட ஏகாதசி - பரமபத வாசல் திறப்பு',
    description: 'The sacred northern celestial door (Sorgavasal / Paramapada Vasal) opens at 4:30 AM. Madhusoodhana Perumal appears in divine Rathnangi Alankaram giving darshan to sea of devotees chanting Govinda Govinda.',
    category: 'POOJA',
    isFestival: true,
    festivalName: 'Vaikunta Ekadasi',
    startDate: '2026-12-21',
    startTime: '4:00 AM',
    endTime: '11:00 PM',
    venue: 'Paramapada Vasal & Garbha Griha',
    capacity: 3500,
    bookedSeats: 890,
    bookingEnabled: true,
    bookingFeeINR: 0,
    featured: true,
    highlights: [
      '4:30 AM Opening of Paramapada Vasal with trumpet blasts and conch calls',
      'Continuous recitation of Sri Vishnu Sahasranama and Divya Prabandham',
      'Special fasting prasadam distribution in temple outer prakaram'
    ],
    status: 'UPCOMING'
  },
  {
    eventId: 'evt-daily-sunlight',
    title: 'Daily 6:30 AM Surya Kirana Seva (Sunlight Miracle)',
    tamilTitle: 'தினசரி காலை 6.30 சூரியக் கிரண தரிசனம்',
    description: 'Witness the morning sunbeams striking the Golden Kodimaram and passing into the sanctum sanctorum to illuminate the lotus feet of Madhusoodhana Perumal.',
    category: 'POOJA',
    isFestival: false,
    startDate: '2026-09-08',
    startTime: '6:15 AM',
    endTime: '7:00 AM',
    venue: 'Golden Kodimaram & Sannadhi Hall',
    capacity: 250,
    bookedSeats: 45,
    bookingEnabled: true,
    bookingFeeINR: 0,
    featured: true,
    highlights: [
      'Natural solar illumination phenomenon',
      'Vedic chants of Aditya Hrudayam and Purusha Suktam',
      'Morning fresh milk and tulsi theertham distribution'
    ],
    status: 'UPCOMING'
  },
  {
    eventId: 'evt-krishna-jayanthi',
    title: 'Gokulashtami (Sri Krishna Jayanthi) Uriyadi Festival',
    tamilTitle: 'ஸ்ரீ கிருஷ்ண ஜெயந்தி - உறியடி உற்சவம்',
    description: 'Celebration of Lord Krishna birth with butter pot breaking (Uriyadi) on Sannadhi street, traditional folk dances, and offering of seedai and appam prasadam.',
    category: 'COMMUNITY',
    isFestival: true,
    festivalName: 'Sri Krishna Jayanthi',
    startDate: '2026-09-04',
    startTime: '4:00 PM',
    endTime: '9:30 PM',
    venue: 'Village Car Street & Mandapam',
    capacity: 1500,
    bookedSeats: 1500,
    bookingEnabled: false,
    bookingFeeINR: 0,
    featured: false,
    highlights: [
      'Children dressed as Little Krishna and Radha procession',
      'Traditional Uriyadi pot-breaking contest with village youth',
      'Midnight Maha Abhishekam to Balakrishna'
    ],
    status: 'COMPLETED'
  }
];
