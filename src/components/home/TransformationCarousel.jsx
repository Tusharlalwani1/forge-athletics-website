import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { useTransformations } from '../../hooks/useTransformations';

export default function TransformationCarousel() {
    const scrollerRef = useRef(null);
    const { transformations } = useTransformations();
    const items = transformations && transformations.length > 0 ? transformations.slice(0, 4) : [];

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
                            className="rounded-full border border-charcoal-line p-2 text-steel transition-colors hover:border-blaze hover:text-blaze focus-visible:outline-none cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label="Scroll transformations right"
                            onClick={() => scroll(1)}
                            className="rounded-full border border-charcoal-line p-2 text-steel transition-colors hover:border-blaze hover:text-blaze focus-visible:outline-none cursor-pointer"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    ref={scrollerRef}
                    variants={fadeUp}
                    className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {items.map((t) => (
                        <motion.div
                            key={t.id || t.name}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="w-72 shrink-0 snap-start border border-charcoal-line bg-charcoal-raised p-5 transition-colors hover:border-blaze rounded-lg overflow-hidden flex flex-col justify-between"
                        >
                            <div className="relative flex h-36 w-full border border-charcoal-line bg-charcoal overflow-hidden rounded mb-4">
                                <div className="relative w-1/2 h-full overflow-hidden border-r border-charcoal-line/60">
                                    {t.beforeImage ? (
                                        <img
                                            src={t.beforeImage}
                                            alt={`${t.name} before transformation`}
                                            className="h-full w-full object-cover filter grayscale brightness-90"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-charcoal text-steel-dim text-[10px]">
                                            Before
                                        </div>
                                    )}
                                    <span className="absolute top-1.5 left-1.5 rounded bg-charcoal/80 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-steel border border-charcoal-line">
                                        Before
                                    </span>
                                </div>
                                <div className="relative w-1/2 h-full overflow-hidden">
                                    {t.afterImage ? (
                                        <img
                                            src={t.afterImage}
                                            alt={`${t.name} after transformation`}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-charcoal text-steel-dim text-[10px]">
                                            After
                                        </div>
                                    )}
                                    <span className="absolute top-1.5 right-1.5 rounded bg-blaze/90 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-chalk">
                                        After
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs leading-relaxed text-steel line-clamp-2 italic flex-1">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-chalk flex items-center justify-between pt-3 border-t border-charcoal-line/50">
                                <span>{t.name}</span>
                                <span className="font-mono text-[10px] normal-case text-steel-dim font-normal">
                                    {t.timeframeWeeks || t.timeframe} wks
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