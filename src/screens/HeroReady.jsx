import { useState } from 'react'
import { motion } from 'framer-motion'
import HoldButton from '../components/HoldButton'
import Typewriter from '../components/Typewriter'
import WorkshopFrame from '../components/WorkshopFrame'
import useViewport from '../hooks/useViewport'
import { IMAGES, TIMING } from '../content'
import { EASE } from '../motion'

// Fourth (last) intro screen: types out "How ready are you…", then shows a press-and-hold
// "100% ready" button that leads to the registration form.

// The question, split so the second half can be orange
const SEGMENTS = [
  { text: 'How ready are you', className: 'text-cream' },
  { text: ' to enter the workshop and become the masterpiece?', className: 'text-nexts' },
]

// On phones the orange half starts on its own line
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
          ? 'absolute top-121.75 left-5.25 w-80 text-[32px] leading-8.5'
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

  // Phones get a full-width bar version of the same button
  const mobileButton = (
    <HoldButton
      size="bar"
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

  // The button stays hidden (and unclickable) until the question has finished typing, then rises in
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
        mobileHeight={733}
        mobileGap
        text={text}
        photo={IMAGES.mHero04Photo}
        action={
          <motion.div {...reveal} className="absolute top-169.25 left-5 w-83.75">
            {mobileButton}
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
