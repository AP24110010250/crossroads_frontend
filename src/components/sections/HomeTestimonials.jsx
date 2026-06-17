import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const HomeTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      name: 'K. Viswanath',
      role: 'Legendary Filmmaker (Aesthetic Admirer)',
      quote: 'Reminds me of vintage Tollywood gatherings. The Ulavacharu Chicken Biryani is pure cinematic poetry. The environment is nostalgic, warm, and highly authentic.',
      rating: 5
    },
    {
      name: 'Anjali Prasad',
      role: 'Local Food Critic & Blogger',
      quote: 'The unlimited 24-item Andhra Thali at the Gollapudi branch is the best feast in Vijayawada! Unlimited refills of pappu, pure ghee, and podi make it an absolute delight.',
      rating: 5
    },
    {
      name: 'Ramu K. G.',
      role: 'Frequent Business Traveler',
      quote: 'We always stop at the Gannavaram branch right after landing at the airport. The MLA Dosa and Ghee Podi Idly are exceptional. Fast service and luxury taste.',
      rating: 4
    },
    {
      name: 'Suhasini Rao',
      role: 'Family Dining Regular',
      quote: 'Brought our family of 15 to the Moghalrajapuram branch. The hospitality, warm lighting, and traditional taste were outstanding. Truly felt like home.',
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-brand-beige py-28 px-6 md:px-12 relative z-10 overflow-hidden border-b border-brand-brown/5">
      {/* Background graphics */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-brand-red/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-gold/5 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Quote Icon */}
        <div className="w-20 h-20 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-8 shadow-sm">
          <Quote size={32} />
        </div>

        {/* Heading */}
        <span className="text-brand-gold font-telugu text-lg md:text-2xl font-bold mb-2">
          సందర్శకుల సమీక్షలు — సంతృప్తికరమైన అనుభవాలు
        </span>
        <span className="text-brand-red uppercase tracking-[0.4em] font-bold text-xs md:text-sm">
          Guest Testimonials
        </span>
        <h2 className="font-playfair text-4xl md:text-6xl font-bold text-brand-brown mb-12">
          What Our Diners <span className="text-brand-red italic">Say About Us</span>
        </h2>

        {/* Active Testimonial Card */}
        <div className="relative w-full min-h-[280px] md:min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full bg-brand-lightBg border border-brand-brown/10 p-8 md:p-12 rounded-xl glass-card relative shadow-sm"
            >
              {/* Rating stars */}
              <div className="flex items-center justify-center space-x-1.5 mb-6 text-brand-gold">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>

              {/* Quote Quote text */}
              <p className="font-playfair text-xl md:text-2xl md:leading-relaxed text-brand-brown italic font-light mb-6">
                "{testimonials[activeIndex].quote}"
              </p>

              {/* Author name & details */}
              <div className="flex flex-col">
                <span className="font-bold text-brand-brown tracking-wide text-base md:text-lg">
                  {testimonials[activeIndex].name}
                </span>
                <span className="text-xs text-brand-gold uppercase tracking-widest font-bold mt-1">
                  {testimonials[activeIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sliders navigation buttons */}
        <div className="flex items-center space-x-5 mt-10">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-brand-brown/20 bg-brand-lightBg flex items-center justify-center hover:bg-brand-red hover:text-brand-lightBg hover:border-brand-red transition-all duration-300 shadow-sm"
            aria-label="Previous Testimonial"
          >
            <ArrowLeft size={20} className="text-brand-brown hover:text-inherit" />
          </button>
          <div className="flex space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-brand-red w-8' : 'bg-brand-brown/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-brand-brown/20 bg-brand-lightBg flex items-center justify-center hover:bg-brand-red hover:text-brand-lightBg hover:border-brand-red transition-all duration-300 shadow-sm"
            aria-label="Next Testimonial"
          >
            <ArrowRight size={20} className="text-brand-brown hover:text-inherit" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default HomeTestimonials;
