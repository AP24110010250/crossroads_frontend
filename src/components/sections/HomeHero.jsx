import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowDown, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HomeHero = () => {
  const containerRef = useRef(null);
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const scene4Ref = useRef(null);
  
  // Floating dishes refs
  const dish1Ref = useRef(null);
  const dish2Ref = useRef(null);
  const dish3Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    
    // Condensed GSAP ScrollTrigger timeline (200vh height total)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Initialize all scenes opacity to 0 except scene 1
    gsap.set([scene2Ref.current, scene3Ref.current, scene4Ref.current], { opacity: 0, y: 30 });
    gsap.set(scene1Ref.current, { opacity: 1, scale: 1 });
    
    // Scene 3 dishes initial styles
    gsap.set([dish1Ref.current, dish2Ref.current, dish3Ref.current], { 
      y: 60, 
      opacity: 0, 
      scale: 0.95 
    });

    // 1. Scene 1 -> Scene 2 (0% - 25%)
    tl.to(scene1Ref.current, {
      opacity: 0,
      scale: 0.98,
      y: -30,
      duration: 1
    }, 0)
    .to(scene2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1
    }, 0.4)

    // 2. Scene 2 -> Scene 3 (25% - 50%)
    .to(scene2Ref.current, {
      opacity: 0,
      y: -30,
      duration: 1
    }, 1.2)
    .to(scene3Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1
    }, 1.6)
    .to(dish1Ref.current, { opacity: 1, y: 0, scale: 1.05, duration: 0.8, ease: "power1.out" }, 1.6)
    .to(dish2Ref.current, { opacity: 1, y: 0, scale: 1.02, duration: 0.8, ease: "power1.out" }, 1.7)
    .to(dish3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power1.out" }, 1.8)

    // 3. Scene 3 -> Scene 4 (50% - 80%)
    .to(scene3Ref.current, {
      opacity: 0,
      y: -30,
      duration: 1
    }, 2.6)
    .to(scene4Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1
    }, 3.0)

    // Final buffer block (80% - 100%)
    .to({}, { duration: 0.5 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-[#FAF6EE] overflow-hidden select-none">
      
      {/* Background Image Parallax with soft champagne vignette overlay */}
      <div className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none">
        <img 
          src="/placeholders/hero-interior.webp" 
          alt="Vintage Crossroads Ambience" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE] via-transparent to-[#FAF6EE]" />
      </div>

      {/* Main Viewport Container */}
      <div className="relative w-full h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        
        {/* Scene 1: 25 Years of Culinary Excellence */}
        <div ref={scene1Ref} className="absolute flex flex-col items-center text-center max-w-5xl gpu-accelerated">
          <span className="text-brand-gold uppercase tracking-[0.4em] font-extrabold text-sm md:text-base mb-4">
            Established 1999
          </span>
          <h2 className="font-playfair text-6xl md:text-9xl font-bold tracking-tight text-brand-brown leading-none">
            25 Years of <br />
            <span className="text-brand-red italic">Culinary Excellence</span>
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold/40 my-8" />
          
          {/* Sized up Telugu subtitle */}
          <span className="text-brand-gold font-telugu text-2xl md:text-4xl font-bold mb-6">
            పాతికేళ్ల మధుర స్మృతులు — అరుదైన రుచులు
          </span>

          <p className="text-brand-brown/80 text-sm md:text-lg uppercase tracking-widest font-extrabold flex items-center gap-2.5">
            <span>Scroll to Unfold the Story</span>
            <ArrowDown size={22} className="animate-bounce text-brand-red" />
          </p>
        </div>

        {/* Scene 2: Where Andhra Flavours Meet Tradition */}
        <div ref={scene2Ref} className="absolute flex flex-col items-center text-center max-w-5xl gpu-accelerated">
          <span className="text-brand-gold uppercase tracking-[0.3em] font-extrabold text-sm md:text-base mb-4">
            Our Legacy
          </span>
          <h2 className="font-playfair text-6xl md:text-9xl font-bold leading-none text-brand-brown">
            Where Andhra Flavours <br />
            <span className="text-red-gradient">Meet Tradition</span>
          </h2>
          <p className="text-brand-brown/85 text-xl md:text-3xl max-w-3xl mt-8 leading-relaxed font-extrabold">
            Authentic recipes, hand-ground spices, and family heritage since 1999 in Vijayawada.
          </p>
        </div>

        {/* Scene 3: Floating Food Dishes */}
        <div ref={scene3Ref} className="absolute w-full h-full flex flex-col items-center justify-center gpu-accelerated">
          <div className="absolute top-10 md:top-20 text-center z-10">
            <span className="text-brand-gold uppercase tracking-[0.3em] font-extrabold font-telugu text-lg md:text-2xl">విశిష్ట వంటకాలు</span>
            <h3 className="font-playfair text-4xl md:text-6xl font-bold text-brand-brown mt-2">Savour the Masterpieces</h3>
          </div>
          
          <div className="relative w-full max-w-6xl h-full flex items-center justify-around flex-col md:flex-row py-20">
            {/* Dish 1: Ulavacharu Chicken Biryani */}
            <div ref={dish1Ref} className="flex flex-col items-center text-center max-w-[340px] group steam-container gpu-accelerated">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-brand-gold/30 gold-glow relative bg-brand-beige">
                <img src="/placeholders/ulavacharu-biryani.webp" alt="Ulavacharu Chicken Biryani" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {/* Steam particles */}
                <div className="steam-particle" style={{left: '30%', width: '15px', height: '15px', animationDelay: '0s'}} />
                <div className="steam-particle" style={{left: '50%', width: '25px', height: '25px', animationDelay: '1.5s'}} />
              </div>
              <h4 className="font-playfair text-2xl md:text-3xl font-extrabold text-brand-brown mt-4">Ulavacharu Biryani</h4>
              <span className="text-sm text-brand-red uppercase tracking-wider font-extrabold mt-1">Wood-Fired Dum Cooking</span>
            </div>

            {/* Dish 2: Andhra Thali */}
            <div ref={dish2Ref} className="flex flex-col items-center text-center max-w-[340px] group gpu-accelerated">
              <div className="w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden border-2 border-brand-gold/30 gold-glow relative bg-brand-beige">
                <img src="/placeholders/andhra-thali.webp" alt="Andhra Thali" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-playfair text-2xl md:text-3xl font-extrabold text-brand-brown mt-4">Andhra Thali</h4>
              <span className="text-sm text-brand-red uppercase tracking-wider font-extrabold mt-1">24 Items Unlimited Feast</span>
            </div>

            {/* Dish 3: Ghee Podi Idly */}
            <div ref={dish3Ref} className="flex flex-col items-center text-center max-w-[340px] group steam-container gpu-accelerated">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-brand-gold/30 gold-glow relative bg-brand-beige">
                <img src="/placeholders/ghee-podi-idly.webp" alt="Ghee Podi Idly" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="steam-particle" style={{left: '40%', width: '10px', height: '10px', animationDelay: '0.5s'}} />
                <div className="steam-particle" style={{left: '60%', width: '15px', height: '15px', animationDelay: '2.5s'}} />
              </div>
              <h4 className="font-playfair text-2xl md:text-3xl font-extrabold text-brand-brown mt-4">Ghee Podi Idly</h4>
              <span className="text-sm text-brand-red uppercase tracking-wider font-extrabold mt-1">Pure Ghee & Karam Podi</span>
            </div>
          </div>
        </div>

        {/* Scene 4: Brand reveal: CROSS ROADS */}
        <div ref={scene4Ref} className="absolute flex flex-col items-center text-center max-w-5xl px-4 gpu-accelerated">
          <span className="text-brand-red uppercase tracking-[0.5em] font-extrabold text-xs md:text-sm mb-4">
            Welcome to Destination of Flavour
          </span>
          <h1 className="font-playfair text-hero font-black tracking-widest text-brand-brown leading-none">
            CROSS ROADS
          </h1>
          <p className="font-playfair text-2xl md:text-4xl text-brand-gold italic font-bold tracking-wide max-w-2xl mt-6">
            "Not just a stop. It's a destination for flavour."
          </p>
          <div className="w-24 h-[1px] bg-brand-gold/50 my-8" />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/menu">
              <button className="px-10 py-5 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-lightBg rounded uppercase tracking-widest text-sm font-extrabold transition-all duration-300 shadow-sm">
                Explore Menu
              </button>
            </Link>
            <a href="#reserve">
              <button className="px-10 py-5 bg-brand-red text-brand-lightBg hover:bg-[#89141D] rounded uppercase tracking-widest text-sm font-extrabold flex items-center justify-center gap-2 border border-brand-red/10 gold-glow-hover transition-all duration-300 shadow-sm">
                <Calendar size={18} />
                <span>Book A Table</span>
              </button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeHero;
