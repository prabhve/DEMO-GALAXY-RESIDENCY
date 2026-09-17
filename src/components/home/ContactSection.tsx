import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Navigation, 
  MessageSquare, 
  Send,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface ContactSectionProps {
  onOpenEnquiry: () => void;
  onRequestBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  onOpenEnquiry, 
  onRequestBooking 
}) => {
  const { property, settings } = useCMS();

  return (
    <section 
      id="contact" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0d0f13] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COMMUNICATION & INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Connect With Galaxy Residency
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a09e99] font-light leading-relaxed">
            Reach our administrative front desk directly for admissions, room inquiries, stay scheduling, and residency queries.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Telephone Desk */}
          <div className="p-8 rounded-2xl bg-[#14171f] border border-white/10 hover:border-[#c8a97e]/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8e8c87] block mb-1">
                Direct Contact Line
              </span>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Telephone
              </h3>
              <p className="text-xs text-[#a09e99] mb-4">
                Available during operational reception hours for immediate assistance.
              </p>
              <div className="text-lg font-mono text-[#c8a97e] tracking-tight">
                {property.phone}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <a
                href={`tel:${property.phone}`}
                id="contact-call-btn"
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>CALL NOW</span>
              </a>
            </div>
          </div>

          {/* Card 2: Property Location & Directions */}
          <div className="p-8 rounded-2xl bg-[#14171f] border border-white/10 hover:border-[#c8a97e]/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8e8c87] block mb-1">
                Residency Address
              </span>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Location
              </h3>
              <p className="text-xs sm:text-sm text-[#e0ded8] leading-relaxed mb-4">
                {property.address},<br />
                {property.city}, {property.state} {property.pincode}, {property.country}
              </p>
              <div className="text-[11px] font-mono text-[#8e8c87]">
                Landmark: Near KP-III Academic Hub
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <a
                href={property.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-directions-btn"
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>

          {/* Card 3: Online Enquiry & WhatsApp */}
          <div className="p-8 rounded-2xl bg-[#14171f] border border-white/10 hover:border-[#c8a97e]/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center mb-6">
                <Send className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8e8c87] block mb-1">
                Written Inquiries
              </span>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Send Enquiry
              </h3>
              <p className="text-xs text-[#a09e99] mb-4">
                Submit an inquiry form with your questions about stay duration, rooms, or mess arrangements.
              </p>
              {property.email && (
                <div className="text-xs font-mono text-[#bbb8b0] truncate">
                  {property.email}
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onOpenEnquiry}
                id="contact-send-enquiry-btn"
                className="w-full py-3 bg-[#c8a97e] hover:bg-[#dbbe96] text-[#0f1115] font-semibold rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#c8a97e]/15"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND ENQUIRY</span>
              </button>

              {/* Show WhatsApp ONLY if configured */}
              {property.whatsapp && (
                <a
                  href={`https://wa.me/${property.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/20 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>WHATSAPP CHAT</span>
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
