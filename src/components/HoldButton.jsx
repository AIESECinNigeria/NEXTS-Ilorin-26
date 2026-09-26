import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { TIMING } from '../content'


const SIZES = {
  desktop: {
    button: 'h-[52px]',
    chip: 'px-[24px] py-[16px]',
    label: 'text-stroke-self text-[16px] leading-[20px]',
    arrow: 'h-[20px] w-[34.856px]',
  },
  mobile: {
    button: 'h-[29.8px]',
    chip: 'h-[30.04px] w-[91.194px] px-[13.865px] py-[9.243px]',
    label: 'text-[9.243px] leading-[11.554px]',
    arrow: 'h-[11.555px] w-[20.142px]',
  },
}

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
  const progress = useMotionValue(0)
  const controls = useRef(null)
  const timer = useRef(null)
  const [holding, setHolding] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(
    () => () => {
      controls.current?.stop()
      clearTimeout(timer.current)
    },
    [],
  )

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
      onContextMenu={(e) => e.preventDefault()}
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
