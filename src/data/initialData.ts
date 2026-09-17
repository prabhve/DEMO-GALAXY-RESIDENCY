import { 
  PropertyInfo, 
  Room, 
  Facility, 
  DiningConfig, 
  EventConfig, 
  GalleryItem, 
  NearbyPlace, 
  BookingRequest, 
  Enquiry, 
  PolicyItem, 
  AppSettings 
} from '../types';

export const initialPropertyInfo: PropertyInfo = {
  id: 'prop-galaxy-residency',
  name: 'Galaxy Residency',
  slug: 'galaxy-residency',
  category: 'Student Dormitory',
  address: 'A2, APJ Abdul Kalam Road, Knowledge Park III',
  city: 'Greater Noida',
  state: 'Uttar Pradesh',
  pincode: '201310',
  country: 'India',
  latitude: 28.477821,
  longitude: 77.4878395,
  phone: '+91 93119 55944',
  whatsapp: '+91 93119 55944',
  email: 'contact@galaxyresidency.in',
  googleMapsUrl: 'https://maps.google.com/?q=28.477821,77.4878395',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=28.477821,77.4878395',
  description: 'Galaxy Residency is located on APJ Abdul Kalam Road in Knowledge Park III, Greater Noida. An accessible and comfortable stay destination for residents and visitors in the academic and corporate hub of Greater Noida.',
  subHeadline: 'Your Stay in Knowledge Park III, Greater Noida',
  coverImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=80',
  published: true,
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2026-09-16T12:00:00.000Z'
};

