import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import TrialForm from '../components/TrialForm/TrialForm';
import { EASE_OUT_EXPO } from '../lib/motion';

export default function FreeTrial() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-5xl mx-auto w-full">
      {/* Page Header */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="text-center mb-10 max-w-2xl"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-blaze mb-3 inline-block">
          FIRST WORKOUT ON US
        </span>
        <h1 className="text-display text-4xl sm:text-6xl lg:text-7xl text-chalk mb-4 leading-none">
          CLAIM YOUR FREE CLASS
        </h1>
        <p className="text-steel text-base sm:text-lg leading-relaxed">
          No commitment. No pressure. Just come try it.
        </p>
      </motion.div>

      {/* Main Grid: Form + Trust Bullets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full max-w-4xl items-start">
        {/* Form Container */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="lg:col-span-7 bg-charcoal-raised border border-charcoal-line p-6 sm:p-8 rounded-lg shadow-xl"
        >
          <TrialForm variant="page" />
        </motion.div>

        {/* Trust-Building Sidebar */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="lg:col-span-5 bg-charcoal/60 border border-charcoal-line p-6 sm:p-8 rounded-lg space-y-6 text-left"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-steel-dim">
            What to expect
          </h2>

          <ul className="space-y-4 text-sm text-chalk">
            <li className="flex items-start gap-3">
              <span className="text-blaze font-bold text-base shrink-0">✓</span>
              <span>
                <strong className="text-chalk font-semibold">No credit card required</strong>
                <p className="text-steel text-xs mt-0.5">Zero obligation or hidden fees to get started.</p>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blaze font-bold text-base shrink-0">✓</span>
              <span>
                <strong className="text-chalk font-semibold">All fitness levels welcome</strong>
                <p className="text-steel text-xs mt-0.5">Every workout is scaled to fit your current strength.</p>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blaze font-bold text-base shrink-0">✓</span>
              <span>
                <strong className="text-chalk font-semibold">Meet the coaches first</strong>
                <p className="text-steel text-xs mt-0.5">We'll review your goals and walk you through the gym layout.</p>
              </span>
            </li>
          </ul>

          <div className="pt-4 border-t border-charcoal-line">
            <div className="scoreboard p-4 rounded-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-steel-dim block mb-1">
                LOCATION
              </span>
              <p className="text-xs text-steel">
                842 Ironworks Way, Suite 100<br />
                Austin, TX 78701
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
