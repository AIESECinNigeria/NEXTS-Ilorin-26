import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import HeroIntro from './screens/HeroIntro'
import HeroCall from './screens/HeroCall'
import HeroWorkshop from './screens/HeroWorkshop'
import HeroReady from './screens/HeroReady'
import { GlassFilterDefs } from './components/GlassText'
import { TIMING } from './content'

// The intro sequence, shown one screen at a time in this order. Each screen calls `onNext` when it's done
// (after a button press or a timer).
const STEPS = [HeroIntro, HeroCall, HeroWorkshop, HeroReady]

// Where the visitor goes after the last intro screen. The form has its own routes (see main.jsx).
const REGISTRATION_START = '/registration/step-one'

// Home page ("/"): plays the intro screens with a cross-fade between each one.
export default function App() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const next = useCallback(() => setStep((s) => s + 1), [])
  const Screen = STEPS[step]

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      <GlassFilterDefs />
      {/* mode="wait" lets the old screen fade out before the next fades in.
          Once the last screen has faded out, move on to the registration form. */}
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
