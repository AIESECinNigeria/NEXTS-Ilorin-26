import useViewport from '../hooks/useViewport'
import { DESKTOP } from './stageSizes'


export default function Stage({ size = DESKTOP, fit = 'contain', className = '', children }) {
  const { w, h } = useViewport()
  const sx = w / size.width
  const sy = h / size.height
  const scale = fit === 'cover' ? Math.max(sx, sy) : Math.min(sx, sy)

  return (
    <div
      className={`absolute top-1/2 left-1/2 ${className}`}
      style={{ width: size.width, height: size.height, transform: `translate(-50%, -50%) scale(${scale})` }}
    >
      {children}
    </div>
  )
}
