import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTrialModal } from '../TrialForm/useTrialModal';
import { EASE_OUT_EXPO } from '../../lib/motion';

export default function Hero() {
    const { openTrialModal } = useTrialModal();
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden border-b border-charcoal-line">
            {/* Ambient background texture — subtle plate-loading grid, not a stock photo */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />
            {/* Ambient glow */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-blaze/10 blur-3xl"
                animate={
                    shouldReduceMotion
                        ? {}
                        : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:px-8 lg:py-36">
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    className="lg:col-span-7"
                >
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-blaze">
                        Austin's Strength &amp; Conditioning Box
                    </span>

                    <h1 className="text-display mt-4 text-5xl text-chalk sm:text-6xl lg:text-7xl">
                        Strength Is
                        <br />
                        <span className="text-blaze">Forged</span>, Not Found.
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-relaxed text-steel sm:text-lg">
                        Coached CrossFit, strength, and conditioning — built around your
                        goals, not a generic program. Walk in as a beginner, leave
                        knowing exactly what you're capable of.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <motion.button
                            type="button"
                            onClick={openTrialModal}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-flex items-center gap-2 bg-blaze px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-chalk shadow-lg shadow-blaze/20 transition-colors hover:bg-blaze-dim focus-visible:outline-none"
                        >
                            Claim Your Free Class →
                        </motion.button>
                        <Link
                            to="/classes"
                            className="text-sm font-semibold uppercase tracking-wide text-steel underline decoration-charcoal-line underline-offset-4 transition-colors hover:text-chalk hover:decoration-blaze"
                        >
                            View Timetable
                        </Link>
                    </div>
                </motion.div>

                {/* Scoreboard-style hero stat card */}
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT_EXPO }}
                    className="lg:col-span-5"
                >
                    <div className="scoreboard mx-auto w-full max-w-sm rounded-lg p-6 shadow-2xl">
                        <p className="text-[10px] uppercase tracking-widest text-steel-dim">
                            Today's Board
                        </p>
                        <div className="mt-4 space-y-3">
                            {[
                                { time: '06:00 AM', name: 'Forge WOD', spots: 3 },
                                { time: '12:00 PM', name: 'Open Gym', spots: 12 },
                                { time: '05:30 PM', name: 'Olympic Lifting', spots: 5 },
                            ].map((slot) => (
                                <div
                                    key={slot.time}
                                    className="flex items-center justify-between border-t border-charcoal-line pt-3 first:border-t-0 first:pt-0"
                                >
                                    <div>
                                        <p className="scoreboard-value text-lg">{slot.time}</p>
                                        <p className="text-xs text-steel">{slot.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`scoreboard-value text-sm ${slot.spots <= 3 ? 'text-tape' : ''
                                                }`}
                                        >
                                            {String(slot.spots).padStart(2, '0')} left
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/classes"
                            className="mt-5 block text-center text-xs font-semibold uppercase tracking-widest text-blaze hover:underline"
                        >
                            See Full Schedule →
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}