export const initialRooms: Room[] = [
  {
    id: 'room-single-comfort',
    name: 'Single Occupancy Room',
    slug: 'single-occupancy-room',
    description: 'A private, quiet accommodation designed for students and professionals requiring dedicated study focus, personal storage, and comfortable rest.',
    size: '160 sq.ft',
    bedType: 'Single Bed with Mattress',
    guestCapacity: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi Connectivity', 'Study Desk & Chair', 'Wardrobe Storage', 'Air Cooling / Fan', 'Attached Washroom'],
    features: ['Dedicated Study Nook', 'Natural Light Window', 'Personal Lockers', 'Power Backup Outlets'],
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    availabilityStatus: 'Available',
    featured: true,
    displayOrder: 1,
    published: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-09-16T12:00:00.000Z'
  },
  {
    id: 'room-twin-sharing',
    name: 'Twin Sharing Room',
    slug: 'twin-sharing-room',
    description: 'A well-ventilated shared twin room configured with dual individual study desks, separated wardrobes, and ergonomic arrangement.',
    size: '220 sq.ft',
    bedType: '2 Individual Single Beds',
    guestCapacity: 2,
    bathrooms: 1,
    amenities: ['High-Speed Wi-Fi', 'Two Individual Workstations', 'Dual Wardrobes', 'Attached Bathroom', 'Ventilated Balcony'],
    features: ['Spacious Layout', 'Daily Housekeeping Access', 'Power Backup Points', 'Quiet Ambient Zone'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    availabilityStatus: 'Available',
    featured: true,
    displayOrder: 2,
    published: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-09-16T12:00:00.000Z'
  },
  {
    id: 'room-triple-sharing',
    name: 'Triple Sharing Room',
    slug: 'triple-sharing-room',
    description: 'An economical shared option ideal for friends and university peers, offering structured space allocation with individual desks and secure storage.',
    size: '280 sq.ft',
    bedType: '3 Single Beds',
    guestCapacity: 3,
    bathrooms: 1,
    amenities: ['Wi-Fi Access', '3 Study Tables', 'Individual Wardrobes', 'Attached Washroom', 'Air Conditioning / Fan'],
    features: ['Substantial Floor Area', 'Direct Window Air Flow', 'Power Backup Outlets'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    availabilityStatus: 'Available',
    featured: true,
    displayOrder: 3,
    published: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-09-16T12:00:00.000Z'
  }
];

export const initialFacilities: Facility[] = [
  {
    id: 'fac-wifi',
    name: 'Wi-Fi Connectivity',
    description: 'High-speed internet throughout residency areas for academic research, work, and communication.',
    icon: 'Wifi',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Connectivity',
    featured: true,
    displayOrder: 1,
    published: true
  },
  {
    id: 'fac-laundry',
    name: 'Laundry Service',
    description: 'On-premise laundry facilities and garment care services available for all residents.',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    category: 'Convenience',
    featured: true,
    displayOrder: 2,
    published: true
  },
  {
    id: 'fac-food',
    name: 'Food & Dining Service',
    description: 'Hygienic daily meal arrangements and dining mess providing wholesome nutrition.',
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    category: 'Dining',
    featured: true,
    displayOrder: 3,
    published: true
  },
  {
    id: 'fac-housekeeping',
    name: 'Regular Housekeeping',
    description: 'Routine cleaning of common corridors, rooms, and washrooms for hygiene and order.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    category: 'Care',
    featured: true,
    displayOrder: 4,
    published: true
  },
  {
    id: 'fac-security',
    name: '24/7 Security & CCTV',
    description: 'Round-the-clock entrance monitoring and secured access points for resident safety.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    category: 'Safety',
    featured: true,
    displayOrder: 5,
    published: true
  },
  {
    id: 'fac-power',
    name: 'Power Backup',
    description: 'Electrical backup systems ensuring uninterrupted lighting and study capability during outages.',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    category: 'Utility',
    featured: true,
    displayOrder: 6,
    published: true
  }
];

export const initialDining: DiningConfig = {
  id: 'dining-mess-galaxy',
  name: 'Resident Dining Facility',
  description: 'Galaxy Residency provides wholesome meal services with regular breakfast, lunch, evening tea, and dinner prepared in a clean environment.',
  cuisine: 'North Indian & Wholesome Home-style Meals',
  timings: 'Breakfast: 7:30 AM – 9:30 AM | Lunch: 12:30 PM – 2:30 PM | Dinner: 8:00 PM – 10:00 PM',
  menuHighlights: [
    'Rotating weekly vegetarian meal plan',
    'Special weekend meals',
    'Clean RO purified drinking water',
    'Spacious resident dining hall'
  ],
  facilities: ['RO Purified Drinking Water', 'Clean Dining Hall', 'Weekly Menu Variation'],
  images: [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  ],
  published: true,
  enabled: true
};

export const initialEvents: EventConfig = {
  id: 'events-galaxy',
  name: 'Common Gathering Space',
  description: 'A shared multipurpose hall available for group orientations, student discussions, and residency meetings upon prior enquiry.',
  capacity: 'Up to 40 people',
  facilities: ['Projector / Display Provision', 'Seating Arrangements', 'Air Ventilation'],
  seating: 'Classroom & Discussion Circle',
  timings: 'Available by advance booking only',
  images: [
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80'
  ],
  availability: 'On Request',
  published: false,
  enabled: false // Default FALSE as instructed: "Admin setting: ENABLE_EVENTS_SECTION Default: FALSE"
};

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    category: 'Property',
    caption: 'Galaxy Residency Entrance & Front Architecture',
    altText: 'Exterior view of Galaxy Residency Knowledge Park III',
    featured: true,
    displayOrder: 1,
    published: true
  },
  {
    id: 'gal-2',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    category: 'Rooms',
    caption: 'Single Study Room Setup',
    altText: 'Quiet single room with desk and storage',
    featured: true,
    displayOrder: 2,
    published: true
  },
  {
    id: 'gal-3',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    category: 'Rooms',
    caption: 'Twin Sharing Accommodation',
    altText: 'Twin sharing bedroom with two beds',
    featured: true,
    displayOrder: 3,
    published: true
  },
  {
    id: 'gal-4',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    category: 'Dining',
    caption: 'Resident Dining Area',
    altText: 'Spacious dining hall at Galaxy Residency',
    featured: true,
    displayOrder: 4,
    published: true
  },
  {
    id: 'gal-5',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    category: 'Common Areas',
    caption: 'Resident Study & Interaction Area',
    altText: 'Common study lounge for students and residents',
    featured: true,
    displayOrder: 5,
    published: true
  },
  {
    id: 'gal-6',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
    category: 'Facilities',
    caption: 'Laundry Care Area',
    altText: 'On-site laundry and washing facility',
    featured: false,
    displayOrder: 6,
    published: true
  }
];

