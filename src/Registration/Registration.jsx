import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import FirstPage from './FirstPage/FirstPage'
import SecondPage from './SecondPage/SecondPage'
import ThirdPage from './ThirdPage/ThirdPage'
import FourthPage from './FourthPage/FourthPage'
import Stage from '../components/Stage'
import useViewport from '../hooks/useViewport'
import { IMAGES } from '../content'
import { EASE, fadeFrom, stepContent } from '../motion'
import { STEPS, stepUrl } from './steps'
import { submitRegistration } from './submit'

const PAGES = [FirstPage, SecondPage, ThirdPage, FourthPage]

// Per-page photo and mobile headline placement (Figma Hero 9/10/12/13 and Mobile 10–13).
// Desktop photos sit on a 1440×1024 canvas pinned bottom-left; mobile ones on the 375-wide column.
const SCENES = [
  {
    desktop: { src: IMAGES.regMosque, className: 'top-0 left-0 h-256 w-360' },
    mobile: { src: IMAGES.regMosqueMobile, className: 'top-31.25 left-1/2 w-83.75 -translate-x-1/2' },
    headline: { className: 'inset-x-5 text-center text-cream', lines: ['...how ready are you...'] },
  },
  {
    desktop: { src: IMAGES.regHorse, className: 'top-52.5 left-28.75 w-162.5' },
    mobile: { src: IMAGES.regHorse, className: 'top-17.5 -left-10 w-85' },
    headline: { className: 'right-5 text-right text-cream' },
  },
  {
    desktop: { src: IMAGES.regRider, className: 'top-36.75 -left-36 w-194' },
    mobile: { src: IMAGES.regRider, className: 'top-9 right-4.5 w-78.5' },
    headline: { className: 'left-5 text-left text-cream' },
  },
  {
    desktop: { src: IMAGES.regPot, className: 'top-77 -left-37 w-217.5' },
    mobile: { src: IMAGES.regPot, className: 'top-15.75 -left-11.75 w-58.5' },
    headline: { className: 'right-5 text-right text-nexts' },
  },
]

const HEADLINE = ['...how ready', 'are you...']

