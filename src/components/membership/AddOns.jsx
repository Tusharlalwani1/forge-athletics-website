import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Salad, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { ADD_ONS } from './membershipData';
import { useTrialModal } from '../TrialForm/useTrialModal';

const ICON_MAP = {
  Dumbbell,
  Salad,
  Sparkles,
};

export default function AddOns() {
  const { openTrialModal } = useTrialModal();

  return (
    <section className="mt-20 border-t border-charcoal-line pt-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            Customization & Upsells
          </span>
          <h3 className="text-display mt-1 text-2xl text-chalk sm:text-3xl">
            OPTIONAL <span className="text-blaze">ADD-ONS</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-steel">
            Enhance your training with 1-on-1 coaching, nutrition strategy, or recovery tools.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {ADD_ONS.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || Dumbbell;

            return (
              <motion.div key={item.id} variants={fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <div className="h-full rounded-lg border border-charcoal-line bg-charcoal-raised p-6 flex flex-col justify-between transition-colors hover:border-steel-dim">
                  <div>
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-6 w-6 text-blaze" strokeWidth={1.75} />
                      <div className="text-right">
                        <span className="scoreboard-value text-xl font-bold text-chalk">{item.price}</span>
                        <span className="text-[11px] text-steel-dim font-mono block">{item.period}</span>
                      </div>
                    </div>

                    <h4 className="mt-4 text-sm font-bold uppercase tracking-wide text-chalk">
                      {item.name}
                    </h4>

                    <p className="mt-2 text-xs text-steel leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-charcoal-line/40">
                    <button
                      type="button"
                      onClick={openTrialModal}
                      className="w-full text-center py-2 px-4 rounded border border-charcoal-line text-xs font-bold uppercase tracking-wider text-steel hover:text-chalk hover:border-blaze transition-colors focus-visible:outline-none cursor-pointer"
                    >
                      Inquire / Add to Plan →
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
