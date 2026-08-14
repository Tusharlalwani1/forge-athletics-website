import React from 'react';
import { motion } from 'framer-motion';
import { GOAL_TYPE_LABELS } from './transformationsData';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Results' },
  { id: 'strength', label: 'Strength' },
  { id: 'weight-loss', label: 'Weight Loss' },
  { id: 'endurance', label: 'Endurance' },
  { id: 'flexibility', label: 'Mobility' },
];

export default function TransformationFilterBar({ activeFilter, onFilterChange }) {
  return (
    <div
      className="flex flex-wrap gap-2 justify-center"
      role="toolbar"
      aria-label="Filter transformations by goal type"
    >
      {FILTER_OPTIONS.map((opt) => {
        const isActive = activeFilter === opt.id;
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onFilterChange(opt.id)}
            aria-pressed={isActive}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-colors duration-150 cursor-pointer focus-visible:outline-none ${
              isActive
                ? 'bg-blaze border-blaze text-chalk'
                : 'bg-transparent border-charcoal-line text-steel hover:border-steel hover:text-chalk'
            }`}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
