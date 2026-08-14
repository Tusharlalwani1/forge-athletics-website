import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronRight, Clock, UserCheck } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { CLASS_TYPES } from './classesData';
import { DifficultyBadge } from './DifficultyLegend';

const DAYS_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ListView({ timetable, onSelectSlot }) {
  // Group timetable by day in order
  const groupedByDay = DAYS_ORDER.map((day) => ({
    day,
    slots: timetable
      .filter((s) => s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  })).filter((group) => group.slots.length > 0);

  if (groupedByDay.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-charcoal-line bg-charcoal-raised p-12 text-center text-steel">
        <p className="text-base font-semibold text-chalk">No classes match your selected filters</p>
        <p className="mt-1 text-xs text-steel">Try adjusting your day, discipline, coach, or time-of-day filter above.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {groupedByDay.map(({ day, slots }) => (
        <div key={day} className="space-y-3">
          {/* Sticky/Section Header for Day */}
          <div className="sticky top-16 z-20 flex items-center justify-between border-b border-charcoal-line bg-charcoal/95 py-2.5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <h3 className="text-display text-xl text-chalk tracking-wide">{day}</h3>
              <span className="h-1.5 w-1.5 rounded-full bg-blaze" />
              <span className="text-xs font-semibold uppercase tracking-wider text-steel font-mono">
                {slots.length} {slots.length === 1 ? 'Session' : 'Sessions'}
              </span>
            </div>
          </div>

          {/* List of class slots */}
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {slots.map((slot) => {
                const classType = CLASS_TYPES.find((c) => c.id === slot.classTypeId);
                const spotsLeft = slot.spotsTotal - slot.spotsBooked;
                const isFull = spotsLeft <= 0;
                const isCancelled = slot.status === 'cancelled';
                const isSubstitute = slot.status === 'substitute';

                return (
                  <motion.div
                    key={slot.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectSlot(slot)}
                      className={`group w-full text-left rounded-lg border p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between focus-visible:outline-none ${
                        isCancelled
                          ? 'border-red-900/40 bg-red-950/15 opacity-75 hover:opacity-100 hover:border-red-600/80'
                          : 'border-charcoal-line bg-charcoal-raised hover:border-blaze hover:bg-charcoal'
                      }`}
                    >
                      {/* Left Block: Time + Class Info */}
                      <div className="flex items-start gap-4 sm:items-center">
                        <div className="w-24 shrink-0 space-y-0.5">
                          <span className="scoreboard-value text-base font-bold block">{slot.startTime}</span>
                          <span className="text-xs text-steel-dim font-mono flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {slot.durationMins} mins
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className={`text-base font-bold uppercase tracking-wide ${
                                isCancelled ? 'text-steel line-through decoration-red-500' : 'text-chalk group-hover:text-blaze transition-colors'
                              }`}
                            >
                              {classType?.name || 'Class'}
                            </h4>
                            {classType && <DifficultyBadge level={classType.difficulty} />}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-steel">
                            <span>
                              Coach{' '}
                              <strong className="font-semibold text-chalk">
                                {isSubstitute && slot.substituteNote
                                  ? slot.substituteNote.replace('Sub: ', '')
                                  : slot.coachName}
                              </strong>
                            </span>
                            {isSubstitute && (
                              <span className="inline-flex items-center gap-1 text-amber-300 font-semibold bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 text-[11px]">
                                <UserCheck className="w-3 h-3" /> Sub Coach
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Status / Urgency Spots + Arrow */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-charcoal-line/40 pt-2 sm:border-t-0 sm:pt-0">
                        {isCancelled ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded bg-red-950/80 text-red-400 border border-red-800/60">
                            <AlertTriangle className="w-3.5 h-3.5" /> Cancelled
                          </span>
                        ) : isFull ? (
                          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded bg-charcoal-line text-steel">
                            Class Full
                          </span>
                        ) : (
                          <span
                            className={`scoreboard-value text-xs sm:text-sm font-semibold ${
                              spotsLeft <= 3 ? 'text-tape font-bold' : 'text-steel'
                            }`}
                          >
                            {String(spotsLeft).padStart(2, '0')} spots left
                          </span>
                        )}

                        <ChevronRight className="h-5 w-5 text-steel-dim transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blaze hidden sm:block" />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
