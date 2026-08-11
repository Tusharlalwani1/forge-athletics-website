// Motion system configurations and variant presets for Forge Athletics
// Designed for smooth performance, reduced motion compliance, and consistent easing.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_FORCE = [0.25, 1, 0.5, 1]; // sharp force curve, no bounce/spring

export const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT_EXPO }
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: EASE_OUT_EXPO }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07
    }
  }
};

export const popIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.25, ease: EASE_FORCE }
};

export const scrollReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: EASE_OUT_EXPO }
};

export const hoverLift = {
  whileHover: { y: -3, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: EASE_OUT_EXPO }
};

export const socialIconHover = {
  whileHover: { scale: 1.15 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.15, ease: 'easeOut' }
};
