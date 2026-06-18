import type { Transition } from "framer-motion";

/**
 * Strong custom ease-out curve (per Emil Kowalski's design-engineering notes).
 * The built-in CSS/framer easings are too weak — this gives entrances intent:
 * fast start, smooth settle.
 */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Strong ease-in-out for on-screen movement / morphing. */
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

/** Shared "fade up on scroll into view" preset. */
export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: EASE_OUT } as Transition,
};
