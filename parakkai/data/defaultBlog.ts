/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import { ParakkaiBlogPost } from '../contracts/blog';

export const DEFAULT_BLOG_POSTS: ParakkaiBlogPost[] = [
  {
    postId: 'post-legend-of-parakkai',
    slug: 'legend-of-parakkai-indra-redemption',
    title: 'The Sacred Legend of Parakkai: Where Indra Found Divine Grace',
    tamilTitle: 'பறக்கையின் ஸ்தல புராணம்: இந்திரன் சாப விமோசனம் பெற்ற திருத்தலம்',
    summary: 'The ancient sthala purana narrates how Lord Indra, burdened by sage Gautama curse, journeyed across the southern sacred lands and was liberated at Parakkai after offering devout worship to Madhusoodhana Perumal.',
    contentMarkdown: `
### The Sacred Story of Parakkai
According to the Sthala Purana of this revered temple, Lord Indra suffered from a severe affliction caused by the curse of Sage Gautama Maharishi. Seeking redemption and purification, Indra undertook a pilgrimage to various holy waters across Bharat.

When he reached the serene village of **Parakkai**, surrounded by coconut groves, fragrant lotus ponds, and calm lake waters, his heart found immediate peace. He installed the sacred moolavar idol of **Madhusoodhana Perumal** alongside **Sree Devi** and **Bhoodevi** and performed rigorous tapasya and abhishekam.

Pleased by his devotion, Lord Mahavishnu appeared before Indra and absolved him of all curses. To commemorate this event, Indra proclaimed that anyone who surrenders at the lotus feet of Madhusoodhana Perumal in Parakkai with a pure heart shall find liberation from anxiety, disease, and inner distress.
    `,
    category: 'TEMPLE_LEGEND',
    author: {
      name: 'Dr. V. Narayana Pillai',
      role: 'Sthala Purana Scholar & Historian'
    },
    featuredImage: 'https://images.unsplash.com/photo-1545232979-fbf68fe9f10d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-07-20',
    readingTimeMinutes: 5,
    tags: ['Parakkai', 'Legend', 'Indra', 'Madhusoodhana Perumal'],
    status: 'PUBLISHED',
    likesCount: 142
  },
  {
    postId: 'post-solar-geometry',
    slug: 'solar-geometry-630-sunlight-miracle',
    title: 'The Solar Geometry: Why Dawn Sunlight Touches the Holy Feet at 6:30 AM',
    tamilTitle: 'வானியல் அற்புதம்: காலை 6.30 மணிக்கு சூரியன் திருவடியைத் தொடும் ரகசியம்',
    summary: 'An exploration of the astronomical precision and Chola-Venad architectural engineering that allows natural dawn sunbeams to travel through the gopuram portals to bathe the Lord in pure solar light.',
    contentMarkdown: `
### An Architectural and Astronomical Wonder
Among the most awe-inspiring aspects of the Parakkai Madhusoodhana Perumal Temple is the **daily dawn sunlight alignment**.

Every single morning at approximately **6:30 AM**, the rising sun creates a dramatic beam of golden light. This solar beam enters through a meticulously aligned aperture above the eastern gopuram doorway, passes across the outer courtyard, strikes the towering gilded **Golden Kodimaram** (Dwajasthambam), and illuminates the stone floor straight into the Garbha Griha.

For a few transcendent minutes, the radiant light rests directly upon the **sacred lotus feet of the deity**.

Temple architects of ancient Tamil Nadu and Travancore possessed profound knowledge of *Vastu Shastra*, *Jyotisha* (astronomy), and solar trajectories. This alignment serves as a daily cosmic Surya Namaskaram to the Sustainer of the Cosmos.
    `,
    category: 'ARCHITECTURE',
    author: {
      name: 'Er. S. Chandrasekhar',
      role: 'Vedic Architecture Researcher'
    },
    featuredImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-08-05',
    readingTimeMinutes: 6,
    tags: ['Sunlight Miracle', 'Architecture', 'Kodimaram', 'Vastu'],
    status: 'PUBLISHED',
    likesCount: 289
  },
  {
    postId: 'post-guardians-garuda-anjaneya',
    slug: 'guardians-sri-garuda-and-sri-anjaneya',
    title: 'Guardians of the Sacred Portal: Sri Garuda and Sri Anjaneya',
    tamilTitle: 'கோவில் வாயில் காப்பாளர்கள்: ஸ்ரீ கருடன் மற்றும் ஸ்ரீ ஆஞ்சநேயர்',
    summary: 'Standing tall on either flank of the grand Dasavataram entrance arch, Sri Garuda and Sri Anjaneya symbolize the twin pillars of Vaishnava devotion: divine surrender and selfless service.',
    contentMarkdown: `
### The Two Wings of Bhakti
When visitors arrive at the main entrance arch of the Parakkai Temple, their eyes are immediately drawn to two monumental, beautifully painted relief figures:

1. **Sri Garuda (Left):** With resplendent golden wings, folded palms, and fearless gaze, Garuda represents *Veda Swaroopam* — the embodiment of Vedic knowledge and unwavering speed in serving the Lord.
2. **Sri Anjaneya (Right):** Standing with humble folded hands, Hanuman represents *Dasa Bhakti* — humility, boundless strength, and pure devotional servitude.

Between them spans the **Dasavataram Arch**, greeting all pilgrims with the eternal cosmic reminder of Mahavishnu's promise: *"Whenever righteousness declines, I manifest to protect the good."*
    `,
    category: 'SPIRITUAL_PRACTICE',
    author: {
      name: 'Archaka K. Sundararajan',
      role: 'Chief Archaka, Parakkai Temple'
    },
    featuredImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-08-19',
    readingTimeMinutes: 4,
    tags: ['Garuda', 'Anjaneya', 'Dasavataram', 'Entrance Arch'],
    status: 'PUBLISHED',
    likesCount: 198
  }
];
