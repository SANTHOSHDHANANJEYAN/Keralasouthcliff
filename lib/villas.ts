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
}

export const villas: Villa[] = [
  {
    id: 'sea-garden-room',
    name: 'Sea & Garden View Room',
    description: `
Wake up to the sound of waves crashing against golden cliffs. Welcome to your modern, minimalist sanctuary on Varkala Cliff—where every day begins with breathtaking ocean views and adventure. Prime Cliffside Location – Uninterrupted sunset views, just 30 seconds from Café Sarwa and 5 minutes from sacred Papanasam Beach. Designed for Bliss – 550 sqft of Bohemian space with handcrafted Kerala furniture, luxury linens, and high-speed Wi-Fi for digital nomads. Ground Floor unit.

The space:
🌿 First Floor: Spacious 550 sqft Studio with Tropical Oasis Bathroom
Step into your sun-drenched studio sanctuary, where modern comfort meets jungle-chic elegance. This 550 sqft open-concept retreat blends seamless living with Varkala's natural beauty, featuring:

🛋 Studio Highlights:
Airy Open Layout: High ceilings, whitewashed walls, and rattan accents create a breezy, uncluttered vibe.
Luxury King Bed: Drift asleep to the sound of waves in a handcrafted teak four-poster bed with premium linens.
Designer Workspace: A sleek teak desk with ocean views and high-speed Wi-Fi for productive workations.
Smart Living: kettle, and curated local coffee/tea selection for effortless mornings.

🚿 Tropical Oasis Bathroom:
Your private jungle spa awaits:
Stone Rainfall Shower: Natural laterite stone walls and a showerhead for an earthy, immersive rinse.
Skylit Vanity: Bathe in dappled sunlight under an open-air skylight (with privacy louvers).
Botanical Luxury: Living vertical garden, coconut shell toiletries, and subtle palmarosa oil aromatherapy.

"Wake up surrounded by light, work with ocean breezes, and rinse off under your private jungle waterfall—this is coastal Kerala living at its finest."

Ocean views, local attractions, and activities await you during your stay.
`,
    features: [
      { iconName: 'Bed', text: '1 Bedroom' },
      { iconName: 'Bath', text: '1 Bathroom' },
      { iconName: 'Waves', text: 'Sea Glimpse' },
      { iconName: 'Mountain', text: 'Garden Facing' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Shield', text: '24/7 Security' }
    ],
    amenities: [
      'Comfortable double bed',
      'Private garden-facing patio',
      'Elegant en-suite bathroom',
      'Air conditioning and ceiling fan',
      'Complimentary WiFi',
      'Daily housekeeping service'
    ],
    images: [
      '/groundfloor/2.jpg',
      '/groundfloor/8.png',
      '/groundfloor/13.jpg',
      '/groundfloor/5.jpg',
      '/groundfloor/6.jpg',
      '/groundfloor/1.png',
      '/groundfloor/7.jpg',
      '/groundfloor/9.jpg',
      '/groundfloor/10.jpg',
      '/groundfloor/11.jpg',
      '/groundfloor/12.jpg'
    ]
  },
  {
    id: 'landscape-room',
    name: 'Landscape View Room',
    description: `
Embrace slow mornings with the soothing charm of our Landscape View Room. Offering a scenic blend of lush gardens and a panoramic sea view, this room is designed for peaceful stays. Bright, airy, and thoughtfully styled with modern comforts, it creates the perfect space to relax, recharge, and enjoy the beauty of Varkala’s natural surroundings.
`,
    features: [
      { iconName: 'Bed', text: '1 Bedroom' },
      { iconName: 'Bath', text: '1 Bathroom' },
      { iconName: 'Mountain', text: 'Landscape View' },
      { iconName: 'Sun', text: 'Natural Light' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Car', text: 'Free Parking' }
    ],
    amenities: [
      'Large window with scenic views',
      'Cozy reading corner',
      'Modern bathroom amenities',
      'Complimentary WiFi',
      'Air conditioning',
      'Daily housekeeping'
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
      '/topfloor/10.jpg'
    ]
  },
  {
    id: 'luxury-landscape',
    name: 'Exclusive Villa Stay – Sea & Garden View',
    description: `
Experience Asteya in complete privacy with our Exclusive Villa Stay. Perfect for families, friends, or long retreats, this option gives you the entire villa with spacious sea- and garden-facing rooms. Surrounded by lush greenery and glimpses of the Arabian Sea, the villa offers a serene setting where comfort meets nature. Enjoy personalized space, modern amenities, and the freedom to unwind at your own pace.
`,
    features: [
      { iconName: 'Bed', text: '2 Bedrooms' },
      { iconName: 'Bath', text: '2 Bathrooms' },
      { iconName: 'Waves', text: 'Sea View' },
      { iconName: 'Mountain', text: 'Garden View' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Crown', text: 'Exclusive Privacy' }
    ],
    amenities: [
      'Entire villa for your group',
      'Private balconies and patio',
      'Spacious common areas',
      'Full-service kitchen',
      'Butler and concierge services',
      'Daily housekeeping',
      'High-speed WiFi'
    ],
    images: [
      '/homepage.png',
      '/topfloor/1.jpg',
      '/groundfloor/2.jpg',
      '/topfloor/3.jpg',
      '/groundfloor/4.jpg',
      '/topfloor/5.jpg',
      '/groundfloor/6.jpg',
      '/topfloor/7.jpg'
    ]
  }
];

export const getVillaById = (id: string): Villa | undefined => {
  return villas.find((villa) => villa.id === id);
};
