import React from 'react';
import { 
  Wifi, 
  Shirt, 
  Utensils, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

// Map icon string to Lucide component
const getFacilityIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'wifi':
      return <Wifi className="w-5 h-5" />;
    case 'shirt':
    case 'laundry':
      return <Shirt className="w-5 h-5" />;
    case 'utensils':
    case 'food':
    case 'dining':
      return <Utensils className="w-5 h-5" />;
    case 'sparkles':
    case 'housekeeping':
      return <Sparkles className="w-5 h-5" />;
    case 'shieldcheck':
    case 'security':
      return <ShieldCheck className="w-5 h-5" />;
    case 'zap':
    case 'power':
      return <Zap className="w-5 h-5" />;
    default:
      return <Layers className="w-5 h-5" />;
  }
};

export const HighlightsSection: React.FC = () => {
  const { facilities } = useCMS();

  // Only show published / activated facilities as required by prompt
  const publishedFacilities = facilities.filter(f => f.published);

  if (publishedFacilities.length === 0) {
    return null;
  }

  return (
    <section 
      id="highlights" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1115] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>ACTIVATED CMS HIGHLIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Key Residency Highlights
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a09e99] leading-relaxed">
            Essential services and verified conveniences configured for residents at Galaxy Residency.
          </p>
        </div>

        {/* 3D Floating Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedFacilities.map((fac, idx) => (
            <div
              key={fac.id}
              className="group relative p-6 sm:p-8 rounded-2xl bg-[#14171f] border border-white/5 hover:border-[#c8a97e]/40 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Top Row: Icon & Category */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center group-hover:bg-[#c8a97e] group-hover:text-[#0f1115] transition-colors duration-300 shadow-inner">
                    {getFacilityIcon(fac.icon)}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#8e8c87] bg-white/5 px-2.5 py-1 rounded-md">
                    {fac.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-serif font-semibold text-white group-hover:text-[#c8a97e] transition-colors mb-2">
                  {fac.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#bbb8b0] leading-relaxed font-light">
                  {fac.description}
                </p>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#787671] font-mono">
                <span>Verified Amenity</span>
                <span className="text-[#c8a97e]">#{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
