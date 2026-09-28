import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ForgeFrame, { Watermark } from '../components/ForgeFrame'
import useViewport from '../hooks/useViewport'
import { IMAGES } from '../content'
import { drawIn, fadeFrom, slideIn } from '../motion'


// Hero 01 waits for the visitor: "Start the furnace" is the tap that lets the browser start the music
// (BackgroundMusic listens for the first click anywhere), then we move on to Hero 02.
export default function HeroIntro({ onNext }) {
  const { isMobile } = useViewport()

  return (
    <ForgeFrame mobile={isMobile} mobileHeader={{ src: IMAGES.mHeader01, top: 40 }}>
      <h1 className="sr-only">A rare call from the forge</h1>
      {isMobile ? <Mobile /> : <Desktop />}
      <StartButton mobile={isMobile} onStart={onNext} />
    </ForgeFrame>
  )
}

const LIT_PAUSE = 650 // ms the button glows orange before the screen fades

function StartButton({ mobile, onStart }) {
  const [lit, setLit] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const start = () => {
    if (lit) return
    setLit(true)
    navigator.vibrate?.(30)
    timer.current = setTimeout(onStart, LIT_PAUSE)
  }

  return (
    // Centred under the headline; appears once the words have landed
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute left-1/2 -translate-x-1/2 ${mobile ? 'top-162' : 'top-212'}`}
    >
      {/* Idle bounce, paused once lit */}
      <motion.div
        animate={lit ? { y: 0 } : { y: [0, -8, 0, -3, 0] }}
        transition={lit ? { duration: 0.2 } : { duration: 1.6, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut', delay: 2.2 }}
        className="relative"
      >
        {/* Heat rings breathing out from the button */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute inset-0 border-2 border-cream"
            initial={{ opacity: 0, scale: 1 }}
            animate={lit ? { opacity: [0.9, 0], scale: [1, 1.5] } : { opacity: [0.7, 0], scale: [1, 1.35] }}
            transition={lit ? { duration: 0.6 } : { duration: 2, repeat: Infinity, delay: 2.2 + i, ease: 'easeOut' }}
          />
        ))}

        <motion.button
          type="button"
          onClick={start}
          disabled={lit}
          whileHover={lit ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ backgroundColor: lit ? '#ff6b00' : '#f4f2ed' }}
          transition={{ duration: 0.3 }}
          className={`relative flex cursor-pointer items-center shadow-[0_0_32px_rgba(255,107,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream disabled:cursor-default ${
            mobile ? 'h-11 gap-2.5 px-5' : 'h-13 gap-3 px-6'
          }`}
        >
          <span
            className={`font-glyphic whitespace-nowrap uppercase transition-colors duration-300 ${lit ? 'text-cream' : 'text-ink'} ${
              mobile ? 'text-[13px] leading-4' : 'text-stroke-self text-[16px] leading-5'
            }`}
          >
            {lit ? 'Firing up…' : 'Start the furnace'}
          </span>
          <motion.img
            src={lit ? IMAGES.arrowsDark : IMAGES.arrowsOrange}
            alt=""
            animate={lit ? { x: 10, opacity: 0 } : { x: [0, 5, 0] }}
            transition={lit ? { duration: 0.4 } : { duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className={mobile ? 'h-4 w-7' : 'h-5 w-8.75'}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function Desktop() {
  const word = 'absolute text-[120px] leading-[150px] tracking-[-3.6px] whitespace-nowrap uppercase'
  return (
    <>
      <Watermark />

      <motion.p {...slideIn('left', 0.5)} aria-hidden className={`${word} top-67.5 left-30`}>A rare</motion.p>
      <motion.p {...slideIn('left', 0.65)} aria-hidden className={`${word} top-134.25 left-30`}>from</motion.p>

      <motion.div {...fadeFrom({ y: 40 }, 0.3, 1.4)} className="absolute top-58.25 left-38.25 h-151.75 w-269.75">
        <img src={IMAGES.hero01Anvil} alt="" className="absolute inset-0 size-full object-cover" />
        <img src={IMAGES.hero01AnvilOverlay} alt="" className="absolute inset-0 size-full object-cover opacity-75" />
      </motion.div>

      <motion.p {...slideIn('right', 0.55)} aria-hidden className={`${word} top-67.5 left-250`}>call</motion.p>
      <motion.div {...slideIn('right', 0.7)} aria-hidden className={`${word} top-138 right-30 text-right leading-30`}>
        <p>the</p>
        <p>FORGE</p>
      </motion.div>

      <motion.img {...drawIn(0.6)} src={IMAGES.ruleBottom} alt="" className="absolute top-240 left-30 h-px w-300" />
    </>
  )
}

function Mobile() {
  const word = 'absolute text-[35px] leading-[44.875px] tracking-[-1.05px] whitespace-nowrap uppercase'
  return (
    <>
      <motion.p {...slideIn('left', 0.5, 30)} aria-hidden className={`${word} top-73 left-3.75`}>A rare</motion.p>
      <motion.p {...slideIn('left', 0.65, 30)} aria-hidden className={`${word} top-93 left-3.75`}>from</motion.p>

      {/* Figma layers the same anvil three times: two at 75%, one colour-burned */}
      <motion.div {...fadeFrom({ y: 24 }, 0.3, 1.4)} className="absolute top-67 left-3.75 h-50.75 w-90.25">
        <img src={IMAGES.hero01AnvilOverlay} alt="" className="absolute inset-0 size-full object-cover opacity-75" />
        <img src={IMAGES.hero01AnvilOverlay} alt="" className="absolute inset-0 size-full object-cover opacity-75" />
        <img src={IMAGES.hero01AnvilOverlay} alt="" className="absolute inset-0 size-full object-cover opacity-75 mix-blend-color-burn" />
      </motion.div>

      <motion.p {...slideIn('right', 0.55, 30)} aria-hidden className={`${word} top-73 left-69.5`}>call</motion.p>
      <motion.div {...slideIn('right', 0.7, 30)} aria-hidden className={`${word} top-94 right-3.75 text-right leading-[35.9px]`}>
        <p>the</p>
        <p>FORGE</p>
      </motion.div>

      <Watermark mobile />

      <motion.img {...drawIn(0.6)} src={IMAGES.ruleBottom} alt="" className="absolute top-181.75 -left-101.25 h-px w-300" />
    </>
  )
}
