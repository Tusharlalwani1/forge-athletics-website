import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, LayoutGrid, List, RotateCcw } from 'lucide-react';
import { CLASS_TYPES } from './classesData';
import DifficultyLegend from './DifficultyLegend';

const DAYS = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES_OF_DAY = [
  { id: 'all', label: 'All Times' },
  { id: 'morning', label: 'Morning (<12 PM)' },
  { id: 'afternoon', label: 'Afternoon (12–5 PM)' },
  { id: 'evening', label: 'Evening (5+ PM)' },
];

export default function TimetableFilters({
  filters,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  coaches = [],
}) {
  const isFiltered =
    filters.day !== 'All' ||
    filters.classTypeId !== 'all' ||
    filters.coach !== 'all' ||
    filters.timeOfDay !== 'all';

  return (
    <div className="space-y-6">
      {/* Top Bar: Section Title + View Toggle Switch + Difficulty Legend */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            Weekly Schedule
          </span>
          <h3 className="text-display mt-0.5 text-2xl text-chalk sm:text-3xl">
            LIVE <span className="text-blaze">TIMETABLE</span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
          {/* Difficulty Legend */}
          <DifficultyLegend />

          {/* Segmented View Toggle Switch */}
          <div className="inline-flex rounded border border-charcoal-line bg-charcoal p-1">
            <button
              type="button"
              onClick={() => onViewModeChange('week')}
              className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none cursor-pointer ${
                viewMode === 'week' ? 'text-chalk' : 'text-steel hover:text-chalk'
              }`}
              aria-label="Switch to Week View"
            >
              {viewMode === 'week' && (
                <motion.span
                  layoutId="activeViewTab"
                  className="absolute inset-0 rounded bg-blaze"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5" />
                Week Grid
              </span>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none cursor-pointer ${
                viewMode === 'list' ? 'text-chalk' : 'text-steel hover:text-chalk'
              }`}
              aria-label="Switch to List View"
            >
              {viewMode === 'list' && (
                <motion.span
                  layoutId="activeViewTab"
                  className="absolute inset-0 rounded bg-blaze"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <List className="h-3.5 w-3.5" />
                List View
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Controls Box */}
      <div className="rounded-lg border border-charcoal-line bg-charcoal-raised p-4 sm:p-5 space-y-4">
        {/* Day Chips Selector */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-2 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blaze" /> Day of Week
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {DAYS.map((day) => {
              const isActive = filters.day === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onFilterChange('day', day)}
                  className={`relative shrink-0 rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all focus-visible:outline-none cursor-pointer ${
                    isActive
                      ? 'bg-blaze text-chalk shadow-sm'
                      : 'bg-charcoal text-steel border border-charcoal-line hover:border-steel-dim hover:text-chalk'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns & Time of Day Chips Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
          {/* Class Type Dropdown */}
          <div>
            <label htmlFor="filter-class-type" className="block text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-1.5">
              Discipline / Type
            </label>
            <select
              id="filter-class-type"
              value={filters.classTypeId}
              onChange={(e) => onFilterChange('classTypeId', e.target.value)}
              className="w-full rounded border border-charcoal-line bg-charcoal px-3 py-2 text-xs font-medium text-chalk focus:border-blaze focus-visible:outline-none cursor-pointer"
            >
              <option value="all">All Disciplines</option>
              {CLASS_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.duration}m)
                </option>
              ))}
            </select>
          </div>

          {/* Coach Dropdown */}
          <div>
            <label htmlFor="filter-coach" className="block text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-1.5">
              Coach
            </label>
            <select
              id="filter-coach"
              value={filters.coach}
              onChange={(e) => onFilterChange('coach', e.target.value)}
              className="w-full rounded border border-charcoal-line bg-charcoal px-3 py-2 text-xs font-medium text-chalk focus:border-blaze focus-visible:outline-none cursor-pointer"
            >
              <option value="all">All Coaches</option>
              {coaches.map((c) => (
                <option key={c} value={c}>
                  Coach {c}
                </option>
              ))}
            </select>
          </div>

          {/* Time of Day Chip Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-1.5">
              Time of Day
            </label>
            <select
              id="filter-time-of-day"
              value={filters.timeOfDay}
              onChange={(e) => onFilterChange('timeOfDay', e.target.value)}
              className="w-full rounded border border-charcoal-line bg-charcoal px-3 py-2 text-xs font-medium text-chalk focus:border-blaze focus-visible:outline-none cursor-pointer"
            >
              {TIMES_OF_DAY.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Action */}
          <div>
            <button
              type="button"
              onClick={onResetFilters}
              disabled={!isFiltered}
              className={`w-full inline-flex items-center justify-center gap-1.5 rounded border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none ${
                isFiltered
                  ? 'border-blaze/50 bg-blaze/10 text-blaze hover:bg-blaze hover:text-chalk cursor-pointer'
                  : 'border-charcoal-line bg-charcoal/50 text-steel-dim cursor-not-allowed opacity-60'
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
