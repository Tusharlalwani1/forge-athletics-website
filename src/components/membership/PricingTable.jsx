import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';
import { useMembership } from '../../hooks/useMembership';
import { useTrialModal } from '../TrialForm/useTrialModal';

export default function PricingTable({
  isAnnual,
  activeTierId,
  checkoutState,
  checkoutData,
  errorMessage,
  onStartCheckout,
  onResetCheckout,
}) {
  const { tiers } = useMembership();
  const { openTrialModal } = useTrialModal();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      {(tiers || []).map((tier) => {
        const isFeatured = tier.featured;
        const displayPrice = tier.isPerClass
          ? tier.monthlyPrice
          : isAnnual
          ? tier.annualPrice
          : tier.monthlyPrice;

        const isCurrentTierActive = activeTierId === tier.id;
        const isProcessing = isCurrentTierActive && checkoutState === 'processing';
        const isSuccess = isCurrentTierActive && checkoutState === 'success';
        const isError = isCurrentTierActive && checkoutState === 'error';

        return (
          <motion.div
            key={tier.id}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className={`relative flex flex-col rounded-lg border p-6 sm:p-8 transition-all duration-200 ${
              isFeatured
                ? 'border-blaze bg-charcoal-raised shadow-xl shadow-blaze/10 ring-1 ring-blaze/50'
                : 'border-charcoal-line bg-charcoal-raised hover:border-steel-dim'
            }`}
          >
            {/* Featured Badge */}
            {isFeatured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-block rounded bg-blaze px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-chalk shadow-md">
                  {tier.badgeText || 'Most Popular'}
                </span>
              </div>
            )}

            {/* Header Section */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold uppercase tracking-wide text-chalk flex items-center justify-between">
                {tier.name}
              </h3>
              <p className="text-xs text-steel leading-relaxed min-h-[36px]">
                {tier.tagline}
              </p>
            </div>

            {/* Price Display */}
            <div className="my-6 border-y border-charcoal-line/60 py-4">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-steel">$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${tier.id}-${displayPrice}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="scoreboard-value text-4xl sm:text-5xl font-extrabold text-chalk tracking-tight"
                  >
                    {displayPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xs font-mono text-steel-dim ml-1 font-semibold">
                  {tier.period}
                </span>
              </div>
              {isAnnual && !tier.isPerClass && (
                <p className="mt-1 text-[11px] text-tape font-mono">
                  Billed annually (${displayPrice * 12}/yr) — Save ${ (tier.monthlyPrice - tier.annualPrice) * 12 }/yr
                </p>
              )}
            </div>

            {/* Feature Comparison List */}
            <div className="flex-1 space-y-3.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-steel-dim">
                Included Features:
              </p>
              <ul className="space-y-3 text-xs">
                {tier.features.map((feat) => (
                  <li
                    key={feat.label}
                    className="flex items-start justify-between gap-3 border-b border-charcoal-line/30 pb-2.5"
                  >
                    <span className="font-medium text-steel shrink-0">{feat.label}:</span>
                    <span className="text-right font-semibold">
                      {feat.value === false ? (
                        <span className="inline-flex items-center gap-1 text-steel-dim">
                          <Minus className="h-3.5 w-3.5" /> Excluded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-chalk">
                          <Check className="h-3.5 w-3.5 text-blaze shrink-0" />
                          {feat.value}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA & Checkout State Area */}
            <div className="mt-8 pt-4 border-t border-charcoal-line/60 space-y-3 text-center">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-200 text-left space-y-2"
                >
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Registration Success!
                  </div>
                  <p className="leading-relaxed">
                    You're signed up for <strong>{checkoutData?.tierName}</strong> ({checkoutData?.billingCycle}). Check your email for receipt & orientation details!
                  </p>
                  <button
                    type="button"
                    onClick={onResetCheckout}
                    className="mt-1 text-[11px] text-emerald-400 underline font-semibold hover:text-emerald-300 cursor-pointer"
                  >
                    Close confirmation
                  </button>
                </motion.div>
              ) : (
                <>
                  {isError && (
                    <div className="rounded border border-red-500/40 bg-red-950/30 p-2.5 text-xs text-red-300 flex items-center gap-1.5 text-left">
                      <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                      <span>{errorMessage || 'Connection error.'}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={isProcessing}
                    aria-busy={isProcessing}
                    onClick={() => onStartCheckout(tier, isAnnual)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none cursor-pointer ${
                      isFeatured
                        ? 'bg-blaze text-chalk shadow-lg shadow-blaze/20 hover:bg-blaze-dim'
                        : 'bg-charcoal border border-charcoal-line text-chalk hover:border-blaze hover:text-blaze'
                    } ${isProcessing ? 'opacity-80 cursor-wait' : ''}`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-chalk" />
                        Processing...
                      </>
                    ) : (
                      tier.ctaText
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openTrialModal}
                    className="block w-full text-center text-xs font-semibold text-steel hover:text-chalk transition-colors underline decoration-charcoal-line underline-offset-4 cursor-pointer"
                  >
                    Not sure yet? Try a class free →
                  </button>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