const Registration = () => {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      number: '',
      gender: '',
      email: '',
      d_o_b: '',
      lc: '',
      role: '',
      first_conf: '',
      allergies: '',
      remedy: '',
      roomSituation: '',
      nextOfKin: '',
      relationship: '',
      expectations: '',
      additionalInfo: '',
    },
    mode: 'onBlur',
  })
  const { isMobile } = useViewport()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const index = STEPS.findIndex((s) => pathname.replace(/\/$/, '').endsWith(`/${s.path}`))
  const [isLoading, setIsLoading] = useState(false)

  // Remember which way we moved so the questions slide in from the right side
  const [move, setMove] = useState({ index, dir: 1 })
  if (move.index !== index) setMove({ index, dir: index > move.index ? 1 : -1 })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index])

  if (index < 0) return <Navigate to={stepUrl(0)} replace />

  const onFinalSubmit = async (allFormData) => {
    setIsLoading(true)
    try {
      await submitRegistration(allFormData)
      navigate('/success')
    } catch (error) {
      console.error('Registration API error:', error)
      const backendMessage = error.response?.data?.message || error.response?.data?.error
      console.log('Backend rejection reason details:', error.response?.data)
      alert(`Backend error: ${backendMessage || 'Failed to register. Please check input formats.'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const next = async () => {
    if (isLoading) return
    const isPageValid = await methods.trigger(STEPS[index].fields)
    if (!isPageValid) return
    if (index < STEPS.length - 1) navigate(stepUrl(index + 1))
    else await methods.handleSubmit(onFinalSubmit)()
  }

  const back = () => navigate(index === 0 ? '/' : stepUrl(index - 1))

  const onSubmit = (e) => {
    e.preventDefault()
    next()
  }

  const Page = PAGES[index]
  const questions = (
    <AnimatePresence mode="wait" custom={move.dir}>
      <motion.div
        key={index}
        custom={move.dir}
        variants={stepContent}
        initial="enter"
        animate="show"
        exit="exit"
        className={`flex flex-col ${isMobile ? 'gap-4' : 'gap-10'}`}
      >
        <Page />
      </motion.div>
    </AnimatePresence>
  )

  const Layout = isMobile ? MobileLayout : DesktopLayout

  return (
    <FormProvider {...methods}>
      <Layout index={index} questions={questions} onSubmit={onSubmit} onBack={back} busy={isLoading} />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm"
          >
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-nexts border-t-transparent" />
            <p className="animate-pulse font-glyphic text-lg tracking-widest text-white">STOKING THE FORGE...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  )
}

function DesktopLayout({ index, questions, onSubmit, onBack, busy }) {
  const photo = SCENES[index].desktop
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      <Stage fit="cover" className="pointer-events-none">
        <img src={IMAGES.regBackground} alt="" className="absolute inset-0 h-256 w-360 object-cover" />
      </Stage>

      <Stage anchor="bottom-left" className="pointer-events-none">
        <Photo src={photo.src} className={photo.className} from={-60} />
        <motion.h1 {...fadeFrom({ y: -20 }, 0.2)} className="absolute top-16 left-30 font-display text-[64px] leading-16 text-nexts">
          {HEADLINE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.img {...fadeFrom({ y: 16 }, 0.5, 0.9)} src={IMAGES.regLogo} alt="NEXTS Ilorin 2026" className="absolute top-227 left-30 h-12.5 w-38.5" />
      </Stage>

      <Stage>
        <form onSubmit={onSubmit} noValidate>
          <motion.div {...fadeFrom({ y: 40 }, 0.3, 0.9)} className="absolute top-16 left-182.5 min-h-193.5 w-147.5 bg-nexts px-10 py-10">
            {/* Glass puzzle floats over the card's orange but under the questions, so error messages
                that push the fields down never end up hidden behind it */}
            <AnimatePresence>
              {index === 0 && (
                <motion.img
                  key="puzzle"
                  src={IMAGES.regPuzzle}
                  alt=""
                  initial={{ opacity: 0, y: 30, rotate: -8 }}
                  animate={{ opacity: 1, y: [0, -10, 0], rotate: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ opacity: { duration: 0.8, delay: 0.6 }, rotate: { duration: 0.8, delay: 0.6 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                  className="pointer-events-none absolute top-164.5 left-45.75 h-54.75 w-55.25"
                />
              )}
            </AnimatePresence>
            <div className="relative z-10">
              <StepBars index={index} />
              <div className="mt-13.5">{questions}</div>
            </div>
          </motion.div>

          <motion.div {...fadeFrom({ y: 16 }, 0.6, 0.9)} className="absolute top-227 left-182.5 flex w-147.5 justify-between">
            <NavButton kind="back" onClick={onBack} disabled={busy} />
            <NavButton kind="next" disabled={busy} />
          </motion.div>
        </form>
      </Stage>
    </main>
  )
}

function MobileLayout({ index, questions, onSubmit, onBack, busy }) {
  const { mobile: photo, headline } = SCENES[index]
  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-ink">
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <img src={IMAGES.regTexture} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/85" />
      </div>

      <form onSubmit={onSubmit} noValidate className="relative mx-auto flex w-full max-w-[430px] flex-col px-5 pt-6 pb-8">
        <motion.div {...fadeFrom({ y: -12 }, 0.2, 0.8)} className="relative z-10 flex h-7 items-center justify-between">
          <img src={IMAGES.mTopbarIcon} alt="" className="h-7 w-7.25" />
          <img src={IMAGES.logo} alt="NEXTS Ilorin 2026" className="h-7 w-21.5" />
        </motion.div>

        <Photo src={photo.src} className={photo.className} from={index % 2 ? -40 : 40} />

        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className={`absolute top-23 z-10 font-display text-[30px] leading-7.5 ${headline.className}`}
          >
            {(headline.lines ?? HEADLINE).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <motion.div {...fadeFrom({ y: 40 }, 0.3, 0.9)} className="relative z-10 mt-51.5 bg-nexts px-3 py-4.5">
          <StepBars index={index} mobile />
          <div className="mt-9">{questions}</div>
        </motion.div>

        <motion.div {...fadeFrom({ y: 16 }, 0.6, 0.9)} className="relative mt-11.75 flex flex-col gap-4.5">
          <img src={IMAGES.regNextsOutline} alt="" aria-hidden className="pointer-events-none absolute -top-17.75 left-0 w-full" />
          <NavButton kind="back" mobile onClick={onBack} disabled={busy} />
          <NavButton kind="next" mobile disabled={busy} />
        </motion.div>
      </form>
    </main>
  )
}

// Page photo: slides in from the side, cross-fades when the page changes
function Photo({ src, className, from }) {
  return (
    <AnimatePresence>
      <motion.img
        key={src}
        src={src}
        alt=""
        initial={{ opacity: 0, x: from }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1.1, delay: 0.1, ease: EASE } }}
        exit={{ opacity: 0, transition: { duration: 0.45 } }}
        className={`pointer-events-none absolute max-w-none ${className}`}
      />
    </AnimatePresence>
  )
}

// One bar per page: finished pages full, the current one fills as its questions are answered
function StepBars({ index, mobile }) {
  const { control } = useFormContext()
  const fields = STEPS[index].fields
  const values = useWatch({ control, name: fields })
  const answered = values.filter((v) => String(v ?? '').trim() !== '').length / fields.length

  return (
    <div
      role="progressbar"
      aria-label={`Page ${index + 1} of ${STEPS.length}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(((index + answered) / STEPS.length) * 100)}
      className={`flex items-center ${mobile ? 'gap-3' : 'gap-4'}`}
    >
      {STEPS.map((step, i) => (
        <div key={step.path} className={`relative flex-1 transition-[height] duration-300 ${i === index ? 'h-1 bg-cream/40' : 'h-0.5 bg-cream/25'}`}>
          <motion.div
            className="absolute inset-0 origin-left bg-cream"
            initial={false}
            animate={{ scaleX: i < index ? 1 : i === index ? answered : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      ))}
    </div>
  )
}

function NavButton({ kind, mobile, onClick, disabled }) {
  const isBack = kind === 'back'
  const arrow = (
    <motion.img
      src={isBack ? IMAGES.arrowBack : IMAGES.arrowNext}
      alt=""
      variants={{ hover: { x: isBack ? -4 : 4 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={mobile ? 'h-2.75 w-5' : 'h-5 w-8.75'}
    />
  )

  return (
    <motion.button
      type={isBack ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={`flex cursor-pointer items-center justify-center font-glyphic uppercase disabled:cursor-wait disabled:opacity-60 ${
        isBack ? 'bg-cream text-ink' : 'bg-nexts text-cream'
      } ${mobile ? 'h-10 w-full gap-1 text-[12px] leading-[15px]' : 'h-13 gap-2 px-6 text-[16px] leading-5'}`}
    >
      {isBack && arrow}
      <span>{isBack ? 'Back' : 'Next'}</span>
      {!isBack && arrow}
    </motion.button>
  )
}

export default Registration
