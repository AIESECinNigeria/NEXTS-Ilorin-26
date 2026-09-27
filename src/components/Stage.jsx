import useViewport from '../hooks/useViewport'
import { DESKTOP } from './stageSizes'


// anchor="bottom-left" pins the scaled canvas to the viewport's bottom-left corner instead of centring it
// (used for photos that bleed off the left/bottom edge, so no hard cut shows on wider screens).
export default function Stage({ size = DESKTOP, fit = 'contain', anchor = 'center', className = '', children }) {
  const { w, h } = useViewport()
  const sx = w / size.width
  const sy = h / size.height
  const scale = fit === 'cover' ? Math.max(sx, sy) : Math.min(sx, sy)
  const pinned = anchor === 'bottom-left'

  return (
    <div
      className={`absolute ${pinned ? 'bottom-0 left-0' : 'top-1/2 left-1/2'} ${className}`}
      style={{
        width: size.width,
        height: size.height,
        transform: pinned ? `scale(${scale})` : `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: pinned ? 'left bottom' : undefined,
      }}
    >
      {children}
    </div>
  )
}
