import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useTrialModal } from '../TrialForm/useTrialModal';
import { GoalBadge } from './TransformationGrid';

export default function TransformationDetailModal({ entry, isOpen, onClose }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openTrialModal } = useTrialModal();

  // Focus trap + scroll lock — identical pattern to ClassDetailModal / CoachDetailModal
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
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
          if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else {
          if (document.activeElement === last) { first.focus(); e.preventDefault(); }
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
    if (e.target === e.currentTarget) onClose();
  };

  const handleStartTransformation = () => {
    onClose();
    openTrialModal();
  };

  if (!entry) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/90 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="transformation-modal-name"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="relative bg-charcoal-raised border border-charcoal-line rounded-lg shadow-2xl w-full max-w-lg my-auto z-10 flex flex-col max-h-[88vh] overflow-hidden"
          >
            {/* Pinned Header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-charcoal-line">
              <div className="flex items-center gap-3 flex-wrap">
                <h2
                  id="transformation-modal-name"
                  className="text-sm font-bold uppercase tracking-wide text-chalk"
                >
                  {entry.name}
                </h2>
                <GoalBadge goalType={entry.goalType} />
                <span className="text-[11px] font-mono text-steel-dim">{entry.timeframeWeeks} weeks</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close transformation story"
                className="text-steel hover:text-chalk p-1.5 rounded-md hover:bg-charcoal transition-colors focus-visible:outline-none cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Before → After Image Gallery */}
              <div className="relative flex flex-col sm:flex-row h-64 sm:h-56 w-full border border-charcoal-line bg-charcoal rounded-lg overflow-hidden gap-1 p-1">
                {/* Before Container */}
                <div className="relative flex-1 h-1/2 sm:h-full overflow-hidden rounded bg-charcoal-raised">
                  {entry.beforeImage ? (
                    <img
                      src={entry.beforeImage}
                      alt={`${entry.name} before transformation`}
                      className="h-full w-full object-cover filter grayscale brightness-95"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-steel-dim text-xs">Before</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 rounded bg-charcoal/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-steel border border-charcoal-line backdrop-blur-sm">
                    Before
                  </span>
                </div>

                {/* Divider Arrow */}
                <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-charcoal-raised border border-blaze/60 p-2 shadow-xl shadow-black/80 text-blaze">
                  <ArrowRight className="h-4 w-4" />
                </div>

                {/* After Container */}
                <div className="relative flex-1 h-1/2 sm:h-full overflow-hidden rounded bg-charcoal-raised">
                  {entry.afterImage ? (
                    <img
                      src={entry.afterImage}
                      alt={`${entry.name} after transformation`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-steel-dim text-xs">After</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 rounded bg-blaze px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-chalk shadow-md backdrop-blur-sm">
                    After
                  </span>
                </div>
              </div>

              {/* Stat Comparison */}
              {entry.startStat && entry.endStat && (
                <div className="rounded border border-charcoal-line bg-charcoal p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-3">
                    Performance Delta
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-steel-dim mb-1">Start</p>
                      <p className="scoreboard-value text-base text-steel font-mono">{entry.startStat}</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-blaze shrink-0" aria-hidden="true" />
                    <div className="flex-1 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-steel-dim mb-1">Result</p>
                      <p className="scoreboard-value text-base text-chalk font-mono font-bold">{entry.endStat}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Story */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-2">
                  Full Story
                </p>
                <p className="text-sm leading-relaxed text-steel">{entry.fullStory}</p>
              </div>
            </div>

            {/* Pinned Footer CTA */}
            <div className="shrink-0 px-6 py-4 border-t border-charcoal-line bg-charcoal-raised flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-steel">Results like these start with a single free class.</p>
              <button
                type="button"
                onClick={handleStartTransformation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blaze px-6 py-3 text-xs font-bold uppercase tracking-wider text-chalk rounded shadow-md hover:bg-blaze-dim transition-colors focus-visible:outline-none cursor-pointer"
              >
                Start Your Transformation →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
