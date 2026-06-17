import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomeTollywood = () => {
  const triggerRef = useRef(null);
  const filmstripRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const filmstrip = filmstripRef.current;

    const scrollWidth = filmstrip.scrollWidth - window.innerWidth;

    const pin = gsap.fromTo(filmstrip,
      { x: 0 },
      {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollWidth}`,
          invalidateOnRefresh: true
        }
      }
    );

    return () => {
      pin.scrollTrigger?.kill();
    };
  }, []);

  const galleryItems = [
    {
      title: "Classic Cinema Wall",
      desc: "Nostalgic framed posters of vintage Telugu films.",
      image: "/placeholders/tollywood-gallery-1.webp"
    },
    {
      title: "Behind the Lens",
      desc: "Black and white prints of golden-age Tollywood Directors.",
      image: "/placeholders/tollywood-gallery-2.webp"
    },
    {
      title: "Midcentury Grandeur",
      desc: "Our interior design echoes classical theater seating.",
      image: "/placeholders/hero-interior.webp"
    },
    {
      title: "A Family Tradition",
      desc: "Generations dining under the legends of Andhra cinema.",
      image: "/placeholders/family-dining.webp"
    },
    {
      title: "Traditional Craft",
      desc: "The vintage art of confectionery and sweets.",
      image: "/placeholders/sweets-counter.webp"
    }
  ];

  return (
    <div ref={triggerRef} className="relative w-full bg-[#FAF6EE] overflow-hidden film-grain py-20 border-b border-brand-brown/5">
      
      {/* Background Graphic */}
      <div className="absolute top-10 left-10 text-brand-gold/5 font-telugu font-bold text-[14vw] leading-none pointer-events-none select-none">
        చిత్రసీమ జ్ఞాపకాలు
      </div>

      {/* Headline Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 relative z-10">
        <span className="text-brand-gold font-telugu text-lg md:text-2xl font-bold mb-2 block">
          పాత తరం క్లాసిక్ చిత్రాల జ్ఞాపకాలు — నాటి టాలీవుడ్ గోడ
        </span>
        <span className="text-brand-red uppercase tracking-[0.3em] font-bold text-xs md:text-sm">
          Vintage Cinema Nostalgia
        </span>
        <h2 className="font-playfair text-4xl md:text-6xl font-bold text-brand-brown mt-2 leading-tight">
          The Tollywood <span className="text-brand-red italic">Gallery Wall</span>
        </h2>
        <p className="text-brand-muted text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Vijayawada is the historic heart of film distribution in Andhra. We celebrate this legacy with a wall dedicated to classic Tollywood nostalgia, connecting family dining with classical cinematic art.
        </p>
      </div>

      {/* Film Strip Horizontal Scroll Container */}
      <div ref={filmstripRef} className="relative h-[55vh] md:h-[65vh] flex items-center whitespace-nowrap pl-[10vw] z-10">
        
        {/* Sprocket film container */}
        <div className="flex items-center bg-zinc-950 py-8 border-y-8 border-dashed border-zinc-800 rounded-md relative shadow-xl">
          
          {/* Top sprocket holes overlay */}
          <div className="absolute top-1 left-0 w-full flex space-x-5 px-4 pointer-events-none select-none opacity-40">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={`top-sprocket-${i}`} className="w-3.5 h-3.5 bg-zinc-900 border border-zinc-700/30 rounded-sm shrink-0" />
            ))}
          </div>

          {/* Film Strip Frames */}
          {galleryItems.map((item, idx) => (
            <div 
              key={item.title} 
              className="inline-block mx-6 md:mx-10 shrink-0 select-none whitespace-normal bg-zinc-900 border-x-4 border-zinc-950 p-5 w-[280px] md:w-[380px] flex flex-col space-y-4 hover:border-brand-gold/45 transition-colors duration-300 rounded"
            >
              {/* Photo Frame */}
              <div className="w-full h-48 md:h-72 overflow-hidden relative border border-zinc-800 rounded bg-black">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover filter sepia-[0.25] brightness-75 hover:scale-105 transition-transform duration-500 pointer-events-none" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="flex flex-col space-y-1">
                <span className="font-playfair text-base md:text-lg font-bold text-brand-gold tracking-wide">
                  {idx + 1}. {item.title}
                </span>
                <span className="text-xs text-zinc-400 italic">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}

          {/* Bottom sprocket holes overlay */}
          <div className="absolute bottom-1 left-0 w-full flex space-x-5 px-4 pointer-events-none select-none opacity-40">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={`bottom-sprocket-${i}`} className="w-3.5 h-3.5 bg-zinc-900 border border-zinc-700/30 rounded-sm shrink-0" />
            ))}
          </div>

        </div>

        {/* Ending Spacer */}
        <div className="inline-block w-[30vw] shrink-0" />
      </div>

    </div>
  );
};

export default HomeTollywood;
