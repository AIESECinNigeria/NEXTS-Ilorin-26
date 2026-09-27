// Order of the registration pages and the fields each one validates before moving on.
export const STEPS = [
  { path: 'step-one', fields: ['fullName', 'number', 'gender', 'email'] },
  { path: 'step-two', fields: ['role', 'd_o_b', 'lc', 'first_conf'] },
  { path: 'step-three', fields: ['allergies', 'remedy', 'roomSituation'] },
  { path: 'step-four', fields: ['nextOfKin', 'relationship', 'expectations', 'additionalInfo'] },
]

export const stepUrl = (i) => `/registration/${STEPS[i].path}`

export const MIN_AGE = 18

const pad = (n) => String(n).padStart(2, '0')

// Latest birth date that is old enough today, as YYYY-MM-DD (the date input's max)
export function latestAdultBirthday(today = new Date()) {
  return `${today.getFullYear() - MIN_AGE}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
}

// Full years between a YYYY-MM-DD birth date and today
export function ageOn(birthDate, today = new Date()) {
  const [y, m, d] = birthDate.split('-').map(Number)
  if (!y || !m || !d) return NaN
  let age = today.getFullYear() - y
  const beforeBirthday = today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)
  if (beforeBirthday) age -= 1
  return age
}
