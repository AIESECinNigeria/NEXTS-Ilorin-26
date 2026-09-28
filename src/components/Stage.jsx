import useViewport from '../hooks/useViewport'
import { DESKTOP } from './stageSizes'


// anchor="left" keeps the canvas vertically centred but pinned to the viewport's left edge
// (for content that belongs at the left of the screen, not the centred canvas).
export default function Stage({ size = DESKTOP, fit = 'contain', anchor = 'center', className = '', children }) {
  const { w, h } = useViewport()
  const sx = w / size.width
  const sy = h / size.height
  const scale = fit === 'cover' ? Math.max(sx, sy) : Math.min(sx, sy)
  const pinned = anchor === 'left'

  return (
    <div
      className={`absolute ${pinned ? 'top-1/2 left-0' : 'top-1/2 left-1/2'} ${className}`}
      style={{
        width: size.width,
        height: size.height,
        transform: pinned ? `translateY(-50%) scale(${scale})` : `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: pinned ? 'left center' : undefined,
      }}
    >
      {children}
    </div>
  )
}
