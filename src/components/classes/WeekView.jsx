import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, UserCheck, Clock } from 'lucide-react';
import { CLASS_TYPES } from './classesData';
import { DifficultyBadge } from './DifficultyLegend';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeekView({ timetable, onSelectSlot }) {
  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-none">
      <div className="min-w-[960px] grid grid-cols-7 gap-2.5">
        {DAYS.map((day) => {
          const daySlots = timetable
            .filter((s) => s.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <div key={day} className="flex flex-col gap-2.5 overflow-hidden">
              {/* Day Column Header */}
              <div className="rounded border border-charcoal-line bg-charcoal-raised p-2.5 text-center overflow-hidden">
                <span className="text-display text-lg text-chalk tracking-wide block">{day}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-steel-dim font-mono block truncate">
                  {daySlots.length} {daySlots.length === 1 ? 'class' : 'classes'}
                </span>
              </div>

              {/* Day Slot Stack */}
              <div className="flex flex-col gap-2 flex-1 min-h-[300px] rounded border border-charcoal-line/40 bg-charcoal/30 p-1.5 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {daySlots.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex items-center justify-center p-3 text-center text-xs text-steel-dim border border-dashed border-charcoal-line/60 rounded"
                    >
                      No classes
                    </motion.div>
                  ) : (
                    daySlots.map((slot) => {
                      const classType = CLASS_TYPES.find((c) => c.id === slot.classTypeId);
                      const spotsLeft = slot.spotsTotal - slot.spotsBooked;
                      const isFull = spotsLeft <= 0;
                      const isCancelled = slot.status === 'cancelled';
                      const isSubstitute = slot.status === 'substitute';

                      return (
                        <motion.button
                          key={slot.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          type="button"
                          onClick={() => onSelectSlot(slot)}
                          className={`w-full text-left p-2.5 rounded border overflow-hidden transition-all duration-200 cursor-pointer flex flex-col gap-1.5 focus-visible:outline-none ${
                            isCancelled
                              ? 'border-red-900/40 bg-red-950/15 opacity-75 hover:opacity-100 hover:border-red-600/80'
                              : 'border-charcoal-line bg-charcoal-raised hover:border-blaze hover:bg-charcoal'
                          }`}
                        >
                          {/* Time & Duration */}
                          <div className="flex items-center justify-between gap-1 text-[11px] w-full overflow-hidden">
                            <span className="scoreboard-value text-xs font-semibold truncate shrink-0">{slot.startTime}</span>
                            <span className="text-[10px] text-steel-dim font-mono flex items-center gap-0.5 shrink-0">
                              <Clock className="w-2.5 h-2.5 text-steel-dim" />
                              {slot.durationMins}m
                            </span>
                          </div>

                          {/* Class Title */}
                          <div className="space-y-0.5 w-full overflow-hidden">
                            <h4
                              className={`text-xs font-bold uppercase tracking-wide truncate ${
                                isCancelled ? 'text-steel line-through decoration-red-500' : 'text-chalk'
                              }`}
                            >
                              {classType?.name || 'Class'}
                            </h4>

                            {/* Coach / Sub */}
                            <p className="text-[11px] text-steel flex items-center gap-1 truncate">
                              {isSubstitute ? (
                                <span className="text-amber-300 font-medium inline-flex items-center gap-0.5 truncate">
                                  <UserCheck className="w-3 h-3 text-amber-400 shrink-0" />
                                  <span className="truncate">{slot.substituteNote || 'Sub Coach'}</span>
                                </span>
                              ) : (
                                <span className="truncate">Coach {slot.coachName}</span>
                              )}
                            </p>
                          </div>

                          {/* Vertically Stacked Status & Difficulty Badge Footer */}
                          <div className="mt-0.5 flex flex-col gap-1 border-t border-charcoal-line/50 pt-1.5 text-[10px] w-full overflow-hidden">
                            <div className="flex items-center justify-between w-full overflow-hidden">
                              {isCancelled ? (
                                <span className="inline-flex items-center gap-1 text-red-400 font-bold uppercase tracking-wider text-[9px] truncate">
                                  <AlertTriangle className="w-3 h-3 shrink-0 text-red-400" />
                                  <span className="truncate">CANCELLED</span>
                                </span>
                              ) : isFull ? (
                                <span className="text-steel font-bold uppercase tracking-wider text-[9px] truncate">
                                  FULL
                                </span>
                              ) : (
                                <span
                                  className={`scoreboard-value text-[10px] truncate ${
                                    spotsLeft <= 3 ? 'text-tape font-bold' : 'text-steel'
                                  }`}
                                >
                                  {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                                </span>
                              )}
                            </div>

                            {classType && (
                              <div className="flex items-center w-full overflow-hidden">
                                <DifficultyBadge level={classType.difficulty} compact />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
