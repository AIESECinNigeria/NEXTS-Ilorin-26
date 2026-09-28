import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { TIMING } from '../content'

// Button sizes: desktop, "bar" (full-width mobile bar) and "mobile" (small mobile button)
const SIZES = {
  desktop: {
    button: 'h-[52px]',
    chip: 'px-[24px] py-[16px]',
    label: 'text-stroke-self text-[16px] leading-[20px]',
    arrow: 'h-[20px] w-[34.856px]',
  },
  bar: {
    button: 'h-10',
    chip: 'px-4.5',
    label: 'text-[12px] leading-[15px]',
    arrow: 'h-3.75 w-6.5',
  },
  mobile: {
    button: 'h-[29.8px]',
    chip: 'h-[30.04px] w-[91.194px] px-[13.865px] py-[9.243px]',
    label: 'text-[9.243px] leading-[11.554px]',
    arrow: 'h-[11.555px] w-[20.142px]',
  },
}

// Press-and-hold button: a bar fills from left to right while it's held (mouse, touch, or Space/Enter).
// Letting go early drains it. When full it switches to its "done" colours, vibrates on phones,
// then calls onComplete after a short pause.
//   trackClass / fillClass     background of the empty bar / the filling part
//   chipClass                  the box around the label and arrow
//   labelClass / doneLabelClass  label colour before / after it's full
export default function HoldButton({
  label,
  arrow,
  onComplete,
  duration = TIMING.holdToFill,
  className = '',
  trackClass,
  fillClass,
  chipClass,
  labelClass,
  doneLabelClass,
  size = 'desktop',
}) {
  const s = SIZES[size]
  const progress = useMotionValue(0) // 0 = empty, 1 = full; drives the fill width without re-rendering
  const controls = useRef(null)
  const timer = useRef(null)
  const [holding, setHolding] = useState(false)
  const [done, setDone] = useState(false)

  // Stop any running animation / timer if the button disappears mid-hold
  useEffect(
    () => () => {
      controls.current?.stop()
      clearTimeout(timer.current)
    },
    [],
  )

  // Fill up from wherever the bar is now, so a quick re-press continues instead of restarting
  const start = () => {
    if (done) return
    setHolding(true)
    controls.current?.stop()
    controls.current = animate(progress, 1, {
      duration: ((1 - progress.get()) * duration) / 1000,
      ease: 'linear',
      onComplete: () => {
        setHolding(false)
        setDone(true)
        navigator.vibrate?.(40)
        timer.current = setTimeout(() => onComplete?.(), TIMING.afterFill)
      },
    })
  }

  // Let go before it's full: drain back to empty
  const release = () => {
    if (done || !holding) return
    setHolding(false)
    controls.current?.stop()
    controls.current = animate(progress, 0, { duration: progress.get() * 0.45, ease: 'easeOut' })
  }

  const isActivationKey = (e) => e.key === ' ' || e.key === 'Enter'

  return (
    <motion.button
      type="button"
      aria-label={`Press and hold to ${label.toLowerCase()}`}
      onPointerDown={(e) => {
        // keep receiving pointer events even if the finger slides off the button
        e.currentTarget.setPointerCapture?.(e.pointerId)
        start()
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onKeyDown={(e) => {
        if (!isActivationKey(e)) return
        e.preventDefault()
        if (!e.repeat) start()
      }}
      onKeyUp={(e) => isActivationKey(e) && release()}
      onBlur={release}
      onContextMenu={(e) => e.preventDefault()} // a long press on phones would otherwise open the context menu
      animate={{ scale: holding ? 0.99 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`relative flex ${s.button} w-full cursor-pointer touch-none justify-end select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${className}`}
    >
      <span className={`absolute inset-0 ${trackClass}`} />
      <motion.span style={{ scaleX: progress }} className={`absolute inset-0 origin-left ${fillClass}`} />

      <span className={`relative flex shrink-0 items-center ${s.chip} ${chipClass}`}>
        <span
          className={`font-glyphic ${s.label} whitespace-nowrap uppercase transition-colors duration-300 ${done ? doneLabelClass : labelClass}`}
        >
          {label}
        </span>
        <motion.img src={arrow} alt="" className={s.arrow} animate={{ x: done ? 4 : 0 }} />
      </span>
    </motion.button>
  )
}
