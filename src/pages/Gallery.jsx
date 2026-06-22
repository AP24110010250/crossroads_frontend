import React, { useState, useEffect } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/animations/SmoothScroll';
import { getImageUrl } from '../utils/imageHelper';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { RefreshCw, X, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Lightbox States
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const categories = ['All', 'Food', 'Interiors', 'Events', 'Tollywood Wall'];

  const fallbackGallery = [
    { title: 'Signature Ulavacharu Biryani', category: 'Food', image: '/placeholders/ulavacharu-biryani.webp' },
    { title: 'Unlimited 24-Item Andhra Thali', category: 'Food', image: '/placeholders/andhra-thali.webp' },
    { title: 'Ghee Podi Idly Breakfast', category: 'Food', image: '/placeholders/ghee-podi-idly.webp' },
    { title: 'Crispy MLA Dosa', category: 'Food', image: '/placeholders/mla-dosa.webp' },
    { title: 'Governorpet Dining Ambience', category: 'Interiors', image: '/placeholders/hero-interior.webp' },
    { title: 'Family Dining Moments', category: 'Interiors', image: '/placeholders/family-dining.webp' },
    { title: 'Handcrafted Sweets Counter', category: 'Interiors', image: '/placeholders/sweets-counter.webp' },
    { title: 'Nostalgic Telugu Film Frames', category: 'Tollywood Wall', image: '/placeholders/tollywood-gallery-1.webp' },
    { title: 'Vintage Spices & Reels Archive', category: 'Tollywood Wall', image: '/placeholders/tollywood-gallery-2.webp' },
    { title: 'Silver Jubilee Food Festival', category: 'Events', image: '/placeholders/hero-food.webp' }
  ];

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/gallery`);
      if (res.data.success && res.data.data.length > 0) {
        setItems(res.data.data);
      } else {
        setItems(fallbackGallery);
      }
    } catch (err) {
      console.warn('API error, loading fallback gallery placeholders:', err.message);
      setItems(fallbackGallery);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredItems = items.filter((item) => activeCategory === 'All' || item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-brand-lightBg text-brand-brown flex flex-col pt-[72px]">
        <Navbar />

        {/* Hero Banner */}
        <section className="relative py-20 bg-brand-beige border-b border-brand-brown/10 flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src={getImageUrl('/placeholders/hero-interior.webp')} alt="Background" className="w-full h-full object-cover filter blur-[2px]" />
            <div className="absolute inset-0 bg-[#FAF6EE]" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl">
            <span className="text-brand-gold uppercase tracking-[0.4em] font-extrabold text-xs">
              Visual Narrative
            </span>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mt-2 text-brand-brown leading-tight">
              Media <span className="text-brand-gold italic">Gallery</span>
            </h1>
            <p className="text-brand-brown/85 text-base md:text-lg mt-4 max-w-xl font-medium">
              Take a visual tour through our heritage, kitchen crafting, luxury interiors, and movie nostalgia walls.
            </p>
          </div>
        </section>

        {/* Categories filters - Thin, Non-Sticky */}
        <section className="py-5 px-6 md:px-12 bg-brand-lightBg border-b border-brand-brown/10 relative z-20 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2.5 pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
                className={`px-5 py-2.5 rounded-full text-xs uppercase font-extrabold tracking-wider transition-all duration-300 shrink-0 border-2 ${
                  activeCategory === cat 
                    ? 'bg-brand-gold border-brand-gold text-brand-lightBg shadow-sm' 
                    : 'bg-white border-brand-brown/10 hover:border-brand-gold text-brand-brown/85'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid - Sized up elements */}
        <section className="py-16 px-6 md:px-12 flex-grow bg-brand-lightBg z-10">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <RefreshCw className="animate-spin text-brand-gold" size={40} />
                <span className="text-sm text-brand-brown/70 uppercase tracking-wider font-semibold">Loading Gallery Frames...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-brand-brown/60">No images found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.image + index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="w-full aspect-[16/11] bg-white border border-brand-brown/10 rounded-xl overflow-hidden glass-card group relative cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                    onClick={() => setLightboxIndex(index)}
                  >
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="text-center flex flex-col items-center p-6 space-y-2">
                        <Maximize2 size={30} className="text-brand-gold mb-1 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                        <span className="font-playfair text-2xl font-black text-brand-lightBg">{item.title}</span>
                        <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">{item.category}</span>
                      </div>
                    </div>

                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = getImageUrl('/placeholders/hero-interior.webp');
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox Modal - No stark white text */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 w-full h-full bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 md:p-12 select-none"
            >
              {/* Close Button */}
              <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-brand-lightBg/70 hover:text-brand-lightBg bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 z-50"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 md:left-8 text-brand-lightBg/70 hover:text-brand-lightBg bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 z-50"
                aria-label="Previous Image"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Next Button */}
              <button 
                onClick={handleNext}
                className="absolute right-4 md:right-8 text-brand-lightBg/70 hover:text-brand-lightBg bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 z-50"
                aria-label="Next Image"
              >
                <ArrowRight size={20} />
              </button>

              {/* Image Container with details */}
              <div className="relative max-w-5xl max-h-[75vh] flex flex-col items-center justify-center p-2">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={getImageUrl(filteredItems[lightboxIndex].image)}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded border border-white/10 shadow-2xl"
                />
              </div>

              {/* Caption */}
              <div className="text-center mt-6 z-40 max-w-xl px-4 flex flex-col space-y-1">
                <span className="font-playfair text-lg md:text-xl font-bold text-brand-gold">
                  {filteredItems[lightboxIndex].title}
                </span>
                <span className="text-[10px] md:text-xs text-brand-lightBg/70 uppercase tracking-[0.2em] font-semibold">
                  Category: {filteredItems[lightboxIndex].category}
                </span>
                <span className="text-[10px] text-brand-lightBg/40 mt-2">
                  Image {lightboxIndex + 1} of {filteredItems.length} (Use Left/Right arrow keys)
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Gallery;
