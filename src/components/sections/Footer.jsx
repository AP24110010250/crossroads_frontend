import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Clock, ArrowUp, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fallbackBranches = [
    {
      name: 'Governorpet (Head Office)',
      address: '27/6/141 Prakasam Road, Governor Peta, Vijayawada 520002',
      footerAddress: '27/6/141 Prakasam Road, Governorpet, Vijayawada',
      phone: '73373 74444 / +91 866 257 2424',
      footerPhone: '73373 74444',
      googleMapsLink: 'https://www.google.com/maps?q=27/6/141+Prakasam+Road+Governor+Peta+Vijayawada+520002'
    },
    {
      name: 'Moghalrajapuram',
      address: '32-9-18/2, Siddhartha College Rd, Near Madhu Kalyana Mantapam, Moghalrajapuram/Labbipet, Vijayawada 520010',
      footerAddress: 'Siddhartha College Rd, Beside Jemmi Chettu, Vijayawada',
      phone: '73373 72222 / 95816 05555',
      footerPhone: '73373 72222',
      googleMapsLink: 'https://www.google.com/maps?q=32-9-18/2+Siddhartha+College+Road+Moghalrajapuram+Vijayawada+520010'
    },
    {
      name: 'Gollapudi',
      address: 'Door No 6-44/1, Near One Centre, Hyderabad Highway Road, Gollapudi, Vijayawada 521225',
      footerAddress: 'Near One Centre, Hyderabad Highway, Gollapudi',
      phone: '73373 71111 / 77992 01111',
      footerPhone: '73373 71111',
      googleMapsLink: 'https://maps.app.goo.gl/jmLDuCbQ5NPEN'
    },
    {
      name: 'Gannavaram',
      address: 'Chennai – Kolkata Hwy, Gannavaram, Kesarapalli, Andhra Pradesh 521102',
      footerAddress: 'Chennai–Kolkata Highway, Kesarapalli',
      phone: '77770 21234',
      footerPhone: '77770 21234',
      googleMapsLink: 'https://www.google.com/maps?q=Chennai+Kolkata+Highway+Gannavaram+Kesarapalli+521102'
    }
  ];

  const [branches, setBranches] = useState(fallbackBranches);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    axios.get(`${API_URL}/branches`)
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setBranches(res.data.data);
        }
      })
      .catch(err => {
        console.warn('Failed to load footer branches from database, using seeded defaults.', err.message);
      });
  }, []);

  return (
    <footer className="relative bg-brand-beige border-t border-brand-brown/10 text-brand-brown/85 pt-12 pb-6 px-6 md:px-12 z-10 overflow-hidden shadow-inner">
      {/* Red accent line on top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">
        {/* Brand identity column */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="flex flex-col">
            <span className="font-playfair text-2xl font-bold tracking-widest text-brand-red">
              CROSS ROADS
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-brown/60 -mt-1 font-bold">
              Restaurant & Sweets
            </span>
          </Link>
          <p className="text-sm text-brand-brown/85 leading-relaxed font-semibold">
            "Not just a stop. It's a destination for flavour." Serving authentic Andhra heritage, family recipes, and local sweets counters for 25 years.
          </p>
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.instagram.com/crossroads_restaurant__/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-brand-brown/10 flex items-center justify-center hover:bg-brand-red hover:text-brand-lightBg transition-all duration-300 shadow-sm"
              aria-label="Instagram"
            >
              <Instagram size={18} className="text-brand-brown hover:text-brand-lightBg transition-colors" />
            </a>
          </div>
        </div>

        {/* Branches list column (Dynamic from database) */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-playfair text-xl font-bold text-brand-red tracking-wide border-b border-brand-brown/10 pb-1.5">
            Our Locations in Vijayawada
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
            {branches.map((b) => {
              const displayAddress = b.footerAddress || b.address;
              const displayPhone = b.footerPhone || b.phone;
              return (
                <div key={b.name} className="flex flex-col space-y-1.5">
                  <span className="font-bold text-brand-brown tracking-wide text-sm">{b.name}</span>
                  <span className="text-brand-brown/80 flex items-start gap-1 leading-normal">
                    <MapPin size={14} className="shrink-0 mt-0.5 text-brand-red" />
                    <span>{displayAddress}</span>
                  </span>
                  <span className="text-brand-brown/85 flex items-center gap-1">
                    <Phone size={14} className="text-brand-red" />
                    <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="hover:text-brand-red font-bold transition-colors">{displayPhone}</a>
                  </span>
                  <a 
                    href={b.googleMapsLink || b.map} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] text-brand-red hover:text-brand-gold flex items-center gap-0.5 mt-0.5 font-extrabold"
                  >
                    <span>Directions</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operating Hours Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-playfair text-xl font-bold text-brand-red tracking-wide border-b border-brand-brown/10 pb-1.5">
            Operating Hours
          </h3>
          <div className="flex items-start gap-2 text-sm text-brand-brown/95">
            <Clock size={20} className="text-brand-red mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold">Daily Operations</span>
              <span className="text-brand-brown/75 font-semibold">11:00 AM - 11:00 PM</span>
              <span className="text-brand-gold font-bold text-xs mt-0.5">Dine-in, Takeaway & Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-brand-brown/10 mb-4" />

      {/* Copyright row with Developer Info on the bottom-right corner and hidden phone number */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-brand-brown/80 font-bold gap-3">
        <div>
          <span>&copy; {new Date().getFullYear()} Cross Roads Restaurant & Sweets. All Rights Reserved.</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-wrap">
            <span>developed by Rupa Sri. Jerri</span>
            <a 
              href="tel:+918247034649" 
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-brand-red hover:text-brand-lightBg text-brand-red border border-brand-brown/15 rounded text-xs transition-all font-extrabold shadow-xs ml-1.5"
              title="Call Developer"
            >
              <Phone size={11} />
              <span>Contact</span>
            </a>
          </div>
          
          <button 
            onClick={scrollToTop} 
            className="w-9 h-9 bg-white border border-brand-brown/20 hover:bg-brand-red text-brand-brown hover:text-brand-lightBg rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
