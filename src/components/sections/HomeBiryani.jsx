import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

const HomeBiryani = () => {
  const steps = [
    {
      num: "01",
      title: "Handpicked Spices",
      telugu: "సుగంధ ద్రవ్యాలు",
      desc: "Fresh spices roasted slowly in traditional copper handis.",
      image: "/placeholders/tollywood-gallery-2.webp"
    },
    {
      num: "02",
      title: "Wood Fire Cook",
      telugu: "కట్టెల పొయ్యి",
      desc: "Slow-cooked over acacia wood logs for deep rustic flavor.",
      image: "/placeholders/hero-interior.webp"
    },
    {
      num: "03",
      title: "Ulavacharu infusion",
      telugu: "ఉలవచారు నిక్షేపణ",
      desc: "Long grain rice infused with rich horse gram broth.",
      image: "/placeholders/family-dining.webp"
    },
    {
      num: "04",
      title: "Wheat Dum Seal",
      telugu: "గోధుమ పిండి మూత",
      desc: "Slow-baked under a dough seal for absolute tenderness.",
      image: "/placeholders/ulavacharu-biryani.webp"
    }
  ];

  return (
    <section className="bg-[#FAF6EE] py-28 px-6 md:px-12 relative z-10 border-b border-brand-brown/5 overflow-hidden">
      {/* Telugu background watermark */}
      <div className="absolute top-10 left-10 text-brand-gold/5 font-telugu font-bold text-[14vw] leading-none pointer-events-none select-none">
        మట్టి కుండ వంట
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-brand-gold font-telugu text-xl md:text-3xl font-bold mb-2">
            కుండపోత రుచి — కట్టెల పొయ్యి ధమ్ బిర్యానీ
          </span>
          <span className="text-brand-red uppercase tracking-[0.4em] font-extrabold text-xs md:text-sm">
            Dum Cooking Chronicle
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl font-bold mt-3 text-brand-brown leading-none">
            The Ulavacharu <span className="text-brand-red italic">Biryani Dum Story</span>
          </h2>
          <p className="text-brand-brown/70 text-lg md:text-xl font-medium mt-4 max-w-xl">
            Slow-baked wood-smoke horse gram chicken biryani, prepared fresh in traditional clay pots.
          </p>
          <div className="w-24 h-[2px] bg-brand-gold/40 mt-6" />
        </div>

        {/* Structured 4-Step Cooking Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step) => (
            <motion.div
              key={step.num}
              className="flex flex-col bg-brand-beige border border-brand-brown/10 rounded-lg overflow-hidden glass-card-gold shadow-sm group hover:border-brand-gold/45"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Photo Frame */}
              <div className="w-full h-64 overflow-hidden relative border-b border-brand-brown/5">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover filter brightness-[0.85] sepia-[0.15] group-hover:scale-103 transition-transform duration-500" 
                />
                {/* Step number badge */}
                <div className="absolute top-3 left-3 bg-brand-red text-brand-lightBg text-xs font-bold px-2.5 py-1 rounded shadow">
                  Step {step.num}
                </div>
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col space-y-2 flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-brand-brown group-hover:text-brand-red transition-colors">
                    {step.title}
                  </h3>
                  <span className="font-telugu font-bold text-base text-brand-gold">{step.telugu}</span>
                </div>
                <p className="text-sm md:text-base text-brand-brown/85 font-medium leading-relaxed flex-grow">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Climax Showcase Layout */}
        <div className="flex flex-col lg:flex-row items-center bg-brand-beige border border-brand-brown/10 p-8 md:p-12 rounded-xl max-w-5xl mx-auto gap-8 md:gap-12 relative overflow-hidden">
          {/* Candlelight glowing overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full filter blur-[80px] pointer-events-none" />

          {/* Left Side: Text Details */}
          <div className="w-full lg:w-3/5 flex flex-col space-y-4 z-10 text-brand-brown">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm flex items-center gap-1.5">
              <Sparkles size={18} />
              <span>Signature Highlight</span>
            </span>
            <h3 className="font-playfair text-3xl md:text-5xl font-bold text-brand-brown">
              Breaking the Wheat Seal (ఆవిష్కరణ)
            </h3>
            <p className="text-base md:text-lg text-brand-brown/85 leading-relaxed font-medium">
              When we cut open the flour dough seal, a rich plume of acacia wood smoke, whole spices, and chicken bone aroma is released. The basmati grain is hot, fluffy, and infused with the rich earthiness of Ulavacharu broth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm md:text-base font-bold">
              <span className="flex items-center gap-1.5"><Check size={18} className="text-brand-red" /> Wood fire smoked</span>
              <span className="flex items-center gap-1.5"><Check size={18} className="text-brand-red" /> 24-hr reduction</span>
              <span className="flex items-center gap-1.5"><Check size={18} className="text-brand-red" /> ₹380 per pot</span>
            </div>
          </div>

          {/* Right Side: Steaming Pot Visual (size 580px max-width container) */}
          <div className="w-full lg:w-2/5 flex items-center justify-center z-10">
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-lg overflow-hidden border-2 border-brand-gold/25 gold-glow bg-brand-beige">
              <img 
                src="/placeholders/ulavacharu-biryani.webp" 
                alt="Hot Dum Biryani Clay Pot" 
                className="w-full h-full object-cover" 
              />
              
              {/* CSS steam animation rising */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="steam-particle" style={{left: '20%', width: '24px', height: '24px', animationDelay: '0s'}} />
                <div className="steam-particle" style={{left: '40%', width: '30px', height: '30px', animationDelay: '1.2s'}} />
                <div className="steam-particle" style={{left: '60%', width: '20px', height: '20px', animationDelay: '2.4s'}} />
                <div className="steam-particle" style={{left: '80%', width: '32px', height: '32px', animationDelay: '3.6s'}} />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A12]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeBiryani;
