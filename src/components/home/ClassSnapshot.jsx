import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../../lib/motion';

// TODO(Module 2): replace this static array with the live weekly timetable
// pulled from Mindbody/Glofox/Wodify. Structure kept intentionally close to
// what that API response will look like so the swap is a data-layer change,
// not a UI rewrite.
const UPCOMING_CLASSES = [
    { day: 'Today', time: '06:00 AM', name: 'Forge WOD', coach: 'Marcus Lee', spots: 3 },
    { day: 'Today', time: '09:00 AM', name: 'Olympic Lifting', coach: 'Sara Diaz', spots: 6 },
    { day: 'Today', time: '05:30 PM', name: 'Forge WOD', coach: 'Marcus Lee', spots: 2 },
    { day: 'Tomorrow', time: '06:00 AM', name: 'Endurance', coach: 'Jamie Cho', spots: 8 },
    { day: 'Tomorrow', time: '06:00 PM', name: 'Forge WOD', coach: 'Sara Diaz', spots: 5 },
];

export default function ClassSnapshot() {
    return (
        <section className="border-y border-charcoal-line bg-charcoal-raised">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={staggerContainer}
                className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
            >
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
                >
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blaze">
                            This Week
                        </span>
                        <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl">
                            What's On The Board
                        </h2>
                    </div>
                    <Link
                        to="/classes"
                        className="text-sm font-semibold uppercase tracking-wide text-steel underline decoration-charcoal-line underline-offset-4 transition-colors hover:text-chalk hover:decoration-blaze"
                    >
                        See Full Schedule →
                    </Link>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className="scoreboard mt-8 divide-y divide-charcoal-line rounded-lg"
                >
                    {UPCOMING_CLASSES.map((slot, i) => (
                        <motion.div
                            key={`${slot.day}-${slot.time}-${i}`}
                            variants={fadeUp}
                            className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-20 shrink-0 text-[10px] uppercase tracking-widest text-steel-dim">
                                    {slot.day}
                                </span>
                                <span className="scoreboard-value w-24 shrink-0 text-base">
                                    {slot.time}
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-chalk">{slot.name}</p>
                                    <p className="text-xs text-steel">Coach {slot.coach}</p>
                                </div>
                            </div>
                            <span
                                className={`scoreboard-value text-xs sm:text-sm ${slot.spots <= 3 ? 'text-tape' : 'text-steel'
                                    }`}
                            >
                                {String(slot.spots).padStart(2, '0')} spots left
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}