import { motion } from 'framer-motion'
import Stage from './Stage'
import { MOBILE } from './stageSizes'
import { GlassLine } from './GlassText'
import { IMAGES } from '../content'
import { fadeFrom } from '../motion'


export default function WorkshopFrame({ mobile, text, photo, photoHeight, action }) {
  if (mobile) {
    return (
      <section className="absolute inset-0 overflow-hidden bg-ink">
        <Stage size={MOBILE} fit="cover" className="pointer-events-none mix-blend-soft-light">
          <div className="absolute top-92.75 left-150.75 flex h-239.5 w-319.25 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <img src={IMAGES.workshopTexture} alt="" className="h-319.25 w-239.5 -rotate-90 object-cover opacity-50" />
          </div>
        </Stage>

        <Stage size={MOBILE}>
          <VerticalWatermark />
          {text}
          <motion.div {...fadeFrom({ x: 40 }, 0.3, 1.2)} className="absolute top-42.75 left-39.75 h-101.75 w-52.25 overflow-clip">
            {photo}
            <div className="absolute inset-0 bg-nexts opacity-75 mix-blend-color-burn" />
          </motion.div>
          {action}
        </Stage>
      </section>
    )
  }

  return (
    <section className="absolute inset-0 overflow-hidden bg-ink">
      <Stage fit="cover" className="pointer-events-none mix-blend-soft-light">
        <div className="absolute top-1/2 left-1/2 flex h-270 w-360 -translate-x-1/2 -translate-y-1/2 scale-110 items-center justify-center">
          <img src={IMAGES.workshopTexture} alt="" className="h-360 w-270 -rotate-90 object-cover opacity-50" />
        </div>
      </Stage>

      <Stage>
        <motion.div {...fadeFrom({ x: 80 }, 0.3, 1.2)} className="absolute top-16 left-182.5 w-147.5" style={{ height: photoHeight }}>
          <div className="absolute inset-0 border-2 border-white/8" />
          <div className="absolute inset-0 overflow-clip">
            {photo}
            <div className="absolute inset-0 bg-nexts opacity-75 mix-blend-color-burn" />
          </div>
        </motion.div>

        {text}
        {action}

        <motion.div {...fadeFrom({ y: 16 }, 0.6, 0.9)}>
          <img src={IMAGES.logoNexts} alt="NEXTS" className="absolute top-227.5 left-30 h-8.5 w-38.5" />
          <img src={IMAGES.logoIlorin} alt="Ilorin 2026" className="absolute top-236.75 left-30 h-3.25 w-25.5" />
        </motion.div>
      </Stage>
    </section>
  )
}


function VerticalWatermark() {
  return [0, 1, 2].map((copy) => (
    <div
      key={copy}
      aria-hidden
      className="pointer-events-none absolute -top-px left-[80.5px] -translate-x-1/2 text-center text-[191.226px] leading-[148.2px] tracking-[-19.1226px] opacity-24 select-none"
    >
      <GlassLine from={{ y: -60 }}>
        {[...'NEXTS'].map((letter) => (
          <span key={letter} className="block">
            {letter}
          </span>
        ))}
      </GlassLine>
    </div>
  ))
}

// The pottery stack used behind the desktop photos.
export function ForgeLayers({ forge4Top }) {
  return (
    <>
      <img src={IMAGES.forge4} alt="" className="absolute left-[-416.85px] h-[833.372px] w-[1178.917px] object-cover" style={{ top: forge4Top }} />
      <img src={IMAGES.forge13} alt="Clay pots in a potter's workshop" className="absolute top-[-64px] left-[-65px] h-[1280px] w-[720px] object-cover" />
    </>
  )
}
