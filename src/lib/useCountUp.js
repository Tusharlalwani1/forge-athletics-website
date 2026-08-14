import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Counts a number up from 0 to `target` once the ref enters the viewport.
// Respects prefers-reduced-motion by snapping straight to the target.
export function useCountUp(target, { duration = 1200, once = true } = {}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.5 });
    const shouldReduceMotion = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        if (shouldReduceMotion) {
            setValue(target);
            return;
        }

        let start = null;
        let frame;

        const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

        const step = (timestamp) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = easeOutExpo(progress);
            setValue(Math.round(eased * target));
            if (progress < 1) {
                frame = requestAnimationFrame(step);
            }
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [isInView, target, duration, shouldReduceMotion]);

    return [ref, value];
}