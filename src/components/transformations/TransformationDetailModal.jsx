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
              {/* Larger Before → After Placeholder */}
              <div className="flex items-center justify-center gap-4 rounded border border-dashed border-charcoal-line bg-charcoal p-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-steel-dim">Before</span>
                  <div className="h-24 w-24 rounded border border-dashed border-charcoal-line bg-charcoal-raised flex items-center justify-center">
                    <span className="text-[9px] text-steel-dim text-center leading-relaxed px-1">
                      Member photo<br />pending consent
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <ArrowRight className="h-8 w-8 text-blaze" aria-hidden="true" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-steel-dim">After</span>
                  <div className="h-24 w-24 rounded border border-dashed border-charcoal-line bg-charcoal-raised flex items-center justify-center">
                    <span className="text-[9px] text-steel-dim text-center leading-relaxed px-1">
                      Member photo<br />pending consent
                    </span>
                  </div>
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
