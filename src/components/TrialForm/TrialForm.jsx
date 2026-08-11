import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { validateField, validateForm } from './trialFormSchema';
import { fadeUp, staggerContainer, popIn, EASE_FORCE } from '../../lib/motion';

export default function TrialForm({ variant = 'inline', onCloseModal }) {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    referral: '',
    consent: false,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [simulateErrorToggle, setSimulateErrorToggle] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // If already touched, re-validate real-time on change
    if (touched[name]) {
      const errorMsg = validateField(name, fieldValue);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
      }));
    }
  };

  // Field blur handler - validate on blur
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const errorMsg = validateField(name, fieldValue);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields to show any missing required errors
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      interest: true,
      referral: true,
      consent: true,
    };
    setTouched(allTouched);

    const { errors: validationErrors, isValid } = validateForm(formData);
    setErrors(validationErrors);

    if (!isValid) {
      // Focus first element with error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(`field-${firstErrorKey}`);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setStatus('submitting');

    // Simulate async submission (800ms - 1.2s delay)
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (simulateErrorToggle) {
            reject(new Error('Simulated network error'));
          } else {
            resolve();
          }
        }, 1000);
      });

      // TODO: replace with real API call to Mindbody/Glofox/Wodify + CRM webhook (see Module 8)
      
      // TODO: fire conversion event for Meta Pixel / Google Ads / GA4 here (Module 9/10)
      // trackEvent('trial_form_submitted', { interest_area: formData.interest, referral_source: formData.referral });

      setStatus('success');
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      interest: '',
      referral: '',
      consent: false,
    });
    setTouched({});
    setErrors({});
    setStatus('idle');
  };

  const isSubmitting = status === 'submitting';

  return (
    <div className={`w-full ${variant === 'modal' ? 'p-0' : ''}`}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          /* SUCCESS STATE */
          <motion.div
            key="success-message"
            role="status"
            aria-live="polite"
            variants={popIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-5"
          >
            {/* Animated Checkmark Pop-In */}
            <motion.div
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: EASE_FORCE }}
              className="w-16 h-16 bg-blaze/20 border-2 border-blaze rounded-full flex items-center justify-center text-blaze shadow-lg shadow-blaze/20"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-display text-3xl sm:text-4xl text-chalk tracking-wide">
                YOU'RE IN!
              </h3>
              <p className="text-steel text-sm sm:text-base leading-relaxed">
                Check your email — we've sent your free class details and instructions to claim your spot.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              {variant === 'modal' && onCloseModal && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onCloseModal}
                  className="bg-blaze hover:bg-blaze-dim text-chalk text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-blaze focus:outline-none"
                >
                  Done
                </motion.button>
              )}

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="bg-charcoal border border-charcoal-line hover:border-blaze text-steel hover:text-chalk text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-blaze focus:outline-none"
              >
                Submit Another Request
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* IDLE / SUBMITTING / ERROR FORM STATE */
          <motion.form
            key="trial-form"
            onSubmit={handleSubmit}
            noValidate
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-5"
          >
            {/* Inline Error Banner if submission failed */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  role="alert"
                  aria-live="assertive"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="bg-tape/15 border border-tape/40 text-tape rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Something went wrong — please try again or call us at (512) 555-0199.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="underline font-bold text-tape hover:text-chalk transition-colors cursor-pointer shrink-0"
                  >
                    Retry Submission
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 1. Full Name */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-1.5 text-left">
              <label htmlFor="field-fullName" className="text-xs font-bold uppercase tracking-wider text-steel">
                Full Name <span className="text-blaze">*</span>
              </label>
              <input
                id="field-fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.fullName && touched.fullName)}
                aria-describedby={errors.fullName && touched.fullName ? 'fullName-error' : undefined}
                placeholder="e.g. Alex Morgan"
                className={`bg-charcoal border ${
                  errors.fullName && touched.fullName
                    ? 'border-tape focus:border-tape focus:ring-1 focus:ring-tape'
                    : 'border-charcoal-line focus:border-blaze focus:ring-1 focus:ring-blaze'
                } text-chalk text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors duration-150 disabled:opacity-60 placeholder:text-steel-dim`}
              />
              <AnimatePresence>
                {errors.fullName && touched.fullName && (
                  <motion.p
                    id="fullName-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-tape text-xs font-semibold flex items-center gap-1 mt-1 overflow-hidden"
                  >
                    <span>⚠</span> {errors.fullName}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 2. Email Address */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-1.5 text-left">
              <label htmlFor="field-email" className="text-xs font-bold uppercase tracking-wider text-steel">
                Email Address <span className="text-blaze">*</span>
              </label>
              <input
                id="field-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.email && touched.email)}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                placeholder="e.g. alex@example.com"
                className={`bg-charcoal border ${
                  errors.email && touched.email
                    ? 'border-tape focus:border-tape focus:ring-1 focus:ring-tape'
                    : 'border-charcoal-line focus:border-blaze focus:ring-1 focus:ring-blaze'
                } text-chalk text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors duration-150 disabled:opacity-60 placeholder:text-steel-dim`}
              />
              <AnimatePresence>
                {errors.email && touched.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-tape text-xs font-semibold flex items-center gap-1 mt-1 overflow-hidden"
                  >
                    <span>⚠</span> {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 3. Phone Number */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-1.5 text-left">
              <label htmlFor="field-phone" className="text-xs font-bold uppercase tracking-wider text-steel">
                Phone Number <span className="text-blaze">*</span>
              </label>
              <input
                id="field-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.phone && touched.phone)}
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                placeholder="e.g. (512) 555-0123"
                className={`bg-charcoal border ${
                  errors.phone && touched.phone
                    ? 'border-tape focus:border-tape focus:ring-1 focus:ring-tape'
                    : 'border-charcoal-line focus:border-blaze focus:ring-1 focus:ring-blaze'
                } text-chalk text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors duration-150 disabled:opacity-60 placeholder:text-steel-dim`}
              />
              <AnimatePresence>
                {errors.phone && touched.phone && (
                  <motion.p
                    id="phone-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-tape text-xs font-semibold flex items-center gap-1 mt-1 overflow-hidden"
                  >
                    <span>⚠</span> {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 4. Interest Area (Optional) */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-1.5 text-left">
              <label htmlFor="field-interest" className="text-xs font-bold uppercase tracking-wider text-steel">
                Interest Area <span className="text-steel-dim font-normal text-[10px]">(Optional)</span>
              </label>
              <select
                id="field-interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className="bg-charcoal border border-charcoal-line focus:border-blaze focus:ring-1 focus:ring-blaze text-chalk text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors duration-150 disabled:opacity-60"
              >
                <option value="">Select an option (Optional)</option>
                <option value="CrossFit / Group Classes">CrossFit / Group Classes</option>
                <option value="Personal Training">Personal Training</option>
                <option value="Open Gym">Open Gym</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </motion.div>

            {/* 5. How did you hear about us? (Optional) */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-1.5 text-left">
              <label htmlFor="field-referral" className="text-xs font-bold uppercase tracking-wider text-steel">
                How did you hear about us? <span className="text-steel-dim font-normal text-[10px]">(Optional)</span>
              </label>
              <select
                id="field-referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className="bg-charcoal border border-charcoal-line focus:border-blaze focus:ring-1 focus:ring-blaze text-chalk text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors duration-150 disabled:opacity-60"
              >
                <option value="">Select how you found us (Optional)</option>
                <option value="Instagram">Instagram</option>
                <option value="Google Search">Google Search</option>
                <option value="Friend/Referral">Friend / Referral</option>
                <option value="Walked By">Walked By</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>

            {/* 6. Consent Checkbox */}
            <motion.div variants={fadeUp} className="flex flex-col text-left pt-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  id="field-consent"
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={Boolean(errors.consent && touched.consent)}
                  aria-describedby={errors.consent && touched.consent ? 'consent-error' : undefined}
                  className="mt-1 w-4 h-4 accent-blaze border-charcoal-line rounded focus:ring-2 focus:ring-blaze focus:ring-offset-2 focus:ring-offset-charcoal cursor-pointer"
                />
                <span className="text-xs text-steel leading-relaxed select-none">
                  I agree to be contacted by Forge Athletics and to the{' '}
                  <Link
                    to="/privacy"
                    className="text-blaze hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blaze rounded px-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </Link>
                  . <span className="text-blaze">*</span>
                </span>
              </label>
              <AnimatePresence>
                {errors.consent && touched.consent && (
                  <motion.p
                    id="consent-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-tape text-xs font-semibold flex items-center gap-1 mt-1.5 ml-7 overflow-hidden"
                  >
                    <span>⚠</span> {errors.consent}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeUp} className="pt-3">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={isSubmitting ? {} : { scale: 1.02 }}
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
                className="w-full bg-blaze hover:bg-blaze-dim disabled:bg-blaze/50 text-chalk text-sm font-bold uppercase tracking-wider py-3.5 px-6 rounded-sm shadow-lg shadow-blaze/20 transition-all duration-150 flex items-center justify-center gap-2.5 focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal focus:outline-none cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 text-chalk"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </motion.svg>
                    <span>Claiming Free Trial…</span>
                  </>
                ) : (
                  <span>Claim Your Free Class →</span>
                )}
              </motion.button>
            </motion.div>

            {/* Dev Mode Simulated Error Toggle */}
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setSimulateErrorToggle((prev) => !prev)}
                className="text-[10px] text-steel-dim hover:text-steel transition-colors underline cursor-pointer"
              >
                Dev: {simulateErrorToggle ? 'Simulate Error [ON]' : 'Simulate Error [OFF]'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
