import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { usePageImages } from '../../context/ImageContext';

const HomeBanquet = () => {
  const { getDynamicImage } = usePageImages();

  return (
    <section className="bg-brand-beige py-28 px-6 md:px-12 relative z-10 border-b border-brand-brown/5 overflow-hidden">
      {/* Telugu background watermark */}
      <div className="absolute top-10 right-10 text-brand-gold/5 font-telugu font-bold text-[14vw] leading-none pointer-events-none select-none">
        శుభకార్యాలు
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text Information */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-brand-brown">
            <span className="text-brand-red font-telugu text-xl md:text-3xl font-bold mb-1">
              విజయవాడలో అత్యుత్తమ బ్యాంకెట్ హాల్ — శుభకార్యాలకు వేదిక
            </span>
            <span className="text-brand-gold uppercase tracking-[0.4em] font-extrabold text-xs md:text-sm">
              Luxury Events Space
            </span>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-brand-brown leading-tight">
              Host Your Celebrations in <span className="text-brand-red italic">Royal Style</span>
            </h2>
            <p className="text-brand-brown/80 text-base md:text-lg leading-relaxed font-semibold">
              Host your family gatherings, weddings, corporate events, and birthday parties in our premium AC Banquet Hall located on Siddhartha College Road, Moghalrajapuram. 
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Users size={20} className="text-brand-red" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown text-base">Perfect Capacity</h4>
                  <p className="text-xs text-brand-brown/70 mt-0.5">AC Hall accommodating 50 to 100 guests seamlessly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Award size={20} className="text-brand-red" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown text-base">In-house Catering</h4>
                  <p className="text-xs text-brand-brown/70 mt-0.5">Exquisite Veg & Non-Veg menus starting at ₹500/plate.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Calendar size={20} className="text-brand-red" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown text-base">Any Occasion</h4>
                  <p className="text-xs text-brand-brown/70 mt-0.5">Weddings, birthdays, corporate meetings, private parties.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <ShieldCheck size={20} className="text-brand-red" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown text-base">Premium Amenities</h4>
                  <p className="text-xs text-brand-brown/70 mt-0.5">Valet parking, 50-car capacity space, AV equipment, and DJ.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link to="/about#banquet" className="inline-flex">
                <motion.button
                  className="px-10 py-4.5 bg-brand-red hover:bg-[#89141D] text-brand-lightBg uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-transform duration-300 hover:scale-103 flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Banquet Information</span>
                  <ArrowRight size={14} />
                </motion.button>
              </Link>
              
              <a href="#reserve" className="inline-flex">
                <motion.button
                  className="px-10 py-4.5 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-lightBg rounded uppercase tracking-widest text-xs font-bold transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Book Event Venue</span>
                </motion.button>
              </a>
            </div>
          </div>

          {/* Right: Stunning Visual Box */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden border-2 border-brand-gold/30 shadow-2xl gold-glow bg-brand-lightBg group">
              <img 
                src={getDynamicImage('home_banquet', '/placeholders/hero-interior.webp')} 
                alt="Cross Roads Banquet Hall Vijayawada" 
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/30 via-transparent to-transparent" />
              
              {/* Premium Floating Badge */}
              <div className="absolute bottom-5 left-5 z-20 bg-brand-lightBg/95 backdrop-blur-md px-5 py-3 rounded-lg border border-brand-gold/30 shadow-md flex items-center gap-2">
                <Sparkles size={18} className="text-brand-red animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-gold uppercase font-black tracking-widest">Premium Choice</span>
                  <span className="text-sm text-brand-brown font-black">Vijayawada Labbipet AC Hall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanquet;
