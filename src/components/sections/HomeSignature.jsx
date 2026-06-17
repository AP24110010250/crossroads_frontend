import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const HomeSignature = () => {
  const dishes = [
    {
      name: 'Ulavacharu Chicken Biryani',
      price: '₹380',
      category: 'Biryani',
      isVeg: false,
      isChefSpecial: true,
      desc: 'Our signature smoky biryani simmered with rich horse gram broth.',
      image: '/placeholders/ulavacharu-biryani.webp'
    },
    {
      name: 'Special Chicken Biryani',
      price: '₹465',
      category: 'Biryani',
      isVeg: false,
      isChefSpecial: true,
      desc: 'Bestselling aromatic basmati rice layered with tender boneless chicken.',
      image: '/placeholders/hero-food.webp'
    },
    {
      name: 'Best Andhra Thali',
      price: '₹200',
      category: 'Meal',
      isVeg: true,
      isChefSpecial: true,
      desc: '24 traditional Andhra items served unlimited on fresh banana leaf.',
      image: '/placeholders/andhra-thali.webp'
    },
    {
      name: 'Ghee Podi Idly',
      price: '₹130',
      category: 'Breakfast',
      isVeg: true,
      isChefSpecial: true,
      desc: 'Fluffy steamed idlis tossed in pure cow ghee and karam podi.',
      image: '/placeholders/ghee-podi-idly.webp'
    },
    {
      name: 'MLA Dosa',
      price: '₹170',
      category: 'Breakfast',
      isVeg: true,
      isChefSpecial: false,
      desc: 'Crispy Pesarattu dosa stuffed with aromatic semolina upma.',
      image: '/placeholders/mla-dosa.webp'
    }
  ];

  return (
    <section className="bg-brand-lightBg py-28 px-6 md:px-12 relative z-10 border-b border-brand-brown/5">
      {/* Decorative background watermark */}
      <div className="absolute top-1/4 right-10 text-brand-gold/5 font-telugu font-bold text-[13vw] leading-none pointer-events-none select-none">
        మహా నివేదన
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-20 flex flex-col items-center">
          <span className="text-brand-gold font-telugu text-xl md:text-3xl font-bold mb-2">
            ప్రత్యేక రుచులు — కస్టమర్ల ఇష్టాలు
          </span>
          <span className="text-brand-red uppercase tracking-[0.4em] font-extrabold text-xs md:text-sm">
            Curated Taste Bestsellers
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl font-bold mt-3 text-brand-brown leading-none">
            Our Signature <span className="text-brand-red italic">Curations</span>
          </h2>
          <p className="text-brand-brown/70 text-lg md:text-xl font-medium mt-4">
            A handpicked selection of our most loved recipes that have defined the dining landscape of Vijayawada.
          </p>
          <div className="w-24 h-[2px] bg-brand-gold/40 mt-6" />
        </div>

        {/* Bestseller Dishes Grid (Larger Card width max-w-[420px] and elements) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
          {dishes.map((dish) => (
            <motion.div
              key={dish.name}
              className="flex flex-col bg-brand-beige border border-brand-brown/10 rounded-lg overflow-hidden group relative hover:border-brand-gold/30 transition-all duration-500 glass-card-gold max-w-[420px] w-full"
              whileHover={{ 
                y: -10, 
                boxShadow: '0 10px 30px rgba(181, 142, 61, 0.15)' 
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Chef Special Badge */}
              {dish.isChefSpecial && (
                <div className="absolute top-4 left-4 z-20 bg-brand-gold text-brand-lightBg font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded flex items-center gap-1 shadow">
                  <Sparkles size={14} />
                  <span>Chef's Special</span>
                </div>
              )}

              {/* Veg / Non-Veg Indicator */}
              <div className="absolute top-4 right-4 z-20 bg-brand-lightBg/95 backdrop-blur-md px-3 py-1.5 rounded border border-brand-brown/10 flex items-center gap-1.5 shadow-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-brown">
                  {dish.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>

              {/* Image Container */}
              <div className="w-full h-72 md:h-80 overflow-hidden relative border-b border-brand-brown/5">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/15 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-playfair text-2xl font-bold text-brand-brown group-hover:text-brand-red transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <span className="font-playfair text-2xl font-bold text-brand-red ml-2 shrink-0">
                    {dish.price}
                  </span>
                </div>
                <p className="text-base md:text-lg text-brand-brown/80 leading-relaxed flex-grow font-medium">
                  {dish.desc}
                </p>
                <div className="border-t border-brand-brown/10 pt-4 flex items-center justify-between text-xs text-brand-brown/60 uppercase tracking-widest font-semibold">
                  <span>Category: {dish.category}</span>
                  <Link to="/menu" className="text-brand-red hover:underline flex items-center gap-1.5 font-bold">
                    <span>Order Online</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Entire Menu Link (Larger padded CTA button) */}
        <Link to="/menu" className="mt-20">
          <motion.button
            className="px-12 py-5 border-2 border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-lightBg uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Full Menu</span>
            <ArrowRight size={18} />
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default HomeSignature;
