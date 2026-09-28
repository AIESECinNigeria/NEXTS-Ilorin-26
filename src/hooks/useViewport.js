import { useSyncExternalStore } from 'react'

// Screen size + whether to show the mobile layout. Re-renders the component when the window resizes.
//   const { w, h, isMobile } = useViewport()

// Mobile layout for phones, and for tablets held upright (portrait and under 1024px wide)
const isMobileSize = (w, h) => w < 768 || (w < h && w < 1024)

// Return the same object until the size actually changes, so React doesn't re-render for nothing
let cache = null
function snapshot() {
  const w = window.innerWidth
  const h = window.innerHeight
  if (!cache || cache.w !== w || cache.h !== h) cache = { w, h, isMobile: isMobileSize(w, h) }
  return cache
}

function subscribe(onChange) {
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

export default function useViewport() {
  return useSyncExternalStore(subscribe, snapshot)
}
