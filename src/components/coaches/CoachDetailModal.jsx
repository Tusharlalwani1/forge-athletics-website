import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Award, AtSign, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLASS_TYPES } from '../classes/classesData';
import { useTrialModal } from '../TrialForm/useTrialModal';

export default function CoachDetailModal({ coach, isOpen, onClose }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openTrialModal } = useTrialModal();

  // Map class type IDs to full CLASS_TYPES objects
  const taughtClasses = coach
    ? CLASS_TYPES.filter((ct) => coach.classTypeIds.includes(ct.id))
    : [];

  // Focus trap + scroll lock — identical pattern to ClassDetailModal
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
    if (e.target === e.currentTarget) onClose();
  };

  const handleTrainClick = () => {
    onClose();
    openTrialModal();
  };

  if (!coach) return null;

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
            aria-labelledby="coach-modal-name"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="relative bg-charcoal-raised border border-charcoal-line rounded-lg shadow-2xl w-full max-w-lg my-auto z-10 flex flex-col max-h-[88vh] overflow-hidden"
          >
            {/* Pinned Header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-charcoal-line bg-charcoal-raised">
              <div className="flex items-center gap-3">
                {/* Large Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-charcoal-line bg-charcoal">
                  <span className="text-display text-lg text-blaze">{coach.initials}</span>
                </div>
                <div>
                  <h2 id="coach-modal-name" className="text-sm font-bold uppercase tracking-wide text-chalk">
                    {coach.name}
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-blaze">{coach.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close coach profile"
                className="text-steel hover:text-chalk p-1.5 rounded-md hover:bg-charcoal transition-colors focus-visible:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Full Bio */}
              <div>
                <p className="text-sm leading-relaxed text-steel">{coach.fullBio}</p>
              </div>

              {/* Philosophy Quote */}
              {coach.philosophy && (
                <blockquote className="border-l-2 border-blaze pl-4 italic text-sm text-steel leading-relaxed">
                  {coach.philosophy}
                </blockquote>
              )}

              {/* Certifications */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-3">
                  Certifications
                </h3>
                <ul className="space-y-2">
                  {coach.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="flex items-center gap-2 text-xs text-steel"
                    >
                      <Award
                        className="h-3.5 w-3.5 shrink-0 text-blaze"
                        aria-hidden="true"
                      />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Classes Taught */}
              {taughtClasses.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-steel-dim mb-3">
                    Classes Taught
                  </h3>
                  {/* TODO: deep-link filter state from URL params if Classes.jsx adds that capability */}
                  <div className="flex flex-wrap gap-2">
                    {taughtClasses.map((ct) => (
                      <Link
                        key={ct.id}
                        to="/classes"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-charcoal-line bg-charcoal text-xs font-bold uppercase tracking-wider text-steel hover:border-blaze hover:text-chalk transition-colors"
                      >
                        {ct.name}
                        <ExternalLink className="h-3 w-3 text-steel-dim" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Instagram */}
              {coach.instagramHandle && (
                <div>
                  <a
                    href={`https://instagram.com/${coach.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-steel hover:text-chalk transition-colors"
                  >
                    <AtSign className="h-4 w-4 text-blaze" aria-hidden="true" />
                    {coach.instagramHandle} (Instagram)
                  </a>
                </div>
              )}
            </div>

            {/* Pinned Footer CTA */}
            <div className="shrink-0 px-6 py-4 border-t border-charcoal-line bg-charcoal-raised flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-steel">First class is always free for new athletes.</p>
              <button
                type="button"
                onClick={handleTrainClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blaze px-6 py-3 text-xs font-bold uppercase tracking-wider text-chalk rounded shadow-md hover:bg-blaze-dim transition-colors focus-visible:outline-none cursor-pointer"
              >
                Train with {coach.name.split(' ')[0]} →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
