/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { TempleSanctumDetail, TempleTimingSchedule, PoojaOfferingItem } from '../contracts/temple';

export const DEFAULT_TEMPLE_SANCTUM: TempleSanctumDetail = {
  id: 'parakkai-madhusoodhana-perumal',
  name: 'Arulmigu Sree Devi Bhoodevi Sametha Madhusoodhana Perumal Temple',
  tamilName: 'அருள்மிகு ஸ்ரீதேவி பூதேவி சமேத மதுசூதன பெருமாள் திருக்கோவில் - பறக்கை',
  deityTitle: 'Madhusoodhana Perumal (Slayer of Demon Madhu)',
  deityDescription: 'The supreme presiding deity standing in Nindra Thirukkolam holding Shankha and Chakra, flanked by Sree Devi (representing auspicious grace and spiritual abundance) and Bhoodevi (representing endurance, patience, and fertile mother earth).',
  consorts: ['Sree Devi (Mahalakshmi)', 'Bhoodevi (Mother Earth)'],
  posture: 'Nindra',
  weapons: ['Panchajanya (Shankha)', 'Sudarshana (Chakra)', 'Kaumodaki (Gada)', 'Padma (Lotus)'],
  historicalSignificance: 'According to sacred sthala purana, Lord Indra worshipped here to seek relief and forgiveness. Parakkai is revered for its ancient Chola and Venad architectural confluence and its famous annual Panguni Brahmotsavam.',
  morningSunlightStory: {
    time: '6:30 AM Daily',
    description: 'Every morning at approximately 6:30 AM, natural dawn sunlight penetrates through the precisely calculated aperture in the eastern gopuram and mandapam roof, bathing the Golden Kodimaram in radiant golden light and touching the sacred lotus feet of Madhusoodhana Perumal.',
    tamilDescription: 'தினமும் காலை 6.30 மணிக்கு சூரியன் தன் பொன்னிறக் கதிர்களால் இறைவன் திருவடியைத் தொட்டு வணங்கும் ஆன்மீக அற்புதம்.',
    phenomenon: 'Astrological and Architectural Alignment'
  }
};

export const DEFAULT_TEMPLE_SCHEDULES: TempleTimingSchedule[] = [
  {
    id: 'sch-1',
    title: 'Suprabhatam & Temple Opening',
    tamilTitle: 'சுப்ரபாதம் & திருக்கோவில் நடை திறப்பு',
    timeSlot: '5:30 AM – 6:00 AM',
    description: 'Auspicious dawn awakening with sacred Sanskrit slokas and musical bell chimes.',
    status: 'SCHEDULED'
  },
  {
    id: 'sch-2',
    title: 'Daily 6:30 AM Sunlight Miracle & Vishwaroopa Darshan',
    tamilTitle: 'காலை 6.30 சூரிய ஒளி தரிசனம் & விஸ்வரூப தரிசனம்',
    timeSlot: '6:20 AM – 7:00 AM',
    description: 'The golden rays of Surya illuminate the Golden Kodimaram and grace the lotus feet of the Lord.',
    isSpecialSunlightTime: true,
    status: 'SPECIAL'
  },
  {
    id: 'sch-3',
    title: 'Kalasanthi Pooja & Nithya Homam',
    tamilTitle: 'காலசந்தி பூஜை & நித்ய ஹோமம்',
    timeSlot: '8:00 AM – 9:00 AM',
    description: 'Morning principal worship with Vedic chantings, milk abhishekam, and fresh flower alankaram.',
    status: 'SCHEDULED'
  },
  {
    id: 'sch-4',
    title: 'Uchikkalam Pooja & Noon Closing',
    tamilTitle: 'உச்சிகால பூஜை & நடை அடைப்பு',
    timeSlot: '11:45 AM – 12:30 PM',
    description: 'Midday naivedyam offering of cooked rice, payasam, and mangala aarthi. Temple closes at 12:30 PM.',
    status: 'SCHEDULED'
  },
  {
    id: 'sch-5',
    title: 'Evening Reopening & Sayaratchai Pooja',
    tamilTitle: 'மாலை நடை திறப்பு & சாயரட்சை பூஜை',
    timeSlot: '4:30 PM – 6:30 PM',
    description: 'Lighting of brass oil deepams throughout mandapam columns and evening Deeparadhana.',
    status: 'SCHEDULED'
  },
  {
    id: 'sch-6',
    title: 'Arthajamam & Shayanotsavam',
    tamilTitle: 'அர்த்தஜாம பூஜை & பள்ளியறை சேவை',
    timeSlot: '8:00 PM – 8:30 PM',
    description: 'Final night offering of sweet milk and sacred slumber ceremony. Temple closes at 8:30 PM.',
    status: 'SCHEDULED'
  }
];

