export type AvailabilityStatus = 'Available' | 'Request Only' | 'Under Maintenance' | 'Unavailable';

export type BookingStatus = 'New' | 'Contacted' | 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export type EnquiryStatus = 'New' | 'Contacted' | 'Resolved';

export type EnquiryType = 
  | 'General Enquiry' 
  | 'Room Enquiry' 
  | 'Availability Enquiry' 
  | 'Dining Enquiry' 
  | 'Facility Enquiry' 
  | 'Meeting / Event Enquiry' 
  | 'Other';

export interface PropertyInfo {
  id: string;
  name: string;
  slug: string;
  category: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsapp?: string;
  email?: string;
  googleMapsUrl: string;
  directionsUrl: string;
  description: string;
  subHeadline: string;
  logo?: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  size?: string;
  bedType?: string;
  guestCapacity?: number;
  bathrooms?: number;
  amenities: string[];
  features: string[];
  images: string[];
  coverImage: string;
  availabilityStatus: AvailabilityStatus;
  featured: boolean;
  displayOrder: number;
  published: boolean;
  price?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
  category: string;
  featured: boolean;
  displayOrder: number;
  published: boolean;
}

export interface DiningConfig {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  timings: string;
  menuHighlights: string[];
  facilities: string[];
  images: string[];
  published: boolean;
  enabled: boolean;
}

export interface EventConfig {
  id: string;
  name: string;
  description: string;
  capacity: string;
  facilities: string[];
  seating: string;
  timings: string;
  images: string[];
  availability: string;
  published: boolean;
  enabled: boolean;
}

export type GalleryCategory = 'All' | 'Property' | 'Rooms' | 'Facilities' | 'Dining' | 'Events' | 'Common Areas' | 'About';

export interface GalleryItem {
  id: string;
  image: string;
  category: GalleryCategory;
  caption: string;
  altText: string;
  featured: boolean;
  displayOrder: number;
  published: boolean;
}

export interface NearbyPlace {
  id: string;
  name: string;
  category: 'Education' | 'Transport' | 'Shopping' | 'Dining' | 'Healthcare' | 'Business' | 'Landmarks';
  description: string;
  distance: string;
  travelTime: string;
  googleMapsUrl: string;
  coordinates?: { lat: number; lng: number };
  featured: boolean;
  displayOrder: number;
  published: boolean;
}

export interface BookingRequest {
  id: string;
  requestId: string;
  customerName: string;
  phone: string;
  email: string;
  roomId?: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequest?: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  status: BookingStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  enquiryId: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  type: EnquiryType;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyItem {
  id: string;
  type: string;
  title: string;
  content: string;
  published: boolean;
  updatedAt: string;
}

export interface AppSettings {
  showPublicPrices: boolean;
  showReviews: boolean;
  googleRating?: number;
  googleReviewCount?: number;
  enableDining: boolean;
  enableEvents: boolean;
  enableOnlinePayment: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: string;
  particleIntensity: 'low' | 'medium' | 'high' | 'off';
  camera3DMovement: boolean;
  parallaxIntensity: number;
  reducedMotion: boolean;
  googleBusinessUrl: string;
  googleMapsEmbedUrl: string;
  whatsappNumber?: string;
  contactEmail?: string;
  seoTitle: string;
  seoDescription: string;
}
