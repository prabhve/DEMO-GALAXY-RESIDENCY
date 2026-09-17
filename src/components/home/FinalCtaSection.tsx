import React from 'react';
import { 
  CalendarCheck, 
  Phone, 
  Navigation, 
  Sparkles, 
  Building2 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface FinalCtaSectionProps {
  onRequestBooking: () => void;
  onOpenEnquiry: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ 
  onRequestBooking, 
  onOpenEnquiry 
}) => {
  const { property } = useCMS();

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#0a0c0f] text-center overflow-hidden border-t border-white/10">
      
      {/* Soft warm glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c8a97e]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        <div className="w-12 h-12 rounded-2xl bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center mb-6 border border-[#c8a97e]/30 shadow-lg">
          <Building2 className="w-6 h-6" />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
          Your Stay Starts Here.
        </h2>

        <p className="mt-4 text-base sm:text-xl font-serif italic text-[#c8a97e] font-normal">
          Galaxy Residency — Knowledge Park III, Greater Noida.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-[#a09e99] max-w-xl font-light font-mono">
          A2, APJ Abdul Kalam Road • Dedicated Study & Residency Space
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onRequestBooking}
            id="final-request-booking-btn"
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold font-mono tracking-wider uppercase text-[#0f1115] bg-[#c8a97e] hover:bg-[#dbbe96] active:scale-95 rounded-lg shadow-xl shadow-[#c8a97e]/20 transition-all flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>REQUEST BOOKING</span>
          </button>

          <button
            type="button"
            onClick={onOpenEnquiry}
            id="final-contact-btn"
            className="w-full sm:w-auto px-7 py-3.5 text-xs font-mono tracking-wider uppercase text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/15 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#c8a97e]" />
            <span>CONTACT US</span>
          </button>

          <a
            href={property.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="final-directions-btn"
            className="w-full sm:w-auto px-7 py-3.5 text-xs font-mono tracking-wider uppercase text-[#c8a97e] hover:text-white bg-transparent hover:bg-white/5 rounded-lg border border-[#c8a97e]/30 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>GET DIRECTIONS</span>
          </a>
        </div>

        <div className="mt-16 text-[11px] font-mono tracking-widest text-[#787671] uppercase">
          GALAXY RESIDENCY
        </div>

      </div>
    </section>
  );
};
