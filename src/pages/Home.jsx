import React, { useEffect } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import Preloader from '../components/ui/Preloader';
import SmoothScroll from '../components/animations/SmoothScroll';

// Section components
import HomeHero from '../components/sections/HomeHero';
import HomeTimeline from '../components/sections/HomeTimeline';
import HomeThali from '../components/sections/HomeThali';
import HomeSignature from '../components/sections/HomeSignature';
import HomeTollywood from '../components/sections/HomeTollywood';
import HomeSweets from '../components/sections/HomeSweets';
import HomeBranches from '../components/sections/HomeBranches';
import HomeBanquet from '../components/sections/HomeBanquet';
import HomeTestimonials from '../components/sections/HomeTestimonials';
import HomeReservation from '../components/sections/HomeReservation';

const Home = () => {
  // Hash scroll observer
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
        {/* Header Navigation */}
        <Navbar />

        {/* Scroll-Driven Cinematic Experience */}
        <main className="flex-grow">
          
          {/* Section 2: Pinned Hero Experience (500vh) */}
          <HomeHero />

          {/* Section 3: Heritage Timeline (300vh) */}
          <HomeTimeline />

          {/* Section 4: The Thali Experience (400vh) */}
          <HomeThali />

          {/* Section 5: Signature Dishes Grid */}
          <HomeSignature />

          {/* Section 6: Vintage Tollywood Gallery (300vh) */}
          <HomeTollywood />

          {/* Section 7: Sweets Experience */}
          <HomeSweets />

          {/* Section 8: Branch Network */}
          <HomeBranches />

          {/* Section 9: Banquet Hall Experience */}
          <HomeBanquet />

          {/* Section 10: Testimonials Carousel */}
          <HomeTestimonials />

          {/* Section 11: Luxury Reservation Form */}
          <HomeReservation />

        </main>

        {/* Section 12: Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Home;
