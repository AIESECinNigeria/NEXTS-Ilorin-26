import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { TIMING } from '../content'


export default function Typewriter({ segments, as: Tag = 'p', className = '', delay = 0, speed = TIMING.typeSpeed, onDone }) {
  const reduceMotion = useReducedMotion()
  const chars = useMemo(() => segments.flatMap((seg, s) => [...seg.text].map((ch) => ({ ch, s }))), [segments])
  const [count, setCount] = useState(reduceMotion ? chars.length : 0)

  useEffect(() => {
    if (reduceMotion) {
      onDone?.()
      return
    }
    let i = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= chars.length) {
          clearInterval(interval)
          onDone?.()
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
    
  }, [chars, delay, speed, reduceMotion])

  const typing = count < chars.length

  return (
    <Tag className={className} aria-label={segments.map((s) => s.text).join('')}>
      {segments.map((seg, s) => (
        <span key={s} className={seg.className} aria-hidden>
          {chars.map((c, i) =>
            c.s === s ? (
              <span key={i} className={`relative ${i < count ? '' : 'opacity-0'}`}>
                {c.ch}
                {typing && i === count - 1 && <Caret />}
              </span>
            ) : null,
          )}
        </span>
      ))}
    </Tag>
  )
}

function Caret() {
  return <span className="absolute top-[0.1em] right-[-0.1em] h-[0.9em] w-[3px] animate-pulse bg-current" />
}
