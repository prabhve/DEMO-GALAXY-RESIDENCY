import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  GraduationCap, 
  Train, 
  ShoppingBag, 
  Clock, 
  Compass,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const LocationSection: React.FC = () => {
  const { property, nearbyPlaces, settings } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const publishedPlaces = nearbyPlaces.filter(p => p.published);

  const categories = ['All', 'Education', 'Transport', 'Shopping'];

  const filteredPlaces = selectedCategory === 'All'
    ? publishedPlaces
    : publishedPlaces.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-[#c8a97e]" />;
      case 'transport':
        return <Train className="w-4 h-4 text-sky-400" />;
      case 'shopping':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      default:
        return <MapPin className="w-4 h-4 text-[#c8a97e]" />;
    }
  };

  return (
    <section 
      id="location" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1115] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>GEOGRAPHIC COORDINATES & ACCESSIBILITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Knowledge Park III Location
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a09e99] max-w-2xl font-light">
              Situated on APJ Abdul Kalam Road, minutes away from major universities, colleges, and the Aqua Line metro network in Greater Noida.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={property.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="location-directions-btn"
              className="px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold text-[#0f1115] bg-[#c8a97e] hover:bg-[#dbbe96] active:scale-95 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#c8a97e]/20"
            >
              <Navigation className="w-4 h-4" />
              <span>GET DIRECTIONS</span>
            </a>

            <a
              href={property.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="location-maps-link"
              className="px-5 py-3 text-xs font-mono uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-[#c8a97e]" />
              <span>VIEW ON GOOGLE MAPS</span>
            </a>
          </div>
        </div>

        {/* Two Columns: Map Canvas Embed & Verified Nearby Places */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Google Map View with Custom Frame */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-[#14171f] shadow-2xl">
            <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-white font-mono">
                <MapPin className="w-4 h-4 text-[#c8a97e]" />
                <span>{property.address}, {property.city} {property.pincode}</span>
              </div>
              <div className="text-[#a09e99] font-mono">
                LAT: {property.latitude.toFixed(6)} | LNG: {property.longitude.toFixed(6)}
              </div>
            </div>

            {/* Google Map iframe */}
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full relative bg-neutral-900">
              <iframe
                title="Galaxy Residency Location Map"
                src={settings.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Landmark Badge */}
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-[#c8a97e]/40 shadow-xl pointer-events-none">
                <div className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#c8a97e] animate-ping" />
                  <span>Galaxy Residency</span>
                </div>
                <div className="text-[10px] font-mono text-[#a09e99]">
                  A2, APJ Abdul Kalam Road, KP-III
                </div>
              </div>
            </div>
          </div>

          {/* Right: Verified Nearby Places */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="p-5 rounded-2xl bg-[#14171f] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-serif font-bold text-white">
                  Nearby Academic Hubs & Transit
                </h3>
                <span className="text-[11px] font-mono text-[#c8a97e]">
                  Verified Proximity
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#c8a97e] text-[#0f1115] font-semibold'
                        : 'bg-white/5 text-[#8e8c87] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* List of Places */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {filteredPlaces.map((place) => (
                  <div 
                    key={place.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        {getCategoryIcon(place.category)}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white group-hover:text-[#c8a97e] transition-colors">
                          {place.name}
                        </div>
                        <div className="text-[11px] text-[#8e8c87] font-light leading-tight mt-0.5">
                          {place.description}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-semibold text-[#c8a97e]">
                        {place.distance}
                      </div>
                      {place.travelTime && (
                        <div className="text-[10px] text-[#787671] font-mono flex items-center justify-end gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{place.travelTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#787671] font-mono">
                <span>Distances verified via local road navigation</span>
                <span className="text-[#c8a97e]">KP-III Hub</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
