import { motion } from 'framer-motion';
import { useTrialModal } from '../TrialForm/useTrialModal';
import { fadeUp } from '../../lib/motion';

export default function FinalCtaBanner() {
  const { openTrialModal } = useTrialModal();

  return (
    <section className="relative overflow-hidden border-t border-charcoal-line bg-charcoal-raised">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-display text-4xl text-chalk sm:text-5xl">
          Ready To Start?
          <br />
          <span className="text-blaze">Your First Class Is Free.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-steel sm:text-base">
          No contracts. No credit card. Just show up and see what you're capable of.
        </p>
        <motion.button
          type="button"
          onClick={openTrialModal}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex items-center gap-2 bg-blaze px-8 py-4 text-sm font-bold uppercase tracking-wide text-chalk shadow-lg shadow-blaze/20 transition-colors hover:bg-blaze-dim focus-visible:outline-none"
        >
          Claim Your Free Class →
        </motion.button>
      </motion.div>
    </section>
  );
}