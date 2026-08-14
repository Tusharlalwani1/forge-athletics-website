import { motion } from 'framer-motion';
import { useCountUp } from '../../lib/useCountUp';

const STATS = [
  { target: 500, suffix: '+', label: 'Members Forged' },
  { target: 12, suffix: '', label: 'Coaches on Staff' },
  { target: 4.9, suffix: '★', label: 'Average Rating', decimal: true },
  { target: 9, suffix: 'yrs', label: 'Serving Austin' },
];

function Stat({ target, suffix, label, decimal }) {
  const [ref, value] = useCountUp(decimal ? target * 10 : target, {
    duration: 1400,
  });
  const display = decimal ? (value / 10).toFixed(1) : value;

  return (
    <div ref={ref} className="text-center">
      <p className="scoreboard-value text-3xl sm:text-4xl">
        {display}
        <span className="text-tape">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-widest text-steel-dim">
        {label}
      </p>
    </div>
  );
}

export default function SocialProofStrip() {
  return (
    <section className="border-b border-charcoal-line bg-charcoal-raised">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8"
      >
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </motion.div>
    </section>
  );
}