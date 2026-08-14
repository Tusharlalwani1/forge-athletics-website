import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BillingToggle from '../components/membership/BillingToggle';
import PricingTable from '../components/membership/PricingTable';
import AddOns from '../components/membership/AddOns';
import MembershipFAQ from '../components/membership/MembershipFAQ';
import { useCheckout } from '../components/membership/useCheckout';
import { useTrialModal } from '../components/TrialForm/useTrialModal';
import { fadeUp } from '../lib/motion';

export default function Membership() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { openTrialModal } = useTrialModal();

  const {
    activeTierId,
    checkoutState,
    checkoutData,
    errorMessage,
    startCheckout,
    resetCheckout,
  } = useCheckout();

  return (
    <div className="min-h-screen bg-charcoal text-chalk flex flex-col">
      {/* 1. Hero Header Section */}
      <section className="relative border-b border-charcoal-line bg-charcoal-raised py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            Investment In Yourself
          </span>
          <h1 className="text-display mt-2 text-4xl sm:text-6xl lg:text-7xl text-chalk">
            TRANSPARENT <span className="text-blaze">PRICING</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-steel leading-relaxed">
            No hidden fees. No long-term lock-in contracts. Cancel or pause anytime with simple written notice.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8 flex-1">
        {/* 2. Billing Toggle Switch */}
        <BillingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />

        {/* 3. Pricing Comparison Table */}
        <PricingTable
          isAnnual={isAnnual}
          activeTierId={activeTierId}
          checkoutState={checkoutState}
          checkoutData={checkoutData}
          errorMessage={errorMessage}
          onStartCheckout={startCheckout}
          onResetCheckout={resetCheckout}
        />

        {/* 4. Optional Add-Ons Grid */}
        <AddOns />

        {/* 5. Membership FAQ Accordion */}
        <MembershipFAQ />
      </main>

      {/* 6. Bottom Reassuring CTA Band */}
      <section className="relative overflow-hidden border-t border-charcoal-line bg-charcoal-raised">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            Zero Risk
          </span>
          <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl lg:text-5xl">
            STILL DECIDING? <span className="text-blaze">YOUR FIRST CLASS IS FREE.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-steel sm:text-base">
            Come experience our community, coaches, and facility before committing to any membership plan.
          </p>
          <motion.button
            type="button"
            onClick={openTrialModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-2 bg-blaze px-8 py-4 text-sm font-bold uppercase tracking-wide text-chalk shadow-lg shadow-blaze/20 transition-colors hover:bg-blaze-dim focus-visible:outline-none cursor-pointer"
          >
            Claim Your Free Class →
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
