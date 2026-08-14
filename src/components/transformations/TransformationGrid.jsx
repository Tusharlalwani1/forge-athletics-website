import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { GOAL_TYPE_LABELS } from './transformationsData';

const GOAL_COLORS = {
  'weight-loss': 'text-tape border-tape/40 bg-tape/10',
  strength: 'text-blaze border-blaze/40 bg-blaze/10',
  flexibility: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  endurance: 'text-sky-400 border-sky-500/40 bg-sky-500/10',
};

function GoalBadge({ goalType }) {
  const label = GOAL_TYPE_LABELS[goalType] || goalType;
  const color = GOAL_COLORS[goalType] || 'text-steel border-charcoal-line bg-charcoal';
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${color}`}
    >
      {label}
    </span>
  );
}

export { GoalBadge };

export default function TransformationGrid({ transformations, onSelectEntry }) {
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
        {transformations.map((entry) => (
          <motion.div
            key={entry.id}
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
              onClick={() => onSelectEntry(entry)}
              className="w-full h-full text-left border border-charcoal-line bg-charcoal-raised rounded-lg hover:border-blaze hover:shadow-lg hover:shadow-blaze/5 transition-all duration-200 focus-visible:outline-none cursor-pointer group flex flex-col overflow-hidden"
              aria-label={`View ${entry.name}'s full transformation story`}
            >
              {/* Before → After Placeholder Block */}
              <div className="flex h-40 w-full items-center justify-center gap-3 border-b border-dashed border-charcoal-line bg-charcoal">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-steel-dim">Before</span>
                  <div className="h-16 w-16 rounded border border-dashed border-charcoal-line bg-charcoal-raised flex items-center justify-center">
                    <span className="text-[9px] text-steel-dim text-center leading-tight px-1">Photo<br />pending</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="h-5 w-5 text-blaze" aria-hidden="true" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-steel-dim">After</span>
                  <div className="h-16 w-16 rounded border border-dashed border-charcoal-line bg-charcoal-raised flex items-center justify-center">
                    <span className="text-[9px] text-steel-dim text-center leading-tight px-1">Photo<br />pending</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                {/* Goal badge + timeframe */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <GoalBadge goalType={entry.goalType} />
                  <span className="text-[11px] font-mono text-steel-dim">
                    {entry.timeframeWeeks} weeks
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-steel flex-1 line-clamp-3 italic">
                  &ldquo;{entry.quote}&rdquo;
                </p>

                {/* Stat preview (if present) */}
                {entry.startStat && entry.endStat && (
                  <div className="flex items-center gap-2 text-[11px] font-mono border-t border-charcoal-line/50 pt-3 mt-auto">
                    <span className="text-steel-dim truncate">{entry.startStat}</span>
                    <ArrowRight className="h-3 w-3 text-blaze shrink-0" aria-hidden="true" />
                    <span className="text-chalk font-semibold truncate">{entry.endStat}</span>
                  </div>
                )}

                {/* Name + CTA prompt */}
                <div className="flex items-center justify-between pt-2 border-t border-charcoal-line/40">
                  <span className="text-xs font-bold uppercase tracking-wide text-chalk">{entry.name}</span>
                  <span className="text-xs font-semibold text-steel group-hover:text-blaze transition-colors">
                    Read story →
                  </span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {transformations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full flex items-center justify-center py-16 text-sm text-steel-dim border border-dashed border-charcoal-line rounded-lg"
        >
          No results for this goal type yet.
        </motion.div>
      )}
    </motion.div>
  );
}
