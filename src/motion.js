// Reusable framer-motion animations. Spread one onto a motion element, e.g.
//   <motion.p {...fadeFrom({ y: 40 }, 0.3)}>Hello</motion.p>   → fades in while moving up 40px, after 0.3s

// Easing curve used everywhere: starts fast, settles gently
export const EASE = [0.22, 1, 0.36, 1]

// Fade in from an offset, e.g. { y: 40 } = start 40px lower. delay and duration are in seconds.
export function fadeFrom(offset = {}, delay = 0, duration = 1.1) {
  return {
    initial: { opacity: 0, ...offset },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration, delay, ease: EASE },
  }
}

// Slide in from the left or right: use the side of the screen the element sits on.
export function slideIn(side, delay = 0, distance = 80) {
  return fadeFrom({ x: side === 'left' ? -distance : distance }, delay)
}

// Thin lines draw themselves in from left to right.
export function drawIn(delay = 0) {
  return {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 1.2, delay, ease: EASE },
    style: { transformOrigin: 'left' },
  }
}

// Registration form, changing page: the questions slide in from the direction you're going
// (dir 1 = Next, -1 = Back) and each question appears a moment after the one above it.
export const stepContent = {
  enter: (dir) => ({ opacity: 0, x: 48 * dir }),
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.07, delayChildren: 0.08 } },
  exit: (dir) => ({ opacity: 0, x: -48 * dir, transition: { duration: 0.28, ease: 'easeIn' } }),
}

// One question inside stepContent: rises into place
export const stepItem = {
  enter: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
