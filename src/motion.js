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
