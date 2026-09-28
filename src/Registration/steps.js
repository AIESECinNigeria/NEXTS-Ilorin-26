// The registration pages in order: their URL (/registration/<path>) and the fields that must be valid
// before the visitor can leave that page. Adding a question to a page? Add its field name here too.
export const STEPS = [
  { path: 'step-one', fields: ['fullName', 'number', 'gender', 'email'] },
  { path: 'step-two', fields: ['role', 'd_o_b', 'lc', 'first_conf'] },
  { path: 'step-three', fields: ['allergies', 'remedy', 'roomSituation'] },
  { path: 'step-four', fields: ['nextOfKin', 'relationship', 'expectations', 'additionalInfo'] },
]

// Full URL of page i (0 = first page)
export const stepUrl = (i) => `/registration/${STEPS[i].path}`

// Minimum age to register (checked on the date of birth question)
export const MIN_AGE = 18

// Age in full years for a YYYY-MM-DD birth date (NaN if the date is incomplete)
export function ageOn(birthDate, today = new Date()) {
  const [y, m, d] = birthDate.split('-').map(Number)
  if (!y || !m || !d) return NaN
  let age = today.getFullYear() - y
  const beforeBirthday = today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)
  if (beforeBirthday) age -= 1
  return age
}
