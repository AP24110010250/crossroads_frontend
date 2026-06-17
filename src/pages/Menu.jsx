import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/animations/SmoothScroll';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Sparkles, Search, RefreshCw, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  // Wheel Interactive State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(200);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const categories = [
    'All',
    'Breakfast',
    'Starters',
    'Soups',
    'Biryani',
    'Veg Curries',
    'Non-Veg Curries',
    'Breads',
    'Chinese',
    'Sweets'
  ];

  // Seed Fallback data
  const fallbackDishes = [
    { name: 'Ulavacharu Chicken Biryani', price: 380, category: 'Biryani', isVeg: false, isChefSpecial: true, description: 'Wood-fired biryani infused with rich horse gram broth.', image: '/placeholders/ulavacharu-biryani.webp', available: true },
    { name: 'Special Chicken Biryani', price: 465, category: 'Biryani', isVeg: false, isChefSpecial: true, description: 'Boneless chicken pieces layered in fragrant basmati rice.', image: '/placeholders/hero-food.webp', available: true },
    { name: 'Andhra Thali', price: 200, category: 'Veg Curries', isVeg: true, isChefSpecial: true, description: 'Traditional Andhra feast served on banana leaf.', image: '/placeholders/andhra-thali.webp', available: true },
    { name: 'Ghee Podi Idly', price: 130, category: 'Breakfast', isVeg: true, isChefSpecial: true, description: 'Fluffy idlis tossed in pure cow ghee and karam podi.', image: '/placeholders/ghee-podi-idly.webp', available: true },
    { name: 'MLA Dosa', price: 170, category: 'Breakfast', isVeg: true, isChefSpecial: false, description: 'Pesarattu dosa stuffed with ginger chutney and upma.', image: '/placeholders/mla-dosa.webp', available: true },
    { name: 'Tandoori Chicken', price: 380, category: 'Starters', isVeg: false, isChefSpecial: false, description: 'Yogurt-marinated chicken grilled in clay tandoor oven.', image: '/placeholders/hero-food.webp', available: true },
    { name: 'Boneless Fish Fry', price: 520, category: 'Starters', isVeg: false, isChefSpecial: false, description: 'Spiced deep-fried local fish fillets.', image: '/placeholders/hero-food.webp', available: true },
    { name: 'Palak Paneer', price: 425, category: 'Veg Curries', isVeg: true, isChefSpecial: false, description: 'Fresh paneer cubes in slow-cooked creamy spinach gravy.', image: '/placeholders/andhra-thali.webp', available: true },
    { name: 'Guntur Chicken Curry', price: 380, category: 'Non-Veg Curries', isVeg: false, isChefSpecial: true, description: 'Fiery traditional curry with Guntur red chillies.', image: '/placeholders/hero-food.webp', available: true },
    { name: 'Butter Naan', price: 68, category: 'Breads', isVeg: true, isChefSpecial: false, description: 'Fresh baked clay-oven flatbread brushed with butter.', image: '/placeholders/hero-food.webp', available: true },
    { name: 'Kakinada Kaja', price: 200, category: 'Sweets', isVeg: true, isChefSpecial: true, description: 'Authentic layered sweet pastry soaked in cardamom syrup.', image: '/placeholders/sweets-counter.webp', available: true }
  ];

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/menu`);
      if (res.data.success && res.data.data.length > 0) {
        setDishes(res.data.data);
      } else {
        setDishes(fallbackDishes);
      }
    } catch (err) {
      console.warn('Loading fallback menu data:', err.message);
      setDishes(fallbackDishes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Responsive Radius Configuration
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setRadius(120);
      } else {
        setRadius(210);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Filter logic
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (dish.description && dish.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVeg = !vegOnly || dish.isVeg;
    return matchesCategory && matchesSearch && matchesVeg && dish.available !== false;
  });

  // Limit dishes displayed on the interactive Lazy Susan Wheel (max 10)
  const wheelDishes = filteredDishes.slice(0, 10);
  const N = wheelDishes.length;
  const angleStep = N > 0 ? 360 / N : 0;

  // Selected dish details
  const activeDish = wheelDishes[selectedIndex] || null;

  // Reset indices when filters change
  useEffect(() => {
    setSelectedIndex(0);
    setRotation(0);
  }, [activeCategory, searchQuery, vegOnly]);

  // Rotate wheel using shortest path
  const rotateTo = (targetIndex) => {
    if (N === 0) return;
    let diff = targetIndex - selectedIndex;
    
    // Shortest path correction
    if (diff > N / 2) {
      diff -= N;
    } else if (diff < -N / 2) {
      diff += N;
    }

    setRotation((prev) => prev - diff * angleStep);
    setSelectedIndex((targetIndex + N) % N);
  };

  const handlePrev = () => {
    rotateTo(selectedIndex - 1);
  };

  const handleNext = () => {
    rotateTo(selectedIndex + 1);
  };

  // Touch & Mouse Drag swiping
  let touchStartX = 0;
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (diffX > 50) handlePrev();
    if (diffX < -50) handleNext();
  };

  let mouseStartX = 0;
  const handleMouseDown = (e) => {
    mouseStartX = e.clientX;
  };
  const handleMouseUp = (e) => {
    const diffX = e.clientX - mouseStartX;
    if (diffX > 50) handlePrev();
    if (diffX < -50) handleNext();
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-brand-lightBg text-brand-brown flex flex-col pt-[72px]">
        <Navbar />

        {/* Cinematic Header */}
        <section className="relative py-20 bg-brand-beige border-b border-brand-brown/5 overflow-hidden flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <img src="/placeholders/hero-food.webp" alt="Background" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl">
            <span className="text-brand-gold font-telugu text-2xl md:text-4xl font-bold mb-2">
              రుచికరమైన సాంప్రదాయ వంటకాలు
            </span>
            <span className="text-brand-red uppercase tracking-[0.4em] font-extrabold text-xs md:text-sm">
              Artisan Menu Card
            </span>
            <h1 className="font-playfair text-4xl md:text-7xl font-bold mt-2 text-brand-brown leading-tight">
              Interactive <span className="text-brand-red italic">Lazy Susan</span>
            </h1>
          </div>
        </section>

        {/* Filter Controls & Search - Clean, Sized-Up */}
        <section className="py-8 px-6 md:px-12 bg-brand-lightBg sticky top-[76px] z-30 border-b border-brand-brown/10 backdrop-blur-md bg-opacity-95 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Category Filter Bar */}
            <div className="w-full lg:w-auto flex flex-wrap items-center justify-center lg:justify-start gap-3 pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-7 py-3.5 rounded-full text-sm uppercase font-extrabold tracking-wider transition-all duration-300 shrink-0 border-2 ${
                    activeCategory === cat 
                      ? 'bg-brand-red text-brand-lightBg border-brand-red shadow-md scale-105' 
                      : 'bg-white border-brand-brown/10 hover:border-brand-gold text-brand-brown/85'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Veg Toggles */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 shrink-0">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search recipe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-brand-brown/10 hover:border-brand-brown/25 focus:border-brand-red rounded-full px-6 py-4 pl-12 text-sm focus:outline-none text-brand-brown transition-colors shadow-xs"
                />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/45" />
              </div>

              {/* Veg Only Toggle */}
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-2.5 px-7 py-4 rounded-full border-2 text-sm font-extrabold tracking-wider transition-all duration-300 w-full sm:w-auto justify-center bg-white ${
                  vegOnly 
                    ? 'bg-green-50 border-green-500/50 text-green-700 shadow-sm' 
                    : 'border-brand-brown/10 hover:border-brand-brown/25 text-brand-brown/80'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full ${vegOnly ? 'bg-green-500' : 'bg-brand-brown/20'}`} />
                <span>Veg Only</span>
              </button>
            </div>

          </div>
        </section>

        {/* Main interactive Dining Table Section */}
        <section className="py-16 px-6 md:px-12 bg-brand-lightBg z-10 border-b border-brand-brown/5">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-around gap-16 min-h-[550px]">
            
            {loading ? (
              <div className="w-full flex flex-col items-center justify-center py-20 space-y-4">
                <RefreshCw className="animate-spin text-brand-red" size={40} />
                <span className="text-sm text-brand-gold uppercase tracking-wider font-extrabold font-telugu">వంటకాలు సిద్ధమవుతున్నాయి...</span>
              </div>
            ) : N === 0 ? (
              <div className="w-full text-center py-20 flex flex-col items-center space-y-4">
                <span className="text-lg text-brand-brown/60">No dishes match your selected filters.</span>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); setVegOnly(false); }}
                  className="text-sm text-brand-red hover:underline font-extrabold uppercase tracking-widest"
                >
                  Reset Selection
                </button>
              </div>
            ) : (
              <>
                {/* The Rotating Round Dining Table */}
                <div className="relative flex flex-col items-center justify-center">
                  
                  {/* Outer rotation container */}
                  <div 
                    className="relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
                    
                    {/* The Wood / Brass Table Layer */}
                    <div 
                      className="w-[310px] h-[310px] md:w-[460px] md:h-[460px] rounded-full border-[10px] border-brand-gold bg-gradient-to-br from-[#3D261C] to-[#1F130D] relative shadow-2xl flex items-center justify-center"
                      style={{ 
                        transform: `rotate(${rotation}deg)`,
                        transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Innermost center lazy susan hub */}
                      <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-[4px] border-brand-gold bg-[#2A1A12] flex items-center justify-center shadow-lg">
                        <div className="flex flex-col items-center text-center">
                          <span className="font-telugu text-lg md:text-xl text-brand-gold font-bold mb-1">రుచులు</span>
                          <span className="text-[8px] md:text-[10px] text-brand-gold/60 uppercase tracking-[0.25em] font-extrabold">Cross Roads</span>
                        </div>
                      </div>

                      {/* Plated Dishes placed around the table edge */}
                      {wheelDishes.map((dish, i) => {
                        const angle = i * angleStep;
                        const isActive = i === selectedIndex;
                        return (
                          <div
                            key={dish.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              rotateTo(i);
                            }}
                            className={`absolute w-16 h-16 md:w-24 md:h-24 rounded-full border-[3px] overflow-hidden shadow-lg cursor-pointer ${
                              isActive 
                                ? 'border-brand-red scale-115 shadow-[0_0_30px_rgba(162,28,38,0.75)] ring-4 ring-brand-gold/40 z-20' 
                                : 'border-white hover:border-brand-gold/50 shadow-md hover:scale-105 z-10'
                            }`}
                            style={{
                              transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle - rotation}deg)`,
                              transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                          >
                            <img 
                              src={dish.image} 
                              alt={dish.name} 
                              className="w-full h-full object-cover pointer-events-none"
                              onError={(e) => { e.target.src = '/placeholders/hero-food.webp'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
                          </div>
                        );
                      })}
                    </div>

                    {/* Golden pointing marker indicating the active top item */}
                    <div className="absolute top-[-30px] z-20 flex flex-col items-center pointer-events-none">
                      <div className="w-4 h-4 bg-brand-red rotate-45 transform translate-y-1 border border-brand-gold/25 shadow-md" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-lightBg bg-brand-red px-3.5 py-1.5 rounded-full shadow-md border border-brand-gold/30">
                        Selected
                      </span>
                    </div>

                  </div>

                  {/* Brass Table Rotation Controls */}
                  <div className="flex items-center gap-6 mt-8">
                    <button 
                      onClick={handlePrev}
                      className="w-14 h-14 rounded-full border-2 border-brand-gold/50 hover:border-brand-gold flex items-center justify-center hover:bg-brand-beige text-brand-gold transition-all duration-300 shadow-md"
                      title="Turn Left"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-brand-gold">
                      Turn Table
                    </span>
                    <button 
                      onClick={handleNext}
                      className="w-14 h-14 rounded-full border-2 border-brand-gold/50 hover:border-brand-gold flex items-center justify-center hover:bg-brand-beige text-brand-gold transition-all duration-300 shadow-md"
                      title="Turn Right"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>

                </div>

                {/* Sized-Up Active Dish Detail Card */}
                {activeDish && (
                  <div className="w-full lg:w-[450px] bg-brand-beige border border-brand-brown/10 rounded-2xl p-8 md:p-10 shadow-xl flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      
                      {/* Category and Veg Info */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-gold bg-white px-3 py-1 rounded border border-brand-gold/20">
                          {activeDish.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded-full shrink-0 border border-white shadow ${activeDish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                          <span className="text-xs font-black uppercase tracking-wider text-brand-brown/70">
                            {activeDish.isVeg ? 'Pure Veg' : 'Non-Veg'}
                          </span>
                        </div>
                      </div>

                      {/* Large Dish Name */}
                      <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown leading-tight">
                        {activeDish.name}
                      </h2>

                      {/* Chef Masterpiece Indicator */}
                      {activeDish.isChefSpecial && (
                        <span className="inline-flex bg-brand-red/10 text-brand-red font-black text-[11px] uppercase tracking-widest px-4 py-2 rounded-full items-center gap-1">
                          <Sparkles size={12} className="fill-brand-red" />
                          <span>Signature Recipe</span>
                        </span>
                      )}

                      {/* Very short, clean description */}
                      <p className="text-base md:text-lg text-brand-brown/85 font-semibold leading-relaxed">
                        {activeDish.description || 'Authentic regional taste crafted with premium ingredients and time-honored spice blends.'}
                      </p>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-6 border-t border-brand-brown/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-brand-brown/40 font-bold">Standard Price</span>
                        <span className="font-playfair text-3xl md:text-4xl font-black text-brand-red">
                          ₹{activeDish.price}
                        </span>
                      </div>
                      
                      <a href="#reserve" className="inline-flex items-center gap-2 px-8 py-5 bg-brand-red hover:bg-[#89141D] text-brand-lightBg font-extrabold uppercase tracking-widest text-xs rounded-full shadow-lg transition-transform duration-300 hover:scale-103">
                        <span>Book Table</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>

                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Clean, simple full menu list section for extra items */}
        {filteredDishes.length > 0 && (
          <section className="py-20 px-6 md:px-12 bg-brand-lightBg z-10">
            <div className="max-w-7xl mx-auto">
              
              <div className="flex flex-col mb-12">
                <span className="text-brand-gold font-telugu text-xl md:text-3xl font-bold mb-2">రుచికరమైన సాంప్రదాయక పట్టీ</span>
                <span className="text-brand-red uppercase tracking-[0.3em] font-extrabold text-xs">All Dishes</span>
                <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-brown mt-1">
                  Full Menu Selection
                </h2>
              </div>

              {/* Grid of Dishes - Large, Visual, Clean */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDishes.map((dish) => (
                  <div 
                    key={dish.name + '-grid'}
                    className="bg-white border border-brand-brown/10 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 flex flex-col justify-between shadow-xs"
                  >
                    {/* Dish Image */}
                    <div className="h-56 overflow-hidden relative bg-brand-beige">
                      <img 
                        src={dish.image} 
                        alt={dish.name} 
                        className="w-full h-full object-cover filter brightness-95"
                        onError={(e) => { e.target.src = '/placeholders/hero-food.webp'; }}
                      />
                      
                      {/* Veg indicator badge in image corner */}
                      <span className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-white shadow-md ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                      
                      {dish.isChefSpecial && (
                        <div className="absolute top-4 left-4 bg-brand-gold text-brand-lightBg text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-md">
                          Signature
                        </div>
                      )}
                    </div>

                    {/* Dish Details */}
                    <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-playfair text-xl md:text-2xl font-bold text-brand-brown leading-tight">
                            {dish.name}
                          </h3>
                          <span className="font-playfair text-xl font-black text-brand-red shrink-0 mt-0.5">
                            ₹{dish.price}
                          </span>
                        </div>
                        
                        <p className="text-sm text-brand-brown/80 font-medium line-clamp-2 leading-relaxed">
                          {dish.description || 'Authentic recipe cooked slowly with hand-ground native spices.'}
                        </p>
                      </div>

                      {/* Footer detail */}
                      <div className="pt-3 border-t border-brand-brown/5 flex items-center justify-between text-xs font-bold text-brand-gold uppercase tracking-wider">
                        <span>{dish.category}</span>
                        <span className="text-[10px] text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full uppercase">
                          In Kitchen
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Menu;
