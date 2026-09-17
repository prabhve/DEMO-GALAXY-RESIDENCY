import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Compass, 
  CalendarCheck, 
  Sliders, 
  ExternalLink 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface FooterProps {
  onRequestBooking: () => void;
  onOpenEnquiry: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onRequestBooking, 
  onOpenEnquiry,
  onOpenAdmin 
}) => {
  const { property, dining, settings } = useCMS();

  return (
    <footer className="bg-[#0a0c0f] text-[#bbb8b0] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand & Identity (Cols 1-2) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#c8a97e] flex items-center justify-center text-[#0f1115]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-serif font-bold text-white tracking-wider uppercase block">
                  {property.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#a09e99] uppercase">
                  {property.category} • Greater Noida
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9d9a93] font-light leading-relaxed max-w-sm mb-6">
              A dedicated residential stay on APJ Abdul Kalam Road, Knowledge Park III, Greater Noida. Accessible living for students, visitors, and professionals.
            </p>

            <div className="flex flex-col gap-2 text-xs font-mono text-[#a09e99]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>{property.address}, Greater Noida 201310</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>28.477821° N, 77.4878395° E</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#9d9a93]">
              <li>
                <a href="#hero" className="hover:text-[#c8a97e] transition-colors">Home</a>
              </li>
              <li>
                <a href="#stay" className="hover:text-[#c8a97e] transition-colors">Accommodation</a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-[#c8a97e] transition-colors">Highlights</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#c8a97e] transition-colors">Facilities</a>
              </li>
              {settings.enableDining && dining.enabled && (
                <li>
                  <a href="#dining" className="hover:text-[#c8a97e] transition-colors">Dining & Mess</a>
                </li>
              )}
              <li>
                <a href="#gallery" className="hover:text-[#c8a97e] transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#c8a97e] transition-colors">Location & Map</a>
              </li>
            </ul>
          </div>

          {/* Policies & Verification */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">
              Policies & Stay
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#9d9a93]">
              <li>
                <a href="#policies" className="hover:text-[#c8a97e] transition-colors">Stay Guidelines</a>
              </li>
              <li>
                <a href="#policies" className="hover:text-[#c8a97e] transition-colors">Check-in Verification</a>
              </li>
              <li>
                <a href="#policies" className="hover:text-[#c8a97e] transition-colors">Guest Policy</a>
              </li>
              <li>
                <a href="#policies" className="hover:text-[#c8a97e] transition-colors">Privacy Policy</a>
              </li>
              <li className="pt-2">
                <a 
                  href={property.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#c8a97e] transition-colors inline-flex items-center gap-1 text-[#c8a97e]"
                >
                  <span>Google Maps Pin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Actions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">
              Front Desk
            </h4>
            
            <div className="space-y-3">
              <a 
                href={`tel:${property.phone}`}
                className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="text-[10px] text-[#8e8c87] font-mono uppercase">Direct Telephone</div>
                <div className="text-xs font-mono font-semibold text-white mt-0.5">{property.phone}</div>
              </a>

              <button
                type="button"
                onClick={onRequestBooking}
                className="w-full min-h-[44px] py-2.5 bg-[#c8a97e] hover:bg-[#dbbe96] text-[#0f1115] font-semibold text-xs rounded-lg font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>BOOK YOUR STAY</span>
              </button>

              <button
                type="button"
                onClick={onOpenEnquiry}
                className="w-full min-h-[44px] py-2 text-xs text-[#a09e99] hover:text-white rounded-lg border border-white/10 transition-colors font-mono flex items-center justify-center"
              >
                Send Enquiry
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright and admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#787671]">
          <div>
            © {new Date().getFullYear()} Galaxy Residency. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Knowledge Park III, Greater Noida</span>
            
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hover:text-[#c8a97e] transition-colors flex items-center gap-1.5"
              title="Admin CMS Management"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
