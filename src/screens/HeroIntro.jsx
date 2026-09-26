import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ForgeFrame, { Watermark } from '../components/ForgeFrame'
import useViewport from '../hooks/useViewport'
import { IMAGES, TIMING } from '../content'
import { drawIn, fadeFrom, slideIn } from '../motion'


export default function HeroIntro({ onNext }) {
  const { isMobile } = useViewport()

  useEffect(() => {
    const t = setTimeout(onNext, TIMING.fade * 1000 + TIMING.introHold)
    return () => clearTimeout(t)
  }, [onNext])

  return (
    <ForgeFrame mobile={isMobile} mobileHeader={{ src: IMAGES.mHeader01, top: 40 }}>
      <h1 className="sr-only">A rare call from the forge</h1>
      {isMobile ? <Mobile /> : <Desktop />}
    </ForgeFrame>
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
