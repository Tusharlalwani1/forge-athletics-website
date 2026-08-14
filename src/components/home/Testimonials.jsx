import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

const TESTIMONIALS = [
    { name: 'Chris B.', quote: 'Best coaching I\u2019ve had at any gym. They actually watch your form.', rating: 5 },
    { name: 'Nadia F.', quote: 'The community here keeps me showing up on the hard days.', rating: 5 },
    { name: 'Omar S.', quote: 'Scaled everything perfectly for a total beginner. Zero intimidation.', rating: 5 },
];

export default function Testimonials() {
    return (
        <section className="border-y border-charcoal-line bg-charcoal-raised">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-display text-center text-3xl text-chalk sm:text-4xl"
                >
                    What Our Members Say
                </motion.h2>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {TESTIMONIALS.map((t) => (
                        <motion.div
                            key={t.name}
                            variants={fadeUp}
                            className="border border-charcoal-line bg-charcoal p-6"
                        >
                            <div className="flex gap-0.5">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-tape text-tape" />
                                ))}
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-steel">
                                "{t.quote}"
                            </p>
                            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-chalk">
                                {t.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}