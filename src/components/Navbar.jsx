import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrialModal } from './TrialForm/useTrialModal';

const navLinks = [
  { name: 'Classes', path: '/classes' },
  { name: 'Membership', path: '/membership' },
  { name: 'Coaches', path: '/coaches' },
  { name: 'Transformations', path: '/transformations' },
  { name: 'Location', path: '/location' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openTrialModal } = useTrialModal();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-charcoal/90 backdrop-blur-md border-b border-charcoal-line transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          <Link 
            to="/" 
            aria-label="Forge Athletics Home" 
            className="group flex items-center gap-1 focus-visible:rounded"
          >
            <span className="text-display text-3xl sm:text-4xl text-chalk tracking-wider group-hover:text-white transition-colors duration-150">
              FORGE<span className="text-blaze">.</span>
            </span>
          </Link>
        </motion.div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-chalk focus-visible:rounded px-1 py-1 ${
                    isActive ? 'text-chalk border-b-2 border-blaze' : 'text-steel'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right: Free Trial CTA + Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Start Free Trial CTA - Opens Modal */}
          <motion.div
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <button
              type="button"
              onClick={openTrialModal}
              className="inline-flex items-center justify-center bg-blaze hover:bg-blaze-dim text-chalk text-xs sm:text-sm font-bold uppercase tracking-wider px-3 sm:px-5 py-2.5 rounded-sm transition-all duration-150 shadow-md hover:shadow-blaze/20 focus-visible:rounded cursor-pointer"
            >
              Start Free Trial
            </button>
          </motion.div>

          {/* Mobile Hamburger Toggle Button (< md) */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 text-chalk hover:text-blaze focus:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded transition-colors duration-150 cursor-pointer"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between items-center overflow-hidden">
              <span
                className={`w-full h-0.5 bg-current rounded transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Expandable Panel (< md) */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="md:hidden border-t border-charcoal-line bg-charcoal-raised px-4 pt-3 pb-6 space-y-2 shadow-2xl"
          id="mobile-menu"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            <Link
              to="/"
              className={`px-3 py-2.5 rounded-md text-base font-semibold uppercase tracking-wider transition-colors duration-150 ${
                location.pathname === '/' ? 'text-blaze bg-charcoal' : 'text-steel hover:text-chalk hover:bg-charcoal/50'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2.5 rounded-md text-base font-semibold uppercase tracking-wider transition-colors duration-150 ${
                    isActive ? 'text-blaze bg-charcoal' : 'text-steel hover:text-chalk hover:bg-charcoal/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openTrialModal();
              }}
              className="text-left px-3 py-2.5 rounded-md text-base font-semibold uppercase tracking-wider text-blaze hover:bg-charcoal/50 transition-colors duration-150 cursor-pointer"
            >
              Start Free Trial
            </button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
