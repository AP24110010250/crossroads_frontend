import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Clock, ArrowUp, ExternalLink } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const branches = [
    {
      name: 'Governorpet (Head Office)',
      address: '27/6/141 Prakasam Road, Governorpet, Vijayawada',
      phone: '73373 74444',
      map: 'https://www.google.com/maps?q=27/6/141+Prakasam+Road+Governor+Peta+Vijayawada+520002'
    },
    {
      name: 'Moghalrajapuram',
      address: 'Siddhartha College Rd, Beside Jemmi Chettu, Vijayawada',
      phone: '73373 72222',
      map: 'https://www.google.com/maps?q=32-9-18/2+Siddhartha+College+Road+Moghalrajapuram+Vijayawada+520010'
    },
    {
      name: 'Gollapudi',
      address: 'Near One Centre, Hyderabad Highway, Gollapudi',
      phone: '73373 71111',
      map: 'https://www.google.com/maps?q=Door+No+6-44/1+Gollapudi+Vijayawada'
    },
    {
      name: 'Gannavaram (Airport)',
      address: 'Chennai–Kolkata Highway, Kesarapalli',
      phone: '77770 21234',
      map: 'https://www.google.com/maps?q=Chennai+Kolkata+Highway+Gannavaram+Kesarapalli+521102'
    }
  ];

  return (
    <footer className="relative bg-brand-beige border-t border-brand-brown/10 text-brand-brown/85 pt-20 pb-8 px-6 md:px-12 z-10 overflow-hidden shadow-inner">
      {/* Red accent line on top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand identity column */}
        <div className="flex flex-col space-y-6">
          <Link to="/" className="flex flex-col">
            <span className="font-playfair text-3xl font-bold tracking-widest text-brand-red">
              CROSS ROADS
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-brown/60 -mt-1 font-bold">
              Restaurant & Sweets
            </span>
          </Link>
          <p className="text-base text-brand-brown/85 leading-relaxed font-semibold">
            "Not just a stop. It's a destination for flavour." Serving authentic Andhra heritage, family recipes, and local sweets counters for 25 years.
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/crossroads_restaurant__/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white border border-brand-brown/10 flex items-center justify-center hover:bg-brand-red hover:text-brand-lightBg transition-all duration-300 shadow-sm"
              aria-label="Instagram"
            >
              <Instagram size={24} className="text-brand-brown hover:text-brand-lightBg transition-colors" />
            </a>
          </div>
        </div>

        {/* Branches list column */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <h3 className="font-playfair text-2xl font-bold text-brand-red tracking-wide border-b border-brand-brown/10 pb-2">
            Our Locations in Vijayawada
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((b) => (
              <div key={b.name} className="flex flex-col space-y-2 text-sm md:text-base">
                <span className="font-bold text-brand-brown tracking-wide text-base">{b.name}</span>
                <span className="text-brand-brown/80 flex items-start gap-1.5 leading-relaxed">
                  <MapPin size={18} className="shrink-0 mt-1 text-brand-red" />
                  <span>{b.address}</span>
                </span>
                <span className="text-brand-brown/85 flex items-center gap-1.5">
                  <Phone size={18} className="text-brand-red" />
                  <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="hover:text-brand-red font-bold transition-colors">{b.phone}</a>
                </span>
                <a 
                  href={b.map} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-brand-red hover:text-brand-gold flex items-center gap-1 mt-1 font-extrabold"
                >
                  <span>Google Maps Location</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Timings & Links Column */}
        <div className="flex flex-col space-y-6">
          <h3 className="font-playfair text-2xl font-bold text-brand-red tracking-wide border-b border-brand-brown/10 pb-2">
            Operating Hours
          </h3>
          <div className="flex items-start gap-2.5 text-base text-brand-brown/95">
            <Clock size={24} className="text-brand-red mt-1 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold">Daily Operations</span>
              <span className="text-brand-brown/75 font-semibold">11:00 AM - 11:00 PM</span>
              <span className="text-brand-gold font-bold text-xs mt-1">Dine-in, Takeaway & Delivery</span>
            </div>
          </div>

          <h3 className="font-playfair text-2xl font-bold text-brand-red tracking-wide border-b border-brand-brown/10 pb-2 pt-2">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm uppercase tracking-widest font-bold text-brand-brown/80">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-brand-red transition-colors">Menu</Link>
            <Link to="/gallery" className="hover:text-brand-red transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-brand-red transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-brand-red transition-colors">Contact</Link>
            <Link to="/admin" className="hover:text-brand-red transition-colors">Admin Area</Link>
          </div>
        </div>
      </div>

      <hr className="border-brand-brown/10 mb-8" />

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-brand-brown/80 font-bold">
        <span>&copy; {new Date().getFullYear()} Cross Roads Restaurant & Sweets. All Rights Reserved.</span>
        <div className="flex items-center mt-4 md:mt-0">
          <button 
            onClick={scrollToTop} 
            className="w-12 h-12 bg-white border border-brand-brown/20 hover:bg-brand-red text-brand-brown hover:text-brand-lightBg rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
            title="Back to Top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
