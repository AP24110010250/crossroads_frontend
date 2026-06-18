import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../utils/imageHelper';

const HomeThali = () => {
  const [hoveredIdx, setHoveredIdx] = useState(0); // Default to first item (Rice)

  const thaliComponents = [
    {
      name: "Steaming Rice",
      telugu: "వేడి వేడి అన్నం",
      desc: "Pure Sona Masuri rice, served hot in the center.",
      position: { top: "35%", left: "45%" }
    },
    {
      name: "Ghee Pappu",
      telugu: "ముద్ద పప్పు",
      desc: "Creamy lentils served with a dollop of cow ghee.",
      position: { top: "25%", left: "30%" }
    },
    {
      name: "Andhra Avakai & Gongura",
      telugu: "ఆవకాయ & గోంగూర పచ్చడి",
      desc: "Stone-ground Gongura chutney and raw mango pickle.",
      position: { top: "25%", left: "60%" }
    },
    {
      name: "Vegetable Koora & Fry",
      telugu: "కూరలు & వేపుడు",
      desc: "Fresh vegetable curries and seasonal stir-fries.",
      position: { top: "55%", left: "20%" }
    },
    {
      name: "Traditional Sweet",
      telugu: "మధుర పిండివంటలు",
      desc: "Handcrafted Bandar Laddu or milk sweets prepared daily.",
      position: { top: "50%", left: "75%" }
    },
    {
      name: "Thick Buffalo Curd",
      telugu: "గట్టి పెరుగు",
      desc: "Thick, cooling buffalo curd to complete the feast.",
      position: { top: "65%", left: "55%" }
    }
  ];

  return (
    <section className="bg-brand-lightBg py-28 px-6 md:px-12 relative z-10 border-b border-brand-brown/5 overflow-hidden">
      {/* Telugu background watermark */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 text-brand-gold/5 font-telugu font-bold text-[15vw] leading-none pointer-events-none select-none">
        అన్నదాతా సుఖీభవ
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-brand-gold font-telugu text-xl md:text-3xl font-bold mb-2">
            భోజన ప్రియుల ఇలవేల్పు — 24 రకాల వంటకాలు
          </span>
          <span className="text-brand-red uppercase tracking-[0.4em] font-extrabold text-xs md:text-sm">
            The Legend of Andhra
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl font-bold mt-3 text-brand-brown leading-none">
            The Unlimited <span className="text-brand-red italic">Andhra Thali</span>
          </h2>
          <p className="text-brand-brown/70 text-lg md:text-xl font-medium mt-4 max-w-xl">
            "24 Items. Unlimited refills. Authentically Andhra." A structured exploration of the feast that defined Vijayawada.
          </p>
          <div className="w-24 h-[2px] bg-brand-gold/40 mt-6" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Left Side: Platter Map */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[350px] md:min-h-[550px] order-2 lg:order-1">
            {/* The Platter Base */}
            <div className="relative w-[340px] h-[340px] md:w-[550px] md:h-[550px] rounded-full overflow-hidden border-4 border-brand-gold/40 gold-glow bg-brand-beige">
              <img 
                src={getImageUrl('/placeholders/andhra-thali.webp')} 
                alt="Andhra Thali Platter Map" 
                className="w-full h-full object-cover scale-102 filter brightness-[0.93] contrast-105" 
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* Glowing Indicator Dots Over Platter */}
            {thaliComponents.map((item, idx) => (
              <div
                key={`dot-${idx}`}
                className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: item.position.top, left: item.position.left }}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredIdx === idx 
                      ? 'bg-brand-red text-brand-lightBg scale-125 shadow-lg border border-brand-gold' 
                      : 'bg-[#FAF6EE]/90 text-brand-brown border border-brand-brown/20'
                  }`}
                  animate={hoveredIdx === idx ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                >
                  <span className="text-xs font-bold">{idx + 1}</span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right Side: Structured List */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-4 order-1 lg:order-2">
            <h3 className="font-playfair text-2xl md:text-3xl font-extrabold text-brand-brown mb-2 border-b border-brand-brown/15 pb-2">
              Dish Elements (అంశాలు)
            </h3>
            
            <div className="flex flex-col space-y-3">
              {thaliComponents.map((item, idx) => {
                const isActive = hoveredIdx === idx;
                
                return (
                  <motion.div
                    key={item.name}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                      isActive 
                        ? 'bg-brand-beige border-brand-gold shadow-sm' 
                        : 'bg-transparent border-brand-brown/5 hover:border-brand-brown/15'
                    }`}
                    whileHover={{ x: 6 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                      isActive ? 'bg-brand-red text-brand-lightBg' : 'bg-brand-brown/10 text-brand-brown'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="flex flex-col flex-grow space-y-1">
                      <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <span className={`font-playfair text-xl md:text-2xl font-bold ${isActive ? 'text-brand-red' : 'text-brand-brown'}`}>
                          {item.name}
                        </span>
                        <span className="font-telugu font-bold text-base text-brand-gold">
                          {item.telugu}
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-brand-brown/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {isActive && (
                      <ChevronRight size={18} className="text-brand-red mt-1 shrink-0 hidden sm:block animate-pulse" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center gap-3 text-sm md:text-base text-brand-brown font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Check size={20} className="text-brand-red" /> 24 total items</span>
              <span className="flex items-center gap-1.5"><Check size={20} className="text-brand-red" /> unlimited refills</span>
              <span className="flex items-center gap-1.5"><Check size={20} className="text-brand-red" /> ₹200 plate cost</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomeThali;
