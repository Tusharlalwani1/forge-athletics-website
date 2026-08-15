import { motion, useReducedMotion } from 'framer-motion';

// Real embedded Google Map — no API key required for basic embed.
// FR-7.1: must be interactive (zoomable/pannable), not a static image.
const MAP_QUERY = '842 Ironworks Way, Austin, TX 78701';
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&z=15&output=embed`;

export default function LocationMap() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="relative h-80 w-full overflow-hidden border border-charcoal-line bg-charcoal-raised sm:h-[26rem]"
    >
      <iframe
        title="Forge Athletics location map"
        src={MAP_EMBED_SRC}
        className="h-full w-full grayscale-[15%] contrast-[1.05] invert-[0.92] hue-rotate-180"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </motion.div>
  );
}
