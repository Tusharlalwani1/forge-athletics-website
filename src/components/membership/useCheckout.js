import { useState } from 'react';

// TODO(Module 8): replace this simulated flow with a real Stripe Checkout
// session (or redirect to Glofox/Wodify/Mindbody's native purchase flow —
// see SRS Section 4.2.2 for the decision this depends on).

export function useCheckout() {
  const [activeTierId, setActiveTierId] = useState(null);
  const [checkoutState, setCheckoutState] = useState('idle'); // 'idle' | 'processing' | 'success' | 'error'
  const [checkoutData, setCheckoutData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const startCheckout = async (tier, isAnnual = false) => {
    setActiveTierId(tier.id);
    setCheckoutState('processing');
    setErrorMessage('');

    try {
      // Simulate fake network latency (~1s delay)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate checkout price
      const price = tier.isPerClass
        ? tier.monthlyPrice
        : isAnnual
        ? tier.annualPrice
        : tier.monthlyPrice;

      setCheckoutData({
        tierName: tier.name,
        billingCycle: tier.isPerClass ? 'Single Class' : isAnnual ? 'Annual (Monthly equivalent)' : 'Monthly',
        price,
        period: tier.period,
        email: 'athlete@example.com',
      });

      setCheckoutState('success');
    } catch (err) {
      setErrorMessage('Checkout connection error. Please try again.');
      setCheckoutState('error');
    }
  };

  const resetCheckout = () => {
    setCheckoutState('idle');
    setActiveTierId(null);
    setCheckoutData(null);
    setErrorMessage('');
  };

  return {
    activeTierId,
    checkoutState,
    checkoutData,
    errorMessage,
    startCheckout,
    resetCheckout,
  };
}
