import { motion } from 'framer-motion'
import Stage from './Stage'
import { MOBILE } from './stageSizes'
import { GlassLine } from './GlassText'
import { IMAGES, TOP_BAR } from '../content'
import { fadeFrom } from '../motion'


export default function ForgeFrame({ mobile, mobileHeader, children }) {
  if (mobile) {
    return (
      <section className="absolute inset-0 isolate overflow-hidden bg-[#f0f0f0]">
        <Stage size={MOBILE} fit="cover" className="pointer-events-none">
          <img src={IMAGES.mForgeTexture} alt="" className="absolute -top-24.75 -left-19.25 h-242 w-[544.685px] object-cover" />
        </Stage>
        <div className="pointer-events-none absolute inset-0 bg-nexts mix-blend-soft-light" />

        <Stage size={MOBILE}>
          {children}
          <motion.img
            {...fadeFrom({ y: -12 }, 0.2, 0.8)}
            src={mobileHeader.src}
            alt="NEXTS Ilorin 2026"
            className="absolute left-2.25 h-[32.64px] w-[371.386px]"
            style={{ top: mobileHeader.top - 0.32 }}
          />
        </Stage>
      </section>
    )
  }

  return (
    <section className="absolute inset-0 overflow-hidden bg-nexts">
      {/* soft-light texture (scaled 10% so its soft edges never show); the blend sits on the Stage so it mixes with the orange */}
      <Stage fit="cover" className="pointer-events-none mix-blend-soft-light">
        <div className="absolute top-0 left-1/2 flex h-256 w-[1820px] -translate-x-1/2 scale-110 items-center justify-center">
          <img src={IMAGES.forgeTexture} alt="" className="h-[1820px] w-5xl rotate-90 object-cover opacity-50" />
        </div>
      </Stage>

      <Stage>
        {children}

        <motion.header {...fadeFrom({ y: -16 }, 0.2, 0.8)} className="font-glyphic text-[16px] leading-6 tracking-[0.32px] uppercase">
          <img src={IMAGES.ruleTop} alt="" className="absolute top-16 left-30 h-px w-257.75" />
          <p className="absolute top-19.25 left-30 whitespace-nowrap">{TOP_BAR.from}</p>
          <p className="absolute top-19.25 left-147.5 whitespace-nowrap">{TOP_BAR.via}</p>
          <img src={IMAGES.ruleHeader} alt="" className="absolute top-28.5 left-30 h-px w-272.5" />
          <img src={IMAGES.logo} alt="NEXTS Ilorin 2026" className="absolute top-16 right-[120.17px] h-[49.999px] w-[153.832px]" />
        </motion.header>
      </Stage>
    </section>
  )
}

// Giant glass "NEXTS / ILORIN": NEXTS drifts down from above, ILORIN rises from below.
export function Watermark({ mobile }) {
  if (mobile) {
    // Figma stacks two identical copies at 70% for a stronger glass look
    return [0, 1].map((copy) => (
      <div
        key={copy}
        aria-hidden
        className="pointer-events-none absolute top-35.25 left-[194.71px] w-[437.42px] -translate-x-1/2 text-center text-[100px] leading-[111.407px] tracking-[-10px] opacity-70 select-none"
      >
        <GlassLine from={{ y: -40 }}>NEXTS</GlassLine>
        <GlassLine from={{ y: 40 }} className="mt-[222.814px]">
          ILORIN
        </GlassLine>
      </div>
    ))
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-8 left-[calc(50%+0.5px)] w-[1865px] -translate-x-1/2 text-center text-[400px] leading-118.75 tracking-[-40px] opacity-50 select-none"
    >
      <GlassLine from={{ y: -80 }}>NEXTS</GlassLine>
      <GlassLine from={{ y: 80 }}>ILORIN</GlassLine>
    </div>
  )
}
