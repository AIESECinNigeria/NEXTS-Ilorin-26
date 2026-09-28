import { useCallback, useEffect, useRef } from 'react'
import { AUDIO } from '../content'

const VOLUME = 0.6
const FADE_IN_MS = 1800
const SUCCESS_PATH = '/success'
const END_AFTER_SUCCESS_MS = 10000 // the song is silent this long after reaching the success page…
const FADE_OUT_MS = 3000 // …fading out over the last few seconds of it
// Only these count as permission to play sound. On phones a tap grants it when the finger lifts
// (touchend / pointerup / click), not when it lands — so listen for all of them.
const UNLOCK_EVENTS = ['pointerdown', 'pointerup', 'mousedown', 'touchend', 'click', 'keydown']

// Theme song for the whole site. Mounted above the router so it keeps playing between pages.
// Browsers block sound until the visitor interacts, so it starts on the first click/tap/key —
// in practice the "Start the furnace" button on Hero 01. It ends 10s after the success page opens.
export default function BackgroundMusic({ router }) {
  const audio = useRef(null)
  const fade = useRef(0)
  const finished = useRef(false) // once it has ended on the success page it never starts again

  // Smoothly move the volume to `target` over `ms`, then call `done`
  const rampVolume = useCallback((target, ms, done) => {
    const el = audio.current
    if (!el) return
    cancelAnimationFrame(fade.current)
    const from = el.volume
    const start = performance.now()
    const step = (now) => {
      // clamp: the first frame's timestamp can be slightly earlier than `start`, and volume must stay in 0–1
      const t = Math.max(0, Math.min(1, (now - start) / ms))
      el.volume = Math.max(0, Math.min(1, from + (target - from) * t))
      if (t < 1) fade.current = requestAnimationFrame(step)
      else done?.()
    }
    fade.current = requestAnimationFrame(step)
  }, [])

  const play = useCallback(() => {
    const el = audio.current
    if (!el || finished.current) return Promise.resolve(true)
    el.volume = 0
    return el.play().then(
      () => {
        rampVolume(VOLUME, FADE_IN_MS)
        return true
      },
      () => false,
    )
  }, [rampVolume])

  // Start on the first interaction the browser accepts
  useEffect(() => {
    let done = false
    let trying = false
    const remove = () => UNLOCK_EVENTS.forEach((e) => window.removeEventListener(e, unlock, true))
    // Keep listening until the browser actually lets the song start
    const unlock = () => {
      if (done || trying) return
      trying = true
      play().then((ok) => {
        trying = false
        if (ok) {
          done = true
          remove()
        }
      })
    }

    UNLOCK_EVENTS.forEach((e) => window.addEventListener(e, unlock, true))
    unlock() // straight away, in case the browser allows autoplay (e.g. a returning visitor on Chrome)
    return () => {
      done = true
      remove()
      cancelAnimationFrame(fade.current)
    }
  }, [play])

  // End the song 10 seconds after the success page opens
  useEffect(() => {
    let timer = null
    const check = (pathname) => {
      const onSuccess = pathname.replace(/\/$/, '') === SUCCESS_PATH
      if (onSuccess && !timer && !finished.current) {
        timer = setTimeout(() => {
          finished.current = true
          rampVolume(0, FADE_OUT_MS, () => audio.current?.pause())
        }, END_AFTER_SUCCESS_MS - FADE_OUT_MS)
      } else if (!onSuccess && timer) {
        clearTimeout(timer)
        timer = null
      }
    }
    check(router.state.location.pathname)
    const unsubscribe = router.subscribe((state) => check(state.location.pathname))
    return () => {
      unsubscribe()
      clearTimeout(timer)
    }
  }, [router, rampVolume])

  return <audio ref={audio} src={AUDIO.theme} loop preload="auto" />
}
