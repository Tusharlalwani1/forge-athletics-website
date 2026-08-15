import React from 'react';
import { motion } from 'framer-motion';

// Specialty groups for chip-style filtering
const SPECIALTY_GROUPS = [
  { id: 'all', label: 'All Coaches' },
  { id: 'CrossFit', label: 'CrossFit' },
  { id: 'Olympic Weightlifting', label: 'Olympic Lifting' },
  { id: 'Endurance & Conditioning', label: 'Endurance', matchKey: 'Aerobic Conditioning' },
  { id: 'Mobility & Flexibility', label: 'Mobility' },
  { id: 'Beginner Onboarding', label: 'Foundations' },
  { id: 'Powerlifting', label: 'Powerlifting' },
];

export default function CoachFilterBar({ activeFilter, onFilterChange, coaches }) {
  // Collect all specialties present in coach data
  const presentSpecialties = new Set(coaches.flatMap((c) => c.specialties));

  const visibleGroups = SPECIALTY_GROUPS.filter(
    (g) => g.id === 'all' || presentSpecialties.has(g.id) || presentSpecialties.has(g.matchKey)
  );

  const handleFilter = (groupId) => {
    onFilterChange(groupId);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center" role="toolbar" aria-label="Filter coaches by specialty">
      {visibleGroups.map((group) => {
        const isActive = activeFilter === group.id;
        return (
          <motion.button
            key={group.id}
            type="button"
            onClick={() => handleFilter(group.id)}
            aria-pressed={isActive}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-colors duration-150 cursor-pointer focus-visible:outline-none ${
              isActive
                ? 'bg-blaze border-blaze text-chalk'
                : 'bg-transparent border-charcoal-line text-steel hover:border-steel hover:text-chalk'
            }`}
          >
            {group.label}
          </motion.button>
        );
      })}
    </div>
  );
}
