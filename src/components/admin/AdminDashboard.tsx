import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  CalendarCheck, 
  MessageSquare, 
  Bed, 
  Layers, 
  Utensils, 
  Images, 
  MapPin, 
  ShieldCheck, 
  Settings as SettingsIcon, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Search, 
  Filter, 
  Sliders,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
  Building2,
  Calendar,
  Phone,
  Mail,
  User,
  Menu
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { 
  BookingStatus, 
  EnquiryStatus, 
  Room, 
  Facility, 
  GalleryItem, 
  NearbyPlace, 
  PolicyItem 
} from '../../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { 
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
    updateBookingStatus, 
    deleteBookingRequest,
    enquiries, 
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
  } = useCMS();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'enquiries' | 'rooms' | 'facilities' | 'dining' | 'gallery' | 'location' | 'policies' | 'settings'
  >('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Search & Filters state
  const [bookingFilter, setBookingFilter] = useState<string>('All');
  const [enquiryFilter, setEnquiryFilter] = useState<string>('All');

  // Room modal form state
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [roomFormData, setRoomFormData] = useState({
    name: '',
    slug: '',
    description: '',
    size: '180 sq.ft',
    bedType: 'Single Bed',
    guestCapacity: 1,
    bathrooms: 1,
    amenities: 'Wi-Fi, Study Desk, Attached Bathroom',
    features: 'Natural Light, Storage Wardrobe',
    coverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    availabilityStatus: 'Available' as const,
    featured: true,
    published: true,
    price: ''
  });

  // Gallery item form state
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    image: '',
    category: 'Property' as any,
    caption: '',
    altText: '',
    featured: false,
    displayOrder: 1,
    published: true
  });

  // Facility form state
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [facilityFormData, setFacilityFormData] = useState({
    name: '',
    description: '',
    icon: 'Wifi',
    category: 'General',
    featured: true,
    displayOrder: 1,
    published: true
  });

  // Nearby place form state
  const [isAddingNearby, setIsAddingNearby] = useState(false);
  const [nearbyFormData, setNearbyFormData] = useState({
    name: '',
    category: 'Education' as any,
    description: '',
    distance: '',
    travelTime: '',
    googleMapsUrl: '',
    featured: false,
    displayOrder: 1,
    published: true
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(loginPassword);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setLoginPassword('');
    }
  };

  const openEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomFormData({
      name: room.name,
      slug: room.slug,
      description: room.description,
      size: room.size || '',
      bedType: room.bedType || '',
      guestCapacity: room.guestCapacity || 1,
      bathrooms: room.bathrooms || 1,
      amenities: room.amenities.join(', '),
      features: room.features.join(', '),
      coverImage: room.coverImage,
      availabilityStatus: room.availabilityStatus,
      featured: room.featured,
      published: room.published,
      price: room.price || ''
    });
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const amenitiesArr = roomFormData.amenities.split(',').map(s => s.trim()).filter(Boolean);
    const featuresArr = roomFormData.features.split(',').map(s => s.trim()).filter(Boolean);

    if (editingRoom) {
      updateRoom(editingRoom.id, {
        name: roomFormData.name,
        slug: roomFormData.slug || roomFormData.name.toLowerCase().replace(/\s+/g, '-'),
        description: roomFormData.description,
        size: roomFormData.size,
        bedType: roomFormData.bedType,
        guestCapacity: Number(roomFormData.guestCapacity),
        bathrooms: Number(roomFormData.bathrooms),
        amenities: amenitiesArr,
        features: featuresArr,
        coverImage: roomFormData.coverImage,
        availabilityStatus: roomFormData.availabilityStatus,
        featured: roomFormData.featured,
        published: roomFormData.published,
        price: roomFormData.price
      });
      setEditingRoom(null);
    } else {
      addRoom({
        name: roomFormData.name,
        slug: roomFormData.slug || roomFormData.name.toLowerCase().replace(/\s+/g, '-'),
        description: roomFormData.description,
        size: roomFormData.size,
        bedType: roomFormData.bedType,
        guestCapacity: Number(roomFormData.guestCapacity),
        bathrooms: Number(roomFormData.bathrooms),
        amenities: amenitiesArr,
        features: featuresArr,
        images: [roomFormData.coverImage],
        coverImage: roomFormData.coverImage,
        availabilityStatus: roomFormData.availabilityStatus,
        featured: roomFormData.featured,
        displayOrder: rooms.length + 1,
        published: roomFormData.published,
        price: roomFormData.price
      });
      setIsAddingRoom(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-black/90 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      
      {/* If not logged in, show Admin Login View */}
      {!isAdminAuthenticated ? (
        <div className="m-auto w-full max-w-md p-6 sm:p-8 bg-[#14171f] border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#c8a97e] flex items-center justify-center text-[#0f1115]">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-white tracking-wider">
                GALAXY RESIDENCY CMS
              </span>
            </div>
            <button 
              type="button" 
              onClick={onClose}
              className="p-1.5 text-[#8e8c87] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl font-serif text-white font-semibold mb-1">
            Property Administration Login
          </h2>
          <p className="text-xs text-[#a09e99] mb-6">
            Authorized management access for admissions, stay bookings, and residency CMS controls.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1.5">
                Admin Access Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin passcode (e.g. admin123)"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#0f1115] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c8a97e]"
              />
              {loginError && (
                <p className="text-xs text-rose-400 mt-1">
                  Incorrect passcode. (Try: admin123 or galaxyadmin)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#c8a97e] hover:bg-[#dbbe96] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg transition-colors"
            >
              SIGN IN TO DASHBOARD
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setLoginPassword('admin123');
                  adminLogin('admin123');
                }}
                className="text-xs text-[#a09e99] hover:text-[#c8a97e] font-mono underline"
              >
                Quick Demo Sign-in
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Authenticated Admin Dashboard Layout */
        <div className="relative flex w-full h-full overflow-hidden">
          
          {/* Mobile backdrop */}
          {mobileNavOpen && (
            <div 
              className="fixed inset-0 bg-black/70 z-30 md:hidden backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#10131a] border-r border-white/10 flex flex-col justify-between shrink-0 transition-transform duration-300 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}>
            <div>
              {/* Brand Top */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c8a97e] flex items-center justify-center text-[#0f1115]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-white text-sm">GALAXY CMS</div>
                    <div className="text-[10px] text-[#a09e99] font-mono">Knowledge Park III</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="md:hidden p-1.5 text-[#8e8c87] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
                <button
                  type="button"
                  onClick={() => { setActiveTab('overview'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'overview' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('bookings'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'bookings' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck className="w-4 h-4" />
                    <span>Bookings</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10">
                    {bookingRequests.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('enquiries'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'enquiries' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Enquiries</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10">
                    {enquiries.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('rooms'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'rooms' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Bed className="w-4 h-4" />
                  <span>Rooms / Stay</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('facilities'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'facilities' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Facilities</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('dining'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'dining' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>Dining / Mess</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('gallery'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'gallery' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Images className="w-4 h-4" />
                  <span>Gallery</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('location'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'location' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Location / Nearby</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('policies'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'policies' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Policies</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('settings'); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                    activeTab === 'settings' ? 'bg-[#c8a97e] text-[#0f1115] font-semibold' : 'text-[#a09e99] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <SettingsIcon className="w-4 h-4" />
                  <span>Settings & 3D</span>
                </button>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>PREVIEW SITE</span>
              </button>

              <button
                type="button"
                onClick={adminLogout}
                className="w-full py-2 text-xs font-mono uppercase text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>LOGOUT</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-[#14171f] overflow-y-auto">
            
            {/* Top Bar */}
            <header className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#10131a] shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(true)}
                  className="md:hidden p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Open sidebar menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl font-serif font-bold text-white uppercase">
                    {activeTab.replace('-', ' ')}
                  </h1>
                  <p className="text-[11px] sm:text-xs text-[#a09e99] font-mono line-clamp-1">
                    Galaxy Residency Management Console • Auto-synchronized with live public site
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all property data to verified defaults?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-3 py-1.5 text-xs text-[#a09e99] hover:text-white bg-white/5 rounded-lg border border-white/5 flex items-center gap-1.5 font-mono"
                  title="Reset to Initial Verified Data"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg"
                  title="Close Dashboard"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            <div className="p-6 sm:p-8">
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="p-5 rounded-2xl bg-[#10131a] border border-white/5">
                      <div className="flex items-center justify-between text-[#8e8c87] mb-3">
                        <span className="text-xs font-mono uppercase">Booking Requests</span>
                        <CalendarCheck className="w-4 h-4 text-[#c8a97e]" />
                      </div>
                      <div className="text-3xl font-serif font-bold text-white">
                        {bookingRequests.length}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-2 font-mono">
                        {bookingRequests.filter(b => b.status === 'New').length} New Pending
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#10131a] border border-white/5">
                      <div className="flex items-center justify-between text-[#8e8c87] mb-3">
                        <span className="text-xs font-mono uppercase">Total Enquiries</span>
                        <MessageSquare className="w-4 h-4 text-sky-400" />
                      </div>
                      <div className="text-3xl font-serif font-bold text-white">
                        {enquiries.length}
                      </div>
                      <div className="text-[11px] text-sky-400 mt-2 font-mono">
                        {enquiries.filter(e => e.status === 'New').length} Unread
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#10131a] border border-white/5">
                      <div className="flex items-center justify-between text-[#8e8c87] mb-3">
                        <span className="text-xs font-mono uppercase">Active Rooms</span>
                        <Bed className="w-4 h-4 text-[#c8a97e]" />
                      </div>
                      <div className="text-3xl font-serif font-bold text-white">
                        {rooms.filter(r => r.published).length}
                      </div>
                      <div className="text-[11px] text-[#a09e99] mt-2 font-mono">
                        {rooms.length} Categories Total
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#10131a] border border-white/5">
                      <div className="flex items-center justify-between text-[#8e8c87] mb-3">
                        <span className="text-xs font-mono uppercase">Gallery Assets</span>
                        <Images className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-3xl font-serif font-bold text-white">
                        {gallery.filter(g => g.published).length}
                      </div>
                      <div className="text-[11px] text-[#a09e99] mt-2 font-mono">
                        Published Photos
                      </div>
                    </div>
                  </div>

                  {/* Recent Bookings Table */}
                  <div className="rounded-2xl bg-[#10131a] border border-white/5 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-serif font-bold text-white">
                        Recent Stay Booking Requests
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('bookings')}
                        className="text-xs text-[#c8a97e] font-mono hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="text-[#8e8c87] border-b border-white/10 uppercase">
                          <tr>
                            <th className="pb-3">Request ID</th>
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Room</th>
                            <th className="pb-3">Check-in</th>
                            <th className="pb-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-[#bbb8b0]">
                          {bookingRequests.slice(0, 5).map((b) => (
                            <tr key={b.id} className="hover:bg-white/[0.02]">
                              <td className="py-3 text-white font-semibold">{b.requestId}</td>
                              <td className="py-3">{b.customerName}</td>
                              <td className="py-3">{b.roomName}</td>
                              <td className="py-3">{b.checkIn}</td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] ${
                                  b.status === 'New' ? 'bg-amber-500/20 text-amber-300' :
                                  b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                                  'bg-white/10 text-[#bbb8b0]'
                                }`}>
                                  {b.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  {/* Status Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {['All', 'New', 'Contacted', 'Pending', 'Confirmed', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setBookingFilter(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                            bookingFilter === st
                              ? 'bg-[#c8a97e] text-[#0f1115] font-semibold'
                              : 'bg-white/5 text-[#a09e99] hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs text-[#8e8c87] font-mono">
                      Showing {bookingRequests.filter(b => bookingFilter === 'All' || b.status === bookingFilter).length} requests
                    </div>
                  </div>

                  {/* Bookings List Cards */}
                  <div className="space-y-4">
                    {bookingRequests
                      .filter(b => bookingFilter === 'All' || b.status === bookingFilter)
                      .map((b) => (
                        <div key={b.id} className="p-6 rounded-2xl bg-[#10131a] border border-white/10 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="text-base font-serif font-bold text-white">
                                  {b.customerName}
                                </span>
                                <span className="text-xs font-mono text-[#c8a97e] bg-[#c8a97e]/10 px-2.5 py-0.5 rounded">
                                  {b.requestId}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8e8c87] mt-1">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-[#c8a97e]" />
                                  <a href={`tel:${b.phone}`} className="hover:text-white">{b.phone}</a>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-[#c8a97e]" />
                                  <a href={`mailto:${b.email}`} className="hover:text-white">{b.email}</a>
                                </span>
                                <span>Prefers: {b.preferredContact}</span>
                              </div>
                            </div>

                            {/* Status Change Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-[#8e8c87]">Status:</span>
                              <select
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                                className="bg-[#14171f] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#c8a97e]"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => deleteBookingRequest(b.id)}
                                className="p-1.5 text-[#8e8c87] hover:text-rose-400 transition-colors"
                                title="Delete Request"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#bbb8b0]">
                            <div>
                              <span className="text-[#8e8c87] block text-[10px] uppercase">Requested Room</span>
                              <span className="text-white font-medium">{b.roomName}</span>
                            </div>
                            <div>
                              <span className="text-[#8e8c87] block text-[10px] uppercase">Stay Window</span>
                              <span className="text-white">{b.checkIn} to {b.checkOut}</span>
                            </div>
                            <div>
                              <span className="text-[#8e8c87] block text-[10px] uppercase">Residents</span>
                              <span className="text-white">{b.guests} Person(s)</span>
                            </div>
                          </div>

                          {b.specialRequest && (
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-[#a09e99]">
                              <strong className="text-white">Note/Preferences:</strong> {b.specialRequest}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    {['All', 'New', 'Contacted', 'Resolved'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setEnquiryFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                          enquiryFilter === st
                            ? 'bg-[#c8a97e] text-[#0f1115] font-semibold'
                            : 'bg-white/5 text-[#a09e99] hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {enquiries
                      .filter(e => enquiryFilter === 'All' || e.status === enquiryFilter)
                      .map((enq) => (
                        <div key={enq.id} className="p-6 rounded-2xl bg-[#10131a] border border-white/10 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-serif font-bold text-white">
                                  {enq.name}
                                </span>
                                <span className="text-xs font-mono text-[#c8a97e] bg-[#c8a97e]/10 px-2 py-0.5 rounded">
                                  {enq.enquiryId}
                                </span>
                                <span className="text-[10px] font-mono uppercase text-[#8e8c87] bg-white/5 px-2 py-0.5 rounded">
                                  {enq.type}
                                </span>
                              </div>
                              <div className="text-xs font-mono text-[#8e8c87] mt-1">
                                {enq.phone} • {enq.email}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={enq.status}
                                onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                                className="bg-[#14171f] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Resolved">Resolved</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => deleteEnquiry(enq.id)}
                                className="p-1.5 text-[#8e8c87] hover:text-rose-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm text-white font-medium">
                            Subject: {enq.subject}
                          </div>

                          <p className="text-xs sm:text-sm text-[#bbb8b0] font-light leading-relaxed whitespace-pre-line bg-white/[0.02] p-4 rounded-xl border border-white/5">
                            {enq.message}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB: ROOMS CMS */}
              {activeTab === 'rooms' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">
                        Accommodation Categories
                      </h3>
                      <p className="text-xs text-[#a09e99]">
                        Add, edit, or toggle accommodation categories in real time.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingRoom(null);
                        setRoomFormData({
                          name: '',
                          slug: '',
                          description: '',
                          size: '180 sq.ft',
                          bedType: 'Single Bed',
                          guestCapacity: 1,
                          bathrooms: 1,
                          amenities: 'High-speed Wi-Fi, Workstation Table, Wardrobe Storage',
                          features: 'Quiet Study Area, Natural Light Window',
                          coverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
                          availabilityStatus: 'Available',
                          featured: true,
                          published: true,
                          price: ''
                        });
                        setIsAddingRoom(true);
                      }}
                      className="px-4 py-2 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Room Category</span>
                    </button>
                  </div>

                  {/* Room Edit/Add Form Modal */}
                  {(isAddingRoom || editingRoom) && (
                    <div className="p-6 rounded-2xl bg-[#10131a] border border-[#c8a97e]/40 shadow-2xl">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <h4 className="text-base font-serif font-bold text-white">
                          {editingRoom ? `Edit: ${editingRoom.name}` : 'Create New Accommodation Category'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingRoom(false);
                            setEditingRoom(null);
                          }}
                          className="text-[#8e8c87] hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveRoom} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Room Name *</label>
                            <input
                              type="text"
                              required
                              value={roomFormData.name}
                              onChange={(e) => setRoomFormData({ ...roomFormData, name: e.target.value })}
                              className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Availability Status</label>
                            <select
                              value={roomFormData.availabilityStatus}
                              onChange={(e) => setRoomFormData({ ...roomFormData, availabilityStatus: e.target.value as any })}
                              className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                            >
                              <option value="Available">Available</option>
                              <option value="Request Only">Request Only</option>
                              <option value="Under Maintenance">Under Maintenance</option>
                              <option value="Unavailable">Unavailable</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Description *</label>
                          <textarea
                            rows={3}
                            required
                            value={roomFormData.description}
                            onChange={(e) => setRoomFormData({ ...roomFormData, description: e.target.value })}
                            className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Room Size</label>
                            <input
                              type="text"
                              value={roomFormData.size}
                              onChange={(e) => setRoomFormData({ ...roomFormData, size: e.target.value })}
                              className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Bed Setup</label>
                            <input
                              type="text"
                              value={roomFormData.bedType}
                              onChange={(e) => setRoomFormData({ ...roomFormData, bedType: e.target.value })}
                              className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Capacity</label>
                            <input
                              type="number"
                              value={roomFormData.guestCapacity}
                              onChange={(e) => setRoomFormData({ ...roomFormData, guestCapacity: Number(e.target.value) })}
                              className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Bathrooms</label>
                            <input
                              type="number"
                              value={roomFormData.bathrooms}
                              onChange={(e) => setRoomFormData({ ...roomFormData, bathrooms: Number(e.target.value) })}
                              className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">
                            Amenities (comma separated)
                          </label>
                          <input
                            type="text"
                            value={roomFormData.amenities}
                            onChange={(e) => setRoomFormData({ ...roomFormData, amenities: e.target.value })}
                            className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">
                            Cover Image URL
                          </label>
                          <input
                            type="url"
                            value={roomFormData.coverImage}
                            onChange={(e) => setRoomFormData({ ...roomFormData, coverImage: e.target.value })}
                            className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="flex items-center gap-6 pt-2">
                          <label className="flex items-center gap-2 text-xs font-mono text-white cursor-pointer">
                            <input
                              type="checkbox"
                              checked={roomFormData.published}
                              onChange={(e) => setRoomFormData({ ...roomFormData, published: e.target.checked })}
                              className="accent-[#c8a97e]"
                            />
                            <span>Published (Publicly Visible)</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs font-mono text-white cursor-pointer">
                            <input
                              type="checkbox"
                              checked={roomFormData.featured}
                              onChange={(e) => setRoomFormData({ ...roomFormData, featured: e.target.checked })}
                              className="accent-[#c8a97e]"
                            />
                            <span>Featured on Home</span>
                          </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingRoom(false);
                              setEditingRoom(null);
                            }}
                            className="px-4 py-2 text-xs font-mono uppercase text-[#8e8c87] hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg"
                          >
                            Save Room
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Rooms Cards Grid in Admin */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rooms.map((room) => (
                      <div key={room.id} className="p-5 rounded-2xl bg-[#10131a] border border-white/10 flex flex-col justify-between">
                        <div>
                          <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-black/40">
                            <img src={room.coverImage} alt={room.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="text-base font-serif font-bold text-white truncate">
                              {room.name}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                              room.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }`}>
                              {room.published ? 'Published' : 'Draft'}
                            </span>
                          </div>

                          <p className="text-xs text-[#a09e99] line-clamp-2 mb-3">
                            {room.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono">
                          <span className="text-[#c8a97e]">{room.availabilityStatus}</span>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditRoom(room)}
                              className="p-1.5 text-[#8e8c87] hover:text-[#c8a97e]"
                              title="Edit Room"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteRoom(room.id)}
                              className="p-1.5 text-[#8e8c87] hover:text-rose-400"
                              title="Delete Room"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: FACILITIES CMS */}
              {activeTab === 'facilities' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">
                        Residency Facilities
                      </h3>
                      <p className="text-xs text-[#a09e99]">
                        Only activated facilities appear publicly as requested.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddingFacility(true)}
                      className="px-4 py-2 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Facility</span>
                    </button>
                  </div>

                  {isAddingFacility && (
                    <div className="p-5 rounded-2xl bg-[#10131a] border border-[#c8a97e]/40 mb-6">
                      <h4 className="text-sm font-serif font-bold text-white mb-3">Create New Facility</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Facility Name (e.g. Power Backup)"
                          value={facilityFormData.name}
                          onChange={(e) => setFacilityFormData({ ...facilityFormData, name: e.target.value })}
                          className="bg-[#14171f] border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Category (e.g. Utility, Safety)"
                          value={facilityFormData.category}
                          onChange={(e) => setFacilityFormData({ ...facilityFormData, category: e.target.value })}
                          className="bg-[#14171f] border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                        <select
                          value={facilityFormData.icon}
                          onChange={(e) => setFacilityFormData({ ...facilityFormData, icon: e.target.value })}
                          className="bg-[#14171f] border border-white/10 rounded-lg p-2 text-xs text-white"
                        >
                          <option value="Wifi">Wi-Fi</option>
                          <option value="Shirt">Laundry / Shirt</option>
                          <option value="Utensils">Food / Dining</option>
                          <option value="Sparkles">Housekeeping</option>
                          <option value="ShieldCheck">Security</option>
                          <option value="Zap">Power Backup</option>
                          <option value="Layers">General Amenity</option>
                        </select>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description of facility"
                        value={facilityFormData.description}
                        onChange={(e) => setFacilityFormData({ ...facilityFormData, description: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2 text-xs text-white mb-3"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingFacility(false)}
                          className="px-3 py-1.5 text-xs text-[#8e8c87]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (facilityFormData.name) {
                              addFacility({
                                name: facilityFormData.name,
                                description: facilityFormData.description,
                                icon: facilityFormData.icon,
                                category: facilityFormData.category,
                                featured: true,
                                displayOrder: facilities.length + 1,
                                published: true
                              });
                              setIsAddingFacility(false);
                            }
                          }}
                          className="px-4 py-1.5 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs rounded"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {facilities.map((fac) => (
                      <div key={fac.id} className="p-4 rounded-xl bg-[#10131a] border border-white/10 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{fac.name}</span>
                            <span className="text-[10px] font-mono text-[#8e8c87] bg-white/5 px-2 py-0.5 rounded">
                              {fac.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#a09e99] mt-1">{fac.description}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateFacility(fac.id, { published: !fac.published })}
                            className={`px-3 py-1 rounded text-xs font-mono ${
                              fac.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-[#8e8c87]'
                            }`}
                          >
                            {fac.published ? 'Visible' : 'Hidden'}
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteFacility(fac.id)}
                            className="p-1.5 text-[#8e8c87] hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: DINING CMS */}
              {activeTab === 'dining' && (
                <div className="max-w-2xl space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      Dining / Mess Configuration
                    </h3>
                    <p className="text-xs text-[#a09e99]">
                      Public reviews mention food. Admin can edit meal details or toggle visibility.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#10131a] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <span className="text-sm font-semibold text-white block">Dining Module Status</span>
                        <span className="text-xs text-[#8e8c87]">Toggle resident food section on public site</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateDining({ enabled: !dining.enabled })}
                        className={`px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold ${
                          dining.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-[#8e8c87]'
                        }`}
                      >
                        {dining.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Section Title</label>
                      <input
                        type="text"
                        value={dining.name}
                        onChange={(e) => updateDining({ name: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={dining.description}
                        onChange={(e) => updateDining({ description: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Timings</label>
                      <input
                        type="text"
                        value={dining.timings}
                        onChange={(e) => updateDining({ timings: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Cuisine</label>
                      <input
                        type="text"
                        value={dining.cuisine}
                        onChange={(e) => updateDining({ cuisine: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: GALLERY CMS */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">
                        Residency Photo Gallery
                      </h3>
                      <p className="text-xs text-[#a09e99]">
                        Manage public gallery images and categories.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddingGallery(true)}
                      className="px-4 py-2 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  {isAddingGallery && (
                    <div className="p-5 rounded-2xl bg-[#10131a] border border-[#c8a97e]/40 mb-6">
                      <h4 className="text-sm font-serif font-bold text-white mb-3">Add Photo to Gallery</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="url"
                          placeholder="Image URL (Unsplash or direct image link)"
                          value={galleryFormData.image}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, image: e.target.value })}
                          className="bg-[#14171f] border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                        <select
                          value={galleryFormData.category}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value as any })}
                          className="bg-[#14171f] border border-white/10 rounded-lg p-2 text-xs text-white"
                        >
                          <option value="Property">Property</option>
                          <option value="Rooms">Rooms</option>
                          <option value="Facilities">Facilities</option>
                          <option value="Dining">Dining</option>
                          <option value="Common Areas">Common Areas</option>
                          <option value="About">About</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="Caption / Description"
                        value={galleryFormData.caption}
                        onChange={(e) => setGalleryFormData({ ...galleryFormData, caption: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2 text-xs text-white mb-3"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingGallery(false)}
                          className="px-3 py-1.5 text-xs text-[#8e8c87]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (galleryFormData.image) {
                              addGalleryItem({
                                image: galleryFormData.image,
                                category: galleryFormData.category,
                                caption: galleryFormData.caption || 'Residency Space',
                                altText: galleryFormData.caption || 'Galaxy Residency photo',
                                featured: true,
                                displayOrder: gallery.length + 1,
                                published: true
                              });
                              setIsAddingGallery(false);
                            }
                          }}
                          className="px-4 py-1.5 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs rounded"
                        >
                          Save Photo
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((item) => (
                      <div key={item.id} className="group relative rounded-xl overflow-hidden bg-[#10131a] border border-white/10">
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <span className="text-[10px] font-mono text-[#c8a97e] uppercase block">
                            {item.category}
                          </span>
                          <p className="text-xs text-white truncate">{item.caption}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteGalleryItem(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-md bg-black/70 text-rose-400 hover:bg-black transition-colors"
                          title="Delete image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: LOCATION & NEARBY PLACES */}
              {activeTab === 'location' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      Location & Verified Nearby Places
                    </h3>
                    <p className="text-xs text-[#a09e99]">
                      Property coordinates: 28.477821, 77.4878395. Only verified local destinations.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#10131a] border border-white/10 space-y-4">
                    <h4 className="text-sm font-serif font-bold text-white mb-2">Property Address Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Street Address</label>
                        <input
                          type="text"
                          value={property.address}
                          onChange={(e) => updateProperty({ address: e.target.value })}
                          className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">Phone Contact</label>
                        <input
                          type="text"
                          value={property.phone}
                          onChange={(e) => updateProperty({ phone: e.target.value })}
                          className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nearby Places */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-serif font-bold text-white">Nearby Educational Hubs</h4>
                    {nearbyPlaces.map((np) => (
                      <div key={np.id} className="p-4 rounded-xl bg-[#10131a] border border-white/10 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{np.name}</span>
                            <span className="text-xs font-mono text-[#c8a97e]">{np.distance}</span>
                          </div>
                          <div className="text-xs text-[#8e8c87]">{np.description}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateNearbyPlace(np.id, { published: !np.published })}
                            className={`px-2.5 py-1 rounded text-xs font-mono ${
                              np.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-[#8e8c87]'
                            }`}
                          >
                            {np.published ? 'Visible' : 'Hidden'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: POLICIES CMS */}
              {activeTab === 'policies' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      Residency Policies Management
                    </h3>
                    <p className="text-xs text-[#a09e99]">
                      Edit dormitory stay policies and check-in requirements.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {policies.map((pol) => (
                      <div key={pol.id} className="p-5 rounded-2xl bg-[#10131a] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-serif font-bold text-white">{pol.title} ({pol.type})</span>
                          <button
                            type="button"
                            onClick={() => updatePolicy(pol.id, { published: !pol.published })}
                            className={`px-3 py-1 rounded text-xs font-mono ${
                              pol.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-[#8e8c87]'
                            }`}
                          >
                            {pol.published ? 'Active' : 'Disabled'}
                          </button>
                        </div>

                        <textarea
                          rows={3}
                          value={pol.content}
                          onChange={(e) => updatePolicy(pol.id, { content: e.target.value })}
                          className="w-full bg-[#14171f] border border-white/10 rounded-lg p-3 text-xs text-white leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS & 3D CONTROLS */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      Property & 3D Presentation Settings
                    </h3>
                    <p className="text-xs text-[#a09e99]">
                      Control pricing visibility, 3D ambient particle intensity, and hero typography.
                    </p>
                  </div>

                  {/* Pricing Rule Toggle */}
                  <div className="p-6 rounded-2xl bg-[#10131a] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold text-white block">
                          Show Public Room Prices
                        </span>
                        <span className="text-xs text-[#8e8c87]">
                          Mandatory default: FALSE (Request-based stay experience).
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateSettings({ showPublicPrices: !settings.showPublicPrices })}
                        className={`px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold ${
                          settings.showPublicPrices ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-[#8e8c87]'
                        }`}
                      >
                        {settings.showPublicPrices ? 'VISIBLE' : 'FALSE (HIDDEN)'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-sm font-semibold text-white block">
                          Show Google Reviews Widget
                        </span>
                        <span className="text-xs text-[#8e8c87]">
                          Only show if official API / verified rating is configured.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateSettings({ showReviews: !settings.showReviews })}
                        className={`px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold ${
                          settings.showReviews ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-[#8e8c87]'
                        }`}
                      >
                        {settings.showReviews ? 'VISIBLE' : 'FALSE (HIDDEN)'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-sm font-semibold text-white block">
                          3D Ambient Particle Scene
                        </span>
                        <span className="text-xs text-[#8e8c87]">
                          WebGL ambient particle density in Hero.
                        </span>
                      </div>
                      <select
                        value={settings.particleIntensity}
                        onChange={(e) => updateSettings({ particleIntensity: e.target.value as any })}
                        className="bg-[#14171f] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white"
                      >
                        <option value="low">Low (Lightweight)</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="off">Disabled</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-sm font-semibold text-white block">
                          Respect Reduced Motion
                        </span>
                        <span className="text-xs text-[#8e8c87]">
                          Disables parallax and camera shifts.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                        className={`px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold ${
                          settings.reducedMotion ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-[#8e8c87]'
                        }`}
                      >
                        {settings.reducedMotion ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>
                  </div>

                  {/* Hero Copy Settings */}
                  <div className="p-6 rounded-2xl bg-[#10131a] border border-white/10 space-y-4">
                    <h4 className="text-sm font-serif font-bold text-white">Hero Messaging CMS</h4>
                    
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">
                        Hero Primary Headline
                      </label>
                      <input
                        type="text"
                        value={settings.heroTitle}
                        onChange={(e) => updateSettings({ heroTitle: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#bbb8b0] mb-1">
                        Hero Supporting Subtitle
                      </label>
                      <textarea
                        rows={2}
                        value={settings.heroSubtitle}
                        onChange={(e) => updateSettings({ heroSubtitle: e.target.value })}
                        className="w-full bg-[#14171f] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      )}
    </div>
  );
};
