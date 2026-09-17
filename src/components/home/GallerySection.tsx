import React, { useState, useMemo } from 'react';
import { 
  Images, 
  Maximize2, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { GalleryLightbox } from '../gallery/GalleryLightbox';

export const GallerySection: React.FC = () => {
  const { gallery } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const publishedItems = useMemo(() => {
    return gallery.filter(item => item.published);
  }, [gallery]);

  // Extract categories dynamically that actually have published items
  const availableCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    categoriesSet.add('All');

    publishedItems.forEach(item => {
      if (item.category) categoriesSet.add(item.category);
    });

    return Array.from(categoriesSet);
  }, [publishedItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return publishedItems;
    return publishedItems.filter(item => item.category === selectedCategory);
  }, [publishedItems, selectedCategory]);

  return (
    <section 
      id="gallery" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0d0f13] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
            <Images className="w-3.5 h-3.5" />
            <span>VISUAL SPACES & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Residency Gallery
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a09e99] font-light leading-relaxed">
            A visual overview of accommodations, study setups, common lounges, and living infrastructure.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        {availableCategories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#c8a97e] text-[#0f1115] font-semibold shadow-lg shadow-[#c8a97e]/20'
                    : 'bg-white/5 text-[#a09e99] hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#14171f] border border-white/5">
            <Info className="w-8 h-8 text-[#c8a97e] mx-auto mb-3" />
            <h3 className="text-lg font-serif text-white mb-1">Gallery coming soon.</h3>
            <p className="text-xs text-[#a09e99]">Photographs are currently being updated in the residency catalog.</p>
          </div>
        ) : (
          /* 3D Perspective Gallery Wall */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(index)}
                className="group relative rounded-2xl overflow-hidden bg-[#14171f] border border-white/10 shadow-xl cursor-pointer hover:border-[#c8a97e]/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/50">
                  <img
                    src={item.image}
                    alt={item.altText || item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Overlay details */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8a97e] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-medium text-white group-hover:text-[#c8a97e] transition-colors line-clamp-1">
                      {item.caption}
                    </h3>
                  </div>

                  <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white/80 group-hover:text-white border border-white/10 group-hover:bg-[#c8a97e] group-hover:text-[#0f1115] transition-all">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          initialIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
        />
      )}
    </section>
  );
};
