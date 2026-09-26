import { useEffect, useState } from 'react'
import Typewriter from '../components/Typewriter'
import WorkshopFrame, { ForgeLayers } from '../components/WorkshopFrame'
import useViewport from '../hooks/useViewport'
import { IMAGES, TIMING } from '../content'

const SEGMENTS = [
  { text: 'Every masterpiece begins in a workshop,', className: 'text-cream' },
  {
    text: ' surrounded by the tools, materials and pressure needed to shape raw potential into something worthy of exhibition.',
    className: 'text-nexts',
  },
]

export default function HeroWorkshop({ onNext }) {
  const { isMobile } = useViewport()
  const [typed, setTyped] = useState(false)

  useEffect(() => {
    if (!typed) return
    const t = setTimeout(onNext, TIMING.workshopHold)
    return () => clearTimeout(t)
  }, [typed, onNext])

  const text = (
    <Typewriter
      as="h1"
      segments={SEGMENTS}
      delay={TIMING.fade * 1000}
      onDone={() => setTyped(true)}
      className={
        isMobile
          ? 'absolute top-121.75 left-5.25 w-83.75 text-[32px] leading-8.5'
          : 'absolute top-16 left-30 w-138.5 text-[64px] leading-18'
      }
    />
  )

  return isMobile ? (
    <WorkshopFrame
      mobile
      mobileHeight={775}
      mobileGap
      text={text}
      photo={IMAGES.mHero03Photo}
    />
  ) : (
    <WorkshopFrame photoHeight={896} photo={<ForgeLayers forge4Top={-45.9} />} text={text} />
  )
}
