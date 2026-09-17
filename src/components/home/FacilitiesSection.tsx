import React from 'react';
import { 
  Wifi, 
  Shirt, 
  Utensils, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Coffee,
  Car,
  Wind
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const getFacilityIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'wifi':
      return <Wifi className="w-6 h-6" />;
    case 'shirt':
    case 'laundry':
      return <Shirt className="w-6 h-6" />;
    case 'utensils':
    case 'food':
    case 'dining':
      return <Utensils className="w-6 h-6" />;
    case 'sparkles':
    case 'housekeeping':
      return <Sparkles className="w-6 h-6" />;
    case 'shieldcheck':
    case 'security':
      return <ShieldCheck className="w-6 h-6" />;
    case 'zap':
    case 'power':
      return <Zap className="w-6 h-6" />;
    case 'car':
    case 'parking':
      return <Car className="w-6 h-6" />;
    case 'air conditioning':
    case 'ac':
      return <Wind className="w-6 h-6" />;
    default:
      return <Layers className="w-6 h-6" />;
  }
};

export const FacilitiesSection: React.FC = () => {
  const { facilities } = useCMS();

  const publishedFacilities = facilities.filter(f => f.published);

  if (publishedFacilities.length === 0) {
    return null;
  }

  return (
    <section 
      id="facilities" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0d0f13] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>CAMPUS & RESIDENCY LIVING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Residency Amenities & Facilities
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a09e99] leading-relaxed font-light">
            Designed to support focused student productivity, uninterrupted routine, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedFacilities.map((fac) => (
            <div 
              key={fac.id}
              className="group relative rounded-2xl bg-[#14171f] border border-white/5 hover:border-[#c8a97e]/40 overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {fac.image && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-black/40">
                  <img 
                    src={fac.image} 
                    alt={fac.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14171f] via-[#14171f]/40 to-transparent" />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center shrink-0 border border-[#c8a97e]/20 group-hover:bg-[#c8a97e] group-hover:text-[#0f1115] transition-colors">
                    {getFacilityIcon(fac.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e8c87] block">
                      {fac.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-[#c8a97e] transition-colors">
                      {fac.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#bbb8b0] leading-relaxed font-light">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
