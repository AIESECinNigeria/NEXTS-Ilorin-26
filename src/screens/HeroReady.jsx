import { useState } from 'react'
import { motion } from 'framer-motion'
import HoldButton from '../components/HoldButton'
import Typewriter from '../components/Typewriter'
import WorkshopFrame from '../components/WorkshopFrame'
import useViewport from '../hooks/useViewport'
import { IMAGES, TIMING } from '../content'
import { EASE } from '../motion'

const SEGMENTS = [
  { text: 'How ready are you', className: 'text-cream' },
  { text: ' to enter the workshop and become the masterpiece?', className: 'text-nexts' },
]

const MOBILE_SEGMENTS = [SEGMENTS[0], { ...SEGMENTS[1], className: 'block text-nexts' }]


export default function HeroReady({ onNext }) {
  const { isMobile } = useViewport()
  const [typed, setTyped] = useState(false)

  const text = (
    <Typewriter
      as="h1"
      segments={isMobile ? MOBILE_SEGMENTS : SEGMENTS}
      delay={TIMING.fade * 1000}
      onDone={() => setTyped(true)}
      className={
        isMobile
          ? 'absolute top-74 left-5.25 w-30 text-[19.394px] leading-[21.818px] tracking-[-0.58px]'
          : 'absolute top-16 left-30 w-140.25 text-[64px] leading-17 tracking-[-1.92px]'
      }
    />
  )

  const button = (
    <HoldButton
      label="100% ready"
      arrow={IMAGES.arrowsDark}
      onComplete={onNext}
      trackClass="bg-cream border border-cream"
      fillClass="bg-nexts"
      chipClass="bg-nexts"
      labelClass="text-cream"
      doneLabelClass="text-ink"
    />
  )

  const reveal = {
    initial: { opacity: 0, y: 30 },
    animate: typed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, ease: EASE },
    style: { pointerEvents: typed ? 'auto' : 'none' },
  }

  if (isMobile) {
    return (
      <WorkshopFrame
        mobile
        text={text}
        photo={
          <img
            src={IMAGES.portrait}
            alt="Woman in a red headwrap and coral beads"
            className="absolute -top-26.25 -left-84.75 h-145 w-217.5 object-cover"
          />
        }
        action={
          <motion.div {...reveal}>
            <div className="absolute top-150.75 left-39.75 w-147.5 origin-top-left scale-[0.35593]">{button}</div>
            <p className="absolute top-157.5 right-5.5 font-creato text-[12px] font-bold whitespace-nowrap text-white">
              Long press to activate
            </p>
          </motion.div>
        }
      />
    )
  }

  return (
    <WorkshopFrame
      photoHeight={780}
      photo={
        <img
          src={IMAGES.portrait}
          alt="Woman in a red headwrap and coral beads"
          className="absolute -top-36.25 -left-165.5 h-299.75 w-449.75 object-cover"
        />
      }
      text={text}
      action={
        <motion.div {...reveal} className="absolute top-227 left-182.5 w-147.5">
          {button}
        </motion.div>
      }
    />
  )
}
