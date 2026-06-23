import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-card border-b border-brand-brown/10 py-5 px-6 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex flex-col group cursor-pointer">
        <motion.span 
          className="font-playfair text-2xl md:text-3xl font-bold tracking-widest text-brand-red"
          whileHover={{ scale: 1.02, color: '#B58E3D' }}
          transition={{ duration: 0.2 }}
        >
          CROSS ROADS
        </motion.span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-brown/50 -mt-1 group-hover:text-brand-gold transition-colors duration-300 font-semibold">
          Restaurant & Sweets
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-14">
        {links.map((link) => (
          <NavLink 
            key={link.name} 
            to={link.path}
            className={({ isActive }) => 
              `relative text-[17px] uppercase tracking-widest font-extrabold hover:text-brand-red transition-colors duration-300 ${
                isActive ? 'text-brand-red font-black' : 'text-brand-brown/85'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                {isActive && (
                  <motion.div 
                    className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-brand-red"
                    layoutId="activeUnderline"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Action CTA & Admin Links */}
      <div className="hidden md:flex items-center space-x-8">
        {isAuthenticated ? (
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-base font-extrabold text-brand-gold hover:text-brand-red transition-colors duration-300 flex items-center gap-1.5">
              <User size={20} />
              <span>Admin</span>
            </Link>
            <button 
              onClick={logout}
              className="text-sm uppercase tracking-widest font-extrabold border border-brand-brown/20 hover:border-brand-red px-5 py-2.5 rounded bg-transparent hover:bg-brand-red/5 text-brand-brown transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/admin" className="text-brand-brown/60 hover:text-brand-red transition-colors duration-300" title="Admin Login">
            <User size={22} />
          </Link>
        )}
        
        <Link to="/#reserve">
          <motion.button
            className="px-8 py-4 bg-brand-red text-brand-lightBg uppercase tracking-widest text-sm font-extrabold rounded gold-glow-hover flex items-center space-x-2 border border-brand-red/10 shadow-sm"
            whileHover={{ scale: 1.05, backgroundColor: '#89141D' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Book A Table</span>
            <ArrowRight size={18} />
          </motion.button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-brand-brown focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-x-0 top-[76px] bg-brand-lightBg/95 border-b border-brand-brown/10 backdrop-blur-xl p-8 flex flex-col space-y-6 md:hidden z-40 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-5">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-wider text-brand-brown hover:text-brand-red font-bold transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <Link to="/#reserve" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-4 bg-brand-red text-brand-lightBg uppercase tracking-widest text-sm font-bold rounded flex items-center justify-center space-x-2">
                <span>Book A Table</span>
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
