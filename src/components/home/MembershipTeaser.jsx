import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

const TIERS = [
    {
        name: 'Drop-In',
        price: '$25',
        period: '/class',
        features: ['Single class access', 'No commitment'],
        featured: false,
    },
    {
        name: 'Unlimited',
        price: '$179',
        period: '/mo',
        features: ['Unlimited classes', 'Open gym access', '1 guest pass/mo'],
        featured: true,
    },
    {
        name: 'Elite',
        price: '$249',
        period: '/mo',
        features: ['Everything in Unlimited', 'Monthly nutrition check-in', 'Priority booking'],
        featured: false,
    },
];

export default function MembershipTeaser() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUp} className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-blaze">
                        Membership
                    </span>
                    <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl">
                        Pick Your Plan
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-steel">
                        No long-term contracts. Cancel or pause anytime.
                    </p>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {TIERS.map((tier) => (
                        <motion.div
                            key={tier.name}
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            className={`flex flex-col border p-6 ${tier.featured
                                    ? 'border-blaze bg-charcoal-raised shadow-lg shadow-blaze/10'
                                    : 'border-charcoal-line bg-charcoal-raised'
                                }`}
                        >
                            {tier.featured && (
                                <span className="mb-3 inline-block w-fit bg-blaze px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-chalk">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="text-sm font-bold uppercase tracking-wide text-chalk">
                                {tier.name}
                            </h3>
                            <p className="mt-2">
                                <span className="scoreboard-value text-3xl text-chalk">
                                    {tier.price}
                                </span>
                                <span className="text-sm text-steel-dim">{tier.period}</span>
                            </p>
                            <ul className="mt-4 flex-1 space-y-2">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-steel">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blaze" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div variants={fadeUp} className="mt-8 text-center">
                    <Link
                        to="/membership"
                        className="inline-flex items-center gap-2 border border-charcoal-line px-6 py-3 text-xs font-bold uppercase tracking-widest text-chalk transition-colors hover:border-blaze hover:text-blaze"
                    >
                        Compare Full Pricing →
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}