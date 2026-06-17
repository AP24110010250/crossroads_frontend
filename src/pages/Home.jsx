import React, { useState } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import Preloader from '../components/ui/Preloader';
import SmoothScroll from '../components/animations/SmoothScroll';

// Section components
import HomeHero from '../components/sections/HomeHero';
import HomeTimeline from '../components/sections/HomeTimeline';
import HomeThali from '../components/sections/HomeThali';
import HomeBiryani from '../components/sections/HomeBiryani';
import HomeSignature from '../components/sections/HomeSignature';
import HomeTollywood from '../components/sections/HomeTollywood';
import HomeSweets from '../components/sections/HomeSweets';
import HomeBranches from '../components/sections/HomeBranches';
import HomeTestimonials from '../components/sections/HomeTestimonials';
import HomeReservation from '../components/sections/HomeReservation';

const Home = () => {
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

          {/* Section 5: The Biryani Story (500vh) */}
          <HomeBiryani />

          {/* Section 6: Signature Dishes Grid */}
          <HomeSignature />

          {/* Section 7: Vintage Tollywood Gallery (300vh) */}
          <HomeTollywood />

          {/* Section 8: Sweets Experience */}
          <HomeSweets />

          {/* Section 9: Branch Network */}
          <HomeBranches />

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
