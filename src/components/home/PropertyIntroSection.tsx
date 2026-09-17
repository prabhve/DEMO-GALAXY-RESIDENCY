import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  BookOpen, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const PropertyIntroSection: React.FC = () => {
  const { property } = useCMS();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  return (
    <section 
      id="intro" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1115] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#c8a97e]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: 3D Layered Architectural Visual Presentation */}
          <div 
            className="lg:col-span-6 relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div 
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-300 ease-out transform-style-3d bg-[#161920]"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
              }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=80" 
                  alt="Modern study and living environment" 
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-black/20" />

              {/* Floating 3D Badge on image */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3.5 py-2 bg-black/70 backdrop-blur-md rounded-lg border border-white/15 text-xs text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#c8a97e]" />
                <span className="font-mono">Knowledge Park III Residency</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 text-[#c8a97e] text-xs font-mono mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>A2, APJ ABDUL KALAM ROAD</span>
                </div>
                <p className="text-xs sm:text-sm text-[#e0ded8]">
                  Direct road accessibility within the educational and institutional district of Greater Noida.
                </p>
              </div>
            </div>

            {/* Accent floating card in foreground */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 p-4 bg-[#1a1e27]/95 border border-[#c8a97e]/30 rounded-xl shadow-2xl backdrop-blur-md flex-col gap-1 z-20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#a09e99]">
                Public Classification
              </span>
              <span className="text-sm font-serif font-semibold text-white">
                {property.category}
              </span>
              <span className="text-[11px] text-[#c8a97e]">
                Greater Noida 201310
              </span>
            </div>
          </div>

          {/* Right: Factual Storytelling & Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROPERTY OVERVIEW</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {property.name}
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#bbb8b0] font-light leading-relaxed">
              <p className="text-[#f5f3ef] font-normal border-l-2 border-[#c8a97e] pl-4">
                "Galaxy Residency is located on APJ Abdul Kalam Road in Knowledge Park III, Greater Noida."
              </p>
              
              <p>
                {property.description || 'An accessible location for guests staying in the Knowledge Park III area, offering structured living spaces and essential conveniences for academic and professional routines.'}
              </p>
            </div>

            {/* Highlighted pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c8a97e]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Knowledge Park III</h3>
                <p className="text-xs text-[#9d9a93] leading-relaxed">
                  Positioned amidst colleges, research institutes, and educational universities.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c8a97e]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#c8a97e]/10 text-[#c8a97e] flex items-center justify-center mb-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Study & Living Focus</h3>
                <p className="text-xs text-[#9d9a93] leading-relaxed">
                  Dedicated desk environments, high-speed Wi-Fi, and peaceful residency atmosphere.
                </p>
              </div>
            </div>

            {/* Location CTA */}
            <div className="mt-8 flex items-center gap-4">
              <a 
                href="#location"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c8a97e] hover:text-white transition-colors"
              >
                <span>VIEW INTERACTIVE MAP & DIRECTIONS</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