export const initialNearbyPlaces: NearbyPlace[] = [
  {
    id: 'np-sharda',
    name: 'Sharda University',
    category: 'Education',
    description: 'Premier university campus situated right in Knowledge Park III.',
    distance: '1.2 km',
    travelTime: '3-5 mins',
    googleMapsUrl: 'https://maps.google.com/?q=Sharda+University+Greater+Noida',
    coordinates: { lat: 28.4735, lng: 77.4820 },
    featured: true,
    displayOrder: 1,
    published: true
  },
  {
    id: 'np-galgotias',
    name: 'Galgotias Educational Institutions',
    category: 'Education',
    description: 'Major technical and management institute campus in Knowledge Park.',
    distance: '1.8 km',
    travelTime: '5 mins',
    googleMapsUrl: 'https://maps.google.com/?q=Galgotias+College+Greater+Noida',
    coordinates: { lat: 28.4682, lng: 77.4921 },
    featured: true,
    displayOrder: 2,
    published: true
  },
  {
    id: 'np-niet',
    name: 'Noida Institute of Engineering & Technology (NIET)',
    category: 'Education',
    description: 'Engineering and research institute in the Knowledge Park academic district.',
    distance: '1.5 km',
    travelTime: '4 mins',
    googleMapsUrl: 'https://maps.google.com/?q=NIET+Greater+Noida',
    coordinates: { lat: 28.4729, lng: 77.4912 },
    featured: true,
    displayOrder: 3,
    published: true
  },
  {
    id: 'np-metro-kp2',
    name: 'Knowledge Park II Metro Station',
    category: 'Transport',
    description: 'Noida Metro Aqua Line station connecting to Noida and Delhi network.',
    distance: '2.4 km',
    travelTime: '6 mins',
    googleMapsUrl: 'https://maps.google.com/?q=Knowledge+Park+II+Metro+Station',
    coordinates: { lat: 28.4690, lng: 77.4988 },
    featured: true,
    displayOrder: 4,
    published: true
  },
  {
    id: 'np-pari-chowk',
    name: 'Pari Chowk Junction',
    category: 'Transport',
    description: 'Central transport hub and landmark with buses, autos, and commercial markets.',
    distance: '3.5 km',
    travelTime: '8-10 mins',
    googleMapsUrl: 'https://maps.google.com/?q=Pari+Chowk+Greater+Noida',
    coordinates: { lat: 28.4646, lng: 77.5110 },
    featured: false,
    displayOrder: 5,
    published: true
  },
  {
    id: 'np-grand-venice',
    name: 'The Grand Venice Mall',
    category: 'Shopping',
    description: 'Prominent shopping mall, food court, and multiplex entertainment center.',
    distance: '4.2 km',
    travelTime: '10-12 mins',
    googleMapsUrl: 'https://maps.google.com/?q=The+Grand+Venice+Mall+Greater+Noida',
    coordinates: { lat: 28.4623, lng: 77.5230 },
    featured: false,
    displayOrder: 6,
    published: true
  }
];

export const initialPolicies: PolicyItem[] = [
  {
    id: 'pol-stay',
    type: 'Stay Policy',
    title: 'Residency Stay Guidelines',
    content: 'Residents are expected to maintain peaceful and considerate behavior towards fellow residents. Noise levels must be kept minimal during evening study and rest hours (10:00 PM to 6:00 AM). Common areas must be kept clean after usage.',
    published: true,
    updatedAt: '2026-09-16T12:00:00.000Z'
  },
  {
    id: 'pol-checkin',
    type: 'Check-in Policy',
    title: 'Check-in & Verification',
    content: 'All incoming residents and visitors must present a valid government-issued photo ID (Aadhaar / Voter ID / Passport) and student/institution ID card if applicable during verification. Entry formalities must be completed at the reception office.',
    published: true,
    updatedAt: '2026-09-16T12:00:00.000Z'
  },
  {
    id: 'pol-guest',
    type: 'Guest Policy',
    title: 'Visitor & Guest Guidelines',
    content: 'Day visitors must register at the reception with photo identification. Overnight visitors are permitted strictly with prior authorization from the residency management according to student dormitory regulations.',
    published: true,
    updatedAt: '2026-09-16T12:00:00.000Z'
  },
  {
    id: 'pol-privacy',
    type: 'Privacy Policy',
    title: 'Privacy & Data Protection',
    content: 'Information provided through booking requests and enquiries (name, telephone number, email address) is used solely for the purpose of communicating accommodation availability and managing your stay at Galaxy Residency. Data is never shared with third-party marketing entities.',
    published: true,
    updatedAt: '2026-09-16T12:00:00.000Z'
  }
];

