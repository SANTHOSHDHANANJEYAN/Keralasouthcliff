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
  images: string[];
  highlights?: string[];
  experiences?: string[];
  access?: string[];
}

export const villas: Villa[] = [
  {
    id: 'sea-garden-room',
    name: 'Sea & Garden View Room',
    description: `
Wake up to the soothing rhythm of waves against golden cliffs. Welcome to your modern minimalist sanctuary on Varkala Cliff — where every sunrise brings ocean vistas, and every sunset paints the horizon.
550 sq. ft. of bohemian-inspired elegance with handcrafted Kerala furniture, luxury linens, and high-speed Wi-Fi. Ground floor unit blending privacy, convenience, and coastal charm.
`,
    features: [
      { iconName: 'Bed', text: '1 Bedroom – Teak Four-Poster Bed' },
      { iconName: 'Bath', text: '1 Bathroom – Rainfall Shower' },
      { iconName: 'Waves', text: 'Cliffside & Sea Glimpse' },
      { iconName: 'Mountain', text: 'Garden Facing' },
      { iconName: 'Wifi', text: 'Work-Friendly High-Speed WiFi' },
      { iconName: 'Sun', text: 'Skylit Vanity' },
      { iconName: 'Shield', text: '24/7 Security' },
      { iconName: 'Snowflake', text: 'Air Conditioning' },
      { iconName: 'Fan', text: 'Ceiling Fan' },
      { iconName: 'Coffee', text: 'Kettle & Local Coffee/Tea' },
    ],
    amenities: [
      'Luxury king bed with premium linens',
      'Handcrafted Kerala furniture',
      'High ceilings, whitewashed walls & rattan accents',
      'Ocean-view teak work desk',
      'Hair dryer',
      'Cleaning products',
      'Laundry essentials',
      'Hangers & clothing storage',
      'Extra pillows and blankets',
      'Luxury bathroom with stone rainfall shower',
      'Coconut-shell toiletries',
      'Natural aromatherapy & vertical garden',
      'Air conditioning & ceiling fan',
      'Refrigerator',
    ],
    highlights: [
      'Wake up in light, work with ocean breezes, refresh under your private jungle waterfall',
      'Prime Location – 30s from Café Sarwa, 5 min to Papanasam Beach',
      'Designed for Comfort – Spacious bohemian-inspired studio',
      'Ground Floor – Private, convenient & coastal charm',
    ],
    experiences: [
      '🌊 Beaches & Nature – Papanasam (2 min), Kappil (15 min), Ponnumthuruthu Island (20 min)',
      '☕ Cliffside Culture – Café Sarwa (30 sec), Cliff Market (2 min), Cultural Evenings nearby',
      '🏄 Adventure & Wellness – Surfing (5 min), Yoga studios walking distance, Ayurveda (3 min)',
      '🛕 Spiritual Heritage – Janardanaswamy Temple (10 min), Sivagiri Mutt (15 min)',
      '✨ Neighborhood Vibes – Tranquil mornings, vibrant cultural evenings with music & dining',
    ],
    access: [
      'Private outdoor seating area with lounge chairs & coffee table',
      'Lush garden space ideal for yoga or relaxation',
      'Cozy patio for morning coffee or evening unwind',
    ],
    images: [
      '/groundfloor/2.jpg',
      '/groundfloor/8.png',
      '/groundfloor/13.jpg',
      '/groundfloor/5.jpg',
      '/groundfloor/6.jpg',
      '/groundfloor/1.jpg',
      '/groundfloor/7.jpg',
      '/groundfloor/9.jpg',
      '/groundfloor/10.jpg',
      '/groundfloor/11.jpg',
      '/groundfloor/12.jpg',
    ],
  },
  {
    id: 'landscape-room',
    name: 'Private Balcony with Sea View',
    description: `
Welcome to your modern, minimalist sanctuary on Varkala Cliff, where every day begins with breathtaking ocean views and adventure. Wake up to the sound of waves crashing against golden cliffs.

550 sq. ft. of carefully designed space with handcrafted Kerala furniture, luxury linens, and high-speed Wi-Fi, perfect for digital nomads. Second floor retreat with a private balcony overlooking the edge of the cliff.
`,
    features: [
      { iconName: 'Bed', text: '1 Bedroom – Teak Four-Poster Bed' },
      { iconName: 'Bath', text: '1 Bathroom – Spa-Style' },
      { iconName: 'Waves', text: 'Uninterrupted Ocean Views' },
      { iconName: 'Mountain', text: 'Cliff & Landscape Facing' },
      { iconName: 'Wifi', text: 'High-Speed WiFi – Work-Friendly' },
      { iconName: 'Sun', text: 'Bright & Airy Open Layout' },
      { iconName: 'Car', text: 'Free Parking' },
      { iconName: 'Snowflake', text: 'Air Conditioning' },
      { iconName: 'Fan', text: 'Ceiling Fan' },
      { iconName: 'Coffee', text: 'Kettle & Local Coffee/Tea' },
    ],
    amenities: [
      'Luxury king bed with premium linens',
      'Handcrafted Kerala furniture',
      'High ceilings, whitewashed walls & rattan accents',
      'Ocean-view teak work desk',
      'Hair dryer',
      'Cleaning products',
      'Laundry essentials',
      'Hangers & clothing storage',
      'Extra pillows and blankets',
      'Spa-style bathroom with rainfall shower',
      'Curated coconut-shell toiletries',
      'Air conditioning & ceiling fan',
      'Refrigerator',
    ],
    highlights: [
      'Prime Cliffside Location – 30s from Café Sarwa, 5 min to Papanasam Beach',
      'Second Floor Retreat – Spacious balcony with uninterrupted views',
      'Designed for Bliss – Minimalist interiors with bohemian elegance',
      'Wake up in natural light, work with ocean breezes, refresh in your private retreat',
    ],
    experiences: [
      '🌊 Beaches & Nature – Papanasam (2 min), Kappil (15 min), Ponnumthuruthu Island (20 min)',
      '☕ Cliffside Culture – Café Sarwa (30 sec), Cliff Market (2 min), Evening Cultural Shows nearby',
      '🏄 Adventure & Wellness – Surfing at Varkala Beach (5 min), Yoga studios, Ayurveda (3 min)',
      '🛕 Spiritual Heritage – Janardanaswamy Temple (10 min), Sivagiri Mutt (15 min)',
      '✨ Neighborhood Vibes – Explore hidden beaches, spice farms, live music, or moonlit meditation',
    ],
    access: [
      'Private balcony with lounge chairs & coffee table',
      'Outdoor seating area in the front yard',
      'Lush garden space, ideal for morning yoga or relaxation',
    ],
    images: [
      '/topfloor/6.jpg',
      '/topfloor/4.jpg',
      '/topfloor/5.jpg',
      '/topfloor/2.jpg',
      '/topfloor/1.jpg',
      '/topfloor/3.jpg',
      '/topfloor/7.jpg',
      '/topfloor/8.jpg',
      '/topfloor/9.jpg',
      '/topfloor/10.jpg',
    ],
  },
  {
    id: 'luxury-landscape',
    name: 'Exclusive Villa Stay – Sea & Garden View',
    description: `
Treat your family or friends to the full villa experience with spacious sea- and garden-facing rooms. Private balconies, tropical bathrooms, and airy common spaces give you freedom to unwind at your own pace. The perfect blend of privacy, comfort, and Kerala’s natural beauty.
`,
    features: [
      { iconName: 'Bed', text: '2 Bedrooms' },
      { iconName: 'Bath', text: '2 Bathrooms' },
      { iconName: 'Waves', text: 'Sea View' },
      { iconName: 'Mountain', text: 'Garden View' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Crown', text: 'Exclusive Privacy' },
      { iconName: 'Snowflake', text: 'Air Conditioning' },
      { iconName: 'Fan', text: 'Ceiling Fan' },
      { iconName: 'Coffee', text: 'Hot Water Kettle' },
    ],
    amenities: [
      'Hair dryer',
      'Cleaning products',
      'Laundry essentials',
      'Hangers',
      'Extra pillows and blankets',
      'Luxury bathrooms with rainfall showers',
      'Clothing storage',
      'Air conditioning',
      'Ceiling fan',
      'Refrigerator',
    ],
    images: [
      '/homepage.png',
      '/topfloor/1.jpg',
      '/groundfloor/2.jpg',
      '/topfloor/3.jpg',
      '/groundfloor/4.jpg',
      '/topfloor/5.jpg',
      '/groundfloor/6.jpg',
      '/topfloor/7.jpg',
    ],
  },
];

export const getVillaById = (id: string): Villa | undefined =>
  villas.find((villa) => villa.id === id);
