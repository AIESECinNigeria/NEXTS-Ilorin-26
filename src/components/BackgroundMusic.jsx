import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AUDIO } from '../content'

const STORAGE_KEY = 'nexts-music-muted'
const VOLUME = 0.6
const FADE_MS = 1800
const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart']

function readMuted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function saveMuted(muted) {
  try {
    localStorage.setItem(STORAGE_KEY, muted ? '1' : '0')
  } catch {
    // storage blocked (private mode etc.) — the choice just won't be remembered
  }
}

// Theme song for the whole site. Mounted above the router so it keeps playing between pages.
// Browsers block sound until the visitor interacts, so if autoplay is refused we start on the first tap/click/key.
export default function BackgroundMusic() {
  const audio = useRef(null)
  const fade = useRef(0)
  const [muted, setMuted] = useState(readMuted)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(() => {
    const el = audio.current
    if (!el) return Promise.resolve(false)
    cancelAnimationFrame(fade.current)
    el.volume = 0
    return el.play().then(
      () => {
        // fade in instead of starting at full volume
        const start = performance.now()
        const step = (now) => {
          const t = Math.min(1, (now - start) / FADE_MS)
          el.volume = VOLUME * t
          if (t < 1) fade.current = requestAnimationFrame(step)
        }
        fade.current = requestAnimationFrame(step)
        return true
      },
      () => false,
    )
  }, [])

  useEffect(() => {
    if (muted) return
    let unlocked = false
    const unlock = () => {
      if (unlocked) return
      unlocked = true
      remove()
      play()
    }
    const remove = () => UNLOCK_EVENTS.forEach((e) => window.removeEventListener(e, unlock, true))

    play().then((ok) => {
      if (!ok && !unlocked) UNLOCK_EVENTS.forEach((e) => window.addEventListener(e, unlock, true))
    })
    return remove
  }, [muted, play])

  useEffect(() => () => cancelAnimationFrame(fade.current), [])

  const toggle = () => {
    const next = !muted
    setMuted(next)
    saveMuted(next)
    if (next) {
      cancelAnimationFrame(fade.current)
      audio.current?.pause()
    }
  }

  const on = playing && !muted

  return (
    <>
      <audio ref={audio} src={AUDIO.theme} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={muted ? 'Play music' : 'Mute music'}
        aria-pressed={!muted}
        title={muted ? 'Play music' : 'Mute music'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed right-2 bottom-2 z-50 flex h-8 w-8 md:right-3 md:bottom-3 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-full border border-cream/25 bg-ink/50 backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      >
        {/* Equalizer bars dance while the song plays and flatten when it's off */}
        <span aria-hidden className="flex h-3.5 items-end gap-0.75">
          {[0.9, 0.5, 1, 0.65].map((peak, i) => (
            <motion.span
              key={i}
              className="w-0.75 origin-bottom rounded-full bg-cream"
              style={{ height: '100%' }}
              animate={{ scaleY: on ? [0.25, peak, 0.4, peak * 0.8, 0.25] : 0.18 }}
              transition={on ? { duration: 1.1 + i * 0.15, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
            />
          ))}
        </span>
      </motion.button>
    </>
  )
}
