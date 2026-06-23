import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { getImageUrl } from '../../utils/imageHelper';
import axios from 'axios';
import { usePageImages } from '../../context/ImageContext';

const HomeBranches = () => {
  const { getDynamicImage } = usePageImages();
  
  const hardcodedBranches = [
    {
      name: 'Governorpet',
      address: '27/6/141 Prakasam Road, Governorpet, Vijayawada 520002',
      phone: '73373 74444 / 0866 257 2424',
      timings: '11:00 AM - 11:00 PM',
      googleMapsLink: 'https://www.google.com/maps?q=27/6/141+Prakasam+Road+Governor+Peta+Vijayawada+520002',
      description: 'Our flagship legacy branch near LIC Building. A favorite family spot for 25 years.',
      image: '/placeholders/hero-interior.webp'
    },
    {
      name: 'Moghalrajapuram',
      address: '32-9-18/2, Siddhartha College Rd, Moghalrajapuram, Vijayawada 520010',
      phone: '73373 72222 / 95816 05555',
      timings: '11:00 AM - 11:00 PM',
      googleMapsLink: 'https://www.google.com/maps?q=32-9-18/2+Siddhartha+College+Road+Moghalrajapuram+Vijayawada+520010',
      description: 'Sophisticated family dining space featuring retro Tollywood framing beside Jemmi Chettu.',
      image: '/placeholders/family-dining.webp'
    },
    {
      name: 'Gollapudi',
      address: 'Door No 6-44/1, Hyderabad Highway, Gollapudi 521225',
      phone: '73373 71111 / 77992 01111',
      timings: '11:00 AM - 11:00 PM',
      googleMapsLink: 'https://www.google.com/maps?q=Door+No+6-44/1+Gollapudi+Vijayawada',
      description: 'Spacious highway outlet with ample parking, famous for our legendary unlimited meals.',
      image: '/placeholders/hero-food.webp'
    },
    {
      name: 'Gannavaram',
      address: 'Chennai–Kolkata Highway, Gannavaram, Kesarapalli 521102',
      phone: '77770 21234',
      timings: '11:00 AM - 11:00 PM',
      googleMapsLink: 'https://maps.app.goo.gl/jmLDuCbQ5NPEN',
      description: 'Premium airport corridor branch, renowned for authentic breakfast and sweet counters.',
      image: '/placeholders/sweets-counter.webp'
    }
  ];

  const [branches, setBranches] = useState(hardcodedBranches);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    axios.get(`${API_URL}/branches`)
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setBranches(res.data.data);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch branches from API, using hardcoded fallback.', err.message);
      });
  }, []);

  return (
    <section className="bg-brand-lightBg py-28 px-6 md:px-12 relative z-10 border-b border-brand-brown/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-4">
          <div className="flex flex-col">
            <span className="text-brand-gold font-telugu text-lg md:text-2xl font-bold mb-2">
              శాఖల అనుసంధానం — విజయవాడ నడిబొడ్డున
            </span>
            <span className="text-brand-red uppercase tracking-[0.4em] font-bold text-xs md:text-sm">
              Our Physical Presence
            </span>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-brand-brown mt-3 leading-tight">
              Vijayawada Branch <span className="text-brand-red italic">Network</span>
            </h2>
          </div>
          <p className="text-brand-muted text-sm max-w-md leading-relaxed font-semibold">
            Four premium locations across the city, designed to offer the same legendary taste, family warmth, and heritage recipes.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {branches.map((b) => {
            const mappedDesc = b.description || b.desc;
            const mappedMapLink = b.googleMapsLink || b.mapLink;
            // Retrieve dynamic branch image (checking custom setting first, then branch doc image)
            const dynamicImg = getDynamicImage(`home_branch_${b.name.toLowerCase()}`, b.image);

            return (
              <motion.div
                key={b.name}
                className="flex flex-col sm:flex-row bg-brand-beige border border-brand-brown/10 rounded-lg overflow-hidden glass-card-gold hover:border-brand-gold/30 transition-all duration-300 shadow-sm"
                whileHover={{ y: -6 }}
              >
                {/* Image segment */}
                <div className="w-full sm:w-2/5 h-52 sm:h-auto overflow-hidden relative min-h-[220px]">
                  <img 
                    src={getImageUrl(dynamicImg)} 
                    alt={b.name} 
                    className="w-full h-full object-cover filter brightness-95 hover:scale-103 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-brown/5" />
                </div>

                {/* Content segment */}
                <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-playfair text-2xl font-bold text-brand-brown">
                      {b.name}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                      {mappedDesc}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2.5 text-xs md:text-sm text-brand-brown/90 font-medium">
                    {/* Address */}
                    <div className="flex items-start gap-2">
                      <MapPin size={18} className="text-brand-red shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm">{b.address}</span>
                    </div>
                    
                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <Phone size={18} className="text-brand-red shrink-0" />
                      <a href={`tel:${b.phone.split('/')[0].trim().replace(/\s+/g, '')}`} className="hover:text-brand-red transition-colors text-xs md:text-sm font-semibold">
                        {b.phone}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-brand-red shrink-0" />
                      <span className="text-xs md:text-sm">{b.timings}</span>
                    </div>
                  </div>

                  {/* Google Maps Button */}
                  <div className="pt-3 border-t border-brand-brown/10">
                    <a 
                      href={mappedMapLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-gold transition-colors"
                    >
                      <span>Google Maps Directions</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeBranches;
