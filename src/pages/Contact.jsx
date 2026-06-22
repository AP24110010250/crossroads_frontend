import React, { useState } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/animations/SmoothScroll';
import { getImageUrl } from '../utils/imageHelper';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const branches = [
    {
      name: 'Governorpet Branch',
      address: '27/6/141 Prakasam Road, Governor Peta, Vijayawada 520002. Near LIC Building.',
      phone: '73373 74444 / +91 866 257 2424',
      map: 'https://www.google.com/maps?q=27/6/141+Prakasam+Road+Governor+Peta+Vijayawada+520002'
    },
    {
      name: 'Moghalrajapuram Branch',
      address: '32-9-18/2, Siddhartha College Rd, Moghalrajapuram, Vijayawada 520010. Beside Jemmi Chettu.',
      phone: '73373 72222 / 95816 05555',
      map: 'https://www.google.com/maps?q=32-9-18/2+Siddhartha+College+Road+Moghalrajapuram+Vijayawada+520010'
    },
    {
      name: 'Gollapudi Highway Branch',
      address: 'Door No 6-44/1, Near One Centre, Hyderabad Highway Road, Gollapudi 521225. Opposite granites showroom.',
      phone: '73373 71111 / 77992 01111',
      map: 'https://www.google.com/maps?q=Door+No+6-44/1+Gollapudi+Vijayawada'
    },
    {
      name: 'Gannavaram Airport Branch',
      address: 'Chennai – Kolkata Hwy, Gannavaram, Kesarapalli 521102. 5 minutes from Airport.',
      phone: '77770 21234',
      map: 'https://maps.app.goo.gl/jmLDuCbQ5NPEN'
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-brand-lightBg text-brand-brown flex flex-col pt-[72px]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-20 bg-brand-beige border-b border-brand-brown/5 flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <img src={getImageUrl('/placeholders/family-dining.webp')} alt="Background" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl">
            <span className="text-brand-red font-telugu text-lg md:text-2xl font-bold mb-2">
              సలహాలు & సంప్రదింపులు — మమ్మల్ని కలవండి
            </span>
            <span className="text-brand-gold uppercase tracking-[0.4em] font-bold text-xs">
              Reach Out
            </span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mt-2 text-brand-brown leading-tight">
              Contact <span className="text-brand-red italic">Us</span>
            </h1>
          </div>
        </section>

        {/* Info & Form splits */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            <div className="flex flex-col space-y-4">
              <h2 className="font-playfair text-4xl md:text-5xl font-black text-brand-brown leading-tight">
                Contact Details
              </h2>
              <p className="text-brand-muted text-base md:text-lg leading-relaxed font-semibold">
                Connect with our head office at Governorpet or call individual branch managers for takeaway or table availability checks.
              </p>
            </div>

            <div className="flex flex-col space-y-8">
              {/* Phone info */}
              <div className="flex gap-5 p-6 md:p-8 rounded-xl bg-brand-beige border border-brand-brown/10 shadow-md">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Phone size={28} className="text-brand-red" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <span className="text-sm text-brand-gold uppercase font-black tracking-widest">Catering & Bookings</span>
                  <a href="tel:7337374444" className="text-xl md:text-2xl text-brand-brown hover:text-brand-red font-black">73373 74444</a>
                  <span className="text-sm text-brand-muted font-bold">
                    Email: <a href="mailto:catering@crossroadshotel.in" className="hover:text-brand-red underline transition-colors">catering@crossroadshotel.in</a>
                  </span>
                </div>
              </div>

              {/* Timing info */}
              <div className="flex gap-5 p-6 md:p-8 rounded-xl bg-brand-beige border border-brand-brown/10 shadow-md">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Clock size={28} className="text-brand-red" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <span className="text-sm text-brand-gold uppercase font-black tracking-widest">Working Hours</span>
                  <span className="font-black text-brand-brown text-xl md:text-2xl">11:00 AM - 11:00 PM</span>
                  <span className="text-sm text-brand-muted font-bold">All 7 Days (Dine-in, Delivery, Takeaway)</span>
                </div>
              </div>

              {/* Social info */}
              <div className="flex gap-5 p-6 md:p-8 rounded-xl bg-brand-beige border border-brand-brown/10 shadow-md">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Mail size={28} className="text-brand-red" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <span className="text-sm text-brand-gold uppercase font-black tracking-widest">Online Presence</span>
                  <a href="https://www.instagram.com/crossroads_restaurant__/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red font-black text-lg md:text-xl">@crossroads_restaurant__</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-brand-beige border border-brand-brown/10 p-10 md:p-12 rounded-2xl glass-card-gold relative flex flex-col justify-center shadow-lg">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col space-y-6"
                >
                  <h3 className="font-playfair text-3xl md:text-4xl font-black text-brand-brown mb-4">Send Us A Message</h3>
                  
                  {/* Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm uppercase tracking-wider font-black text-brand-brown">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="w-full bg-white border-2 border-brand-brown/10 hover:border-brand-brown/25 focus:border-brand-red rounded-lg px-5 py-4.5 text-sm md:text-base text-brand-brown focus:outline-none transition-colors shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm uppercase tracking-wider font-black text-brand-brown">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. name@example.com"
                        className="w-full bg-white border-2 border-brand-brown/10 hover:border-brand-brown/25 focus:border-brand-red rounded-lg px-5 py-4.5 text-sm md:text-base text-brand-brown focus:outline-none transition-colors shadow-xs"
                      />
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm uppercase tracking-wider font-black text-brand-brown">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 99999 99999"
                        className="w-full bg-white border-2 border-brand-brown/10 hover:border-brand-brown/25 focus:border-brand-red rounded-lg px-5 py-4.5 text-sm md:text-base text-brand-brown focus:outline-none transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm uppercase tracking-wider font-black text-brand-brown">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="How can we help you? Write your details..."
                      className="w-full bg-white border-2 border-brand-brown/10 hover:border-brand-brown/25 focus:border-brand-red rounded-lg px-5 py-4.5 text-sm md:text-base text-brand-brown focus:outline-none transition-colors shadow-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-brand-red hover:bg-[#89141D] text-brand-lightBg font-extrabold uppercase tracking-widest text-sm rounded-lg flex items-center justify-center gap-2.5 border-2 border-brand-red/20 shadow-md disabled:opacity-50 transition-colors duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Send size={16} />
                      <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8 space-y-4"
                >
                  <div className="text-brand-gold w-20 h-20 flex items-center justify-center bg-brand-gold/15 rounded-full shadow-sm">
                    <CheckCircle2 size={40} className="text-brand-red" />
                  </div>
                  <h3 className="font-playfair text-3xl font-bold text-brand-brown">Message Sent!</h3>
                  <p className="text-base text-brand-muted max-w-sm leading-relaxed font-semibold">
                    Thank you for reaching out to Cross Roads, <span className="text-brand-brown font-bold">{formData.name}</span>. We will review your message and get back to you shortly.
                  </p>
                  <button 
                    onClick={() => { setSuccess(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
                    className="px-8 py-3.5 border-2 border-brand-brown/20 hover:border-brand-red rounded-lg text-sm uppercase tracking-widest font-extrabold transition-colors bg-white shadow-md"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </section>

        {/* Branch Network Details Section */}
        <section className="py-20 px-6 md:px-12 bg-brand-beige border-t border-brand-brown/5 z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-brown text-center mb-16">
              Our Physical Branches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {branches.map((b) => (
                <div key={b.name} className="p-6 rounded-lg bg-brand-lightBg border border-brand-brown/10 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-playfair font-bold text-xl text-brand-red">{b.name}</h3>
                    <span className="text-xs md:text-sm text-brand-muted leading-relaxed flex items-start gap-1.5">
                      <MapPin size={16} className="shrink-0 mt-0.5 text-brand-red" />
                      <span>{b.address}</span>
                    </span>
                    <span className="text-xs md:text-sm text-brand-muted flex items-center gap-1.5 font-semibold">
                      <Phone size={16} className="text-brand-red" />
                      <span>{b.phone}</span>
                    </span>
                  </div>
                  <div className="pt-3 border-t border-brand-brown/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                    <span className="text-brand-brown/65">Open Daily: 11:00 AM - 11:00 PM</span>
                    <a 
                      href={b.map} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-red hover:text-brand-gold flex items-center gap-1 font-bold"
                    >
                      <span>Get Directions</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Contact;
