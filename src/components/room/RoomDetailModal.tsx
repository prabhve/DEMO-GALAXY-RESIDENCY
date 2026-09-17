import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Bed, 
  Maximize2, 
  Bath, 
  Check, 
  CalendarCheck, 
  Share2, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Room, AppSettings } from '../../types';

interface RoomDetailModalProps {
  room: Room | null;
  settings: AppSettings;
  onClose: () => void;
  onRequestBooking: (roomName: string, roomId: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ 
  room, 
  settings, 
  onClose, 
  onRequestBooking 
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!room) return;
      const images = room.images.length > 0 ? room.images : [room.coverImage];
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [room, onClose]);

  if (!room) return null;

  const images = room.images && room.images.length > 0 ? room.images : [room.coverImage];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#14171f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          id="close-room-modal-btn"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all"
          aria-label="Close Room Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Visual Gallery Showcase */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full bg-black overflow-hidden group">
          <img 
            src={images[activeImageIndex]} 
            alt={`${room.name} gallery item ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#14171f] via-transparent to-black/30 pointer-events-none" />

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-all opacity-80 hover:opacity-100"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-all opacity-80 hover:opacity-100"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicator dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeImageIndex === i ? 'w-6 bg-[#c8a97e]' : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Jump to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Availability Status Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-[#c8a97e] text-[#0f1115] font-semibold">
              {room.availabilityStatus}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c8a97e] block mb-1">
                ACCOMMODATION SPECIFICATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {room.name}
              </h2>
            </div>

            {/* Price display ONLY if explicitly enabled in Settings */}
            {settings.showPublicPrices && room.price && (
              <div className="text-right">
                <span className="text-xs text-[#a09e99] block">Configured Rate</span>
                <span className="text-xl font-serif font-semibold text-[#c8a97e]">
                  {room.price}
                </span>
              </div>
            )}
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {room.size && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Maximize2 className="w-5 h-5 text-[#c8a97e]" />
                <div>
                  <div className="text-[10px] text-[#a09e99] uppercase font-mono">Room Size</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{room.size}</div>
                </div>
              </div>
            )}

            {room.bedType && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Bed className="w-5 h-5 text-[#c8a97e]" />
                <div>
                  <div className="text-[10px] text-[#a09e99] uppercase font-mono">Bed Setup</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{room.bedType}</div>
                </div>
              </div>
            )}

            {room.guestCapacity && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Users className="w-5 h-5 text-[#c8a97e]" />
                <div>
                  <div className="text-[10px] text-[#a09e99] uppercase font-mono">Capacity</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {room.guestCapacity} {room.guestCapacity === 1 ? 'Guest' : 'Guests'}
                  </div>
                </div>
              </div>
            )}

            {room.bathrooms && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Bath className="w-5 h-5 text-[#c8a97e]" />
                <div>
                  <div className="text-[10px] text-[#a09e99] uppercase font-mono">Washroom</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {room.bathrooms} Attached
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-2">Description</h3>
            <p className="text-sm sm:text-base text-[#bbb8b0] leading-relaxed font-light">
              {room.description}
            </p>
          </div>

          {/* Amenities & Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {room.amenities && room.amenities.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#c8a97e] mb-3">
                  ROOM AMENITIES
                </h3>
                <ul className="space-y-2">
                  {room.amenities.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#e0ded8]">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {room.features && room.features.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#c8a97e] mb-3">
                  SPECIAL FEATURES
                </h3>
                <ul className="space-y-2">
                  {room.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#e0ded8]">
                      <Sparkles className="w-4 h-4 text-[#c8a97e] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="text-xs text-[#8e8c87] font-mono">
              * Request-based reservation. Our management team confirms availability upon receipt.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs text-[#bbb8b0] hover:text-white rounded-lg border border-white/10 transition-colors font-mono"
              >
                BACK
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestBooking(room.name, room.id);
                }}
                id="modal-request-booking-btn"
                className="w-full sm:w-auto px-7 py-2.5 text-xs font-semibold tracking-wider text-[#0f1115] bg-gradient-to-r from-[#c8a97e] to-[#dfc7a5] hover:brightness-110 active:scale-95 rounded-lg shadow-lg shadow-[#c8a97e]/20 transition-all uppercase font-mono flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>REQUEST THIS ROOM</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
