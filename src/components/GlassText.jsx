import { motion } from 'framer-motion'
import { fadeFrom } from '../motion'


export function GlassFilterDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="nexts-glass" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feFlood floodColor="#fff" floodOpacity="0.08" />
        <feComposite in2="SourceAlpha" operator="in" result="fill" />

        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="bump" />
        <feSpecularLighting in="bump" surfaceScale="6" specularConstant="1" specularExponent="16" lightingColor="#fff" result="spec">
          <feDistantLight azimuth="225" elevation="35" />
        </feSpecularLighting>
        <feComposite in="spec" in2="SourceAlpha" operator="in" />
        <feComponentTransfer result="shine">
          <feFuncA type="linear" slope="0.45" />
        </feComponentTransfer>

        <feOffset in="SourceAlpha" dx="2" dy="2" result="shiftDown" />
        <feComposite in="SourceAlpha" in2="shiftDown" operator="out" result="topLeftEdge" />
        <feFlood floodColor="#fff" floodOpacity="0.55" />
        <feComposite in2="topLeftEdge" operator="in" result="rim" />

        <feOffset in="SourceAlpha" dx="-2" dy="-2" result="shiftUp" />
        <feComposite in="SourceAlpha" in2="shiftUp" operator="out" result="bottomRightEdge" />
        <feFlood floodColor="#000" floodOpacity="0.14" />
        <feComposite in2="bottomRightEdge" operator="in" result="shade" />

        <feMerge>
          <feMergeNode in="fill" />
          <feMergeNode in="shade" />
          <feMergeNode in="shine" />
          <feMergeNode in="rim" />
        </feMerge>
      </filter>
    </svg>
  )
}


export function GlassLine({ children, from, delay = 0, className = '' }) {
  return (
    <motion.p {...fadeFrom(from, delay, 1.6)} className={`text-white ${className}`} style={{ filter: 'url(#nexts-glass)' }}>
      {children}
    </motion.p>
  )
}
