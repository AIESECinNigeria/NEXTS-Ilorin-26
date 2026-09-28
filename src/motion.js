// Shared entrance presets for the hero screens. Spread onto a motion element: <motion.p {...fadeFrom({ y: 40 }, 0.3)} />
export const EASE = [0.22, 1, 0.36, 1]

export function fadeFrom(offset = {}, delay = 0, duration = 1.1) {
  return {
    initial: { opacity: 0, ...offset },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration, delay, ease: EASE },
  }
}

// Words enter from the side of the screen they sit on.
export function slideIn(side, delay = 0, distance = 80) {
  return fadeFrom({ x: side === 'left' ? -distance : distance }, delay)
}

// Thin rules draw themselves in from the left.
export function drawIn(delay = 0) {
  return {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 1.2, delay, ease: EASE },
    style: { transformOrigin: 'left' },
  }
}

// Registration card: the questions slide in from the side you're heading to (dir 1 = next, -1 = back)
// and appear one after another.
export const stepContent = {
  enter: (dir) => ({ opacity: 0, x: 48 * dir }),
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.07, delayChildren: 0.08 } },
  exit: (dir) => ({ opacity: 0, x: -48 * dir, transition: { duration: 0.28, ease: 'easeIn' } }),
}

export const stepItem = {
  enter: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
