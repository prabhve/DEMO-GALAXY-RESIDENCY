import React, { createContext, useContext, useState, useEffect } from 'react';
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
  AppSettings,
  BookingStatus,
  EnquiryStatus
} from '../types';
import {
  initialPropertyInfo,
  initialRooms,
  initialFacilities,
  initialDining,
  initialEvents,
  initialGallery,
  initialNearbyPlaces,
  initialPolicies,
  initialBookingRequests,
  initialEnquiries,
  initialSettings
} from '../data/initialData';

interface CMSContextType {
  property: PropertyInfo;
  updateProperty: (data: Partial<PropertyInfo>) => void;

  rooms: Room[];
  addRoom: (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;

  facilities: Facility[];
  addFacility: (facility: Omit<Facility, 'id'>) => void;
  updateFacility: (id: string, facility: Partial<Facility>) => void;
  deleteFacility: (id: string) => void;

  dining: DiningConfig;
  updateDining: (dining: Partial<DiningConfig>) => void;

  events: EventConfig;
  updateEvents: (events: Partial<EventConfig>) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  nearbyPlaces: NearbyPlace[];
  addNearbyPlace: (place: Omit<NearbyPlace, 'id'>) => void;
  updateNearbyPlace: (id: string, place: Partial<NearbyPlace>) => void;
  deleteNearbyPlace: (id: string) => void;

  bookingRequests: BookingRequest[];
  addBookingRequest: (req: Omit<BookingRequest, 'id' | 'requestId' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateBookingStatus: (id: string, status: BookingStatus, notes?: string) => void;
  deleteBookingRequest: (id: string) => void;

  enquiries: Enquiry[];
  addEnquiry: (enq: Omit<Enquiry, 'id' | 'enquiryId' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, notes?: string) => void;
  deleteEnquiry: (id: string) => void;

  policies: PolicyItem[];
  updatePolicy: (id: string, policy: Partial<PolicyItem>) => void;
  addPolicy: (policy: Omit<PolicyItem, 'id' | 'updatedAt'>) => void;
  deletePolicy: (id: string) => void;

  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Reset to verified facts
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEYS = {
  property: 'gr_property_v1',
  rooms: 'gr_rooms_v1',
  facilities: 'gr_facilities_v1',
  dining: 'gr_dining_v1',
  events: 'gr_events_v1',
  gallery: 'gr_gallery_v1',
  nearby: 'gr_nearby_v1',
  bookings: 'gr_bookings_v1',
  enquiries: 'gr_enquiries_v1',
  policies: 'gr_policies_v1',
  settings: 'gr_settings_v1',
  auth: 'gr_auth_token_v1'
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [property, setProperty] = useState<PropertyInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.property);
    return saved ? JSON.parse(saved) : initialPropertyInfo;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.rooms);
    return saved ? JSON.parse(saved) : initialRooms;
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.facilities);
    return saved ? JSON.parse(saved) : initialFacilities;
  });

  const [dining, setDining] = useState<DiningConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.dining);
    return saved ? JSON.parse(saved) : initialDining;
  });

  const [events, setEvents] = useState<EventConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.events);
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.gallery);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.nearby);
    return saved ? JSON.parse(saved) : initialNearbyPlaces;
  });

  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.bookings);
    return saved ? JSON.parse(saved) : initialBookingRequests;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.enquiries);
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [policies, setPolicies] = useState<PolicyItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.policies);
    return saved ? JSON.parse(saved) : initialPolicies;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.settings);
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.auth) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.property, JSON.stringify(property));
  }, [property]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.rooms, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.facilities, JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.dining, JSON.stringify(dining));
  }, [dining]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.nearby, JSON.stringify(nearbyPlaces));
  }, [nearbyPlaces]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookingRequests));
  }, [bookingRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.enquiries, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.policies, JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  }, [settings]);

  // Operations
  const updateProperty = (data: Partial<PropertyInfo>) => {
    setProperty(prev => ({ ...prev, ...data, updatedAt: new Date().toISOString() }));
  };

  const addRoom = (roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRoom: Room = {
      ...roomData,
      id: `room-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (id: string, roomData: Partial<Room>) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, ...roomData, updatedAt: new Date().toISOString() } : r));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const addFacility = (facData: Omit<Facility, 'id'>) => {
    const newFac: Facility = {
      ...facData,
      id: `fac-${Date.now()}`
    };
    setFacilities(prev => [...prev, newFac]);
  };

  const updateFacility = (id: string, facData: Partial<Facility>) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, ...facData } : f));
  };

  const deleteFacility = (id: string) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
  };

  const updateDining = (data: Partial<DiningConfig>) => {
    setDining(prev => ({ ...prev, ...data }));
  };

  const updateEvents = (data: Partial<EventConfig>) => {
    setEvents(prev => ({ ...prev, ...data }));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [...prev, newItem]);
  };

  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...item } : g));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const addNearbyPlace = (place: Omit<NearbyPlace, 'id'>) => {
    const newPlace: NearbyPlace = {
      ...place,
      id: `np-${Date.now()}`
    };
    setNearbyPlaces(prev => [...prev, newPlace]);
  };

  const updateNearbyPlace = (id: string, place: Partial<NearbyPlace>) => {
    setNearbyPlaces(prev => prev.map(p => p.id === id ? { ...p, ...place } : p));
  };

  const deleteNearbyPlace = (id: string) => {
    setNearbyPlaces(prev => prev.filter(p => p.id !== id));
  };

  const addBookingRequest = (req: Omit<BookingRequest, 'id' | 'requestId' | 'createdAt' | 'updatedAt' | 'status'>): string => {
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const requestId = `GR-BKG-${randSuffix}`;
    const newBooking: BookingRequest = {
      ...req,
      id: `bkg-${Date.now()}`,
      requestId,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setBookingRequests(prev => [newBooking, ...prev]);
    return requestId;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, notes?: string) => {
    setBookingRequests(prev => prev.map(b => b.id === id ? { 
      ...b, 
      status, 
      adminNotes: notes !== undefined ? notes : b.adminNotes,
      updatedAt: new Date().toISOString() 
    } : b));
  };

  const deleteBookingRequest = (id: string) => {
    setBookingRequests(prev => prev.filter(b => b.id !== id));
  };

  const addEnquiry = (enq: Omit<Enquiry, 'id' | 'enquiryId' | 'createdAt' | 'updatedAt' | 'status'>): string => {
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const enquiryId = `GR-ENQ-${randSuffix}`;
    const newEnquiry: Enquiry = {
      ...enq,
      id: `enq-${Date.now()}`,
      enquiryId,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    return enquiryId;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, notes?: string) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { 
      ...e, 
      status, 
      adminNotes: notes !== undefined ? notes : e.adminNotes,
      updatedAt: new Date().toISOString() 
    } : e));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  const updatePolicy = (id: string, policy: Partial<PolicyItem>) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, ...policy, updatedAt: new Date().toISOString() } : p));
  };

  const addPolicy = (policy: Omit<PolicyItem, 'id' | 'updatedAt'>) => {
    const newPol: PolicyItem = {
      ...policy,
      id: `pol-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    setPolicies(prev => [...prev, newPol]);
  };

  const deletePolicy = (id: string) => {
    setPolicies(prev => prev.filter(p => p.id !== id));
  };

  const updateSettings = (data: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...data }));
  };

  const adminLogin = (pass: string): boolean => {
    if (pass === 'galaxyadmin' || pass === 'admin123' || pass === 'galaxy2026') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.auth, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.auth);
  };

  const resetToDefaults = () => {
    setProperty(initialPropertyInfo);
    setRooms(initialRooms);
    setFacilities(initialFacilities);
    setDining(initialDining);
    setEvents(initialEvents);
    setGallery(initialGallery);
    setNearbyPlaces(initialNearbyPlaces);
    setBookingRequests(initialBookingRequests);
    setEnquiries(initialEnquiries);
    setPolicies(initialPolicies);
    setSettings(initialSettings);
    localStorage.clear();
  };

  return (
    <CMSContext.Provider
      value={{
        property,
        updateProperty,
        rooms,
        addRoom,
        updateRoom,
        deleteRoom,
        facilities,
        addFacility,
        updateFacility,
        deleteFacility,
        dining,
        updateDining,
        events,
        updateEvents,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        nearbyPlaces,
        addNearbyPlace,
        updateNearbyPlace,
        deleteNearbyPlace,
        bookingRequests,
        addBookingRequest,
        updateBookingStatus,
        deleteBookingRequest,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        policies,
        updatePolicy,
        addPolicy,
        deletePolicy,
        settings,
        updateSettings,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        resetToDefaults
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
