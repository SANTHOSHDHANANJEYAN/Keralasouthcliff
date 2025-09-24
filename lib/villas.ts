// types/villa.ts
export interface VillaFeature {
  iconName: string;
  text: string;
}

export interface Villa {
  id: string;
  name: string;
  description: string;
  features: VillaFeature[];
  amenities: string[];
  highlights?: string[];
  experiences?: string[];
  access?: string[];
  images: string[];
}

export const villas: Villa[] = [
  {
    id: 'landscape-room',
    name: 'Private Balcony with Sea View (Top Floor)',
    description: `
Wake up to the sound of waves crashing against golden cliffs. Welcome to your modern, minimalist sanctuary on Varkala Cliff — where every day begins with breathtaking ocean views and adventure.

🌿 Second Floor Studio (550 sqft) with a spacious private balcony overlooking the Arabian Sea. Designed for digital nomads and travelers seeking comfort, style, and natural beauty.
    `,
    features: [
      { iconName: 'Bed', text: '1 Bedroom – Teak Four-Poster Bed' },
      { iconName: 'Bath', text: '1 Bathroom – Spa-Style' },
      { iconName: 'Waves', text: 'Uninterrupted Ocean Views' },
      { iconName: 'Wifi', text: 'High-Speed WiFi – Work-Friendly' },
      { iconName: 'Sun', text: 'Bright & Airy Open Layout' },
      { iconName: 'Coffee', text: 'Kettle & Local Coffee/Tea' },
      { iconName: 'Snowflake', text: 'Air Conditioning' },
      { iconName: 'Fan', text: 'Ceiling Fan' },
    ],
    amenities: [
      'Luxury king bed with premium linens',
      'Handcrafted Kerala furniture',
      'Ocean-view teak work desk',
      'High ceilings, whitewashed walls & rattan accents',
      'Spa-style bathroom with rainfall shower',
      'Curated coconut-shell toiletries',
      'Refrigerator',
      'Air conditioning & ceiling fan',
      'Hair dryer',
      'Laundry essentials',
    ],
    highlights: [
      'Prime Cliffside Location – 30s from Café Sarwa, 5 min to Papanasam Beach',
      'Second Floor Retreat – Spacious balcony with uninterrupted views',
      'Designed for Bliss – Minimalist interiors with bohemian elegance',
      'Perfect for digital nomads and couples seeking ocean breezes & sunsets',
    ],
    experiences: [
      '🏖️ Papanasam Beach (2 min), Kappil Beach (15 min)',
      '☕ Café Sarwa (30 sec), Cliff Market (2 min)',
      '🏄 Surfing (5 min), Yoga & Ayurveda (3 min)',
      '🛕 Janardanaswamy Temple (10 min), Sivagiri Mutt (15 min)',
      '✨ Neighborhood Vibes – live music, moonlit meditation, spice farms',
    ],
    access: [
      'Private balcony with lounge chairs & coffee table',
      'Front yard outdoor seating area',
      'Shared lush garden space (yoga, meditation)',
    ],
    images: [
      '/topfloor/1.jpg',
      '/topfloor/2.jpg',
      '/topfloor/3.jpg',
      '/topfloor/4.jpg',
      '/topfloor/5.jpg',
      '/topfloor/6.jpg',
      '/topfloor/7.jpg',
      '/topfloor/8.jpg',
      '/topfloor/9.jpg',
      '/topfloor/10.jpg',
    ],
  },
  {
    id: 'sea-garden-room',
    name: 'Sea & Garden View Room (Ground Floor)',
    description: `
Welcome to your modern, minimalist sanctuary on Varkala Cliff. A ground-floor retreat wrapped in lush gardens and whispers of the ocean breeze.

🌿 First Floor Studio (550 sqft) with a tropical oasis bathroom. Perfect for travelers seeking comfort, privacy, and Kerala’s natural beauty.
    `,
    features: [
      { iconName: 'Bed', text: '1 Bedroom – Teak Four-Poster Bed' },
      { iconName: 'Bath', text: '1 Bathroom – Rainfall Shower' },
      { iconName: 'Mountain', text: 'Garden View' },
      { iconName: 'Waves', text: 'Sea Glimpses' },
      { iconName: 'Wifi', text: 'High-Speed WiFi – Work-Friendly' },
      { iconName: 'Sun', text: 'Skylit Vanity' },
      { iconName: 'Coffee', text: 'Kettle & Local Coffee/Tea' },
      { iconName: 'Snowflake', text: 'Air Conditioning' },
      { iconName: 'Fan', text: 'Ceiling Fan' },
    ],
    amenities: [
      'Luxury king bed with premium linens',
      'Handcrafted Kerala furniture',
      'Ocean-view teak work desk',
      'Hair dryer',
      'Stone rainfall shower with natural finish',
      'Coconut-shell toiletries',
      'Vertical garden & aromatherapy touches',
      'Refrigerator',
      'Air conditioning & ceiling fan',
    ],
    highlights: [
      'Prime Location – 30s from Café Sarwa, 5 min to Papanasam Beach',
      'Ground Floor Retreat – Private, convenient & coastal charm',
      'Tropical Oasis Bathroom – stone shower, skylight, aromatherapy',
      'Perfect balance of comfort, privacy, and natural beauty',
    ],
    experiences: [
      '🏖️ Papanasam Beach (2 min), Kappil Beach (15 min)',
      '☕ Cliff Market & Cafés (walking distance)',
      '🏄 Yoga, Ayurveda & Surfing nearby',
      '🛕 Janardanaswamy Temple & Sivagiri Mutt',
    ],
    access: [
      'Private patio with lounge chairs & coffee table',
      'Front yard outdoor seating area',
      'Shared lush garden space (perfect for yoga)',
    ],
    images: [
      '/groundfloor/1.jpg',
      '/groundfloor/2.jpg',
      '/groundfloor/5.jpg',
      '/groundfloor/6.jpg',
      '/groundfloor/7.jpg',
      '/groundfloor/8.png',
      '/groundfloor/9.jpg',
      '/groundfloor/10.jpg',
      '/groundfloor/11.jpg',
      '/groundfloor/12.jpg',
      '/groundfloor/13.jpg',
    ],
  },
  {
    id: 'luxury-villa',
    name: 'Exclusive Villa Stay – Sea & Garden View',
    description: `
Treat your family or group to the full villa experience. A private haven combining both sea-facing balcony suites and lush garden retreats. Spacious interiors, tropical bathrooms, and airy common areas give you freedom to unwind at your own pace.

🌿 Two-Floor Villa (1100+ sqft). The perfect blend of privacy, comfort, and Kerala’s natural beauty.
    `,
    features: [
      { iconName: 'Bed', text: '2 Bedrooms – Teak Four-Poster Beds' },
      { iconName: 'Bath', text: '2 Bathrooms – Spa & Rainfall Showers' },
      { iconName: 'Waves', text: 'Ocean Views from Balcony' },
      { iconName: 'Mountain', text: 'Garden Views' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Crown', text: 'Exclusive Privacy' },
      { iconName: 'Snowflake', text: 'Air Conditioning' },
      { iconName: 'Fan', text: 'Ceiling Fans' },
      { iconName: 'Coffee', text: 'Kettle & Local Coffee/Tea' },
    ],
    amenities: [
      '2 luxury king bedrooms with premium linens',
      'Handcrafted Kerala furniture throughout',
      'Ocean-view teak work desks',
      'Private balconies & patios',
      '2 luxury bathrooms with rainfall showers',
      'Curated coconut-shell toiletries',
      'Vertical gardens & natural aromatherapy',
      'Refrigerators in both units',
      'Air conditioning & ceiling fans',
      'Hair dryer, hangers, cleaning products',
    ],
    highlights: [
      'Entire Villa – enjoy both units together',
      'Private balconies & patios with sea and garden views',
      'Perfect for families, groups, or retreats',
      '1100+ sqft across two levels',
    ],
    experiences: [
      '🏖️ Beaches – Papanasam (2 min), Kappil (15 min)',
      '☕ Cliffside cafés & markets (walking distance)',
      '🏄 Surfing, Yoga, Ayurveda (nearby)',
      '🛕 Janardanaswamy Temple & Sivagiri Mutt',
      '✨ Evening cultural shows & live music',
    ],
    access: [
      'Entire villa with 2 floors',
      'Private balcony + private patio',
      'Shared lush garden space',
      'Front yard outdoor lounge areas',
    ],
    images: [
      '/homepage.png',
      '/topfloor/1.jpg',
      '/topfloor/3.jpg',
      '/topfloor/5.jpg',
      '/groundfloor/2.jpg',
      '/groundfloor/4.jpg',
      '/groundfloor/6.jpg',
      '/topfloor/7.jpg',
    ],
  },
];

export const getVillaById = (id: string): Villa | undefined =>
  villas.find((villa) => villa.id === id);