export const initialBookingRequests: BookingRequest[] = [
  {
    id: 'req-001',
    requestId: 'GR-BKG-8492',
    customerName: 'Aman Sharma',
    phone: '+91 98765 43210',
    email: 'aman.sharma@example.com',
    roomId: 'room-single-comfort',
    roomName: 'Single Occupancy Room',
    checkIn: '2026-10-01',
    checkOut: '2026-12-31',
    guests: 1,
    specialRequest: 'Prefer a quieter room on an upper floor with good study desk light.',
    preferredContact: 'Phone',
    status: 'New',
    adminNotes: 'Student at nearby university joining semester.',
    createdAt: '2026-09-16T14:30:00.000Z',
    updatedAt: '2026-09-16T14:30:00.000Z'
  },
  {
    id: 'req-002',
    requestId: 'GR-BKG-8491',
    customerName: 'Pooja Verma',
    phone: '+91 98111 22334',
    email: 'pooja.verma@example.com',
    roomId: 'room-twin-sharing',
    roomName: 'Twin Sharing Room',
    checkIn: '2026-09-25',
    checkOut: '2026-11-25',
    guests: 1,
    specialRequest: 'Joining with batchmate who will also request booking.',
    preferredContact: 'WhatsApp',
    status: 'Contacted',
    adminNotes: 'Spoke on call regarding mess timings.',
    createdAt: '2026-09-15T11:20:00.000Z',
    updatedAt: '2026-09-16T09:15:00.000Z'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-001',
    enquiryId: 'GR-ENQ-1042',
    name: 'Rajesh Kumar',
    phone: '+91 98223 34455',
    email: 'rajesh.k@example.com',
    subject: 'Academic semester accommodation for my son',
    type: 'Room Enquiry',
    message: 'Hello, looking for student accommodation starting next month. Would like to enquire about meal schedule, laundry frequency, and Wi-Fi speed.',
    status: 'New',
    adminNotes: 'Father inquiring about semester batch intake.',
    createdAt: '2026-09-16T10:05:00.000Z',
    updatedAt: '2026-09-16T10:05:00.000Z'
  }
];

export const initialSettings: AppSettings = {
  showPublicPrices: false, // MANDATORY DEFAULT: FALSE
  showReviews: false, // MANDATORY DEFAULT: FALSE
  googleRating: 3.4,
  googleReviewCount: 105,
  enableDining: true,
  enableEvents: false, // MANDATORY DEFAULT: FALSE
  enableOnlinePayment: false, // MANDATORY DEFAULT: FALSE
  heroTitle: 'Your Stay in Knowledge Park III, Greater Noida',
  heroSubtitle: 'A convenient stay destination on APJ Abdul Kalam Road, Knowledge Park III, Greater Noida.',
  heroCtaText: 'EXPLORE STAY',
  heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=80',
  particleIntensity: 'low',
  camera3DMovement: true,
  parallaxIntensity: 1.0,
  reducedMotion: false,
  googleBusinessUrl: 'https://maps.google.com/?q=28.477821,77.4878395',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.4764835824555!2d77.48526457549488!3d28.477820975750147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI4JzQwLjIiTiA3N8KwMjknMTYuMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  whatsappNumber: '+919311955944',
  contactEmail: 'contact@galaxyresidency.in',
  seoTitle: 'Galaxy Residency — Stay in Knowledge Park III, Greater Noida',
  seoDescription: 'Galaxy Residency on APJ Abdul Kalam Road, Knowledge Park III, Greater Noida. Accessible stay for students and visitors.'
};
