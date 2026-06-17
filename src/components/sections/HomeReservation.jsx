import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Calendar, Users, MapPin, Clock, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';

const HomeReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    branch: 'Governorpet',
    date: '',
    time: '19:30',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple validation
    if (!formData.name || !formData.phone || !formData.date) {
      setError('Please fill in your name, phone number, and reservation date.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/reservations`, formData);
      if (res.data.success) {
        setSuccess(true);
      } else {
        setError(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit reservation. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      guests: '2',
      branch: 'Governorpet',
      date: '',
      time: '19:30',
      notes: ''
    });
    setSuccess(false);
    setError(null);
  };

  return (
    <section id="reserve" className="bg-[#FAF6EE] py-28 px-6 md:px-12 relative z-10 scroll-mt-16 border-b border-brand-brown/5">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 text-brand-gold/5 font-telugu font-bold text-[14vw] leading-none pointer-events-none select-none">
        టేబుల్ బుకింగ్
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-brand-gold font-telugu text-lg md:text-2xl font-bold mb-2">
            ముందస్తు టేబుల్ రిజర్వేషన్ — ప్రత్యేక సదుపాయం
          </span>
          <span className="text-brand-red uppercase tracking-[0.4em] font-bold text-xs md:text-sm">
            Table Bookings
          </span>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mt-3 text-brand-brown">
            Reserve A <span className="text-brand-red italic">Luxury Table</span>
          </h2>
          <p className="text-brand-muted text-sm md:text-base mt-4 leading-relaxed">
            Select your preferred branch, specify your guest details, and book your destination for flavour. Our team will verify and confirm.
          </p>
          <div className="w-20 h-[2px] bg-brand-gold/40 mt-6" />
        </div>

        <div className="w-full bg-brand-beige border border-brand-brown/10 p-8 md:p-14 rounded-xl glass-card-gold relative shadow-sm">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="booking-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                {/* Error Banner */}
                {error && (
                  <div className="col-span-1 md:col-span-2 p-4 rounded bg-red-50 border border-red-200 text-red-800 text-xs md:text-sm flex items-center gap-2">
                    <AlertCircle size={20} className="shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown flex items-center gap-1.5">
                    <User size={16} className="text-brand-red" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown flex items-center gap-1.5">
                    <Phone size={16} className="text-brand-red" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 99999 99999"
                    required
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown flex items-center gap-1.5">
                    <User size={16} className="text-brand-red" />
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@example.com"
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  />
                </div>

                {/* Guests dropdown */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown flex items-center gap-1.5">
                    <Users size={16} className="text-brand-red" />
                    <span>Number of Guests *</span>
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'].map((num) => (
                      <option key={num} value={num}>{num} Guests</option>
                    ))}
                  </select>
                </div>

                {/* Branch dropdown */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown flex items-center gap-1.5">
                    <MapPin size={16} className="text-brand-red" />
                    <span>Select Branch *</span>
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  >
                    <option value="Governorpet">Governorpet (Original)</option>
                    <option value="Moghalrajapuram">Moghalrajapuram</option>
                    <option value="Gollapudi">Gollapudi (Highway)</option>
                    <option value="Gannavaram">Gannavaram (Airport)</option>
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown flex items-center gap-1.5">
                    <Calendar size={16} className="text-brand-red" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  />
                </div>

                {/* Time dropdown */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown flex items-center gap-1.5">
                    <Clock size={16} className="text-brand-red" />
                    <span>Preferred Time Slot *</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  >
                    {['11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-brand-brown">
                    Special Notes / Celebration Info (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="e.g. Birthday celebration, spice level preferences, baby seat requirements..."
                    className="w-full bg-white border border-brand-brown/10 hover:border-brand-brown/20 focus:border-brand-red rounded px-4 py-3.5 text-sm focus:outline-none text-brand-brown transition-colors shadow-sm"
                  />
                </div>

                {/* Submit button (Larger padded CTA button) */}
                <div className="md:col-span-2 pt-4 flex justify-center">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-4.5 bg-brand-red text-brand-lightBg uppercase tracking-widest text-xs font-bold rounded flex items-center justify-center gap-2 border border-brand-red/20 gold-glow-hover disabled:opacity-50"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Processing Booking...' : 'Request Table Reservation'}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-8 space-y-6"
              >
                <div className="text-brand-gold w-20 h-20 flex items-center justify-center bg-brand-gold/15 rounded-full shadow-sm">
                  <CheckCircle2 size={48} className="text-brand-red" />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <h3 className="font-playfair text-3xl font-bold text-brand-brown">
                    Reservation Requested!
                  </h3>
                  <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-brand-brown font-bold">{formData.name}</span>. We have received your request for <span className="text-brand-brown font-bold">{formData.guests} guests</span> at the <span className="text-brand-red font-bold">{formData.branch}</span> branch on <span className="text-brand-brown font-bold">{formData.date}</span> at <span className="text-brand-brown font-bold">{formData.time}</span>.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-brand-lightBg border border-brand-gold/30 text-brand-brown text-xs md:text-sm leading-relaxed max-w-md shadow-sm">
                  Our front-desk manager will verify available tables and send a confirmation call/SMS to <span className="text-brand-red font-bold">{formData.phone}</span> shortly.
                </div>

                <button 
                  onClick={resetForm}
                  className="px-8 py-3 border border-brand-brown/20 hover:border-brand-red text-xs uppercase tracking-widest font-bold rounded text-brand-brown transition-all duration-300 bg-white shadow-sm"
                >
                  Book Another Table
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default HomeReservation;
