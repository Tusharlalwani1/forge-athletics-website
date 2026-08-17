import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { useMembership } from '../../hooks/useMembership';

export default function MembershipFAQ() {
  const { faqs } = useMembership();
  const [openFaqId, setOpenFaqId] = useState(faqs?.[0]?.id || 'faq-cancel');

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mt-20 border-t border-charcoal-line pt-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blaze flex items-center justify-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" /> Clear Answers
          </span>
          <h3 className="text-display mt-1 text-2xl text-chalk sm:text-3xl">
            FREQUENTLY ASKED <span className="text-blaze">QUESTIONS</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-steel">
            Everything you need to know about billing, cancellations, and getting started.
          </p>
        </motion.div>

        <div className="space-y-3">
          {(faqs || []).map((faq) => {
            const isOpen = openFaqId === faq.id;
            const answerId = `faq-answer-${faq.id}`;

            return (
              <motion.div key={faq.id} variants={fadeUp}>
                <div className="rounded-lg border border-charcoal-line bg-charcoal-raised overflow-hidden transition-colors hover:border-steel-dim">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left text-sm font-bold uppercase tracking-wide text-chalk cursor-pointer focus-visible:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-blaze shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        role="region"
                        aria-labelledby={`faq-question-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm leading-relaxed text-steel border-t border-charcoal-line/40 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
