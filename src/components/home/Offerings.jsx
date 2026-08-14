import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Activity, Salad } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

const OFFERINGS = [
    {
        icon: Dumbbell,
        title: 'Group WODs',
        description: 'Coached, scaled-for-everyone workouts, every hour, all day.',
        href: '/classes',
    },
    {
        icon: Users,
        title: 'Personal Training',
        description: '1-on-1 programming built around your specific goals.',
        href: '/coaches',
    },
    {
        icon: Activity,
        title: 'Open Gym',
        description: 'Unlimited access to the floor between coached sessions.',
        href: '/membership',
    },
    {
        icon: Salad,
        title: 'Nutrition Coaching',
        description: 'Simple, sustainable eating guidance — no fad diets.',
        href: '/membership',
    },
];

export default function Offerings() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-display text-3xl text-chalk sm:text-4xl"
                >
                    What We <span className="text-blaze">Offer</span>
                </motion.h2>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {OFFERINGS.map(({ icon: Icon, title, description, href }) => (
                        <motion.div key={title} variants={fadeUp}>
                            <Link
                                to={href}
                                className="group block h-full border border-charcoal-line bg-charcoal-raised p-6 transition-colors hover:border-blaze"
                            >
                                <Icon
                                    className="h-7 w-7 text-blaze transition-transform duration-200 group-hover:-translate-y-0.5"
                                    strokeWidth={1.75}
                                />
                                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-chalk">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-steel">
                                    {description}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}