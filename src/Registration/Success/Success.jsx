import { motion } from 'framer-motion'
import ForgeFrame, { Watermark } from '../../components/ForgeFrame'
import { GlassFilterDefs, GlassLine } from '../../components/GlassText'
import useViewport from '../../hooks/useViewport'
import { IMAGES } from '../../content'
import { drawIn, fadeFrom, slideIn } from '../../motion'

// Shown after the form is submitted (/success): "Registration successful" with the car, on the same
// orange background as the first intro screens. The music fades out 10s after this page opens
// (see BackgroundMusic.jsx).
const Success = () => {
  const { isMobile } = useViewport()

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      <GlassFilterDefs />
      <ForgeFrame mobile={isMobile} mobileHeader={{ src: IMAGES.mHeader01, top: 40 }}>
        <h1 className="sr-only">Registration successful! You're now on your way to the place where masterpieces are forged!</h1>
        {isMobile ? <Mobile /> : <Desktop />}
      </ForgeFrame>
    </main>
  )
}

function Desktop() {
  const big = 'absolute text-[120px] leading-30 tracking-[-3.6px] whitespace-nowrap uppercase'
  const small = 'absolute text-[64px] leading-16 tracking-[-1.92px] whitespace-nowrap uppercase'
  return (
    <>
      <Watermark />

      <motion.img
        {...fadeFrom({ y: 40 }, 0.3, 1.4)}
        src={IMAGES.car}
        alt="Black London taxi with an Ilorin number plate"
        className="absolute top-84.25 left-53.5 h-131.75 w-231.75 object-contain"
      />

      <motion.p {...slideIn('left', 0.5)} aria-hidden className={`${big} top-38.25 left-30`}>Registration</motion.p>
      <motion.p {...slideIn('right', 0.6)} aria-hidden className={`${big} top-68.5 right-30`}>Successful!</motion.p>

      <motion.div {...slideIn('left', 0.8)} aria-hidden className={`${small} top-116 left-30`}>
        <p>You&apos;re</p>
        <p>now on</p>
        <p>your</p>
        <p>way</p>
      </motion.div>
      <motion.div {...slideIn('right', 0.9)} aria-hidden className={`${small} top-163.5 right-30 text-right`}>
        <p>To the</p>
        <p>place where</p>
        <p>masterpieces</p>
        <p>are forged!</p>
      </motion.div>

      <motion.img {...drawIn(0.6)} src={IMAGES.ruleBottom} alt="" className="absolute top-240 left-30 h-px w-300" />
    </>
  )
}

function Mobile() {
  const block = 'absolute inset-x-0 text-center text-[40px] leading-10 tracking-[-1.2px] uppercase'
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 text-center text-[100px] leading-[111.407px] tracking-[-10px] opacity-70 select-none">
        <GlassLine from={{ y: -40 }} className="absolute inset-x-0 top-18.5">NEXTS</GlassLine>
        <GlassLine from={{ y: 40 }} className="absolute inset-x-0 top-127.75">ILORIN</GlassLine>
      </div>

      <motion.div {...fadeFrom({ y: -20 }, 0.4)} aria-hidden className={`${block} top-40.25`}>
        <p>Registration</p>
        <p>successful</p>
      </motion.div>

      <motion.img
        {...fadeFrom({ y: 24 }, 0.3, 1.4)}
        src={IMAGES.car}
        alt="Black London taxi with an Ilorin number plate"
        className="absolute top-63.75 left-0 h-55.5 w-97.75 object-contain"
      />

      <motion.div {...slideIn('left', 0.7, 30)} aria-hidden className={`${block} top-115`}>
        <p>You&apos;re now</p>
        <p>on your way</p>
      </motion.div>
      <motion.div {...slideIn('right', 0.85, 30)} aria-hidden className={`${block} top-149.25`}>
        <p>To the</p>
        <p>place where</p>
        <p>masterpieces</p>
        <p>are forged!</p>
      </motion.div>
    </>
  )
}

export default Success
