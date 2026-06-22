import React, { useEffect } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/animations/SmoothScroll';
import { motion } from 'framer-motion';
import { usePageImages } from '../context/ImageContext';
import { Check, X, Phone, Shield, Sparkles, MapPin, Music, HelpCircle } from 'lucide-react';

const About = () => {
  const { getDynamicImage } = usePageImages();

  // Scroll to hash element if available
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-brand-lightBg text-brand-brown flex flex-col pt-[72px]">
        <Navbar />

        {/* Cinematic Header */}
        <section className="relative py-24 bg-brand-beige overflow-hidden flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <img src={getDynamicImage('about_header_bg', '/placeholders/hero-interior.webp')} alt="Old Vijayawada Restaurant" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl">
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
                <img src={getDynamicImage('about_founding', '/placeholders/family-dining.webp')} alt="Family Legacy Dining" className="w-full h-full object-cover filter brightness-[0.93] sepia-[0.1]" />
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
                <img src={getDynamicImage('about_philosophy', '/placeholders/andhra-thali-premium.png')} alt="Traditional Andhra Thali Platter" className="w-full h-full object-cover filter brightness-[0.93]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Banquet Hall Details (Dynamic ID) */}
        <section id="banquet" className="py-24 px-6 md:px-12 bg-brand-lightBg border-b border-brand-brown/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left side: Images and configuration grid */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-brand-gold/30 gold-glow bg-brand-beige">
                <img src={getDynamicImage('about_banquet', '/placeholders/hero-interior.webp')} alt="Cross Roads Banquet Hall Seating" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/20 to-transparent" />
              </div>

              {/* Event Space configurations table */}
              <div className="bg-white p-6 rounded-lg border border-brand-brown/10 shadow-sm">
                <h4 className="font-playfair font-bold text-lg text-brand-brown mb-3 border-b border-brand-brown/10 pb-1.5 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-brand-red" />
                  <span>Event Spaces Configurations</span>
                </h4>
                <div className="overflow-x-auto text-xs md:text-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-brown/15 text-brand-gold uppercase tracking-wider font-extrabold text-[10px] pb-2">
                        <th className="py-2">Space Type</th>
                        <th className="py-2">Capacity</th>
                        <th className="py-2">Veg Starting</th>
                        <th className="py-2">Non-Veg Starting</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-brown/5 font-medium text-brand-brown/85">
                      <tr>
                        <td className="py-3 font-bold">Restaurant Space</td>
                        <td className="py-3">10 - 60 Guests</td>
                        <td className="py-3 text-brand-red">₹500 / plate</td>
                        <td className="py-3 text-brand-red">₹500 / plate</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-bold">AC Banquet Hall</td>
                        <td className="py-3">50 - 100 Guests</td>
                        <td className="py-3 text-brand-red">₹500 / plate</td>
                        <td className="py-3 text-brand-red">₹500 / plate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right side: Detailed policies & content */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              <span className="text-brand-gold font-telugu text-xl md:text-2xl font-bold">శుభకార్యాల సదుపాయాలు — వైభవోపేత వేదిక</span>
              <span className="text-brand-red uppercase tracking-[0.3em] text-xs font-bold">Banquet Services & Policy</span>
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-brown">
                Cross Roads Banquet Hall
              </h2>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                Whether hosting a cozy family function, birthday party, wedding ceremony, or a corporate conference, our AC Banquet Hall in Moghalrajapuram, Vijayawada provides a luxury indoor space crafted to ensure a premium experience.
              </p>

              {/* Policy cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-brand-beige border border-brand-brown/10 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-brand-brown text-sm">
                    <Check size={16} className="text-green-600 shrink-0" />
                    <span>In-House Catering ONLY</span>
                  </div>
                  <p className="text-xs text-brand-brown/70 mt-1 leading-relaxed">
                    Exquisite, high-quality vegetarian and non-vegetarian menus prepared in-house starting at just ₹500 per plate. Outside caterers are strictly not allowed.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-brand-beige border border-brand-brown/10 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-brand-brown text-sm">
                    <Check size={16} className="text-green-600 shrink-0" />
                    <span>Decorators Allowed</span>
                  </div>
                  <p className="text-xs text-brand-brown/70 mt-1 leading-relaxed">
                    We offer professional in-house decorators, but we also allow you to bring your own outside decorators to customize the theme to your liking.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-brand-beige border border-brand-brown/10 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-brand-brown text-sm">
                    <Check size={16} className="text-green-600 shrink-0" />
                    <span>Valet & 50-Car Parking</span>
                  </div>
                  <p className="text-xs text-brand-brown/70 mt-1 leading-relaxed">
                    Enjoy seamless arrivals with our spacious outdoor parking area accommodating up to 50 cars, complemented by professional valet parking service.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-brand-beige border border-brand-brown/10 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-brand-brown text-sm">
                    <Music size={16} className="text-brand-red shrink-0" />
                    <span>DJ & AV Equipment</span>
                  </div>
                  <p className="text-xs text-brand-brown/70 mt-1 leading-relaxed">
                    Equipped with premium sound systems and a stage. In-house chargeable DJ is available, or you can bring your own outside DJ service.
                  </p>
                </div>
              </div>

              {/* Call-to-action */}
              <div className="pt-4 border-t border-brand-brown/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-brand-brown/40 font-bold">Booking Enquiries</span>
                  <a href="tel:8470804805" className="text-xl md:text-2xl font-black text-brand-red flex items-center gap-1 hover:underline">
                    <Phone size={18} />
                    <span>84708 04805</span>
                  </a>
                </div>
                <div className="text-xs text-brand-brown/75 font-semibold leading-relaxed">
                  <p className="flex items-center gap-1">📍 Moghalrajapuram, Vijayawada</p>
                  <p className="flex items-center gap-1">🕒 Venue Hours: 11:00 AM to 11:00 PM</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 4: Vision & The Future */}
        <section className="py-24 px-6 md:px-12 bg-brand-beige mb-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
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
