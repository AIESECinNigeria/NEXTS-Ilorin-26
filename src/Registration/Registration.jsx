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

// The registration form: 4 pages of questions at /registration/step-one … step-four.
// This file is the shell around the pages: background, photo, headline, the orange card with progress
// bars, the Back / Next buttons, saving answers, validation per page, and submitting at the end.
// Each page file (FirstPage.jsx …) only lists its questions. steps.js lists which fields each page checks.

// The question components for each page, in order
const PAGES = [FirstPage, SecondPage, ThirdPage, FourthPage]

// Floating decorations beside the desktop card (the mask's position differs per page)
const COMB = { src: IMAGES.decoComb, className: 'top-26.25 left-163.25 h-30.75 w-25.25' }
const MASK = { src: IMAGES.decoMask }

// What changes from page to page (same order as PAGES):
//   desktop / mobile  the photo and where it sits
//   headline          where "...how ready are you..." sits on mobile, and its colour
//   icon              small icon at the top left on mobile
//   decor             floating decorations on desktop
const SCENES = [
  {
    desktop: { src: IMAGES.regMosque, className: 'top-0 left-0 h-256 w-360' },
    mobile: { src: IMAGES.regMosqueMobile, className: 'top-31.25 left-1/2 w-83.75 -translate-x-1/2' },
    headline: { className: 'inset-x-5 text-center text-cream', lines: ['...how ready are you...'] },
    icon: { src: IMAGES.mIconPuzzle, className: 'h-7 w-7.25' },
    decor: [],
  },
  {
    desktop: { src: IMAGES.regHorse, className: 'top-51.25 -left-41.25 w-265' },
    mobile: { src: IMAGES.regHorse, className: 'top-13.75 -left-28.75 w-92.25' },
    headline: { className: 'right-5 text-right text-cream' },
    icon: { src: IMAGES.mIconMask, className: 'h-7 w-5.25' },
    decor: [COMB, { ...MASK, className: 'top-195.5 left-312.75 h-64.5 w-53.75' }],
  },
  {
    desktop: { src: IMAGES.regRider, className: 'top-27 left-0 w-207.5' },
    mobile: { src: IMAGES.regRider, className: 'top-8.25 left-10.25 w-86.25' },
    headline: { className: 'left-5 text-left text-cream' },
    icon: { src: IMAGES.decoComb, className: 'h-7 w-5.75' },
    decor: [COMB, { ...MASK, className: 'top-157 left-301 h-64.5 w-53.75' }],
  },
  {
    desktop: { src: IMAGES.regPot, className: 'top-61.5 left-9.75 w-174' },
    mobile: { src: IMAGES.regPot, className: 'top-17.5 -left-12.25 w-67.25' },
    headline: { className: 'right-5 text-right text-nexts' },
    icon: { src: IMAGES.mIconScissors, className: 'h-7.25 w-9' },
    decor: [
      { src: IMAGES.decoScissors, className: 'top-43.75 left-145.5 h-33 w-43.75' },
      { ...MASK, className: 'top-146.5 left-321.5 h-64.5 w-53.75' },
    ],
  },
]

const HEADLINE = ['...how ready', 'are you...']

const EMPTY_FORM = {
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
}

// Answers are kept in sessionStorage so a refresh doesn't wipe them. It lasts only while the tab
// is open (personal details don't linger on shared computers) and is cleared after submitting.
const SAVED_FORM_KEY = 'nexts-registration'

function loadSavedForm() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SAVED_FORM_KEY) || '{}')
    const form = { ...EMPTY_FORM }
    for (const key of Object.keys(EMPTY_FORM)) if (typeof saved[key] === 'string') form[key] = saved[key]
    return form
  } catch {
    return { ...EMPTY_FORM }
  }
}

function saveForm(values) {
  try {
    sessionStorage.setItem(SAVED_FORM_KEY, JSON.stringify(values))
  } catch {
    // storage unavailable (private mode etc.) — the form still works, it just won't survive a refresh
  }
}

function clearSavedForm() {
  try {
    sessionStorage.removeItem(SAVED_FORM_KEY)
  } catch {
    // nothing to clear
  }
}

const isBlank = (value) => String(value ?? '').trim() === ''

