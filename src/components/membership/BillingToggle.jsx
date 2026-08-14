import React from 'react';
import { motion } from 'framer-motion';

export default function BillingToggle({ isAnnual, onToggle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        role="tablist"
        aria-label="Billing cycle options"
        className="inline-flex items-center rounded border border-charcoal-line bg-charcoal p-1.5 shadow-inner"
      >
        {/* Monthly Option */}
        <button
          type="button"
          role="tab"
          aria-selected={!isAnnual}
          aria-pressed={!isAnnual}
          onClick={() => onToggle(false)}
          className={`relative px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none ${
            !isAnnual ? 'text-chalk' : 'text-steel hover:text-chalk'
          }`}
        >
          {!isAnnual && (
            <motion.span
              layoutId="activeBillingTab"
              className="absolute inset-0 rounded bg-blaze shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">Monthly Billing</span>
        </button>

        {/* Annual Option */}
        <button
          type="button"
          role="tab"
          aria-selected={isAnnual}
          aria-pressed={isAnnual}
          onClick={() => onToggle(true)}
          className={`relative inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none ${
            isAnnual ? 'text-chalk' : 'text-steel hover:text-chalk'
          }`}
        >
          {isAnnual && (
            <motion.span
              layoutId="activeBillingTab"
              className="absolute inset-0 rounded bg-blaze shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            Annual Billing
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest transition-colors ${
                isAnnual ? 'bg-charcoal text-tape' : 'bg-tape/20 text-tape border border-tape/40'
              }`}
            >
              Save ~15%
            </span>
          </span>
        </button>
      </div>

      <p className="text-xs text-steel-dim font-medium">
        {isAnnual
          ? '★ Annual billing locks in maximum monthly savings.'
          : 'Month-to-month contracts. Pause or cancel anytime.'}
      </p>
    </div>
  );
}
