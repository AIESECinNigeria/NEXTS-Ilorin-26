import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import HeroIntro from './screens/HeroIntro'
import HeroCall from './screens/HeroCall'
import HeroWorkshop from './screens/HeroWorkshop'
import HeroReady from './screens/HeroReady'
import { GlassFilterDefs } from './components/GlassText'
import { TIMING } from './content'

const STEPS = [HeroIntro, HeroCall, HeroWorkshop, HeroReady]

// Registration.jsx uses nested routes (step-one … step-four), so it has to be reached through its
// own URL (see main.jsx) rather than rendered here — at "/" none of its steps would match.
const REGISTRATION_START = '/registration/step-one'

export default function App() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const next = useCallback(() => setStep((s) => s + 1), [])
  const Screen = STEPS[step]

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      <GlassFilterDefs />
      {/* After Hero 04 fades out, move on to the registration pages */}
      <AnimatePresence mode="wait" onExitComplete={() => step >= STEPS.length && navigate(REGISTRATION_START)}>
        {Screen && (
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
        )}
      </AnimatePresence>
    </main>
  )
}
