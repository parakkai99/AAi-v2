/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { CinematicJourneyStation } from '../contracts/temple';

export const DEFAULT_JOURNEY_STATIONS: CinematicJourneyStation[] = [
  {
    id: 1,
    stationKey: 'my-home',
    number: '1',
    title: 'My Home',
    subtitle: 'The Journey Begins',
    tamilTitle: 'என் இல்லம் - புனிதப் பயணம் தொடங்குகிறது',
    quote: 'From my home, a few steps to the Divine',
    locationContext: 'Parakkai Agrahara & Village Streets',
    description: 'The morning begins in the peaceful village of Parakkai. As dawn breaks over the coconut palms and calm waters, the gentle sound of temple bells echoes through the streets. A few mindful steps lead the seeker from the threshold of home toward the eternal sanctum.',
    spiritualMeaning: 'Every devotional journey starts at home with a pure heart and clear intention (Sankalpam).',
    details: [
      'Awakening with Suprabhatam chimes at 5:30 AM',
      'Walking down the traditional tiled agrahara streets',
      'The morning breeze carrying the fragrance of jasmine and sacred tulsi',
      'Devotees exchanging auspicious morning greetings (Vanakkam / Radhe Krishna)'
    ],
    coordinates: { latitude: 8.1465, longitude: 77.4510 }
  },
  {
    id: 2,
    stationKey: 'vinayakar',
    number: '2',
    title: 'Arasamotu Sakthi Vinayakar',
    subtitle: 'First Prayer, Auspicious Start',
    tamilTitle: 'அரசமூட்டு சக்தி விநாயகர் - மங்கலத் தொடக்கம்',
    quote: 'Vinayaka, let this journey be meaningful',
    locationContext: 'Ancient Sacred Peepal (Arasa Maram) Shaded Shrine',
    description: 'Before stepping into the main temple, devotees stop reverently at the Arasamotu Sakthi Vinayakar shrine nestled under the sprawling sacred banyan and peepal tree. Garlanded with marigolds, red hibiscus, and durva grass, Lord Ganesha removes obstacles and blesses the day.',
    spiritualMeaning: 'Seeking the blessings of Vighnaharta to dissolve inner impediments and open the mind to divine presence.',
    details: [
      'Ancient stone idol seated beneath centuries-old Arasa Maram',
      'Breaking of auspicious coconut (Thengai Udaippu) for obstacle removal',
      'Lighting pure sesame oil lamps in the morning shade',
      'Three circumambulations (Pradakshina) around the sacred tree'
    ],
    coordinates: { latitude: 8.1468, longitude: 77.4516 }
  },
  {
    id: 3,
    stationKey: 'approaching',
    number: '3',
    title: 'Approaching the Temple',
    subtitle: 'Every Step is a Prayer',
    tamilTitle: 'திருக்கோவில் நோக்கிய யாத்திரை - ஒவ்வொரு அடியும் பிரார்த்தனை',
    quote: 'Parakkai Madhusothana Perumal Temple',
    locationContext: 'Sannadhi Car Street (Ratha Veethi)',
    description: 'Walking along Sannadhi Street, the majestic white Raja Gopuram ascends into the azure blue sky. Flower stalls with fresh strands of pink lotuses and fragrant tulsi line the path. The heart settles into quiet reverence with every advancing footstep.',
    spiritualMeaning: 'Padayatra — walking with devotion elevates each physical step into an act of worship.',
    details: [
      'View of the towering multi-tiered white gopuram against pristine sky',
      'Fragrance of fresh vetiver garlands, camphor, and sandalwood paste',
      'Sounds of nadaswaram and thavil welcoming pilgrims',
      'Village elders and children gathering in timeless community harmony'
    ],
    coordinates: { latitude: 8.1470, longitude: 77.4520 }
  },
  {
    id: 4,
    stationKey: 'entrance',
    number: '4',
    title: 'Temple Entrance',
    subtitle: 'Divine Welcome',
    tamilTitle: 'திருக்கோவில் வாசல் - இறையருள் வரவேற்பு',
    quote: 'Where the Village Meets the Divine',
    locationContext: 'Dasavataram Archway & Raja Gopuram Portal',
    description: 'At the magnificent entrance archway, Sri Garuda with golden wings on the left and Sri Anjaneya with folded hands on the right stand as eternal guardians. The grand arch features the sacred Dasavataram (Ten Incarnations of Lord Vishnu) sculpted in rich South Indian temple tradition, bearing the inscription: Sriman Narayanaya Namaha.',
    spiritualMeaning: 'Crossing the threshold (Gopura Darshan) cleanses worldly distractions and invites the soul into sacred space.',
    details: [
      'Sri Garuda (Golden Winged Mount) & Sri Anjaneya (Lord of Devotion) guarding the entrance',
      'Sculpted panels of the 10 Avatars: Matsya, Kurma, Varaha, Narasimha, Vamana, Parasurama, Rama, Balarama, Buddha, Kalki',
      'Tamil inscription: அருள்மிகு ஸ்ரீதேவி பூதேவி சமேத மதுசூதன பெருமாள் திருக்கோவில்',
      'Prostration at the threshold before stepping onto the cool granite stones'
    ],
    coordinates: { latitude: 8.1472, longitude: 77.4522 }
  },
  {
    id: 5,
    stationKey: 'doors',
    number: '5',
    title: 'Golden Doors Open',
    subtitle: 'Step into Grace',
    tamilTitle: 'தங்கக் கதவுகள் திறக்கின்றன - பேரருளின் வாசல்',
    quote: 'A timeless welcome',
    locationContext: 'Maha Mandapam Ornate Brass & Gold Doors',
    description: 'The heavy teakwood doors, clad in ornate carved brass and gold leaf, swing gently open into the pillared maha mandapam. The cool aroma of crushed camphor, fresh holy basil (tulsi), and warm sesame oil lamps welcomes devotees into sacred timelessness.',
    spiritualMeaning: 'The opening of the outer doors symbolizes the opening of the spiritual heart to eternal grace.',
    details: [
      'Intricately embossed brass panels depicting Vaishnava symbols (Shankha & Chakra)',
      'Flickering brass Kuthu Vilakku lamps casting dancing shadows on ancient stone columns',
      'Acoustic reverberation of the sacred bell tolling through the granite hall',
      'Transition from the bright village sunlight into cool, tranquil sanctuary'
    ],
    coordinates: { latitude: 8.1473, longitude: 77.4524 }
  },
  {
    id: 6,
    stationKey: 'kodimaram',
    number: '6',
    title: 'Golden Kodimaram',
    subtitle: 'Light from the Divine',
    tamilTitle: 'தங்கக் கொடிமரம் - இறைவனின் ஒளிக்கதிர்',
    quote: 'Daily at 6.30 AM the Sunlight falls on the Feet',
    locationContext: 'Central Dwajasthambam & Sunbeam Axis',
    description: 'Rising tall in the stone mandapam is the Golden Kodimaram (flagstaff), clad in gleaming gilded plates. At precisely 6:30 AM every morning, the architectural genius of the temple manifests as natural golden sunbeams pierce through the roof opening, illuminating the Kodimaram and traveling straight to the sacred feet of Lord Madhusoodhana Perumal.',
    spiritualMeaning: 'Surya Namaskaram through stone — the cosmos itself paying homage to the Lord of the Universe.',
    details: [
      'Towering gilded Dwajasthambam with the tortoise base (Kurma peedam)',
      'Solar alignment phenomenon celebrated daily at 6:30 AM IST',
      'Ashta Dikpalakas sculpted at the base facing the eight cardinal directions',
      'Devotees offering Sashtanga Namaskaram facing north behind the Kodimaram'
    ],
    coordinates: { latitude: 8.1474, longitude: 77.4526 }
  },
  {
    id: 7,
    stationKey: 'darshan',
    number: '7',
    title: 'Darshan',
    subtitle: 'Arulmigu Madhusoothana Perumal',
    tamilTitle: 'ஸ்ரீதேவி பூதேவி சமேத மதுசூதன பெருமாள் அருள்தரிசனம்',
    quote: 'Anugraham for All',
    locationContext: 'Garbha Griha (Sanctum Sanctorum)',
    description: 'The pinnacle of the journey. In the sanctum sanctorum stands Arulmigu Madhusoodhana Perumal in majestic standing posture (Nindra Kolam), flanked by Sree Devi (Mahalakshmi) and Bhoodevi. Adorned in brilliant yellow pitambaram silk, diamond-encrusted kireetam (crown), and deep green tulsi garlands, the Lord gazes upon every devotee with unconditional compassion.',
    spiritualMeaning: 'Moksha Anugraham — direct communion with the Divine Sustainer of the cosmos.',
    details: [
      'Four-armed deity holding Panchajanya (Conch), Sudarshana (Discus), Kaumodaki (Mace), and Varada (Grace) Mudra',
      'Flanked by consort deities Sree Devi (Goddess of Wealth & Grace) and Bhoodevi (Mother Earth)',
      'Deepa Aarthi with camphor flame revealing the radiant smile of Perumal',
      'Distribution of sacred Tulsi Theertham, Sadari blessing, and sweet prasadam'
    ],
    coordinates: { latitude: 8.1475, longitude: 77.4528 }
  }
];
