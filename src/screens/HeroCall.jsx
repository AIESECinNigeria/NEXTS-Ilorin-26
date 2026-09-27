import { motion } from 'framer-motion'
import ForgeFrame, { Watermark } from '../components/ForgeFrame'
import HoldButton from '../components/HoldButton'
import useViewport from '../hooks/useViewport'
import { IMAGES } from '../content'
import { fadeFrom, slideIn } from '../motion'


export default function HeroCall({ onNext }) {
  const { isMobile } = useViewport()

  return (
    <ForgeFrame mobile={isMobile} mobileHeader={{ src: IMAGES.mHeader02, top: 37 }}>
      <h1 className="sr-only">A call to become both the master and masterpiece</h1>
      {isMobile ? <Mobile onNext={onNext} /> : <Desktop onNext={onNext} />}
    </ForgeFrame>
  )
}


function Desktop({ onNext }) {
  const word = 'absolute text-[120px] leading-[120px] tracking-[-3.6px] whitespace-nowrap uppercase'
  return (
    <>
      <Watermark />

      <motion.p {...slideIn('left', 0.5)} aria-hidden className={`${word} top-67 left-30`}>A call</motion.p>
      <motion.p {...slideIn('left', 0.65)} aria-hidden className={`${word} top-119 left-30`}>both</motion.p>
      <motion.p {...slideIn('right', 0.8)} aria-hidden className={`${word} top-162.5 left-189.25`}>terpiece</motion.p>

      <motion.div {...fadeFrom({ y: 40 }, 0.3, 1.4)} className="absolute top-68.5 left-70.5 h-113.25 w-201.25">
        <img src={IMAGES.hero02Anvil} alt="" className="absolute inset-0 size-full object-cover" />
        <img src={IMAGES.hero02AnvilOverlay} alt="" className="absolute inset-0 size-full object-cover opacity-75 mix-blend-overlay" />
      </motion.div>

      <motion.p {...slideIn('right', 0.8)} aria-hidden className={`${word} top-162.5 left-117.75`}>mas</motion.p>
      <motion.p {...slideIn('right', 0.55)} aria-hidden className={`${word} top-67 left-148.5`}>to become</motion.p>
      <motion.p {...slideIn('right', 0.7)} aria-hidden className={`${word} top-119 left-135.25`}>the master</motion.p>
      <motion.p {...slideIn('left', 0.8)} aria-hidden className={`${word} top-162.5 left-30`}>and</motion.p>

      <motion.div {...fadeFrom({ y: 30 }, 1.1, 0.8)}>
        <div className="absolute top-227 left-30 w-300">
          <HoldButton
            label="Answer"
            arrow={IMAGES.arrowsOrange}
            onComplete={onNext}
            trackClass="border border-cream"
            fillClass="bg-cream"
            chipClass="bg-cream"
            labelClass="text-ink"
            doneLabelClass="text-nexts"
          />
        </div>
        <p className="absolute top-240 left-290.5 font-creato text-[15.541px] font-bold whitespace-nowrap text-white">
          Long press to activate
        </p>
      </motion.div>
    </>
  )
}

function Mobile({ onNext }) {
  const word = 'absolute text-[35px] leading-[31.477px] tracking-[-1.05px] whitespace-nowrap uppercase'
  return (
    <>
      <Watermark mobile />

      <motion.p {...slideIn('left', 0.5, 30)} aria-hidden className={`${word} top-72.5 left-1.75`}>A call</motion.p>

      <motion.div {...fadeFrom({ y: 24 }, 0.3, 1.4)} className="absolute top-67.25 left-3.75 h-50.5 w-89.75">
        <img src={IMAGES.hero02Anvil} alt="" className="absolute inset-0 size-full object-cover" />
        <img
          src={IMAGES.hero02AnvilOverlay}
          alt=""
          className="absolute top-px left-px size-full object-cover opacity-75 mix-blend-overlay"
        />
      </motion.div>

      <motion.p {...slideIn('left', 0.65, 30)} aria-hidden className={`${word} top-86 left-1.75`}>both</motion.p>
      <motion.p {...slideIn('right', 0.7, 30)} aria-hidden className={`${word} top-86 left-38.5`}>the master</motion.p>
      <motion.p {...slideIn('right', 0.55, 30)} aria-hidden className={`${word} top-72.5 left-42.5`}>to become</motion.p>
      <motion.p {...slideIn('left', 0.8, 30)} aria-hidden className={`${word} top-97.75 left-6`}>and</motion.p>
      <motion.p {...slideIn('right', 0.8, 30)} aria-hidden className={`${word} top-97.75 left-50`}>terpiece</motion.p>
      <motion.p {...slideIn('right', 0.8, 30)} aria-hidden className={`${word} top-97.75 left-31.25`}>mas</motion.p>

      <motion.div {...fadeFrom({ y: 20 }, 1.1, 0.8)}>
        <div className="absolute top-173 left-11.5 w-74.5">
          <HoldButton
            size="mobile"
            label="Answer"
            arrow={IMAGES.mArrowsOrange}
            onComplete={onNext}
            trackClass="border-[0.578px] border-cream"
            fillClass="bg-cream"
            chipClass="bg-cream"
            labelClass="text-ink"
            doneLabelClass="text-nexts"
          />
        </div>
        <p className="absolute top-181.25 left-1/2 -translate-x-1/2 font-creato text-[12px] font-bold whitespace-nowrap text-ink">
          Long press to activate
        </p>
      </motion.div>
    </>
  )
}
