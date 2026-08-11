import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';

function SpotsLeftCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, 3, {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          setCount(Math.round(value));
        },
        onComplete() {
          setCount(3);
        }
      });
      return () => controls.stop();
    }
  }, [isInView]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="scoreboard-value text-2xl sm:text-3xl font-bold font-mono text-chalk tracking-wider"
    >
      {String(count).padStart(2, '0')}
    </motion.span>
  );
}

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center max-w-5xl mx-auto w-full"
    >
      {/* Eyebrow Label */}
      <motion.span 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blaze mb-4 inline-block"
      >
        FORGE ATHLETICS
      </motion.span>

      {/* Main Display Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-display text-5xl sm:text-7xl lg:text-8xl text-chalk mb-6 leading-none relative"
      >
        Strength Is<br />
        <span className="relative inline-block text-blaze">
          {/* Subtle Ambient Glow behind 'Forged' */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 bg-blaze/40 blur-xl rounded-full -z-10 pointer-events-none"
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          Forged
        </span>, Not Found.
      </motion.h1>

      {/* Paragraph Explanation */}
      <motion.p 
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-steel text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Welcome to Forge Athletics. This foundational checkpoint verifies our core design system, bold color palette, typography hierarchy, and signature scoreboard UI elements.
      </motion.p>

      {/* Signature Element: Scoreboard Component */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="scoreboard rounded-sm p-4 sm:p-6 shadow-xl max-w-xl w-full mx-auto my-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-center">
          {/* Data Point 1 */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-steel-dim mb-1">
              Next Class
            </span>
            <span className="scoreboard-value text-2xl sm:text-3xl font-bold font-mono tracking-wider">
              06:00 AM
            </span>
          </div>

          {/* Vertical Divider Line with subtle pulsing bonus detail */}
          <motion.div
            className="hidden sm:block w-px h-10 bg-charcoal-line"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="block sm:hidden w-full h-px bg-charcoal-line"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Data Point 2 */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-steel-dim mb-1">
              Spots Left
            </span>
            <SpotsLeftCounter />
          </div>
        </div>
      </motion.div>

      {/* Quick Navigation Action Grid to test all routes with scroll-triggered reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 pt-8 border-t border-charcoal-line w-full"
      >
        <p className="text-xs uppercase tracking-widest text-steel-dim mb-4">
          Verify Site Routes
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'Classes', path: '/classes' },
            { label: 'Membership', path: '/membership' },
            { label: 'Coaches', path: '/coaches' },
            { label: 'Transformations', path: '/transformations' },
            { label: 'Location', path: '/location' },
            { label: 'Free Trial', path: '/free-trial' },
          ].map((route) => (
            <motion.div
              key={route.path}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Link
                to={route.path}
                className="bg-charcoal-raised border border-charcoal-line text-steel hover:text-chalk hover:border-blaze px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors duration-150 focus-visible:rounded inline-block shadow-sm hover:shadow-blaze/10"
              >
                {route.label} →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
