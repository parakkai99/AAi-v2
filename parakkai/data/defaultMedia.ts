/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { ParakkaiMediaItem } from '../contracts/media';

export const DEFAULT_PARAKKAI_MEDIA: ParakkaiMediaItem[] = [
  {
    mediaId: 'med-latest-darshan',
    title: 'Latest Morning Darshan — Madhusoodhana Perumal Alankaram',
    tamilTitle: 'இன்றைய காலை தரிசனம் - மதுசூதன பெருமாள் அலங்காரம்',
    description: 'Special recorded darshan of Sri Devi Bhoodevi Sametha Madhusoodhana Perumal adorned with golden crown, green silk vastram, and fresh tulsi garlands. Camphor aarthi by temple archakas.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545232979-fbf68fe9f10d?auto=format&fit=crop&w=800&q=80',
    sourceType: 'LOCAL_VIDEO',
    youtubeId: 'parakkai-darshan-archive',
    category: 'DARSHAN',
    durationMinutes: 12,
    publishedAt: '2026-09-07T07:15:00Z',
    liveStatus: 'RECORDED_ONLY',
    viewsCount: 2840,
    tags: ['Darshan', 'Madhusoodhana Perumal', 'Morning Aarthi', 'Tulsi'],
    featured: true,
    authorOrSpeaker: 'Parakkai Temple Trust Video Seva',
    status: 'AVAILABLE'
  },
  {
    mediaId: 'med-sunlight-documentary',
    title: 'Architectural Genius: 6:30 AM Sunlight Miracle of Parakkai Temple',
    tamilTitle: 'கட்டிடக் கலை அற்புதம்: காலை 6.30 சூரியக் கிரண ஆவணப்படம்',
    description: 'Explore how ancient temple architects calculated the solar trajectory so that dawn rays illuminate the Golden Kodimaram and reach directly to the holy feet of the deity.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    sourceType: 'LOCAL_VIDEO',
    youtubeId: 'parakkai-sun-architecture',
    category: 'TEMPLE_HISTORY',
    durationMinutes: 18,
    publishedAt: '2026-08-15T10:00:00Z',
    liveStatus: 'RECORDED_ONLY',
    viewsCount: 5120,
    tags: ['Sunlight Miracle', 'Architecture', 'Kodimaram', 'History'],
    featured: true,
    authorOrSpeaker: 'Dr. S. Sundaram (Archaeology & Heritage Researcher)',
    status: 'AVAILABLE'
  },
  {
    mediaId: 'med-panguni-therottam',
    title: 'Grand Panguni Therottam (Temple Chariot Festival) Highlights',
    tamilTitle: 'பங்குனித் தேரோட்டம் - பக்திப் பெருவிழா சிறப்புக் காட்சிகள்',
    description: 'Devotees chanting Govinda as the towering wooden car is pulled through the four car streets (Mada Veethis) surrounding Parakkai lake.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    sourceType: 'LOCAL_VIDEO',
    youtubeId: 'parakkai-panguni-ther',
    category: 'FESTIVAL',
    durationMinutes: 24,
    publishedAt: '2026-04-01T18:00:00Z',
    liveStatus: 'RECORDED_ONLY',
    viewsCount: 8430,
    tags: ['Therottam', 'Panguni', 'Chariot', 'Festival'],
    featured: false,
    authorOrSpeaker: 'Parakkai Grama Sabha',
    status: 'AVAILABLE'
  },
  {
    mediaId: 'med-vishnu-sahasranamam',
    title: 'Sri Vishnu Sahasranamam Stotram with Lyrics and Meaning',
    tamilTitle: 'ஸ்ரீ விஷ்ணு சஹஸ்ரநாம ஸ்தோத்திரம் - பொருள் விளக்கம்',
    description: 'Complete resonant chanting of the 1000 names of Lord Vishnu recorded inside the granite pillars of Parakkai Maha Mandapam with acoustic warmth.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    sourceType: 'AUDIO_SLOKA',
    category: 'DEVOTIONAL_MUSIC',
    durationMinutes: 32,
    publishedAt: '2026-07-10T05:30:00Z',
    liveStatus: 'RECORDED_ONLY',
    viewsCount: 6720,
    tags: ['Sahasranamam', 'Stotram', 'Sloka', 'Bhakti'],
    featured: false,
    authorOrSpeaker: 'Parakkai Veda Patashala Vidwans',
    status: 'AVAILABLE'
  },
  {
    mediaId: 'med-village-lake',
    title: 'Sacred Parakkai Lake: Ecosystem, Migratory Birds & Village Life',
    tamilTitle: 'புனிதப் பறக்கை ஏரி: சூழலியல், பறவைகள் & கிராமிய வாழ்க்கை',
    description: 'A visual celebration of the sacred theertham lake, migratory winged visitors, coconut groves, and traditional water preservation traditions.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    sourceType: 'LOCAL_VIDEO',
    youtubeId: 'parakkai-lake-nature',
    category: 'PARAKKAI_VILLAGE',
    durationMinutes: 14,
    publishedAt: '2026-06-05T09:00:00Z',
    liveStatus: 'RECORDED_ONLY',
    viewsCount: 3890,
    tags: ['Parakkai Lake', 'Nature', 'Birds', 'Village', 'Kanyakumari'],
    featured: true,
    authorOrSpeaker: 'A Greener Parakkai Initiative',
    status: 'AVAILABLE'
  }
];
