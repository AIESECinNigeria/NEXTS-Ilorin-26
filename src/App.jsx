import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeroIntro from './screens/HeroIntro'
import HeroCall from './screens/HeroCall'
import HeroWorkshop from './screens/HeroWorkshop'
import HeroReady from './screens/HeroReady'
import { GlassFilterDefs } from './components/GlassText'
import { TIMING } from './content'

const STEPS = [HeroIntro, HeroCall, HeroWorkshop, HeroReady, RegistrationPlaceholder]

export default function App() {
  const [step, setStep] = useState(0)
  const next = useCallback(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), [])
  const Screen = STEPS[step]

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      <GlassFilterDefs />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: TIMING.fade, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Screen onNext={next} />
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

// Stand-in until the "...how ready are you..." form screens (Hero 9, 10, 12) are built.
function RegistrationPlaceholder() {
  return (
    <section className="flex h-full items-center justify-center bg-ink">
      <p className="text-2xl text-nexts">Registration form goes here</p>
    </section>
  )
}
