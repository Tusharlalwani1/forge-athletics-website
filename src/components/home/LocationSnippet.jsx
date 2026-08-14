import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

export default function LocationSnippet() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
            >
                {/* Simple map placeholder — real embedded map ships in Module 7 */}
                <motion.div
                    variants={fadeUp}
                    className="relative flex h-64 items-center justify-center overflow-hidden border border-charcoal-line bg-charcoal-raised sm:h-80"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage:
                                'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute h-14 w-14 rounded-full bg-blaze/30"
                    />
                    <MapPin className="relative h-9 w-9 text-blaze" strokeWidth={1.75} />
                </motion.div>

                <motion.div variants={fadeUp}>
                    <span className="text-xs font-bold uppercase tracking-widest text-blaze">
                        Visit Us
                    </span>
                    <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl">
                        Come See The Space
                    </h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blaze" />
                            <p className="text-sm text-steel">
                                842 Ironworks Way, Suite 100
                                <br />
                                Austin, TX 78701
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blaze" />
                            <p className="text-sm text-steel">
                                Mon–Fri: 5:00 AM – 8:00 PM
                                <br />
                                Sat–Sun: 7:00 AM – 12:00 PM
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blaze" />
                            <a
                                href="tel:+15125550199"
                                className="text-sm text-steel transition-colors hover:text-chalk"
                            >
                                (512) 555-0199
                            </a>
                        </div>
                    </div>

                    <Link
                        to="/location"
                        className="mt-6 inline-flex items-center gap-2 border border-charcoal-line px-6 py-3 text-xs font-bold uppercase tracking-widest text-chalk transition-colors hover:border-blaze hover:text-blaze"
                    >
                        Get Directions →
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}