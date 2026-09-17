import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Phone, 
  Menu, 
  X, 
  CalendarCheck 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface HeaderNavProps {
  onRequestBooking: () => void;
  onOpenAdmin?: () => void;
  onOpenEnquiry?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ 
  onRequestBooking 
}) => {
  const { property, settings, dining } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section
      const sections = ['hero', 'stay', 'facilities', 'dining', 'gallery', 'location', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Curated, elegant navigation links to prevent clutter and maintain visual rhythm
  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Stay', href: '#stay', id: 'stay' },
    { label: 'Facilities', href: '#facilities', id: 'facilities' },
    ...(settings.enableDining && dining.enabled ? [{ label: 'Dining', href: '#dining', id: 'dining' }] : []),
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Location', href: '#location', id: 'location' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0f1115]/92 backdrop-blur-lg border-b border-white/10 shadow-2xl py-3' 
            : 'bg-gradient-to-b from-[#0f1115]/90 via-[#0f1115]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-11">
            
            {/* 1. Left: Brand Logo & Identity */}
            <a 
              href="#hero" 
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 min-w-0"
              id="header-brand-logo"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#c8a97e] via-[#bca076] to-[#8c734e] flex items-center justify-center text-[#0f1115] shadow-md shadow-[#c8a97e]/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Building2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm xs:text-base sm:text-lg font-serif tracking-wide font-bold text-[#f5f3ef] uppercase leading-tight group-hover:text-[#c8a97e] transition-colors truncate">
                  {property.name || 'Galaxy Residency'}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider text-[#a09e99] uppercase font-mono leading-none mt-0.5 truncate">
                  {property.category || 'Student Dormitory'} • KP III
                </span>
              </div>
            </a>

            {/* 2. Middle: Desktop Navigation Pill with Balanced Spacing */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#141720]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-inner">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    id={`nav-link-${link.id}`}
                    className={`px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-[#0f1115] bg-[#c8a97e] font-semibold shadow-sm'
                        : 'text-[#bbb8b0] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* 3. Right: Harmonious Action Controls */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* Verified Phone Quick Contact */}
              <a
                href={`tel:${property.phone}`}
                id="header-phone-cta"
                className="h-10 px-3.5 flex items-center gap-2 text-xs font-mono text-[#c8a97e] hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-[#c8a97e]/30 hover:border-[#c8a97e]/60 transition-all shadow-sm"
                title={`Call desk at ${property.phone}`}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="tracking-tight font-medium">{property.phone}</span>
              </a>

              {/* Primary Booking Request CTA */}
              <button
                type="button"
                onClick={onRequestBooking}
                id="header-request-booking-btn"
                className="h-10 px-5 flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0f1115] bg-gradient-to-r from-[#c8a97e] via-[#dbbe96] to-[#c8a97e] hover:brightness-110 active:scale-98 rounded-lg shadow-md shadow-[#c8a97e]/20 transition-all uppercase font-mono whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>REQUEST BOOKING</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button (Touch Friendly >= 44px) */}
            <div className="flex sm:hidden items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onRequestBooking}
                className="h-11 px-3 text-xs font-semibold text-[#0f1115] bg-[#c8a97e] active:bg-[#dbbe96] rounded-lg uppercase font-mono shadow-sm"
              >
                BOOK
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle"
                className="w-11 h-11 flex items-center justify-center text-white bg-white/10 hover:bg-white/15 active:scale-95 rounded-lg transition-all"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Touch-Optimized) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0f1115]/98 backdrop-blur-xl flex flex-col justify-between p-5 sm:p-6 sm:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c8a97e] flex items-center justify-center text-[#0f1115]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-serif text-white font-semibold text-base leading-tight">{property.name}</div>
                <div className="text-[10px] text-[#a09e99] font-mono">{property.category} • Knowledge Park III</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 text-white/80 hover:text-white"
              aria-label="Close Navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-1 py-4 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-wide text-[#ddd9cf] hover:text-[#c8a97e] py-3 px-3 rounded-lg hover:bg-white/5 border-b border-white/5 flex items-center justify-between min-h-[48px] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#77746d]">→</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
            <a
              href={`tel:${property.phone}`}
              className="flex items-center justify-center gap-2 h-12 bg-white/5 border border-[#c8a97e]/30 rounded-xl text-sm text-[#c8a97e] font-mono"
            >
              <Phone className="w-4 h-4" />
              <span>{property.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestBooking();
              }}
              className="w-full h-12 bg-[#c8a97e] hover:bg-[#dbbe96] text-[#0f1115] font-semibold text-sm rounded-xl tracking-wider uppercase font-mono shadow-lg shadow-[#c8a97e]/20 flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>REQUEST BOOKING</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
