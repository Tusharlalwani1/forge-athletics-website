import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Clock, User, AlertTriangle, CheckCircle2, UserCheck, X } from 'lucide-react';
import { CLASS_TYPES } from './classesData';
import { DifficultyBadge } from './DifficultyLegend';
import { useTrialModal } from '../TrialForm/useTrialModal';

export default function ClassDetailModal({ slot, isOpen, onClose }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openTrialModal } = useTrialModal();

  const classType = slot ? CLASS_TYPES.find((c) => c.id === slot.classTypeId) : null;
  const spotsLeft = slot ? slot.spotsTotal - slot.spotsBooked : 0;
  const isFull = spotsLeft <= 0;
  const isCancelled = slot?.status === 'cancelled';
  const isSubstitute = slot?.status === 'substitute';

  // Modal focus trap & scroll lock
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea');
        if (firstFocusable) firstFocusable.focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBookClick = () => {
    onClose();
    // TODO(Module 8): route existing members to Mindbody/Glofox/Wodify's booking flow instead of the trial modal
    openTrialModal();
  };

  if (!slot || !classType) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-charcoal/90 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-modal-title"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="relative bg-charcoal-raised border border-charcoal-line rounded-lg shadow-2xl w-full max-w-lg my-auto z-10 flex flex-col max-h-[85vh] sm:max-h-[90vh] overflow-hidden"
          >
            {/* Modal Pinned Header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-charcoal-line bg-charcoal-raised">
              <div className="flex items-center gap-2">
                <span className="scoreboard-value text-sm font-semibold">{slot.day} • {slot.startTime}</span>
                <DifficultyBadge level={classType.difficulty} />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-steel hover:text-chalk p-1.5 rounded-md hover:bg-charcoal transition-colors focus-visible:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Title & Status */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 id="class-modal-title" className="text-display text-2xl sm:text-3xl text-chalk">
                    {classType.name}
                  </h2>
                  {isCancelled && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded bg-red-950/80 text-red-400 border border-red-800/60">
                      <AlertTriangle className="w-3.5 h-3.5" /> Cancelled
                    </span>
                  )}
                  {isSubstitute && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <UserCheck className="w-3.5 h-3.5" /> Substitute Coach
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  {classType.description}
                </p>
              </div>

              {/* Status Alert Box */}
              {isCancelled && (
                <div className="rounded border border-red-900/60 bg-red-950/30 p-4 text-xs text-red-300">
                  <strong className="block font-bold text-red-200 uppercase tracking-wider mb-1">
                    Notice: Class Cancelled
                  </strong>
                  This session has been cancelled for this date. Please check back next week or select another time slot.
                </div>
              )}

              {isSubstitute && slot.substituteNote && (
                <div className="rounded border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                  <strong className="block font-bold uppercase tracking-wider text-amber-300 mb-0.5">
                    Coach Substitution
                  </strong>
                  {slot.substituteNote} will be covering this session today.
                </div>
              )}

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded border border-charcoal-line bg-charcoal p-3 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-steel-dim flex items-center gap-1">
                    <User className="h-3 w-3 text-blaze" /> Coach
                  </span>
                  <span className="font-semibold text-chalk text-sm">
                    {isSubstitute && slot.substituteNote ? slot.substituteNote.replace('Sub: ', '') : slot.coachName}
                  </span>
                </div>

                <div className="rounded border border-charcoal-line bg-charcoal p-3 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-steel-dim flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blaze" /> Duration
                  </span>
                  <span className="font-semibold text-chalk text-sm font-mono">
                    {slot.durationMins} minutes
                  </span>
                </div>
              </div>

              {/* Capacity Progress Bar & Spots Left */}
              <div className="rounded border border-charcoal-line bg-charcoal p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-steel">Session Capacity</span>
                  <span className={`scoreboard-value text-xs ${spotsLeft <= 3 ? 'text-tape font-bold' : 'text-chalk'}`}>
                    {spotsLeft <= 0 ? 'CLASS FULL' : `${spotsLeft} of ${slot.spotsTotal} spots remaining`}
                  </span>
                </div>
                <div className="w-full bg-charcoal-line rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      spotsLeft <= 3 ? 'bg-tape' : 'bg-blaze'
                    }`}
                    style={{ width: `${Math.min(100, (slot.spotsBooked / slot.spotsTotal) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Modal Pinned Footer CTA */}
            <div className="shrink-0 p-6 border-t border-charcoal-line bg-charcoal-raised flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-steel">
                {isCancelled
                  ? 'Cancelled session'
                  : isFull
                  ? 'Join waitlist or pick another slot'
                  : 'New athlete? Free trial applies!'}
              </span>

              {isCancelled ? (
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider bg-charcoal-line text-steel-dim border border-charcoal-line rounded cursor-not-allowed"
                >
                  Class Cancelled
                </button>
              ) : isFull ? (
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider bg-charcoal-line text-steel-dim border border-charcoal-line rounded cursor-not-allowed"
                >
                  Class Full
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blaze px-6 py-3 text-xs font-bold uppercase tracking-wider text-chalk rounded shadow-md hover:bg-blaze-dim transition-colors focus-visible:outline-none cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Book This Class
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
