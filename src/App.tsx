import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Room } from './types';

// Common Components
import { HeaderNav } from './components/common/HeaderNav';
import { Footer } from './components/common/Footer';

// Page Sections
import { HeroSection } from './components/home/HeroSection';
import { PropertyIntroSection } from './components/home/PropertyIntroSection';
import { HighlightsSection } from './components/home/HighlightsSection';
import { RoomsShowcaseSection } from './components/home/RoomsShowcaseSection';
import { FacilitiesSection } from './components/home/FacilitiesSection';
import { DiningSection } from './components/home/DiningSection';
import { GallerySection } from './components/home/GallerySection';
import { LocationSection } from './components/home/LocationSection';
import { ContactSection } from './components/home/ContactSection';
import { PoliciesSection } from './components/home/PoliciesSection';
import { FinalCtaSection } from './components/home/FinalCtaSection';

// Modals
import { RoomDetailModal } from './components/room/RoomDetailModal';
import { BookingModal } from './components/booking/BookingModal';
import { EnquiryModal } from './components/enquiry/EnquiryModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainApp: React.FC = () => {
  const { property } = useCMS();

  // Modal States
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingRoomName, setBookingRoomName] = useState<string>('');
  const [bookingRoomId, setBookingRoomId] = useState<string>('');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Keyboard shortcut to open Admin Console (Ctrl + Shift + A or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenBooking = (roomName?: string, roomId?: string) => {
    setBookingRoomName(roomName || '');
    setBookingRoomId(roomId || '');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e0ded8] selection:bg-[#c8a97e] selection:text-[#0f1115] font-sans antialiased overflow-x-hidden">
      
      {/* Navigation Header */}
      <HeaderNav
        onRequestBooking={() => handleOpenBooking()}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Layout */}
      <main id="main-content">
        {/* Scene 01 & 02: Hero Section with 3D WebGL Background */}
        <HeroSection
          onRequestBooking={() => handleOpenBooking()}
          onExploreStay={() => {
            const stayElem = document.getElementById('stay');
            stayElem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Scene 03: Property Introduction & Architectural Space */}
        <PropertyIntroSection
          onRequestBooking={() => handleOpenBooking()}
          onExploreRooms={() => {
            const stayElem = document.getElementById('stay');
            stayElem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Scene 06: Highlights & Verified Dormitory Characteristics */}
        <HighlightsSection />

        {/* Scene 04 & 05: 3D Accommodation Showcase (Rooms) */}
        <RoomsShowcaseSection
          onSelectRoom={(room) => setSelectedRoom(room)}
          onRequestBooking={(roomName, roomId) => handleOpenBooking(roomName, roomId)}
        />

        {/* Scene 09: Campus & Residency Living Facilities */}
        <FacilitiesSection />

        {/* Scene 08: Resident Dining & Mess Section (Only if enabled) */}
        <DiningSection
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
        />

        {/* Scene 07: 3D Perspective Visual Gallery */}
        <GallerySection />

        {/* Scene 12: Location & Interactive Map Section */}
        <LocationSection />

        {/* Scene 13: Direct Contact Desk */}
        <ContactSection
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
          onRequestBooking={() => handleOpenBooking()}
        />

        {/* Scene 16: Residency Policies & Verification */}
        <PoliciesSection />

        {/* Scene 17: Final CTA Section */}
        <FinalCtaSection
          onRequestBooking={() => handleOpenBooking()}
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onRequestBooking={() => handleOpenBooking()}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* --- Interactive Modals --- */}
      
      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onRequestBooking={(room) => {
          setSelectedRoom(null);
          handleOpenBooking(room.name, room.id);
        }}
      />

      {/* Request Stay Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedRoomName={bookingRoomName}
        preselectedRoomId={bookingRoomId}
      />

      {/* Enquiry Submission Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />

      {/* Full Admin CMS Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <MainApp />
    </CMSProvider>
  );
}
