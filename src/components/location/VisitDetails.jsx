import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, ParkingCircle, TramFront } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

const HOURS = [
  { label: 'Monday – Friday', value: '5:00 AM – 8:00 PM' },
  { label: 'Saturday – Sunday', value: '7:00 AM – 12:00 PM' },
];

export default function VisitDetails() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Address */}
      <motion.div variants={fadeUp} className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blaze" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-steel-dim">
            Address
          </p>
          <p className="mt-1 text-sm text-steel">
            842 Ironworks Way, Suite 100
            <br />
            Austin, TX 78701
          </p>
          <a
            href="https://maps.google.com/maps?q=842+Ironworks+Way,+Austin,+TX+78701"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 border border-charcoal-line px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-chalk transition-colors hover:border-blaze hover:text-blaze"
          >
            Get Directions →
          </a>
        </div>
      </motion.div>

      {/* Hours */}
      <motion.div variants={fadeUp} className="flex items-start gap-3">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blaze" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-steel-dim">
            Hours
          </p>
          <div className="mt-2 scoreboard w-fit rounded-md">
            {HOURS.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-6 border-t border-charcoal-line px-4 py-2 first:border-t-0"
              >
                <span className="w-36 text-xs text-steel">{h.label}</span>
                <span className="scoreboard-value text-sm">{h.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-steel-dim">
            Holiday hours may vary — check our socials for updates.
          </p>
        </div>
      </motion.div>

      {/* Parking / Access */}
      <motion.div variants={fadeUp} className="flex items-start gap-3">
        <ParkingCircle className="mt-0.5 h-5 w-5 shrink-0 text-blaze" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-steel-dim">
            Parking &amp; Access
          </p>
          <p className="mt-1 text-sm leading-relaxed text-steel">
            Free lot parking directly behind the building, accessible from
            Ironworks Way. Street parking also available along Foundry St.
            Entrance is on the ground floor — no stairs to the training floor.
          </p>
        </div>
      </motion.div>

      {/* Transit */}
      <motion.div variants={fadeUp} className="flex items-start gap-3">
        <TramFront className="mt-0.5 h-5 w-5 shrink-0 text-blaze" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-steel-dim">
            Public Transit
          </p>
          <p className="mt-1 text-sm leading-relaxed text-steel">
            CapMetro Route 20 stops directly outside — a 2-minute walk to the
            front door.
          </p>
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div variants={fadeUp} className="flex items-start gap-3">
        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blaze" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-steel-dim">
            Contact
          </p>
          <a
            href="tel:+15125550199"
            className="mt-1 block text-sm text-steel transition-colors hover:text-chalk"
          >
            (512) 555-0199
          </a>
          <a
            href="mailto:hello@forgeathletics.com"
            className="mt-1 flex items-center gap-2 text-sm text-steel transition-colors hover:text-chalk"
          >
            <Mail className="h-3.5 w-3.5 text-blaze" />
            hello@forgeathletics.com
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
