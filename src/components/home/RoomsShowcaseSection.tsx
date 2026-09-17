import React, { useState } from 'react';
import { 
  Bed, 
  Users, 
  Maximize2, 
  ArrowRight, 
  CalendarCheck, 
  Info,
  Building,
  CheckCircle2
} from 'lucide-react';
import { Room } from '../../types';
import { useCMS } from '../../context/CMSContext';

interface RoomsShowcaseSectionProps {
  onSelectRoom: (room: Room) => void;
  onRequestBooking: (roomName: string, roomId: string) => void;
}

export const RoomsShowcaseSection: React.FC<RoomsShowcaseSectionProps> = ({ 
  onSelectRoom, 
  onRequestBooking 
}) => {
  const { rooms, settings } = useCMS();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const publishedRooms = rooms.filter(r => r.published);

  return (
    <section 
      id="stay" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1115] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>ACCOMMODATION & RESIDENCY SPACES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Comfortable Spaces for Your Stay
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a09e99] max-w-2xl font-light">
              Explore the available accommodation options at Galaxy Residency. Dedicated study environments configured for student and resident comfort.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8e8c87] font-mono bg-white/5 px-4 py-2 rounded-lg border border-white/5 self-start md:self-end">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Request-Based Verification</span>
          </div>
        </div>

        {/* Empty State */}
        {publishedRooms.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#14171f] border border-white/5">
            <Info className="w-8 h-8 text-[#c8a97e] mx-auto mb-3" />
            <h3 className="text-lg font-serif text-white mb-1">Accommodation details are being updated.</h3>
            <p className="text-xs text-[#a09e99]">Please check back shortly or send an enquiry to front office.</p>
          </div>
        ) : (
          /* 3D Accommodation Showcase Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
            {publishedRooms.map((room) => {
              const isHovered = hoveredCard === room.id;

              return (
                <div
                  key={room.id}
                  onMouseEnter={() => setHoveredCard(room.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative rounded-2xl bg-[#14171f] border border-white/10 hover:border-[#c8a97e]/50 overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between"
                  style={{
                    transform: isHovered && !settings.reducedMotion 
                      ? 'translateY(-8px) rotateX(2deg) scale(1.01)' 
                      : 'none'
                  }}
                >
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                    <img
                      src={room.coverImage || (room.images && room.images[0])}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14171f] via-transparent to-black/20" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#c8a97e] border border-[#c8a97e]/30 font-medium">
                        {room.availabilityStatus}
                      </span>
                    </div>

                    {/* Price Tag (ONLY if SHOW_PUBLIC_PRICES is explicitly enabled in Settings) */}
                    {settings.showPublicPrices && room.price && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-xs font-serif text-[#c8a97e] border border-white/10">
                        {room.price}
                      </div>
                    )}
                  </div>

                  {/* Room Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#c8a97e] transition-colors mb-2">
                        {room.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#a09e99] leading-relaxed font-light line-clamp-2 mb-5">
                        {room.description}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-5 text-[11px] text-[#bbb8b0] font-mono">
                        {room.size && (
                          <div className="flex items-center gap-1.5" title="Room Size">
                            <Maximize2 className="w-3.5 h-3.5 text-[#c8a97e]" />
                            <span className="truncate">{room.size}</span>
                          </div>
                        )}
                        {room.bedType && (
                          <div className="flex items-center gap-1.5" title="Bed Setup">
                            <Bed className="w-3.5 h-3.5 text-[#c8a97e]" />
                            <span className="truncate">{room.bedType}</span>
                          </div>
                        )}
                        {room.guestCapacity && (
                          <div className="flex items-center gap-1.5" title="Guest Capacity">
                            <Users className="w-3.5 h-3.5 text-[#c8a97e]" />
                            <span>{room.guestCapacity} Max</span>
                          </div>
                        )}
                      </div>

                      {/* Top Amenities chips */}
                      {room.amenities && room.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {room.amenities.slice(0, 3).map((amenity, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 rounded-md text-[10px] font-mono text-[#8e8c87] bg-white/5 border border-white/5"
                            >
                              {amenity}
                            </span>
                          ))}
                          {room.amenities.length > 3 && (
                            <span className="px-2 py-1 rounded-md text-[10px] font-mono text-[#c8a97e] bg-[#c8a97e]/10">
                              +{room.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => onSelectRoom(room)}
                        className="min-h-[44px] py-2.5 px-2 sm:px-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <span>DETAILS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onRequestBooking(room.name, room.id)}
                        className="min-h-[44px] py-2.5 px-2 sm:px-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold text-[#0f1115] bg-[#c8a97e] hover:bg-[#dbbe96] active:scale-95 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#c8a97e]/15 whitespace-nowrap"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>BOOK STAY</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
