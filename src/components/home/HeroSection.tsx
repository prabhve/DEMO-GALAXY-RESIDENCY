import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  ChevronDown, 
  CalendarCheck, 
  ArrowRight, 
  Star,
  CheckCircle2,
  Building2,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface HeroSectionProps {
  onRequestBooking: () => void;
  onOpenEnquiry?: () => void;
  onExploreStay?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onRequestBooking,
  onOpenEnquiry,
  onExploreStay
}) => {
  const { property, settings } = useCMS();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (settings.reducedMotion || !settings.camera3DMovement) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 15, y: y * 15 });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f1115]"
    >
      {/* 1. Best-in-Class Cinematic Architectural Residency Photography Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85" 
          alt="Galaxy Residency Modern Exterior Facade"
          className="w-full h-full object-cover object-center scale-105 brightness-[0.40] contrast-[1.12] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Multilayered cinematic dark vignette for maximum typographic readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115]/90 via-[#0f1115]/60 to-[#0f1115]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-[#0f1115]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0f1115]/40 to-[#0f1115]/95" />
        
        {/* Warm golden architectural ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#c8a97e]/12 blur-[150px] rounded-full pointer-events-none" />
      </div>

      {/* Main Hero Container with Depth Layering */}
      <div className="relative z-20 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Verified Badge / Classification */}
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#c8a97e]/30 backdrop-blur-md mb-6 transition-transform duration-500"
          style={{
            transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0)`
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-[#c8a97e] uppercase">
            {property.category} • Knowledge Park III, Greater Noida
          </span>
        </div>

        {/* Brand Name */}
        <h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#f5f3ef] tracking-tight leading-[1.08] max-w-5xl transition-transform duration-500"
          style={{
            transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`
          }}
        >
          {property.name}
        </h1>

        {/* Primary Headline */}
        <p 
          className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-serif italic text-[#c8a97e] max-w-3xl transition-transform duration-500 font-normal"
          style={{
            transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)`
          }}
        >
          "{settings.heroTitle || 'Your Stay in Knowledge Park III, Greater Noida'}"
        </p>

        {/* Supporting Description (CMS controlled) */}
        <p 
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#bbb8b0] max-w-2xl font-light leading-relaxed transition-transform duration-500"
          style={{
            transform: `translate3d(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px, 0)`
          }}
        >
          {settings.heroSubtitle || 'A convenient stay destination on APJ Abdul Kalam Road in Knowledge Park III, Greater Noida.'}
        </p>

        {/* Verified Coordinates & Contact Badges */}
        <div 
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#9d9a93] font-mono transition-transform duration-500"
          style={{
            transform: `translate3d(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px, 0)`
          }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-md border border-white/5">
            <MapPin className="w-3.5 h-3.5 text-[#c8a97e]" />
            A2, APJ Abdul Kalam Road
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-md border border-white/5">
            <Compass className="w-3.5 h-3.5 text-[#c8a97e]" />
            {property.latitude.toFixed(6)}° N, {property.longitude.toFixed(6)}° E
          </span>
          <a 
            href={`tel:${property.phone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-white rounded-md border border-white/10 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c8a97e]" />
            {property.phone}
          </a>

          {/* Conditional Google Reviews badge: ONLY if configured */}
          {settings.showReviews && settings.googleRating && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-300 rounded-md border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{settings.googleRating} ({settings.googleReviewCount} reviews)</span>
            </span>
          )}
        </div>

        {/* Primary Interactive CTAs */}
        <div 
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto transition-transform duration-500"
          style={{
            transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)`
          }}
        >
          <button
            type="button"
            onClick={onRequestBooking}
            id="hero-request-booking-btn"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold tracking-wider text-[#0f1115] bg-gradient-to-r from-[#c8a97e] via-[#dbbe96] to-[#c8a97e] hover:brightness-110 active:scale-98 rounded-lg shadow-xl shadow-[#c8a97e]/25 transition-all flex items-center justify-center gap-2 uppercase font-mono"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>REQUEST BOOKING</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('stay')}
            id="hero-explore-stay-btn"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-medium tracking-wider text-white bg-white/5 hover:bg-white/10 active:scale-98 border border-white/15 rounded-lg backdrop-blur-md transition-all flex items-center justify-center gap-2 uppercase font-mono group"
          >
            <span>EXPLORE STAY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onOpenEnquiry}
            id="hero-enquiry-btn"
            className="w-full sm:w-auto px-5 py-3.5 text-sm font-medium text-[#c8a97e] hover:text-white bg-transparent hover:bg-white/5 rounded-lg transition-colors font-mono"
          >
            SEND ENQUIRY
          </button>
        </div>

        {/* 3D Property Perspective Floating Showcase Card */}
        <div 
          className="mt-14 w-full max-w-4xl relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group perspective-1000"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -0.5}deg) rotateY(${mousePos.x * 0.5}deg)`
          }}
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img 
              src={settings.heroImage || property.coverImage} 
              alt="Galaxy Residency Exterior & Living Experience" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-90"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="text-left">
                <span className="text-[11px] font-mono tracking-widest text-[#c8a97e] uppercase block">
                  VERIFIED PROPERTY LOCATION
                </span>
                <span className="text-base sm:text-xl font-serif text-white font-medium">
                  Galaxy Residency, Knowledge Park III
                </span>
              </div>

              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs text-[#ddd9cf]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Public Listing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <button
          type="button"
          onClick={() => scrollToSection('intro')}
          className="mt-12 flex flex-col items-center gap-1.5 text-xs text-[#8e8c87] hover:text-[#c8a97e] transition-colors group cursor-pointer focus:outline-none"
          aria-label="Scroll to introduction"
        >
          <span className="tracking-widest font-mono text-[10px] uppercase">DISCOVER RESIDENCY</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#c8a97e]" />
        </button>

      </div>
    </section>
  );
};
