import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Controller, useFormContext } from 'react-hook-form'
import useViewport from '../hooks/useViewport'
import { IMAGES } from '../content'
import { EASE, stepItem } from '../motion'

// Figma: question Aoboshi 24/28 (mobile 16/20) at -3%; input text Faculty Glyphic 16/24 (mobile 12/16)
const STYLES = {
  desktop: {
    label: 'text-[24px] leading-7 tracking-[-0.72px]',
    gap: 'mt-2.5',
    box: 'h-12 px-3',
    text: 'text-[16px] leading-6',
    error: 'mt-1.5 text-[14px] leading-5',
    option: 'px-3 py-2',
    icon: 'h-3.75 w-6.25',
  },
  mobile: {
    label: 'text-[16px] leading-5 tracking-[-0.48px]',
    gap: 'mt-1',
    box: 'h-10 px-3',
    text: 'text-[12px] leading-4',
    error: 'mt-1 text-[12px] leading-4',
    option: 'px-3 py-2',
    icon: 'h-2.5 w-4',
  },
}

const BOX = 'w-full border border-ink/25 bg-cream/25 font-glyphic text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink/70 aria-invalid:border-ink'

function useStyles() {
  const { isMobile } = useViewport()
  return STYLES[isMobile ? 'mobile' : 'desktop']
}

// Label + input + error. The input shakes each time validation fails on it.
function Field({ id, label, hint, hintBreak, error, children }) {
  const s = useStyles()
  const shake = useAnimationControls()

  useEffect(() => {
    if (error) shake.start({ x: [0, -7, 7, -4, 4, 0], transition: { duration: 0.4 } })
  }, [error, shake])

  return (
    <motion.div variants={stepItem} className="flex flex-col">
      <label htmlFor={id} className={`font-display text-ink ${s.label}`}>
        {label}
        {hint && (
          <>
            {hintBreak ? <br /> : ' '}
            <span className="text-ink/25">{hint}</span>
          </>
        )}
      </label>
      <motion.div animate={shake} className={s.gap}>{children}</motion.div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`font-glyphic text-cream ${s.error}`}
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function TextField({ name, label, hint, hintBreak, placeholder, mobilePlaceholder, type = 'text', rules }) {
  const { register, formState: { errors } } = useFormContext()
  const { isMobile } = useViewport()
  const s = useStyles()
  const error = errors[name]

  return (
    <Field id={name} label={label} hint={hint} hintBreak={hintBreak} error={error}>
      <input
        id={name}
        type={type}
        placeholder={(isMobile && mobilePlaceholder) || placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, rules)}
        className={`${BOX} ${s.box} ${s.text}`}
      />
    </Field>
  )
}

// Typed date: the visitor types DD/MM/YYYY (slashes are added for them). The form stores the
// date as YYYY-MM-DD once it's a real date — the format the API expects — and the raw text until then.
export function DateField({ name, label, placeholder, rules }) {
  const { control, formState: { errors } } = useFormContext()
  const s = useStyles()
  const error = errors[name]

  return (
    <Field id={name} label={label} error={error}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            id={name}
            ref={field.ref}
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            maxLength={10}
            placeholder={placeholder}
            value={isoToTyped(field.value)}
            onChange={(e) => {
              const typed = maskDate(e.target.value)
              field.onChange(typedToIso(typed) ?? typed)
            }}
            onBlur={field.onBlur}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`${BOX} ${s.box} ${s.text}`}
          />
        )}
      />
    </Field>
  )
}

// Keep digits only and add the slashes: "12031998" -> "12/03/1998"
function maskDate(text) {
  const d = text.replace(/\D/g, '').slice(0, 8)
  return d.slice(0, 2) + (d.length > 2 ? '/' + d.slice(2, 4) : '') + (d.length > 4 ? '/' + d.slice(4) : '')
}

// "12/03/1998" -> "1998-03-12", or null if it's not complete or not a real date (e.g. 31/02)
function typedToIso(typed) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(typed)
  if (!m) return null
  const [, dd, mm, yyyy] = m
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
  const real = date.getFullYear() === Number(yyyy) && date.getMonth() === Number(mm) - 1 && date.getDate() === Number(dd)
  return real ? `${yyyy}-${mm}-${dd}` : null
}

// Stored "1998-03-12" shows as "12/03/1998"; anything else (half-typed text) shows as it is
function isoToTyped(value = '') {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return m ? `${m[3]}/${m[2]}/${m[1]}` : value
}

export function SelectField({ name, label, placeholder, options, rules }) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <Field id={name} label={label} error={error}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Dropdown id={name} value={field.value} onChange={field.onChange} onBlur={field.onBlur} options={options} placeholder={placeholder} invalid={!!error} />
        )}
      />
    </Field>
  )
}

// Styled like the Figma option lists (Gender, ROLE, First timer, LC…): cream rows under the field.
function Dropdown({ id, value, onChange, onBlur, options, placeholder, invalid }) {
  const s = useStyles()
  const root = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const selectedIndex = options.findIndex((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const closeOnOutside = (e) => !root.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', closeOnOutside)
    return () => document.removeEventListener('pointerdown', closeOnOutside)
  }, [open])

  const show = () => {
    setActive(Math.max(selectedIndex, 0))
    setOpen(true)
  }

  const choose = (i) => {
    onChange(options[i].value)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) return show()
      const step = e.key === 'ArrowDown' ? 1 : -1
      setActive((a) => Math.min(options.length - 1, Math.max(0, a + step)))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (open && active >= 0) choose(active)
      else show()
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open && active >= 0 ? `${id}-option-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        onBlur={() => {
          setOpen(false)
          onBlur()
        }}
        className={`${BOX} ${s.box} ${s.text} flex cursor-pointer items-center justify-between text-left`}
      >
        <span className={selectedIndex >= 0 ? '' : 'text-ink/40'}>{selectedIndex >= 0 ? options[selectedIndex].label : placeholder}</span>
        <motion.img src={IMAGES.dropdown} alt="" animate={{ rotate: open ? 180 : 0 }} className={`shrink-0 opacity-60 ${s.icon}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.2, ease: EASE }}
            // keep focus on the button while picking, so it doesn't blur and close first
            onPointerDown={(e) => e.preventDefault()}
            className="absolute inset-x-0 top-full z-30 mt-1 flex max-h-72 origin-top flex-col gap-1 overflow-y-auto border border-ink/15 bg-[#f7f7f7] p-1 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
          >
            {options.map((o, i) => (
              <li
                key={o.value}
                id={`${id}-option-${i}`}
                role="option"
                aria-selected={o.value === value}
                onClick={() => choose(i)}
                onPointerEnter={() => setActive(i)}
                className={`cursor-pointer border border-ink/15 font-glyphic text-ink transition-colors ${s.option} ${s.text} ${
                  i === active ? 'bg-nexts/15' : o.value === value ? 'bg-nexts/10' : 'bg-[#ececec]'
                }`}
              >
                {o.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