export const DEFAULT_POOJA_OFFERINGS: PoojaOfferingItem[] = [
  {
    id: 'pooja-sahasranamam',
    name: 'Sri Vishnu Sahasranama Archanai',
    tamilName: 'ஸ்ரீ விஷ்ணு சஹஸ்ரநாம அர்ச்சனை',
    description: 'Chanting of 1008 divine names of Lord Mahavishnu with fresh thulasi leaves and fragrant flowers.',
    category: 'ARCHANAI',
    priceINR: 101,
    currency: 'INR',
    timing: 'Daily during morning Kalasanthi or evening Sayaratchai',
    availability: 'AVAILABLE',
    bookingEnabled: true,
    instructions: 'Devotee gothram, nakshatram, and rasi will be recited during sankalpam.',
    deityTarget: 'Arulmigu Madhusoodhana Perumal',
    benefits: 'Peace of mind, removal of negative influences, and overall household prosperity.'
  },
  {
    id: 'pooja-thulasi-malai',
    name: 'Special Thulasi Malai Samarpanam',
    tamilName: 'விசேஷ துளசி மாலை சமர்ப்பணம்',
    description: 'Garland of fresh holy green basil offered directly to the sacred chest of Sri Madhusoodhana Perumal.',
    category: 'SEVAI',
    priceINR: 251,
    currency: 'INR',
    timing: 'Morning 6:30 AM Darshan',
    availability: 'AVAILABLE',
    bookingEnabled: true,
    instructions: 'Garland is handwoven fresh daily by traditional temple malakarars.',
    deityTarget: 'Arulmigu Madhusoodhana Perumal',
    benefits: 'Good health, spiritual clarity, and deep divine connection.'
  },
  {
    id: 'pooja-butter-anjaneya',
    name: 'Sri Anjaneya Vennai Kappu (Butter Alankaram)',
    tamilName: 'ஸ்ரீ ஆஞ்சநேயர் வெண்ணெய் காப்பு சேவை',
    description: 'Sacred butter adornment and betel leaf (vetrilai) garland offered to entrance guardian Sri Anjaneya.',
    category: 'SPECIAL_POOJA',
    priceINR: 501,
    currency: 'INR',
    timing: 'Saturdays and Tuesdays',
    availability: 'FEW_SLOTS',
    bookingEnabled: true,
    instructions: 'Pure country cow butter prepared traditionally in temple madaipalli.',
    deityTarget: 'Entrance Sri Anjaneya Shrine',
    benefits: 'Courage, physical strength, protection from fear, and career breakthrough.'
  },
  {
    id: 'pooja-garuda-sevai',
    name: 'Sri Garuda Vahana Special Archanai',
    tamilName: 'ஸ்ரீ கருட சேவை சிறப்பு அர்ச்சனை',
    description: 'Dedicated offering at the sacred Sri Garuda shrine standing on the left flank of the grand entrance.',
    category: 'ARCHANAI',
    priceINR: 151,
    currency: 'INR',
    timing: 'Daily 7:00 AM & 5:00 PM',
    availability: 'AVAILABLE',
    bookingEnabled: true,
    instructions: 'Special camphor aarthi and recitation of Garuda Dandakam.',
    deityTarget: 'Entrance Sri Garuda Shrine',
    benefits: 'Removal of Sarpa doshas, eye ailments, and travel safety.'
  },
  {
    id: 'pooja-paal-payasam',
    name: 'Nithya Naivedya Paal Payasam Prasadam',
    tamilName: 'நித்ய நைவேத்திய பால் பாயாசம் பிரசாதம்',
    description: 'Traditional slow-simmered fragrant milk, rice, and jaggery/sugar kheer with cardamom and roasted cashews.',
    category: 'PRASADAM',
    priceINR: 301,
    currency: 'INR',
    timing: 'Midday Naivedyam at 12:00 PM',
    availability: 'AVAILABLE',
    bookingEnabled: true,
    instructions: 'Offered first to the deities, then packed hygienically in leaf-lined containers for the devotee.',
    deityTarget: 'Madhusoodhana Perumal & Thayar',
    benefits: 'Auspicious family longevity and sweet blessings for children.'
  }
];

export const DASAVATARAM_ITEMS = [
  { id: 1, name: 'Matsya', tamilName: 'மச்சய', description: 'The Divine Fish protecting the Vedas from cosmic deluge.' },
  { id: 2, name: 'Kurma', tamilName: 'கூர்ம', description: 'The Cosmic Tortoise supporting Mount Mandara during churning of nectar.' },
  { id: 3, name: 'Varaha', tamilName: 'வராக', description: 'The Sacred Boar rescuing Mother Earth (Bhoodevi) from ocean depths.' },
  { id: 4, name: 'Narasimha', tamilName: 'நரசிம்ம', description: 'Half-man, half-lion protecting child devotee Prahlada and destroying arrogance.' },
  { id: 5, name: 'Vamana', tamilName: 'வாமன', description: 'The Dwarf Sage measuring three worlds with cosmic footsteps (Trivikrama).' },
  { id: 6, name: 'Parasurama', tamilName: 'பரசுராம', description: 'The Ax-bearing Warrior establishing righteousness across the Western Coast.' },
  { id: 7, name: 'Rama', tamilName: 'ராம', description: 'The Ideal King and embodiment of Maryada and Dharma.' },
  { id: 8, name: 'Balarama', tamilName: 'பலராம', description: 'The Plow-bearer representing agricultural abundance and divine strength.' },
  { id: 9, name: 'Buddha', tamilName: 'புத்த', description: 'The Embodiment of Universal Compassion and non-violence.' },
  { id: 10, name: 'Kalki', tamilName: 'கல்கி', description: 'The Future Rider on white steed restoring the Golden Age of Truth.' }
];
