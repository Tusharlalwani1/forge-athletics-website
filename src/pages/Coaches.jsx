import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useCoaches } from '../hooks/useCoaches';
import CoachFilterBar from '../components/coaches/CoachFilterBar';
import CoachGrid from '../components/coaches/CoachGrid';
import CoachDetailModal from '../components/coaches/CoachDetailModal';
import { useTrialModal } from '../components/TrialForm/useTrialModal';
import { fadeUp } from '../lib/motion';

// Specialty groups + their match keys (must align with CoachFilterBar)
const FILTER_MATCH = {
  all: null,
  CrossFit: 'CrossFit',
  'Olympic Weightlifting': 'Olympic Weightlifting',
  'Endurance & Conditioning': 'Aerobic Conditioning',
  'Mobility & Flexibility': 'Mobility & Flexibility',
  'Beginner Onboarding': 'Beginner Onboarding',
  Powerlifting: 'Powerlifting',
};

export default function Coaches() {
  const { coaches } = useCoaches();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openTrialModal } = useTrialModal();

  const filteredCoaches = useMemo(() => {
    const list = coaches || [];
    if (activeFilter === 'all') return list;
    const matchKey = FILTER_MATCH[activeFilter] || activeFilter;
    return list.filter((c) => (c.specialties || []).includes(matchKey) || (c.specialties || []).includes(activeFilter));
  }, [activeFilter, coaches]);

  const handleSelectCoach = (coach) => {
    setSelectedCoach(coach);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-charcoal text-chalk flex flex-col">
      {/* 1. Hero Header — consistent with Classes.jsx & Membership.jsx */}
      <section className="relative border-b border-charcoal-line bg-charcoal-raised py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blaze">
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> Meet The Team
          </span>
          <h1 className="text-display mt-2 text-4xl sm:text-6xl lg:text-7xl text-chalk">
            YOUR <span className="text-blaze">COACHES</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-steel leading-relaxed">
            Every coach at Forge Athletics is a practitioner first — people who've lived the
            training, refined the craft, and genuinely care about the athlete in front of them.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8 flex-1">
        {/* 2. Filter Bar */}
        <CoachFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          coaches={coaches}
        />

        {/* 3. Coach Grid */}
        <CoachGrid coaches={filteredCoaches} onSelectCoach={handleSelectCoach} />
      </main>

      {/* 4. Bottom CTA Band — matches the established pattern across Classes & Membership */}
      <section className="relative overflow-hidden border-t border-charcoal-line bg-charcoal-raised">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            Zero Risk
          </span>
          <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl lg:text-5xl">
            READY TO MEET YOUR COACH?{' '}
            <span className="text-blaze">YOUR FIRST CLASS IS FREE.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-steel sm:text-base">
            Come train with us, experience the community, and see for yourself how good coaching
            changes everything.
          </p>
          <motion.button
            type="button"
            onClick={openTrialModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-2 bg-blaze px-8 py-4 text-sm font-bold uppercase tracking-wide text-chalk shadow-lg shadow-blaze/20 transition-colors hover:bg-blaze-dim focus-visible:outline-none cursor-pointer"
          >
            Claim Your Free Class →
          </motion.button>
        </motion.div>
      </section>

      {/* 5. Coach Detail Modal — page-level singleton, same pattern as ClassDetailModal */}
      <CoachDetailModal
        coach={selectedCoach}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
