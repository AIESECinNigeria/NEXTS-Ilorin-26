import { useSyncExternalStore } from 'react'


const isMobileSize = (w, h) => w < 768 || (w < h && w < 1024)

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
