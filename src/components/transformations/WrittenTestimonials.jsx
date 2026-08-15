import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { WRITTEN_TESTIMONIALS } from './transformationsData';

export default function WrittenTestimonials() {
  return (
    <section className="mt-20 border-t border-charcoal-line pt-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            Community Voices
          </span>
          <h3 className="text-display mt-1 text-2xl text-chalk sm:text-3xl">
            WHAT MEMBERS <span className="text-blaze">SAY</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-steel">
            Not every transformation shows up in a photo. Some of the most meaningful changes
            happen in confidence, consistency, and daily energy.
          </p>
        </motion.div>

        {/* Testimonials grid — visually lighter than the main transformation cards */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WRITTEN_TESTIMONIALS.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 rounded-lg border border-charcoal-line/60 bg-charcoal p-5 hover:border-blaze/40 transition-colors"
            >
              {/* Decorative Quote icon */}
              <Quote
                className="h-5 w-5 text-blaze/50 shrink-0"
                aria-hidden="true"
              />

              {/* Quote text */}
              <p className="text-sm leading-relaxed text-steel flex-1 italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Attribution */}
              <p className="text-xs font-bold uppercase tracking-wide text-chalk border-t border-charcoal-line/40 pt-3 mt-auto">
                — {item.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
