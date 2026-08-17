import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useClasses } from '../hooks/useClasses';
import ClassTypeDirectory from '../components/classes/ClassTypeDirectory';
import TimetableFilters from '../components/classes/TimetableFilters';
import WeekView from '../components/classes/WeekView';
import ListView from '../components/classes/ListView';
import ClassDetailModal from '../components/classes/ClassDetailModal';
import { useTrialModal } from '../components/TrialForm/useTrialModal';
import { fadeUp } from '../lib/motion';

export default function Classes() {
  const { timetable } = useClasses();
  const { openTrialModal } = useTrialModal();
  const timetableRef = useRef(null);

  // Responsive viewMode state: desktop defaults to 'week', mobile defaults to 'list'
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 'week' : 'list';
    }
    return 'week';
  });

  // Handle window resize default mode switch if user hasn't explicitly set it
  useEffect(() => {
    const handleResize = () => {
      // Keep manual user choice unless screen resize crosses mobile threshold
      if (window.innerWidth < 768 && viewMode === 'week') {
        setViewMode('list');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  // Filters state
  const [filters, setFilters] = useState({
    day: 'All',
    classTypeId: 'all',
    coach: 'all',
    timeOfDay: 'all',
  });

  // Modal slot state
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique coach names from timetable data
  const coaches = useMemo(() => {
    const set = new Set();
    (timetable || []).forEach((slot) => {
      if (slot.coachName && slot.coachName !== 'Floor Staff') {
        set.add(slot.coachName);
      }
    });
    return Array.from(set);
  }, [timetable]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      day: 'All',
      classTypeId: 'all',
      coach: 'all',
      timeOfDay: 'all',
    });
  };

  const handleSelectTypeFromDirectory = (typeId) => {
    setFilters((prev) => ({
      ...prev,
      classTypeId: prev.classTypeId === typeId ? 'all' : typeId,
    }));

    if (timetableRef.current) {
      timetableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenSlotDetail = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleCloseSlotDetail = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  // Instant client-side filtered timetable
  const filteredTimetable = useMemo(() => {
    return (timetable || []).filter((slot) => {
      // Day filter
      if (filters.day !== 'All' && slot.day !== filters.day) {
        return false;
      }
      // Class type filter
      if (filters.classTypeId !== 'all' && slot.classTypeId !== filters.classTypeId) {
        return false;
      }
      // Coach filter
      if (filters.coach !== 'all' && slot.coachName !== filters.coach) {
        return false;
      }
      // Time of day filter
      if (filters.timeOfDay !== 'all') {
        const isAM = slot.startTime.includes('AM');
        let hour = parseInt(slot.startTime.split(':')[0], 10);
        // Convert to 24-hour format for reliable comparison
        if (!isAM && hour !== 12) hour += 12; // e.g. 5 PM -> 17
        if (isAM && hour === 12) hour = 0;    // 12 AM -> 0
        if (filters.timeOfDay === 'morning' && hour >= 12) return false;
        if (filters.timeOfDay === 'afternoon' && (hour < 12 || hour >= 17)) return false;
        if (filters.timeOfDay === 'evening' && hour < 17) return false;
      }
      return true;
    });
  }, [filters, timetable]);

  return (
    <div className="min-h-screen bg-charcoal text-chalk flex flex-col">
      {/* 1. Hero Header Section */}
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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blaze">
              Forge Athletics Schedule
            </span>
            <h1 className="text-display mt-2 text-4xl sm:text-6xl lg:text-7xl text-chalk">
              CLASSES & <span className="text-blaze">TIMETABLE</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-steel leading-relaxed">
              Explore daily WODs, endurance sessions, barbell mechanics, and mobility workouts. Filter by day, coach, or discipline and reserve your spot.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Class Type Directory Grid */}
      <ClassTypeDirectory
        selectedType={filters.classTypeId}
        onSelectType={handleSelectTypeFromDirectory}
      />

      {/* 3. Live Timetable Section */}
      <section ref={timetableRef} className="mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8 space-y-8 flex-1">
        {/* Filters & Controls */}
        <TimetableFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          coaches={coaches}
        />

        {/* Timetable View Rendering */}
        <div className="mt-6">
          {viewMode === 'week' ? (
            <WeekView timetable={filteredTimetable} onSelectSlot={handleOpenSlotDetail} />
          ) : (
            <ListView timetable={filteredTimetable} onSelectSlot={handleOpenSlotDetail} />
          )}
        </div>
      </section>

      {/* 4. Slot Detail Modal */}
      <ClassDetailModal
        slot={selectedSlot}
        isOpen={isModalOpen}
        onClose={handleCloseSlotDetail}
      />

      {/* 5. Bottom Reassuring CTA Band */}
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
            First Step
          </span>
          <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl lg:text-5xl">
            NEW HERE? <span className="text-blaze">TRY ANY CLASS FREE.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-steel sm:text-base">
            No long-term commitment. No pressure. Pick a time on the board and let our coaches take care of the rest.
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
    </div>
  );
}
