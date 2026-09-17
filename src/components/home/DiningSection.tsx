import React from 'react';
import { 
  Utensils, 
  Clock, 
  Check, 
  CalendarCheck, 
  MessageSquareQuote,
  ChefHat
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface DiningSectionProps {
  onOpenEnquiry: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onOpenEnquiry }) => {
  const { dining, settings } = useCMS();

  // Hide if not enabled or not published
  if (!settings.enableDining || !dining.enabled || !dining.published) {
    return null;
  }

  return (
    <section 
      id="dining" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1115] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Food & Dining details */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
              <Utensils className="w-3.5 h-3.5" />
              <span>RESIDENT DINING & MESS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {dining.name || 'Resident Dining Facility'}
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#bbb8b0] font-light leading-relaxed">
              {dining.description}
            </p>

            {/* Timings Card */}
            {dining.timings && (
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#c8a97e] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white mb-1">
                    Meal Schedule & Timings
                  </div>
                  <div className="text-xs sm:text-sm text-[#bbb8b0] leading-relaxed">
                    {dining.timings}
                  </div>
                </div>
              </div>
            )}

            {/* Cuisine */}
            {dining.cuisine && (
              <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
                <ChefHat className="w-5 h-5 text-[#c8a97e] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white mb-1">
                    Cuisine & Preparation
                  </div>
                  <div className="text-xs sm:text-sm text-[#bbb8b0]">
                    {dining.cuisine}
                  </div>
                </div>
              </div>
            )}

            {/* Menu highlights */}
            {dining.menuHighlights && dining.menuHighlights.length > 0 && (
              <div className="mt-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#c8a97e] mb-3">
                  DIETARY & PREPARATION HIGHLIGHTS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dining.menuHighlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#e0ded8]">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
              >
                ENQUIRE ABOUT MEAL PLANS
              </button>
            </div>
          </div>

          {/* Right: Layered Food Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#161920]">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={dining.images[0] || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'} 
                  alt="Resident Dining Mess Hall" 
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-black/20 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs text-[#ddd9cf]">
                <div className="text-[#c8a97e] font-mono mb-1">HYGIENIC DINING SERVICES</div>
                <div>Wholesome home-style meals prepared daily in on-premise kitchen.</div>
              </div>
            </div>

            {dining.images[1] && (
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-36 rounded-xl overflow-hidden border-2 border-[#c8a97e]/40 shadow-2xl">
                <img 
                  src={dining.images[1]} 
                  alt="Dining details" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
