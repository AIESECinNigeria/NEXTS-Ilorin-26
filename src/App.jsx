import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeroIntro from './screens/HeroIntro'
import HeroCall from './screens/HeroCall'
import HeroWorkshop from './screens/HeroWorkshop'
import HeroReady from './screens/HeroReady'
import { GlassFilterDefs } from './components/GlassText'
import { TIMING } from './content'

import './App.css'

const STEPS = [HeroIntro, HeroCall, HeroWorkshop, HeroReady]


function App() {
  const [step, setStep] = useState(0)
  const next = useCallback(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), [])
  const Screen = STEPS[step]
  // const navigate = useNavigate();
  // const handleRegister = async () => {
  //   navigate("/registration/step-one");
  // };

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

// function RegistrationPlaceholder() {
//   return (
//     <section className="flex h-full items-center justify-center bg-ink">
//       <p className="text-2xl text-nexts">Registration form goes here</p>
//     </section>
//   )
// }

export default App

