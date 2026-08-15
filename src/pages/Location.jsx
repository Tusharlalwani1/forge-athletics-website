import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import { useTrialModal } from '../components/TrialForm/useTrialModal';
import LocalBusinessSchema from '../components/location/LocalBusinessSchema';
import LocationMap from '../components/location/LocationMap';
import VisitDetails from '../components/location/VisitDetails';
import FacilityGallery from '../components/location/FacilityGallery';

export default function Location() {
  const { openTrialModal } = useTrialModal();

  return (
    <div className="min-h-screen bg-charcoal text-chalk flex flex-col">
      <LocalBusinessSchema />

      {/* Header */}
      <section className="relative border-b border-charcoal-line bg-charcoal-raised py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blaze">
              Come Find Us
            </span>
            <h1 className="text-display mt-2 text-4xl sm:text-6xl lg:text-7xl text-chalk">
              VISIT <span className="text-blaze">FORGE</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-steel leading-relaxed">
              Right in the heart of Austin — free parking, no stairs, and
              coaches on the floor from 5am. Come see the space before your
              first class.
            </p>
          </div>
        </div>
      </section>

      {/* Map + Visit details */}
      <section className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <LocationMap />
          <VisitDetails />
        </div>
      </section>

      {/* Facility photos */}
      <FacilityGallery />

      {/* Bottom CTA band */}
      <section className="relative overflow-hidden border-t border-charcoal-line bg-charcoal-raised mt-auto">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            First Visit
          </span>
          <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl lg:text-5xl">
            STOP BY, OR <span className="text-blaze">CLAIM A FREE CLASS.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-steel sm:text-base">
            Walk in anytime during open hours, or lock in your first free
            session before you arrive.
          </p>
          <motion.button
            type="button"
            onClick={openTrialModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-2 bg-blaze px-8 py-4 text-sm font-bold uppercase tracking-wide text-chalk shadow-lg shadow-blaze/20 transition-colors hover:bg-blaze-dim focus-visible:outline-none cursor-pointer"
          >
            Claim Your Free Class →
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
