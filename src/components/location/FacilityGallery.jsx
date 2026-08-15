import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

// TODO(Module 9): replace these placeholder blocks with real facility photos
// once assets are supplied — keep the same grid/aspect-ratio structure so
// swapping in <img> tags is a drop-in change.
const FACILITY_SHOTS = [
  { id: 'floor', label: 'Main Training Floor' },
  { id: 'rig', label: 'Rig & Platforms' },
  { id: 'gym', label: 'Open Gym Area' },
  { id: 'recovery', label: 'Mobility & Recovery Zone' },
];

export default function FacilityGallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            The Space
          </span>
          <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl">
            Inside Forge
          </h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {FACILITY_SHOTS.map((shot) => (
            <motion.div
              key={shot.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="flex aspect-square flex-col items-center justify-center gap-2 border border-dashed border-charcoal-line bg-charcoal-raised p-4 text-center"
            >
              <Dumbbell className="h-6 w-6 text-blaze" strokeWidth={1.75} />
              <span className="text-[11px] uppercase tracking-widest text-steel-dim">
                {shot.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
