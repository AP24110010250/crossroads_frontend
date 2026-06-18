import React from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/animations/SmoothScroll';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/imageHelper';

const About = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-brand-lightBg text-brand-brown flex flex-col pt-[72px]">
        <Navbar />

        {/* Cinematic Header */}
        <section className="relative py-24 bg-brand-beige overflow-hidden flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <img src={getImageUrl('/placeholders/hero-interior.webp')} alt="Old Vijayawada Restaurant" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl">
            {/* Enlarged Telugu Headline */}
            <span className="text-brand-red font-telugu text-2xl md:text-4xl font-bold mb-3 block tracking-wide">
              మా చరిత్ర ప్రస్థానం — పాతికేళ్ల విశ్వసనీయత
            </span>
            <span className="text-brand-gold uppercase tracking-[0.4em] font-bold text-xs md:text-sm">
              Our Story & Legacy
            </span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mt-2 text-brand-brown leading-tight">
              Our Story & <span className="text-brand-red italic">Heritage</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base mt-4 max-w-xl leading-relaxed">
              From a single stopover in Governorpet in 1999 to Vijayawada's benchmark destination for family dining and Andhra sweets.
            </p>
          </div>
        </section>

        {/* Section 1: The Founding Legacy */}
        <section className="py-24 px-6 md:px-12 bg-brand-lightBg border-b border-brand-brown/5">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              <span className="text-brand-gold font-telugu text-xl md:text-2xl font-bold">1999 — ప్రారంభం</span>
              <span className="text-brand-red uppercase tracking-[0.3em] text-xs font-bold">The Genesis</span>
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-brown">
                How It All Began
              </h2>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                In 1999, the lanes of Prakasam Road in Governorpet, Vijayawada witnessed the opening of a modest multi-cuisine restaurant named **Cross Roads**. The founders had a simple philosophy: restaurant dining shouldn't just be a quick pit-stop during travel. It should be a warm, memorable destination filled with rich local flavors.
              </p>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                We gathered veteran chefs who specialized in traditional firewood (Katlapoyyi) slow-cooking and began hand-grinding our secret spice masalas. As word spread, our tables filled up with families seeking the taste of authentic Andhra hospitality.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden border border-brand-gold/30 gold-glow bg-brand-beige">
                <img src={getImageUrl('/placeholders/family-dining.webp')} alt="Family Legacy Dining" className="w-full h-full object-cover filter brightness-[0.93] sepia-[0.1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Culinary Philosophy */}
        <section className="py-24 px-6 md:px-12 bg-brand-beige border-b border-brand-brown/5 relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vh] bg-brand-gold rounded-full filter blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="w-full lg:w-1/2 flex flex-col space-y-6 z-10">
              {/* Enlarged Telugu script heading */}
              <span className="text-brand-red font-telugu text-xl md:text-3xl font-bold">మా ఆహార నియమాలు — సహజ రుచులు</span>
              <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold">Culinary Values</span>
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-brown">
                Our Culinary Philosophy
              </h2>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                Andhra cuisine is celebrated for its boldness, spice, and sourness. At Cross Roads, we honor this legacy by using native ingredients. We slow-simmer our horse gram (Ulavacharu) for 24 hours to achieve the perfect consistency before marrying it with our spiced basmati rice.
              </p>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                Our in-house sweets shop operates under the same rigorous standard, preparing Kakinada Kaja, Bandar Laddu, and Atreyapuram Pootharekulu fresh daily using 100% pure cow ghee and traditional organic jaggery.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden border border-brand-gold/30 gold-glow bg-brand-lightBg">
                <img src={getImageUrl('/placeholders/andhra-thali.webp')} alt="Traditional Andhra Thali Platter" className="w-full h-full object-cover filter brightness-[0.93]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Vision & The Future */}
        <section className="py-24 px-6 md:px-12 bg-brand-lightBg mb-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
            {/* Enlarged Telugu watermark header */}
            <span className="text-brand-red font-telugu text-2xl md:text-4xl font-bold block">భవిష్యత్ ఆశయం — కుటుంబ అనురాగాలు</span>
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold">Vision for Hospitality</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-brown">
              Family Dining Warmth & Modern Luxury
            </h2>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-2xl">
              As we step into our next quarter-century, Cross Roads aims to blend modern hospitality standards with nostalgic, warm Telugu heritage. We design our outlets to look like Michelin-star venues, but inside, you will always find the same welcoming smiles, generous unlimited refills of pappu and podi, and nostalgic vintage Tollywood cine-vibes on the walls.
            </p>
            <div className="w-20 h-[2px] bg-brand-gold/30 my-4" />
            <p className="font-playfair italic text-brand-red text-xl md:text-2xl font-semibold">
              "Because flavor isn't just about food. It's about where you stop, and who you share it with."
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default About;
