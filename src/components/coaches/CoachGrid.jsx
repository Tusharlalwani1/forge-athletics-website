import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/motion';

export default function CoachGrid({ coaches, onSelectCoach }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {coaches.map((coach) => (
          <motion.div
            key={coach.id}
            layout
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={() => onSelectCoach(coach)}
              className="w-full h-full text-left border border-charcoal-line bg-charcoal-raised p-6 rounded-lg hover:border-blaze hover:shadow-lg hover:shadow-blaze/5 transition-all duration-200 focus-visible:outline-none cursor-pointer group flex flex-col"
              aria-label={`View ${coach.name}'s full profile`}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-charcoal-line bg-charcoal group-hover:border-blaze/60 transition-colors duration-200">
                  <span className="text-display text-xl text-blaze">{coach.initials}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-chalk truncate">
                    {coach.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-blaze mt-0.5 truncate">
                    {coach.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-4 text-sm leading-relaxed text-steel flex-1 line-clamp-3">
                {coach.bio}
              </p>

              {/* Specialty Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {coach.specialties.slice(0, 3).map((spec) => (
                  <span
                    key={spec}
                    className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-charcoal-line text-steel-dim rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* View Profile prompt */}
              <p className="mt-4 text-xs font-semibold text-steel group-hover:text-blaze transition-colors uppercase tracking-wider">
                View Full Profile →
              </p>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {coaches.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full flex items-center justify-center py-16 text-center text-sm text-steel-dim border border-dashed border-charcoal-line rounded-lg"
        >
          No coaches match this specialty filter.
        </motion.div>
      )}
    </motion.div>
  );
}
