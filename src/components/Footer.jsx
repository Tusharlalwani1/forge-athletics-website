import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrialModal } from './TrialForm/useTrialModal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openTrialModal } = useTrialModal();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-charcoal border-t border-charcoal-line text-steel mt-auto"
    >
      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.15 }}
              className="inline-block"
            >
              <Link to="/" className="inline-block focus-visible:rounded">
                <span className="text-display text-3xl text-chalk tracking-wider group-hover:text-white transition-colors duration-150">
                  FORGE<span className="text-blaze">.</span>
                </span>
              </Link>
            </motion.div>
            <p className="text-sm text-steel leading-relaxed">
              Forging elite fitness & relentless strength through high-intensity functional training.
            </p>
            <div>
              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="inline-block"
              >
                <button
                  type="button"
                  onClick={openTrialModal}
                  className="inline-flex items-center justify-center bg-blaze hover:bg-blaze-dim text-chalk text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors duration-150 focus-visible:rounded shadow-md hover:shadow-blaze/20 cursor-pointer"
                >
                  Start Free Trial
                </button>
              </motion.div>
            </div>
          </div>

          {/* Column 2: Site Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-steel-dim">
              Site
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Classes', path: '/classes' },
                { name: 'Membership', path: '/membership' },
                { name: 'Coaches', path: '/coaches' },
                { name: 'Transformations', path: '/transformations' },
                { name: 'Location', path: '/location' },
                { name: 'Free Trial', path: '/free-trial' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-chalk transition-colors duration-150 focus-visible:rounded inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-steel-dim">
              Visit
            </h3>
            <div className="text-sm space-y-2">
              <p className="text-steel">
                842 Ironworks Way, Suite 100<br />
                Austin, TX 78701
              </p>
              <p>
                <a
                  href="tel:+15125550199"
                  className="hover:text-chalk transition-colors duration-150 focus-visible:rounded inline-block"
                >
                  (512) 555-0199
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@forgeathletics.com"
                  className="hover:text-chalk transition-colors duration-150 focus-visible:rounded inline-block"
                >
                  info@forgeathletics.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Follow */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-steel-dim">
              Follow
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                {
                  name: 'Instagram',
                  href: 'https://instagram.com',
                  svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
                },
                {
                  name: 'Facebook',
                  href: 'https://facebook.com',
                  svgPath: 'M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z'
                },
                {
                  name: 'TikTok',
                  href: 'https://tiktok.com',
                  svgPath: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'
                }
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-blaze transition-colors duration-150 focus-visible:rounded group"
                  >
                    <motion.svg
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="w-4 h-4 fill-current text-blaze group-hover:text-blaze-dim transition-colors duration-150"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.svgPath} />
                    </motion.svg>
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-line py-6 bg-charcoal-raised">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel-dim">
          <p>© {currentYear} FORGE ATHLETICS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-chalk transition-colors duration-150 focus-visible:rounded">
              Privacy Policy
            </Link>
            <a href="#terms" className="hover:text-chalk transition-colors duration-150 focus-visible:rounded">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
