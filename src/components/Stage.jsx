import useViewport from '../hooks/useViewport'
import { DESKTOP } from './stageSizes'


// A fixed-size canvas (e.g. 1440×1024) scaled up or down to fit the screen, so everything inside
// can be positioned with exact values and still look the same on any screen size.
//   fit="contain" (default): the whole canvas is visible, centred. Use for content.
//   fit="cover": the canvas fills the screen, edges may be cropped. Use for backgrounds.
//   anchor="left": stick to the left edge of the screen instead of the centre.
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
