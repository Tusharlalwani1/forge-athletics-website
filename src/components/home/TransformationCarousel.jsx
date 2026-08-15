import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

const TRANSFORMATIONS = [
    { name: 'Alex R.', timeframe: '16 weeks', quote: 'Down 30lbs and deadlifting 2x what I started with.' },
    { name: 'Priya M.', timeframe: '12 weeks', quote: 'First pull-up ever, at 41. Never thought I\u2019d get here.' },
    { name: 'Devon K.', timeframe: '24 weeks', quote: 'Rebuilt my knee strength after surgery — coaches scaled everything.' },
    { name: 'Lena T.', timeframe: '10 weeks', quote: 'More energy at 6am than I had all day before.' },
];

export default function TransformationCarousel() {
    const scrollerRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollerRef.current) return;
        scrollerRef.current.scrollBy({
            left: direction * 320,
            behavior: 'smooth',
        });
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUp} className="flex items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blaze">
                            Real Results
                        </span>
                        <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl">
                            Transformations
                        </h2>
                    </div>
                    <div className="hidden shrink-0 gap-2 sm:flex">
                        <button
                            type="button"
                            aria-label="Scroll transformations left"
                            onClick={() => scroll(-1)}
                            className="rounded-full border border-charcoal-line p-2 text-steel transition-colors hover:border-blaze hover:text-blaze focus-visible:outline-none"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label="Scroll transformations right"
                            onClick={() => scroll(1)}
                            className="rounded-full border border-charcoal-line p-2 text-steel transition-colors hover:border-blaze hover:text-blaze focus-visible:outline-none"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    ref={scrollerRef}
                    variants={fadeUp}
                    className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {TRANSFORMATIONS.map((t) => (
                        <motion.div
                            key={t.name}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="w-72 shrink-0 snap-start border border-charcoal-line bg-charcoal-raised p-6 transition-colors hover:border-blaze"
                        >
                            <div className="flex h-32 items-center justify-center gap-2 border border-dashed border-charcoal-line bg-charcoal text-[10px] uppercase tracking-widest text-steel-dim">
                                <span>Before</span>
                                <span className="text-blaze">→</span>
                                <span>After</span>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-steel">
                                "{t.quote}"
                            </p>
                            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-chalk">
                                {t.name}
                                <span className="ml-2 font-normal normal-case text-steel-dim">
                                    · {t.timeframe}
                                </span>
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div variants={fadeUp} className="mt-8 text-center">
                    <Link
                        to="/transformations"
                        className="inline-flex items-center gap-2 border border-charcoal-line px-6 py-3 text-xs font-bold uppercase tracking-widest text-chalk transition-colors hover:border-blaze hover:text-blaze"
                    >
                        See All Transformations →
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}