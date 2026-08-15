import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, ShieldCheck, Flame, Activity, Unlock, HeartPulse, Clock } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { CLASS_TYPES } from './classesData';
import { DifficultyBadge } from './DifficultyLegend';

const ICON_MAP = {
  Dumbbell,
  ShieldCheck,
  Flame,
  Activity,
  Unlock,
  HeartPulse,
};

export default function ClassTypeDirectory({ selectedType, onSelectType }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-b border-charcoal-line">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blaze">
              Training Tracks
            </span>
            <h2 className="text-display mt-1 text-3xl text-chalk sm:text-4xl">
              CLASS <span className="text-blaze">DISCIPLINES</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-steel">
            Every session is programmed with clear intent and coached in real time. Select any discipline to filter the schedule below.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CLASS_TYPES.map((type) => {
            const IconComponent = ICON_MAP[type.iconName] || Dumbbell;
            const isSelected = selectedType === type.id;

            return (
              <motion.div key={type.id} variants={fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <button
                  type="button"
                  onClick={() => onSelectType(type.id)}
                  className={`group block h-full w-full text-left border p-6 transition-all duration-200 cursor-pointer focus-visible:outline-none ${
                    isSelected
                      ? 'border-blaze bg-charcoal-raised shadow-lg shadow-blaze/10'
                      : 'border-charcoal-line bg-charcoal-raised hover:border-blaze'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <IconComponent
                      className={`h-7 w-7 transition-transform duration-200 group-hover:-translate-y-0.5 ${
                        isSelected ? 'text-blaze scale-110' : 'text-blaze'
                      }`}
                      strokeWidth={1.75}
                    />
                    <DifficultyBadge level={type.difficulty} />
                  </div>

                  <h3 className="mt-4 text-base font-bold uppercase tracking-wide text-chalk">
                    {type.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-steel">
                    {type.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-charcoal-line/60 pt-4 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-steel-dim font-mono">
                      <Clock className="h-3.5 w-3.5 text-steel" />
                      {type.duration} mins
                    </span>
                    <span className={`font-semibold uppercase tracking-wider text-xs transition-colors ${
                      isSelected ? 'text-blaze' : 'text-steel group-hover:text-chalk'
                    }`}>
                      {isSelected ? 'Filtering Schedule ✓' : 'Filter Schedule →'}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
