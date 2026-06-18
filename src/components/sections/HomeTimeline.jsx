import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Sparkles, MapPin } from 'lucide-react';
import { getImageUrl } from '../../utils/imageHelper';

const HomeTimeline = () => {
  const timelineEvents = [
    {
      year: '1999',
      title: 'Governorpet Branch',
      description: 'The beginning of our journey. Introducing traditional firewood cooking and authentic Andhra recipes to Vijayawada.',
      image: '/placeholders/hero-interior.webp',
      icon: <Award className="text-brand-gold" size={22} />
    },
    {
      year: '2008',
      title: 'Moghalrajapuram Branch',
      description: 'Expansion of dine-in capacity and launch of our legendary traditional sweets confectioneries.',
      image: '/placeholders/sweets-counter.webp',
      icon: <Sparkles className="text-brand-gold" size={22} />
    },
    {
      year: '2017',
      title: 'Gollapudi Highway Branch',
      description: 'Opening a landmark stopover destination for travelers on the Hyderabad Highway.',
      image: '/placeholders/hero-food.webp',
      icon: <MapPin className="text-brand-gold" size={22} />
    },
    {
      year: '2023',
      title: 'Gannavaram Airport Branch',
      description: 'A premium luxury destination serving iconic breakfasts and specialties near the airport.',
      image: '/placeholders/family-dining.webp',
      icon: <Calendar className="text-brand-gold" size={22} />
    }
  ];

  return (
    <section className="bg-brand-lightBg py-28 px-6 md:px-12 relative z-10 border-b border-brand-brown/5">
      {/* Decorative Telugu script background watermark */}
      <div className="absolute top-10 left-10 text-brand-gold/5 font-telugu font-bold text-[14vw] leading-none pointer-events-none select-none">
        చరిత్ర ప్రస్థానం
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-20 flex flex-col items-center">
          <span className="text-brand-gold font-telugu text-xl md:text-3xl font-bold mb-2">
            మా చరిత్ర — 25 సంవత్సరాల పండుగ
          </span>
          <span className="text-brand-red uppercase tracking-[0.4em] font-extrabold text-xs md:text-sm">
            Heritage legacy
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl font-bold mt-3 text-brand-brown leading-none">
            Our Twenty-Five Year <span className="text-brand-red italic">Journey</span>
          </h2>
          <p className="text-brand-brown/70 text-lg md:text-xl font-medium mt-4">
            A milestone journey of flavor, expansion, and heritage recipe curation in Vijayawada.
          </p>
          <div className="w-24 h-[2px] bg-brand-gold/40 mt-6" />
        </div>

        {/* Vertical Timeline Block */}
        <div className="relative w-full mt-8 flex flex-col space-y-16">
          
          {/* Central Connecting Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-dashed border-l border-brand-gold/30 pointer-events-none" />

          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={event.year}
                className={`flex flex-col md:flex-row items-stretch w-full relative ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Node Center Dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 w-12 h-12 rounded-full bg-brand-beige border-2 border-brand-gold flex items-center justify-center z-20 shadow">
                  {event.icon}
                </div>

                {/* Left/Right Card Spacer */}
                <div className="w-full md:w-1/2" />

                {/* Timeline Card */}
                <motion.div 
                  className="w-full md:w-[45%] pl-16 md:pl-0 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-brand-beige border border-brand-brown/10 p-6 md:p-8 rounded-lg shadow-sm hover:border-brand-gold/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-playfair text-4xl md:text-5xl font-black text-brand-red italic leading-none">
                        {event.year}
                      </span>
                      <div className="h-6 w-[1px] bg-brand-brown/20" />
                      <h3 className="font-playfair text-xl md:text-3xl font-extrabold text-brand-brown">
                        {event.title}
                      </h3>
                    </div>

                    <div className="w-full h-64 rounded overflow-hidden mb-4 border border-brand-brown/5">
                      <img 
                        src={getImageUrl(event.image)} 
                        alt={event.title} 
                        className="w-full h-full object-cover filter brightness-95 hover:scale-103 transition-transform duration-500" 
                      />
                    </div>

                    <p className="text-base md:text-lg text-brand-brown/85 font-medium leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default HomeTimeline;
