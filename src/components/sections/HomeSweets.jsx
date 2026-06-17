import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

const HomeSweets = () => {
  const sweets = [
    {
      name: 'Pootharekulu (Paper Sweets)',
      desc: 'Wafer-thin rice starch layers folded with ghee, sugar, and dry fruits.',
      origin: 'Atreyapuram'
    },
    {
      name: 'Kakinada Kaja',
      desc: 'Ribbon-layered pastry soaked in warm cardamom sugar syrup.',
      origin: 'Kakinada'
    },
    {
      name: 'Bandar Laddu',
      desc: 'Smooth gram flour balls roasted patiently in pure ghee.',
      origin: 'Machilipatnam'
    }
  ];

  return (
    <section className="bg-brand-beige py-28 px-6 md:px-12 relative z-10 border-b border-brand-brown/5">
      {/* Decorative background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[50vh] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 text-brand-gold/5 font-telugu font-bold text-[14vw] leading-none pointer-events-none select-none">
        స్వీట్స్ హౌస్
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Text Details */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <span className="text-brand-gold font-telugu text-xl md:text-3xl font-bold mb-1">
            నోరూరించే సాంప్రదాయ పిండివంటలు — స్వచ్ఛమైన నెయ్యి
          </span>
          <span className="text-brand-red uppercase tracking-[0.4em] font-extrabold text-xs md:text-sm">
            In-House Confectionery
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-brand-brown leading-none">
            Traditional Andhra <br />
            <span className="text-brand-red italic">Sweets Shop</span>
          </h2>
          <p className="text-brand-brown/70 text-lg md:text-xl font-medium leading-relaxed">
            Our premises host a dedicated, premium sweet counter preparing authentic Andhra delicacies daily. Made with age-old recipes, pure home-churned ghee, and zero preservatives.
          </p>

          <div className="w-24 h-[2px] bg-brand-gold/30 my-2" />

          {/* Sweet Highlight Cards */}
          <div className="flex flex-col space-y-5">
            {sweets.map((s) => (
              <div key={s.name} className="flex gap-4 p-5 rounded-lg bg-white border border-brand-brown/10 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Sparkles size={22} />
                </div>
                <div className="flex flex-col space-y-1.5 flex-grow text-brand-brown">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-playfair font-bold text-xl md:text-2xl">{s.name}</span>
                    <span className="text-xs uppercase tracking-widest text-brand-red font-bold px-3.5 py-1.5 rounded bg-brand-red/10">
                      {s.origin}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-brand-brown/80 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-6 text-sm md:text-base text-brand-brown font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Check size={20} className="text-brand-red" /> Prepared Fresh Daily</span>
            <span className="flex items-center gap-1.5"><Check size={20} className="text-brand-red" /> 100% Pure Ghee</span>
          </div>
        </div>

        {/* Right Side: Luxury Product Showcase Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <motion.div 
            className="relative w-full max-w-xl aspect-square rounded-lg overflow-hidden border-2 border-brand-gold/25 gold-glow group bg-brand-lightBg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/placeholders/sweets-counter.webp" 
              alt="Traditional Sweets Counter" 
              className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-700" 
            />
            {/* Visual Frame */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none rounded" />
            
            {/* Gold Plate Overlay Tag */}
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-card border border-brand-gold/30 rounded text-brand-brown">
              <span className="text-xs uppercase tracking-widest text-brand-red font-bold">Legacy Sweet Counters</span>
              <h3 className="font-playfair text-2xl font-bold text-brand-brown mt-1">Order Custom Sweet Gift Boxes</h3>
              <p className="text-sm text-brand-brown/80 mt-2 font-medium">Perfect for marriages, family celebrations, and traditional festivals in Vijayawada.</p>
              <Link to="/menu" className="inline-flex items-center gap-1.5 text-xs text-brand-red hover:underline font-bold mt-4">
                <span>View Sweets Menu</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HomeSweets;
