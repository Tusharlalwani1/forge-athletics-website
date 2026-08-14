import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../../lib/motion';

const COACHES = [
    { name: 'Marcus Lee', role: 'Head Coach', bio: 'CrossFit L3, 10+ years coaching competitive lifters.', initials: 'ML' },
    { name: 'Sara Diaz', role: 'Olympic Lifting Coach', bio: 'Former collegiate weightlifter, USAW L2 certified.', initials: 'SD' },
    { name: 'Jamie Cho', role: 'Endurance Coach', bio: 'Ultramarathoner turned conditioning specialist.', initials: 'JC' },
];

export default function CoachSpotlight() {
    return (
        <section className="border-y border-charcoal-line bg-charcoal-raised">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={staggerContainer}
                className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
            >
                <motion.div variants={fadeUp} className="flex items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blaze">
                            Meet The Team
                        </span>
                        <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl">
                            Coaches Who Care
                        </h2>
                    </div>
                    <Link
                        to="/coaches"
                        className="hidden shrink-0 text-sm font-semibold uppercase tracking-wide text-steel underline decoration-charcoal-line underline-offset-4 transition-colors hover:text-chalk hover:decoration-blaze sm:inline"
                    >
                        All Coaches →
                    </Link>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {COACHES.map((coach) => (
                        <motion.div
                            key={coach.name}
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            className="border border-charcoal-line bg-charcoal p-6 text-center"
                        >
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-charcoal-line bg-charcoal-raised">
                                <span className="text-display text-xl text-blaze">
                                    {coach.initials}
                                </span>
                            </div>
                            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-chalk">
                                {coach.name}
                            </h3>
                            <p className="text-xs uppercase tracking-widest text-blaze">
                                {coach.role}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-steel">
                                {coach.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div variants={fadeUp} className="mt-8 text-center sm:hidden">
                    <Link
                        to="/coaches"
                        className="text-sm font-semibold uppercase tracking-wide text-steel underline decoration-charcoal-line underline-offset-4 hover:text-chalk"
                    >
                        All Coaches →
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}