const Registration = () => {
  const [savedForm] = useState(loadSavedForm) // read once, on first render
  // One form shared by all 4 pages (react-hook-form). Fields are checked when you leave them (onBlur)
  // and when you press Next.
  const methods = useForm({
    defaultValues: savedForm,
    mode: 'onBlur',
  })
  const { isMobile } = useViewport()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // Which page we're on, from the URL (0 = step-one). -1 if the URL doesn't match a page.
  const index = STEPS.findIndex((s) => pathname.replace(/\/$/, '').endsWith(`/${s.path}`))
  const [isLoading, setIsLoading] = useState(false) // true while the form is being sent

  // Remember whether we went forward (1) or back (-1), so the questions slide in from the right side
  const [move, setMove] = useState({ index, dir: 1 })
  if (move.index !== index) setMove({ index, dir: index > move.index ? 1 : -1 })

  // New page: start at the top (matters on mobile, where the page scrolls)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index])

  // Save every change so a refresh keeps the answers
  const { subscribe } = methods
  useEffect(() => subscribe({ formState: { values: true }, callback: ({ values }) => saveForm(values) }), [subscribe])

  // Unknown URL like /registration → go to the first page
  if (index < 0) return <Navigate to={stepUrl(0)} replace />

  // Opened a later page (link, refresh in a new tab) with earlier answers missing? Go back to the first gap.
  const firstUnfinished = STEPS.findIndex((step, i) => i < index && step.fields.some((f) => isBlank(methods.getValues(f))))
  if (firstUnfinished >= 0) return <Navigate to={stepUrl(firstUnfinished)} replace />

  // Send everything to the backend. On success: forget the saved answers and show the success page.
  const onFinalSubmit = async (allFormData) => {
    setIsLoading(true)
    try {
      await submitRegistration(allFormData)
      clearSavedForm()
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

  // Next / Submit: check this page's fields; if they're fine go to the next page, or submit on the last one
  const next = async () => {
    if (isLoading) return
    const isPageValid = await methods.trigger(STEPS[index].fields)
    if (!isPageValid) return
    if (index < STEPS.length - 1) navigate(stepUrl(index + 1))
    else await methods.handleSubmit(onFinalSubmit)()
  }

  // Back from page 1 returns to the intro
  const back = () => navigate(index === 0 ? '/' : stepUrl(index - 1))

  // Pressing Enter in a field acts like the Next button
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

  // Same form, two layouts
  const Layout = isMobile ? MobileLayout : DesktopLayout

  return (
    <FormProvider {...methods}>
      <Layout index={index} questions={questions} onSubmit={onSubmit} onBack={back} busy={isLoading} />

      {/* Full-screen "sending" overlay while the form is submitted */}
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

// Desktop: one screen, no scrolling. Photo and headline on the left, card on the right.
function DesktopLayout({ index, questions, onSubmit, onBack, busy }) {
  const photo = SCENES[index].desktop
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      {/* Background: the texture fills the whole screen; the faint "NE XTS" letters sit on the scaled
          layout so they stay the right size on any screen */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={IMAGES.regTexture} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/85" />
      </div>
      <Stage className="pointer-events-none">
        <img src={IMAGES.regNextsBig} alt="" className="absolute top-38.75 left-25 h-173 w-188.5" />
      </Stage>

      <Stage className="pointer-events-none">
        {/* Pages 2–4 photos are dimmed a little so they don't compete with the card */}
        <Photo src={photo.src} className={`${photo.className} ${index > 0 ? 'brightness-75' : ''}`} from={-60} />
        <motion.h1 {...fadeFrom({ y: -20 }, 0.2)} className="absolute top-16 left-30 font-display text-[64px] leading-17 tracking-[-1.92px] text-nexts">
          {HEADLINE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>
      </Stage>

      {/* Dark fade along the bottom so the photos melt into the background. Full screen width,
          so there's no visible edge on wide screens. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink via-ink/60 to-transparent" />

      {/* The logo sticks to the left edge of the screen instead of the centred layout,
          so on wide screens it doesn't drift towards the middle */}
      <Stage anchor="left" className="pointer-events-none">
        <motion.img {...fadeFrom({ y: 16 }, 0.5, 0.9)} src={IMAGES.regLogo} alt="NEXTS Ilorin 2026" className="absolute top-227 left-30 h-12.5 w-38.5" />
      </Stage>

      <Stage>
        <form onSubmit={onSubmit} noValidate>
          {/* The orange card: progress bars + this page's questions */}
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

          {/* This page's floating decorations */}
          <AnimatePresence>
            {SCENES[index].decor.map((d) => (
              <motion.img
                key={`${index}-${d.src}`}
                src={d.src}
                alt=""
                aria-hidden
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ opacity: { duration: 0.8, delay: 0.5 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                className={`pointer-events-none absolute ${d.className}`}
              />
            ))}
          </AnimatePresence>

          <motion.div {...fadeFrom({ y: 16 }, 0.6, 0.9)} className="absolute top-227 left-182.5 flex w-147.5 justify-between">
            <NavButton kind="back" onClick={onBack} disabled={busy} />
            <NavButton kind="next" last={index === STEPS.length - 1} disabled={busy} />
          </motion.div>
        </form>
      </Stage>
    </main>
  )
}

// Mobile: one scrolling column. Top bar, photo with the headline over it, card, then the buttons.
function MobileLayout({ index, questions, onSubmit, onBack, busy }) {
  const { mobile: photo, headline } = SCENES[index]
  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden bg-ink">
      {/* Background stays put while the page scrolls */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <img src={IMAGES.regTexture} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/85" />
      </div>

      <form onSubmit={onSubmit} noValidate className="relative mx-auto flex w-full max-w-107.5 flex-col px-5 pt-6 pb-8">
        {/* Top bar: this page's icon (spins in when the page changes) and the logo */}
        <motion.div {...fadeFrom({ y: -12 }, 0.2, 0.8)} className="relative z-10 flex h-7 items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={SCENES[index].icon.src}
              alt=""
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 20 }}
              transition={{ duration: 0.35 }}
              className={SCENES[index].icon.className}
            />
          </AnimatePresence>
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

        {/* The buttons sit at the same height on every page (min-h + mt-auto), and only move down
            when a page's card is taller than usual */}
        <div className="mt-52 flex min-h-142.5 flex-col">
          <motion.div {...fadeFrom({ y: 40 }, 0.3, 0.9)} className="relative z-10 mb-12 bg-nexts px-3 py-4.5">
            <StepBars index={index} mobile />
            <div className="mt-9">{questions}</div>
          </motion.div>

          <motion.div {...fadeFrom({ y: 16 }, 0.6, 0.9)} className="relative mt-auto flex flex-col gap-4">
            {/* Faint "NEXTS" outline peeking out behind the buttons */}
            <img src={IMAGES.regNextsOutline} alt="" aria-hidden className="pointer-events-none absolute -top-17.75 left-0 w-full opacity-50" />
            <NavButton kind="back" mobile onClick={onBack} disabled={busy} />
            <NavButton kind="next" last={index === STEPS.length - 1} mobile disabled={busy} />
          </motion.div>
        </div>
      </form>
    </main>
  )
}

// Page photo: slides in from the side (`from` = starting x offset in px) and cross-fades when the page
// changes (the old photo fades out while the new one comes in, because they have different keys).
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

// Progress bars at the top of the card, one per page: earlier pages are full, the current page's bar
// fills as its questions get answered, later pages are empty.
function StepBars({ index, mobile }) {
  const { control } = useFormContext()
  const fields = STEPS[index].fields
  const values = useWatch({ control, name: fields }) // re-renders as this page's answers change
  const answered = values.filter((v) => String(v ?? '').trim() !== '').length / fields.length // 0 to 1

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

// Back (cream) or Next/Submit (orange) button. The arrow nudges outwards on hover.
// Next is a submit button, so the form's onSubmit handles it (which also makes Enter work).
function NavButton({ kind, mobile, onClick, disabled, last }) {
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
      } ${mobile ? 'relative h-10 w-full gap-1 text-[12px] leading-3.75' : 'h-13 gap-2 px-6 text-[16px] leading-5'}`}
    >
      {isBack && arrow}
      <span>{isBack ? 'Back' : last ? 'Submit' : 'Next'}</span>
      {!isBack && arrow}
    </motion.button>
  )
}

export default Registration
